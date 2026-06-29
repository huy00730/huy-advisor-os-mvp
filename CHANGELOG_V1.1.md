# CHANGELOG V1.1 — Sales DNA Engine · Phase A

## Scope

Sprint V1.1 adds a lightweight Sales DNA collection layer to the existing HUY ADVISOR OS flow.

No chatbot, no voice, no backend, no new database, no machine learning, and no ranking logic were added.

## Added

### 1. Call Review · Sales DNA

Added a `SALES DNA` block inside Call Review with quick selections:

- Golden Sentence hiệu quả
- Discovery Question hiệu quả
- Coach Reminder hữu ích
- Xử lý phản đối thành công
- Follow-up hiệu quả

Added a short note field:

- “Tại sao hiệu quả?”

### 2. Timeline Storage

Each Call Review timeline item can now store:

```json
{
  "salesDNA": [
    {
      "type": "GoldenSentence",
      "label": "Golden Sentence hiệu quả",
      "value": "...",
      "note": "...",
      "knowledgeId": "P-0003",
      "decisionId": "DB-001",
      "createdAt": "..."
    }
  ]
}
```

### 3. Knowledge Link

Sales DNA entries are linked to the Knowledge ID and Decision ID selected in that Call Review.

### 4. Daily Review

Added a `Sales DNA hôm nay` section showing:

- Golden Sentence
- Discovery Question
- Coach Reminder

This is collection only, not ranking.

### 5. Dashboard Widget

Added a small `Sales DNA Collected` widget showing:

- Hôm nay: X kinh nghiệm mới

### 6. Backup / Export

Backup payload now includes:

- `salesDNA`
- `salesDNACount`
- Existing customers and timeline data, including Sales DNA stored inside each timeline item.

## Build

Production build: PASS

## Notes

This Sprint only collects Sales DNA. It does not analyze, rank, recommend, or auto-update Knowledge.
