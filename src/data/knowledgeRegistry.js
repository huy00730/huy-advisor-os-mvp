export const knowledgeRegistry = [
  {
    id: 'P-0003',
    title: 'Khách đầu tư cần thấy logic rủi ro trước sản phẩm',
    summary: 'Trước khi nói sản phẩm, hãy hỏi mục tiêu nắm giữ, khẩu vị rủi ro và tiêu chí thoát hàng. Khách đầu tư cần khung ra quyết định rõ hơn là nhiều thông tin.',
    tags: ['đầu tư', 'rủi ro', 'thanh khoản'],
    barrier_match: ['Niềm tin', 'Chưa đủ thông tin'],
    journey_match: ['Tò mò', 'Quan tâm', 'So sánh'],
    trust_range: [0, 80],
    priority: 82,
  },
  {
    id: 'P-0005',
    title: 'Khách thiếu niềm tin cần được xác nhận nỗi lo',
    summary: 'Không vội chốt. Hãy hỏi khách đang lo điều gì nhất, cần bằng chứng nào và ai cần cùng xem để yên tâm hơn.',
    tags: ['niềm tin', 'phản đối', 'gia đình'],
    barrier_match: ['Niềm tin', 'Gia đình'],
    journey_match: ['Quan tâm', 'So sánh', 'Chờ'],
    trust_range: [0, 59],
    priority: 90,
  },
  {
    id: 'P-0008',
    title: 'Khi khách nói giá, phải tách giá khỏi tổng chi phí và giá trị',
    summary: 'Không né giá, nhưng cũng không tranh luận. Hỏi khách đang lo tổng tiền, dòng tiền thanh toán hay cảm giác chưa thấy đáng.',
    tags: ['giá', 'tài chính', 'đàm phán'],
    barrier_match: ['Giá', 'Tài chính'],
    journey_match: ['Quan tâm', 'So sánh', 'Chờ'],
    trust_range: [0, 100],
    priority: 96,
  },
  {
    id: 'P-0011',
    title: 'Pháp lý: nói đúng phần đã xác nhận, không nói quá',
    summary: 'Khi khách hỏi pháp lý, chỉ trả lời phần có tài liệu. Nếu chưa chắc, nói cần kiểm tra tài liệu chính thức trước khi xác nhận.',
    tags: ['pháp lý', 'niềm tin', 'an toàn'],
    barrier_match: ['Pháp lý', 'Niềm tin'],
    journey_match: ['Tò mò', 'Quan tâm', 'So sánh'],
    trust_range: [0, 100],
    priority: 94,
  },
  {
    id: 'P-0014',
    title: 'Khách gia đình cần đưa người quyết định vào cuộc sớm',
    summary: 'Nếu vợ/chồng/gia đình ảnh hưởng quyết định, đừng chăm một người quá lâu. Mục tiêu là mời đúng người cùng xem thông tin.',
    tags: ['gia đình', 'người quyết định', 'follow-up'],
    barrier_match: ['Gia đình', 'Niềm tin'],
    journey_match: ['Quan tâm', 'So sánh', 'Chờ'],
    trust_range: [35, 100],
    priority: 88,
  },
]

export const decisionRegistry = [
  {
    id: 'DB-0001',
    title: 'Xác nhận nhu cầu trước khi tư vấn',
    reason: 'Khách chưa đủ dữ liệu nhu cầu hoặc đang ở giai đoạn tò mò.',
    tags: ['nhu cầu', 'mở đầu'],
    barrier_match: ['Chưa thấy nhu cầu', 'Chưa đủ thông tin'],
    decision_maker_match: [],
    journey_match: ['Tò mò', 'Quan tâm'],
    trust_range: [0, 100],
    priority: 76,
  },
  {
    id: 'DB-0004',
    title: 'Đưa người quyết định vào bước tiếp theo',
    reason: 'Decision Maker là vợ/chồng/gia đình/công ty nên cần chốt cách đưa đúng người vào cuộc.',
    tags: ['decision maker', 'gia đình'],
    barrier_match: ['Gia đình', 'Niềm tin'],
    decision_maker_match: ['Vợ', 'Chồng', 'Gia đình', 'Công ty'],
    journey_match: ['Quan tâm', 'So sánh', 'Chờ'],
    trust_range: [0, 100],
    priority: 95,
  },
  {
    id: 'DB-0007',
    title: 'Không chốt khi Trust thấp',
    reason: 'Trust Score thấp, cần xây niềm tin trước khi xin quyết định.',
    tags: ['trust', 'niềm tin'],
    barrier_match: ['Niềm tin', 'Pháp lý', 'Chưa đủ thông tin'],
    decision_maker_match: [],
    journey_match: ['Tò mò', 'Quan tâm', 'So sánh'],
    trust_range: [0, 39],
    priority: 98,
  },
  {
    id: 'DB-0009',
    title: 'Tách phản đối giá thành câu hỏi tài chính',
    reason: 'Barrier là Giá/Tài chính, cần hỏi rõ khách đang vướng tổng giá, dòng tiền hay giá trị cảm nhận.',
    tags: ['giá', 'tài chính'],
    barrier_match: ['Giá', 'Tài chính'],
    decision_maker_match: [],
    journey_match: ['Quan tâm', 'So sánh', 'Chờ'],
    trust_range: [0, 100],
    priority: 93,
  },
]

export const sellingReminderRegistry = [
  {
    id: 'SR-0001',
    text: 'Đừng chốt. Xây niềm tin trước.',
    tags: ['trust thấp', 'niềm tin'],
    barrier_match: ['Niềm tin', 'Pháp lý', 'Chưa đủ thông tin'],
    journey_match: ['Tò mò', 'Quan tâm'],
    trust_range: [0, 39],
    priority: 100,
  },
  {
    id: 'SR-0002',
    text: 'Nếu có vợ/chồng/gia đình ảnh hưởng, hỏi cách đưa người đó cùng xem thông tin.',
    tags: ['decision maker', 'gia đình'],
    barrier_match: ['Gia đình', 'Niềm tin'],
    journey_match: ['Quan tâm', 'So sánh', 'Chờ'],
    trust_range: [0, 100],
    priority: 92,
  },
  {
    id: 'SR-0003',
    text: 'Khách hỏi giá: trả lời thẳng, rồi hỏi đang vướng tổng tiền hay dòng tiền.',
    tags: ['giá'],
    barrier_match: ['Giá', 'Tài chính'],
    journey_match: ['Quan tâm', 'So sánh'],
    trust_range: [0, 100],
    priority: 90,
  },
  {
    id: 'SR-0004',
    text: 'Chỉ gửi đúng tài liệu liên quan đến barrier hiện tại, không đổ thêm thông tin.',
    tags: ['tài liệu', 'follow-up'],
    barrier_match: ['Chưa đủ thông tin', 'Niềm tin', 'Pháp lý'],
    journey_match: ['Quan tâm', 'So sánh', 'Chờ'],
    trust_range: [0, 100],
    priority: 84,
  },
]

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
