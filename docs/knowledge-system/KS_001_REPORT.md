# KS-001 Report

## Sprint

Customer Psychology Knowledge System Foundation

## Mục tiêu

Thiết kế Knowledge Schema chuẩn cho toàn bộ HUY DIGITAL BRAIN.

Knowledge này sẽ là nguồn duy nhất để các hệ thống sau đọc:

- Psychology Engine
- Workspace Coach
- Question Intelligence
- Trust Building
- Objection Intelligence
- Decision Intelligence

## File đã tạo

- `docs/knowledge-system/CUSTOMER_PSYCHOLOGY_KNOWLEDGE_SCHEMA_V1.md`
- `docs/knowledge-system/KS_001_REPORT.md`

## Ràng buộc đã giữ

Không thực hiện:

- Không sửa CRM.
- Không sửa UI.
- Không sửa Customer360.
- Không sửa Engine.
- Không sửa Registry.
- Không sửa Database.
- Không viết nội dung 100 Knowledge.

## Schema

Mỗi Knowledge có các field chuẩn:

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

## Giải thích từng field

| Field | Ý nghĩa | Vì sao cần |
|---|---|---|
| Knowledge ID | ID duy nhất của Knowledge | Giúp Engine, Coach và Registry tham chiếu ổn định |
| Title | Tên ngắn, dễ hiểu | Advisor và hệ thống biết nhanh knowledge nói về gì |
| Summary | Tóm tắt 2–4 dòng | Dùng cho preview, search, coach đọc nhanh |
| Psychology Domain | Nhóm tâm lý | Giúp gom nhóm theo Giá, Niềm tin, Gia đình, Đầu tư… |
| Phenomenon | Hiện tượng quan sát được | Tách quan sát khỏi kết luận tâm lý |
| Human Need | Nhu cầu con người phía sau | Giúp Coach nói chuyện với khách như con người |
| Human Fear | Nỗi sợ thật | Giúp Advisor tránh kích hoạt thêm nỗi sợ |
| Motivation | Động cơ trong tình huống cụ thể | Giúp hiểu vì sao khách nói/làm như vậy |
| Behavior Signals | Dấu hiệu hành vi | Là input cho Psychology Engine và Question Intelligence |
| Possible Psychology | Các giả thuyết tâm lý | Tránh kết luận một chiều khi chưa đủ bằng chứng |
| Supporting Evidence | Bằng chứng ủng hộ | Giúp Athena nói “Em dựa trên những dấu hiệu…” |
| Contradicting Evidence | Bằng chứng phản bác | Giúp giảm ảo tưởng chắc chắn |
| Validation Questions | Câu hỏi kiểm chứng | Dùng cho Athena muốn hỏi, Call Coach, Question Intelligence |
| Decision Impact | Ảnh hưởng đến quyết định | Dùng cho Decision Intelligence và Today Action |
| Approach A | Cách tiếp cận cơ bản | Dành cho khách lạnh hoặc thiếu dữ liệu |
| Approach B | Cách tiếp cận trung bình | Dành cho khách có một phần dữ liệu |
| Approach C | Cách tiếp cận nâng cao | Dành cho khách nóng hoặc có buying signal |
| Do Not Do | Điều không nên làm | Dùng cho Trust Building, Objection Intelligence, Workspace Coach |
| Coach Guidance | Lời HLV cho Advisor | Dùng trực tiếp cho Customer360 và Athena Coach |
| Learning Notes | Ghi chú học tập | Dùng để cải tiến sau thực chiến |
| Workspace Mapping | Mapping theo ngữ cảnh làm việc | Dùng cho Workspace Coach |
| Related Psychology Rules | Rule liên quan | Kết nối với Psychology Registry hiện tại |
| Related Knowledge | Knowledge liên quan | Tạo graph knowledge |
| Version | Version của knowledge | Theo dõi cập nhật qua thực chiến |

## Vì sao chọn các field này

Schema được thiết kế theo chuỗi suy luận của Advisor:

```text
Hiện tượng
→ Nhu cầu / Nỗi sợ
→ Giả thuyết tâm lý
→ Bằng chứng ủng hộ / phản bác
→ Câu hỏi kiểm chứng
→ Ảnh hưởng đến quyết định
→ Cách tiếp cận
→ Điều không nên làm
→ Coach Guidance
```

Lý do:

1. Advisor không chỉ cần câu trả lời, mà cần biết khách đang nghĩ gì.
2. Psychology Engine cần dữ liệu có cấu trúc, không phải đoạn văn dài.
3. Workspace Coach cần cùng một insight nhưng biến đổi theo Điện thoại/Zalo/Gặp/Sa bàn/Dự án/Nhà mẫu.
4. Question Intelligence cần câu hỏi kiểm chứng, không cần thêm rule mới.
5. Trust Building cần biết nỗi sợ và điều không nên làm.
6. Objection Intelligence cần hiểu phản đối là biểu hiện của nhu cầu/nỗi sợ nào.
7. Decision Intelligence cần biết insight này ảnh hưởng gì đến bước tiếp theo.

## Khả năng mở rộng

Schema này có thể mở rộng đến:

- 1.000 Customer Psychology Knowledge.
- 500 Decision Knowledge.
- 2.000 Selling Keys.
- Nhiều workspace mới sau này.
- Nhiều version theo dữ liệu thực chiến.

Lý do có thể mở rộng:

- Có ID ổn định.
- Có version.
- Có relatedKnowledge để tạo graph.
- Có relatedPsychologyRules để nối với Registry hiện tại.
- Có workspaceMapping để không phải tạo schema riêng cho từng bối cảnh.
- Có supporting/contradicting evidence để Engine không suy luận một chiều.

## Mapping với CRM hiện tại

| Knowledge Schema | CRM hiện tại |
|---|---|
| Phenomenon | Timeline, Call Review, Customer Memory |
| Human Need | Customer Psychology Engine output |
| Human Fear | Psychology Profile, Diagnosis Barrier |
| Motivation | Psychology Profile motivation |
| Behavior Signals | Timeline, Diagnosis, Customer Memory, Deal Signals |
| Possible Psychology | `psychologyProfile` |
| Supporting Evidence | Athena Explanation |
| Contradicting Evidence | Athena chưa chắc, unknowns |
| Validation Questions | Athena muốn hỏi |
| Decision Impact | Today Action |
| Approach A/B/C | Workspace Coach |
| Do Not Do | Things To Avoid, Athena Coach |
| Coach Guidance | Customer360 Psychology Card |
| Workspace Mapping | Workspace Selector / Workspace Coach |
| Related Psychology Rules | `psychologyRegistry` PF-0001 → PF-0100 |
| Related Knowledge | Knowledge Recommendation |

## Mapping với các hệ thống tương lai

### Psychology Engine

Đọc:

- Phenomenon
- Behavior Signals
- Possible Psychology
- Supporting Evidence
- Contradicting Evidence
- Validation Questions
- Related Psychology Rules

### Workspace Coach

Đọc:

- Coach Guidance
- Approach A/B/C
- Do Not Do
- Workspace Mapping
- Validation Questions

### Question Intelligence

Đọc:

- Validation Questions
- Contradicting Evidence
- Human Need
- Human Fear

### Trust Building

Đọc:

- Human Fear
- Do Not Do
- Approach A/B/C
- Coach Guidance

### Objection Intelligence

Đọc:

- Phenomenon
- Motivation
- Human Fear
- Decision Impact
- Do Not Do
- Validation Questions

### Decision Intelligence

Đọc:

- Decision Impact
- Approach A/B/C
- Supporting Evidence
- Contradicting Evidence
- Related Knowledge

## Nguyên tắc khi viết Knowledge sau này

1. Không viết như bài học dài.
2. Không viết như câu trả lời sẵn cho khách.
3. Phải viết như dữ liệu để Engine đọc được.
4. Không kết luận tâm lý nếu thiếu evidence.
5. Phải có câu hỏi kiểm chứng.
6. Phải có điều không nên làm.
7. Phải có mapping theo workspace.
8. Không dùng dữ liệu dự án chưa xác minh.

## Kết luận

KS-001 PASS.

Đã tạo nền schema cho Customer Psychology Knowledge System. Đây có thể trở thành nguồn chuẩn để HUY DIGITAL BRAIN đọc về sau mà không cần mỗi engine tự tạo logic và dữ liệu riêng.
