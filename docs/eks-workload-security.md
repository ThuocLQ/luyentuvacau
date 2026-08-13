# Amazon EKS: Identity, Networking và Workload Security

## Quick Summary

- Với EKS standard, AWS quản lý Kubernetes control plane; team vẫn chịu trách nhiệm cho Pod, image, RBAC, IAM, network policy và cách workload dùng dữ liệu.
- `ServiceAccount` là identity ở Kubernetes; IAM role là identity để gọi AWS. Map quyền theo từng workload, không dùng access key chung trong Kubernetes Secret.
- Kubernetes `NetworkPolicy` và AWS Security Group là hai lớp khác nhau. Có manifest không có nghĩa traffic đã bị block: CNI phải hỗ trợ, enforcement phải được bật và workload mode phải được hỗ trợ.
- Mục tiêu là cấp đúng quyền cho đúng Pod, quan sát được ai đã gọi gì và có thể thu hồi/rotate an toàn.

## Terms

- **EKS control plane**: phần Kubernetes API và controller do AWS quản lý trong EKS.
- **ServiceAccount**: danh tính của Pod khi gọi Kubernetes API.
- **RBAC**: rule quyết định ServiceAccount được làm gì trong Kubernetes.
- **IRSA / EKS Pod Identity**: cách gắn IAM identity cho workload theo ServiceAccount.
- **NetworkPolicy**: rule mạng L3/L4 trong cluster; cần CNI hỗ trợ và được cấu hình để enforcement.

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

Trên EKS dùng Amazon VPC CNI, kiểm tra lần lượt: CNI/plugin nào đang chạy; nó có hỗ trợ NetworkPolicy không; network policy enforcement đã enable chưa; node/workload mode có nằm trong giới hạn hỗ trợ không; selector có match không; DNS và dependency bắt buộc đã được mở chưa. “Apply YAML thành công” không phải bằng chứng traffic đã bị chặn.

:::note
EKS Auto Mode quản lý thêm compute autoscaling, Pod/service networking, load balancing, DNS và storage operations so với EKS standard. Dù chọn mode nào, team vẫn chịu trách nhiệm cho cấu hình workload, application security, IAM least privilege và tính đúng đắn của app.
:::

## Debug Scenario: deploy EKS xong không gọi được RDS

Đừng sửa manifest ngẫu nhiên. Với Pod và private RDS cùng VPC, đi theo đường kết nối database: Pod có `Ready` không; DNS có resolve RDS endpoint không; TCP có tới đúng port không; Security Group của workload/node có egress phù hợp không; Security Group RDS có cho đúng source/port không; nếu khác network thì mới kiểm NACL, route, peering hoặc Transit Gateway; sau đó kiểm DB authentication, TLS và connection config. NAT/VPC Endpoint không phải basic path để mở PostgreSQL/MySQL connection tới RDS; chỉ xét chúng khi dependency thật sự cần Internet hoặc AWS API. IAM thường trả `AccessDenied`, còn timeout mạng cần được xem như vấn đề network trước.

Đồng thời xem log, trace và metric của request lỗi. Kubernetes events giúp biết scheduling/probe/image pull; chúng không thay telemetry bên trong app.

## Interview Answer

“Với EKS standard, em xem AWS quản lý control plane chứ không vận hành toàn bộ workload hộ team; Auto Mode có thể chuyển thêm một số vận hành hạ tầng sang AWS, nhưng app security và IAM vẫn là việc của team. Em tách RBAC trong cluster khỏi IAM khi gọi AWS. Mỗi API/worker có ServiceAccount riêng và map sang IAM role theo IRSA hoặc EKS Pod Identity, với quyền hẹp theo tài nguyên cần dùng. Khi dùng NetworkPolicy, em xác nhận CNI hỗ trợ, enforcement đã bật và rule thật sự match. Nếu Pod không gọi được RDS cùng VPC, em kiểm DNS, TCP, Security Group và DB authentication/TLS; không đưa NAT/VPC Endpoint vào basic database path.”

## Follow-up

- Vì sao `ClusterRoleBinding` rộng cho API business là rủi ro?
- Khi nào `automountServiceAccountToken: false` làm workload an toàn hơn?
- Pod nhiều lên nhưng không còn IP trong subnet: đây là lỗi app, cluster capacity hay VPC capacity?

## Final Recall

- EKS managed control plane; workload security vẫn là trách nhiệm của team.
- RBAC cho Kubernetes API, IAM cho AWS API — tách hai lớp quyền.
- NetworkPolicy và Security Group bổ sung nhau; trên EKS phải xác nhận CNI, enforcement, workload mode và rule đều đúng.
