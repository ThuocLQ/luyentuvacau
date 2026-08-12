# Amazon EKS: Identity, Networking và Workload Security

## Quick Summary

- EKS quản lý Kubernetes control plane, nhưng team vẫn chịu trách nhiệm cho Pod, image, RBAC, IAM, network policy và cách workload dùng dữ liệu.
- `ServiceAccount` là identity ở Kubernetes; IAM role là identity để gọi AWS. Map quyền theo từng workload, không dùng access key chung trong Kubernetes Secret.
- Kubernetes `NetworkPolicy` và AWS Security Group là hai lớp khác nhau. Policy chỉ có hiệu lực nếu CNI đang dùng hỗ trợ enforce.
- Mục tiêu là cấp đúng quyền cho đúng Pod, quan sát được ai đã gọi gì và có thể thu hồi/rotate an toàn.

## Terms

- **EKS control plane**: phần Kubernetes API và controller do AWS quản lý trong EKS.
- **ServiceAccount**: danh tính của Pod khi gọi Kubernetes API.
- **RBAC**: rule quyết định ServiceAccount được làm gì trong Kubernetes.
- **IRSA / EKS Pod Identity**: cách gắn IAM identity cho workload theo ServiceAccount.
- **NetworkPolicy**: rule mạng L3/L4 trong cluster; cần CNI hỗ trợ enforcement.

## Mental Model: một Pod gọi tài nguyên AWS

```text
Pod (ServiceAccount: export-worker)
  ├→ RBAC: có được đọc Kubernetes API không?
  └→ EKS Pod Identity / IRSA → IAM role → chỉ được ghi S3 prefix exports/
```

Đừng gộp hai lớp này. RBAC không tự cấp quyền S3; IAM role không tự cho Pod đọc Secret hay list Pod. Mỗi workload có quyền riêng giúp audit dễ hơn và giảm blast radius khi một Pod bị compromise.

## Practical Example: worker export ghi file S3

Worker cần ghi file export vào một prefix S3, không cần gọi Kubernetes API. Cấu hình an toàn bắt đầu bằng ServiceAccount riêng, IAM policy hẹp cho prefix cần dùng, và tắt việc mount token Kubernetes nếu app không cần token đó.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: export-worker
automountServiceAccountToken: false
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: export-worker
spec:
  template:
    spec:
      serviceAccountName: export-worker
```

Manifest này chưa tự cấp quyền AWS. Platform team còn map ServiceAccount sang IAM role bằng IRSA hoặc EKS Pod Identity, rồi giới hạn quyền role theo bucket/prefix. Không để AWS access key trong Kubernetes Secret chỉ vì cách đó nhanh hơn lúc đầu.

## Networking: hai lớp, hai câu hỏi

| Lớp | Câu hỏi trả lời | Ví dụ |
|---|---|---|
| Security Group | resource AWS nào được kết nối qua port nào? | ALB gọi API, API gọi RDS 5432 |
| NetworkPolicy | Pod nào trong cluster được nói chuyện với Pod nào? | chỉ `checkout-api` được gọi `payment-adapter` |

Khi áp dụng default-deny egress, nhớ mở DNS và đúng dependency cần gọi. Khi rule không có tác dụng, kiểm tra CNI có enforce NetworkPolicy hay không trước khi tin rằng traffic đã bị chặn.

## Debug Scenario: deploy EKS xong không gọi được RDS

Đừng sửa manifest ngẫu nhiên. Kiểm tra theo đường đi: Pod có `Ready` không; DNS resolve được không; Security Group RDS có cho đúng nguồn/port không; subnet route/NAT hoặc VPC endpoint có đúng với dependency không; IAM có phải nguyên nhân thật không. IAM thường trả `AccessDenied`, còn timeout mạng cần được xem như một vấn đề network trước.

Đồng thời xem log, trace và metric của request lỗi. Kubernetes events giúp biết scheduling/probe/image pull; chúng không thay telemetry bên trong app.

## Interview Answer

“Em xem EKS là Kubernetes control plane managed, không phải toàn bộ workload đã được AWS vận hành hộ. Em tách RBAC trong cluster khỏi IAM khi gọi AWS. Mỗi API/worker có ServiceAccount riêng và map sang IAM role theo IRSA hoặc EKS Pod Identity, với quyền hẹp theo tài nguyên cần dùng; không chia access key qua Kubernetes Secret. Về network, em kiểm tra cả Security Group và NetworkPolicy, đồng thời xác nhận CNI có enforce policy. Khi lỗi kết nối, em đi theo đường DNS, route, rule mạng rồi mới đến IAM thay vì đoán.”

## Follow-up

- Vì sao `ClusterRoleBinding` rộng cho API business là rủi ro?
- Khi nào `automountServiceAccountToken: false` làm workload an toàn hơn?
- Pod nhiều lên nhưng không còn IP trong subnet: đây là lỗi app, cluster capacity hay VPC capacity?

## Final Recall

- EKS managed control plane; workload security vẫn là trách nhiệm của team.
- RBAC cho Kubernetes API, IAM cho AWS API — tách hai lớp quyền.
- NetworkPolicy và Security Group bổ sung nhau, nhưng NetworkPolicy cần CNI enforce.
