# QuanNet Engineering Learning Standard v2.2

## 1. Product goal

QuanNet giúp Backend .NET developer Việt Nam **hiểu cơ chế, tự kiểm chứng, debug, giải thích và chuyển kiến thức sang tình huống mới**. Một lesson không được xem là hoàn thành chỉ vì người học đã đọc hết hoặc trả lời đúng một câu hỏi.

**Mastery > Calendar.** Tiến độ và streak chỉ là tín hiệu phụ. Dấu hiệu học chắc là người học mô tả được mechanism, dự đoán được outcome, dùng evidence để sửa giả thuyết, và nêu được trade-off trong context mới.

## 2. Depth before brevity

Viết ngắn chỉ tốt khi người học đã có mental model. Với topic mới, ưu tiên giải thích đủ sâu rồi mới nén thành recall. Không dùng một slogan để thay cho quan hệ nguyên nhân–kết quả.

Mỗi lesson công bố rõ prerequisite boundary: người học cần biết gì, và không cần biết gì. Không đưa một concept mới vào câu giải thích khi nó chưa được định nghĩa hoặc chưa có chỗ để người học quan sát nó.

Ở lần đầu xuất hiện:

- giữ thuật ngữ chuẩn của ngành khi đó là cách developer dùng thật;
- định nghĩa ngắn bằng tiếng Việt tự nhiên;
- nói concept đó giải quyết vấn đề nào và nó liên hệ với concept ngay trước ra sao;
- chỉ dùng song ngữ khi nó giúp nhận diện thuật ngữ trong tài liệu, log hoặc phỏng vấn.

Kiểm soát **vocabulary load**: một đoạn không mở quá nhiều thuật ngữ mới. Kiểm soát **concept dependency**: planner chỉ xuất hiện sau access path; estimate chỉ xuất hiện khi đã có “dự đoán trước khi chạy”; buffer chỉ xuất hiện sau page/buffer mental model.

## 3. Teaching sequence

Mặc định dùng progression **Toy → Realistic → Production**:

1. Toy model cô lập một mechanism với dữ liệu nhỏ.
2. Realistic example thêm query shape, failure hoặc data distribution gần công việc thật.
3. Production case thêm symptom, evidence, unknowns, risk, rollout và recovery.

Áp dụng progressive disclosure. Người học thấy một lớp quyết định trước; chi tiết tiếp theo chỉ mở khi nó trả lời câu hỏi đang có. Không dump một execution plan, bảng metric hoặc architecture diagram ngay đầu bài.

Một giải thích sâu phải có **Why Chain**: điều gì xảy ra → tại sao mechanism đó tạo outcome → dấu hiệu nào quan sát được → khi assumption thay đổi thì kết luận nào đổi. Định nghĩa không có mechanism và evidence chưa đủ.

## 4. Visuals are teaching, not decoration

Visual chỉ tồn tại khi nó dạy một mechanism, một quality attribute hoặc một execution trace mà prose đơn thuần khó làm rõ.

Visual tốt cần có:

- input/query hoặc state ban đầu;
- prediction trước khi reveal khi phù hợp;
- từng bước chuyển state, phần bị loại/chọn và lý do;
- control learner-driven: Reset, Previous, Next; không autoplay;
- reduced-motion support và mobile-readable layout;
- mapping từ visual sang evidence thật: plan, log, metric, query output hoặc test.

Dùng SVG khi cần biểu diễn cấu trúc/đường đi thật (tree, graph, flow). Không dùng một chuỗi card hoặc box thay cho cơ chế cần học. Không xây generic diagram engine nếu một visual tập trung giải quyết đúng một lesson sẽ rõ và dễ bảo trì hơn.

## 5. Labs must teach

Lab là **local simulation** hoặc sandbox trừ khi được live-verified rõ ràng. Lab không phải checklist lệnh chạy.

Mỗi experiment có flow:

1. **Question** — đang kiểm tra hypothesis nào?
2. **Predict** — learner dự đoán mechanism/outcome trước.
3. **Run** — lệnh nhỏ, deterministic khi có thể.
4. **Inspect** — chỉ rõ output, field, metric hay log cần nhìn.
5. **Interpret** — outcome nói gì và không nói gì.
6. **Why** — nối evidence về mental model.
7. **Learn** — rule quyết định có điều kiện.

Nhiều outcome có thể hợp lệ theo version, cache, cost model và dữ liệu. Dạy `result before conclusion`: ghi observation trước, rồi mới tạo hypothesis. Có ít nhất một Break It / debug flow khi failure là phần quan trọng: observation → hypothesis → evidence → experiment → conclusion/recovery.

## 6. Senior layer

Senior content không phải thêm acronym. Nó phải làm rõ decision boundary:

- symptom và known facts;
- điều còn unknown;
- các hypothesis cạnh tranh;
- evidence phân biệt chúng;
- decision, trade-off, blast radius, rollout/canary/rollback hoặc reconciliation khi phù hợp.

Không gọi một giải pháp là best practice nếu chưa nêu workload, correctness requirement, ownership và failure mode. Anti-pattern phải có lý do cơ chế, không chỉ ghi “không nên”.

Transfer case cho phép câu trả lời “chưa đủ thông tin”. Bài mẫu phải chỉ ra cần thêm dữ kiện nào, vì dữ kiện đó ảnh hưởng decision nào, và sẽ lấy evidence ở đâu.

## 7. Explain, recall and assessment

`Explain it back` luôn yêu cầu learner tự trả lời trước. Sau đó mới hiện checklist, rồi model answer ngắn, chính xác bằng tiếng Việt tự nhiên và technical English vừa đủ.

`Final Recall` hỏi câu cụ thể trước khi đưa summary. Recall không được là bản sao ngắn hơn của cả lesson.

Quiz và interview follow-up dùng cùng terminology với lesson. Câu hỏi cần context, constraints, evidence và rationale; không dùng English-heavy hoặc thuật ngữ để làm khó người học.

## 8. Golden Lesson acceptance criteria

Một Golden Lesson đạt khi người học có thể:

- nêu vấn đề thật mà concept giải quyết;
- mô tả mechanism bằng ngôn ngữ của mình;
- dự đoán và đọc một visual/execution trace;
- chạy hoặc diễn giải lab evidence;
- debug ít nhất một assumption sai;
- cân nhắc production trade-off và unknown;
- giải thích ngắn gọn trong interview;
- transfer sang case lạ mà không overclaim.

Index & Execution Plan là benchmark về độ sâu, không phải template heading hay visual bắt buộc cho mọi bài. Runtime/Data có thể dùng decision table và code; Distributed Systems dùng message flow/failure matrix; System Design dùng framework/diagram; Finance dùng lifecycle/state flow; Project Stories dùng worksheet; Question Bank dùng practice cards. Consistency là cùng learning standard, không phải tất cả trang giống nhau.

## 9. UI scope

QuanNet là learning dashboard nhẹ: roadmap, lesson tiếp theo, self-assessment và review. Không thêm gamification/analytics phức tạp nếu chúng không cải thiện learning loop.
