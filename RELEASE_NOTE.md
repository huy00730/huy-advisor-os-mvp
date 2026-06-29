# Release Note

## HUY DIGITAL BRAIN V1

Version: `v1.0.0`

Date: 2026-06-29

## Release Summary

HUY DIGITAL BRAIN V1 packages the current HUY Advisor OS MVP into a usable advisor workspace centered around Customer360.

The product now helps Huy open one customer profile and quickly understand:

- Khách là ai.
- Khách đang ở giai đoạn nào.
- Lần trước đã nói gì.
- Hôm nay nên làm gì.
- Nên hỏi câu nào.
- Không nên nói gì.
- Knowledge/Decision nào nên dùng.
- Có pattern nào đáng đưa vào Knowledge Candidate hay không.

## What is included

### Customer360

Customer360 includes:

- Customer Overview.
- Workspace Selector.
- Psychology Coach.
- Customer Journey.
- Last Interaction.
- Today Action.
- Things To Avoid.
- Knowledge Recommendation.
- Timeline.

### Athena Psychology Coach

Athena now gives structured insight instead of only showing rule output.

Insight format:

1. Em đang quan sát thấy...
2. Em nghĩ điều này có thể có nghĩa là...
3. Em dựa trên những dấu hiệu...
4. Điều em chưa chắc...
5. Điều em muốn anh kiểm tra...
6. Nếu là em...

### Workspace Coach

Coach can adapt to:

- Điện thoại.
- Zalo.
- Gặp trực tiếp.
- Sa bàn.
- Dự án.
- Nhà mẫu.

### Knowledge Candidate Engine

CRM can detect repeated patterns after Call Review and create Knowledge Candidates.

Important:

> Candidate is not Knowledge.

CRM does not automatically create final Knowledge.

### Knowledge System Foundation

Customer Psychology Knowledge Schema V1 is documented under:

```text
docs/knowledge-system/
```

## Not included

This release does not include:

- AI API.
- Cloud database.
- New backend.
- Automatic Knowledge creation.
- Major UI redesign.
- New module architecture.

## Known limitations

- Customer360 currently has strong intelligence but can feel information-heavy.
- Quality Pass V2 is recommended to make Customer360 faster to read in 30 seconds.
- Knowledge Candidate data is localStorage-based.
- Developer Mode is currently enabled via URL/localStorage, not a dedicated Settings screen.

## Recommended next step

Run Customer360 Quality Pass V2:

1. Move Today Action higher.
2. Merge Customer Overview and Last Interaction.
3. Compact Psychology Coach.
4. Compact Knowledge Recommendation.
5. Limit Timeline preview to 3 latest events.
