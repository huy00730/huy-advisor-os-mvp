# CRM-001.6 Implementation Report

## Sprint

Psychology Registry Expansion

## Mục tiêu

Mở rộng Psychology Registry từ 30 rule lên 100 rule để Customer Psychology Engine có nhiều tín hiệu tâm lý cụ thể hơn, nhưng không thay đổi UI, Engine, Customer360, Today Action hoặc Call Review.

## Phạm vi đã thực hiện

Chỉ cập nhật dữ liệu registry:

- File sửa: `src/data/psychologyRegistry/index.js`
- Không sửa UI.
- Không sửa Customer Psychology Engine.
- Không sửa Customer360.
- Không sửa Today Action.
- Không sửa Call Review.
- Không thêm AI.
- Không đổi schema.

## Schema giữ nguyên

Mỗi rule vẫn giữ đầy đủ các field:

- `id`
- `title`
- `triggers`
- `motivation`
- `fear`
- `behaviorSignal`
- `decisionBarrier`
- `decisionStyle`
- `validationQuestions`
- `doNotDo`
- `recommendedApproach`
- `priority`
- `tags`

## Kết quả registry

Tổng số rule hiện tại: 100

| Nhóm | Chủ đề | ID | Số rule |
|---|---|---:|---:|
| Group A | Trì hoãn | PF-0001 → PF-0020 | 20 |
| Group B | Giá | PF-0021 → PF-0040 | 20 |
| Group C | Niềm tin | PF-0041 → PF-0060 | 20 |
| Group D | Gia đình | PF-0061 → PF-0080 | 20 |
| Group E | Đầu tư | PF-0081 → PF-0100 | 20 |

## Nguyên tắc viết rule

Rule được viết theo tình huống cụ thể, không viết chung chung.

Ví dụ nhóm Giá không chỉ có “Khách hỏi giá”, mà tách thành các tình huống như:

- Khách nói giá cao ngay đầu cuộc gọi.
- Khách hỏi giá sau khi xem sa bàn.
- Khách hỏi giá sau khi xem nhà mẫu.
- Khách hỏi giá rồi im lặng.
- Khách hỏi giá để so sánh dự án khác.
- Khách hỏi giá để kiểm tra ngân sách thật.

## Kiểm tra kỹ thuật

Đã kiểm tra:

- Tổng rule: PASS — 100 rule.
- ID PF-0001 → PF-0100: PASS — không thiếu ID.
- Schema field bắt buộc: PASS — không thiếu field.
- Mỗi nhóm 20 rule: PASS.
- Build production: PASS.

Build command:

```bash
npm run build
```

Kết quả:

```text
✓ built
```

## Rủi ro còn lại

- Registry đã mở rộng nhiều hơn nên một số câu khách phức hợp có thể match nhiều rule cùng lúc. Đây là hành vi mong muốn ở mức registry, nhưng cần QA riêng ở Sprint sau để kiểm tra độ nhiễu.
- Chưa tinh chỉnh trọng số match vì Sprint này không được sửa Engine.
- Chưa thay đổi cách hiển thị matchedRules vì Sprint này không được sửa UI.

## Kết luận

CRM-001.6 PASS.

Psychology Registry đã được mở rộng lên 100 rule đúng nhóm, đúng schema, không sửa UI, không sửa Engine và build production PASS.
