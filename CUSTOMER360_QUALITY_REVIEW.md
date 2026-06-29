# Customer360 Quality Review

## Sprint

CRM-QUALITY-001 — Customer360 Quality Pass

## Phạm vi

Đây là sprint review chất lượng, không phải sprint code.

Không thực hiện:

- Không code.
- Không refactor.
- Không thêm module.
- Không thêm engine.
- Không thêm registry.
- Không thêm database.
- Không thêm AI API.
- Không thêm màn hình mới.

## Mục tiêu review

Đánh giá Customer360 để trả lời câu hỏi:

> Màn hình này có đủ tốt để Huy mở trước khi tương tác với khách và biết ngay phải làm gì không?

Tiêu chí đánh giá từng card:

1. Có thực sự giúp Huy bán hàng tốt hơn không?
2. Có trùng với card khác không?
3. Có quá dài không?
4. Có thể đọc trong 30 giây không?

## Kết luận ngắn

Customer360 hiện rất mạnh về tư duy và dữ liệu, nhưng đang quá tải.

Điểm mạnh là CRM đã có đủ các lớp cần thiết:

- Khách là ai.
- Khách đang ở đâu.
- Tâm lý khách là gì.
- Hôm nay nên làm gì.
- Không nên làm gì.
- Knowledge/Decision nên dùng.
- Timeline quan hệ.

Vấn đề lớn nhất:

> Customer360 đang giống “bộ não đầy đủ” hơn là “màn hình trước cuộc gọi”.

Huy cần 30 giây để hành động, nhưng hiện tại có nhiều phần cần đọc kỹ hơn 2–3 phút.

## 1. Điểm mạnh

### 1. Có đủ dữ liệu để ra quyết định

Customer360 đã gom được:

- Customer Overview.
- Workspace context.
- Psychology Coach.
- Journey.
- Last Interaction.
- Today Action.
- Things To Avoid.
- Knowledge Recommendation.
- Timeline.

Đây là nền tốt. Không thiếu “nguyên liệu”.

### 2. Today Action đã đúng vai trò trung tâm

Card Today Action trả lời được:

- Hôm nay làm gì.
- Vì sao làm.
- Mục tiêu là gì.
- Nếu khách phản hồi thì xử lý sao.

Đây là card gần nhất với nhu cầu thực chiến.

### 3. Psychology Coach có chiều sâu

Card Tâm lý khách hàng đã có:

- Athena nhận định.
- Athena giải thích.
- Athena chưa chắc.
- Athena muốn hỏi.
- Athena coach.
- Điều không nên làm.
- Câu hỏi kiểm chứng.

Đây là lớp khác biệt của HUY ADVISOR OS.

### 4. Timeline đã là nhật ký quan hệ

Timeline không chỉ là log kỹ thuật. Nó có:

- Ngày giờ.
- Loại sự kiện.
- Tiêu đề.
- Tóm tắt.
- Next Action.
- Follow-up.
- Click xem chi tiết.

Nền này đúng hướng.

## 2. Điểm yếu

### 1. Quá nhiều card trước khi đến hành động

Hiện thứ tự chính:

1. Customer Overview
2. Workspace Selector
3. Psychology Coach
4. Customer Journey
5. Last Interaction
6. Today Action
7. Things To Avoid
8. Knowledge Recommendation
9. Timeline

Vấn đề:

Today Action là phần quan trọng nhất trước cuộc gọi nhưng đang nằm sau nhiều block lớn.

Huy phải đọc qua nhiều lớp phân tích trước khi thấy “hôm nay nên làm gì”.

### 2. Psychology Coach quá dài

Card Psychology Coach hiện rất mạnh nhưng quá nhiều chữ.

Một số phần đang lặp format 6 bước nhiều lần:

- Athena nhận định đã có 6 dòng insight.
- Athena giải thích cũng có 3 dòng insight.
- Athena chưa chắc cũng có 3 dòng insight.
- Athena Coach lại có 6 dòng insight.

Kết quả:

Huy có thể hiểu sâu, nhưng không thể đọc nhanh trong 30 giây.

### 3. Today Action cũng bị dài

Today Action hiện có:

- Việc cần làm.
- Lý do dạng Insight 6 bước.
- Mục tiêu dạng Insight 6 bước.
- Nếu khách phản hồi...
- Nút gọi ngay.

Vấn đề:

Card hành động đáng ra phải ngắn, nhưng hiện đang trở thành một card phân tích dài.

### 4. Workspace Coach bị đặt như một card độc lập nhưng nội dung lại nằm trong Psychology Coach

Selector “Hôm nay anh đang ở đâu?” hữu ích.

Nhưng vai trò hơi lẫn:

- Selector là riêng.
- Nội dung coach lại nằm trong card Tâm lý khách hàng.

Người dùng có thể không hiểu:

“Mình đổi workspace để đổi phần nào?”

### 5. Knowledge Recommendation khá nặng

Card này gồm 3 cột:

- Knowledge nên dùng.
- Decision Recommendation.
- Sales Reminder.

Nó hữu ích, nhưng chưa phải thứ cần đọc đầu tiên trước cuộc gọi.

Nếu đặt quá cao, nó làm Huy đọc thêm thay vì hành động.

## 3. Chỗ trùng lặp

### Trùng 1: Psychology Coach và Things To Avoid

Psychology Coach đã có “Điều không nên làm”.

Things To Avoid lại có:

- Điều cần tránh.
- Điều khách không thích.
- Điều phải nhớ.

Hai phần này đang gần nhau về mục tiêu.

Đề xuất:

Gộp hoặc rút Things To Avoid thành dòng phụ trong Today Action / Psychology Coach.

### Trùng 2: Today Action và Athena Coach

Today Action nói:

- Việc cần làm.
- Mục tiêu.
- Nếu khách phản hồi.

Athena Coach nói:

- Nếu là em...
- Cách tiếp cận.
- Điều nên kiểm tra.

Hai phần đều đang chỉ Huy “nên làm gì”.

Đề xuất:

Today Action nên là chỉ đạo cuối cùng.

Athena Coach nên là lý do hỗ trợ, không nên cạnh tranh vị trí.

### Trùng 3: Customer Overview và Last Interaction

Customer Overview có “Điều cần nhớ”, stage, barrier, decision maker, interest.

Last Interaction có lần cuối, đã gửi gì, phản hồi gì, follow-up.

Hai phần đều trả lời “khách hiện trạng thế nào”.

Đề xuất:

Gộp thành một vùng “Customer Snapshot” ngắn:

- Khách là ai.
- Điều cần nhớ.
- Lần cuối nói gì.
- Follow-up khi nào.

### Trùng 4: Journey và Diagnosis Stage

Customer Overview có `Customer Stage`.

Customer Journey lại hiển thị journey dạng tiến trình.

Hai khái niệm này dễ gây nhầm:

- Customer Stage trong Diagnosis: tâm lý/mức quan tâm.
- Customer Journey: hành trình bán hàng.

Đề xuất:

Đổi nhãn rõ hơn trong V2:

- “Mức quan tâm” cho Diagnosis Stage.
- “Hành trình bán hàng” cho Journey.

Không nên để cả hai đều gọi là Stage.

## 4. Chỗ gây quá tải

### 1. Insight format 6 dòng xuất hiện quá nhiều

Format:

1. Em đang quan sát thấy...
2. Em nghĩ điều này...
3. Em dựa trên...
4. Điều em chưa chắc...
5. Điều em muốn anh kiểm tra...
6. Nếu là em...

Format này tốt cho phân tích sâu.

Nhưng nếu xuất hiện ở nhiều block cùng lúc, nó làm màn hình nặng.

Đề xuất:

Chỉ dùng full 6 dòng trong phần mở rộng.

Bản mặc định chỉ hiện:

- Nhận định 1 câu.
- Việc nên làm 1 câu.
- Câu hỏi nên hỏi 1 câu.
- Điều không nên làm 1 câu.

### 2. Psychology Coach hiện quá nhiều trạng thái cùng lúc

Trong một card có:

- Nhận định.
- Giải thích.
- Chưa chắc.
- Muốn hỏi.
- Conversation state.
- Coach.
- Focus chips.
- Recommendation.
- Điều không nên làm.
- Câu hỏi kiểm chứng.

Đây là quá nhiều cho 30 giây.

Đề xuất:

Tách thành:

- Mặc định: 4 dòng thực chiến.
- Mở rộng: Insight chi tiết + hỏi kiểm chứng.

### 3. Knowledge Recommendation đặt trước Timeline

Nếu Huy chưa nhớ lần trước nói gì, Knowledge Recommendation có thể chưa đủ ngữ cảnh.

Đề xuất:

Last Interaction / Timeline tóm tắt nên đứng trước Knowledge Recommendation.

## 5. Đánh giá từng card

| Card | Giúp bán tốt hơn? | Trùng lặp? | Quá dài? | Đọc 30s? | Khuyến nghị |
|---|---|---|---|---|---|
| Customer Overview | Có | Có, với Last Interaction và Journey Stage | Trung bình | Có nếu rút field | Giữ nhưng gộp với Last Interaction thành Snapshot |
| Workspace Selector | Có | Không | Không | Có | Giữ, nhưng làm rõ nó điều khiển Coach |
| Psychology Coach | Có, rất mạnh | Có, với Today Action và Things To Avoid | Có | Không | Rút gọn mạnh, phần chi tiết đưa vào mở rộng |
| Customer Journey | Có | Có, với Customer Stage | Không | Có | Giữ, đổi nhãn rõ hơn |
| Last Interaction | Có | Có, với Overview/Timeline | Không | Có | Giữ, nhưng gộp vào Snapshot |
| Today Action | Có, quan trọng nhất | Có, với Athena Coach | Có | Chưa | Giữ, đưa lên cao và rút còn 3 dòng |
| Things To Avoid | Có | Có, với Psychology Coach | Không | Có | Gộp vào Today Action hoặc Psychology Coach |
| Knowledge Recommendation | Có | Một phần với Decision/Coach | Trung bình | Tùy số item | Rút gọn còn 1 Knowledge + 1 Decision mặc định |
| Timeline | Có | Không nếu dùng làm lịch sử | Có thể dài | Không nếu nhiều event | Giữ, mặc định 3 event mới nhất |

## 6. Đề xuất đơn giản hóa

### Nguyên tắc V2

Customer360 nên trả lời 5 câu trong 30 giây:

1. Khách là ai?
2. Lần trước đã nói gì?
3. Hôm nay làm gì?
4. Nói/hỏi câu nào?
5. Tránh điều gì?

### Đề xuất rút gọn mặc định

#### Customer Snapshot

Gộp:

- Customer Overview
- Last Interaction

Hiển thị mặc định:

- Tên / nghề / gia đình.
- Điều cần nhớ.
- Lần cuối nói gì.
- Follow-up khi nào.

#### Today Action

Đưa lên vị trí số 2.

Hiển thị:

- Việc cần làm.
- Vì sao.
- Mục tiêu.
- Nút Gọi.

Không dùng full Insight 6 dòng ở bản mặc định.

#### Psychology Coach

Hiển thị mặc định:

- Athena nghĩ gì.
- Câu nên hỏi.
- Điều không nên làm.
- Workspace đang dùng.

Ẩn phần:

- Giải thích.
- Chưa chắc.
- Insight 6 dòng.
- Conversation answers.

Vào nút mở rộng:

“Xem phân tích Athena”.

#### Knowledge Recommendation

Mặc định chỉ hiện:

- 1 Knowledge.
- 1 Decision.
- 1 Sales Reminder.

Nếu muốn thêm:

“Xem thêm Knowledge”.

#### Timeline

Mặc định:

- 3 event mới nhất.

Có nút:

“Xem toàn bộ nhật ký”.

## 7. Đề xuất thứ tự hiển thị tối ưu

### Thứ tự V2 đề xuất

1. Customer Header
   - Tên khách
   - Journey
   - Trust
   - Emotion

2. Today Action
   - Hôm nay làm gì
   - Vì sao
   - Mục tiêu
   - Nút gọi

3. Customer Snapshot
   - Khách là ai
   - Điều cần nhớ
   - Lần cuối nói gì
   - Follow-up khi nào

4. Workspace Coach + Psychology Summary
   - Hôm nay anh đang ở đâu
   - Athena nghĩ gì
   - Câu nên hỏi
   - Điều không nên làm

5. Knowledge Recommendation
   - 1 Knowledge
   - 1 Decision
   - 1 Reminder

6. Customer Journey
   - Hành trình bán hàng

7. Timeline
   - 3 event mới nhất
   - Xem chi tiết khi cần

### Lý do thứ tự này tốt hơn

Huy mở Customer360 sẽ thấy:

1. Làm gì ngay.
2. Khách là ai.
3. Nói thế nào.
4. Dùng kiến thức gì.
5. Lịch sử nếu cần.

Đúng nhịp làm việc thực tế trước cuộc gọi.

## 8. Kế hoạch Quality Pass V2

### V2.1 — Reorder without logic change

Mục tiêu:

Đổi thứ tự card để Today Action lên cao.

Không sửa engine.

Không sửa logic.

### V2.2 — Snapshot merge

Mục tiêu:

Gộp Customer Overview + Last Interaction thành Customer Snapshot.

Giảm số card.

### V2.3 — Psychology Compact Mode

Mục tiêu:

Psychology Coach mặc định chỉ còn:

- Athena nghĩ gì.
- Câu nên hỏi.
- Điều không nên làm.
- Workspace context.

Phần Insight 6 dòng đưa vào mở rộng.

### V2.4 — Knowledge Compact Mode

Mục tiêu:

Knowledge Recommendation mặc định chỉ hiện:

- Top 1 Knowledge.
- Top 1 Decision.
- Top 1 Reminder.

### V2.5 — Timeline Compact Mode

Mục tiêu:

Timeline mặc định chỉ hiện 3 event mới nhất.

Click xem chi tiết vẫn giữ.

### V2.6 — 30-second QA

Test thực tế:

Mở Customer360 của 5 khách bất kỳ.

Trong 30 giây phải trả lời được:

- Khách là ai?
- Hôm nay làm gì?
- Câu nên hỏi?
- Điều không nên nói?
- Knowledge/Decision nào dùng?

Nếu không trả lời được, Quality Pass chưa đạt.

## 9. Kết luận

Customer360 hiện đủ mạnh để trở thành màn hình trung tâm.

Nhưng trước khi thực chiến nhiều, nên làm Quality Pass V2 theo hướng:

> Giữ trí thông minh, giảm chữ, đưa hành động lên trước.

Khuyến nghị ưu tiên:

1. Đưa Today Action lên đầu.
2. Gộp Customer Overview + Last Interaction.
3. Rút Psychology Coach thành bản compact.
4. Rút Knowledge Recommendation còn top item.
5. Timeline mặc định 3 event.

Nếu làm đúng, Customer360 sẽ chuyển từ “màn hình phân tích” thành “màn hình chuẩn bị tương tác khách trong 30 giây”.
