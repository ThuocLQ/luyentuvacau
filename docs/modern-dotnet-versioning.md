# Modern .NET 8 → 10: Upgrade, Compatibility và Rollback

## Quick Summary

- Version mới không tự là lý do đủ để upgrade. Bắt đầu từ support lifecycle, security patch và giá trị thực với workload.
- .NET 8 và .NET 10 đều là LTS; .NET 9 là STS. Với production service, ngày hết support chỉ là một input trong quyết định, không thay compatibility test hay rollout an toàn.
- Upgrade là một release: kiểm package, container base image, SDK/CI, telemetry, performance, deployment và rollback trước khi đổi target framework.

## Terms

- **LTS**: Long Term Support, phù hợp khi cần lifecycle dài hơn.
- **STS**: Standard Term Support, lifecycle ngắn hơn, thường hợp khi team upgrade thường xuyên.
- **framework-dependent**: app dùng runtime đã cài trong image/máy chạy.
- **self-contained**: artifact mang theo runtime; đơn giản hóa dependency runtime nhưng lớn hơn và phải tự cập nhật runtime.

## Mental Model: upgrade là thay đổi hệ thống

```text
Target framework + SDK + packages + base image
  → build/CI
  → integration/contract tests
  → canary + telemetry comparison
  → expand rollout hoặc rollback
```

Đừng chỉ hỏi “có breaking change không?”. Hỏi thêm: dependency nào chưa hỗ trợ, image nào thực sự chạy trong production, native library có đổi không, startup/memory/latency có regression không và rollback có còn tương thích database/config không.

## Practical Example: production đang .NET 8, .NET 10 đã ổn định

Một API checkout chạy .NET 8. Upgrade lên .NET 10 có thể giảm support risk dài hạn hoặc mở ra feature team cần, nhưng không nên merge vì “mới hơn”.

1. Chốt lý do và deadline: lifecycle, security posture hay feature có giá trị rõ.
2. Lập inventory NuGet, analyzer, SDK, base image, native dependency và hosting runtime.
3. Chạy unit, integration, contract và smoke test với SDK/image mới; xem warning compile như migration work item, không tắt hàng loạt.
4. Deploy canary; so startup time, error rate, p95/p99, managed heap, CPU và business outcome với baseline.
5. Chỉ mở rộng khi migration/schema/config vẫn cho rollback. Nếu có incompatibility dữ liệu, chọn roll-forward có kiểm soát thay vì rollback image mù.

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "Checkout.Api.dll"]
```

Image tag cần được pin theo policy của team và scan trong CI. Đổi runtime image mà không test giống đổi dependency production.

## Chọn deployment model

| Model | Hợp khi | Cost cần nhớ |
|---|---|---|
| Framework-dependent | platform quản runtime/image chuẩn | runtime patch là trách nhiệm image/platform pipeline |
| Self-contained | môi trường target khó kiểm soát hoặc cần bundle runtime | artifact lớn, patch runtime phải rebuild/redeploy app |

## Interview Answer

“Em không upgrade chỉ vì version mới. Với service đang .NET 8, em xem lifecycle, lý do business/security và inventory package, SDK, container base image trước. Em coi upgrade như một release: chạy integration/contract test, deploy canary rồi so error rate, startup, latency, memory và business outcome với baseline. Em chốt rollback trước, đặc biệt khi schema/config đã đổi; nếu rollback image không còn an toàn thì dùng roll-forward có kiểm soát.”

## Follow-up

- Vì sao package compatibility không đủ để kết luận container production an toàn?
- Khi canary .NET 10 có p99 tốt hơn nhưng memory tăng mạnh, bạn quyết định thế nào?

## Final Recall

- Upgrade = compatibility + evidence + rollout + rollback.
- Pin và test SDK/runtime/base image như dependency production.
- Không dùng support lifecycle để thay thế cho test hay observability.
