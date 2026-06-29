# CRM_001_5_QA_REPORT

Sprint: CRM-001.5 — Psychology Registry QA  
Date: 2026-06-29  
Mode: QA only, chỉ sửa bug nhỏ đúng phạm vi nếu phát hiện  
Source: `/Users/huytran/Documents/Codex/2026-06-20/huy00730-gmail-com/huy-advisor-os-mvp`

---

# 1. Summary

Kết luận cuối: CRM-001.5 PASS.

Đã kiểm tra Psychology Registry sau CRM-001.5:

- Build production PASS.
- Local app HTTP 200.
- Registry đủ PF-0001 đến PF-0030.
- `customerPsychologyEngine()` đọc từ `psychologyRegistry`.
- Mở 5 khách cũ không crash.
- Customer 360 vẫn hiện card `🧠 Tâm lý khách hàng`.
- Card tâm lý có evidence từ `matchedRules`.
- Today Action vẫn render.
- Knowledge Recommendation vẫn render.
- Call Mode vẫn chạy.
- Call Review lưu `confirmedPsychologyRules`.
- Timeline vẫn lưu `psychologyReview`.
- Không mất dữ liệu cũ trong profile test.
- Đã test riêng lỗi match quá rộng.
- Đã phát hiện và sửa 2 bug nhỏ về matchedRules bị nhiễu context cũ.

---

# 2. Test Cases

| # | Test case | Kết quả | Evidence |
|---|---|---|---|
| 1 | Build production PASS | PASS | `npm run build` thành công. |
| 2 | Local app HTTP 200 | PASS | `http://127.0.0.1:5177/` trả `HTTP/1.1 200 OK`. |
| 3 | Registry đủ PF-0001 đến PF-0030 | PASS | `count = 30`, `missing = []`, `extra = []`. |
| 4 | `customerPsychologyEngine` đọc từ `psychologyRegistry` | PASS | `customerPsychologyEngine.js` import `matchPsychologyRules` từ `src/data/psychologyRegistry/index.js`. |
| 5 | Mở 5 khách cũ không crash | PASS | Nạp 5 khách cũ vào Chrome profile tạm, app mở được. |
| 6 | Customer 360 vẫn hiện card `🧠 Tâm lý khách hàng` | PASS | Sau khi lưu review, Customer 360 render và có card tâm lý. |
| 7 | Card tâm lý có `matchedRules` | PASS | Body Customer 360 có rule text `PF-0002` / `PF-0008` trong evidence. |
| 8 | Today Action vẫn render | PASS | `TODAY ACTION = true`. |
| 9 | Knowledge Recommendation vẫn render | PASS | `Knowledge Recommendation = true`. |
| 10 | Call Mode vẫn chạy | PASS | Smart Call Brief → Call Mode chạy được. |
| 11 | Call Review lưu `confirmedPsychologyRules` | PASS | Timeline event có `confirmedPsychologyRules`. |
| 12 | Timeline vẫn lưu `psychologyReview` | PASS | Timeline event có `psychologyReview`. |
| 13 | Không mất dữ liệu cũ | PASS | Customer count giữ nguyên `5 → 5` trong profile test. |
| 14A | “để suy nghĩ thêm” chỉ match rule liên quan | PASS | Match duy nhất `PF-0010`. |
| 14B | “giá cao quá, hỏi thêm vợ” match đúng | PASS | Match `PF-0002`, `PF-0008`. |
| 14C | “pháp lý thế nào” match đúng | PASS | Match `PF-0004`. |
| 14D | Câu trung tính không match quá nhiều rule | PASS | Match `[]`. |
| 15 | Kiểm tra rủi ro context cũ làm matchedRules bị nhiễu | PASS sau fix | `psychologyFocusText` ưu tiên câu khách vừa nói, không lấy barrier/stage mặc định khi save Call Review. |

---

# 3. Evidence

## 3.1 Build production

```text
npm run build
vite v8.1.0 building client environment for production...
✓ built
```

Kết quả: PASS.

## 3.2 Local app

```text
HTTP/1.1 200 OK
Content-Type: text/html
```

Kết quả: PASS.

## 3.3 Registry count

```json
{
  "count": 30,
  "missing": [],
  "extra": [],
  "first": "PF-0001",
  "last": "PF-0030"
}
```

Kết quả: PASS.

## 3.4 Engine đọc từ registry

Trong `src/customerPsychologyEngine.js`:

```text
import { matchPsychologyRules } from './data/psychologyRegistry/index.js'
```

Kết quả: PASS.

## 3.5 Match tests riêng

Input:

```text
để suy nghĩ thêm
```

Output:

```json
["PF-0010"]
```

Input:

```text
giá cao quá, hỏi thêm vợ
```

Output:

```json
["PF-0002", "PF-0008"]
```

Input:

```text
pháp lý thế nào
```

Output:

```json
["PF-0004"]
```

Input:

```text
em đã nhận thông tin, cảm ơn
```

Output:

```json
[]
```

Kết quả: PASS.

## 3.6 Context cũ không còn làm nhiễu khi có focus text

Test:

```json
{
  "psychologyFocusText": "Giá cao quá, hỏi thêm vợ.",
  "diagnosis": {
    "barrier": "Niềm tin"
  }
}
```

Output:

```json
{
  "focusOverBarrier": ["PF-0002", "PF-0008"],
  "noFocusBarrier": ["PF-0015"]
}
```

Ý nghĩa:

- Khi có câu khách vừa nói trong Call Review, engine ưu tiên câu đó.
- Barrier mặc định `Niềm tin` không còn kéo PF-0015 vào confirmed rules.
- Khi không có focus text, barrier vẫn hoạt động bình thường cho Customer 360.

Kết quả: PASS.

## 3.7 Flow UI local với 5 khách cũ

5 khách cũ được nạp vào Chrome profile tạm:

```text
Huy
Phạm Thị Huyền
Loan Huỳnh
Châu Lê Văn
Guest
```

Trước test:

```json
{
  "before": 5
}
```

Flow test:

```text
Daily Flow
→ Smart Call Brief
→ Call Mode
→ Call Review
→ Nhập: Giá cao quá, hỏi thêm vợ.
→ Lưu kết quả cuộc gọi
→ Customer 360
```

Kết quả:

```json
{
  "before": 5,
  "customerCount": 5,
  "smartBrief": true,
  "callMode": true,
  "review": true,
  "customer360": true,
  "psychologyCard": true,
  "cardHasRuleText": true,
  "todayAction": true,
  "knowledgeRecommendation": true,
  "profileRules": ["PF-0002", "PF-0008"],
  "confirmedPsychologyRules": ["PF-0002", "PF-0008"],
  "hasPsychologyReview": true
}
```

Kết quả: PASS.

---

# 4. Lỗi phát hiện

## Bug 1 — Rule không liên quan có thể lọt vào do priority nền

### Hiện tượng

Một số rule không có trigger/tag/barrier match vẫn có thể xuất hiện do điểm priority nền.

Ví dụ:

```text
PF-0025
PF-0024
```

có thể xuất hiện dù câu khách không liên quan.

### Nguyên nhân

Trong `matchPsychologyRules`, score ban đầu cộng cả priority dù không có tín hiệu thật.

### Đã sửa

Chỉ tính priority khi đã có ít nhất một tín hiệu:

- trigger hit
- tag hit
- barrier hit

### File sửa

```text
src/data/psychologyRegistry/index.js
```

Kết quả sau sửa:

```text
để suy nghĩ thêm → PF-0010
câu trung tính → []
```

## Bug 2 — Context cũ/default Diagnosis làm nhiễu confirmedPsychologyRules

### Hiện tượng

Khi lưu Call Review với câu:

```text
Giá cao quá, hỏi thêm vợ.
```

rule PF-0015 có thể bị kéo vào do Diagnosis mặc định đang có barrier:

```text
Niềm tin
```

### Nguyên nhân

`customerPsychologyEngine()` vẫn dùng barrier/stage context khi đã có câu focus từ Call Review.

### Đã sửa

Khi có `psychologyFocusText`, engine chỉ match theo focus text:

- `review.customerSaid`
- `review.psychologyTrue`
- `review.psychologyFalse`
- `review.psychologyLesson`

Barrier/stage cũ không dùng để kéo rule trong lúc lưu confirmed rules.

Khi không có `psychologyFocusText`, Customer 360 vẫn dùng context cũ bình thường.

### File sửa

```text
src/customerPsychologyEngine.js
src/main.jsx
```

Kết quả sau sửa:

```text
Giá cao quá, hỏi thêm vợ.
→ PF-0002
→ PF-0008
```

---

# 5. File đã sửa trong QA

Do phát hiện bug nhỏ đúng phạm vi CRM-001.5, đã sửa:

```text
src/data/psychologyRegistry/index.js
src/customerPsychologyEngine.js
src/main.jsx
```

Không đổi UI.

Không thêm feature.

Không refactor.

Không đổi flow.

---

# 6. Regression Check

| Khu vực | Kết quả |
|---|---|
| Build production | PASS |
| Local HTTP | PASS |
| Registry count | PASS |
| Engine import registry | PASS |
| Match PF-0010 | PASS |
| Match PF-0002/PF-0008 | PASS |
| Match PF-0004 | PASS |
| Neutral no-match | PASS |
| 5 khách cũ không crash | PASS |
| Customer 360 | PASS |
| Psychology Card | PASS |
| Today Action | PASS |
| Knowledge Recommendation | PASS |
| Call Mode | PASS |
| Call Review save | PASS |
| confirmedPsychologyRules | PASS |
| psychologyReview | PASS |
| Data count giữ nguyên | PASS |

---

# 7. Rủi ro còn lại

1. Registry mới có 30 rule nền tảng, chưa phải thư viện hoàn chỉnh.
2. Nếu một câu khách chứa nhiều ý thật sự, engine vẫn sẽ match nhiều rule. Đây là đúng thiết kế, không phải lỗi.
3. Customer 360 không có focus text thì vẫn dùng toàn bộ context cũ để nhận định. Vì vậy nếu dữ liệu cũ sai, matchedRules có thể phản ánh dữ liệu sai.
4. Knowledge Recommendation mới chỉ dùng `matchedRules` như context phụ, chưa có mapping riêng từng Psychology Rule sang Knowledge/Decision.

---

# 8. Final Conclusion

CRM-001.5 PASS.

Psychology Registry đã qua QA:

- Registry đủ PF-0001 → PF-0030.
- Engine đọc từ Registry.
- Match không còn quá rộng.
- Câu trung tính không bị match bậy.
- Call Review lưu `confirmedPsychologyRules`.
- Timeline lưu `psychologyReview`.
- Customer 360, Today Action, Knowledge Recommendation, Call Mode không bị phá.
- Không mất dữ liệu cũ trong profile test.

