# CRM-004 Implementation Report

## Sprint

Workspace Coach

## Mục tiêu

Biến Customer360 thành HLV theo đúng ngữ cảnh làm việc hiện tại của Huy.

Athena không chỉ coach chung chung, mà đổi cách hướng dẫn theo việc Huy đang làm: gọi điện, nhắn Zalo, gặp trực tiếp, xem sa bàn, đi dự án hoặc xem nhà mẫu.

## File sửa

- `src/main.jsx`
- `src/styles.css`

## File tạo

- `CRM_004_IMPLEMENTATION_REPORT.md`

## Ràng buộc đã giữ

Không thực hiện:

- Không sửa Database.
- Không sửa Psychology Registry.
- Không sửa Psychology Engine.
- Không thêm AI API.
- Không refactor lớn.
- Không thêm màn hình mới.
- Không sửa Customer Data.
- Không sửa Timeline.
- Không sửa Call Review.

## Thay đổi chính

### 1. Thêm Workspace Selector trong Customer360

Vị trí:

Ngay phía trên card:

`🧠 Tâm lý khách hàng`

Nội dung:

`Hôm nay anh đang ở đâu?`

Các lựa chọn:

- ☎️ Điện thoại
- 💬 Zalo
- 🤝 Gặp trực tiếp
- 🏙️ Sa bàn
- 🌴 Dự án
- 🏠 Nhà mẫu

Selector chỉ dùng local state trong Customer360.

Không ghi vào customer.

Không ghi vào timeline.

Không đổi psychologyProfile.

### 2. Tạo object tĩnh `workspaceCoachConfig`

Đã tạo `workspaceCoachConfig` trong `src/main.jsx`.

Mỗi workspace có:

- `label`
- `focus`
- `coach`
- `doNotDo`

Không tạo registry mới.

Không sửa Psychology Registry.

### 3. Coach đổi theo Workspace

Khi đổi workspace:

- ATHENA NHẬN ĐỊNH không đổi.
- ATHENA GIẢI THÍCH không đổi.
- ATHENA CHƯA CHẮC không đổi.
- Psychology Rules không đổi.
- Customer data không đổi.

Chỉ đổi phần:

- ATHENA COACH
- Focus chips
- Điều không nên làm theo workspace

## Nội dung coach theo workspace

### ☎️ Điện thoại

Coach tập trung:

- Cách mở đầu
- Câu hỏi đầu tiên
- Điều nên tránh
- Mục tiêu cuộc gọi

### 💬 Zalo

Coach tập trung:

- Có nên nhắn không
- Gửi gì
- Gửi lúc nào
- Không nên gửi gì

### 🤝 Gặp trực tiếp

Coach tập trung:

- Tạo niềm tin
- Quan sát phản ứng
- Hỏi sâu hơn
- Chốt bước tiếp theo

### 🏙️ Sa bàn

Coach tập trung:

- Nên bắt đầu ở đâu
- Điều nên quan sát
- Khi nào hỏi
- Khi nào chuyển khu
- Khi nào nói giá

### 🌴 Dự án

Coach tập trung:

- Điểm dừng
- Điều nên kể
- Điều nên hỏi
- Điều nên tránh

### 🏠 Nhà mẫu

Coach tập trung:

- Điểm cảm xúc
- Điều khách đang quan sát
- Câu hỏi nên hỏi
- Điều không nên nói

## Cách test thủ công

1. Mở app local.
2. Mở một khách trong Customer360.
3. Tìm selector `Hôm nay anh đang ở đâu?`.
4. Chọn `☎️ Điện thoại`.
5. Kiểm tra ATHENA COACH tập trung vào mở đầu, câu hỏi, mục tiêu cuộc gọi.
6. Chọn `💬 Zalo`.
7. Kiểm tra ATHENA COACH đổi sang nhắn gì, gửi lúc nào, không nên gửi gì.
8. Chọn `🏙️ Sa bàn`.
9. Kiểm tra ATHENA COACH đổi sang bắt đầu ở đâu, quan sát gì, khi nào nói giá.
10. Chọn `🌴 Dự án`.
11. Kiểm tra ATHENA COACH đổi sang điểm dừng, kể gì, hỏi gì.
12. Chọn `🏠 Nhà mẫu`.
13. Kiểm tra ATHENA COACH đổi sang điểm cảm xúc, khách quan sát gì, câu hỏi nên hỏi.
14. Kiểm tra ATHENA NHẬN ĐỊNH / GIẢI THÍCH / CHƯA CHẮC không đổi khi đổi workspace.
15. Refresh app để xác nhận selector không ghi dữ liệu vào customer.

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

- Workspace hiện chỉ lưu local trong phiên Customer360. Nếu refresh, sẽ quay về mặc định `Điện thoại`.
- Nội dung coach là rule tĩnh, chưa học từ dữ liệu thực chiến.
- Không có AI/API nên coach chưa tự viết câu theo từng khách, chỉ phối hợp workspace với psychologyProfile hiện có.

## Kết luận

CRM-004 PASS.

Customer360 hiện đã có Workspace Coach. Khi Huy đổi workspace, Coach đổi theo bối cảnh làm việc, còn Psychology/Profile/Rule/Customer Data giữ nguyên.
