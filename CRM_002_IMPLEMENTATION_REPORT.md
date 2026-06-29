# CRM-002 Implementation Report

## Sprint

Psychology Coach Layer

## Mục tiêu

Biến 100 Psychology Rules thành lớp Coach trong Customer360.

Rule vẫn dùng nội bộ, nhưng Huy không nhìn thấy Rule ID, priority, tag hoặc internal field trên màn hình.

## Phạm vi đã thực hiện

File đã sửa:

- `src/main.jsx`

File đã tạo:

- `CRM_002_IMPLEMENTATION_REPORT.md`

Không thực hiện:

- Không mở rộng Registry.
- Không thêm Psychology Rule.
- Không sửa Psychology Engine.
- Không sửa Database.
- Không refactor.
- Không thêm AI API.
- Không đổi flow Call Review.

## Thay đổi chính

### 1. Customer360 — Card “🧠 Tâm lý khách hàng”

Đã đổi cách hiển thị từ dạng expert system sang dạng Coach.

Trước đây card có thể hiển thị:

- Confidence.
- Evidence dạng kỹ thuật.
- Nội dung có khả năng lộ Rule ID.

Hiện tại card hiển thị theo 6 phần:

1. ATHENA NHẬN ĐỊNH
2. ATHENA GIẢI THÍCH
3. ATHENA CHƯA CHẮC
4. ATHENA COACH
5. ĐIỀU KHÔNG NÊN LÀM
6. CÂU HỎI KIỂM CHỨNG

### 2. Ẩn toàn bộ dữ liệu nội bộ

Đã loại khỏi phần hiển thị cho Advisor:

- Rule ID dạng `PF-0001`
- `matchScore`
- `matchedTriggers`
- `priority`
- `tags`
- `Confidence`

Rule vẫn tồn tại trong dữ liệu nội bộ để engine sử dụng, nhưng không xuất hiện trong Customer360 coach card.

### 3. Athena Explanation dễ đọc hơn

Phần “ATHENA GIẢI THÍCH” giờ lấy tín hiệu từ dữ liệu khách thật như:

- Barrier trong Diagnosis.
- Customer Stage.
- Decision Maker.
- Customer Memory.
- Timeline.
- Journey hiện tại.

Không dùng evidence thô có Rule ID.

### 4. Today Action

Không đổi UI hoặc logic Today Action.

Chỉ gỡ đoạn debug nội bộ có thể lộ Rule ID trong text user-facing để đảm bảo nguyên tắc:

> Rule chỉ dùng phía sau.

## Kiểm tra

Đã kiểm tra:

- Customer360 card không còn hiển thị `PF-`.
- Customer360 card không còn hiển thị `Rule:`.
- Customer360 card không còn hiển thị `Confidence`.
- Build production PASS.

Build command:

```bash
npm run build
```

Kết quả:

```text
✓ built
```

## Rủi ro còn lại

- Một vài câu Athena có thể còn hơi dài nếu dữ liệu khách quá nhiều. Đây là vấn đề copy/UX, không phải lỗi logic.
- Chưa test bằng ảnh production vì Sprint này không yêu cầu deploy.
- Engine vẫn lưu `matchedRules` nội bộ để phục vụ các bước sau; đây là chủ đích, không hiển thị cho Huy.

## Kết luận

CRM-002 PASS.

Card “🧠 Tâm lý khách hàng” hiện đọc giống một HLV hơn, không còn giống màn hình Expert System. Psychology Rules vẫn chạy phía sau, nhưng không lộ ra cho Advisor.
