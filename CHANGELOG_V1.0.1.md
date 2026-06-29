# CHANGELOG V1.0.1

## Sprint V1.0.1 — Execution First

Ngày: 29/06/2026

### 1. Today Workflow

- Nút `🚀 BẮT ĐẦU` chuyển thẳng vào Call Mode của khách đầu tiên.
- Sau khi lưu Call Review, CRM tự chuyển sang khách tiếp theo.
- Advisor không phải quay lại Dashboard để tìm khách tiếp theo.

### 2. Daily Progress

- Thêm thanh tiến độ nhỏ:
  - Đã gọi: `0/10`
  - Follow-up: `0/5`
  - Hoàn thành: `0%`
- Progress hiển thị trong Daily Mission và Call Mode.

### 3. End of Day

- Khi hoàn thành danh sách khách trong Daily Mission, CRM hiện popup:
  - `Hôm nay hoàn thành.`
- Có 2 nút:
  - `Xem Daily Review`
  - `Đóng`

### 4. Button / Label Fix

- Rà toàn bộ button trong source: không còn button trống label.
- Nút backup hiển thị rõ: `📦 Backup CRM`.

### 5. Performance / Click Reduction

- Giảm thao tác sau mỗi cuộc gọi:
  - Trước: Lưu review → hỏi có chuyển khách tiếp theo không → bấm tiếp.
  - Nay: Lưu review → tự chuyển sang khách tiếp theo.

### Build

- Production build: PASS.
