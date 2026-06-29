const hasValue = (value) => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim() !== ''
  return true
}

const firstValue = (...values) => {
  const found = values.find(hasValue)
  return found === undefined ? '' : found
}

const toFiniteNumber = (value, fallback) => {
  if (value === null || value === undefined || value === '') return fallback
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

const getTimelineTime = (event = {}) => {
  return event.createdAt || event.updatedAt || event.isoDate || event.date || ''
}

const getLatestTimelineFollowUp = (timeline) => {
  if (!Array.isArray(timeline)) return ''

  const latest = timeline
    .filter((event) => hasValue(event?.followUpDate) || hasValue(event?.followUp))
    .sort((a, b) => String(getTimelineTime(b)).localeCompare(String(getTimelineTime(a))))[0]

  return firstValue(latest?.followUpDate, latest?.followUp)
}

export function getCustomerNextAction(customer = {}) {
  return firstValue(
    customer.nextAction,
    customer.snapshot?.nextAction,
    customer.action,
    'Gọi xác nhận nhu cầu.',
  )
}

export function getCustomerFollowUpDate(customer = {}) {
  return firstValue(
    customer.followUpDate,
    getLatestTimelineFollowUp(customer.timeline),
  )
}

export function getCustomerStage(customer = {}) {
  return firstValue(
    customer.stage,
    customer.journeyStage,
    customer.legacySource?.originalStage,
    'Lead mới',
  )
}

export function getCustomerTrustScore(customer = {}) {
  if (hasValue(customer.trustScore)) return toFiniteNumber(customer.trustScore, 50)
  if (hasValue(customer.diagnosis?.trustScore)) return toFiniteNumber(customer.diagnosis.trustScore, 50)
  return 50
}

export function getCustomerBudget(customer = {}) {
  return firstValue(
    customer.customerMemory?.confirmed?.budget,
    customer.budget,
    customer.snapshot?.budget,
  )
}

export function getCustomerDecisionMaker(customer = {}) {
  return firstValue(
    customer.customerMemory?.confirmed?.decisionMaker,
    customer.decisionMaker,
    customer.snapshot?.decisionMaker,
    customer.diagnosis?.decisionMaker,
  )
}

export function getCustomerConfirmedNeed(customer = {}) {
  return firstValue(
    customer.customerMemory?.confirmed?.purchaseGoal,
    customer.confirmedNeeds,
    customer.snapshot?.confirmedNeed,
  )
}
