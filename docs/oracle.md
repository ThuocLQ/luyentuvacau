# Oracle & SQL Performance

> Mục tiêu: hiểu cách Oracle thực thi truy vấn và xử lý dữ liệu an toàn trong production.

## 1. Index không phải lúc nào cũng làm truy vấn nhanh hơn

Index phù hợp khi cột có tính chọn lọc tốt và truy vấn thường lọc theo cột đó.

```sql
CREATE INDEX idx_orders_customer_date
ON orders(customer_id, order_date);
```

### Checklist

- Cột đầu của composite index có xuất hiện trong điều kiện lọc không?
- Truy vấn có trả về quá nhiều dòng không?
- Có function bọc quanh cột index không?
- Statistics có được cập nhật không?

## 2. Transaction và locking

Một transaction phải giữ được invariant nghiệp vụ, không chỉ “chạy không lỗi”.

```sql
SELECT balance
FROM accounts
WHERE account_id = :account_id
FOR UPDATE;
```

## 3. Query plan

Không đoán hiệu năng bằng cảm giác. Dùng execution plan và số liệu thực tế.

```sql
EXPLAIN PLAN FOR
SELECT *
FROM orders
WHERE customer_id = :customer_id;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

## 4. Pagination

Offset pagination dễ dùng nhưng chậm khi offset lớn. Keyset pagination thường ổn định hơn.

```sql
SELECT *
FROM orders
WHERE order_id > :last_id
ORDER BY order_id
FETCH FIRST 50 ROWS ONLY;
```

## Câu trả lời phỏng vấn 30 giây

Tôi bắt đầu từ execution plan, cardinality và số lượng block đọc. Sau đó kiểm tra index, predicate, join order và thống kê. Tôi chỉ tối ưu sau khi có baseline và đo lại bằng cùng workload.
