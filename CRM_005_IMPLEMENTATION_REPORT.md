# CRM-005 Implementation Report

## Sprint

Knowledge Candidate Engine

## Mục tiêu

CRM không tự tạo Knowledge.

CRM chỉ tạo Knowledge Candidate.

Knowledge Candidate là giả thuyết cần người kiểm tra, chưa phải tri thức chính thức.

## File tạo

- `src/knowledgeCandidateEngine.js`

## File sửa

- `src/main.jsx`
- `src/styles.css`
- `CRM_005_IMPLEMENTATION_REPORT.md`

## Ràng buộc đã giữ

Không thực hiện:

- Không sửa Customer360 UI.
- Không sửa Psychology Registry.
- Không sửa Psychology Engine.
- Không sửa Workspace Coach.
- Không sửa Today Action.
- Không sửa Knowledge Recommendation.
- Không thêm Database lớn.
- Không thêm AI API.
- Không refactor lớn.
- Không tự sinh Knowledge.

## Candidate Schema

Mỗi Knowledge Candidate có schema:

```json
{
  "candidateId": "",
  "title": "",
  "observation": "",
  "evidence": [],
  "repeatCount": 0,
  "confidence": 0,
  "status": "NEW",
  "createdAt": "",
  "lastSeen": "",
  "workspace": "",
  "customerIds": [],
  "psychologyRules": [],
  "needHumanReview": false
}
```

## Status

Các trạng thái được hỗ trợ:

- `NEW`
- `REPEATED`
- `READY_FOR_REVIEW`
- `CONFIRMED`
- `REJECTED`

## Engine

File:

`src/knowledgeCandidateEngine.js`

Engine gồm các hàm chính:

- `captureKnowledgeCandidates(input)`
- `loadKnowledgeCandidates()`
- `updateKnowledgeCandidateStatus(candidateId, status)`

Storage local:

```text
huy-advisor-os-knowledge-candidates-v1
```

Đây là localStorage nhỏ cho Candidate, không phải database lớn.

## Input

Engine nhận dữ liệu từ:

- Customer
- Timeline
- Psychology Review
- Conversation Answers
- Sales Intelligence
- Call Review
- confirmedPsychologyRules

## Capture Flow

Sau khi Huy bấm:

`✅ Lưu kết quả cuộc gọi`

CRM vẫn lưu Call Review như trước.

Sau đó Knowledge Candidate Engine đọc:

- Review khách vừa nói gì.
- Psychology Review đúng/sai/bài học.
- Conversation Answers.
- Sales DNA.
- Diagnosis Barrier.
- confirmedPsychologyRules.

Nếu phát hiện pattern, CRM tạo hoặc cập nhật Candidate.

Quan trọng:

> CRM chỉ tạo Candidate. Không tạo Knowledge.

## Candidate Creation Rules

Engine tạo Candidate khi có một trong các tín hiệu:

1. Có Psychology Review:
   - Giả thuyết đúng.
   - Bài học mới.

2. Có Conversation Answers:
   - Athena hỏi.
   - Huy trả lời Có / Không / Chưa biết.

3. Có Barrier hoặc Main Concern:
   - Barrier từ Diagnosis.
   - Nỗi lo chính.
   - Barrier lớn nhất.

4. Có Sales DNA:
   - Golden Sentence hiệu quả.
   - Discovery Question hiệu quả.
   - Coach Reminder hữu ích.
   - Xử lý phản đối thành công.
   - Follow-up hiệu quả.

## Repeat Count

Nếu cùng pattern xuất hiện lại:

- Candidate không bị tạo trùng.
- `repeatCount` tăng.
- `lastSeen` cập nhật.
- `customerIds` được mở rộng.
- `evidence` được bổ sung.

## Confidence

Confidence là điểm gợi ý review, không phải độ đúng tuyệt đối.

Tính từ:

- Số lượng evidence.
- Repeat count.
- Có Psychology Review hay không.
- Có confirmedPsychologyRules hay không.

## Knowledge Candidate Center

Vì MVP hiện chưa có màn Settings riêng, Candidate Center được đặt trong khu:

```text
DEVELOPER MODE · SETTINGS
```

trên workspace hiện có.

Nó chỉ hiện khi bật Developer Mode.

Không hiện cho Sales bình thường.

## Cách bật Developer Mode

Mở app với URL:

```text
?developerMode=1
```

CRM sẽ lưu:

```text
huy-advisor-os-developer-mode = 1
```

Sau đó Developer Center sẽ hiện cho phiên sau.

## Candidate Center hiển thị

Danh sách gồm:

- Candidate
- Evidence
- Repeat Count
- Customers
- Workspace
- Status

## Approve / Reject

Nút:

- `Approve`
- `Reject`

Khi bấm:

- Chỉ đổi status sang `CONFIRMED` hoặc `REJECTED`.
- Không sinh Knowledge.
- Không ghi vào Registry.
- Không cập nhật Psychology Engine.

## QA Checklist

### 1. Build

- Chạy `npm run build`.
- Kết quả phải PASS.

### 2. Developer Mode

- Mở app với `?developerMode=1`.
- Kiểm tra `Knowledge Candidate Center` xuất hiện.
- Mở app không có Developer Mode.
- Kiểm tra Sales bình thường không thấy Candidate Center.

### 3. Capture sau Call Review

- Mở một khách.
- Bấm gọi.
- Kết thúc cuộc gọi.
- Điền Psychology Review hoặc Diagnosis Barrier.
- Bấm lưu.
- Kiểm tra Candidate Center có Candidate mới.

### 4. Repeat Count

- Lưu thêm một Call Review có pattern giống nhau.
- Kiểm tra `repeatCount` tăng.

### 5. Approve / Reject

- Bấm `Approve`.
- Kiểm tra status đổi sang `CONFIRMED`.
- Kiểm tra không có Knowledge mới được tạo.
- Bấm `Reject`.
- Kiểm tra status đổi sang `REJECTED`.

### 6. Dữ liệu khách

- Kiểm tra customer vẫn lưu như trước.
- Timeline vẫn lưu như trước.
- Customer360 không đổi.
- Today Action không đổi.
- Knowledge Recommendation không đổi.

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

- Candidate hiện lưu localStorage, chưa có cloud sync.
- Developer Mode đang bật bằng URL/localStorage, chưa có Settings screen riêng vì Sprint yêu cầu không thêm màn hình mới.
- Candidate grouping hiện dựa trên title/workspace slug, có thể cần tinh chỉnh khi dữ liệu thực chiến nhiều hơn.
- Confidence là heuristic đơn giản, không phải AI hoặc machine learning.
- Approve chỉ xác nhận Candidate, chưa chuyển thành Knowledge thật. Đây là chủ đích của Sprint.

## Kết luận

CRM-005 PASS.

CRM đã có Knowledge Candidate Engine. Sau Call Review, hệ thống có thể phát hiện pattern và đề xuất Candidate, nhưng không tự tạo Knowledge. Candidate chỉ được xác nhận hoặc từ chối bởi người dùng trong Developer Mode.
