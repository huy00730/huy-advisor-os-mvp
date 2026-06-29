import { customerPsychologyKnowledge } from './data/customerPsychologyKnowledge/index.js'

const workspaceKeyMap = {
  phone: 'phone',
  zalo: 'zalo',
  meeting: 'meeting',
  model: 'model',
  project: 'project',
  house: 'showHouse',
  showHouse: 'showHouse',
}

const workspaceLabels = {
  phone: 'điện thoại',
  zalo: 'Zalo',
  meeting: 'gặp trực tiếp',
  model: 'sa bàn',
  project: 'dự án',
  showHouse: 'nhà mẫu',
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase()
}

function toList(value) {
  if (Array.isArray(value)) return value
  if (!value) return []
  return [value]
}

function unique(items) {
  return Array.from(new Set(items.map((item) => String(item || '').trim()).filter(Boolean)))
}

function getMatchedRuleIds(input = {}) {
  return unique([
    ...toList(input.matchedRules).map((rule) => (typeof rule === 'string' ? rule : rule?.id)),
    ...toList(input.psychologyProfile?.matchedRules).map((rule) => (typeof rule === 'string' ? rule : rule?.id)),
    ...toList(input.customer?.psychologyProfile?.matchedRules).map((rule) => (typeof rule === 'string' ? rule : rule?.id)),
  ])
}

function hasMeaningfulWorkspaceAdvice(advice) {
  const normalized = normalizeText(advice)
  if (!normalized) return false
  return !['không áp dụng', 'không áp dụng.', 'n/a', 'na'].includes(normalized)
}

function contextKeywords(input = {}) {
  const diagnosis = input.diagnosis || input.customer?.diagnosis || {}
  const psychologyProfile = input.psychologyProfile || input.customer?.psychologyProfile || {}
  return unique([
    diagnosis.barrier,
    diagnosis.customerStage,
    diagnosis.decisionMaker,
    ...(Array.isArray(diagnosis.interest) ? diagnosis.interest : []),
    input.stage,
    input.customer?.stage,
    input.customer?.journeyStage,
    input.customer?.emotion,
    input.customer?.nextAction,
    psychologyProfile.motivation,
    psychologyProfile.fear,
    psychologyProfile.decisionBarrier,
    psychologyProfile.decisionStyle,
  ]).map(normalizeText).filter(Boolean)
}

function scoreKnowledgeItem(item, input = {}) {
  const workspace = workspaceKeyMap[input.workspace] || workspaceKeyMap[input.selectedWorkspace] || workspaceKeyMap[input.customer?.workspace] || 'phone'
  const workspaceAdvice = item.workspaceMapping?.[workspace] || ''
  const matchedRuleIds = getMatchedRuleIds(input)
  const matchedRules = (item.relatedPsychologyRules || []).filter((ruleId) => matchedRuleIds.includes(ruleId))
  const keywords = contextKeywords(input)
  const searchableText = normalizeText([
    item.title,
    item.summary,
    item.psychologyDomain,
    item.phenomenon,
    item.humanNeed,
    item.humanFear,
    item.motivation,
    item.decisionImpact,
    item.coachGuidance,
    ...(item.tags || []),
  ].join(' '))

  let score = 0
  const reasons = []

  if (hasMeaningfulWorkspaceAdvice(workspaceAdvice)) {
    score += 70
    reasons.push(`Phù hợp với bối cảnh ${workspaceLabels[workspace] || 'hiện tại'}`)
  }

  if (matchedRules.length) {
    score += 55 + matchedRules.length * 12
    reasons.push('Khớp với tín hiệu tâm lý đang ghi nhận')
  }

  const keywordMatches = keywords.filter((keyword) => keyword.length >= 2 && searchableText.includes(keyword))
  if (keywordMatches.length) {
    score += Math.min(42, keywordMatches.length * 14)
    reasons.push(`Khớp ngữ cảnh: ${keywordMatches.slice(0, 3).join(', ')}`)
  }

  if (normalizeText(item.decisionImpact)) {
    score += 18
    reasons.push('Có thể dùng cho bước xử lý tiếp theo')
  }

  return {
    ...item,
    matchScore: score,
    why: reasons.length ? reasons.join(' · ') : 'Phù hợp làm kiến thức nền cho cuộc trao đổi hiện tại.',
    matchedWorkspace: workspace,
    workspaceAdvice,
    matchedRules,
  }
}

export function resolveKnowledge(input = {}) {
  return customerPsychologyKnowledge
    .map((item) => scoreKnowledgeItem(item, input))
    .sort((a, b) => b.matchScore - a.matchScore || a.id.localeCompare(b.id))
    .slice(0, 3)
}

export default resolveKnowledge
