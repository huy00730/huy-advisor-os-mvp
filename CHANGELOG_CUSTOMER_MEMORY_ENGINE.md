# CHANGELOG — Customer Memory Engine V1 · Product Review UX

## Scope

Refined Customer Memory Engine into a sales-friendly long-term memory card.

No AI, no machine learning, no diagnosis, no prediction, no new module, and no backend/database change.

## Changed

### 1. Card Name

Renamed:

- `🧠 Customer Memory`

To:

- `💡 Điều cần nhớ`

### 2. Sales-Friendly Structure

The card no longer shows technical CRM fields. It now shows:

- 👤 Con người
- 👨‍👩‍👧 Gia đình
- ❤️ Sở thích
- ⚠ Điều cần lưu ý
- 📌 Ghi nhớ đặc biệt

### 3. Call Review Long-Term Memory

Added one field before `✅ HOÀN THÀNH`:

`💡 Có điều gì về khách mà anh muốn CRM nhớ lâu dài không?`

Anything entered here is stored as long-term memory after saving Call Review.

### 4. Auto Update

After saving Call Review, CRM updates:

- Family from Decision Maker.
- Interests from Customer Likes.
- Cautions from Main Concern / Barrier.
- Special Notes from the long-term memory textarea.

### 5. Quick Edit

Quick Edit now edits the same sales-friendly groups directly:

- Con người
- Gia đình
- Sở thích
- Điều cần lưu ý
- Ghi nhớ đặc biệt

## Build

Production build: PASS

## Notes

`💡 Điều cần nhớ` stores only long-term facts and reminders. Temporary actions such as “đã gọi”, “đã gửi Zalo”, “hẹn tuần sau”, and “đã gửi bảng giá” remain in Timeline.
