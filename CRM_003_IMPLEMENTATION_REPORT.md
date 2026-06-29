# CRM-003 Implementation Report

## Sprint

Coach Conversation Engine

## Mục tiêu

Biến Athena từ “người phân tích” thành “HLV đối thoại” trong Customer360.

Psychology Rules vẫn chỉ chạy phía sau. Huy không cần nhìn rule, chỉ cần trả lời vài câu hỏi kiểm chứng để Athena điều chỉnh hướng coach.

## File sửa

- `src/main.jsx`
- `src/styles.css`

## File tạo

- `CRM_003_IMPLEMENTATION_REPORT.md`

## Ràng buộc đã giữ

Không thực hiện:

- Không sửa Database.
- Không sửa Psychology Registry.
- Không sửa Psychology Engine.
- Không thêm AI API.
- Không refactor lớn.
- Không đổi Call Review flow.

## Flow mới

Trong Customer360, card `🧠 Tâm lý khách hàng` vẫn giữ các phần:

1. ATHENA NHẬN ĐỊNH
2. ATHENA GIẢI THÍCH
3. ATHENA CHƯA CHẮC

Sau đó thêm phần:

## 🤔 ATHENA MUỐN HỎI

Athena hiển thị tối đa 3 câu hỏi kiểm chứng.

Mỗi câu có 3 lựa chọn:

- Có
- Không
- Chưa biết

Khi Huy chọn:

### Có

Athena hiểu giả thuyết đang có tín hiệu xác nhận.

Coach chuyển hướng:

- Giữ nhịp đối thoại.
- Hỏi điều kiện để khách yên tâm đi bước tiếp theo.
- Không vội chốt.

### Không

Athena hiểu một số giả thuyết chưa khớp.

Coach chuyển hướng:

- Không bám vào giả thuyết cũ.
- Quay lại hỏi nhu cầu thật.
- Tìm rào cản thật.

### Chưa biết

Athena nhắc:

> Lần tới mình thử kiểm tra điểm “Chưa biết” trước.

Coach chuyển hướng:

- Ưu tiên hỏi một câu ngắn để lấp khoảng trống.
- Chưa tư vấn sâu khi chưa rõ dữ liệu.

## Athena cập nhật gì sau khi Huy trả lời

Không gọi AI.

Không gọi API.

Không chạy lại Psychology Engine.

Athena cập nhật cục bộ trong Customer360:

- Confidence label dạng dễ hiểu.
- Recommendation.
- Coach.
- Validation status.

Ví dụ hiển thị:

- `Đã có tín hiệu xác nhận`
- `Cần đổi hướng`
- `Chưa đủ chắc`
- `Đã kiểm chứng 2/3`

Không hiển thị field nội bộ.

## Call Review

Không đổi flow Call Review.

Khi Huy đã trả lời các câu hỏi trong Customer360 rồi bấm gọi và lưu cuộc gọi, hệ thống lưu thêm:

- `conversationAnswers`

Nơi lưu:

- Timeline event của cuộc gọi.
- Customer object hiện tại.

Không migration.

Không thay đổi schema bắt buộc.

Khách cũ không có `conversationAnswers` vẫn chạy bình thường.

## Cách test thủ công

1. Mở app local.
2. Mở một khách bất kỳ trong Customer360.
3. Kiểm tra card `🧠 Tâm lý khách hàng`.
4. Xác nhận sau `ATHENA CHƯA CHẮC` có phần `🤔 ATHENA MUỐN HỎI`.
5. Bấm `Có` ở câu đầu tiên.
6. Kiểm tra Athena Coach đổi nội dung theo hướng có tín hiệu xác nhận.
7. Bấm `Không` ở câu khác.
8. Kiểm tra Athena Coach đổi hướng sang hỏi lại nhu cầu/rào cản thật.
9. Bấm `Chưa biết`.
10. Kiểm tra Athena nhắc lần tới kiểm tra điểm chưa biết.
11. Bấm `Gọi ngay`.
12. Kết thúc cuộc gọi.
13. Bấm `Lưu kết quả cuộc gọi`.
14. Kiểm tra không trắng trang.
15. Kiểm tra timeline/customer đã có `conversationAnswers` nếu cần kiểm tra bằng DevTools/localStorage.

## Build

Build command:

```bash
npm run build
```

Kết quả:

```text
✓ built
```

## Rủi ro còn lại

- Conversation answers hiện là local theo phiên Customer360. Nếu Huy refresh trước khi lưu cuộc gọi, câu trả lời chưa được giữ lại.
- Athena chỉ cập nhật theo rule đơn giản Có/Không/Chưa biết, chưa có suy luận sâu vì Sprint này không dùng AI và không sửa Engine.
- Nếu khách có ít validation questions, phần `ATHENA MUỐN HỎI` sẽ có ít hơn 3 câu.

## Kết luận

CRM-003 PASS.

Customer360 giờ tạo cảm giác Athena đang hỏi lại Huy để kiểm chứng giả thuyết, không còn chỉ là một báo cáo phân tích tĩnh.
