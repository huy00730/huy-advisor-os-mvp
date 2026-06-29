# CRM_001_QA_REPORT

Sprint: CRM-001 — Customer Psychology Engine Foundation  
QA date: 2026-06-29  
Mode: QA sau tích hợp, không sửa code nếu chưa phát hiện lỗi  
Source: `/Users/huytran/Documents/Codex/2026-06-20/huy00730-gmail-com/huy-advisor-os-mvp`

---

# 1. QA Method

Đã kiểm tra bằng:

1. Build production.
2. HTTP check local app tại `http://127.0.0.1:5177/`.
3. Chrome headless profile tạm để không ảnh hưởng dữ liệu local thật.
4. Nạp 5 khách cũ từ `migrated-data/advisor-customers-from-coastal-crm-200.json`.
5. Xóa `psychologyProfile` khỏi 5 khách test trước khi nạp để kiểm tra backward compatibility.
6. Chạy flow thật:

```text
Daily Flow
→ Smart Call Brief
→ Call Mode
→ First Contact Master / Call Review
→ Nhập 3 ô tâm lý
→ Lưu kết quả cuộc gọi
→ Customer 360
```

Không sửa dữ liệu thật của Huy. QA dùng profile tạm và tự xóa sau khi test.

---

# 2. Test Cases

| # | Test case | Kết quả | Ghi chú |
|---|---|---|---|
| 1 | App build production PASS | PASS | `npm run build` thành công. |
| 2 | App local mở được | PASS | `http://127.0.0.1:5177/` trả HTTP 200. |
| 3 | Mở ít nhất 5 khách cũ | PASS | Nạp 5 khách cũ từ migrated data vào profile tạm, app đọc đủ 5 khách. |
| 4 | Khách thiếu `psychologyProfile` không crash | PASS | 5/5 khách test bị xóa `psychologyProfile` trước khi nạp, app vẫn chạy. |
| 5 | Card `🧠 Tâm lý khách hàng` hiện đúng vị trí | PASS | Card xuất hiện trong Customer 360 sau `CUSTOMER OVERVIEW`, trước các phần hành động chính. |
| 6 | Today Action vẫn hiện | PASS | `TODAY ACTION` vẫn render sau khi thêm Psychology Engine. |
| 7 | Knowledge Recommendation vẫn hiện | PASS | `Knowledge Recommendation` vẫn render và nhận thêm context psychology. |
| 8 | Call Mode vẫn chạy | PASS | Smart Call Brief → Call Mode → Bắt đầu gọi → Kết thúc cuộc gọi chạy được. |
| 9 | Call Review lưu được 3 ô tâm lý mới | PASS | 3 ô lưu đúng: giả thuyết đúng, giả thuyết sai, bài học mới. |
| 10 | Timeline sau khi lưu có `psychologyReview` | PASS | Timeline event mới có object `psychologyReview`. |
| 11 | Quay lại Customer 360 không trắng trang | PASS | Sau khi lưu review, app quay lại Customer 360 và render bình thường. |
| 12 | Dữ liệu cũ không mất | PASS | Số khách trong profile test giữ nguyên 5 trước/sau save. Không đụng dữ liệu thật. |

---

# 3. Evidence

## 3.1 Build

```text
vite v8.1.0 building client environment for production...
✓ built in 86ms
```

## 3.2 Local HTTP

```text
HTTP/1.1 200 OK
Content-Type: text/html
```

## 3.3 5 khách cũ test

5 khách cũ được dùng trong profile tạm:

```text
1. Huy
2. Phạm Thị Huyền
3. Loan Huỳnh
4. Châu Lê Văn
5. Guest
```

Trước test:

```text
customerCount = 5
psychologyProfile = false trên 5 khách test
```

Sau khi app chạy:

```text
customerCount = 5
Customer 360 render = true
Card 🧠 Tâm lý khách hàng render = true
Today Action render = true
Knowledge Recommendation render = true
```

## 3.4 Call Review psychology fields

Đã nhập và lưu:

```text
Giả thuyết tâm lý nào đúng?
→ Khách thật sự lo giá và cần thêm niềm tin.

Giả thuyết nào sai?
→ Không phải khách không có nhu cầu.

Có bài học mới không?
→ Cần hỏi người quyết định trước khi gửi nhiều tài liệu.
```

Timeline sau khi lưu có:

```json
{
  "psychologyReview": {
    "trueHypothesis": "Khách thật sự lo giá và cần thêm niềm tin.",
    "falseHypothesis": "Không phải khách không có nhu cầu.",
    "lesson": "Cần hỏi người quyết định trước khi gửi nhiều tài liệu."
  }
}
```

---

# 4. Lỗi phát hiện

Không phát hiện lỗi cần sửa code.

Ghi chú QA:

- Lần chạy automation đầu tiên không điền được 3 ô tâm lý do script test match label phân biệt hoa/thường.
- Sau khi sửa script QA sang match không phân biệt hoa/thường, 3 ô lưu đúng.
- Đây là lỗi script kiểm thử, không phải lỗi CRM.

---

# 5. File đã sửa trong QA

Không sửa code.

Chỉ tạo file báo cáo:

```text
CRM_001_QA_REPORT.md
```

---

# 6. Regression Check

| Khu vực | Kết quả |
|---|---|
| Daily Flow | PASS |
| Smart Call Brief | PASS |
| Call Mode | PASS |
| Call Review | PASS |
| Customer 360 | PASS |
| Timeline | PASS |
| Today Action | PASS |
| Knowledge Recommendation | PASS |
| LocalStorage customer count | PASS |
| Build production | PASS |

---

# 7. Rủi ro còn lại

Không có lỗi blocker trong CRM-001.

Rủi ro còn lại mang tính kiến trúc, không thuộc phạm vi QA fix:

1. `main.jsx` vẫn lớn, dễ sửa nhầm về sau.
2. Psychology Engine hiện là rule-based foundation, chưa phải AI thật.
3. Nếu customer data quá nghèo, Athena nhận định sẽ chung chung nhưng vẫn không crash.
4. Knowledge Search cũ và Knowledge Registry mới vẫn là hai nguồn khác nhau.

---

# 8. Final Conclusion

CRM-001 PASS.

Customer Psychology Engine đã qua QA nền tảng:

- App build được.
- App local mở được.
- Khách cũ thiếu `psychologyProfile` không crash.
- Customer 360 hiển thị card `🧠 Tâm lý khách hàng`.
- Today Action và Knowledge Recommendation không bị phá.
- Call Mode và Call Review chạy được.
- 3 ô tâm lý mới lưu được vào Timeline qua `psychologyReview`.
- Không mất dữ liệu khách trong profile test.

