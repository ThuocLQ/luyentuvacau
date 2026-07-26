# System Design

## Framework phân tích

1. Làm rõ functional requirements.
2. Xác định non-functional requirements.
3. Ước lượng tải và dữ liệu.
4. Vẽ request/data flow.
5. Chọn storage và communication.
6. Xác định failure modes.
7. Chốt trade-off.

## Ví dụ: Place Order API

```text
Client
  -> API Gateway
  -> Order Service
  -> Risk Check
  -> Transaction DB
  -> Outbox
  -> Message Broker
  -> Exchange Adapter
```

## Invariant quan trọng

- Một client order ID chỉ tạo một lệnh.
- Không gửi lệnh ra exchange trước khi transaction nội bộ được ghi nhận.
- Execution trùng không được cộng tiền/chứng khoán hai lần.
- Mọi thay đổi quan trọng phải audit được.

## Capacity

Không cần đoán chính xác tuyệt đối. Cần nêu rõ giả định và cách hệ thống scale.

## Trade-off

Senior không chỉ kể tên công nghệ. Senior giải thích tại sao chọn và điều gì bị đánh đổi.
