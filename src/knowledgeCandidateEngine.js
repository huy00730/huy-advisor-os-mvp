export const KNOWLEDGE_CANDIDATE_STORE_KEY = 'huy-advisor-os-knowledge-candidates-v1'

export const KNOWLEDGE_CANDIDATE_STATUS = {
  NEW: 'NEW',
  REPEATED: 'REPEATED',
  READY_FOR_REVIEW: 'READY_FOR_REVIEW',
  CONFIRMED: 'CONFIRMED',
  REJECTED: 'REJECTED',
}

function safeText(value) {
  return String(value || '').trim()
}

function compactText(...values) {
  return values.map(safeText).filter(Boolean).join(' · ')
}

function unique(values) {
  return Array.from(new Set((values || []).map(safeText).filter(Boolean)))
}

function readCandidates() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KNOWLEDGE_CANDIDATE_STORE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeCandidates(candidates) {
  localStorage.setItem(KNOWLEDGE_CANDIDATE_STORE_KEY, JSON.stringify(candidates, null, 2))
  window.dispatchEvent(new CustomEvent('knowledge-candidates-updated', { detail: candidates }))
}

function slugify(value) {
  return safeText(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function candidateIdFrom(title, workspace) {
  return `KC-${slugify(workspace || 'general')}-${slugify(title || 'candidate')}`
}

function normalizeWorkspace(review = {}) {
  const text = compactText(review.workspace, review.channel, review.nextAction, review.result).toLowerCase()
  if (text.includes('zalo') || text.includes('nhắn')) return 'Zalo'
  if (text.includes('hẹn') || text.includes('gặp')) return 'Gặp trực tiếp'
  return 'Điện thoại'
}

function confidenceFrom({ evidence, repeatCount, hasPsychologyReview, hasRules }) {
  const base = 35
  const evidenceScore = Math.min(25, (evidence || []).length * 6)
  const repeatScore = Math.min(25, Math.max(0, repeatCount - 1) * 10)
  const reviewScore = hasPsychologyReview ? 10 : 0
  const ruleScore = hasRules ? 8 : 0
  return Math.min(92, base + evidenceScore + repeatScore + reviewScore + ruleScore)
}

function statusFrom({ currentStatus, repeatCount, confidence }) {
  if ([KNOWLEDGE_CANDIDATE_STATUS.CONFIRMED, KNOWLEDGE_CANDIDATE_STATUS.REJECTED].includes(currentStatus)) {
    return currentStatus
  }
  if (repeatCount >= 3 || confidence >= 70) return KNOWLEDGE_CANDIDATE_STATUS.READY_FOR_REVIEW
  if (repeatCount >= 2) return KNOWLEDGE_CANDIDATE_STATUS.REPEATED
  return KNOWLEDGE_CANDIDATE_STATUS.NEW
}

function buildCandidateSeeds(input = {}) {
  const {
    customer = {},
    review = {},
    psychologyReview = {},
    conversationAnswers = [],
    salesIntelligence = [],
    confirmedPsychologyRules = [],
  } = input
  const seeds = []
  const customerId = customer.id || customer.customerId || ''
  const workspace = normalizeWorkspace(review)
  const baseEvidence = unique([
    review.customerSaid && `Khách nói: ${review.customerSaid}`,
    review.result && `Kết quả cuộc gọi: ${review.result}`,
    review.nextAction && `Next Action: ${review.nextAction}`,
    review.followUpDate && `Follow-up: ${review.followUpDate}`,
    review.diagnosisBarrier && `Barrier: ${review.diagnosisBarrier}`,
    review.diagnosisCustomerStage && `Customer Stage: ${review.diagnosisCustomerStage}`,
    review.diagnosisDecisionMaker && `Decision Maker: ${review.diagnosisDecisionMaker}`,
  ])
  const ruleIds = unique(confirmedPsychologyRules.map((rule) => rule.id))

  if (safeText(psychologyReview.trueHypothesis) || safeText(psychologyReview.lesson)) {
    const title = `Pattern tâm lý: ${safeText(psychologyReview.trueHypothesis) || safeText(psychologyReview.lesson)}`
    seeds.push({
      title,
      observation: safeText(psychologyReview.trueHypothesis) || safeText(psychologyReview.lesson),
      evidence: unique([...baseEvidence, psychologyReview.falseHypothesis && `Giả thuyết sai: ${psychologyReview.falseHypothesis}`, psychologyReview.lesson && `Bài học: ${psychologyReview.lesson}`]),
      workspace,
      customerId,
      psychologyRules: ruleIds,
    })
  }

  if (Array.isArray(conversationAnswers) && conversationAnswers.length) {
    conversationAnswers.forEach((item) => {
      const title = `Câu kiểm chứng: ${item.question}`
      seeds.push({
        title,
        observation: `${item.question} → ${item.answer}`,
        evidence: unique([...baseEvidence, `Athena hỏi: ${item.question}`, `Huy trả lời: ${item.answer}`]),
        workspace,
        customerId,
        psychologyRules: ruleIds,
      })
    })
  }

  if (safeText(review.diagnosisBarrier) || safeText(review.mainConcern) || safeText(review.biggestBarrier)) {
    const barrier = safeText(review.biggestBarrier) || safeText(review.mainConcern) || safeText(review.diagnosisBarrier)
    seeds.push({
      title: `Barrier lặp lại: ${barrier}`,
      observation: `Khách có rào cản/lo ngại: ${barrier}`,
      evidence: unique([...baseEvidence, review.hypothesis && `Giả thuyết: ${review.hypothesis}`]),
      workspace,
      customerId,
      psychologyRules: ruleIds,
    })
  }

  if (Array.isArray(salesIntelligence) && salesIntelligence.length) {
    salesIntelligence.forEach((item) => {
      const title = `Sales DNA hiệu quả: ${item.type}`
      seeds.push({
        title,
        observation: safeText(item.note) || `Advisor đánh dấu ${item.type} hiệu quả trong cuộc gọi.`,
        evidence: unique([...baseEvidence, item.value && `Giá trị: ${item.value}`, item.note && `Lý do hiệu quả: ${item.note}`]),
        workspace,
        customerId,
        psychologyRules: ruleIds,
      })
    })
  }

  return seeds.filter((seed) => safeText(seed.title) && seed.evidence.length)
}

export function loadKnowledgeCandidates() {
  return readCandidates()
}

export function updateKnowledgeCandidateStatus(candidateId, status) {
  const nextCandidates = readCandidates().map((candidate) => (
    candidate.candidateId === candidateId
      ? { ...candidate, status, updatedAt: new Date().toISOString() }
      : candidate
  ))
  writeCandidates(nextCandidates)
  return nextCandidates
}

export function captureKnowledgeCandidates(input = {}) {
  const seeds = buildCandidateSeeds(input)
  if (!seeds.length) return readCandidates()

  const now = new Date().toISOString()
  const currentCandidates = readCandidates()
  const nextCandidates = [...currentCandidates]

  seeds.forEach((seed) => {
    const candidateId = candidateIdFrom(seed.title, seed.workspace)
    const existingIndex = nextCandidates.findIndex((candidate) => candidate.candidateId === candidateId)
    const existing = existingIndex >= 0 ? nextCandidates[existingIndex] : null
    const repeatCount = (existing?.repeatCount || 0) + 1
    const evidence = unique([...(existing?.evidence || []), ...(seed.evidence || [])]).slice(-12)
    const customerIds = unique([...(existing?.customerIds || []), seed.customerId])
    const psychologyRules = unique([...(existing?.psychologyRules || []), ...(seed.psychologyRules || [])])
    const confidence = confidenceFrom({
      evidence,
      repeatCount,
      hasPsychologyReview: Boolean(seed.observation),
      hasRules: psychologyRules.length > 0,
    })
    const status = statusFrom({ currentStatus: existing?.status, repeatCount, confidence })
    const nextCandidate = {
      candidateId,
      title: seed.title,
      observation: seed.observation,
      evidence,
      repeatCount,
      confidence,
      status,
      createdAt: existing?.createdAt || now,
      lastSeen: now,
      workspace: seed.workspace,
      customerIds,
      psychologyRules,
      needHumanReview: status === KNOWLEDGE_CANDIDATE_STATUS.READY_FOR_REVIEW,
    }

    if (existingIndex >= 0) {
      nextCandidates[existingIndex] = nextCandidate
    } else {
      nextCandidates.unshift(nextCandidate)
    }
  })

  writeCandidates(nextCandidates)
  return nextCandidates
}
