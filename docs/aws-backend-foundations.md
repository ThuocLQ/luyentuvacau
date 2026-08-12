# AWS cho Backend .NET: Network, Compute và Reliability

## Quick Summary

- Chọn AWS service theo workload và năng lực vận hành, không vì “công ty lớn dùng dịch vụ này”.
- AWS chịu trách nhiệm về hạ tầng cloud; team vẫn chịu trách nhiệm cho IAM, network rule, dữ liệu, app code và cấu hình service.
- `IAM role` cấp temporary credentials cho workload. Không nhét access key dài hạn vào image, Git hoặc environment variable.
- Multi-AZ giúp chịu một số failure trong Region; disaster recovery cấp Region phải bắt đầu từ RPO/RTO và recovery đã diễn tập.

## Terms

- **AWS account**: security và billing boundary; production và non-production thường nên tách theo mức phù hợp.
- **VPC**: mạng riêng logic của workload.
- **Security group**: firewall ở mức resource; private subnet không tự làm app an toàn.
- **IAM role**: identity cấp quyền tạm thời cho user hoặc workload.
- **RPO / RTO**: lượng dữ liệu có thể mất và thời gian mục tiêu để khôi phục dịch vụ.

## Mental Model: một API backend phổ biến

```text
Internet → ALB → ECS/Fargate hoặc EKS (private subnet) → RDS
                          ├→ SQS cho job async
                          ├→ S3 cho file/export
                          └→ CloudWatch + trace cho telemetry
```

Đây là một thiết kế phổ biến, không phải kiến trúc bắt buộc. ALB chỉ đưa traffic vào compute; database vẫn cần connection limit, backup/restore và migration tương thích. SQS giúp tách job khỏi request, nhưng worker vẫn phải idempotent vì message có thể được giao lại.

## Practical Example: chọn compute cho Order API

| Lựa chọn | Phù hợp khi | Đổi lại |
|---|---|---|
| Lambda | event ngắn, traffic thất thường, ít state | giới hạn thời gian chạy; không hợp worker chạy lâu hoặc export lớn |
| ECS + Fargate | API/worker chạy container dài hạn, muốn giảm việc quản node | ít quyền điều khiển Kubernetes hơn |
| EKS | cần Kubernetes ecosystem, policy/scheduling cluster và team vận hành được | vẫn phải vận hành workload, networking, IAM và nhiều thành phần trong cluster |
| EC2 | cần kiểm soát OS hoặc tối ưu đặc biệt có chủ đích | team chịu patch, capacity và vận hành instance |

Với Order API .NET chạy liên tục và worker xử lý file 40 phút, ECS + Fargate thường là điểm bắt đầu đơn giản hơn Lambda. EKS chỉ hợp lý khi nhu cầu Kubernetes thật sự đã rõ, không phải vì EKS là “managed” nên không còn việc vận hành.

## Identity và Secret: app gọi S3 không cần access key

```csharp
var s3 = new AmazonS3Client(); // SDK lấy temporary credentials từ task role
await s3.PutObjectAsync(new PutObjectRequest
{
    BucketName = bucketName,
    Key = $"exports/{jobId}.ndjson",
    InputStream = stream
}, cancellationToken);
```

Ví dụ chỉ minh họa credential chain. Role chỉ nên có quyền `s3:PutObject` vào bucket/prefix cần thiết. Secret database có thể ở Secrets Manager hoặc hệ thống secret phù hợp; không log secret, không commit vào repo, và phải có rotation/recovery policy.

## Reliability: bắt đầu bằng recovery target

“Có backup” chưa trả lời được lúc nào khôi phục xong. Với dữ liệu order, hỏi trước: mất tối đa bao nhiêu dữ liệu (RPO) và dịch vụ phải quay lại trong bao lâu (RTO)? Sau đó chọn backup/restore, warm standby hay multi-region theo mục tiêu và chi phí.

Multi-AZ hỗ trợ availability trong một Region, nhưng không tự là recovery plan cho sai thao tác dữ liệu, lỗi logic hay outage cấp Region. Cần test restore, smoke test app, cách chuyển connection và runbook. Tag `service`, `environment`, `owner`, `cost-center` từ đầu để điều tra cost và ownership.

## Production Review

- Workload chạy private subnet vẫn cần đúng security group, route egress và IAM least privilege.
- CloudWatch có log/metric không thay application telemetry: request quan trọng vẫn cần correlation ID, dashboard và alert theo SLO.
- RDS là source of truth cho giao dịch; cache không thay database. Theo dõi connection, slow query, backup age và restore drill.
- SQS/DLQ không tự chặn message trùng. Lưu operation ID, xử lý idempotent và có quy trình đọc/replay DLQ.

## Interview Answer

“Em bắt đầu từ workload và RPO/RTO, không chọn AWS service theo tên. Với API .NET chạy container, ECS/Fargate là lựa chọn hợp lý khi team chưa cần Kubernetes; EKS chỉ đáng dùng khi cần capability của Kubernetes và có người vận hành nó. Em để workload nhận quyền qua IAM role thay vì access key. Về reliability, Multi-AZ không thay cho DR: em xác định RPO/RTO, test backup/restore và theo dõi SLO, database saturation cùng cost theo tag.”

## Follow-up

- Private subnet nhưng app không gọi được AWS API: bạn kiểm tra route, NAT/VPC endpoint và IAM theo thứ tự nào?
- SQS giao một message lần hai: tại sao DLQ chưa đủ để tránh gửi email trùng?
- Khi nào RDS read replica không giải quyết vấn đề write latency?

## Final Recall

- AWS managed không có nghĩa team hết trách nhiệm về IAM, data và app.
- IAM role tốt hơn access key; private subnet vẫn cần network rule rõ ràng.
- Multi-AZ, backup và DR là ba câu chuyện khác nhau; bắt đầu bằng RPO/RTO rồi diễn tập recovery.
