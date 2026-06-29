import { decisionRegistryV1 } from './decisionRegistry/index.js'
import { knowledgeRegistryV1 } from './knowledgeRegistry/index.js'
import { sellingKeyRegistryV1 } from './sellingKeyRegistry/index.js'

function toLegacyKnowledge(item) {
  return {
    id: item.id,
    title: item.title,
    summary: item.summary,
    tags: item.tags || [],
    barrier_match: item.matching?.barriers || [],
    journey_match: item.matching?.journeys || [],
    trust_range: item.matching?.trustRange || [0, 100],
    priority: item.priority || 0,
  }
}

function toLegacyDecision(item) {
  return {
    id: item.id,
    title: item.title,
    reason: item.reason,
    tags: item.tags || [],
    barrier_match: item.matching?.barriers || [],
    decision_maker_match: item.matching?.decisionMakers || [],
    journey_match: item.matching?.journeys || [],
    trust_range: item.matching?.trustRange || [0, 100],
    priority: item.priority || 0,
  }
}

function toLegacySellingKey(item) {
  return {
    id: item.id,
    text: item.text,
    tags: item.tags || [],
    barrier_match: item.matching?.barriers || [],
    journey_match: item.matching?.journeys || [],
    trust_range: item.matching?.trustRange || [0, 100],
    priority: item.priority || 0,
  }
}

export const knowledgeRegistry = knowledgeRegistryV1
  .filter((item) => item.status === 'active')
  .map(toLegacyKnowledge)

export const decisionRegistry = decisionRegistryV1
  .filter((item) => item.status === 'active')
  .map(toLegacyDecision)

export const sellingReminderRegistry = sellingKeyRegistryV1
  .filter((item) => item.status === 'active')
  .map(toLegacySellingKey)

function normalizeText(value) {
  return String(value || '').trim().toLowerCase()
}

function rangeMatches(range = [0, 100], score = 0) {
  const numericScore = Number(score)
  if (Number.isNaN(numericScore)) return false
  return numericScore >= range[0] && numericScore <= range[1]
}

function listMatches(list = [], value = '') {
  if (!list.length) return false
  const normalizedValue = normalizeText(value)
  return list.some((item) => normalizeText(item) === normalizedValue)
}

function keywordMatches(tags = [], text = '') {
  const normalizedText = normalizeText(text)
  if (!normalizedText) return false
  return tags.some((tag) => normalizedText.includes(normalizeText(tag)))
}

function scoreKnowledge(item, context) {
  let score = item.priority || 0
  const reasons = []

  if (listMatches(item.barrier_match, context.barrier)) {
    score += 40
    reasons.push(`Barrier = ${context.barrier}`)
  }
  if (listMatches(item.journey_match, context.customerStage)) {
    score += 24
    reasons.push(`Customer Stage = ${context.customerStage}`)
  }
  if (rangeMatches(item.trust_range, context.trustScore)) {
    score += 16
    reasons.push(`Trust Score ${context.trustScore}`)
  }
  if (keywordMatches(item.tags, context.interestText)) {
    score += 18
    reasons.push(`Interest khớp: ${context.interestText}`)
  }

  return { ...item, matchScore: score, why: reasons.length ? reasons.join(' · ') : 'Phù hợp với ngữ cảnh khách hiện tại.' }
}

function scoreDecision(item, context) {
  let score = item.priority || 0
  const reasons = []

  if (listMatches(item.decision_maker_match, context.decisionMaker)) {
    score += 44
    reasons.push(`Decision Maker = ${context.decisionMaker}`)
  }
  if (listMatches(item.barrier_match, context.barrier)) {
    score += 34
    reasons.push(`Barrier = ${context.barrier}`)
  }
  if (listMatches(item.journey_match, context.customerStage)) {
    score += 18
    reasons.push(`Customer Stage = ${context.customerStage}`)
  }
  if (rangeMatches(item.trust_range, context.trustScore)) {
    score += 16
    reasons.push(`Trust Score ${context.trustScore}`)
  }

  return { ...item, matchScore: score, why: reasons.length ? reasons.join(' · ') : item.reason }
}

function scoreReminder(item, context) {
  let score = item.priority || 0
  const reasons = []

  if (listMatches(item.barrier_match, context.barrier)) {
    score += 30
    reasons.push(`Barrier = ${context.barrier}`)
  }
  if (listMatches(item.journey_match, context.customerStage)) {
    score += 16
    reasons.push(`Customer Stage = ${context.customerStage}`)
  }
  if (rangeMatches(item.trust_range, context.trustScore)) {
    score += 20
    reasons.push(`Trust Score ${context.trustScore}`)
  }

  return { ...item, matchScore: score, why: reasons.join(' · ') }
}

export function recommendKnowledgeForCustomer(customer = {}) {
  const diagnosis = customer.diagnosis || {}
  const context = {
    barrier: diagnosis.barrier || '',
    customerStage: diagnosis.customerStage || customer.stage || '',
    decisionMaker: diagnosis.decisionMaker || customer.snapshot?.decisionMaker || '',
    trustScore: Number(diagnosis.trustScore ?? customer.trustScore ?? 0),
    interestText: Array.isArray(diagnosis.interest) ? diagnosis.interest.join(' ') : '',
  }

  const knowledge = knowledgeRegistry
    .map((item) => scoreKnowledge(item, context))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 2)

  const decisions = decisionRegistry
    .map((item) => scoreDecision(item, context))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 2)

  const reminders = sellingReminderRegistry
    .map((item) => scoreReminder(item, context))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)

  return {
    context,
    knowledge,
    decisions,
    reminders,
  }
}
