# Distributed Systems

## 1. Idempotency

Một operation idempotent có thể được thực hiện nhiều lần nhưng kết quả nghiệp vụ chỉ xảy ra một lần.

```text
Idempotency-Key: client-order-2026-00001
```

## 2. Transactional Outbox

Ghi business data và event vào cùng một database transaction.

```text
BEGIN TRANSACTION
  INSERT order
  INSERT outbox_message
COMMIT
```

Worker đọc Outbox và publish lên broker. Đây là at-least-once delivery, nên consumer vẫn phải idempotent.

## 3. Kafka và RabbitMQ

| Tiêu chí | Kafka | RabbitMQ |
|---|---|---|
| Mô hình | Distributed log | Message broker |
| Replay | Tốt | Không phải mục tiêu chính |
| Ordering | Theo partition | Theo queue |
| Use case | Event streaming | Work queue, routing |

## 4. Saga

Saga phối hợp nhiều local transaction. Compensation không phải rollback database xuyên service.

## 5. Retry và Dead-letter

- Retry có giới hạn.
- Exponential backoff và jitter.
- Permanent error đi vào dead-letter.
- Có correlation ID để truy vết.
