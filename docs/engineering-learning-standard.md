# QuanNet Engineering Learning Standard v2.4

## 1. Product goal

QuanNet giúp Backend .NET developer Việt Nam **hiểu cơ chế, tự kiểm chứng, debug, giải thích và chuyển kiến thức sang tình huống mới**. Một lesson chưa hoàn thành chỉ vì learner đã đọc hết hoặc trả lời đúng một câu.

**Mastery > Calendar.** Tiến độ và streak là tín hiệu phụ. Dấu hiệu học chắc là learner mô tả được mechanism, dự đoán outcome, dùng evidence để sửa giả thuyết, và nêu trade-off trong context mới.

Nguyên tắc nền tảng của v2.4: **Concept Origin Before Definition**. Learner cần hiểu vì sao con người phải tạo ra concept trước khi nhớ tên của nó.

## 2. Concept origin and name-it-late

Không mở một concept quan trọng bằng định nghĩa. Xây nhu cầu theo thứ tự:

```text
question / problem
→ simplest approach
→ what it can do
→ where it breaks
→ new property we need
→ intuitive solution
→ technical name
→ short definition
→ mechanism and evidence
```

First-use của một concept khó phải trả lời: vấn đề gì đang có, cách đơn giản là gì, nó thiếu gì, ý tưởng trực giác nào giải quyết chỗ thiếu đó, rồi mới gọi tên thuật ngữ. Dùng một ví dụ nhỏ trước khi tổng quát hóa.

`Name it late`: nói “database cần chọn đường lấy dữ liệu ít work hơn” trước khi nói `planner`; nói “bước này dự kiến trả ra bao nhiêu row” trước khi nói `cardinality estimate`. Không trì hoãn tên nếu tên đó cần để đọc evidence, nhưng không dùng tên như điểm bắt đầu.

## 3. Dependency, vocabulary and abstraction

Concept dependency gồm cả **motivation dependency**: learner không chỉ biết A trước B, mà còn biết A tồn tại để giải quyết vấn đề gì trước khi A dùng để giải thích B.

Mỗi learning step ngắn ưu tiên một ý mới. Nếu một đoạn phải mang 5–7 thuật ngữ chưa giải thích, dependency order đang sai. Ở lần đầu xuất hiện, giữ thuật ngữ ngành khi developer dùng thật, giải thích ngắn bằng tiếng Việt tự nhiên, nối nó với câu hỏi trước đó và chỉ dùng song ngữ khi có ích cho log, docs hoặc interview.

Với concept khó, đi theo abstraction ladder:

```text
concrete problem → intuitive/physical picture → simple mechanism
→ technical abstraction → real evidence
```

Không cắt technical depth; đặt nó sau mental model, theo thứ tự intuition → mechanism → evidence → nuance.

## 4. Metrics and neighboring concepts

Không đưa acronym hoặc metric như `p95`, `p99`, `SLO`, `RPS`, `TTL`, `GC` vào bài như prerequisite ngầm. Trước metric quan trọng, lesson phải cho biết:

- câu hỏi nào đang cần trả lời;
- thứ gì được đo và đơn vị/ý nghĩa thực tế;
- cách nhìn đơn giản nào có thể dùng trước;
- vì sao cách đó chưa đủ;
- metric này cho thêm điều gì;
- metric gần nó khác nhau thế nào.

Metric origin rule: không dùng metric để trang trí production story. Ví dụ latency bắt đầu từ “user chờ response bao lâu?”, sau đó mới đặt average, p50, p95, p99 và max cạnh nhau theo câu hỏi chúng trả lời. Nếu metric không đổi decision, bỏ nó.

Neighbor concept rule: khi có những lựa chọn cùng problem space, đặt đủ ngữ cảnh để learner biết chúng cùng giải quyết gì, khác ở đâu và khi nào concept chính hữu ích hơn. Comparison chỉ xuất hiện sau một decision question, không phải một bảng để học thuộc.

## 5. Teaching sequence and visuals

Mặc định dùng **Toy → Realistic → Production**:

1. Toy cô lập mechanism bằng số nhỏ.
2. Realistic thêm query shape, failure hoặc data distribution gần công việc thật.
3. Production thêm symptom, evidence, unknown, risk và trade-off.

Giải thích sâu phải có Why Chain: điều gì xảy ra → vì sao mechanism tạo outcome → evidence nào quan sát được → assumption nào đổi thì kết luận nào đổi.

Visual chỉ tồn tại khi nó trả lời một learning question chính. Nó cần input/state ban đầu, prediction trước reveal khi phù hợp, từng bước state chuyển đổi, learner-driven control và mapping sang evidence thật. Dùng SVG khi cần thể hiện structure/path thật; không làm generic diagram engine khi visual tập trung rõ hơn.

**Geometry represents data. Prose explains data.** Không nhét prose vào narrow bar, circle, tiny node hay percentage-width shape. Không dùng long vertical semantic label, `nowrap` cho prose trong geometry động, hoặc decoration chồng lên content. Ở mọi breakpoint, meaning quan trọng hơn layout cleverness; horizontal scroll chỉ dùng chủ ý cho table, timeline, tree hoặc flow rộng.

## 6. Labs and production reasoning

Lab là **local simulation** hoặc sandbox trừ khi đã `live-verified`. Lab không phải checklist lệnh. Mỗi experiment đi theo:

1. Question;
2. Predict;
3. Run;
4. Inspect;
5. Interpret;
6. Why;
7. Learn.

Dạy result before conclusion. Nếu version, cache, cost model hay data có thể tạo nhiều outcome, ghi rõ boundary. Khi failure quan trọng, thêm break/debug flow: observation → hypothesis → evidence → experiment → conclusion/recovery.

Senior layer làm rõ decision boundary: symptom, known facts, unknown, hypothesis cạnh tranh, evidence phân biệt, decision, trade-off và blast radius/rollout/recovery khi phù hợp. Không gọi giải pháp là best practice nếu chưa nói workload, correctness requirement, ownership và failure mode.

## 7. Explain, recall and assessment

`Explain it back` bắt learner tự trả lời trước, sau đó mới có checklist và model answer ngắn. Final Recall hỏi câu cụ thể, không phải bản rút gọn của bài.

Quiz và interview follow-up dùng cùng terminology với lesson; phải có context, constraint, evidence và rationale. Không dùng English-heavy hoặc jargon để làm khó learner.

## 8. Research-backed authoring

Golden lesson không được viết chỉ từ model memory. Dùng source roles tách biệt:

```text
official docs/spec → factual correctness
strong article/book/site → conceptual explanation
selected video → visual/temporal teaching
engineering case → production boundary/failure
```

Source hierarchy mặc định cho factual correctness là: official specification/documentation → maintainer/vendor engineering material → strong independent technical material → experienced educator → community discussion. Đây không phải ranking mù: docs có thể khó dạy và teaching source có thể đơn giản hóa; fact quan trọng vẫn phải cross-check bằng primary source. Khi source khác nhau, kiểm version, workload, definition và abstraction level; nếu evidence chưa đủ, ghi uncertainty thay vì chọn im lặng.

Trước authoring, ghi source map 3–8 nguồn tốt: source, type, fact/concept đã xác minh, teaching insight và cách QuanNet dùng. Với video, đánh giá credibility, mechanism depth, clarity, visual quality, production relevance và freshness; không chọn theo views/title. Với .NET, PostgreSQL, Kubernetes, AWS và framework/library API, ghi version/date khi behavior phụ thuộc version.

Research phải cải thiện pedagogy, không chỉ content: educator bắt đầu từ problem nào, tạo need cho concept ra sao, trì hoãn terminology tới đâu, ví dụ đầu tiên nhỏ thế nào, visual nào làm mechanism click, alternative/misconception nào được xử lý.

Không copy/translate transcript, prose, diagram, screenshot hay animation. Research chỉ cung cấp fact, misconception, teaching pattern và failure idea; lesson vẫn phải là narrative, example, SVG/interaction, lab và transfer case nguyên bản. Sau research: trích teaching insight → rebuild dependency map → tạo narrative/example/visual nguyên bản → cross-check fact.

Phân biệt rõ: **Fact** có docs/spec/evidence hỗ trợ; **simplified mental model** được phép để dạy nhưng phải label khi không phải implementation chính xác; **engineering judgment** phụ thuộc context nên phải nêu constraint, trade-off và evidence có thể đổi decision. Với claim phụ thuộc version/workload, nêu boundary hoặc uncertainty.

## 9. Learner-first review and acceptance

Trước khi freeze, reviewer đọc như learner mới và liên tục hỏi:

- Term này từ đâu ra? Nó giải quyết vấn đề gì?
- Cách đơn giản trước đó là gì, và nó thiếu ở đâu?
- Ví dụ có đủ nhỏ để nhìn bằng mắt không?
- Concept này nối với đoạn trước thế nào?
- Tôi có phải Google để tiếp tục không?

Với mỗi concept chính, learner phải trả lời được:

1. Vấn đề nào làm nó cần tồn tại?
2. Cách đơn giản trước nó là gì?
3. Cách cũ thiếu gì?
4. Nó thay mechanism thế nào?
5. Concept gần nó là gì và boundary ra sao?
6. Khi nào không dùng?
7. Evidence nào cho thấy nó đang hoạt động?

Một Golden Lesson đạt khi learner có thể nêu vấn đề thật, mô tả mechanism, dự đoán visual/trace, đọc lab evidence, debug assumption sai, cân nhắc production trade-off, transfer sang case lạ, giải thích trong interview và recall sau đó. Index là benchmark về causal depth, không phải template heading/visual bắt buộc cho mọi topic.

## 10. UI scope

QuanNet là learning dashboard nhẹ: roadmap, lesson tiếp theo, self-assessment và review. Không thêm gamification/analytics nếu chúng không làm learning loop tốt hơn.