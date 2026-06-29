import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const today = new Intl.DateTimeFormat('vi-VN', {
  weekday: 'long',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date())

const kpis = [
  { label: 'Calls', sublabel: 'Cuộc gọi cần làm hôm nay', done: 6, target: 15, tone: 'green', priority: true },
  { label: 'Follow-up', sublabel: 'Khách cần chăm lại', done: 4, target: 8, tone: 'green' },
  { label: 'Meeting', sublabel: 'Cuộc hẹn cần chốt', done: 1, target: 3, tone: 'orange' },
  { label: 'Video', sublabel: 'Video cần gửi / nhắc xem', done: 2, target: 5, tone: 'gray' },
]

const priorityCustomers = [
  {
    id: 'minh',
    name: 'Anh Minh · Chủ DN',
    shortName: 'Anh Minh',
    stage: 'Đang cân nhắc',
    emotion: 'Lo rủi ro',
    badge: 'Negotiating',
    action: 'Gọi xác nhận tiêu chí đầu tư',
    cta: '📞 Gọi',
    trustScore: 72,
    callGoal: 'Xác nhận tiêu chí đầu tư, lý do còn lo rủi ro và chốt bước tiếp theo.',
    goldenSentence: 'Dạ em chưa vội tư vấn sản phẩm. Em muốn hiểu đúng tiêu chí đầu tư của anh trước, để nếu có gửi thì gửi đúng thứ anh cần.',
    discoveryQuestions: [
      'Anh đang ưu tiên giữ tài sản an toàn hay kỳ vọng tăng giá mạnh hơn?',
      'Mình dự kiến nắm giữ khoảng bao lâu?',
      'Điều gì làm anh thấy rủi ro nhất ở một khoản đầu tư bất động sản?',
      'Nếu có phương án phù hợp, anh muốn xem con số tổng thể hay đi xem thực tế trước?',
      'Ai sẽ cùng anh cân nhắc trước khi ra quyết định?',
    ],
    coach: {
      focus: 'Đừng bán ngay. Hỏi rõ tiêu chí đầu tư và điều làm anh Minh còn lăn tăn.',
      knowledge: 'Khách đầu tư cần thấy logic rủi ro, dòng tiền và khả năng thoát hàng.',
      decision: 'INVEST-001 · Xác nhận mục tiêu đầu tư trước khi nói sản phẩm.',
      mistake: 'Nói quá nhiều về dự án khi khách đang cần được gỡ rủi ro.',
    },
    snapshot: {
      confirmedNeed: 'Tìm tài sản đầu tư trung hạn, ưu tiên an toàn và có khả năng tăng giá.',
      hypothesis: 'Có thể đang so sánh với kênh gửi tiền hoặc đất nền quen thuộc.',
      decisionMaker: 'Anh Minh quyết định chính, vợ có ảnh hưởng khi xuống tiền.',
      budget: 'Khoảng 2–3 tỷ vốn tự có.',
      nextAction: 'Gọi trước 9:30 để xác nhận tiêu chí đầu tư và xin lịch xem phương án.',
    },
    timeline: [
      { date: '29/06', type: 'Cuộc gọi', confirmed: 'Quan tâm đầu tư nhưng còn lo rủi ro.', next: 'Gọi lại hỏi tiêu chí.' },
      { date: '28/06', type: 'Zalo', confirmed: 'Đã xem thông tin tổng quan.', next: 'Hỏi phản hồi.' },
      { date: '27/06', type: 'Cuộc gọi', confirmed: 'Có ngân sách và muốn giữ tài sản.', next: 'Gửi tài liệu ngắn.' },
      { date: '25/06', type: 'Lead', confirmed: 'Nguồn data cũ cần reconnect.', next: 'Mở lại hội thoại.' },
      { date: '24/06', type: 'Ghi chú', confirmed: 'Không thích bị ép quyết định.', next: 'Đi chậm, hỏi chắc.' },
    ],
  },
  {
    id: 'lan',
    name: 'Chị Lan · Gia đình',
    shortName: 'Chị Lan',
    stage: 'Đã xem tài liệu',
    emotion: 'Cần niềm tin',
    badge: 'Interested',
    action: 'Follow-up phản hồi sau Zalo',
    cta: '➡ Chi tiết',
    trustScore: 64,
    callGoal: 'Lấy phản hồi sau khi xem tài liệu và xác định điều gia đình còn cần rõ.',
    goldenSentence: 'Dạ em gọi ngắn thôi, chủ yếu để hỏi xem phần nào chị còn cần rõ hơn, chứ em không gửi thêm nhiều tài liệu làm chị rối.',
    discoveryQuestions: [
      'Sau khi xem tài liệu, điểm nào làm chị quan tâm nhất?',
      'Gia đình mình ưu tiên môi trường sống, vị trí hay tiện ích hơn?',
      'Mình mua để ở sớm hay chuẩn bị cho vài năm tới?',
      'Ngoài chị ra, ai cần cùng xem thông tin trước khi quyết định?',
      'Em nên gửi thêm phần nào cho đúng nhu cầu của gia đình mình?',
    ],
    coach: {
      focus: 'Tạo niềm tin trước. Không gửi thêm file nếu chưa biết chị Lan còn vướng gì.',
      knowledge: 'Khách mua cho gia đình thường cần sự an tâm hơn là thật nhiều thông tin.',
      decision: 'FAMILY-002 · Hỏi điều kiện sống và người cùng ra quyết định.',
      mistake: 'Đẩy sản phẩm quá sớm khi khách còn đang cần cảm giác chắc chắn.',
    },
    snapshot: {
      confirmedNeed: 'Quan tâm sản phẩm phù hợp gia đình, cần môi trường sống tốt.',
      hypothesis: 'Có thể cần chồng hoặc người thân cùng xem lại trước khi quyết định.',
      decisionMaker: 'Hai vợ chồng cùng quyết định.',
      budget: 'Chưa xác nhận.',
      nextAction: 'Nhắn 1 câu hỏi mở để lấy phản hồi sau khi đã xem tài liệu.',
    },
    timeline: [
      { date: '29/06', type: 'Zalo', confirmed: 'Đã xem tài liệu nhưng chưa phản hồi.', next: 'Nhắn hỏi điều chị cần rõ.' },
      { date: '28/06', type: 'Gửi tài liệu', confirmed: 'Nhận thông tin tổng quan.', next: 'Chờ phản hồi.' },
      { date: '27/06', type: 'Cuộc gọi', confirmed: 'Quan tâm môi trường sống cho gia đình.', next: 'Gửi gói phù hợp.' },
      { date: '26/06', type: 'Lead', confirmed: 'Muốn tìm hiểu trước.', next: 'Xin Zalo.' },
      { date: '25/06', type: 'Ghi chú', confirmed: 'Không thích nhận quá nhiều file.', next: 'Gửi ngắn.' },
    ],
  },
  {
    id: 'quan',
    name: 'Anh Quân · Data cũ',
    shortName: 'Anh Quân',
    stage: 'Reconnect',
    emotion: 'Thờ ơ',
    badge: 'Silent',
    action: 'Nhắn mở lại cuộc trò chuyện',
    cta: '➡ Chi tiết',
    trustScore: 41,
    callGoal: 'Mở lại cuộc trò chuyện, xác nhận còn nhu cầu hay không và xin quyền gửi thông tin ngắn.',
    goldenSentence: 'Dạ em gọi lại vì trước đây anh có từng quan tâm, em hỏi nhanh xem nhu cầu hiện tại của mình còn không để em khỏi làm phiền sai lúc.',
    discoveryQuestions: [
      'Hiện tại mình còn quan tâm bất động sản nữa không anh?',
      'Nếu còn xem, mình ưu tiên đầu tư, ở hay giữ tài sản?',
      'Điều gì khiến anh chưa muốn trao đổi sâu ở thời điểm trước?',
      'Em gửi một tin ngắn qua Zalo để anh xem lúc rảnh được không?',
      'Nếu phù hợp, em nên gọi lại anh vào khung giờ nào?',
    ],
    coach: {
      focus: 'Mở lại cuộc trò chuyện nhẹ. Mục tiêu là xin phản hồi, chưa tư vấn sâu.',
      knowledge: 'Data cũ cần lý do quay lại cuộc trò chuyện, không nên vào thẳng sản phẩm.',
      decision: 'RECONNECT-001 · Gợi lại ngữ cảnh cũ và hỏi quyền gửi thông tin mới.',
      mistake: 'Nhắn dài hoặc gửi tài liệu ngay khi khách còn im lặng.',
    },
    snapshot: {
      confirmedNeed: 'Chưa xác nhận lại nhu cầu hiện tại.',
      hypothesis: 'Có thể đã nguội hoặc đang bận, cần một lý do ngắn để reconnect.',
      decisionMaker: 'Chưa rõ.',
      budget: 'Chưa xác nhận.',
      nextAction: 'Nhắn mở lại bằng câu ngắn, nếu phản hồi thì xin phép gửi thông tin phù hợp.',
    },
    timeline: [
      { date: '29/06', type: 'Zalo', confirmed: 'Chưa phản hồi tin nhắn mới.', next: 'Chờ và thử khung giờ khác.' },
      { date: '20/06', type: 'Cuộc gọi', confirmed: 'Nghe máy ngắn, nói đang bận.', next: 'Gửi Zalo nhẹ.' },
      { date: '12/06', type: 'Ghi chú', confirmed: 'Từng hỏi thông tin đầu tư.', next: 'Reconnect.' },
      { date: '05/06', type: 'Lead', confirmed: 'Data cũ từ chiến dịch trước.', next: 'Làm ấm lại.' },
      { date: '01/06', type: 'Zalo', confirmed: 'Đã nhận thông tin cũ.', next: 'Không spam.' },
    ],
  },
]

const checklist = [
  { id: 'call-minh', text: 'Gọi Anh Minh trước 9:30 để giữ nhịp quyết định.' },
  { id: 'follow-lan', text: 'Follow-up Chị Lan bằng 1 câu hỏi mở, không gửi thêm file.' },
  { id: 'send-quan', text: 'Gửi tài liệu ngắn cho Anh Quân nếu khách đồng ý nhận Zalo.' },
]

const followUpGroups = [
  {
    title: '🔴 Quá hạn',
    tone: 'overdue',
    items: [
      {
        customerId: 'minh',
        name: 'Anh Minh',
        stage: 'Đang cân nhắc',
        reason: 'Quá hạn 2 ngày sau khi khách nói còn lo rủi ro đầu tư.',
        coach: 'Không bán thêm. Hỏi điều gì còn chưa chắc để kéo khách về bước quyết định.',
        knowledge: 'P-0003 · Logic rủi ro và thanh khoản.',
        decision: 'DB-001 · Xác nhận mục tiêu đầu tư.',
        nextAction: '📞 Gọi ngay trước 9:30',
      },
      {
        customerId: 'quan',
        name: 'Anh Quân',
        stage: 'Reconnect',
        reason: 'Data cũ đã im lặng sau tin Zalo.',
        coach: 'Mở nhẹ, xin quyền hỏi nhanh. Không gửi thêm file khi khách chưa phản hồi.',
        knowledge: 'P-0006 · Reconnect data cũ.',
        decision: 'DB-003 · Khách im lặng.',
        nextAction: '📞 Gọi mở lại cuộc trò chuyện',
      },
    ],
  },
  {
    title: '🟡 Hôm nay',
    tone: 'today',
    items: [
      {
        customerId: 'lan',
        name: 'Chị Lan',
        stage: 'Đã xem tài liệu',
        reason: 'Đã xem tài liệu nhưng chưa phản hồi.',
        coach: 'Chỉ hỏi 1 câu mở. Mục tiêu là biết chị còn vướng gì.',
        knowledge: 'P-0005 · Khách gia đình cần niềm tin.',
        decision: 'DB-002 · Follow-up sau Zalo.',
        nextAction: '📞 Gọi lấy phản hồi',
      },
      {
        customerId: 'minh',
        name: 'Anh Minh',
        stage: 'Đang cân nhắc',
        reason: 'Cần xác nhận ngân sách và timeline trước khi gửi phương án.',
        coach: 'Đi thẳng vào tiêu chí. Không mở thêm chủ đề mới.',
        knowledge: 'P-0003 · Đầu tư trung hạn.',
        decision: 'DB-001 · Hỏi tiêu chí.',
        nextAction: '📞 Gọi xác nhận tiêu chí',
      },
    ],
  },
  {
    title: '🟢 Ngày mai',
    tone: 'tomorrow',
    items: [
      {
        customerId: 'lan',
        name: 'Chị Lan',
        stage: 'Đã xem tài liệu',
        reason: 'Nếu hôm nay chưa nghe máy, gọi lại khung giờ sáng mai.',
        coach: 'Nhắc ngữ cảnh ngắn. Không hỏi dồn.',
        knowledge: 'P-0005 · Gia đình mua ở.',
        decision: 'DB-002 · Hỏi người cùng quyết định.',
        nextAction: '📞 Gọi lại sáng mai',
      },
    ],
  },
]

const quickReviewOptions = {
  knowledge: ['P-0003', 'P-0005', 'P-0006'],
  decision: ['DB-001', 'DB-002', 'DB-003'],
  result: ['Đã trao đổi', 'Không nghe máy', 'Hẹn gặp', 'Gửi Zalo', 'Không phù hợp'],
  nextAction: ['📞 Gọi lại', '💬 Gửi Zalo', '📅 Đặt hẹn', '📄 Gửi tài liệu', '⏳ Chờ khách'],
  followUp: [
    { label: 'Mai', date: '2026-06-30' },
    { label: '3 ngày', date: '2026-07-02' },
    { label: '7 ngày', date: '2026-07-06' },
  ],
}

const knowledgeCore = [
  {
    id: 'P-0001',
    title: 'Xác định nhu cầu thật trước khi tư vấn',
    category: 'Discovery',
    keywords: ['nhu cầu', 'mua ở', 'đầu tư', 'hỏi nhu cầu'],
    summary: 'Không tư vấn sản phẩm ngay. Trước tiên phải biết khách mua để ở, đầu tư, nghỉ dưỡng hay giữ tài sản.',
    goldenSentence: 'Dạ em muốn hiểu đúng mục tiêu của anh/chị trước, để khỏi gửi thông tin không cần thiết.',
    checklist: ['Hỏi mục tiêu mua', 'Hỏi thời gian dự kiến', 'Hỏi người cùng quyết định'],
    discoveryQuestions: ['Mình mua để ở hay đầu tư là chính ạ?', 'Nếu đầu tư, mình ưu tiên tăng giá hay dòng tiền?', 'Ai sẽ cùng mình cân nhắc trước khi quyết định?'],
    counterExamples: ['Gửi bảng giá ngay khi chưa biết nhu cầu', 'Nói quá nhiều tiện ích khi khách đang hỏi mục tiêu đầu tư'],
    relatedDecision: 'DB-001',
    relatedKnowledge: ['P-0003', 'P-0005'],
  },
  {
    id: 'P-0002',
    title: 'Khách bận: xin quyền follow-up',
    category: 'Call Handling',
    keywords: ['bận', 'đang họp', 'gọi lại', 'không tiện'],
    summary: 'Khi khách bận, không khai thác nhu cầu. Mục tiêu duy nhất là xin khung giờ gọi lại.',
    goldenSentence: 'Dạ em hiểu anh/chị đang bận. Chiều nay hay sáng mai em gọi lại thì tiện hơn ạ?',
    checklist: ['Không hỏi sâu', 'Xin giờ gọi lại', 'Ghi follow-up date'],
    discoveryQuestions: ['Anh/chị tiện em gọi lại lúc nào?', 'Em gửi trước một tin ngắn qua Zalo được không?', 'Chiều nay hay sáng mai tiện hơn ạ?'],
    counterExamples: ['Khách nói bận nhưng vẫn hỏi mua ở hay đầu tư', 'Cố tư vấn dự án khi khách không có thời gian'],
    relatedDecision: 'DB-004',
    relatedKnowledge: ['P-0006'],
  },
  {
    id: 'P-0003',
    title: 'Đầu tư: hỏi tiêu chí trước khi nói sản phẩm',
    category: 'Investment',
    keywords: ['đầu tư', 'thanh khoản', 'dòng tiền', 'tăng giá', 'giữ tài sản'],
    summary: 'Khách đầu tư cần logic rủi ro, thời gian nắm giữ và tiêu chí thoát hàng trước khi nghe sản phẩm.',
    goldenSentence: 'Dạ với đầu tư, em hỏi trước tiêu chí của anh để xem phương án có đáng xem hay không.',
    checklist: ['Hỏi vốn thực bỏ ra', 'Hỏi thời gian nắm giữ', 'Hỏi tiêu chí lợi nhuận/rủi ro'],
    discoveryQuestions: ['Mình dự kiến nắm giữ bao lâu?', 'Mình ưu tiên tăng giá hay an toàn tài sản?', 'Điều gì làm anh thấy rủi ro nhất?'],
    counterExamples: ['Cam kết lợi nhuận', 'Nói sản phẩm tốt mà không hỏi tiêu chí'],
    relatedDecision: 'DB-001',
    relatedKnowledge: ['P-0001', 'P-0005'],
  },
  {
    id: 'P-0004',
    title: 'Pháp lý: nói thận trọng, không bịa',
    category: 'Legal',
    keywords: ['pháp lý', 'sổ', 'hợp đồng', 'hđmb', 'giấy tờ'],
    summary: 'Khi khách hỏi pháp lý, chỉ nói phần đã xác nhận. Nếu chưa chắc, hẹn kiểm tra tài liệu chính thức.',
    goldenSentence: 'Phần pháp lý em sẽ nói đúng theo tài liệu chính thức, chỗ nào chưa chắc em kiểm tra lại rồi gửi anh/chị.',
    checklist: ['Không suy đoán', 'Không cam kết miệng', 'Hẹn gửi tài liệu chính thức'],
    discoveryQuestions: ['Anh/chị đang muốn kiểm tra phần nào nhất?', 'Mình cần xem giấy tờ trước hay hợp đồng mẫu trước?', 'Em gửi tài liệu chính thức qua Zalo được không?'],
    counterExamples: ['Nói chắc có sổ khi chưa có nguồn', 'Tự diễn giải điều khoản pháp lý'],
    relatedDecision: 'DB-005',
    relatedKnowledge: ['P-0007'],
  },
  {
    id: 'P-0005',
    title: 'Giá cao: hỏi chuẩn so sánh',
    category: 'Price Objection',
    keywords: ['giá cao', 'đắt', 'mắc', 'chiết khấu', 'ưu đãi', 'giá'],
    summary: 'Khách nói giá cao thường đang so sánh hoặc chưa thấy đủ giá trị. Không tranh luận giá, hãy hỏi chuẩn so sánh.',
    goldenSentence: 'Dạ em hiểu. Anh/chị đang thấy cao so với ngân sách mình dự tính hay so với dự án khác ạ?',
    checklist: ['Mirror lại ý khách', 'Hỏi khách đang so với gì', 'Không giảm giá miệng', 'Chuyển sang tổng chi phí hoặc giá trị'],
    discoveryQuestions: ['Anh/chị đang so với ngân sách hay dự án khác?', 'Điều gì khiến mình thấy mức này chưa hợp lý?', 'Nếu tổng phương án rõ hơn thì mình có muốn xem tiếp không?'],
    counterExamples: ['Cãi khách rằng giá không cao', 'Hứa chiết khấu khi chưa có chính sách', 'Gửi thêm quá nhiều tài liệu để thuyết phục'],
    relatedDecision: 'DB-002',
    relatedKnowledge: ['P-0003', 'P-0007'],
  },
  {
    id: 'P-0006',
    title: 'Reconnect data cũ',
    category: 'Reconnect',
    keywords: ['data cũ', 'im lặng', 'không phản hồi', 'seen', 'đã xem'],
    summary: 'Data cũ cần mở lại nhẹ, có lý do rõ, không gửi tài liệu dài khi khách chưa phản hồi.',
    goldenSentence: 'Dạ em gọi lại vì trước đây anh/chị có quan tâm, em hỏi nhanh xem hiện tại mình còn nhu cầu không để em khỏi làm phiền sai lúc.',
    checklist: ['Nhắc ngữ cảnh cũ', 'Hỏi còn nhu cầu không', 'Xin quyền gửi tin ngắn'],
    discoveryQuestions: ['Hiện tại mình còn quan tâm nữa không ạ?', 'Nếu còn xem, mình ưu tiên mục tiêu nào?', 'Em gửi một tin ngắn qua Zalo được không?'],
    counterExamples: ['Nhắn dài', 'Gửi bảng giá ngay', 'Gọi dồn nhiều lần'],
    relatedDecision: 'DB-003',
    relatedKnowledge: ['P-0002'],
  },
  {
    id: 'P-0007',
    title: 'Không cam kết quá đà',
    category: 'Advisor Safety',
    keywords: ['cam kết', 'lợi nhuận', 'pháp lý', 'an toàn', 'rủi ro'],
    summary: 'Advisor phải nói đúng dữ liệu xác nhận, không cam kết lợi nhuận, pháp lý hoặc tiến độ nếu chưa có nguồn chính thức.',
    goldenSentence: 'Em sẽ nói phần đã xác nhận; phần nào cần kiểm tra tài liệu chính thức em sẽ gửi lại sau.',
    checklist: ['Không cam kết lợi nhuận', 'Không hứa chính sách ngoài tài liệu', 'Không tư vấn pháp lý khi chưa có nguồn'],
    discoveryQuestions: ['Anh/chị muốn em kiểm tra phần nào kỹ nhất?', 'Mình cần tài liệu chính thức nào trước?', 'Em gửi lại sau khi đối chiếu được không?'],
    counterExamples: ['Hứa chắc tăng giá', 'Nói pháp lý chắc chắn khi chưa kiểm tra', 'Ép khách xuống tiền bằng thông tin chưa xác nhận'],
    relatedDecision: 'DB-005',
    relatedKnowledge: ['P-0004', 'P-0005'],
  },
]

const CUSTOMER_STORE_KEY = 'huy-advisor-os-customers-v1'
const INBOX_COMPLETED_KEY = 'huy-advisor-os-inbox-completed-v1'
const REACTIVATION_KEY = 'huy-advisor-os-reactivation-v1'
const BACKUP_VERSION = 'huy-advisor-os-go-live-v1'
const MIGRATION_BACKUP_KEY = 'huy-advisor-os-last-migration-backup-key'
const COASTAL_200_BACKUP_ID = 'b037bb6a-ac45-45c1-9f32-ec02158e5a91'
const COASTAL_200_BACKUP_URL = `https://huy-sales-os.pages.dev/api/backup?id=${COASTAL_200_BACKUP_ID}`

const todayIso = '2026-06-29'
const reactivationBatchSize = 10

const extraCustomers = [
  { id: 'hoa', name: 'Chị Hoa · Referral', shortName: 'Chị Hoa', stage: 'Đã kết nối Zalo', emotion: 'Quan tâm', badge: 'Interested', action: 'Gửi tài liệu phù hợp', trustScore: 68, phone: '0901000004', followUpDate: '2026-06-29' },
  { id: 'nam', name: 'Anh Nam · Marketing', shortName: 'Anh Nam', stage: 'Lead mới', emotion: 'Tò mò', badge: 'Interested', action: 'Gọi lần đầu', trustScore: 52, phone: '0901000005', followUpDate: '2026-06-30' },
  { id: 'thao', name: 'Chị Thảo · Gia đình', shortName: 'Chị Thảo', stage: 'Đang follow-up', emotion: 'Cân nhắc', badge: 'Negotiating', action: 'Hỏi người quyết định', trustScore: 61, phone: '0901000006', followUpDate: '2026-06-28' },
  { id: 'phuc', name: 'Anh Phúc · Chủ DN', shortName: 'Anh Phúc', stage: 'Có hẹn', emotion: 'Tin tưởng', badge: 'Interested', action: 'Xác nhận lịch hẹn', trustScore: 78, phone: '0901000007', followUpDate: '2026-06-29' },
  { id: 'mai', name: 'Chị Mai · Data cũ', shortName: 'Chị Mai', stage: 'Reconnect', emotion: 'Im lặng', badge: 'Silent', action: 'Gọi reconnect', trustScore: 39, phone: '0901000008', followUpDate: '2026-06-30' },
  { id: 'khanh', name: 'Anh Khánh · Đầu tư', shortName: 'Anh Khánh', stage: 'Đàm phán', emotion: 'So sánh', badge: 'Negotiating', action: 'Hỏi tiêu chí so sánh', trustScore: 74, phone: '0901000009', followUpDate: '2026-06-27' },
  { id: 'vy', name: 'Chị Vy · Event', shortName: 'Chị Vy', stage: 'Đã xem tài liệu', emotion: 'Cần thêm niềm tin', badge: 'Interested', action: 'Follow-up sau event', trustScore: 58, phone: '0901000010', followUpDate: '2026-06-29' },
]

function normalizeCustomer(customer, index = 0) {
  const now = new Date().toISOString()
  const shortName = customer.shortName || customer.name?.split('·')[0]?.trim() || `Khách ${index + 1}`
  const snapshot = {
    confirmedNeed: customer.snapshot?.confirmedNeed || customer.confirmedNeeds || 'Chưa xác nhận.',
    hypothesis: customer.snapshot?.hypothesis || customer.workingHypotheses || 'Chưa xác nhận.',
    decisionMaker: customer.snapshot?.decisionMaker || customer.decisionMaker || 'Chưa rõ.',
    budget: customer.snapshot?.budget || customer.budget || 'Chưa xác nhận.',
    nextAction: customer.snapshot?.nextAction || customer.nextAction || customer.action || 'Gọi xác nhận nhu cầu.',
  }

  return {
    ...customer,
    id: customer.id || `customer-${index + 1}`,
    customerId: customer.customerId || customer.id || `customer-${index + 1}`,
    shortName,
    phone: customer.phone || `09010000${String(index + 1).padStart(2, '0')}`,
    zalo: customer.zalo || customer.phone || '',
    email: customer.email || '',
    stage: customer.stage || 'Lead mới',
    emotion: customer.emotion || 'Chưa rõ',
    badge: customer.badge || 'Interested',
    trustScore: customer.trustScore ?? 50,
    confirmedNeeds: snapshot.confirmedNeed,
    workingHypotheses: snapshot.hypothesis,
    nextAction: snapshot.nextAction,
    followUpDate: customer.followUpDate || todayIso,
    createdDate: customer.createdDate || now,
    updatedDate: customer.updatedDate || now,
    cta: customer.cta || '📞 Gọi',
    action: customer.action || snapshot.nextAction,
    callGoal: customer.callGoal || 'Xác nhận nhu cầu, cập nhật thông tin và chốt bước tiếp theo.',
    goldenSentence: customer.goldenSentence || 'Dạ em gọi ngắn thôi, mục tiêu là hiểu đúng nhu cầu của anh/chị để khỏi tư vấn sai.',
    discoveryQuestions: customer.discoveryQuestions || [
      'Hiện tại anh/chị đang quan tâm mục tiêu nào nhất?',
      'Điều gì làm anh/chị còn phân vân?',
      'Nếu phù hợp, bước tiếp theo mình muốn là gì?',
      'Ai sẽ cùng mình quyết định?',
      'Em nên follow-up vào thời điểm nào là tiện nhất?',
    ],
    coach: customer.coach || {
      focus: 'Xác nhận nhu cầu trước khi tư vấn.',
      knowledge: 'Khách cần đúng thông tin, không cần nhiều thông tin.',
      decision: 'DB-001 · Hỏi rõ mục tiêu trước khi tư vấn.',
      mistake: 'Nói quá nhiều khi chưa hiểu khách.',
    },
    snapshot,
    timeline: Array.isArray(customer.timeline) ? customer.timeline : [],
  }
}

function buildSeedCustomers() {
  return [...priorityCustomers, ...extraCustomers].map(normalizeCustomer)
}

function loadCustomers() {
  try {
    const raw = localStorage.getItem(CUSTOMER_STORE_KEY)
    if (!raw) {
      const seeded = buildSeedCustomers()
      localStorage.setItem(CUSTOMER_STORE_KEY, JSON.stringify(seeded))
      return seeded
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return buildSeedCustomers()
    return parsed.map(normalizeCustomer)
  } catch {
    return buildSeedCustomers()
  }
}

function saveCustomers(customers) {
  localStorage.setItem(CUSTOMER_STORE_KEY, JSON.stringify(customers))
}

function buildLocalStorageSnapshot() {
  const snapshot = {}
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)
    if (key?.startsWith('huy-advisor-os-')) snapshot[key] = localStorage.getItem(key)
  }
  return snapshot
}

function downloadJsonFile(fileName, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function buildBackupPayload(customers, completedInboxItems = []) {
  return {
    app: 'HUY_ADVISOR_OS',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    customerCount: customers.length,
    customers,
    inboxCompleted: completedInboxItems,
    localStorage: buildLocalStorageSnapshot(),
  }
}

function exportLocalBackup(customers, completedInboxItems, label = 'backup') {
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
  downloadJsonFile(`huy-advisor-os-${label}-${stamp}.json`, buildBackupPayload(customers, completedInboxItems))
}

function pickValue(source, keys, fallback = '') {
  const foundKey = keys.find((key) => source?.[key] !== undefined && source?.[key] !== null && String(source[key]).trim() !== '')
  return foundKey ? String(source[foundKey]).trim() : fallback
}

function normalizeImportedCustomer(rawCustomer, index = 0) {
  const name = pickValue(rawCustomer, ['name', 'shortName', 'hoTen', 'tenKhach', 'Họ tên', 'Tên khách', 'Khách hàng'], `Khách nhập ${index + 1}`)
  const phone = pickValue(rawCustomer, ['phone', 'dienThoai', 'sdt', 'SĐT', 'Số điện thoại', 'Điện thoại'])
  const nextAction = pickValue(rawCustomer, ['nextAction', 'action', 'Việc cần làm', 'Next Action'], 'Gọi xác nhận nhu cầu')
  const confirmedNeeds = pickValue(rawCustomer, ['confirmedNeeds', 'need', 'Nhu cầu', 'Nhu cầu đã xác nhận'], 'Chưa xác nhận.')
  const workingHypotheses = pickValue(rawCustomer, ['workingHypotheses', 'hypothesis', 'Giả thuyết', 'Giả thuyết chưa xác nhận'], 'Chưa xác nhận.')

  return normalizeCustomer({
    ...rawCustomer,
    id: rawCustomer.id || rawCustomer.customerId || `imported-${Date.now()}-${index}`,
    customerId: rawCustomer.customerId || rawCustomer.id || `imported-${Date.now()}-${index}`,
    name,
    shortName: rawCustomer.shortName || name,
    phone,
    zalo: pickValue(rawCustomer, ['zalo', 'Zalo'], phone),
    email: pickValue(rawCustomer, ['email', 'Email']),
    stage: pickValue(rawCustomer, ['stage', 'journeyStage', 'Journey Stage', 'Giai đoạn'], 'Lead mới'),
    emotion: pickValue(rawCustomer, ['emotion', 'Emotion', 'Cảm xúc'], 'Chưa rõ'),
    trustScore: Number(rawCustomer.trustScore ?? rawCustomer['Trust Score'] ?? 50),
    confirmedNeeds,
    workingHypotheses,
    nextAction,
    action: nextAction,
    followUpDate: pickValue(rawCustomer, ['followUpDate', 'Follow-up Date', 'Ngày follow-up'], todayIso),
    snapshot: {
      confirmedNeed: rawCustomer.snapshot?.confirmedNeed || confirmedNeeds,
      hypothesis: rawCustomer.snapshot?.hypothesis || workingHypotheses,
      decisionMaker: rawCustomer.snapshot?.decisionMaker || pickValue(rawCustomer, ['decisionMaker', 'Người quyết định'], 'Chưa rõ.'),
      budget: rawCustomer.snapshot?.budget || pickValue(rawCustomer, ['budget', 'Ngân sách'], 'Chưa xác nhận.'),
      nextAction,
    },
    timeline: Array.isArray(rawCustomer.timeline) ? rawCustomer.timeline : [],
  }, index)
}

function extractCustomersFromImport(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.customers)) return payload.customers
  if (Array.isArray(payload?.data?.customers)) return payload.data.customers
  return []
}

function textValue(value, fallback = '') {
  if (value === undefined || value === null) return fallback
  const normalized = String(value).trim()
  return normalized || fallback
}

function scoreValue(value, fallback = 50) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(0, Math.min(100, Math.round(parsed)))
}

function dateValue(value) {
  if (!value) return todayIso
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return todayIso
  return parsed.toISOString().slice(0, 10)
}

function legacyStage(customer) {
  const raw = textValue(customer.salesJourneyStage || customer.status, 'Lead mới')
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

function legacyEmotion(customer) {
  const source = [
    customer.emotion,
    customer.mainConcern,
    customer.bottleneckReason,
    customer.status,
    customer.note,
  ].map((item) => textValue(item).toLowerCase()).join(' ')

  if (source.includes('im lặng') || source.includes('không nghe')) return 'Im lặng'
  if (source.includes('so sánh') || source.includes('đối thủ')) return 'So sánh'
  if (source.includes('rủi ro') || source.includes('thanh khoản')) return 'Lo rủi ro'
  if (source.includes('niềm tin') || source.includes('pháp lý')) return 'Cần niềm tin'
  if (source.includes('cân nhắc') || source.includes('suy nghĩ')) return 'Cân nhắc'
  if (source.includes('tin tưởng') || source.includes('hẹn')) return 'Tin tưởng'
  if (source.includes('quan tâm')) return 'Quan tâm'
  return 'Chưa rõ'
}

function legacyTimeline(logs = []) {
  if (!Array.isArray(logs)) return []
  return logs.slice(0, 20).map((log, index) => {
    const isoDate = dateValue(log.date || log.createdAt || log.nextFollowUp)
    return {
      id: log.id || `legacy-log-${index}`,
      isoDate,
      date: isoDate.slice(5).split('-').reverse().join('/'),
      type: textValue(log.activityType || log.channel || log.type, 'Note'),
      confirmed: textValue(log.content || log.note || log.question || log.answer, 'Log từ CRM cũ.'),
      next: textValue(log.nextFollowUp ? `Follow-up ${dateValue(log.nextFollowUp)}` : log.result, 'Chưa rõ bước tiếp theo.'),
    }
  })
}

function mapLegacyCoastalCustomer(customer, index) {
  const name = textValue(customer.name, `Khách CRM cũ ${index + 1}`)
  const phone = textValue(customer.phone)
  const stage = legacyStage(customer)
  const emotion = legacyEmotion(customer)
  const nextAction = textValue(
    customer.nextBestAction || customer.nextAction || customer.objectiveToday || customer.conversationHint,
    'Gọi xác nhận nhu cầu.'
  )
  const confirmedNeed = textValue(
    customer.primaryNeed && customer.primaryNeed !== 'Chưa rõ' ? customer.primaryNeed : customer.need,
    'Chưa xác nhận.'
  )
  const hypothesis = textValue(
    customer.fieldCaseLog || customer.note || customer.mainConcern || customer.bottleneckReason,
    'Chưa xác nhận.'
  )

  return normalizeCustomer({
    id: textValue(customer.id, `legacy-${index + 1}`),
    customerId: textValue(customer.customerId || customer.id, `legacy-${index + 1}`),
    name,
    shortName: textValue(customer.shortName, name),
    phone,
    zalo: textValue(customer.zalo || customer.zaloPhone, phone),
    email: textValue(customer.email),
    stage,
    emotion,
    badge: `${emotion} ${stage}`.toLowerCase().includes('đàm phán') ? 'Negotiating' : `${emotion} ${stage}`.toLowerCase().includes('im lặng') ? 'Silent' : 'Interested',
    trustScore: scoreValue(customer.trustScore ?? customer.relationshipScore ?? customer.leadScore, 50),
    confirmedNeeds: confirmedNeed,
    workingHypotheses: hypothesis,
    nextAction,
    action: nextAction,
    followUpDate: dateValue(customer.nextFollowUp || customer.followUpDate),
    createdDate: customer.createdAt || new Date().toISOString(),
    updatedDate: customer.updatedAt || new Date().toISOString(),
    cta: '📞 Gọi',
    callGoal: textValue(customer.objectiveToday, 'Xác nhận nhu cầu, cập nhật thông tin và chốt bước tiếp theo.'),
    goldenSentence: textValue(customer.conversationHint, 'Dạ em gọi ngắn thôi, mục tiêu là hiểu đúng nhu cầu của anh/chị để khỏi tư vấn sai.'),
    coach: {
      focus: textValue(customer.objectiveToday || customer.nextBestAction, 'Xác nhận nhu cầu trước khi tư vấn.'),
      knowledge: textValue(customer.materialSuggestion, 'Khách cần đúng thông tin, không cần nhiều thông tin.'),
      decision: textValue(customer.conversationHint, 'DB-001 · Hỏi rõ mục tiêu trước khi tư vấn.'),
      mistake: textValue(customer.bottleneckReason, 'Nói quá nhiều khi chưa hiểu khách.'),
    },
    snapshot: {
      confirmedNeed,
      hypothesis,
      decisionMaker: textValue(customer.customerDNA?.family?.decisionMaker || customer.decisionMaker, 'Chưa rõ.'),
      budget: textValue(customer.finance || customer.budget, 'Chưa xác nhận.'),
      nextAction,
    },
    timeline: legacyTimeline(customer.logs),
    legacySource: {
      source: 'CRM Coastal Master / HUY SALES OS',
      sourceId: customer.id,
      saleOwner: customer.saleOwner || '',
      teamLeader: customer.teamLeader || '',
      status: customer.status || '',
      originalStage: customer.salesJourneyStage || '',
    },
  }, index)
}

function compareDate(date) {
  if (!date) return 0
  return new Date(`${date}T00:00:00`).getTime() - new Date(`${todayIso}T00:00:00`).getTime()
}

function loadReactivationState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(REACTIVATION_KEY) || '{}')
    return {
      startDate: parsed.startDate || todayIso,
      batches: parsed.batches || {},
      results: parsed.results || {},
    }
  } catch {
    return { startDate: todayIso, batches: {}, results: {} }
  }
}

function saveReactivationState(state) {
  localStorage.setItem(REACTIVATION_KEY, JSON.stringify(state))
}

function reactivationDayNumber(state) {
  const start = new Date(`${state.startDate || todayIso}T00:00:00`).getTime()
  const current = new Date(`${todayIso}T00:00:00`).getTime()
  const diff = Math.max(0, Math.floor((current - start) / 86400000))
  return diff + 1
}

function buildReactivationQueue(customers, state) {
  const dayNumber = reactivationDayNumber(state)
  const batchKey = `day-${dayNumber}`
  const assignedIds = Object.values(state.batches || {}).flat()
  let batchIds = state.batches?.[batchKey]

  if (!Array.isArray(batchIds)) {
    batchIds = customers
      .filter((customer) => customer.phone && compareDate(customer.followUpDate) < 0 && !assignedIds.includes(customer.id))
      .sort((a, b) => String(a.followUpDate || '').localeCompare(String(b.followUpDate || '')) || String(a.name || '').localeCompare(String(b.name || '')))
      .slice(0, reactivationBatchSize)
      .map((customer) => customer.id)
  }

  const items = batchIds
    .map((id) => customers.find((customer) => customer.id === id))
    .filter(Boolean)
    .map((customer) => ({
      customer,
      result: state.results?.[customer.id]?.result || '',
      updatedAt: state.results?.[customer.id]?.updatedAt || '',
    }))

  return {
    dayNumber,
    batchKey,
    batchIds,
    items,
    completed: items.filter((item) => item.result).length,
    isComplete: items.length > 0 && items.every((item) => item.result),
  }
}

function nextDateAfter(days) {
  const date = new Date(`${todayIso}T00:00:00`)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

function reactivationUpdateForResult(result, customer) {
  const rules = {
    'Đã gọi': {
      stage: 'Đã gọi',
      nextAction: 'Ghi nhận phản hồi và follow-up đúng hẹn.',
      followUpDate: nextDateAfter(3),
    },
    'Không nghe máy': {
      stage: 'Không nghe máy',
      nextAction: 'Gọi lại khung giờ khác.',
      followUpDate: nextDateAfter(1),
    },
    'Hẹn gọi lại': {
      stage: 'Hẹn gọi lại',
      nextAction: 'Gọi lại theo lịch đã hẹn.',
      followUpDate: nextDateAfter(2),
    },
    'Gửi Zalo': {
      stage: 'Gửi Zalo',
      nextAction: 'Follow-up sau khi gửi Zalo.',
      followUpDate: nextDateAfter(1),
    },
    'Không còn nhu cầu': {
      stage: 'Không còn nhu cầu',
      nextAction: 'Dừng theo dõi, chỉ reconnect khi có tín hiệu mới.',
      followUpDate: customer.followUpDate,
    },
  }

  return rules[result] || {
    stage: customer.stage,
    nextAction: customer.nextAction,
    followUpDate: customer.followUpDate,
  }
}

function buildFollowUpGroups(customers) {
  const groups = [
    { title: '🔴 Quá hạn', tone: 'overdue', items: [] },
    { title: '🟡 Hôm nay', tone: 'today', items: [] },
    { title: '🟢 Ngày mai', tone: 'tomorrow', items: [] },
  ]

  customers.forEach((customer) => {
    const diff = compareDate(customer.followUpDate)
    const group = diff < 0 ? groups[0] : diff === 0 ? groups[1] : diff <= 86400000 ? groups[2] : null
    if (!group) return
    group.items.push({
      customer,
      name: customer.shortName,
      stage: customer.stage,
      reason: customer.nextAction || customer.snapshot.nextAction,
      coach: customer.coach.focus,
      knowledge: customer.coach.knowledge,
      decision: customer.coach.decision,
      nextAction: customer.nextAction || customer.action,
    })
  })

  return groups
}

function getTodayTimeline(customers, type) {
  return customers.flatMap((customer) => customer.timeline || []).filter((item) => item.isoDate === todayIso && (!type || item.type === type))
}

function loadInboxCompleted() {
  try {
    const parsed = JSON.parse(localStorage.getItem(INBOX_COMPLETED_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveInboxCompleted(items) {
  localStorage.setItem(INBOX_COMPLETED_KEY, JSON.stringify(items))
}

function buildInboxItems(customers, completedIds) {
  const groups = {
    urgent: [],
    today: [],
    waiting: [],
    done: [],
  }

  customers.forEach((customer) => {
    const id = customer.id
    const item = {
      id,
      customer,
      name: customer.shortName,
      reason: customer.followUpDate ? `Follow-up ${customer.followUpDate}: ${customer.nextAction}` : customer.nextAction,
      coach: customer.coach?.focus || 'Xác nhận nhu cầu trước khi tư vấn.',
      nextAction: customer.nextAction || customer.action || 'Gọi xác nhận nhu cầu',
    }

    if (completedIds.includes(id)) {
      groups.done.push(item)
      return
    }

    const diff = compareDate(customer.followUpDate)
    if (diff < 0 || customer.trustScore >= 75) groups.urgent.push(item)
    else if (diff === 0) groups.today.push(item)
    else groups.waiting.push(item)
  })

  return groups
}

function saveReviewToCustomer(customer, review, updateCustomer) {
  const confirmedSummary = review.confirmedSummary || review.customerSaid || 'Đã lưu nhật ký cuộc gọi.'
  const nextAction = review.nextAction || customer.nextAction
  const followUpDate = review.followUpDate || customer.followUpDate
  const timelineItem = {
    id: `timeline-${Date.now()}`,
    isoDate: todayIso,
    date: '29/06',
    type: 'Call Review',
    confirmed: confirmedSummary,
    next: `${nextAction} · ${followUpDate || 'Chưa chọn ngày'}`,
    knowledge: review.knowledge,
    decision: review.decision,
    result: review.result,
  }

  updateCustomer(customer.id, (current) => ({
    ...current,
    stage: review.result === 'Hẹn gặp' ? 'Có hẹn' : current.stage,
    confirmedNeeds: review.need || current.confirmedNeeds,
    workingHypotheses: review.hypothesis || current.workingHypotheses,
    nextAction,
    action: nextAction,
    followUpDate,
    snapshot: {
      ...current.snapshot,
      confirmedNeed: review.need || current.snapshot.confirmedNeed,
      hypothesis: review.hypothesis || current.snapshot.hypothesis,
      decisionMaker: review.decisionMaker || current.snapshot.decisionMaker,
      budget: review.budget || current.snapshot.budget,
      nextAction,
    },
    timeline: [timelineItem, ...(current.timeline || [])].sort((a, b) => String(b.isoDate || '').localeCompare(String(a.isoDate || ''))),
  }))
}

function Progress({ done, target, tone }) {
  const percent = Math.min(100, Math.round((done / target) * 100))
  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <strong>{done}/{target}</strong>
        <span>{percent}%</span>
      </div>
      <div className="progress-track">
        <i className={`bar-${tone}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

function App() {
  const [customers, setCustomers] = useState(loadCustomers)
  const [completedTasks, setCompletedTasks] = useState({})
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  const [activeView, setActiveView] = useState('dailyFlow')
  const [directCallCustomerId, setDirectCallCustomerId] = useState(null)
  const [inboxCall, setInboxCall] = useState(null)
  const [completedInboxItems, setCompletedInboxItems] = useState(loadInboxCompleted)
  const [reactivationState, setReactivationState] = useState(loadReactivationState)
  const [backupNotice, setBackupNotice] = useState('')
  const [migrationStatus, setMigrationStatus] = useState('')
  const sortedChecklist = [...checklist].sort((a, b) => Number(completedTasks[a.id]) - Number(completedTasks[b.id]))
  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId)
  const directCallCustomer = customers.find((customer) => customer.id === directCallCustomerId)
  const kpisFromData = [
    { label: 'Calls', sublabel: 'Cuộc gọi đã log hôm nay', done: getTodayTimeline(customers, 'Call').length + getTodayTimeline(customers, 'Call Review').length, target: 15, tone: 'green', priority: true },
    { label: 'Follow-up', sublabel: 'Khách cần chăm lại', done: buildFollowUpGroups(customers).reduce((sum, group) => sum + group.items.length, 0), target: 8, tone: 'green' },
    { label: 'Meeting', sublabel: 'Cuộc hẹn đã ghi nhận', done: getTodayTimeline(customers, 'Meeting').length, target: 3, tone: 'orange' },
    { label: 'Video', sublabel: 'Video cần gửi / nhắc xem', done: 2, target: 5, tone: 'gray' },
  ]

  useEffect(() => {
    const queue = buildReactivationQueue(customers, reactivationState)
    if (reactivationState.batches?.[queue.batchKey]) return
    const nextState = {
      ...reactivationState,
      batches: {
        ...(reactivationState.batches || {}),
        [queue.batchKey]: queue.batchIds,
      },
    }
    saveReactivationState(nextState)
    setReactivationState(nextState)
  }, [customers, reactivationState])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const runMigration = async () => {
      try {
        setMigrationStatus('Đang backup Customer Store hiện tại...')
        const currentRaw = localStorage.getItem(CUSTOMER_STORE_KEY) || '[]'
        const backupKey = `${CUSTOMER_STORE_KEY}-backup-before-coastal-200-${new Date().toISOString().replace(/[:.]/g, '-')}`
        localStorage.setItem(backupKey, currentRaw)
        localStorage.setItem(MIGRATION_BACKUP_KEY, backupKey)

        setMigrationStatus('Đang tải backup CRM cũ 200 khách...')
        const response = await fetch(COASTAL_200_BACKUP_URL)
        if (!response.ok) throw new Error(`Không tải được backup CRM cũ: HTTP ${response.status}`)
        const payload = await response.json()
        const legacyCustomers = payload?.backup?.data?.customers
        if (!Array.isArray(legacyCustomers)) throw new Error('Backup CRM cũ không có danh sách khách hợp lệ.')

        const migratedCustomers = legacyCustomers.map(mapLegacyCoastalCustomer)
        if (migratedCustomers.length !== 200) {
          throw new Error(`Số khách migration không đúng: ${migratedCustomers.length}/200`)
        }

        saveCustomers(migratedCustomers)
        setCustomers(migratedCustomers)
        saveInboxCompleted([])
        setCompletedInboxItems([])
        setSelectedCustomerId(null)
        setDirectCallCustomerId(null)
        setInboxCall(null)
        setActiveView('today')
        setBackupNotice(`Migration đã import ${migratedCustomers.length} khách. Backup cũ: ${backupKey}`)
        setMigrationStatus(`MIGRATION IMPORTED ${migratedCustomers.length} CUSTOMERS · Backup: ${backupKey}`)
      } catch (error) {
        const backupKey = localStorage.getItem(MIGRATION_BACKUP_KEY)
        if (backupKey) {
          const backupRaw = localStorage.getItem(backupKey)
          if (backupRaw) {
            localStorage.setItem(CUSTOMER_STORE_KEY, backupRaw)
            const restored = JSON.parse(backupRaw)
            if (Array.isArray(restored)) setCustomers(restored.map(normalizeCustomer))
          }
        }
        setMigrationStatus(`MIGRATION FAIL · Đã restore backup cũ nếu có. ${error.message}`)
      } finally {
        window.history.replaceState({}, '', window.location.pathname)
      }
    }

    const restoreMigration = () => {
      const backupKey = localStorage.getItem(MIGRATION_BACKUP_KEY)
      const backupRaw = backupKey ? localStorage.getItem(backupKey) : null
      if (!backupRaw) {
        setMigrationStatus('RESTORE FAIL · Không tìm thấy backup migration gần nhất.')
        window.history.replaceState({}, '', window.location.pathname)
        return
      }
      localStorage.setItem(CUSTOMER_STORE_KEY, backupRaw)
      const restored = JSON.parse(backupRaw)
      if (Array.isArray(restored)) setCustomers(restored.map(normalizeCustomer))
      setSelectedCustomerId(null)
      setDirectCallCustomerId(null)
      setInboxCall(null)
      setActiveView('today')
      setMigrationStatus(`RESTORE PASS · Đã khôi phục ${Array.isArray(restored) ? restored.length : 0} khách từ ${backupKey}`)
      window.history.replaceState({}, '', window.location.pathname)
    }

    if (params.get('migrateCoastal200') === '1') runMigration()
    if (params.get('restoreMigration') === '1') restoreMigration()
    const openCustomerId = params.get('openCustomerId')
    if (openCustomerId) {
      setSelectedCustomerId(openCustomerId)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const updateCustomer = (customerId, updater) => {
    setCustomers((currentCustomers) => {
      const nextCustomers = currentCustomers.map((customer, index) => {
        if (customer.id !== customerId) return customer
        const updated = typeof updater === 'function' ? updater(customer) : { ...customer, ...updater }
        return normalizeCustomer({ ...updated, updatedDate: new Date().toISOString() }, index)
      })
      saveCustomers(nextCustomers)
      return nextCustomers
    })
  }

  const completeInboxItem = (itemId) => {
    setCompletedInboxItems((current) => {
      const next = Array.from(new Set([...current, itemId]))
      saveInboxCompleted(next)
      return next
    })
  }

  const saveReactivationResult = (customer, result) => {
    const update = reactivationUpdateForResult(result, customer)
    const timelineItem = {
      id: `reactivation-${Date.now()}`,
      isoDate: todayIso,
      date: '29/06',
      type: 'Reactivation',
      confirmed: `Kết quả chiến dịch Reactivate: ${result}.`,
      next: `${update.nextAction} · ${update.followUpDate || 'Chưa chọn ngày'}`,
      result,
    }

    updateCustomer(customer.id, (current) => ({
      ...current,
      stage: update.stage,
      nextAction: update.nextAction,
      action: update.nextAction,
      followUpDate: update.followUpDate,
      snapshot: {
        ...current.snapshot,
        nextAction: update.nextAction,
      },
      timeline: [timelineItem, ...(current.timeline || [])],
    }))

    setReactivationState((current) => {
      const queue = buildReactivationQueue(customers, current)
      const next = {
        ...current,
        batches: {
          ...(current.batches || {}),
          [queue.batchKey]: queue.batchIds,
        },
        results: {
          ...(current.results || {}),
          [customer.id]: {
            result,
            updatedAt: new Date().toISOString(),
          },
        },
      }
      saveReactivationState(next)
      return next
    })
  }

  const addCustomer = (customerInput) => {
    const newCustomerId = `customer-${Date.now()}`
    const newCustomer = normalizeCustomer({
      ...customerInput,
      id: newCustomerId,
      customerId: newCustomerId,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      cta: '📞 Gọi',
      badge: customerInput.stage?.includes('Đàm phán') ? 'Negotiating' : customerInput.emotion?.includes('Im lặng') ? 'Silent' : 'Interested',
      action: customerInput.nextAction,
      timeline: [],
    }, customers.length)

    setCustomers((currentCustomers) => {
      const nextCustomers = [newCustomer, ...currentCustomers]
      saveCustomers(nextCustomers)
      return nextCustomers
    })
    setSelectedCustomerId(newCustomer.id)
    setActiveView('today')
  }

  const handleExportBackup = () => {
    exportLocalBackup(customers, completedInboxItems)
    setBackupNotice(`Đã export backup ${customers.length} khách.`)
  }

  const handleImportBackup = async (file) => {
    if (!file) return
    try {
      const text = await file.text()
      const payload = JSON.parse(text)
      const importedCustomers = extractCustomersFromImport(payload).map(normalizeImportedCustomer)
      if (importedCustomers.length === 0) {
        setBackupNotice('File JSON không có danh sách khách hợp lệ.')
        return
      }

      const confirmed = window.confirm(`File có ${importedCustomers.length} khách. CRM sẽ tự tải backup hiện tại trước, sau đó thay danh sách khách bằng file này. Tiếp tục?`)
      if (!confirmed) {
        setBackupNotice('Đã hủy import. Dữ liệu hiện tại giữ nguyên.')
        return
      }

      exportLocalBackup(customers, completedInboxItems, 'pre-import')
      saveCustomers(importedCustomers)
      setCustomers(importedCustomers)

      const importedInboxCompleted = Array.isArray(payload?.inboxCompleted) ? payload.inboxCompleted : []
      saveInboxCompleted(importedInboxCompleted)
      setCompletedInboxItems(importedInboxCompleted)

      setSelectedCustomerId(null)
      setDirectCallCustomerId(null)
      setInboxCall(null)
      setActiveView('dailyFlow')
      setBackupNotice(`Import thành công ${importedCustomers.length} khách.`)
    } catch {
      setBackupNotice('Không đọc được file JSON. Vui lòng kiểm tra lại định dạng.')
    }
  }

  if (directCallCustomer) {
    return (
      <CallMode
        customer={directCallCustomer}
        onBack={() => setDirectCallCustomerId(null)}
        onSaveReview={(review) => {
          saveReviewToCustomer(directCallCustomer, review, updateCustomer)
          setDirectCallCustomerId(null)
        }}
      />
    )
  }

  if (inboxCall) {
    return (
      <CallMode
        customer={inboxCall.customer}
        onBack={() => setInboxCall(null)}
        onSaveReview={(review) => {
          saveReviewToCustomer(inboxCall.customer, review, updateCustomer)
          completeInboxItem(inboxCall.itemId)
          setInboxCall(null)
          setActiveView('inbox')
        }}
      />
    )
  }

  if (selectedCustomer) {
    return (
      <CustomerWorkspace
        customer={selectedCustomer}
        onBack={() => setSelectedCustomerId(null)}
        onCustomerUpdate={updateCustomer}
      />
    )
  }

  if (activeView === 'followup') {
    return (
      <FollowUpWorkspace
        onBack={() => setActiveView('today')}
        customers={customers}
        onCall={(customer) => setDirectCallCustomerId(customer.id)}
        reactivationState={reactivationState}
        onReactivationResult={saveReactivationResult}
      />
    )
  }

  if (activeView === 'customerForm') {
    return (
      <CustomerForm
        onBack={() => setActiveView('today')}
        onSave={addCustomer}
      />
    )
  }

  if (activeView === 'knowledgeSearch') {
    return <KnowledgeSearch onBack={() => setActiveView('today')} />
  }

  if (activeView === 'inbox') {
    return (
      <AdvisorInbox
        customers={customers}
        completedIds={completedInboxItems}
        onBack={() => setActiveView('today')}
        onCall={(item) => setInboxCall({ customer: item.customer, itemId: item.id })}
      />
    )
  }

  if (activeView === 'dailyFlow') {
    return <TodayFlow customers={customers} onCustomerUpdate={updateCustomer} onAddCustomer={() => setActiveView('customerForm')} onKnowledgeSearch={() => setActiveView('knowledgeSearch')} onInbox={() => setActiveView('inbox')} onFollowUp={() => setActiveView('followup')} onExportBackup={handleExportBackup} onImportBackup={handleImportBackup} backupNotice={backupNotice} migrationStatus={migrationStatus} onExit={() => setActiveView('today')} />
  }

  return (
    <main className="advisor-shell">
      <header className="workspace-header">
        <section>
          <p>HUY ADVISOR OS · CUSTOMER WORKSPACE</p>
          <h1>Xin chào Huy</h1>
          <span>{today}</span>
        </section>
        <aside>
          <small>Streak làm việc</small>
          <strong>12 ngày</strong>
        </aside>
      </header>
      <button className="add-customer-button" onClick={() => setActiveView('customerForm')}>+ Thêm khách</button>
      <button className="add-customer-button knowledge-open-button" onClick={() => setActiveView('knowledgeSearch')}>🔎 Tra cứu Knowledge</button>
      <button className="add-customer-button knowledge-open-button" onClick={() => setActiveView('inbox')}>📥 Advisor Inbox</button>
      {migrationStatus && <div className="migration-status">{migrationStatus}</div>}
      <BackupControls
        customerCount={customers.length}
        notice={backupNotice}
        onExport={handleExportBackup}
        onImport={handleImportBackup}
      />

      <section className="workspace-grid">
        <article className="card kpi-card">
          <div className="card-head">
            <h2>🎯 Hôm nay</h2>
          </div>
          <div className="kpi-list">
            {kpisFromData.map((item) => (
              <div
                className={`kpi-row ${item.priority ? 'kpi-row-featured' : ''} ${item.label === 'Follow-up' ? 'kpi-row-actionable' : ''}`}
                key={item.label}
                onClick={() => item.label === 'Follow-up' && setActiveView('followup')}
              >
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.sublabel}</small>
                </div>
                <Progress {...item} />
              </div>
            ))}
          </div>
        </article>

        <article className="card coach-card">
          <div className="card-head">
            <h2>🧠 Advisor Coach</h2>
          </div>
          <div className="coach-focus">
            <small>Trọng tâm hôm nay</small>
            <strong>Đừng tư vấn nhiều. Chỉ xác định đúng nhu cầu và chốt bước tiếp theo.</strong>
          </div>
          <dl>
            <div>
              <dt>Knowledge cần nhớ</dt>
              <dd>Khách cao cấp cần đúng thông tin, không cần nhiều thông tin.</dd>
            </div>
            <div>
              <dt>Decision cần dùng</dt>
              <dd>PRICE-002 · Khách thấy giá cao → hỏi chuẩn so sánh.</dd>
            </div>
            <div>
              <dt>Lỗi dễ mắc</dt>
              <dd>Nói quá sớm về sản phẩm khi chưa biết khách mua để làm gì.</dd>
            </div>
          </dl>
          <button className="secondary-button">Xem chi tiết</button>
        </article>

        <article className="card priority-card">
          <div className="card-head">
            <h2>👥 Khách ưu tiên</h2>
          </div>
          <div className="customer-list">
            {customers.slice(0, 3).map((customer, index) => (
              <section className="customer-row" key={customer.name}>
                <b>{index + 1}</b>
                <div>
                  <strong>{customer.name}</strong>
                  <em className={`customer-badge badge-${customer.badge.toLowerCase()}`}>{customer.badge}</em>
                  <span>{customer.stage} · {customer.emotion}</span>
                  <small>{customer.action}</small>
                </div>
                <button onClick={() => setSelectedCustomerId(customer.id)}>{customer.cta}</button>
              </section>
            ))}
          </div>
        </article>

        <article className="card checklist-card">
          <div className="card-head">
            <h2>✅ Việc quan trọng</h2>
          </div>
          <div className="checklist">
            {sortedChecklist.map((item) => (
              <label className={completedTasks[item.id] ? 'is-complete' : ''} key={item.id}>
                <input
                  type="checkbox"
                  checked={Boolean(completedTasks[item.id])}
                  onChange={() => setCompletedTasks((current) => ({
                    ...current,
                    [item.id]: !current[item.id],
                  }))}
                />
                <span>{item.text}</span>
              </label>
            ))}
          </div>
        </article>
      </section>

      <button className="start-button" onClick={() => setActiveView('dailyFlow')}>🚀 BẮT ĐẦU NGÀY LÀM VIỆC</button>
    </main>
  )
}

const stageOptions = ['Lead mới', 'Đã kết nối Zalo', 'Đã xem tài liệu', 'Đang follow-up', 'Đang cân nhắc', 'Có hẹn', 'Đàm phán', 'Reconnect']
const emotionOptions = ['Chưa rõ', 'Tò mò', 'Quan tâm', 'Cần niềm tin', 'Lo rủi ro', 'Cân nhắc', 'So sánh', 'Im lặng', 'Tin tưởng']

function CustomerForm({ onBack, onSave }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    zalo: '',
    email: '',
    stage: 'Lead mới',
    emotion: 'Chưa rõ',
    trustScore: 50,
    confirmedNeeds: '',
    workingHypotheses: '',
    nextAction: 'Gọi xác nhận nhu cầu',
    followUpDate: todayIso,
  })

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave({
      ...form,
      name: form.name.trim() || 'Khách mới',
      shortName: form.name.trim() || 'Khách mới',
      snapshot: {
        confirmedNeed: form.confirmedNeeds || 'Chưa xác nhận.',
        hypothesis: form.workingHypotheses || 'Chưa xác nhận.',
        decisionMaker: 'Chưa rõ.',
        budget: 'Chưa xác nhận.',
        nextAction: form.nextAction || 'Gọi xác nhận nhu cầu',
      },
    })
  }

  return (
    <main className="advisor-shell customer-form-screen">
      <button className="back-button" onClick={onBack}>← Quay lại hôm nay</button>
      <form className="card customer-form-card" onSubmit={handleSubmit}>
        <div className="card-head">
          <h2>+ Thêm khách</h2>
          <p>Lưu vào Customer Store</p>
        </div>
        <div className="customer-form-grid">
          <label><span>Họ tên</span><input value={form.name} onChange={(event) => update('name', event.target.value)} /></label>
          <label><span>Điện thoại</span><input value={form.phone} onChange={(event) => update('phone', event.target.value)} /></label>
          <label><span>Zalo</span><input value={form.zalo} onChange={(event) => update('zalo', event.target.value)} /></label>
          <label><span>Email</span><input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} /></label>
          <label><span>Journey Stage</span><select value={form.stage} onChange={(event) => update('stage', event.target.value)}>{stageOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label><span>Emotion</span><select value={form.emotion} onChange={(event) => update('emotion', event.target.value)}>{emotionOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label><span>Trust Score</span><input type="number" min="0" max="100" value={form.trustScore} onChange={(event) => update('trustScore', Number(event.target.value))} /></label>
          <label><span>Follow-up Date</span><input type="date" value={form.followUpDate} onChange={(event) => update('followUpDate', event.target.value)} /></label>
          <label className="form-wide"><span>Nhu cầu đã xác nhận</span><textarea value={form.confirmedNeeds} onChange={(event) => update('confirmedNeeds', event.target.value)} /></label>
          <label className="form-wide"><span>Giả thuyết chưa xác nhận</span><textarea value={form.workingHypotheses} onChange={(event) => update('workingHypotheses', event.target.value)} /></label>
          <label className="form-wide"><span>Next Action</span><textarea value={form.nextAction} onChange={(event) => update('nextAction', event.target.value)} /></label>
        </div>
        <button className="flow-start-button" type="submit">✅ Lưu khách</button>
      </form>
    </main>
  )
}

function KnowledgeSearch({ onBack }) {
  const [query, setQuery] = useState('Giá cao')
  const [selectedKnowledge, setSelectedKnowledge] = useState(null)

  const normalizedQuery = query.trim().toLowerCase()
  const results = knowledgeCore.filter((item) => {
    if (!normalizedQuery) return true
    const haystack = [
      item.id,
      item.title,
      item.category,
      item.summary,
      item.goldenSentence,
      item.relatedDecision,
      ...item.keywords,
    ].join(' ').toLowerCase()
    return haystack.includes(normalizedQuery)
  })

  if (selectedKnowledge) {
    return (
      <KnowledgeDetail
        item={selectedKnowledge}
        onBack={() => setSelectedKnowledge(null)}
      />
    )
  }

  return (
    <main className="advisor-shell knowledge-search-screen">
      <button className="back-button" onClick={onBack}>← Quay lại</button>
      <header className="knowledge-header">
        <p>HUY KNOWLEDGE CORE · SEARCH</p>
        <h1>Tra cứu Knowledge</h1>
        <span>Gõ ID, từ khóa, category hoặc Golden Sentence.</span>
      </header>

      <section className="knowledge-search-card">
        <input
          autoFocus
          placeholder="Tìm Knowledge hoặc Decision…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <small>{results.length} kết quả · đọc nhanh trong 30 giây</small>
      </section>

      <section className="knowledge-results">
        {results.map((item) => (
          <article className="card knowledge-result-card" key={item.id}>
            <div className="knowledge-result-top">
              <strong>{item.id}</strong>
              <span>{item.category}</span>
            </div>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <blockquote>{item.goldenSentence}</blockquote>
            <div className="knowledge-result-footer">
              <em>Decision: {item.relatedDecision}</em>
              <button onClick={() => setSelectedKnowledge(item)}>📖 Xem chi tiết</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

function KnowledgeDetail({ item, onBack }) {
  return (
    <main className="advisor-shell knowledge-detail-screen">
      <button className="back-button" onClick={onBack}>← Quay lại kết quả</button>
      <article className="card knowledge-detail-card">
        <div className="knowledge-detail-title">
          <span>{item.id} · {item.category}</span>
          <h1>{item.title}</h1>
        </div>

        <section className="knowledge-detail-highlight">
          <small>Summary</small>
          <strong>{item.summary}</strong>
        </section>

        <section className="knowledge-detail-highlight golden">
          <small>Golden Sentence</small>
          <strong>{item.goldenSentence}</strong>
        </section>

        <div className="knowledge-detail-grid">
          <KnowledgeList title="Checklist" items={item.checklist} />
          <KnowledgeList title="Discovery Questions" items={item.discoveryQuestions} />
          <KnowledgeList title="Counter Examples" items={item.counterExamples} />
          <section className="knowledge-mini-card">
            <span>Related Decision</span>
            <strong>{item.relatedDecision}</strong>
            <span>Related Knowledge</span>
            <strong>{item.relatedKnowledge.join(' · ')}</strong>
          </section>
        </div>
      </article>
    </main>
  )
}

function KnowledgeList({ title, items }) {
  return (
    <section className="knowledge-mini-card">
      <span>{title}</span>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  )
}

function BackupControls({ customerCount, notice, onExport, onImport }) {
  const fileInputRef = useRef(null)

  return (
    <section className="backup-controls">
      <div>
        <strong>Backup dữ liệu</strong>
        <span>{customerCount} khách trong LocalStorage</span>
        {notice && <em>{notice}</em>}
      </div>
      <button type="button" onClick={onExport}>📦 Backup CRM</button>
      <button type="button" onClick={() => fileInputRef.current?.click()}>⬆ Import JSON</button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={(event) => {
          onImport(event.target.files?.[0])
          event.target.value = ''
        }}
      />
    </section>
  )
}

function DailyMissionProgress({ progress }) {
  return (
    <section className="daily-mission-progress" aria-label="Daily Mission Progress">
      <div>
        <span>Đã gọi</span>
        <strong>{progress.calls}/{progress.callTarget}</strong>
      </div>
      <div>
        <span>Follow-up</span>
        <strong>{progress.followUps}/{progress.followUpTarget}</strong>
      </div>
      <div>
        <span>Hoàn thành</span>
        <strong>{progress.percent}%</strong>
      </div>
      <div className="daily-progress-bar">
        <i style={{ width: `${progress.percent}%` }} />
      </div>
    </section>
  )
}

function TodayFlow({ customers, onCustomerUpdate, onAddCustomer, onKnowledgeSearch, onInbox, onFollowUp, onExportBackup, onImportBackup, backupNotice, migrationStatus, onExit }) {
  const flowCustomers = customers.slice(0, 10)
  const [step, setStep] = useState('morning')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [breakNotice, setBreakNotice] = useState(false)
  const [dayClosed, setDayClosed] = useState(false)
  const [showCompletionPopup, setShowCompletionPopup] = useState(false)
  const [dailyStats, setDailyStats] = useState({
    calls: 0,
    followUps: 0,
    meetings: 0,
    knowledge: [],
    decisions: [],
    mistakes: ['Nói nhiều trước khi xác nhận nhu cầu'],
  })

  const currentCustomer = flowCustomers[currentIndex]
  const mostUsedKnowledge = dailyStats.knowledge[0] || 'P-0003'
  const mostUsedDecision = dailyStats.decisions[0] || 'DB-001'
  const progress = {
    calls: dailyStats.calls,
    callTarget: 10,
    followUps: dailyStats.followUps,
    followUpTarget: 5,
    percent: Math.min(100, Math.round((dailyStats.calls / 10) * 100)),
  }

  const saveFlowReview = (review) => {
    saveReviewToCustomer(currentCustomer, review, onCustomerUpdate)
    const isLastCustomer = currentIndex + 1 >= flowCustomers.length
    setDailyStats((current) => ({
      calls: current.calls + 1,
      followUps: current.followUps + (review.nextAction.includes('Gửi Zalo') || review.nextAction.includes('Gọi lại') ? 1 : 0),
      meetings: current.meetings + (review.result === 'Hẹn gặp' || review.nextAction.includes('Đặt hẹn') ? 1 : 0),
      knowledge: Array.from(new Set([...current.knowledge, review.knowledge])),
      decisions: Array.from(new Set([...current.decisions, review.decision])),
      mistakes: current.mistakes,
    }))
    if (isLastCustomer) {
      setShowCompletionPopup(true)
      setStep('completed')
      return
    }
    setCurrentIndex((index) => index + 1)
    setStep('call')
  }

  const goNextCustomer = () => {
    setBreakNotice(false)
    if (currentIndex + 1 >= flowCustomers.length) {
      setStep('dailyReview')
      return
    }
    setCurrentIndex((index) => index + 1)
    setStep('focus')
  }

  if (step === 'call') {
    return (
      <CallMode
        customer={currentCustomer}
        onBack={() => setStep('focus')}
        onSaveReview={saveFlowReview}
        progress={progress}
      />
    )
  }

  return (
    <main className="advisor-shell today-flow">
      <DailyMissionProgress progress={progress} />
      {showCompletionPopup && (
        <section className="mission-complete-overlay" role="dialog" aria-modal="true">
          <article className="mission-complete-popup">
            <h2>Hôm nay hoàn thành.</h2>
            <p>Daily Mission đã đi hết danh sách khách hôm nay.</p>
            <div>
              <button onClick={() => {
                setShowCompletionPopup(false)
                setStep('dailyReview')
              }}>
                Xem Daily Review
              </button>
              <button className="soft-button" onClick={() => setShowCompletionPopup(false)}>Đóng</button>
            </div>
          </article>
        </section>
      )}
      {step === 'morning' && (
        <section className="flow-hero">
          <p>HUY ADVISOR OS · TODAY FLOW · 08:00</p>
          <h1>Chào Huy</h1>
          <div className="flow-brief-grid">
            <article>
              <span>3 việc quan trọng nhất</span>
              <strong>Gọi khách quá hạn · Follow-up khách đã xem tài liệu · Chốt next action rõ.</strong>
            </article>
            <article>
              <span>Lỗi dễ mắc hôm nay</span>
              <strong>Nói quá nhiều trước khi biết khách đang vướng gì.</strong>
            </article>
            <article>
              <span>Knowledge cần nhớ</span>
              <strong>P-0003 · P-0005 · Khách cao cấp cần đúng thông tin.</strong>
            </article>
            <article>
              <span>Decision cần dùng</span>
              <strong>DB-001 · DB-002 · Hỏi rõ mục tiêu trước khi tư vấn.</strong>
            </article>
          </div>
          <button className="flow-secondary-button" onClick={onAddCustomer}>+ Thêm khách</button>
          <button className="flow-secondary-button" onClick={onKnowledgeSearch}>🔎 Tra cứu Knowledge</button>
          <button className="flow-secondary-button" onClick={onInbox}>📥 Advisor Inbox</button>
          <button className="flow-secondary-button" onClick={onFollowUp}>🔥 Reactivate</button>
          {migrationStatus && <div className="migration-status">{migrationStatus}</div>}
          <BackupControls
            customerCount={customers.length}
            notice={backupNotice}
            onExport={onExportBackup}
            onImport={onImportBackup}
          />
          <button className="flow-start-button" onClick={() => setStep('call')}>🚀 BẮT ĐẦU</button>
        </section>
      )}

      {step === 'focus' && currentCustomer && (
        <section className="focus-customer-screen">
          <header className="focus-header">
            <p>STEP {currentIndex + 1} / {flowCustomers.length} · FOCUS CUSTOMER</p>
            <h1>{currentCustomer.shortName}</h1>
            <span>{currentCustomer.stage} · {currentCustomer.emotion}</span>
          </header>
          <article className="card coach-card focus-coach-card">
            <div className="card-head">
              <h2>🧠 Coach</h2>
            </div>
            <div className="coach-focus">
              <small>Việc cần làm ngay</small>
              <strong>{currentCustomer.snapshot.nextAction}</strong>
            </div>
            <dl>
              <div>
                <dt>Knowledge</dt>
                <dd>{currentCustomer.coach.knowledge}</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>{currentCustomer.coach.decision}</dd>
              </div>
              <div>
                <dt>Next Action</dt>
                <dd>{currentCustomer.action}</dd>
              </div>
            </dl>
            <button className="flow-call-button" onClick={() => setStep('call')}>📞 GỌI</button>
          </article>
        </section>
      )}

      {step === 'autoNext' && (
        <section className="auto-next-card">
          <p>✅ Timeline đã cập nhật mock</p>
          <h1>Chuyển sang khách tiếp theo?</h1>
          <span>{currentIndex + 1 >= flowCustomers.length ? 'Đã hết khách ưu tiên. Có thể xem Daily Review.' : `Tiếp theo: ${flowCustomers[currentIndex + 1].shortName}`}</span>
          {breakNotice && <em>⏳ Nghỉ 5 phút xong quay lại bấm “Có”.</em>}
          <div>
            <button onClick={goNextCustomer}>Có</button>
            <button className="soft-button" onClick={() => setBreakNotice(true)}>Nghỉ 5 phút</button>
          </div>
        </section>
      )}

      {step === 'completed' && (
        <section className="auto-next-card">
          <p>HUY ADVISOR OS · DAILY MISSION</p>
          <h1>Hôm nay hoàn thành.</h1>
          <span>Đã đi hết danh sách khách hôm nay. Có thể xem Daily Review hoặc đóng popup.</span>
        </section>
      )}

      {step === 'dailyReview' && (
        <section className="daily-review-screen">
          {dayClosed ? (
            <div className="day-closed-card">
              <p>HUY ADVISOR OS · NGÀY ĐÃ KẾT THÚC</p>
              <h1>Hẹn gặp lại Huy vào ngày mai.</h1>
              <button className="flow-start-button" onClick={onExit}>Về màn hình chính</button>
            </div>
          ) : (
            <>
              <p>HUY ADVISOR OS · DAILY REVIEW · 17:00</p>
              <h1>📊 Daily Review</h1>
              <div className="daily-review-grid">
                <article><span>📞 Số cuộc gọi</span><strong>{dailyStats.calls}</strong></article>
                <article><span>💬 Follow-up</span><strong>{dailyStats.followUps}</strong></article>
                <article><span>🤝 Cuộc hẹn</span><strong>{dailyStats.meetings}</strong></article>
                <article><span>🧠 Knowledge dùng nhiều nhất</span><strong>{mostUsedKnowledge}</strong></article>
                <article><span>📖 Decision dùng nhiều nhất</span><strong>{mostUsedDecision}</strong></article>
                <article><span>⚠ Lỗi lặp lại</span><strong>{dailyStats.mistakes.join(' · ')}</strong></article>
                <article><span>✅ Điều làm tốt</span><strong>Đi đúng flow, không bỏ qua Review, luôn có Next Action.</strong></article>
                <article><span>💬 Golden Sentence</span><strong>“Em chưa vội tư vấn sản phẩm. Em muốn hiểu đúng điều anh/chị đang cần trước.”</strong></article>
              </div>
              <div className="tomorrow-card">
                <span>🎯 3 việc quan trọng ngày mai</span>
                <strong>Gọi khách chưa nghe máy · Follow-up khách đã nhận Zalo · Chốt lịch với khách có tín hiệu mua.</strong>
              </div>
              <button className="flow-start-button" onClick={() => setDayClosed(true)}>✅ KẾT THÚC NGÀY</button>
            </>
          )}
        </section>
      )}
    </main>
  )
}

function FollowUpWorkspace({ customers, onBack, onCall, reactivationState, onReactivationResult }) {
  const groups = buildFollowUpGroups(customers)
  const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0)
  const reactivationQueue = buildReactivationQueue(customers, reactivationState)
  const reactivationOptions = ['Đã gọi', 'Không nghe máy', 'Hẹn gọi lại', 'Gửi Zalo', 'Không còn nhu cầu']

  return (
    <main className="advisor-shell followup-workspace">
      <button className="back-button" onClick={onBack}>← Quay lại hôm nay</button>

      <header className="followup-header">
        <section>
          <p>HUY ADVISOR OS · FOLLOW-UP WORKSPACE</p>
          <h1>Follow-up hôm nay</h1>
          <span>{totalItems} hành động cần xử lý · Ưu tiên từ trên xuống</span>
        </section>
        <aside>
          <small>Việc đầu tiên</small>
          <strong>Gọi khách quá hạn trước.</strong>
        </aside>
      </header>

      <section className="card reactivation-card">
        <div className="card-head">
          <div>
            <h2>🔥 Reactivation Mode · Ngày {reactivationQueue.dayNumber}</h2>
            <p>{reactivationQueue.completed}/{reactivationQueue.items.length || reactivationBatchSize} khách hôm nay</p>
          </div>
          {reactivationQueue.isComplete && <strong className="reactivation-done">Hôm nay hoàn thành.</strong>}
        </div>
        <div className="reactivation-list">
          {reactivationQueue.items.length === 0 ? (
            <div className="empty-inbox">Không còn khách quá hạn để đưa vào queue hôm nay.</div>
          ) : (
            reactivationQueue.items.map((item, index) => (
              <section className={`reactivation-item ${item.result ? 'is-done' : ''}`} key={item.customer.id}>
                <div className="reactivation-main">
                  <b>{index + 1}</b>
                  <div>
                    <strong>{item.customer.shortName}</strong>
                    <span>{item.customer.phone} · {item.customer.stage}</span>
                    <small>Follow-up cũ: {item.customer.followUpDate} · {item.customer.nextAction}</small>
                  </div>
                </div>
                <div className="reactivation-actions">
                  {item.result ? (
                    <em>✅ {item.result}</em>
                  ) : (
                    reactivationOptions.map((option) => (
                      <button key={option} onClick={() => onReactivationResult(item.customer, option)}>
                        {option}
                      </button>
                    ))
                  )}
                </div>
              </section>
            ))
          )}
        </div>
      </section>

      <section className="followup-groups">
        {groups.map((group) => (
          <article className={`card followup-group followup-${group.tone}`} key={group.title}>
            <div className="card-head">
              <h2>{group.title}</h2>
              <p>{group.items.length} việc</p>
            </div>
            <div className="followup-list">
              {group.items.map((item) => (
                  <section className="followup-item" key={`${group.title}-${item.customer.id}-${item.nextAction}`}>
                    <div className="followup-main">
                      <strong>{item.name}</strong>
                      <span>{item.stage}</span>
                    </div>
                    <div className="followup-detail">
                      <small>Lý do Follow-up</small>
                      <p>{item.reason}</p>
                    </div>
                    <div className="followup-detail coach-reminder">
                      <small>Coach Reminder</small>
                      <p>{item.coach}</p>
                    </div>
                    <div className="followup-tags">
                      <em>{item.knowledge}</em>
                      <em>{item.decision}</em>
                    </div>
                    <div className="followup-next">
                      <span>{item.nextAction}</span>
                      <button onClick={() => onCall(item.customer)}>📞 Gọi</button>
                    </div>
                  </section>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

function AdvisorInbox({ customers, completedIds, onBack, onCall }) {
  const groups = buildInboxItems(customers, completedIds)
  const sections = [
    { key: 'urgent', title: '🔴 Cần làm ngay', helper: 'Việc nóng nhất. Gọi trước.' },
    { key: 'today', title: '🟡 Nên làm hôm nay', helper: 'Xử lý sau nhóm đỏ.' },
    { key: 'waiting', title: '⚪ Chờ', helper: 'Theo dõi, chưa cần thúc.' },
    { key: 'done', title: '✅ Hoàn thành', helper: 'Đã xử lý trong ngày.' },
  ]

  return (
    <main className="advisor-shell advisor-inbox-screen">
      <button className="back-button" onClick={onBack}>← Quay lại hôm nay</button>

      <header className="inbox-header">
        <section>
          <p>HUY ADVISOR OS · ADVISOR INBOX</p>
          <h1>Inbox công việc</h1>
          <span>{customers.length} khách trong Customer Store · Làm từ trên xuống</span>
        </section>
        <aside>
          <small>Việc đầu tiên</small>
          <strong>Gọi nhóm Cần làm ngay trước.</strong>
        </aside>
      </header>

      <section className="inbox-groups">
        {sections.map((section) => (
          <article className={`card inbox-group inbox-${section.key}`} key={section.key}>
            <div className="card-head">
              <div>
                <h2>{section.title}</h2>
                <p>{section.helper}</p>
              </div>
              <p>{groups[section.key].length} việc</p>
            </div>
            <div className="inbox-list">
              {groups[section.key].length === 0 ? (
                <div className="empty-inbox">Không có việc trong nhóm này.</div>
              ) : groups[section.key].map((item) => (
                <section className="inbox-item" key={item.id}>
                  <div className="inbox-customer">
                    <strong>{item.name}</strong>
                    <span>{item.customer.stage}</span>
                  </div>
                  <div className="inbox-detail">
                    <small>Lý do</small>
                    <p>{item.reason}</p>
                  </div>
                  <div className="inbox-detail coach-reminder">
                    <small>Coach Reminder</small>
                    <p>{item.coach}</p>
                  </div>
                  <div className="inbox-next">
                    <small>Next Action</small>
                    <span>{item.nextAction}</span>
                    {section.key === 'done' ? (
                      <em>Đã hoàn thành</em>
                    ) : (
                      <button onClick={() => onCall(item)}>📞 Gọi</button>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

function CustomerWorkspace({ customer, onBack, onCustomerUpdate }) {
  const [isCallMode, setIsCallMode] = useState(false)
  const [saveNotice, setSaveNotice] = useState('')
  const [isEditingSnapshot, setIsEditingSnapshot] = useState(false)
  const [snapshotForm, setSnapshotForm] = useState({
    confirmedNeed: customer.snapshot.confirmedNeed,
    hypothesis: customer.snapshot.hypothesis,
    decisionMaker: customer.snapshot.decisionMaker,
    budget: customer.snapshot.budget,
    nextAction: customer.snapshot.nextAction,
    stage: customer.stage,
    emotion: customer.emotion,
    trustScore: customer.trustScore,
    followUpDate: customer.followUpDate,
  })

  const handleCallReviewSave = (review) => {
    saveReviewToCustomer(customer, review, onCustomerUpdate)
    setSaveNotice('Đã lưu cuộc gọi')
    setIsCallMode(false)
  }

  const updateSnapshotField = (field, value) => {
    setSnapshotForm((current) => ({ ...current, [field]: value }))
  }

  const saveSnapshot = () => {
    onCustomerUpdate(customer.id, {
      stage: snapshotForm.stage,
      emotion: snapshotForm.emotion,
      trustScore: Number(snapshotForm.trustScore),
      confirmedNeeds: snapshotForm.confirmedNeed,
      workingHypotheses: snapshotForm.hypothesis,
      nextAction: snapshotForm.nextAction,
      action: snapshotForm.nextAction,
      followUpDate: snapshotForm.followUpDate,
      snapshot: {
        ...customer.snapshot,
        confirmedNeed: snapshotForm.confirmedNeed,
        hypothesis: snapshotForm.hypothesis,
        decisionMaker: snapshotForm.decisionMaker,
        budget: snapshotForm.budget,
        nextAction: snapshotForm.nextAction,
      },
    })
    setSaveNotice('Đã lưu Customer Snapshot')
    setIsEditingSnapshot(false)
  }

  if (isCallMode) {
    return (
      <CallMode
        customer={customer}
        onBack={() => setIsCallMode(false)}
        onSaveReview={handleCallReviewSave}
      />
    )
  }

  return (
    <main className="advisor-shell customer-workspace">
      <button className="back-button" onClick={onBack}>← Quay lại hôm nay</button>
      {saveNotice && <div className="save-notice">✅ {saveNotice}</div>}

      <header className="customer-detail-header">
        <section>
          <p>HUY ADVISOR OS · CUSTOMER WORKSPACE</p>
          <h1>{customer.shortName}</h1>
          <div className="customer-header-meta">
            <span className={`stage-pill badge-${customer.badge.toLowerCase()}`}>{customer.stage}</span>
            <span>Trust Score: <strong>{customer.trustScore}/100</strong></span>
            <span>Emotion: <strong>{customer.emotion}</strong></span>
          </div>
        </section>
      </header>

      <section className="customer-detail-grid">
        <article className="card coach-card customer-coach-card">
          <div className="card-head">
            <h2>🧠 Advisor Coach</h2>
          </div>
          <div className="coach-focus">
            <small>Trọng tâm với khách này</small>
            <strong>{customer.coach.focus}</strong>
          </div>
          <dl>
            <div>
              <dt>Knowledge cần nhớ</dt>
              <dd>{customer.coach.knowledge}</dd>
            </div>
            <div>
              <dt>Decision cần dùng</dt>
              <dd>{customer.coach.decision}</dd>
            </div>
            <div>
              <dt>Lỗi dễ mắc</dt>
              <dd>{customer.coach.mistake}</dd>
            </div>
          </dl>
        </article>

        <article className="card snapshot-card">
          <div className="card-head">
            <h2>👤 Customer Snapshot</h2>
            <button className="inline-edit-button" onClick={() => setIsEditingSnapshot((value) => !value)}>
              {isEditingSnapshot ? 'Đóng' : 'Sửa Snapshot'}
            </button>
          </div>
          {isEditingSnapshot ? (
            <div className="snapshot-edit-grid">
              <label><span>Journey Stage</span><select value={snapshotForm.stage} onChange={(event) => updateSnapshotField('stage', event.target.value)}>{stageOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label><span>Emotion</span><select value={snapshotForm.emotion} onChange={(event) => updateSnapshotField('emotion', event.target.value)}>{emotionOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label><span>Trust Score</span><input type="number" min="0" max="100" value={snapshotForm.trustScore} onChange={(event) => updateSnapshotField('trustScore', event.target.value)} /></label>
              <label><span>Follow-up Date</span><input type="date" value={snapshotForm.followUpDate} onChange={(event) => updateSnapshotField('followUpDate', event.target.value)} /></label>
              <label className="form-wide"><span>Nhu cầu đã xác nhận</span><textarea value={snapshotForm.confirmedNeed} onChange={(event) => updateSnapshotField('confirmedNeed', event.target.value)} /></label>
              <label className="form-wide"><span>Giả thuyết chưa xác nhận</span><textarea value={snapshotForm.hypothesis} onChange={(event) => updateSnapshotField('hypothesis', event.target.value)} /></label>
              <label><span>Người quyết định</span><input value={snapshotForm.decisionMaker} onChange={(event) => updateSnapshotField('decisionMaker', event.target.value)} /></label>
              <label><span>Ngân sách</span><input value={snapshotForm.budget} onChange={(event) => updateSnapshotField('budget', event.target.value)} /></label>
              <label className="form-wide"><span>Next Action</span><textarea value={snapshotForm.nextAction} onChange={(event) => updateSnapshotField('nextAction', event.target.value)} /></label>
              <button className="save-snapshot-button" onClick={saveSnapshot}>✅ Lưu Snapshot</button>
            </div>
          ) : (
            <div className="snapshot-list">
              <InfoRow label="Nhu cầu đã xác nhận" value={customer.snapshot.confirmedNeed} />
              <InfoRow label="Giả thuyết chưa xác nhận" value={customer.snapshot.hypothesis} />
              <InfoRow label="Người quyết định" value={customer.snapshot.decisionMaker} />
              <InfoRow label="Ngân sách" value={customer.snapshot.budget} />
              <InfoRow label="Next Action" value={customer.snapshot.nextAction} highlight />
            </div>
          )}
        </article>

        <article className="card timeline-card">
          <div className="card-head">
            <h2>🕘 Timeline</h2>
          </div>
          <div className="timeline-list">
            {customer.timeline.map((item, index) => (
              <section className="timeline-item" key={`${item.date}-${item.type}-${index}`}>
                <time>{item.date}</time>
                <div>
                  <strong>{item.type}</strong>
                  <p>{item.confirmed}</p>
                  <small>Next: {item.next}</small>
                </div>
              </section>
            ))}
          </div>
        </article>

        <article className="card action-card">
          <div className="card-head">
            <h2>⚡ Hành động</h2>
          </div>
          <div className="action-grid">
            <button onClick={() => setIsCallMode(true)}>📞 Gọi</button>
            <button>💬 Zalo</button>
            <button>📝 Ghi nhật ký</button>
            <button>📅 Đặt Follow-up</button>
          </div>
        </article>
      </section>
    </main>
  )
}

function CallMode({ customer, onBack, onSaveReview, progress }) {
  const [askedQuestions, setAskedQuestions] = useState({})
  const [callState, setCallState] = useState('ready')

  const askedCount = Object.values(askedQuestions).filter(Boolean).length
  const isReview = callState === 'review'

  return (
    <main className="advisor-shell call-mode">
      {progress && <DailyMissionProgress progress={progress} />}
      <button className="back-button" onClick={onBack}>← Quay lại khách hàng</button>

      <header className="call-header">
        <section>
          <p>HUY ADVISOR OS · CALL MODE</p>
          <h1>{customer.shortName}</h1>
          <div className="customer-header-meta">
            <span>📍 {customer.stage}</span>
            <span>❤️ Trust: <strong>{customer.trustScore}/100</strong></span>
            <span>😊 Emotion: <strong>{customer.emotion}</strong></span>
          </div>
        </section>
        <aside>
          <small>🎯 Mục tiêu cuộc gọi</small>
          <strong>{customer.callGoal}</strong>
        </aside>
      </header>

      {isReview ? (
        <CallReview customer={customer} askedCount={askedCount} onSave={onSaveReview} />
      ) : (
        <section className="call-grid">
          <article className="card coach-card call-coach-card">
            <div className="card-head">
              <h2>🧠 Advisor Coach</h2>
            </div>
            <dl>
              <div>
                <dt>Lỗi dễ mắc nhất</dt>
                <dd>{customer.coach.mistake}</dd>
              </div>
              <div>
                <dt>Knowledge cần nhớ</dt>
                <dd>{customer.coach.knowledge}</dd>
              </div>
              <div>
                <dt>Decision cần dùng</dt>
                <dd>{customer.coach.decision}</dd>
              </div>
            </dl>
            <div className="golden-sentence">
              <small>Golden Sentence</small>
              <strong>{customer.goldenSentence}</strong>
            </div>
          </article>

          <article className="card questions-card">
            <div className="card-head">
              <h2>❓ Discovery Questions</h2>
              <p>{askedCount}/5 đã hỏi</p>
            </div>
            <div className="question-list">
              {customer.discoveryQuestions.map((question, index) => (
                <button
                  className={askedQuestions[index] ? 'is-asked' : ''}
                  key={question}
                  onClick={() => setAskedQuestions((current) => ({
                    ...current,
                    [index]: !current[index],
                  }))}
                >
                  <b>{index + 1}</b>
                  <span>{question}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="card snapshot-card">
            <div className="card-head">
              <h2>👤 Customer Snapshot</h2>
            </div>
            <div className="snapshot-list">
              <InfoRow label="Nhu cầu đã xác nhận" value={customer.snapshot.confirmedNeed} />
              <InfoRow label="Giả thuyết chưa xác nhận" value={customer.snapshot.hypothesis} />
              <InfoRow label="Người quyết định" value={customer.snapshot.decisionMaker} />
              <InfoRow label="Next Action lần trước" value={customer.snapshot.nextAction} highlight />
            </div>
          </article>

          <article className="card call-controls-card">
            <div className="card-head">
              <h2>📞 Call Controls</h2>
            </div>
            <div className="call-status">
              <small>Trạng thái</small>
              <strong>{callState === 'ready' ? 'Sẵn sàng gọi' : 'Đang trong cuộc gọi'}</strong>
            </div>
            {callState === 'ready' ? (
              <button className="call-primary-button" onClick={() => setCallState('calling')}>📞 Bắt đầu gọi</button>
            ) : (
              <button className="call-end-button" onClick={() => setCallState('review')}>☎️ Kết thúc cuộc gọi</button>
            )}
            <p>Review sẽ mở tự động sau khi kết thúc để log trong dưới 60 giây.</p>
          </article>
        </section>
      )}
    </main>
  )
}

function CallReview({ customer, askedCount, onSave }) {
  const [form, setForm] = useState({
    customerSaid: 'Anh muốn hiểu rõ rủi ro và phương án phù hợp trước.',
    need: 'Đầu tư trung hạn, ưu tiên an toàn.',
    budget: 'Khoảng 2–3 tỷ vốn tự có.',
    decisionMaker: 'Anh Minh quyết định chính, vợ có ảnh hưởng.',
    buyingTimeline: 'Trong 1–2 tháng nếu phương án rõ.',
    mainConcern: 'Lo rủi ro và tính thanh khoản.',
    hypothesis: 'Có thể đang so sánh với gửi tiền hoặc đất nền quen thuộc.',
    knowledge: 'P-0003',
    decision: 'DB-001',
    result: 'Đã trao đổi',
    nextAction: '💬 Gửi Zalo',
    followUpDate: '2026-06-30',
    followUpQuick: 'Mai',
  })

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const confirmedSummary = [
    form.need,
    form.budget,
    form.decisionMaker,
    form.buyingTimeline,
    form.mainConcern,
  ].filter(Boolean).join(' · ')

  return (
    <section className="call-review-wrap">
      <article className="card call-review-card">
        <div className="card-head">
          <h2>☎️ Call Review</h2>
          <p>Dưới 60 giây</p>
        </div>
        <div className="review-grid">
          <label>
            <span>Khách nói gì?</span>
            <textarea
              value={form.customerSaid}
              onChange={(event) => updateField('customerSaid', event.target.value)}
            />
          </label>
          <fieldset className="confirmed-fieldset">
            <legend>Điều khách đã xác nhận</legend>
            <label>
              <span>Nhu cầu</span>
              <textarea className="compact-textarea" value={form.need} onChange={(event) => updateField('need', event.target.value)} />
            </label>
            <label>
              <span>Ngân sách</span>
              <textarea className="compact-textarea" value={form.budget} onChange={(event) => updateField('budget', event.target.value)} />
            </label>
            <label>
              <span>Người quyết định</span>
              <textarea className="compact-textarea" value={form.decisionMaker} onChange={(event) => updateField('decisionMaker', event.target.value)} />
            </label>
            <label>
              <span>Timeline mua</span>
              <textarea className="compact-textarea" value={form.buyingTimeline} onChange={(event) => updateField('buyingTimeline', event.target.value)} />
            </label>
            <label>
              <span>Nỗi lo chính</span>
              <textarea className="compact-textarea" value={form.mainConcern} onChange={(event) => updateField('mainConcern', event.target.value)} />
            </label>
          </fieldset>
          <label>
            <span>Giả thuyết chưa xác nhận</span>
            <textarea
              value={form.hypothesis}
              onChange={(event) => updateField('hypothesis', event.target.value)}
            />
          </label>
          <QuickChoiceGroup
            label="Knowledge đã dùng"
            options={quickReviewOptions.knowledge}
            value={form.knowledge}
            onChange={(value) => updateField('knowledge', value)}
          />
          <QuickChoiceGroup
            label="Decision đã dùng"
            options={quickReviewOptions.decision}
            value={form.decision}
            onChange={(value) => updateField('decision', value)}
          />
          <QuickChoiceGroup
            label="Kết quả cuộc gọi"
            options={quickReviewOptions.result}
            value={form.result}
            onChange={(value) => updateField('result', value)}
            large
          />
          <QuickChoiceGroup
            label="Next Action"
            options={quickReviewOptions.nextAction}
            value={form.nextAction}
            onChange={(value) => updateField('nextAction', value)}
            large
          />
          <section className="quick-choice-block">
            <span>Follow-up</span>
            <div className="quick-choice-row">
              {quickReviewOptions.followUp.map((option) => (
                <button
                  className={form.followUpQuick === option.label ? 'is-selected' : ''}
                  key={option.label}
                  onClick={() => setForm((current) => ({
                    ...current,
                    followUpQuick: option.label,
                    followUpDate: option.date,
                  }))}
                >
                  ○ {option.label}
                </button>
              ))}
              <button
                className={form.followUpQuick === 'Chọn ngày khác' ? 'is-selected' : ''}
                onClick={() => updateField('followUpQuick', 'Chọn ngày khác')}
              >
                ○ Chọn ngày khác
              </button>
            </div>
            {form.followUpQuick === 'Chọn ngày khác' && (
              <input
                type="date"
                value={form.followUpDate}
                onChange={(event) => updateField('followUpDate', event.target.value)}
              />
            )}
          </section>
        </div>
        <div className="review-summary">
          <strong>Đã hỏi {askedCount}/5 câu Discovery.</strong>
          <span>Knowledge: {form.knowledge} · Decision: {form.decision}</span>
        </div>
        <button
          className="call-primary-button"
          onClick={() => onSave({ ...form, confirmedSummary })}
        >
          ✅ HOÀN THÀNH
        </button>
      </article>
    </section>
  )
}

function QuickChoiceGroup({ label, options, value, onChange, large = false }) {
  return (
    <section className="quick-choice-block">
      <span>{label}</span>
      <div className={`quick-choice-row ${large ? 'quick-choice-large' : ''}`}>
        {options.map((option) => (
          <button
            className={value === option ? 'is-selected' : ''}
            key={option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  )
}

function InfoRow({ label, value, highlight = false }) {
  return (
    <section className={`info-row ${highlight ? 'info-row-highlight' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </section>
  )
}

createRoot(document.getElementById('root')).render(<App />)
