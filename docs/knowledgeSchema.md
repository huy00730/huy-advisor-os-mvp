# Knowledge Schema V1

Mục tiêu của Knowledge Schema V1 là chuẩn hóa dữ liệu học bán hàng để HUY ADVISOR OS có thể mở rộng lên:

- 1.000 Knowledge
- 500 Decision
- 2.000 Selling Key

Mà không cần sửa giao diện Customer 360.

## 1. Nguyên tắc

- Registry là nguồn dữ liệu, UI chỉ hiển thị dữ liệu đã được recommendation engine chọn.
- Mỗi item phải có `id` duy nhất.
- Mỗi item phải có `schemaVersion`.
- Matching rule nằm trong object `matching`, không rải field ở nhiều nơi.
- Không dùng AI, LLM hoặc prediction trong schema này.
- Nếu thiếu match field, item vẫn hợp lệ nhưng điểm ưu tiên sẽ thấp hơn.

## 2. Common Fields

Tất cả registry item dùng chung các field sau:

| Field | Type | Required | Mô tả |
|---|---:|---:|---|
| `schemaVersion` | string | Yes | Phiên bản schema, hiện tại là `1.0` |
| `type` | string | Yes | `knowledge`, `decision`, hoặc `selling_key` |
| `id` | string | Yes | ID duy nhất, ví dụ `P-0008`, `DB-0004`, `SR-0001` |
| `title` | string | Yes | Tên ngắn, dễ hiểu |
| `summary` | string | No | Tóm tắt ngắn dùng trong UI |
| `tags` | string[] | Yes | Từ khóa để match ngữ cảnh |
| `matching` | object | Yes | Điều kiện khớp ngữ cảnh khách |
| `priority` | number | Yes | Điểm ưu tiên gốc, 0–100 |
| `status` | string | Yes | `active`, `draft`, `archived` |
| `source` | string | No | Nguồn tạo/cập nhật |
| `updatedAt` | string | No | ISO date nếu có |

## 3. Matching Object

```js
matching: {
  barriers: [],
  journeys: [],
  trustRange: [0, 100],
  decisionMakers: [],
  interests: [],
}
```

| Field | Type | Dùng cho | Mô tả |
|---|---:|---|---|
| `barriers` | string[] | Knowledge, Decision, Selling Key | Match với Diagnosis Barrier |
| `journeys` | string[] | Knowledge, Decision, Selling Key | Match với Customer Stage / Journey |
| `trustRange` | number[] | Knowledge, Decision, Selling Key | Khoảng Trust Score phù hợp |
| `decisionMakers` | string[] | Decision, Selling Key | Match với Decision Maker |
| `interests` | string[] | Knowledge, Selling Key | Match với Interest |

## 4. Knowledge Schema

Knowledge là kiến thức nền Advisor cần nhớ trước khi nói chuyện.

```js
{
  schemaVersion: '1.0',
  type: 'knowledge',
  id: 'P-0008',
  title: 'Khi khách nói giá, phải tách giá khỏi tổng chi phí và giá trị',
  summary: 'Không né giá, nhưng cũng không tranh luận...',
  tags: ['giá', 'tài chính', 'đàm phán'],
  matching: {
    barriers: ['Giá', 'Tài chính'],
    journeys: ['Quan tâm', 'So sánh', 'Chờ'],
    trustRange: [0, 100],
    decisionMakers: [],
    interests: ['Giá'],
  },
  priority: 96,
  status: 'active',
  source: 'K1 seed',
}
```

## 5. Decision Schema

Decision là hướng xử lý/suy nghĩ Advisor nên dùng khi khách có ngữ cảnh cụ thể.

```js
{
  schemaVersion: '1.0',
  type: 'decision',
  id: 'DB-0004',
  title: 'Đưa người quyết định vào bước tiếp theo',
  reason: 'Decision Maker là vợ/chồng/gia đình/công ty...',
  tags: ['decision maker', 'gia đình'],
  matching: {
    barriers: ['Gia đình', 'Niềm tin'],
    journeys: ['Quan tâm', 'So sánh', 'Chờ'],
    trustRange: [0, 100],
    decisionMakers: ['Vợ', 'Chồng', 'Gia đình', 'Công ty'],
    interests: [],
  },
  priority: 95,
  status: 'active',
  source: 'K1 seed',
}
```

## 6. Selling Key Schema

Selling Key là câu nhắc ngắn giúp Advisor tránh sai lầm hoặc nhớ đúng trọng tâm.

```js
{
  schemaVersion: '1.0',
  type: 'selling_key',
  id: 'SR-0001',
  title: 'Trust thấp',
  text: 'Đừng chốt. Xây niềm tin trước.',
  tags: ['trust thấp', 'niềm tin'],
  matching: {
    barriers: ['Niềm tin', 'Pháp lý', 'Chưa đủ thông tin'],
    journeys: ['Tò mò', 'Quan tâm'],
    trustRange: [0, 39],
    decisionMakers: [],
    interests: [],
  },
  priority: 100,
  status: 'active',
  source: 'K1 seed',
}
```

## 7. Validation Rules

Một item hợp lệ khi:

- Có `schemaVersion`.
- Có `type`.
- Có `id`.
- Có `title`.
- Có `tags`.
- Có `matching`.
- Có `priority`.
- Có `status`.

Một item không nên đưa vào production nếu:

- `status = draft`.
- Không có `matching.trustRange`.
- Không có `summary` với Knowledge.
- Không có `reason` với Decision.
- Không có `text` với Selling Key.

## 8. Version History

| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-06-29 | Chuẩn hóa Knowledge, Decision, Selling Key cho Phase 2 K1 |
