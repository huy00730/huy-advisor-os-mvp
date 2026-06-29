# Production Checklist

## Release

- Product: HUY DIGITAL BRAIN
- Version: `v1.0.0`
- Date: 2026-06-29

## Build

- [x] `npm run build` PASS.
- [x] Vite build completed.
- [x] No build warning found in final build output.
- [x] Package version set to `1.0.0`.

## Local Runtime

- [x] Local dev server starts.
- [x] Local app returns HTTP 200.
- [x] App loads from `http://127.0.0.1:5174/` during QA.

## Core Flow Smoke Test

- [x] Customer store loading preserved.
- [x] Customer360 source remains available.
- [x] Call Review save path remains wired.
- [x] Timeline update path remains wired.
- [x] Knowledge Recommendation source remains wired.
- [x] Today Action source remains wired.

## Knowledge Candidate Engine

- [x] `src/knowledgeCandidateEngine.js` exists.
- [x] Candidate localStorage key is `huy-advisor-os-knowledge-candidates-v1`.
- [x] Candidate schema verified.
- [x] Candidate capture after Call Review wired.
- [x] Approve changes status to `CONFIRMED`.
- [x] Reject changes status to `REJECTED`.
- [x] CRM does not automatically create Knowledge.

## Documentation

- [x] `CHANGELOG.md` created.
- [x] `RELEASE_NOTE.md` created.
- [x] `PRODUCTION_CHECKLIST.md` created.
- [x] `RELEASE_V1_REPORT.md` created.
- [x] Customer360 Quality Review completed.
- [x] Knowledge System Schema documented.

## Data Safety

- [x] No reset localStorage command introduced.
- [x] No customer data deletion introduced.
- [x] No database migration introduced.
- [x] No AI API introduced.

## Before Production Use

- [ ] Export backup JSON manually.
- [ ] Open 3 existing customers and verify Customer360.
- [ ] Save 1 Call Review and verify Timeline.
- [ ] Enable Developer Mode only if reviewing Knowledge Candidates.

## Release Decision

Status: READY FOR CONTROLLED PRODUCTION USE

Condition:

Use with manual backup discipline until cloud sync/database is introduced.
