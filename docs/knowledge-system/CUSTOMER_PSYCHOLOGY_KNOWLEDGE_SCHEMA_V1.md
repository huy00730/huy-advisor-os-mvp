# Customer Psychology Knowledge Schema V1

## Purpose

Customer Psychology Knowledge Schema V1 là chuẩn dữ liệu nền cho HUY DIGITAL BRAIN.

Schema này không phải là UI, không phải Engine, và không phải Registry hiện tại. Đây là lớp Knowledge chuẩn để các hệ thống sau có thể đọc cùng một nguồn:

- Psychology Engine
- Workspace Coach
- Question Intelligence
- Trust Building
- Objection Intelligence
- Decision Intelligence

## Design Principle

Một Knowledge không chỉ trả lời “khách nói gì”, mà phải giúp Advisor hiểu:

- Hiện tượng tâm lý là gì.
- Nhu cầu con người phía sau là gì.
- Nỗi sợ thật là gì.
- Dấu hiệu nào ủng hộ giả thuyết.
- Dấu hiệu nào phản bác giả thuyết.
- Nên hỏi gì để kiểm chứng.
- Nếu đúng thì ảnh hưởng đến quyết định ra sao.
- Advisor nên tiếp cận thế nào trong từng ngữ cảnh.

## Knowledge Object

```json
{
  "knowledgeId": "",
  "title": "",
  "summary": "",
  "psychologyDomain": "",
  "phenomenon": "",
  "humanNeed": "",
  "humanFear": "",
  "motivation": "",
  "behaviorSignals": [],
  "possiblePsychology": [],
  "supportingEvidence": [],
  "contradictingEvidence": [],
  "validationQuestions": [],
  "decisionImpact": "",
  "approachA": "",
  "approachB": "",
  "approachC": "",
  "doNotDo": [],
  "coachGuidance": "",
  "learningNotes": "",
  "workspaceMapping": {
    "phone": "",
    "zalo": "",
    "meeting": "",
    "model": "",
    "project": "",
    "showHouse": ""
  },
  "relatedPsychologyRules": [],
  "relatedKnowledge": [],
  "version": "1.0.0"
}
```

## Field Definition

### 1. Knowledge ID

Unique ID của knowledge.

Format đề xuất:

```text
CPK-0001
```

Trong đó:

- `CPK` = Customer Psychology Knowledge
- `0001` = số thứ tự

Field này giúp Engine, Coach và Registry tham chiếu ổn định.

### 2. Title

Tên ngắn, dễ hiểu của knowledge.

Ví dụ:

```text
Khách hỏi giá để kiểm tra giá trị
```

Title phải đủ rõ để Advisor nhìn là hiểu bối cảnh.

### 3. Summary

Tóm tắt 2–4 dòng về knowledge.

Mục tiêu:

- Dùng cho card preview.
- Dùng cho Coach đọc nhanh.
- Dùng cho Search sau này.

### 4. Psychology Domain

Nhóm tâm lý chính.

Ví dụ:

- Price Psychology
- Trust Psychology
- Family Decision
- Delay Behavior
- Investment Mindset
- Risk Avoidance
- Social Proof
- Authority Bias

Field này giúp hệ thống gom nhóm knowledge theo domain.

### 5. Phenomenon

Hiện tượng quan sát được.

Ví dụ:

```text
Khách hỏi giá rất sớm nhưng chưa hỏi nhu cầu, pháp lý, dòng tiền hoặc thanh toán.
```

Phenomenon phải mô tả điều xảy ra bên ngoài, chưa vội kết luận tâm lý.

### 6. Human Need

Nhu cầu con người phía sau hành vi.

Ví dụ:

- Cần cảm giác kiểm soát.
- Cần an toàn.
- Cần được tôn trọng.
- Cần được so sánh trước khi quyết định.
- Cần người thân đồng thuận.

Field này giúp Coach nói chuyện với khách như con người, không chỉ xử lý objection.

### 7. Human Fear

Nỗi sợ thật có thể đứng sau hành vi.

Ví dụ:

- Sợ mua sai.
- Sợ bị hớ.
- Sợ bị ép.
- Sợ gia đình phản đối.
- Sợ không bán lại được.
- Sợ pháp lý không chắc.

Field này giúp Advisor biết điều không nên kích hoạt thêm.

### 8. Motivation

Động cơ khiến khách nói hoặc làm điều đó.

Motivation khác Human Need:

- Human Need là nhu cầu nền.
- Motivation là lý do hành động trong tình huống cụ thể.

Ví dụ:

```text
Khách muốn biết mức giá để quyết định có nên tiếp tục nghe tư vấn hay không.
```

### 9. Behavior Signals

Danh sách tín hiệu hành vi có thể quan sát.

Ví dụ:

```json
[
  "Hỏi giá trước khi hỏi sản phẩm",
  "Nghe giá xong im lặng",
  "So sánh ngay với dự án khác",
  "Không hỏi lịch thanh toán"
]
```

Field này là đầu vào tốt cho Psychology Engine và Question Intelligence.

### 10. Possible Psychology

Các giả thuyết tâm lý có thể đúng.

Ví dụ:

```json
[
  "Khách đang kiểm tra ngân sách",
  "Khách đang so sánh giá trị",
  "Khách chưa đủ niềm tin",
  "Khách sợ bị tư vấn quá sâu"
]
```

Không được ghi một kết luận duy nhất nếu chưa có bằng chứng.

### 11. Supporting Evidence

Dấu hiệu ủng hộ giả thuyết.

Ví dụ:

```json
[
  "Khách đã xem nhà mẫu trước đó",
  "Khách hỏi thêm lịch thanh toán",
  "Khách hỏi có giữ căn không"
]
```

Field này giúp Coach nói “Em dựa trên những dấu hiệu…”.

### 12. Contradicting Evidence

Dấu hiệu phản bác giả thuyết.

Ví dụ:

```json
[
  "Khách chỉ hỏi giá rồi biến mất",
  "Khách không hỏi thêm sản phẩm",
  "Khách không để lại kênh follow-up"
]
```

Field này giúp hệ thống tránh tự tin quá mức.

### 13. Validation Questions

Câu hỏi kiểm chứng.

Ví dụ:

```json
[
  "Anh/chị đang muốn biết tổng giá hay vốn ban đầu cần chuẩn bị ạ?",
  "Mình đang so với ngân sách dự kiến hay so với dự án khác ạ?",
  "Nếu giá phù hợp thì điều tiếp theo mình muốn kiểm tra là gì ạ?"
]
```

Field này phục vụ trực tiếp:

- Question Intelligence
- Athena muốn hỏi
- Call Coach
- Workspace Coach

### 14. Decision Impact

Ảnh hưởng của insight này đến quyết định mua.

Ví dụ:

```text
Nếu khách đang hỏi giá để kiểm tra ngân sách, Advisor cần chuyển từ tổng giá sang vốn thực, lịch thanh toán và mức an toàn tài chính.
```

Field này giúp Decision Intelligence biết nên đổi chiến lược gì.

### 15. Approach A

Cách tiếp cận cơ bản.

Dành cho khách lạnh, chưa rõ nhu cầu, hoặc chưa đủ dữ liệu.

Ví dụ:

```text
Hỏi ngắn để xác định khách đang cần biết tổng giá hay vốn ban đầu.
```

### 16. Approach B

Cách tiếp cận trung bình.

Dành cho khách đã có tương tác hoặc có một phần dữ liệu.

Ví dụ:

```text
Giải thích giá theo bối cảnh sản phẩm, rồi hỏi tiêu chí khách đang so sánh.
```

### 17. Approach C

Cách tiếp cận nâng cao.

Dành cho khách nóng, khách đã xem thực tế, khách đang thương lượng hoặc khách có buying signal.

Ví dụ:

```text
Chuyển sang bài toán tổng chi phí, lịch thanh toán, căn phù hợp và bước giữ quyền chọn nếu khách đã sẵn sàng.
```

### 18. Do Not Do

Danh sách điều không nên làm.

Ví dụ:

```json
[
  "Đừng né giá",
  "Đừng nói giá rẻ",
  "Đừng giải thích bảng giá quá dài",
  "Đừng tranh luận khi khách nói cao"
]
```

Field này phục vụ:

- Trust Building
- Workspace Coach
- Objection Intelligence

### 19. Coach Guidance

Lời hướng dẫn ngắn cho Advisor.

Nên viết như HLV nói với Huy.

Ví dụ:

```text
Nếu là em, em sẽ trả lời giá vừa đủ, rồi hỏi khách đang muốn kiểm tra tổng giá hay vốn ban đầu. Đừng cố thuyết phục giá hợp lý quá sớm.
```

### 20. Learning Notes

Ghi chú học tập nội bộ.

Dùng để cập nhật sau thực chiến.

Ví dụ:

```text
Nếu nhiều khách hỏi giá rồi im lặng, cần bổ sung câu hỏi kiểm tra ngân sách trước khi gửi bảng giá.
```

### 21. Workspace Mapping

Mapping cách dùng knowledge theo từng workspace.

```json
{
  "phone": "Hỏi nhanh để xác định ý định trước khi tư vấn.",
  "zalo": "Gửi một tin ngắn kèm câu hỏi mở.",
  "meeting": "Quan sát phản ứng trước khi nói sâu.",
  "model": "Dẫn từ tổng thể đến vị trí trước khi nói giá.",
  "project": "Dùng điểm dừng thực tế để kiểm chứng nhu cầu.",
  "showHouse": "Quan sát cảm xúc sống trước khi hỏi ngân sách."
}
```

Field này phục vụ trực tiếp Workspace Coach.

### 22. Related Psychology Rules

Danh sách Psychology Rule ID có liên quan.

Ví dụ:

```json
[
  "PF-0021",
  "PF-0024",
  "PF-0031"
]
```

Field này chỉ để hệ thống mapping nội bộ.

Không bắt buộc hiển thị cho Advisor.

### 23. Related Knowledge

Danh sách Knowledge liên quan.

Ví dụ:

```json
[
  "CPK-0002",
  "CPK-0011"
]
```

Field này giúp mở rộng graph knowledge.

### 24. Version

Version của knowledge.

Format:

```text
1.0.0
```

Dùng để biết knowledge đã được cập nhật qua thực chiến hay chưa.

## Minimal Example

```json
{
  "knowledgeId": "CPK-0001",
  "title": "Khách hỏi giá ngay đầu cuộc gọi",
  "summary": "Khách hỏi giá sớm không nhất thiết chỉ muốn biết giá. Có thể khách đang kiểm tra ngân sách, giá trị hoặc mức độ đáng nghe tiếp.",
  "psychologyDomain": "Price Psychology",
  "phenomenon": "Khách hỏi giá trước khi nói rõ nhu cầu, tài chính hoặc tiêu chí mua.",
  "humanNeed": "Cần cảm giác kiểm soát trước khi tiếp tục cuộc trò chuyện.",
  "humanFear": "Sợ bị kéo vào tư vấn dài hoặc phát hiện sản phẩm vượt ngân sách.",
  "motivation": "Muốn biết có nên tiếp tục nghe tư vấn hay không.",
  "behaviorSignals": [
    "Hỏi giá rất sớm",
    "Chưa hỏi sản phẩm cụ thể",
    "Chưa hỏi lịch thanh toán"
  ],
  "possiblePsychology": [
    "Đang kiểm tra ngân sách",
    "Đang lọc sale",
    "Chưa đủ niềm tin để chia sẻ nhu cầu"
  ],
  "supportingEvidence": [
    "Khách hỏi thêm lịch thanh toán sau khi nghe giá",
    "Khách hỏi có phương án vốn ban đầu không"
  ],
  "contradictingEvidence": [
    "Khách không hỏi thêm bất kỳ thông tin nào",
    "Khách từ chối để lại kênh liên hệ"
  ],
  "validationQuestions": [
    "Anh/chị đang muốn biết tổng giá hay vốn ban đầu cần chuẩn bị ạ?",
    "Mình đang so với ngân sách dự kiến hay so với dự án khác ạ?"
  ],
  "decisionImpact": "Advisor cần trả lời giá vừa đủ, sau đó chuyển sang vốn thực và tiêu chí khách đang dùng để đánh giá.",
  "approachA": "Trả lời ngắn và hỏi khách đang cần biết tổng giá hay vốn ban đầu.",
  "approachB": "Nói giá theo bối cảnh sản phẩm rồi hỏi tiêu chí so sánh.",
  "approachC": "Nếu khách có buying signal, chuyển sang tổng chi phí, lịch thanh toán và bước giữ quyền chọn.",
  "doNotDo": [
    "Đừng né giá",
    "Đừng nói giá rẻ",
    "Đừng giải thích bảng giá quá dài"
  ],
  "coachGuidance": "Nếu là em, em sẽ trả lời giá vừa đủ, rồi hỏi khách đang muốn kiểm tra tổng giá hay vốn ban đầu.",
  "learningNotes": "Theo dõi tỷ lệ khách phản hồi sau khi hỏi lại vốn ban đầu.",
  "workspaceMapping": {
    "phone": "Trả lời ngắn, hỏi lại ý định hỏi giá.",
    "zalo": "Gửi khoảng giá ngắn kèm câu hỏi vốn ban đầu.",
    "meeting": "Dùng nhu cầu thật để giải thích giá.",
    "model": "Dẫn từ vị trí/sản phẩm đến giá.",
    "project": "Gắn giá với trải nghiệm thực tế.",
    "showHouse": "Gắn giá với công năng và cảm xúc sống."
  },
  "relatedPsychologyRules": [
    "PF-0021"
  ],
  "relatedKnowledge": [
    "CPK-0002"
  ],
  "version": "1.0.0"
}
```

## Extension Rules

Khi thêm Knowledge mới:

1. Không viết như tài liệu lý thuyết.
2. Không viết như câu trả lời khách hàng.
3. Phải viết như dữ liệu để Engine và Coach đọc được.
4. Phải tách rõ quan sát, giả thuyết, bằng chứng, câu hỏi kiểm chứng và hành động.
5. Không được khẳng định tâm lý nếu thiếu evidence.
6. Không dùng dữ liệu dự án chưa xác minh.
7. Mỗi Knowledge phải dùng được trong ít nhất một workspace.

## Compatibility With Current CRM

Schema này có thể mapping vào CRM hiện tại như sau:

| Schema Field | CRM hiện tại có thể đọc từ |
|---|---|
| Behavior Signals | Timeline, Call Review, Diagnosis, Customer Memory |
| Possible Psychology | Psychology Profile |
| Supporting Evidence | Athena Explanation, Timeline, Diagnosis |
| Contradicting Evidence | Athena chưa chắc, unknowns |
| Validation Questions | Athena muốn hỏi, Call Review |
| Decision Impact | Today Action, Decision Recommendation |
| Approach A/B/C | Workspace Coach |
| Do Not Do | Things To Avoid, Athena Coach |
| Coach Guidance | Customer360 Psychology Card |
| Workspace Mapping | Workspace Coach |
| Related Psychology Rules | Psychology Registry |
| Related Knowledge | Knowledge Recommendation |

## Version History

| Version | Date | Notes |
|---|---|---|
| 1.0.0 | 2026-06-29 | Initial schema for Customer Psychology Knowledge System |
