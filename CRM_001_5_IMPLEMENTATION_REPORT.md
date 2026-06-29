# CRM_001_5_IMPLEMENTATION_REPORT

Sprint: CRM-001.5 — Customer Psychology Intelligence Foundation  
Date: 2026-06-29  
Scope: Nâng Customer Psychology Engine từ rule hardcode sang Psychology Registry  
Mode: Không refactor lớn, không đổi UI, không thêm màn hình, không đổi flow

---

# 1. Kết quả

CRM-001.5 đã hoàn thành.

Customer Psychology Engine hiện đọc từ Psychology Registry thay vì suy luận chính bằng rule hardcode trong engine.

Build production: PASS  
Local app: PASS — `http://127.0.0.1:5177/` trả HTTP 200  
Customer360 UI: không đổi  
Flow hiện tại: không đổi

---

# 2. File đã tạo

## `src/data/psychologyRegistry/index.js`

Đã tạo Psychology Registry với 30 rules:

```text
PF-0001 Khách trì hoãn
PF-0002 Khách hỏi giá
PF-0003 Khách im lặng
PF-0004 Khách hỏi pháp lý
PF-0005 Khách hỏi ngân hàng
PF-0006 Khách so sánh
PF-0007 Khách chỉ xem
PF-0008 Khách dẫn vợ/chồng
PF-0009 Khách đổi lịch
PF-0010 Khách nói để suy nghĩ
PF-0011 Khách bận
PF-0012 Khách không nghe máy
PF-0013 Khách muốn xem thực tế
PF-0014 Khách hỏi chiết khấu
PF-0015 Khách thiếu niềm tin
PF-0016 Khách cần người quyết định
PF-0017 Khách quan tâm đầu tư
PF-0018 Khách mua ở
PF-0019 Khách hỏi thanh khoản
PF-0020 Khách hỏi tiến độ
PF-0021 Khách hỏi vị trí
PF-0022 Khách hỏi sản phẩm
PF-0023 Khách hỏi tài liệu
PF-0024 Khách phản ứng phòng thủ
PF-0025 Khách có tín hiệu booking
PF-0026 Khách hỏi kinh doanh
PF-0027 Khách hỏi an toàn vốn
PF-0028 Khách hỏi thời điểm mua
PF-0029 Khách hỏi chủ đầu tư
PF-0030 Khách hỏi bước tiếp theo
```

Mỗi rule có:

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

---

# 3. File đã sửa

## `src/customerPsychologyEngine.js`

Đã thay lõi suy luận cứng bằng registry-driven engine.

Engine hiện:

1. Gom dữ liệu từ:
   - customer
   - timeline
   - customerMemory
   - diagnosis
   - trustScore
   - stage
   - dealSignals
2. Tạo customer text context.
3. Gọi `matchPsychologyRules(...)`.
4. Chọn các rule phù hợp nhất.
5. Trả về `psychologyProfile` với shape cũ để Customer360 không cần đổi UI.

Output vẫn giữ:

- `motivation`
- `fear`
- `behaviorSignals`
- `trustGap`
- `decisionBarrier`
- `decisionStyle`
- `confidence`
- `evidence`
- `unknowns`
- `validationQuestions`
- `doNotDo`
- `recommendedApproach`
- `athenaCoach`

Output mới thêm:

- `matchedRules`

## `src/main.jsx`

Đã cập nhật nhẹ, không đổi flow:

- Customer cũ nếu chưa có `psychologyProfile.matchedRules` sẽ tự sinh lại profile từ Registry.
- Customer360 vẫn dùng card cũ `🧠 Tâm lý khách hàng`, không đổi UI.
- Today Action dùng thêm `matchedRules` trong phần lý do/gợi ý.
- Call Review khi lưu sẽ lưu thêm:
  - `confirmedPsychologyRules`
  - `psychologyProfile.matchedRules`

## `src/data/knowledgeRegistry.js`

Đã bổ sung `matchedRules` vào context phụ của Knowledge Recommendation.

Không đổi UI Knowledge Recommendation.

---

# 4. Logic mới

## 4.1 Psychology Registry

Registry là nguồn dữ liệu chính cho psychology.

Ví dụ:

```text
Khách nói: "Giá cao quá"
→ match PF-0002 Khách hỏi giá
```

```text
Khách nói: "Để anh suy nghĩ thêm"
→ match PF-0010 Khách nói để suy nghĩ
```

```text
Khách nói: "Pháp lý thế nào?"
→ match PF-0004 Khách hỏi pháp lý
```

## 4.2 Scoring

Rule chỉ được match khi có tín hiệu thật:

- Trigger match
- Tag match
- Barrier match

Không còn tình trạng rule không liên quan lọt vào chỉ vì có priority.

## 4.3 Customer Psychology Engine

Engine dùng rule cao nhất để lấy:

- motivation
- fear
- decisionBarrier
- decisionStyle
- recommendedApproach

Engine gom nhiều rule để lấy:

- behaviorSignals
- validationQuestions
- doNotDo
- evidence

## 4.4 Today Action

Today Action không đổi UI.

Phần `reason` hiện có thêm gợi ý từ Athena và rule:

```text
Athena gợi ý: ...
Rule: PF-0002 Khách hỏi giá · PF-0008 Khách dẫn vợ/chồng.
```

## 4.5 Knowledge Recommendation

Knowledge Recommendation không đổi UI.

Engine recommendation nhận thêm context từ:

- psychology fear
- decisionBarrier
- motivation
- decisionStyle
- matchedRules id/title/tags

## 4.6 Call Review

Call Review không đổi flow.

Khi lưu review:

- Timeline event có `psychologyReview`.
- Timeline event có thêm `confirmedPsychologyRules`.
- Customer có `confirmedPsychologyRules`.
- Customer có `psychologyProfile.matchedRules`.

---

# 5. Test đã chạy

## 5.1 Build production

Kết quả:

```text
npm run build
✓ built
```

PASS.

## 5.2 Local app

Kết quả:

```text
http://127.0.0.1:5177/
HTTP/1.1 200 OK
```

PASS.

## 5.3 Registry count

Kết quả:

```text
PF rules: 30
```

PASS.

## 5.4 Engine sample matching

Test:

```text
Khách nói để suy nghĩ thêm
```

Kết quả:

```text
PF-0010 Khách nói để suy nghĩ
```

PASS.

Test:

```text
Giá cao quá và phải hỏi thêm vợ
```

Kết quả:

```text
PF-0002 Khách hỏi giá
PF-0008 Khách dẫn vợ/chồng
```

PASS.

Test:

```text
Anh đang bận gọi lại sau
```

Kết quả:

```text
PF-0011 Khách bận
```

PASS.

Test:

```text
Pháp lý thế nào, khi nào có sổ?
```

Kết quả:

```text
PF-0004 Khách hỏi pháp lý
```

PASS.

## 5.5 Call Review save

Test flow:

```text
Daily Flow
→ Smart Call Brief
→ Call Mode
→ Call Review
→ Lưu kết quả cuộc gọi
→ Customer360
```

Input test:

```text
Giá cao quá, anh cần hỏi thêm vợ rồi để suy nghĩ thêm.
```

Kết quả:

```json
{
  "customer360": true,
  "psychologyCard": true,
  "profileRules": [
    "PF-0010",
    "PF-0002",
    "PF-0015",
    "PF-0006",
    "PF-0023"
  ],
  "confirmedPsychologyRules": [
    "PF-0010",
    "PF-0002",
    "PF-0015",
    "PF-0006",
    "PF-0023"
  ]
}
```

PASS.

---

# 6. Lỗi phát hiện và đã sửa

## Lỗi nhỏ

Ban đầu scoring có cộng priority nền nên một số rule không có trigger vẫn lọt vào `matchedRules`.

Ví dụ:

```text
PF-0025
PF-0024
```

có thể xuất hiện dù không khớp nội dung khách.

## Đã sửa

Chỉ rule có tín hiệu thật mới được match:

- trigger hit
- tag hit
- barrier hit

Sau sửa:

```text
Khách nói để suy nghĩ thêm
→ chỉ match PF-0010
```

---

# 7. Không làm

Đúng phạm vi Sprint:

- Không đổi UI Customer360.
- Không thêm màn hình.
- Không đổi flow.
- Không refactor lớn `main.jsx`.
- Không đổi storage.
- Không thêm AI API.
- Không chuyển IndexedDB/backend.

---

# 8. Rủi ro còn lại

1. Registry mới có 30 rule nền tảng, chưa phải thư viện đầy đủ.
2. Một số câu khách phức tạp có thể match nhiều rule vì context cũ trong timeline/default form cũng được đọc.
3. Customer cũ đã lưu `psychologyProfile` kiểu cũ sẽ được tự tính lại khi thiếu `matchedRules`, nhưng nếu profile cũ đã có `matchedRules` thì CRM giữ lại để tránh ghi đè không cần thiết.
4. Knowledge Recommendation chỉ dùng `matchedRules` như context phụ, chưa có mapping riêng `Psychology Rule → Knowledge/Decision`.

---

# 9. Kết luận

CRM-001.5 PASS.

Customer Psychology Engine đã chuyển từ hardcoded rules sang Psychology Registry foundation.

CRM hiện có:

- Registry riêng tại `src/data/psychologyRegistry/index.js`.
- 30 Psychology Rules.
- Engine đọc registry.
- Customer360 giữ nguyên UI.
- Today Action dùng `matchedRules`.
- Knowledge Recommendation đọc `matchedRules`.
- Call Review lưu `confirmedPsychologyRules`.

