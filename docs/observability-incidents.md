# Observability và Incident Response

## Quick Summary

- Khi có incident (sự cố production), hỏi ai đang bị ảnh hưởng và giảm ảnh hưởng trước khi đoán nguyên nhân.
- Metrics (chuỗi số theo thời gian) cho biết xu hướng; logs kể sự kiện; traces nối một request qua nhiều service. Mỗi loại trả lời một câu khác nhau.
- Theo dõi phải gắn với người dùng và nghiệp vụ, không chỉ CPU hay số pod.
- Log, metric và test không tự cứu hệ thống; chúng giúp đội có bằng chứng để chọn hành động đúng.

## Incident Scenario

Sau khi canary (release cho một phần nhỏ traffic) checkout chậm gấp nhiều lần và tỉ lệ thanh toán thành công giảm ở một region (vùng chạy hệ thống). Team có thể đọc log hàng giờ để tìm nguyên nhân, nhưng khách đang không thanh toán được.

Việc đầu tiên là dừng canary hoặc rollback nếu bản cũ vẫn tương thích. Khi payment success trở lại, giữ dashboard, trace và thông tin bản deploy để khi tình hình ổn hơn, team biết chính xác thay đổi nào liên quan.

## Mental Model: signal → impact → mitigation

**Metric** là dãy số theo thời gian, ví dụ p99 (thời gian của nhóm request chậm nhất) hoặc tỉ lệ payment thành công. Nó cho biết vấn đề đang lớn hay nhỏ. **Log** là bản ghi một sự kiện, ví dụ validation fail hoặc lỗi database. **Trace** nối các bước của cùng một request để thấy thời gian đang chờ ở API, database hay payment provider.

Logs và traces có thể correlate trực tiếp bằng `TraceId`/`SpanId`. Metric thì khác: dimension của metric phải có số giá trị bị giới hạn, như `service`, `route`, `status`, `region` hoặc `version`. Không đưa `customerId`, `orderId`, `requestId` hay `TraceId` vào metric label cho từng request, vì số series sẽ tăng rất nhanh và làm telemetry chậm/đắt/khó dùng. Khi một metric bất thường cần đi tới trace cụ thể, dùng exemplar hoặc trace-link do telemetry backend hỗ trợ.

```text
Request
├── Trace → TraceId / SpanId
├── Structured logs → TraceId / SpanId
└── Metrics → route, status, service, region, version (low-cardinality)
                 └── exemplar / trace link khi cần drill-down
```

## Terms

- **SLO**: mức dịch vụ team cam kết, ví dụ tỉ lệ checkout thành công trong một khoảng thời gian.
- **Canary**: chỉ đưa bản mới cho một phần nhỏ traffic trước khi mở rộng.
- **Blast radius**: phạm vi người dùng hoặc chức năng bị ảnh hưởng bởi một thay đổi.
- **Runbook**: hướng dẫn đã chuẩn bị cho một loại sự cố, gồm người làm, bước giảm ảnh hưởng và cách kiểm tra.

## Cách quyết định, từng bước

1. Xác nhận triệu chứng bằng tín hiệu người dùng: payment success, error rate, p95/p99 và số request bị ảnh hưởng theo region/version.
2. Giảm ảnh hưởng trong blast radius nhỏ nhất. Tắt feature, dừng canary hoặc rollback nếu schema và config vẫn cho bản cũ chạy an toàn.
3. Đặt một người điều phối incident, ghi thời điểm và các quyết định. Người khác điều tra để không vừa sửa vừa mất dấu thay đổi.
4. Dùng trace của request lỗi để tìm nơi chờ; dùng metric để biết khi nào bắt đầu và phạm vi; dùng log đã lọc để xem lỗi cụ thể.
5. Nêu giả thuyết có thể kiểm chứng, ví dụ release mới tạo query chậm. So version, query, DB wait và traffic trước/sau thay vì kết luận từ CPU trung bình.
6. Sau khi khôi phục, viết lại timeline, nguyên nhân, việc phòng ngừa và test/alert cần bổ sung. Không đổ lỗi cho cá nhân.

## Signal Decision Table

| Lựa chọn | Nên dùng khi | Được gì | Cần tránh |
|---|---|---|---|
| Metric | cần biết xu hướng và mức ảnh hưởng | thấy regression theo thời gian/version | gắn `OrderId` hoặc `TraceId` vào label, làm cardinality bùng nổ |
| Log có cấu trúc | cần chi tiết một lỗi cụ thể | tìm theo trace ID, route, version | ghi token, mật khẩu, dữ liệu cá nhân |
| Trace | request đi qua nhiều dependency | thấy chỗ chờ và đường gọi | tạo tag có quá nhiều giá trị riêng lẻ |
| Rollback/canary stop | bản mới rõ ràng gây hại, bản cũ còn tương thích | giảm ảnh hưởng nhanh | rollback mù khi migration đã đổi nghĩa dữ liệu |

## Mitigation và Recovery

Nếu migration đã thay đổi dữ liệu khiến app cũ không hiểu được, rollback image ngay có thể làm lỗi nặng hơn. Khi đó tắt feature hoặc làm hotfix tương thích để đi tiếp (roll-forward), đồng thời theo dõi sát. Kế hoạch rollback phải được xem cùng schema và config từ trước.

Alert chỉ dựa trên CPU có thể không báo khi API đang chờ database connection. Hãy alert theo SLO và triệu chứng người dùng, rồi dùng CPU/pool/wait làm tín hiệu chẩn đoán.

## Chứng minh mình làm đúng

Diễn tập một incident nhỏ: alert có chỉ đúng owner không, dashboard có phân biệt version/region không, trace có đi qua service quan trọng không và runbook có giúp người mới giảm ảnh hưởng được không. Theo dõi thời gian phát hiện, thời gian khôi phục, lỗi lặp lại và phần trăm request có trace liên tục.

## Interview Answer

“Khi production có incident, em xác định blast radius qua error rate, latency và business outcome. Em giảm tác động bằng cách stop canary, tắt feature flag hoặc rollback về version còn tương thích rồi mới tìm root cause. Metric cho thấy xu hướng bằng dimension low-cardinality; trace chỉ ra request đang chờ ở đâu; structured log mang `TraceId`/`SpanId` để mở đúng trace. Nếu cần đi từ metric sang trace, em dùng exemplar hoặc trace-link của telemetry backend, không gắn request ID vào metric label. Sau incident, em thêm test, alert hoặc runbook dựa trên nguyên nhân đã có bằng chứng.”

## Follow-up

- p99 tốt hơn nhưng payment success giảm thì release có được coi là tốt không?
- Khi nào không nên rollback ngay sau deploy?
- Vì sao không đưa `OrderId` hoặc `TraceId` vào metric labels?

## Self-check

- Tín hiệu nào cho biết khách đang bị ảnh hưởng thật?
- Tôi có thể giảm ảnh hưởng trước khi biết root cause không?
- Dashboard có tách được region, version và dependency đang chờ không?

## Final Recall

- Giảm blast radius trước, tìm root cause sau.
- Metric nhìn xu hướng, log giữ chi tiết, trace nối đường đi request.
- Rollback chỉ an toàn khi code, schema và config còn tương thích.
