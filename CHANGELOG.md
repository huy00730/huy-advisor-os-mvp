# Changelog

## v1.0.0 — HUY DIGITAL BRAIN V1

Release date: 2026-06-29

## Highlights

- Customer360 trở thành màn hình trung tâm trước khi tương tác với khách.
- Customer Psychology Engine được tích hợp vào Customer360.
- Psychology Registry mở rộng đến 100 rules.
- Athena Coach chuyển từ phân tích kỹ thuật sang hướng dẫn kiểu HLV.
- Workspace Coach hỗ trợ ngữ cảnh: Điện thoại, Zalo, Gặp trực tiếp, Sa bàn, Dự án, Nhà mẫu.
- Psychology Insight format chuẩn hóa theo 6 bước:
  1. Em đang quan sát thấy...
  2. Em nghĩ điều này có thể có nghĩa là...
  3. Em dựa trên những dấu hiệu...
  4. Điều em chưa chắc...
  5. Điều em muốn anh kiểm tra...
  6. Nếu là em...
- Knowledge Candidate Engine được thêm để đề xuất Candidate, không tự tạo Knowledge.
- Customer Psychology Knowledge Schema V1 được thiết kế trong `docs/knowledge-system/`.
- Customer360 Quality Review đã hoàn thành để chuẩn bị Quality Pass V2.

## Added

- `src/customerPsychologyEngine.js`
- `src/data/psychologyRegistry/index.js`
- `src/knowledgeCandidateEngine.js`
- `docs/knowledge-system/CUSTOMER_PSYCHOLOGY_KNOWLEDGE_SCHEMA_V1.md`
- `docs/knowledge-system/KS_001_REPORT.md`
- CRM implementation and QA reports:
  - `CRM_001_QA_REPORT.md`
  - `CRM_001_5_IMPLEMENTATION_REPORT.md`
  - `CRM_001_5_QA_REPORT.md`
  - `CRM_001_6_IMPLEMENTATION_REPORT.md`
  - `CRM_002_IMPLEMENTATION_REPORT.md`
  - `CRM_003_IMPLEMENTATION_REPORT.md`
  - `CRM_004_IMPLEMENTATION_REPORT.md`
  - `CRM_005_IMPLEMENTATION_REPORT.md`
  - `CRM_005_QA_REPORT.md`
  - `CUSTOMER360_QUALITY_REVIEW.md`

## Changed

- Package version updated to `1.0.0`.
- Customer360 now includes psychology-driven coaching and workspace-aware guidance.
- Call Review can pass conversation answers into the candidate capture flow.
- Developer-only Knowledge Candidate Center is available behind Developer Mode.

## QA

- Production build: PASS.
- Local HTTP check: PASS.
- Knowledge Candidate Engine QA: PASS.
- Customer360 quality review: completed.

## Notes

- No AI API added.
- No database migration added.
- Knowledge Candidate Engine does not create real Knowledge.
- Candidate approval only changes candidate status.
