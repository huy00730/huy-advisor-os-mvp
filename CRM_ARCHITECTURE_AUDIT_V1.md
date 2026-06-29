# CRM_ARCHITECTURE_AUDIT_V1

Project: HUY DIGITAL BRAIN / HUY ADVISOR OS MVP  
Audit mode: Chỉ đọc source, không sửa code, không refactor, không thêm tính năng  
Audit date: 2026-06-29  
Source audited: `/Users/huytran/Documents/Codex/2026-06-20/huy00730-gmail-com/huy-advisor-os-mvp`

---

# 1. Project Structure

## 1.1 Tổng quan thư mục

```text
huy-advisor-os-mvp/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── styles.css
│   └── data/
│       ├── knowledgeRegistry.js
│       ├── knowledgeRegistry/
│       │   └── index.js
│       ├── decisionRegistry/
│       │   └── index.js
│       └── sellingKeyRegistry/
│           └── index.js
├── docs/
│   ├── knowledgeSchema.md
│   ├── migrationGuide.md
│   └── ...
├── tools/
│   └── migrate-coastal-crm-to-advisor-store.mjs
├── migrated-data/
│   └── advisor-customers-from-coastal-crm-200.json
├── backups/
└── dist/
```

## 1.2 Module chính

| Khu vực | File | Vai trò | Đánh giá |
|---|---|---|---|
| App chính | `src/main.jsx` | Chứa gần như toàn bộ UI, business logic, storage, flow, component | Chạy được nhưng quá lớn |
| Style | `src/styles.css` | Toàn bộ CSS cho desktop/mobile | Chạy được nhưng quá lớn |
| Knowledge adapter | `src/data/knowledgeRegistry.js` | Chuẩn hóa registry và rule recommendation | Tốt |
| Knowledge data | `src/data/knowledgeRegistry/index.js` | Seed Knowledge theo schema | Tốt |
| Decision data | `src/data/decisionRegistry/index.js` | Seed Decision theo schema | Tốt |
| Selling Key data | `src/data/sellingKeyRegistry/index.js` | Seed Selling Key | Tốt |
| Migration tool | `tools/migrate-coastal-crm-to-advisor-store.mjs` | Chuyển dữ liệu CRM cũ sang Advisor Store | Hữu ích |
| Docs | `docs/` | Schema, migration guide, tài liệu registry | Tốt |

## 1.3 Component

Hiện tại component không được tách thành nhiều file. Phần lớn component nằm trong `src/main.jsx`.

Các component/chức năng lớn đang nằm trong `main.jsx`:

- `App`
- `TodayFlow`
- `Dashboard`
- `CustomerWorkspace`
- `CustomerForm`
- `CallMode`
- `CallReview`
- `FollowUpWorkspace`
- `AdvisorInbox`
- `KnowledgeSearch`
- `KnowledgeDetail`
- `DailyReview`
- `SmartCallBrief`
- `BackupControls`
- `CustomerMemoryCard`
- `DailyMissionProgress`
- `QuickChoiceGroup`
- `InfoRow`
- `KnowledgeList`
- `Progress`

Đánh giá:

- Tốt: dễ audit vì mọi luồng nằm tập trung.
- Chưa tốt: file quá lớn, khó bảo trì lâu dài.
- Trùng lặp: nhiều logic UI, timeline, customer update, next action đang nằm chung file và có dấu hiệu trùng giữa các flow.

## 1.4 Service

Chưa có thư mục service riêng.

Các logic hiện đang đóng vai trò service nhưng nằm trong `main.jsx`:

- Customer normalization
- Customer Store
- Backup/import/export
- Timeline builder
- Call Review save logic
- Reactivation queue
- Today Flow
- Next Best Action rule
- Deal Engine foundation
- Memory update
- Diagnosis update
- Sales DNA collection

Đánh giá:

- Tốt: MVP chạy nhanh, ít lớp trung gian.
- Chưa tốt: khi mở rộng sẽ khó kiểm soát side effect.
- Nên tách về sau: `customerStore`, `timelineService`, `callReviewService`, `memoryService`, `recommendationService`, `backupService`.

## 1.5 Storage

Storage hiện tại dùng `localStorage`, chưa dùng IndexedDB.

Key chính:

- `huy-advisor-os-customers-v1`
- `huy-advisor-os-inbox-completed-v1`
- `huy-advisor-os-reactivation-v1`
- `huy-advisor-os-last-migration-backup-key`

Đánh giá:

- Tốt: đơn giản, dễ backup, đủ cho MVP local.
- Chưa tốt: chưa phù hợp dữ liệu lớn, chưa có transaction, dễ đạt quota nếu timeline dài.
- Trùng lặp: nhiều nơi đọc/ghi localStorage trực tiếp thay vì qua adapter thống nhất.

## 1.6 Database

Không có database thật trong source hiện tại.

- Không có backend.
- Không có IndexedDB.
- Không có Cloud database.
- Không có schema database vật lý.

Database hiện tại là JSON object lưu trong localStorage.

## 1.7 AI

Không có AI online, không có LLM, không có API.

Các phần gọi là Coach/Recommendation hiện là rule-based:

- Advisor Coach
- Knowledge Recommendation
- Decision Recommendation
- Next Best Action
- Deal Engine foundation
- Customer Memory update
- Diagnosis update
- Sales DNA collection

Đánh giá:

- Tốt: an toàn, offline, dễ kiểm soát.
- Chưa tốt: tên “AI/Coach” có thể gây hiểu nhầm nếu kỳ vọng AI thật.

## 1.8 Utilities

Các utility nằm trong `main.jsx`:

- Date helpers
- Phone/name helpers
- Timeline helpers
- Customer normalization
- Import/export helpers
- Recommendation helpers
- Priority sorting helpers

Đánh giá:

- Tốt: đủ dùng.
- Chưa tốt: nên tách khỏi UI khi sản phẩm lớn hơn.

---

# 2. Product Structure

## 2.1 Danh sách màn hình hiện có

| Màn hình | Component/State | Chức năng |
|---|---|---|
| Daily Flow / Dashboard chính | `TodayFlow` | Điều phối ngày làm việc, Morning Brief, Focus Customer, Call flow, Daily Review |
| Dashboard cũ | `Dashboard` | KPI, Daily Mission, khách ưu tiên, backup, reactivation |
| Customer 360 / Customer Workspace | `CustomerWorkspace` | Màn hình chi tiết khách, overview, journey, today action, timeline, knowledge recommendation |
| Customer Form | `CustomerForm` | Thêm khách mới |
| Call Mode | `CallMode` | Màn hình chuẩn bị gọi, discovery questions, coach, call controls |
| Call Review / First Contact Master | `CallReview` | Lưu kết quả cuộc gọi, next action, follow-up, memory, diagnosis, sales DNA, deal signals |
| Follow-up Workspace | `FollowUpWorkspace` | Chia follow-up thành quá hạn, hôm nay, ngày mai |
| Advisor Inbox | `AdvisorInbox` | Inbox công việc: cần làm ngay, nên làm hôm nay, chờ, hoàn thành |
| Knowledge Search | `KnowledgeSearch` | Tìm knowledge/decision mock theo ID, keyword, category |
| Knowledge Detail | `KnowledgeDetail` | Xem chi tiết knowledge ngắn |
| Daily Review | `DailyReview` | Tổng kết cuối ngày từ dữ liệu customer/timeline |
| Smart Call Brief | `SmartCallBrief` | Tóm tắt trước cuộc gọi |
| Backup / Import / Export | `BackupControls` | Export/import JSON backup |
| Reactivation Mode | Trong Dashboard | Queue gọi lại khách quá hạn theo ngày |

## 2.2 Nhận xét Product Structure

Tốt:

- Sản phẩm đã có trục vận hành rõ: Daily Flow → Customer → Call → Review → Follow-up.
- Customer 360 đã trở thành màn hình trung tâm.
- Knowledge Recommendation đã bắt đầu tách dữ liệu khỏi UI.
- Backup/import/export đã có nền tảng.

Chưa tốt:

- Một số màn hình/flow cũ vẫn tồn tại song song với flow mới.
- Knowledge Search vẫn dùng mock `knowledgeCore`, chưa hoàn toàn dùng registry mới.
- Dashboard cũ và TodayFlow cùng tồn tại nên có thể gây trùng vai trò.
- Customer Memory component cũ còn trong source nhưng không còn là card chính đang render.

Trùng lặp:

- Dashboard/DailyFlow đều hướng tới “hôm nay làm gì”.
- CallReview/First Contact Master đang vừa là review, vừa là diagnosis, vừa là memory, vừa là sales DNA.
- Knowledge mock và Knowledge Registry cùng tồn tại.

---

# 3. Customer Detail Audit

Phần quan trọng nhất hiện là `CustomerWorkspace`.

## 3.1 Thứ tự hiển thị hiện tại

Khi mở Customer Workspace / Customer 360, thứ tự hiện tại:

1. Nút quay lại và thông báo đã lưu nếu có.
2. Header Customer 360:
   - Tên khách
   - Journey Stage badge
   - Trust Score
   - Emotion
3. `CUSTOMER OVERVIEW`
4. `CUSTOMER JOURNEY`
5. `LAST INTERACTION`
6. `TODAY ACTION`
7. `THINGS TO AVOID`
8. `Knowledge Recommendation`
9. `Timeline / Nhật ký quan hệ`
10. Modal chi tiết Timeline Event khi click event.

## 3.2 Panel/Card/Widget hiện có

### A. Header

Hiển thị:

- `HUY ADVISOR OS · CUSTOMER 360`
- Tên khách
- Stage badge
- Trust Score
- Emotion

Đánh giá:

- Tốt: giúp nhận diện khách nhanh.
- Chưa tốt: chưa hiển thị phone/Zalo ngay header.

### B. CUSTOMER OVERVIEW

Hiển thị:

- Họ tên
- Nghề nghiệp
- Gia đình
- Điều cần nhớ
- Customer Stage
- Barrier
- Decision Maker
- Interest

Đánh giá:

- Tốt: đúng hướng Customer 360.
- Chưa tốt: một số field có thể rỗng hoặc fallback “Chưa rõ”.
- Trùng lặp: Customer Stage, Decision Maker, Trust có thể tồn tại ở nhiều nơi: root, diagnosis, memory.

### C. CUSTOMER JOURNEY

Hiển thị journey dạng tiến trình:

- Lead mới
- Đã gọi
- Đã gửi tài liệu
- Follow-up
- Hẹn gặp
- Đặt cọc

Đánh giá:

- Tốt: dễ nhìn, đúng ngôn ngữ sales.
- Chưa tốt: hệ stage này chưa hoàn toàn đồng nhất với `stageOptions` và Diagnosis Stage.

### D. LAST INTERACTION

Hiển thị:

- Lần cuối liên hệ
- Đã gửi gì
- Khách phản hồi gì
- Follow-up khi nào

Đánh giá:

- Tốt: giảm nhu cầu đọc timeline dài.
- Chưa tốt: phụ thuộc chất lượng timeline event. Event cũ thiếu field sẽ fallback.

### E. TODAY ACTION

Hiển thị:

- Việc cần làm
- Lý do
- Mục tiêu cuộc liên hệ
- Độ ưu tiên
- Nếu khách phản hồi thì làm gì
- Nút `📞 Gọi ngay`

Đánh giá:

- Tốt: đây là card hành động quan trọng nhất.
- Chưa tốt: rule còn đơn giản, chưa đọc sâu toàn bộ memory/psychology.

### F. THINGS TO AVOID

Hiển thị:

- Điều cần tránh
- Điều khách không thích
- Điều phải nhớ

Đánh giá:

- Tốt: giúp giảm sai lầm trước cuộc gọi.
- Chưa tốt: một phần dữ liệu trùng với Customer Memory.

### G. Knowledge Recommendation

Hiển thị:

- Knowledge ID
- Tiêu đề
- Tóm tắt
- Vì sao CRM gợi ý
- Decision Recommendation
- Sales Reminder

Đánh giá:

- Tốt: kiến trúc đúng, đọc từ registry riêng.
- Chưa tốt: chưa có khả năng giải thích sâu theo từng timeline event.

### H. Timeline / Nhật ký quan hệ

Hiển thị theo mới → cũ:

- Ngày giờ
- Loại sự kiện
- Tiêu đề
- Nội dung tóm tắt
- Next Action
- Follow-up

Click event mở chi tiết:

- Nội dung tóm tắt
- Chi tiết
- Next Action
- Follow-up
- Knowledge
- Decision

Đánh giá:

- Tốt: đúng hướng “nhật ký quan hệ khách hàng”, không còn log kỹ thuật.
- Chưa tốt: timeline schema chưa được chuẩn hóa tuyệt đối giữa event cũ và mới.

## 3.3 Đánh giá Customer Detail tổng thể

Tốt:

- Customer 360 đã trả lời được các câu hỏi chính:
  - Khách là ai?
  - Đang ở đâu?
  - Lần trước nói gì?
  - Hôm nay nên làm gì?
  - Cần tránh gì?
  - Knowledge/Decision nào nên dùng?

Chưa tốt:

- Customer 360 đang chứa nhiều logic trực tiếp trong component.
- Một số card phụ thuộc dữ liệu fallback, dễ bị “Chưa rõ”.
- Chưa có lớp Customer Psychology Engine riêng.

Trùng lặp:

- Customer Memory, Diagnosis, Things To Avoid, Today Action đều có thể nói về barrier/lo ngại.
- Knowledge mock và registry recommendation chưa thống nhất hoàn toàn.

---

# 4. Customer Data Model

## 4.1 Field hiện có

Các field chính được normalize hoặc sử dụng trong source:

| Field | Vai trò | Trạng thái |
|---|---|---|
| `id` | ID nội bộ | Đang dùng |
| `customerId` | ID khách | Đang dùng |
| `name` | Họ tên | Đang dùng |
| `shortName` | Tên ngắn | Đang dùng |
| `phone` | Số điện thoại | Đang dùng |
| `zalo` | Zalo | Có lưu, dùng ít |
| `email` | Email | Có lưu, dùng ít |
| `stage` | Journey Stage | Đang dùng |
| `emotion` | Cảm xúc hiện tại | Đang dùng |
| `badge` | Badge quan tâm/đàm phán/im lặng | Đang dùng |
| `trustScore` | Điểm tin cậy | Đang dùng |
| `cta` | CTA ngắn | Đang dùng |
| `confirmedNeeds` | Nhu cầu xác nhận | Đang dùng |
| `workingHypotheses` | Giả thuyết chưa xác nhận | Đang dùng |
| `nextAction` | Việc tiếp theo | Đang dùng |
| `action` | Hành động ngắn | Có dùng, trùng với nextAction |
| `followUpDate` | Ngày follow-up | Đang dùng |
| `createdDate` | Ngày tạo | Đang dùng |
| `updatedDate` | Ngày cập nhật | Đang dùng |
| `callGoal` | Mục tiêu cuộc gọi | Đang dùng |
| `goldenSentence` | Câu nói vàng | Đang dùng |
| `discoveryQuestions` | Câu hỏi khám phá | Đang dùng |
| `coach` | Advisor Coach | Đang dùng |
| `snapshot` | Customer Snapshot | Đang dùng |
| `timeline` | Nhật ký khách hàng | Đang dùng |
| `customerMemory` | Điều cần nhớ dài hạn | Đang dùng |
| `dealSignals` | Tín hiệu deal | Đang dùng |
| `dealScore` | Deal score foundation | Có field, chưa tính thật |
| `dealScoreReason` | Lý do Deal score | Có field |
| `dealScoreStatus` | Status Deal score | Có field |
| `lastScoreUpdate` | Lần cập nhật score | Có field |
| `diagnosis` | Diagnosis sau cuộc gọi | Đang dùng |
| `legacySource` | Dữ liệu migrate từ CRM cũ | Có dùng để giữ nguồn |

## 4.2 Nested model

### `coach`

```text
focus
knowledge
decision
mistake
```

Đang dùng trong Customer Workspace, Smart Call Brief, Call Mode.

### `snapshot`

```text
confirmedNeed
hypothesis
decisionMaker
budget
nextAction
```

Đang dùng trong Customer Workspace và Call Mode.

### `customerMemory`

```text
confirmed
people
family
interests
cautions
specialNotes
updatedAt
```

Trong `confirmed` có thể có:

```text
purchaseGoal
budget
decisionMaker
timeline
mainConcern
projectInterested
comparingProject
liked
barrier
```

Đang dùng.

### `dealSignals`

```text
needConfirmed
budgetConfirmed
timelineConfirmed
decisionMakerConfirmed
meetingBooked
objectionResolved
materialSent
materialViewed
replyReceived
nextActionDefined
```

Đang dùng để lưu signal, nhưng Deal Score thật chưa được tính.

### `diagnosis`

```text
customerStage
barrier
trustScore
decisionMaker
interest
updatedAt
```

Đang dùng trong Customer Overview và recommendation.

## 4.3 Field đang dùng

Nên giữ:

- `id`
- `name`
- `phone`
- `stage`
- `emotion`
- `trustScore`
- `confirmedNeeds`
- `workingHypotheses`
- `nextAction`
- `followUpDate`
- `timeline`
- `customerMemory`
- `diagnosis`
- `coach`
- `snapshot`
- `dealSignals`

## 4.4 Field không dùng nhiều hoặc nên xem lại

- `email`: lưu được nhưng ít xuất hiện trong flow chính.
- `zalo`: lưu được nhưng chưa thành kênh vận hành rõ.
- `cta`: có thể trùng với `action`/`nextAction`.
- `action`: trùng nghĩa với `nextAction`.
- `badge`: hữu ích cho UI, nhưng cần chuẩn hóa giá trị.
- `dealScore`, `dealScoreReason`, `dealScoreStatus`: đã có foundation nhưng chưa hiển thị mạnh trong Customer 360 hiện tại.

## 4.5 Field trùng

| Nhóm thông tin | Field trùng/overlap |
|---|---|
| Stage | `stage`, `diagnosis.customerStage` |
| Trust | `trustScore`, `diagnosis.trustScore` |
| Next action | `nextAction`, `action`, `snapshot.nextAction` |
| Nhu cầu | `confirmedNeeds`, `snapshot.confirmedNeed`, `customerMemory.confirmed.purchaseGoal` |
| Giả thuyết | `workingHypotheses`, `snapshot.hypothesis` |
| Người quyết định | `snapshot.decisionMaker`, `diagnosis.decisionMaker`, `customerMemory.confirmed.decisionMaker` |
| Ngân sách | `snapshot.budget`, `customerMemory.confirmed.budget` |
| Barrier | `diagnosis.barrier`, `customerMemory.confirmed.barrier`, `customerMemory.confirmed.mainConcern` |

## 4.6 Field nên giữ

Giữ các field hiện tại để tránh mất tương thích dữ liệu cũ.

Nếu chuẩn hóa về sau, nên xác định source of truth:

- `stage`: source of truth cho Journey.
- `diagnosis`: source of truth cho đánh giá sau cuộc gọi.
- `customerMemory`: source of truth cho trí nhớ dài hạn.
- `timeline`: source of truth cho lịch sử tương tác.
- `nextAction`: source of truth cho việc tiếp theo.

## 4.7 Field nên bỏ

Không nên bỏ ngay vì có dữ liệu cũ.

Các field nên đưa vào danh sách deprecate về sau:

- `action`
- `cta`
- Một số mock/static field nếu không còn dùng trong UI mới.

---

# 5. AI Audit

## 5.1 Kết luận nhanh

CRM hiện tại không có AI thật.

Không thấy:

- OpenAI API
- Claude API
- LLM prompt runtime
- Vector database
- Semantic search
- Online AI inference

Các phần “AI/Coach” hiện là rule-based hoặc static data.

## 5.2 AI Coach / Advisor Coach

Nguồn:

- `customer.coach.focus`
- `customer.coach.knowledge`
- `customer.coach.decision`
- `customer.coach.mistake`

Đang làm:

- Nhắc trọng tâm làm việc với khách.
- Nhắc knowledge cần nhớ.
- Nhắc decision cần dùng.
- Nhắc lỗi dễ mắc.

Đánh giá:

- Tốt cho MVP.
- Chưa phải AI động.

## 5.3 Journey

Nguồn:

- `customer.stage`
- Journey display trong CustomerWorkspace.

Đang làm:

- Hiển thị khách đang ở bước nào.
- Dùng stage để gợi ý hành động.

Đánh giá:

- Tốt.
- Cần chuẩn hóa các hệ stage đang tồn tại.

## 5.4 Recommendation

Nguồn:

- `recommendKnowledgeForCustomer(customer)`
- `src/data/knowledgeRegistry.js`
- `knowledgeRegistry`
- `decisionRegistry`

Đang làm:

- Gợi ý Knowledge theo barrier, journey, trust, customer type.
- Gợi ý Decision theo customer context.
- Gợi ý Sales Reminder.

Đánh giá:

- Đây là phần có kiến trúc tốt nhất để mở rộng.
- Có thể phát triển thành engine thật mà không cần đổi UI lớn.

## 5.5 Next Action

Nguồn:

- `buildNextBestAction(customer, timelineEvents, customerMemory)`

Đang làm:

- Tạo Today Action gồm:
  - Việc cần làm
  - Lý do
  - Mục tiêu cuộc liên hệ
  - Độ ưu tiên
  - Nếu khách phản hồi thì làm gì

Đánh giá:

- Đúng hướng.
- Rule còn đơn giản.

## 5.6 Knowledge

Có hai hệ Knowledge:

1. `knowledgeCore` mock trong `main.jsx`
   - Dùng cho Knowledge Search.
2. `knowledgeRegistry` trong `src/data`
   - Dùng cho Knowledge Recommendation.

Đánh giá:

- Tốt: đã bắt đầu registry.
- Chưa tốt: cần thống nhất về một nguồn chính.

## 5.7 Advisor

Advisor flow gồm:

- Daily Flow
- Smart Call Brief
- Call Mode
- Call Review
- Daily Review

Đang làm:

- Dẫn Huy đi qua một ngày làm việc.
- Giảm việc phải tự nghĩ “tiếp theo làm gì”.

Đánh giá:

- Product direction rõ.
- Cần giảm trùng giữa Dashboard cũ và TodayFlow.

---

# 6. CRM Flow

## 6.1 Flow chính

```text
Daily Flow
↓
Morning Brief
↓
Focus Customer
↓
Smart Call Brief
↓
Call Mode
↓
Call Review / First Contact Master
↓
Save Review
↓
Customer Workspace / Customer 360
↓
Next Customer hoặc Daily Review
```

## 6.2 Flow Customer 360

```text
Customer List / Focus Customer / Inbox / Follow-up
↓
Customer Workspace
↓
Customer Overview
↓
Today Action
↓
Knowledge Recommendation
↓
Timeline
↓
Gọi ngay
```

## 6.3 Flow Call

```text
Smart Call Brief
↓
Call Mode
↓
Bắt đầu gọi
↓
Kết thúc cuộc gọi
↓
Call Review
↓
Lưu kết quả
↓
Update Customer
↓
Update Timeline
↓
Update Memory
↓
Update Diagnosis
↓
Update Deal Signals
↓
Update Sales DNA
↓
Customer Workspace
```

## 6.4 Flow Follow-up

```text
Follow-up Workspace
↓
Quá hạn / Hôm nay / Ngày mai
↓
Chọn khách
↓
Call Mode
↓
Call Review
↓
Update customer
```

## 6.5 Flow Advisor Inbox

```text
Advisor Inbox
↓
Cần làm ngay / Nên làm hôm nay / Chờ / Hoàn thành
↓
Gọi
↓
Call Mode
↓
Call Review
↓
Hoàn thành item
```

## 6.6 Flow Reactivation

```text
Dashboard
↓
Reactivation Queue
↓
10 khách/ngày
↓
Chọn kết quả
↓
Update Stage / Next Action / Follow-up / Timeline
```

---

# 7. IndexedDB Audit

## 7.1 Kết luận

Không phát hiện IndexedDB trong source hiện tại.

Không có:

- `indexedDB.open`
- Dexie
- idb
- Object Store
- Migration IndexedDB

## 7.2 Object Store

Không có object store.

## 7.3 Schema

Schema hiện tại là schema mềm trong localStorage JSON:

```text
huy-advisor-os-customers-v1 => Customer[]
huy-advisor-os-inbox-completed-v1 => CompletedInboxItem[]
huy-advisor-os-reactivation-v1 => ReactivationState
huy-advisor-os-last-migration-backup-key => string
```

## 7.4 Storage

Storage hiện tại:

- Đọc/ghi customer bằng localStorage.
- Import/export backup bằng JSON file.
- Migration từ CRM cũ ghi vào localStorage.
- Backup trước migration cũng nằm trong localStorage.

## 7.5 Migration

Có migration từ Coastal CRM cũ:

- Query param `?migrateCoastal200=1`
- Fetch backup từ URL Cloudflare cũ.
- Map legacy customer sang Advisor customer.
- Backup store hiện tại trước khi ghi.
- Lưu vào `huy-advisor-os-customers-v1`.

Có restore migration:

- Query param `?restoreMigration=1`
- Đọc backup key đã lưu.
- Restore lại customer store trước migration.

Đánh giá:

- Tốt: migration có backup.
- Chưa tốt: migration trigger bằng query param, chưa có UI kiểm soát rõ.
- Rủi ro: dữ liệu lớn về sau nên chuyển IndexedDB hoặc backend.

---

# 8. Technical Debt

## 8.1 Code trùng

- Multiple customer update paths:
  - `saveReviewToCustomer`
  - `saveFlowReview`
  - `saveReactivationResult`
  - import/normalize
  - migration mapping
- Multiple timeline shapes:
  - event cũ có `date`, `type`, `confirmed`, `next`
  - event mới có `createdAt`, `eventType`, `title`, `summary`, `nextAction`, `followUp`, `detail`
- Multiple knowledge systems:
  - `knowledgeCore` mock
  - `knowledgeRegistry` schema V1
- Multiple daily work entry points:
  - `Dashboard`
  - `TodayFlow`
  - `DailyMission`
  - `AdvisorInbox`
  - `FollowUpWorkspace`

## 8.2 Logic trùng

- Next Action được suy ra ở nhiều nơi.
- Follow-up grouping được tính ở nhiều flow.
- Customer stage được dùng bởi Journey, Diagnosis, Dashboard, Today Action nhưng chưa có enum duy nhất.
- Trust Score vừa ở root customer vừa ở diagnosis.
- Customer Memory và Diagnosis cùng lưu một số ý về barrier/decision maker.

## 8.3 UI trùng

- Dashboard và TodayFlow đều là màn “bắt đầu ngày”.
- Customer Snapshot cũ và Customer Overview mới overlap.
- CustomerMemoryCard component cũ vẫn tồn tại nhưng CustomerWorkspace hiện dùng block Overview/Things To Avoid thay thế.
- Knowledge Search detail và Knowledge Recommendation hiển thị knowledge theo hai format khác nhau.

## 8.4 Component nên tách

Nên tách về sau:

- `CustomerWorkspace`
- `CustomerOverviewCard`
- `CustomerJourneyCard`
- `LastInteractionCard`
- `TodayActionCard`
- `ThingsToAvoidCard`
- `KnowledgeRecommendationCard`
- `TimelineCard`
- `CallReview`
- `CallMode`
- `DailyFlow`
- `BackupControls`

## 8.5 Service nên tách

Nên tách về sau:

- `customerStoreService`
- `timelineService`
- `callReviewService`
- `customerMemoryService`
- `diagnosisService`
- `dealSignalService`
- `knowledgeRecommendationService`
- `nextBestActionService`
- `backupService`
- `migrationService`

## 8.6 Rủi ro kỹ thuật

- `main.jsx` quá lớn, dễ tạo bug khi sửa nhỏ.
- Không có test tự động.
- Không có error boundary.
- localStorage có giới hạn dung lượng.
- Timeline không có schema validation.
- Customer Store chưa có versioned migration rõ ràng.
- Một số component/logic cũ vẫn nằm trong code, dễ sửa nhầm màn không còn dùng.

---

# 9. Integration Opportunity

Chủ đề: Nếu tích hợp `Customer Psychology Engine` thì nên đặt ở đâu?

## 9.1 Kiến trúc hiện tại phù hợp nhất

Nên đặt `Customer Psychology Engine` ở giữa:

```text
Customer Data
Timeline
Diagnosis
Customer Memory
Trust Score
Stage
↓
Customer Psychology Engine
↓
Customer 360
Today Action
Knowledge Recommendation
Call Mode
Call Review
```

Không nên đặt trực tiếp trong UI trước.

Lý do:

- Psychology là lớp suy luận từ dữ liệu khách.
- Nó không nên bị khóa vào một card cụ thể.
- Sau này Today Action, Knowledge Recommendation, Call Mode đều cần dùng.

## 9.2 Vị trí UI nên hiển thị

### Option A — Đặt trong Customer 360, ngay sau CUSTOMER OVERVIEW

Tên card đề xuất:

```text
🧠 Customer Psychology
```

Nội dung:

- Khách đang lo gì
- Động cơ chính
- Phong cách ra quyết định
- Mức độ tin tưởng
- Điều nên tránh
- Cách mở đầu phù hợp

Ưu điểm:

- Advisor nhìn thấy trước khi gọi.
- Rất gần với Customer Overview.
- Dễ hiểu về mặt sản phẩm.

Nhược điểm:

- Customer 360 đã nhiều card.
- Nếu hiển thị dài sẽ làm rối màn hình.

### Option B — Gộp vào `TODAY ACTION`

Ví dụ:

```text
Hôm nay nên làm gì
Vì sao
Mục tiêu cuộc liên hệ
Tâm lý khách đang cần xử lý
```

Ưu điểm:

- Không thêm card mới.
- Tập trung vào hành động.
- Phù hợp nguyên tắc “Advisor không cần đọc nhiều”.

Nhược điểm:

- Psychology có thể bị ẩn, khó audit.
- Không đủ không gian để giải thích.

### Option C — Gộp vào `THINGS TO AVOID`

Ưu điểm:

- Tự nhiên vì tâm lý khách thường liên quan điều cần tránh.
- Giúp giảm lỗi khi gọi.

Nhược điểm:

- Chỉ thể hiện mặt rủi ro, thiếu phần động cơ/tín hiệu mua.

### Option D — Làm nguồn input cho Knowledge Recommendation

Ví dụ:

```text
Barrier = Giá
Trust thấp
Decision Maker = Vợ
Psychology = Sợ mua sai
↓
Recommend P-0006, DB-0003, DB-0004
```

Ưu điểm:

- Rất đúng về kiến trúc.
- Giúp recommendation thông minh hơn.
- Không cần thay đổi UI nhiều.

Nhược điểm:

- Advisor không thấy rõ “CRM đang hiểu tâm lý gì” nếu không có giải thích.

## 9.3 Recommendation tốt nhất

Nên triển khai theo 2 lớp:

### Layer 1 — Engine thuần logic

Tạo một engine độc lập:

```text
customerPsychologyEngine(customer) => psychologyProfile
```

Output:

- `dominantConcern`
- `buyingMotivation`
- `decisionStyle`
- `trustRisk`
- `communicationPreference`
- `advisorPosture`
- `confidence`
- `evidence`

### Layer 2 — UI rất gọn trong Customer 360

Đặt card nhỏ sau `CUSTOMER OVERVIEW`, trước `TODAY ACTION` hoặc gộp vào `TODAY ACTION`.

Tên tiếng Việt nên dùng:

```text
🧠 Tâm lý khách hàng
```

Không nên hiển thị dài.

Chỉ nên hiển thị:

- Khách đang lo nhất
- Động cơ chính
- Nên tiếp cận thế nào
- Không nên làm gì

## 9.4 Không nên đặt ở đâu

Không nên đặt trong:

- Dashboard: vì Psychology gắn với từng khách, không phải tổng quan ngày.
- Knowledge Search: vì Search là công cụ tra cứu, không phải nơi hiểu khách.
- Call Review: Call Review là nơi nhập dữ liệu sau cuộc gọi; có thể cập nhật psychology nhưng không nên là nơi chính để xem.
- Backup/Import/Settings: không liên quan.

## 9.5 Ưu và nhược khi tích hợp ngay

Ưu:

- Customer 360 sẽ mạnh hơn rõ rệt.
- Today Action sẽ có lý do sâu hơn.
- Knowledge Recommendation chính xác hơn.
- Advisor ít phải đọc timeline dài.

Nhược:

- Nếu chưa chuẩn hóa data model, engine có thể đọc nhiều field trùng.
- Nếu UI không gọn, Customer 360 sẽ rối.
- Nếu gọi là AI nhưng chỉ rule-based, cần diễn đạt rõ là “gợi ý theo dữ liệu hiện có”.

---

# 10. CTO Recommendation

Nếu đóng vai CTO, tôi sẽ làm theo thứ tự sau.

## Sprint 1 — Chuẩn hóa Customer Data Contract

Mục tiêu:

- Không sửa UI lớn.
- Tạo tài liệu/constant cho customer model.
- Xác định source of truth cho:
  - Stage
  - Trust Score
  - Diagnosis
  - Customer Memory
  - Next Action
  - Timeline Event

Kết quả mong muốn:

- Biết field nào là chính.
- Field trùng được đánh dấu deprecated, chưa xóa.
- Không phá dữ liệu cũ.

## Sprint 2 — Chuẩn hóa Timeline Event Schema

Mục tiêu:

- Tất cả event mới theo một schema duy nhất.
- Event cũ vẫn đọc được qua adapter.
- Customer 360 không phải fallback quá nhiều.

Kết quả mong muốn:

- Timeline đáng tin.
- Daily Review, Memory, Psychology Engine đọc timeline dễ hơn.

## Sprint 3 — Tách Service Layer nhẹ

Mục tiêu:

- Chưa refactor lớn.
- Chỉ tách logic không dính UI:
  - `customerStore`
  - `timelineService`
  - `nextActionEngine`
  - `recommendationEngine`

Kết quả mong muốn:

- Giảm rủi ro sửa nhầm UI.
- Dễ test.

## Sprint 4 — Hợp nhất Knowledge Search với Knowledge Registry

Mục tiêu:

- `knowledgeCore` mock không còn là nguồn chính.
- Search đọc từ `knowledgeRegistry`.
- Detail view dùng cùng schema với Recommendation.

Kết quả mong muốn:

- Một nguồn Knowledge duy nhất.
- Không trùng dữ liệu.

## Sprint 5 — Customer Psychology Engine Foundation

Mục tiêu:

- Không AI online.
- Rule-based.
- Đọc từ Customer Memory, Diagnosis, Timeline, Stage, Trust.
- Output rõ:
  - Concern
  - Motivation
  - Decision Style
  - Advisor Posture
  - Confidence
  - Evidence

Kết quả mong muốn:

- Customer 360 hiểu khách sâu hơn.
- Today Action và Recommendation có input tốt hơn.

## Sprint 6 — Customer 360 UX Compact Pass

Mục tiêu:

- Không thêm thông tin dài.
- Sắp xếp lại để Advisor mở lên trong 10 giây biết:
  - Khách là ai
  - Tâm lý chính
  - Hôm nay làm gì
  - Cần tránh gì
  - Nên dùng Knowledge/Decision nào

Kết quả mong muốn:

- Customer 360 thành màn duy nhất trước cuộc gọi.

## Sprint 7 — Storage Adapter

Mục tiêu:

- Tạo adapter:
  - `getCustomers`
  - `saveCustomers`
  - `exportBackup`
  - `importBackup`
- Vẫn dùng localStorage trước.
- Chuẩn bị chuyển IndexedDB/backend sau.

Kết quả mong muốn:

- Không còn đọc/ghi localStorage rải rác.

## Sprint 8 — IndexedDB hoặc Cloud Sync

Chỉ làm khi dữ liệu thật tăng mạnh.

Mục tiêu:

- Giảm rủi ro quota localStorage.
- Tăng độ bền dữ liệu.

## Sprint 9 — Test Suite tối thiểu

Mục tiêu:

- Test normalize customer.
- Test save call review.
- Test timeline event.
- Test import/export.
- Test next action.
- Test recommendation.

Kết quả mong muốn:

- Không bị bug cũ kiểu sửa nhầm màn không dùng.

## Sprint 10 — Production Hardening

Mục tiêu:

- Error boundary.
- Data validation.
- Backup reminder.
- Migration safety.
- Changelog rõ.

Kết quả mong muốn:

- CRM đủ an toàn để dùng thật mỗi ngày.

---

# Final CTO Notes

HUY ADVISOR OS hiện đã vượt qua giai đoạn demo đơn giản. Sản phẩm đã có xương sống:

```text
Daily Flow
→ Customer 360
→ Call Mode
→ Call Review
→ Timeline
→ Memory
→ Recommendation
→ Follow-up
```

Điểm mạnh nhất:

- Product flow thực chiến rõ.
- Customer 360 đang đi đúng hướng.
- Knowledge/Decision Registry đã bắt đầu tách dữ liệu khỏi UI.
- Local backup/import/export đã có.

Điểm yếu lớn nhất:

- Source tập trung quá nhiều trong `main.jsx`.
- Data model chưa có source of truth đủ rõ.
- Timeline schema chưa chuẩn tuyệt đối.
- Knowledge mock và registry mới còn song song.

Nếu tích hợp `Customer Psychology Engine`, không nên thêm vội một module lớn. Nên tạo engine rule-based nhỏ, đọc dữ liệu hiện có, rồi hiển thị rất gọn trong Customer 360 và dùng làm input cho Today Action + Knowledge Recommendation.

Nguyên tắc CTO đề xuất:

```text
Không thêm màn hình nếu Customer 360 còn chứa được.
Không thêm AI nếu rule-based còn giải quyết được.
Không mở rộng Knowledge nếu data model chưa chuẩn.
Không refactor lớn trước khi khóa Timeline + Customer Model.
```

