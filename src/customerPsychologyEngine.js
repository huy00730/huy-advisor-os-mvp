import { matchPsychologyRules } from './data/psychologyRegistry/index.js'

function safeText(value) {
  return String(value || '').trim()
}

function hasValue(value) {
  const normalized = safeText(value).toLowerCase()
  return Boolean(normalized) && !['chưa rõ', 'chưa xác nhận', 'chưa xác nhận.', 'chưa chọn ngày', 'chưa ghi nhận.'].includes(normalized)
}

function toList(value) {
  if (Array.isArray(value)) return value.map((item) => safeText(item)).filter(Boolean)
  if (!value) return []
  return safeText(value).split('\n').map((item) => item.trim()).filter(Boolean)
}

function unique(items) {
  return Array.from(new Set(items.map((item) => safeText(item)).filter(Boolean)))
}

function pickFirstMatchedValue(matchedRules, key, fallback) {
  return matchedRules.map((rule) => rule[key]).find((value) => hasValue(value)) || fallback
}

function buildCustomerText(customer, customerMemory, diagnosis, timeline) {
  const timelineText = timeline.map((item) => [
    item?.type,
    item?.eventType,
    item?.title,
    item?.summary,
    item?.confirmed,
    item?.detail,
    item?.nextAction,
    item?.followUp,
    item?.result,
  ].join(' ')).join(' ')

  return [
    customer?.stage,
    customer?.journeyStage,
    customer?.emotion,
    customer?.confirmedNeeds,
    customer?.workingHypotheses,
    customer?.nextAction,
    customer?.action,
    diagnosis?.barrier,
    diagnosis?.customerStage,
    diagnosis?.decisionMaker,
    Array.isArray(diagnosis?.interest) ? diagnosis.interest.join(' ') : '',
    customerMemory?.confirmed?.purchaseGoal,
    customerMemory?.confirmed?.budget,
    customerMemory?.confirmed?.decisionMaker,
    customerMemory?.confirmed?.buyingTimeline,
    customerMemory?.confirmed?.concerns,
    customerMemory?.confirmed?.biggestBarrier,
    customerMemory?.confirmed?.comparingProject,
    customerMemory?.confirmed?.likes,
    ...toList(customerMemory?.people),
    ...toList(customerMemory?.family),
    ...toList(customerMemory?.interests),
    ...toList(customerMemory?.cautions),
    ...toList(customerMemory?.specialNotes),
    customer?.psychologyReview?.trueHypothesis,
    customer?.psychologyReview?.falseHypothesis,
    customer?.psychologyReview?.lesson,
    timelineText,
  ].join(' ').toLowerCase()
}

function buildUnknowns(customer, customerMemory, diagnosis, dealSignals) {
  const unknowns = []
  if (!hasValue(customerMemory?.confirmed?.purchaseGoal) && !hasValue(customer?.confirmedNeeds)) unknowns.push('Mục tiêu mua thật')
  if (!hasValue(customerMemory?.confirmed?.budget) && !dealSignals?.budgetConfirmed) unknowns.push('Ngân sách/vốn thật')
  if (!hasValue(customerMemory?.confirmed?.decisionMaker) && !hasValue(diagnosis?.decisionMaker) && !dealSignals?.decisionMakerConfirmed) unknowns.push('Người quyết định')
  if (!hasValue(customerMemory?.confirmed?.buyingTimeline) && !dealSignals?.timelineConfirmed) unknowns.push('Thời điểm mua')
  if (!hasValue(customerMemory?.confirmed?.biggestBarrier) && !hasValue(diagnosis?.barrier)) unknowns.push('Rào cản lớn nhất')
  return unknowns
}

function buildEvidence(customer, customerMemory, diagnosis, matchedRules, timeline) {
  return unique([
    ...matchedRules.slice(0, 3).map((rule) => `${rule.id} · ${rule.title}${rule.matchedTriggers?.length ? ` · trigger: ${rule.matchedTriggers.join(', ')}` : ''}`),
    diagnosis?.barrier && `Rào cản đang ghi nhận: ${diagnosis.barrier}`,
    diagnosis?.customerStage && `Mức độ quan tâm: ${diagnosis.customerStage}`,
    diagnosis?.decisionMaker && `Người quyết định: ${diagnosis.decisionMaker}`,
    customerMemory?.confirmed?.concerns && `Điều khách lo: ${customerMemory.confirmed.concerns}`,
    customerMemory?.confirmed?.biggestBarrier && `Barrier: ${customerMemory.confirmed.biggestBarrier}`,
    customerMemory?.confirmed?.purchaseGoal && `Mục tiêu mua: ${customerMemory.confirmed.purchaseGoal}`,
    customer?.stage && `Hành trình hiện tại: ${customer.stage}`,
    customer?.trustScore !== undefined && `Mức độ tin tưởng: ${customer.trustScore}`,
    timeline.length > 0 && `Nhật ký có ${timeline.length} tương tác`,
  ]).slice(0, 6)
}

function buildTrustGap(trustScore) {
  if (trustScore < 40) return 'Niềm tin còn thấp: chưa nên chốt, cần xây niềm tin trước.'
  if (trustScore < 70) return 'Niềm tin ở mức trung bình: có thể tư vấn nhưng cần xác nhận lại điều khách còn lăn tăn.'
  return 'Niềm tin khá tốt: có thể đề xuất bước tiếp theo nếu nhu cầu đã rõ.'
}

function buildFallbackQuestions(unknowns) {
  return unique([
    unknowns.includes('Mục tiêu mua thật') && 'Mục tiêu chính của anh/chị là ở, đầu tư hay giữ tài sản an toàn ạ?',
    unknowns.includes('Ngân sách/vốn thật') && 'Mình dự kiến vốn thực bỏ ra khoảng bao nhiêu là thoải mái nhất ạ?',
    unknowns.includes('Người quyết định') && 'Ngoài anh/chị ra, ai cần cùng xem thông tin trước khi mình quyết định ạ?',
    unknowns.includes('Thời điểm mua') && 'Nếu thấy phù hợp, mình muốn ra quyết định trong khoảng thời gian nào ạ?',
    unknowns.includes('Rào cản lớn nhất') && 'Điều gì đang làm anh/chị chưa yên tâm nhất lúc này ạ?',
  ])
}

export function customerPsychologyEngine(customer = {}) {
  const timeline = Array.isArray(customer.timeline) ? customer.timeline : []
  const customerMemory = customer.customerMemory || {}
  const diagnosis = customer.diagnosis || {}
  const dealSignals = customer.dealSignals || {}
  const trustScore = Number(diagnosis.trustScore ?? customer.trustScore ?? 0)
  const customerText = buildCustomerText(customer, customerMemory, diagnosis, timeline)
  const psychologyFocusText = safeText(customer.psychologyFocusText)
  const matchedRules = matchPsychologyRules(psychologyFocusText || customerText, {
    barrier: psychologyFocusText ? '' : diagnosis.barrier || customerMemory?.confirmed?.biggestBarrier || customerMemory?.confirmed?.concerns || '',
    stage: psychologyFocusText ? '' : diagnosis.customerStage || customer.stage || customer.journeyStage || '',
    trustScore,
  }).slice(0, 5)
  const primaryRule = matchedRules[0]
  const unknowns = buildUnknowns(customer, customerMemory, diagnosis, dealSignals)
  const fallbackQuestions = buildFallbackQuestions(unknowns)
  const validationQuestions = unique([
    ...(primaryRule?.validationQuestions || []),
    ...matchedRules.slice(1, 3).flatMap((rule) => rule.validationQuestions || []).slice(0, 2),
    ...fallbackQuestions,
  ]).slice(0, 3)
  const doNotDo = unique([
    ...(primaryRule?.doNotDo || []),
    ...matchedRules.slice(1, 3).flatMap((rule) => rule.doNotDo || []),
    trustScore < 40 && 'Đừng chốt hoặc ép lịch khi niềm tin còn thấp.',
    'Đừng gửi quá nhiều tài liệu khi chưa biết khách cần phần nào.',
  ]).slice(0, 4)
  const recommendedApproach = pickFirstMatchedValue(
    matchedRules,
    'recommendedApproach',
    trustScore < 40 ? 'Đi chậm, hỏi ngắn, xác nhận điều khách còn thiếu niềm tin trước.' : 'Hỏi rõ mục tiêu và rào cản trước khi đề xuất sản phẩm.'
  )
  const evidence = buildEvidence(customer, customerMemory, diagnosis, matchedRules, timeline)
  const knownCount = 5 - unknowns.length
  const ruleConfidence = primaryRule ? Math.min(35, Math.round(primaryRule.matchScore / 3)) : 0
  const confidence = Math.max(20, Math.min(92, Math.round((knownCount / 5) * 45 + (timeline.length ? 10 : 0) + (trustScore > 0 ? 8 : 0) + ruleConfidence)))

  return {
    motivation: pickFirstMatchedValue(matchedRules, 'motivation', 'Chưa đủ dữ liệu để kết luận động cơ chính.'),
    fear: pickFirstMatchedValue(matchedRules, 'fear', hasValue(diagnosis.barrier) ? `Đang có barrier: ${diagnosis.barrier}.` : 'Chưa rõ nỗi lo chính.'),
    behaviorSignals: unique([
      ...matchedRules.map((rule) => rule.behaviorSignal),
      timeline.length > 0 && `Đã có ${timeline.length} tương tác trong nhật ký.`,
    ]).slice(0, 4),
    trustGap: buildTrustGap(trustScore),
    decisionBarrier: pickFirstMatchedValue(matchedRules, 'decisionBarrier', hasValue(diagnosis.barrier) ? diagnosis.barrier : 'Chưa rõ rào cản quyết định.'),
    decisionStyle: pickFirstMatchedValue(matchedRules, 'decisionStyle', 'Chưa rõ phong cách ra quyết định.'),
    confidence,
    evidence: evidence.length ? evidence : ['Chưa có nhiều bằng chứng; cần hỏi thêm trong cuộc gọi tới.'],
    unknowns: unknowns.length ? unknowns : ['Không có thiếu hụt lớn trong dữ liệu nền tảng.'],
    validationQuestions: validationQuestions.length ? validationQuestions : ['Điều gì sẽ giúp anh/chị yên tâm hơn để đi bước tiếp theo ạ?'],
    doNotDo,
    recommendedApproach,
    athenaCoach: `${recommendedApproach} Ưu tiên xác nhận: ${validationQuestions[0] || 'bước tiếp theo cụ thể'}.`,
    matchedRules: matchedRules.map((rule) => ({
      id: rule.id,
      title: rule.title,
      matchScore: rule.matchScore,
      matchedTriggers: rule.matchedTriggers,
      tags: rule.tags,
    })),
  }
}
