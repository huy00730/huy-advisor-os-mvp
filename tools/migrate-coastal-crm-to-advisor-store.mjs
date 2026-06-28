#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'

const DEFAULT_BACKUP_ID = 'b037bb6a-ac45-45c1-9f32-ec02158e5a91'
const DEFAULT_BACKUP_URL = `https://huy-sales-os.pages.dev/api/backup?id=${DEFAULT_BACKUP_ID}`
const todayIso = '2026-06-29'

function text(value, fallback = '') {
  if (value === undefined || value === null) return fallback
  const normalized = String(value).trim()
  return normalized || fallback
}

function number(value, fallback = 50) {
  const parsed = Number(value)
  if (Number.isFinite(parsed)) return Math.max(0, Math.min(100, Math.round(parsed)))
  return fallback
}

function normalizeStage(customer) {
  const raw = text(customer.salesJourneyStage || customer.status, 'Lead mới')
  const lower = raw.toLowerCase()
  if (lower.includes('zalo')) return 'Đã kết nối Zalo'
  if (lower.includes('xem') || lower.includes('tài liệu')) return 'Đã xem tài liệu'
  if (lower.includes('follow') || lower.includes('nuôi')) return 'Đang follow-up'
  if (lower.includes('cân nhắc')) return 'Đang cân nhắc'
  if (lower.includes('hẹn') || lower.includes('tham quan')) return 'Có hẹn'
  if (lower.includes('đàm phán') || lower.includes('booking') || lower.includes('cọc')) return 'Đàm phán'
  if (lower.includes('reconnect') || lower.includes('ngủ')) return 'Reconnect'
  return raw || 'Lead mới'
}

function normalizeEmotion(customer) {
  const source = [
    customer.emotion,
    customer.mainConcern,
    customer.bottleneckReason,
    customer.status,
    customer.note,
  ].map((item) => text(item).toLowerCase()).join(' ')

  if (source.includes('im lặng') || source.includes('không nghe')) return 'Im lặng'
  if (source.includes('so sánh') || source.includes('đối thủ')) return 'So sánh'
  if (source.includes('rủi ro') || source.includes('thanh khoản')) return 'Lo rủi ro'
  if (source.includes('niềm tin') || source.includes('pháp lý')) return 'Cần niềm tin'
  if (source.includes('cân nhắc') || source.includes('suy nghĩ')) return 'Cân nhắc'
  if (source.includes('tin tưởng') || source.includes('hẹn')) return 'Tin tưởng'
  if (source.includes('quan tâm')) return 'Quan tâm'
  return 'Chưa rõ'
}

function normalizeBadge(emotion, stage) {
  const source = `${emotion} ${stage}`.toLowerCase()
  if (source.includes('đàm phán') || source.includes('cân nhắc') || source.includes('so sánh')) return 'Negotiating'
  if (source.includes('im lặng') || source.includes('reconnect')) return 'Silent'
  return 'Interested'
}

function formatDate(value) {
  if (!value) return todayIso
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return todayIso
  return parsed.toISOString().slice(0, 10)
}

function mapLogsToTimeline(logs = []) {
  if (!Array.isArray(logs)) return []
  return logs.slice(0, 20).map((log, index) => {
    const date = formatDate(log.date || log.createdAt || log.nextFollowUp)
    return {
      id: log.id || `legacy-log-${index}`,
      isoDate: date,
      date: date.slice(5).split('-').reverse().join('/'),
      type: text(log.activityType || log.channel || log.type, 'Note'),
      confirmed: text(log.content || log.note || log.question || log.answer, 'Log từ CRM cũ.'),
      next: text(log.nextFollowUp ? `Follow-up ${formatDate(log.nextFollowUp)}` : log.result, 'Chưa rõ bước tiếp theo.'),
    }
  })
}

function mapCustomer(customer, index) {
  const name = text(customer.name, `Khách CRM cũ ${index + 1}`)
  const phone = text(customer.phone)
  const stage = normalizeStage(customer)
  const emotion = normalizeEmotion(customer)
  const nextAction = text(
    customer.nextBestAction ||
    customer.nextAction ||
    customer.objectiveToday ||
    customer.conversationHint,
    'Gọi xác nhận nhu cầu.'
  )
  const confirmedNeed = text(
    customer.primaryNeed && customer.primaryNeed !== 'Chưa rõ' ? customer.primaryNeed : customer.need,
    'Chưa xác nhận.'
  )
  const hypothesis = text(
    customer.fieldCaseLog ||
    customer.note ||
    customer.mainConcern ||
    customer.bottleneckReason,
    'Chưa xác nhận.'
  )
  const decisionMaker = text(customer.customerDNA?.family?.decisionMaker || customer.decisionMaker, 'Chưa rõ.')
  const budget = text(customer.finance || customer.budget, 'Chưa xác nhận.')
  const trustScore = number(customer.trustScore ?? customer.relationshipScore ?? customer.leadScore, 50)

  return {
    id: text(customer.id, `legacy-${index + 1}`),
    customerId: text(customer.customerId || customer.id, `legacy-${index + 1}`),
    name,
    shortName: text(customer.shortName, name),
    phone,
    zalo: text(customer.zalo || customer.zaloPhone, phone),
    email: text(customer.email),
    stage,
    emotion,
    badge: normalizeBadge(emotion, stage),
    trustScore,
    confirmedNeeds: confirmedNeed,
    workingHypotheses: hypothesis,
    nextAction,
    action: nextAction,
    followUpDate: formatDate(customer.nextFollowUp || customer.followUpDate),
    createdDate: customer.createdAt || new Date().toISOString(),
    updatedDate: customer.updatedAt || new Date().toISOString(),
    cta: '📞 Gọi',
    callGoal: text(customer.objectiveToday, 'Xác nhận nhu cầu, cập nhật thông tin và chốt bước tiếp theo.'),
    goldenSentence: text(customer.conversationHint, 'Dạ em gọi ngắn thôi, mục tiêu là hiểu đúng nhu cầu của anh/chị để khỏi tư vấn sai.'),
    discoveryQuestions: [
      'Hiện tại anh/chị đang quan tâm mục tiêu nào nhất?',
      'Điều gì làm anh/chị còn phân vân?',
      'Nếu phù hợp, bước tiếp theo mình muốn là gì?',
      'Ai sẽ cùng mình quyết định?',
      'Em nên follow-up vào thời điểm nào là tiện nhất?',
    ],
    coach: {
      focus: text(customer.objectiveToday || customer.nextBestAction, 'Xác nhận nhu cầu trước khi tư vấn.'),
      knowledge: text(customer.materialSuggestion, 'Khách cần đúng thông tin, không cần nhiều thông tin.'),
      decision: text(customer.conversationHint, 'DB-001 · Hỏi rõ mục tiêu trước khi tư vấn.'),
      mistake: text(customer.bottleneckReason, 'Nói quá nhiều khi chưa hiểu khách.'),
    },
    snapshot: {
      confirmedNeed,
      hypothesis,
      decisionMaker,
      budget,
      nextAction,
    },
    timeline: mapLogsToTimeline(customer.logs),
    legacySource: {
      source: 'CRM Coastal Master / HUY SALES OS',
      sourceId: customer.id,
      saleOwner: customer.saleOwner || '',
      teamLeader: customer.teamLeader || '',
      status: customer.status || '',
      originalStage: customer.salesJourneyStage || '',
    },
  }
}

async function main() {
  const backupUrl = process.argv[2] || DEFAULT_BACKUP_URL
  const outputPath = process.argv[3] || path.resolve('migrated-data/advisor-customers-from-coastal-crm-200.json')
  const response = await fetch(backupUrl)
  if (!response.ok) throw new Error(`Không tải được backup CRM cũ: HTTP ${response.status}`)

  const payload = await response.json()
  const customers = payload?.backup?.data?.customers
  if (!Array.isArray(customers)) throw new Error('Backup không có mảng customers hợp lệ.')

  const migrated = customers.map(mapCustomer)
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, `${JSON.stringify(migrated, null, 2)}\n`)

  const report = {
    sourceBackupId: payload.backup.id,
    sourceReason: payload.backup.reason,
    sourceCreatedAt: payload.backup.createdAt,
    sourceCount: customers.length,
    migratedCount: migrated.length,
    outputPath,
    missingPhone: migrated.filter((customer) => !customer.phone).length,
    missingName: migrated.filter((customer) => !customer.name).length,
  }

  console.log(JSON.stringify(report, null, 2))
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
