# CRM-005 QA Report

## Sprint

Knowledge Candidate Engine

## Mục tiêu QA

Kiểm tra Knowledge Candidate Engine sau khi tích hợp.

Phạm vi QA:

- Không thêm tính năng.
- Không refactor.
- Chỉ kiểm tra và sửa bug nhỏ nếu phát hiện.

## Kết luận cuối

CRM-005 PASS.

Không phát hiện bug cần sửa.

## Test Cases

| # | Test case | Kết quả | Evidence |
|---:|---|---|---|
| 1 | Build production PASS | PASS | `npm run build` chạy thành công, Vite báo `✓ built` |
| 2 | Local app HTTP 200 | PASS | `curl -I http://127.0.0.1:5174/` trả `HTTP/1.1 200 OK` |
| 3 | Sau Call Review, nếu có pattern thì tạo `knowledgeCandidates[]` | PASS | Unit test gọi `captureKnowledgeCandidates()` với Psychology Review, Conversation Answers, Sales DNA và Diagnosis Barrier tạo 4 candidates |
| 4 | Candidate lưu vào localStorage key `huy-advisor-os-knowledge-candidates-v1` | PASS | Unit test xác nhận key tồn tại và có 4 records |
| 5 | Candidate schema đủ field | PASS | Unit test kiểm tra đủ 13 field bắt buộc, `missingSchema: []` |
| 6 | CRM không tự tạo Knowledge thật | PASS | Source check: Candidate Engine chỉ ghi `huy-advisor-os-knowledge-candidates-v1`, không ghi vào `knowledgeRegistry` |
| 7 | Approve chỉ đổi status `CONFIRMED` | PASS | Unit test `updateKnowledgeCandidateStatus(id, 'CONFIRMED')` trả status `CONFIRMED` |
| 8 | Reject chỉ đổi status `REJECTED` | PASS | Unit test `updateKnowledgeCandidateStatus(id, 'REJECTED')` trả status `REJECTED` |
| 9a | Không có `?developerMode=1` thì Candidate Center không hiện | PASS | Source check: `KnowledgeCandidateCenter` chỉ render trong điều kiện `{developerMode && (...)}` |
| 9b | Có `?developerMode=1` thì Candidate Center hiện | PASS | Source check: URL param `developerMode=1` set localStorage `huy-advisor-os-developer-mode = 1` và `setDeveloperMode(true)` |
| 10 | Customer360, Today Action, Knowledge Recommendation, Call Review không bị phá | PASS | Build PASS và source wiring giữ nguyên các component chính; chỉ thêm capture sau save review và developer-only center |
| 11 | Dữ liệu khách cũ không mất | PASS | Không có code reset customer store; `CUSTOMER_STORE_KEY` không bị ghi đè trong CRM-005 |
| 12 | Build lại sau QA vẫn PASS | PASS | Build cuối QA PASS |

## Evidence chi tiết

### Build

Command:

```bash
npm run build
```

Result:

```text
✓ built
```

### HTTP 200

Command:

```bash
curl -I -s http://127.0.0.1:5174/
```

Result:

```text
HTTP/1.1 200 OK
```

### Unit test Knowledge Candidate Engine

Input giả lập:

- Customer ID: `qa-customer-1`
- Customer said: `Giá cao quá`
- Psychology Review: `Khách thật sự lo giá vì chưa rõ vốn ban đầu.`
- Conversation Answer: `Khách có hỏi giá ngay đầu cuộc gọi không? → Có`
- Sales DNA: `GoldenSentence`
- Diagnosis Barrier: `Giá`
- confirmedPsychologyRules: `PF-0021`

Kết quả:

```json
{
  "initialCount": 4,
  "repeatedCount": 4,
  "missingSchema": [],
  "storageKeyExists": true,
  "storageCount": 4,
  "sample": {
    "candidateId": "KC-zalo-sales-dna-hieu-qua-goldensentence",
    "title": "Sales DNA hiệu quả: GoldenSentence",
    "observation": "Khách trả lời rõ hơn.",
    "repeatCount": 2,
    "confidence": 88,
    "status": "READY_FOR_REVIEW",
    "workspace": "Zalo",
    "customerIds": [
      "qa-customer-1"
    ],
    "psychologyRules": [
      "PF-0021"
    ],
    "needHumanReview": true
  },
  "afterApprove": "CONFIRMED",
  "afterReject": "REJECTED"
}
```

Schema đã kiểm tra đủ:

- `candidateId`
- `title`
- `observation`
- `evidence`
- `repeatCount`
- `confidence`
- `status`
- `createdAt`
- `lastSeen`
- `workspace`
- `customerIds`
- `psychologyRules`
- `needHumanReview`

### Source wiring

Các điểm đã kiểm tra:

- `src/main.jsx` import `captureKnowledgeCandidates`, `loadKnowledgeCandidates`, `updateKnowledgeCandidateStatus`.
- `saveReviewToCustomer()` gọi `captureKnowledgeCandidates()` sau khi có `confirmedPsychologyRules`.
- `KnowledgeCandidateCenter` chỉ render khi `developerMode === true`.
- `developerMode` được bật bằng URL param `?developerMode=1`.
- Approve gọi `updateKnowledgeCandidateStatus(candidateId, 'CONFIRMED')`.
- Reject gọi `updateKnowledgeCandidateStatus(candidateId, 'REJECTED')`.

## Lỗi phát hiện

Không phát hiện lỗi cần sửa.

## File đã sửa trong QA

Không sửa code trong QA.

File tạo:

- `CRM_005_QA_REPORT.md`

## Ghi chú

Có thử kiểm tra qua in-app browser automation, nhưng runtime browser bị timeout khi đọc DOM. QA không dựa vào kết quả timeout đó.

Kết luận PASS dựa trên:

- Build production PASS.
- Local HTTP 200.
- Unit test engine/localStorage/schema/status PASS.
- Source wiring check PASS.

## Kết luận

CRM-005 PASS.

Knowledge Candidate Engine hoạt động đúng nguyên tắc:

> CRM chỉ tạo Candidate, không tự tạo Knowledge.
