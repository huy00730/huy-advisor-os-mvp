# CHANGELOG V1.0.3A

## Sprint V1.0.3A — Deal Engine Foundation

Ngày: 29/06/2026

### 1. Customer Workspace

- Thêm card `Deal Engine`.
- Hiển thị:
  - Deal Score: `Chưa đủ dữ liệu`
  - Trạng thái dữ liệu: `🟢 Đủ dữ liệu` hoặc `🟡 Thiếu dữ liệu`
  - Lý do thiếu dữ liệu
  - Một số signal nền: Need, Budget, Decision Maker, Meeting

### 2. Customer Store Foundation

- Mỗi customer được bổ sung mặc định:
  - `dealSignals`
  - `dealScore`
  - `dealScoreReason`
  - `dealScoreStatus`
  - `lastScoreUpdate`

### 3. Deal Signals sau Call Review

- Sau khi lưu Call Review, CRM lưu thêm các Deal Signals:
  - `needConfirmed`
  - `budgetConfirmed`
  - `timelineConfirmed`
  - `decisionMakerConfirmed`
  - `meetingBooked`
  - `objectionResolved`
  - `materialSent`
  - `materialViewed`
  - `replyReceived`
  - `nextActionDefined`

### 4. Deal Engine

- Tạo `calculateDealScore(customer)`.
- Sprint này chưa tính điểm thật.
- Engine chỉ trả về:
  - `status: INSUFFICIENT_DATA`
  - `reason: ...`
  - `score: null`

### 5. Dashboard

- Thêm widget `Deal Pipeline Health`:
  - Khách đủ dữ liệu
  - Khách thiếu Timeline
  - Khách thiếu Budget
  - Khách thiếu Decision Maker
  - Khách có Meeting

### 6. Daily Review

- Bổ sung thống kê:
  - Timeline xác nhận
  - Budget xác nhận
  - Decision Maker xác nhận
  - Meeting đã chốt
  - Knowledge dùng nhiều nhất
  - Decision dùng nhiều nhất

### Giới hạn phạm vi

- Không thêm AI.
- Không thêm chatbot.
- Không thêm voice.
- Không thêm backend.
- Không thêm database.
- Không thêm module mới.
- Không đổi Foundation.
- Không đổi Customer Store hiện hữu, chỉ bổ sung field tương thích ngược.

### Build

- Production build: PASS.
