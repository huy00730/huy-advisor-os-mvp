# Knowledge Registry Migration Guide

Tài liệu này mô tả cách chuyển registry K1 cũ sang Knowledge Schema V1.

## 1. Mục tiêu migration

- Chuẩn hóa dữ liệu.
- Không đổi giao diện.
- Không đổi Customer 360.
- Không đổi Timeline.
- Không đổi Diagnosis.
- Không đổi Recommendation Engine ở tầng UI.

## 2. Cấu trúc mới

```text
src/data/
  knowledgeRegistry.js              # Adapter tương thích engine hiện tại
  knowledgeRegistry/
    index.js                        # Knowledge Schema V1 data
  decisionRegistry/
    index.js                        # Decision Schema V1 data
  sellingKeyRegistry/
    index.js                        # Selling Key Schema V1 data
```

## 3. Mapping từ schema cũ sang schema mới

### Knowledge

| Cũ | Mới |
|---|---|
| `id` | `id` |
| `title` | `title` |
| `summary` | `summary` |
| `tags` | `tags` |
| `barrier_match` | `matching.barriers` |
| `journey_match` | `matching.journeys` |
| `trust_range` | `matching.trustRange` |
| `priority` | `priority` |

### Decision

| Cũ | Mới |
|---|---|
| `id` | `id` |
| `title` | `title` |
| `reason` | `reason` |
| `tags` | `tags` |
| `barrier_match` | `matching.barriers` |
| `decision_maker_match` | `matching.decisionMakers` |
| `journey_match` | `matching.journeys` |
| `trust_range` | `matching.trustRange` |
| `priority` | `priority` |

### Selling Key

| Cũ | Mới |
|---|---|
| `id` | `id` |
| `text` | `text` |
| `tags` | `tags` |
| `barrier_match` | `matching.barriers` |
| `journey_match` | `matching.journeys` |
| `trust_range` | `matching.trustRange` |
| `priority` | `priority` |

## 4. Adapter

`src/data/knowledgeRegistry.js` vẫn export:

- `knowledgeRegistry`
- `decisionRegistry`
- `sellingReminderRegistry`
- `recommendKnowledgeForCustomer(customer)`

Nhờ vậy Customer 360 không cần sửa.

## 5. Quy trình thêm Knowledge mới

1. Thêm item vào `src/data/knowledgeRegistry/index.js`.
2. Dùng đúng schema V1.
3. Set `status: 'active'` nếu muốn recommendation engine dùng.
4. Chạy `npm run build`.
5. Kiểm tra Customer 360 vẫn hiển thị recommendation.

## 6. Quy trình thêm Decision mới

1. Thêm item vào `src/data/decisionRegistry/index.js`.
2. Điền `matching.decisionMakers` nếu Decision phụ thuộc người quyết định.
3. Chạy build.

## 7. Quy trình thêm Selling Key mới

1. Thêm item vào `src/data/sellingKeyRegistry/index.js`.
2. `text` phải ngắn, Advisor đọc được trong 3 giây.
3. Chạy build.

## 8. Không được làm

- Không hard-code registry vào UI.
- Không thêm field mới ngoài schema nếu chưa cập nhật `knowledgeSchema.md`.
- Không sửa Customer 360 chỉ vì thêm dữ liệu.
- Không dùng AI/LLM để suy luận trong migration này.
