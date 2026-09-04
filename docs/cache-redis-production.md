# Cache và Redis: Freshness, Invalidation và Scale-out

## Quick Summary

- Cache là bản sao tạm thời để giảm latency và tải cho nơi sở hữu dữ liệu; nó không phải source of truth.
- Mỗi cache phải trả lời trước: key là gì, dữ liệu được cũ bao lâu, lúc nào invalidation, cache miss/outage thì hệ thống làm gì.
- `IMemoryCache` nằm trong một process. Khi scale-out nhiều instance, mỗi instance có thể có bản cache khác nhau; dùng distributed cache khi cần chia sẻ.
- TTL chỉ giới hạn thời gian dữ liệu có thể cũ. TTL không tự giải quyết invalidation, race condition hay cache stampede.

## Terms

- **cache-aside**: app đọc cache trước; cache miss thì đọc source of truth, ghi bản sao vào cache rồi trả response.
- **freshness**: mức độ mới của dữ liệu. Ví dụ catalog chấp nhận cũ 30 giây, còn số dư/permission thì không.
- **cache invalidation**: bỏ hoặc thay bản cache sau khi dữ liệu gốc đổi.
- **cache stampede**: nhiều request cùng miss một key và cùng dồn xuống database.
- **hot key**: một key nhận lượng đọc lớn bất thường.
- **negative cache**: cache kết quả “không tồn tại” trong thời gian ngắn để tránh lặp query vô ích.

## Mental Model: cache đứng ở đâu?

```text
GET product
  → cache hit: trả bản sao
  → cache miss: đọc Product database → set TTL → trả response

PUT product
  → commit Product database
  → remove/version cache key
  → lần đọc sau nạp bản mới
```

Database hoặc service sở hữu Product vẫn quyết định dữ liệu đúng. Nếu cache bị mất sau deploy hoặc đang outage, app cần biết fallback có được phép gọi source of truth không và giới hạn tải thế nào.

## Practical Example: catalog đọc nhiều, giá đổi ít

Catalog phục vụ hàng nghìn lượt đọc, nhưng giá và tồn kho có thể đổi. Trang catalog được phép chậm cập nhật tối đa 30 giây; bước checkout thì phải đọc dữ liệu mới từ nơi sở hữu giá/tồn kho.

```csharp
var key = $"catalog:v1:{tenantId}:product:{productId}";
var cached = await cache.GetStringAsync(key, cancellationToken);
if (cached is not null)
    return JsonSerializer.Deserialize<ProductCard>(cached)!;

var card = await productRepository.GetCardAsync(tenantId, productId, cancellationToken);
if (card is null) return null;

await cache.SetStringAsync(
    key,
    JsonSerializer.Serialize(card),
    new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(30) },
    cancellationToken);
return card;
```

Sau khi `PUT` commit vào database, xóa key này hoặc chuyển sang key/value có version. Không cập nhật cache trước rồi mới ghi database: nếu database fail, cache sẽ chứa dữ liệu chưa tồn tại thật.

Vẫn có race: request A đọc bản cũ, request B commit rồi xóa cache, sau đó A mới ghi bản cũ vào cache. Với catalog chấp nhận cũ ngắn, TTL ngắn có thể đủ. Nếu freshness nghiêm hơn, dùng version trong value/key, event invalidation có reconciliation, hoặc bypass cache ở luồng quyết định tiền. Không có một distributed lock “thần kỳ” dùng cho mọi key.

## Chọn đúng loại cache

| Lựa chọn | Phù hợp khi | Cần nhớ |
|---|---|---|
| `IMemoryCache` | một instance, tính toán local, dữ liệu có thể mất khi restart | cache riêng từng process; phải giới hạn size/expiry |
| `IDistributedCache` + Redis | nhiều instance cần dùng chung bản cache/session-like data | có network hop, serialization; `Get/Set` không tự là atomic get-or-create |
| `OutputCache` | public HTTP response có vary key rõ | cache response, không phải generic data cache; không dùng broad key cho nội dung cá nhân |
| Không cache | permission, số dư, checkout price hoặc dữ liệu không chấp nhận cũ | đơn giản và đúng thường đáng giá hơn latency nhỏ |

`AddDistributedMemoryCache` có tên dễ gây hiểu nhầm: nó vẫn lưu trong memory của từng app instance, phù hợp dev/test hoặc một server, không thay Redis khi scale-out.

## Khi cache gặp tải hoặc lỗi

**Stampede:** key hot cùng hết hạn lúc 09:00, hàng trăm request cùng query database. Gộp request nạp cùng key trong một instance, thêm TTL jitter, chỉ trả stale-while-revalidate khi business cho phép, và đặt timeout/fallback có giới hạn. Với OutputCache, resource locking giúp giảm herd cho response cache của nó; đừng suy ra `IDistributedCache` tự làm điều tương tự giữa nhiều instance.

**Cache outage:** timeout vào cache phải ngắn hơn budget của request. Nếu cho fallback xuống database, admission/concurrency limit để không tạo database avalanche. Với endpoint không thể phục vụ khi cache mất, trả lỗi rõ hơn là giả vờ dữ liệu vẫn đúng.

**Hot key:** theo dõi key/cardinality, cache latency, hit rate cùng origin QPS. Không dùng một global key khổng lồ; tách dữ liệu theo key hợp lý, pre-warm có giới hạn và chỉ thêm L1/L2 khi có số đo.

## Interview Answer

“Em coi cache là bản sao tạm thời, còn source of truth vẫn là database hoặc service sở hữu dữ liệu. Trước khi cache em chốt key, freshness, cách invalidation và fallback lúc cache miss/outage. Với catalog đọc nhiều, em dùng cache-aside, TTL ngắn và xóa/version key sau khi transaction nguồn đã commit; checkout vẫn đọc dữ liệu mới. Khi scale-out, `IMemoryCache` không chia sẻ giữa các instance nên em cân nhắc distributed cache như Redis. Em theo dõi hit rate cùng origin QPS, cache latency và stampede, chứ không coi hit rate cao là đủ.”

## Follow-up

- Cache có thể làm lộ dữ liệu tenant khác bằng cách nào nếu key/vary-by thiếu tenant?
- Cache outage trong flash sale: fallback database tới mức nào thì phải dừng?
- Khi nào `OutputCache` khác hẳn `IDistributedCache`?

## Final Recall

- Cache giảm tải, không thay source of truth.
- TTL chỉ giới hạn staleness; invalidation và race vẫn cần thiết kế.
- Scale-out cần shared cache nếu các instance phải cùng thấy một bản sao.
- Cache miss/outage phải có capacity plan, không được dồn mù xuống database.
