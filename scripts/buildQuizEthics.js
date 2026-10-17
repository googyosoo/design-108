import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = path.join(__dirname, '..', 'src', 'data', 'quiz-ethics.json')

const ethicsQuestions = [
  {
    id: 1,
    title: "방과후 강좌 무료 체험 후 자동 결제",
    situation: "온라인 방과후 학습 앱에서 '7일 무료 체험'을 대문짝만하게 강조하면서, 체험 종료 후 월 3만 원이 자동 결제된다는 사실은 작은 회색 글씨로 숨겨두었습니다.",
    judgment: "manipulation",
    relatedEffectIds: [47, 48, 21],
    rationale: "소유 효과(Endowment Effect)로 손실 회피를 자극하고, 디폴트 효과(Default Effect)를 악용하여 학생과 학부모의 인지적 방심을 유도한 전형적인 다크 패턴(조작)입니다.",
    ethicalAlternative: "무료 체험 종료 3일 전에 알림 문자를 발송하고, 학생이 계속 수강할지 명시적으로 동의하는 유료 전환 버튼을 누를 때만 결제되도록 설계해야 합니다."
  },
  {
    id: 2,
    title: "학급 환경 정리 체크리스트 시각화",
    situation: "학급 분리수거함 위에 '오늘의 분리수거 달성률 85%'라는 깔끔한 진도 막대를 걸어두고, '페트병 라벨 3개만 더 떼면 우리 반 목표 달성!'이라고 적어두었습니다.",
    judgment: "persuasion",
    relatedEffectIds: [32, 12, 89],
    rationale: "목표 구배 효과(Goal Gradient Effect)와 밴드왜건 효과를 활용하여 공동체의 선한 목표 달성을 위해 학생들의 자발적 동참을 독려하는 건강한 설득입니다.",
    ethicalAlternative: "투명하고 정확한 데이터를 바탕으로 참여를 북돋우므로 현재의 방식이 훌륭한 모범 사례입니다."
  },
  {
    id: 3,
    title: "학습 플랫폼 구독 해지 시 감정적 죄책감 유도",
    situation: "인강 사이트에서 구독 해지 버튼을 누르자 눈물을 펑펑 흘리는 캐릭터가 나타나며 '정말 저와의 공부를 포기하실 건가요? 당신의 꿈이 멀어집니다'라는 팝업을 띄웠습니다.",
    judgment: "manipulation",
    relatedEffectIds: [4, 21, 30],
    rationale: "컨펌셰이밍(Confirmshaming) 기법으로, 비합리적인 죄책감과 매몰 비용 오류(Sunk Cost)를 자극하여 사용자의 정당한 탈퇴 권리를 방해하는 조작입니다.",
    ethicalAlternative: "남은 수강 기간과 잔여 환불 금액 등 객관적이고 필요한 정보만 담백하게 안내하고, 해지 버튼을 찾기 쉽게 제공해야 합니다."
  },
  {
    id: 4,
    title: "학교 축제 티켓 예매 대기열 시각화",
    situation: "학교 축제 강당 입장권 예매 시스템에서 '현재 대기 인원 15명 / 예상 대기 시간 1분'을 실시간으로 투명하게 안내하여 새로고침으로 인한 서버 다운을 막았습니다.",
    judgment: "persuasion",
    relatedEffectIds: [100, 104, 89],
    rationale: "사용자에게 시스템 상태의 가시성(Visibility of System Status)을 제공하여 불필요한 불안감을 해소하고 안정적인 과업 완수를 돕는 정직한 UX 설계입니다.",
    ethicalAlternative: "투명한 정보 공개로 시스템 신뢰를 높이는 우수한 접근입니다."
  },
  {
    id: 5,
    title: "수행평가 제출 화면의 기만적 추가 옵션",
    situation: "온라인 과제 제출 페이지에서 '과제 최종 제출' 버튼 바로 아래에 '과제 첨삭 유료 AI 피드백 신청(3,000원)' 옵션 체크박스를 기본값(Checked)으로 켜두었습니다.",
    judgment: "manipulation",
    relatedEffectIds: [31, 47, 10],
    rationale: "과제를 끝내고 긴장이 풀린 텐션 리덕션(Tension Reduction) 순간과 디폴트 효과를 결합하여 사용자가 의도치 않은 유료 지출을 하게 만드는 교묘한 조작입니다.",
    ethicalAlternative: "추가 유료 서비스는 반드시 기본값을 미선택(Unchecked) 상태로 두고, 학생이 자발적으로 원할 때만 명시적으로 선택하게 해야 합니다."
  },
  {
    id: 6,
    title: "도서관 신간 도서 코너의 큐레이션",
    situation: "학교 도서관에서 '지난달 친구들이 가장 많이 빌려본 인문학 도서 5선'을 눈높이 매대에 예쁜 추천 표지와 함께 전시하여 학생들의 독서 흥미를 이끌었습니다.",
    judgment: "persuasion",
    relatedEffectIds: [12, 103, 7],
    rationale: "또래 집단의 긍정적인 독서 데이터를 정직하게 공유(밴드왜건)하여 독서라는 유익한 행동을 자발적으로 선택하도록 돕는 유익한 넛지(Nudge)입니다.",
    ethicalAlternative: "학생들의 다양한 관심사를 반영할 수 있도록 비인기 양서 추천 코너도 함께 운영하면 더욱 좋습니다."
  },
  {
    id: 7,
    title: "허위 긴급성을 조장하는 마감 타이머",
    situation: "학교 굿즈 판매 사이트에서 실제로는 재고가 1,000개 이상 남아있는데도 화면 상단에 '남은 시간 00:04:59! 지금 주문 안 하면 품절!'이라는 가짜 타이머를 띄웠습니다.",
    judgment: "manipulation",
    relatedEffectIds: [46, 23, 30],
    rationale: "가짜 긴급성(Fake Urgency)과 손실 회피 편향을 유발해 소비자가 충분히 숙고할 시간적 여유를 빼앗고 충동구매를 강요하는 전형적인 기만 상술입니다.",
    ethicalAlternative: "실제 실제 수량과 정확한 예약 판매 마감 일시를 투명하게 공개하고, 허위 시각적 카운트다운 타이머를 즉각 제거해야 합니다."
  },
  {
    id: 8,
    title: "학습지 문제 난이도 3단계 라벨링",
    situation: "수학 학습지에서 문제를 '기초 다지기 / 실력 키우기 / 심화 도전' 3단계로 명확히 라벨링하여 학생이 자기 수준에 맞는 문제를 자율적으로 골라 풀게 했습니다.",
    judgment: "persuasion",
    relatedEffectIds: [44, 28, 15],
    rationale: "학습자의 수준별 선택(골디락스)과 정보 청킹을 지원하여 좌절감을 줄이고 자기효능감을 높여주는 교육적인 정보 구조화입니다.",
    ethicalAlternative: "도전 문제를 풀었을 때 격려 피드백을 추가하면 학습 동기가 더욱 강화됩니다."
  },
  {
    id: 9,
    title: "탈퇴 버튼의 극단적인 명도 대비 왜곡",
    situation: "학습 앱 설정에서 '회원 탈퇴' 버튼의 텍스트 색상을 배경색과 거의 똑같은 연회색으로 만들어(명도비 1.2:1) 눈을 씻고 찾아봐도 보이지 않게 감춰두었습니다.",
    judgment: "manipulation",
    relatedEffectIds: [10, 92, 99],
    rationale: "시각적 대비의 법칙(Contrast)을 악용하여 사용자의 합법적인 권리 행사를 물리적으로 은폐하고 방해하는 악의적 다크 패턴입니다.",
    ethicalAlternative: "탈퇴 메뉴를 표준적인 위치에 두고, WCAG 2.2 기준 최소 4.5:1 이상의 명도 대비를 갖춘 정상적인 텍스트 링크로 노출해야 합니다."
  },
  {
    id: 10,
    title: "급식 잔반 줄이기 넛지 스티커",
    situation: "급식판 배식대 위에 먹을 만큼만 덜어가도록 '다 먹은 식판은 지구를 지켜요'라는 친근한 스티커와 잔반 없는 식판 사진을 눈높이에 부착했습니다.",
    judgment: "persuasion",
    relatedEffectIds: [1, 15, 83],
    rationale: "친근한 시각 이미지와 긍정적 메시지(쿨레쇼프 및 낙인 효과)를 통해 학생 스스로 자발적인 친환경 행동을 선택하도록 돕는 정당한 넛지입니다.",
    ethicalAlternative: "지속적인 실천을 유도하기 위해 학급별 잔반 감소 통계를 월간으로 공유하면 참여도가 더 높아집니다."
  },
  {
    id: 11,
    title: "모의고사 오답 노트 낚시성 제목 유인",
    situation: "학습 유튜브 영상에서 '선생님이 시험에 절대 안 나온다고 속인 문제 대공개!'라는 자극적인 거짓 제목으로 학생들의 클릭을 유도한 뒤 평범한 기본 개념을 설명했습니다.",
    judgment: "manipulation",
    relatedEffectIds: [23, 19, 35],
    rationale: "칼리굴라 효과와 자이가르닉 효과를 기만적으로 악용한 전형적인 클릭베이트(Clickbait)로, 학생들의 신뢰를 훼손하고 시간을 낭비하게 만듭니다.",
    ethicalAlternative: "영상에서 실제로 다루는 핵심 주제(예: '함수 단원 고난도 빈출 오답 유형 TOP 3 분석')를 정직하고 명확하게 표기해야 합니다."
  },
  {
    id: 12,
    title: "수업 집중을 위한 시각적 소음 제거",
    situation: "슬라이드 수업 자료를 만들 때 불필요한 장식 애니메이션과 화려한 테두리를 걷어내고, 핵심 문장 하나와 관련 도해 하나만 중앙에 큼직하게 배치했습니다.",
    judgment: "persuasion",
    relatedEffectIds: [89, 90, 97],
    rationale: "인지 부하 이론(Cognitive Load Theory)에 따라 불필요한 시각적 외재 부하를 제거하여 학생이 핵심 학습 내용에 온전히 집중하도록 돕는 정통 교수설계입니다.",
    ethicalAlternative: "핵심 요약본을 학습자가 필기할 수 있는 여백과 함께 인쇄물로 연계하면 더욱 효과적입니다."
  },
  {
    id: 13,
    title: "미끼 상품(Decoy)을 이용한 고가 패키지 유도",
    situation: "방과후 특강 신청에서 '기본반(10만 원)', '기본반+교재 1권(29만 원)', '기본반+교재 3권+특강 전체(30만 원)'로 구성해 29만 원짜리 미끼를 보고 30만 원을 고르게 유도했습니다.",
    judgment: "manipulation",
    relatedEffectIds: [14, 25, 28],
    rationale: "실질적 가치가 없는 비정상적인 미끼 옵션(Decoy Effect)을 억지로 끼워 넣어 학부모가 가장 비싼 최고가 상품을 선택하도록 심리를 조작하는 상술입니다.",
    ethicalAlternative: "각 옵션의 실제 원가와 교육적 효용에 비례하는 정직하고 공정한 가격 체계를 수립하고 강좌 내용을 비교해야 합니다."
  },
  {
    id: 14,
    title: "교내 캠페인 포스터의 시선 유도 정렬",
    situation: "흡연 예방 포스터에서 건강하게 달리는 청소년 모델의 시선과 달리는 방향 끝에 '맑은 숨, 우리들의 건강한 권리' 슬로건을 배치해 메시지를 명확히 전했습니다.",
    judgment: "persuasion",
    relatedEffectIds: [7, 8, 93],
    rationale: "시선 유도 효과와 연속성의 법칙을 올바르게 적용하여 독자의 시선이 디자이너가 의도한 핵심 공익 메시지에 자연스럽게 도달하도록 돕는 모범적 디자인입니다.",
    ethicalAlternative: "슬로건 하단에 금연 상담 전화번호 등 실질적 도움 경로를 시선 흐름에 맞춰 연결하면 완성도가 더 높아집니다."
  },
  {
    id: 15,
    title: "온라인 설문에서 비동의 선택지에 대한 부정적 암시",
    situation: "학습 만족도 설문에서 '계속 참여하기' 버튼은 밝은 초록색으로 두고, '참여 안 함' 버튼에는 '나는 나의 학습 성장을 포기합니다'라는 문구를 적어두었습니다.",
    judgment: "manipulation",
    relatedEffectIds: [15, 29, 10],
    rationale: "거부 선택지를 누르는 사용자에게 낙인을 찍고 죄책감을 덮어씌우는 컨펌셰이밍(Confirmshaming)으로, 공정한 설문 결과를 왜곡하는 기만적 기법입니다.",
    ethicalAlternative: "동의와 거부 버튼 양쪽에 '예, 계속 참여합니다', '아니오, 이번에는 참여하지 않습니다'처럼 중립적이고 존중하는 문구를 부여해야 합니다."
  },
  {
    id: 16,
    title: "단어 시험 전 성취감 고취를 위한 성공 사례 공유",
    situation: "단어 시험 직전 선생님이 '지난달에 60점을 맞았던 선배도 이 복습법으로 2주 만에 90점을 달성했단다'라며 구체적인 학습 방법을 공유해 자신감을 불어넣었습니다.",
    judgment: "persuasion",
    relatedEffectIds: [4, 22, 101],
    rationale: "피그말리온 효과와 스토리텔링을 통해 학생에게 실현 가능한 롤모델과 긍정적 기대를 제시하여 불안을 낮추고 노력을 이끌어내는 건강한 교육적 설득입니다.",
    ethicalAlternative: "학생 개개인의 현재 수준에 맞춘 작은 성공 경험(Small Win)을 단계별로 설계해주면 더욱 좋습니다."
  },
  {
    id: 17,
    title: "필수 프로그램 설치 화면의 스텔스 번들웨어",
    situation: "수업용 화상회의 프로그램을 설치하는 마법사 창에서 '인터넷 시작페이지 변경 및 스폰서 쇼핑 바로가기 설치'를 숨겨진 하위 옵션에 기본 체크로 끼워 넣었습니다.",
    judgment: "manipulation",
    relatedEffectIds: [47, 51, 99],
    rationale: "스니킹(Sneaking)과 디폴트 효과를 결합하여 사용자의 부주의를 틈타 무관한 상업적 프로그램을 몰래 설치하게 만드는 전형적인 악성 다크 패턴입니다.",
    ethicalAlternative: "추가 소프트웨어 설치는 철저히 분리된 별도 단계에서 명확한 설명과 함께 기본 체크를 해제한 상태로 제공해야 합니다."
  },
  {
    id: 18,
    title: "시험 오답 노트의 색채 위계 구분",
    situation: "오답 노트를 정리할 때 문제 본문은 검은색, 내가 틀린 이유는 파란색, 핵심 문법 규칙은 눈에 띄는 빨간색으로 일관되게 구분하여 복습 효율을 높였습니다.",
    judgment: "persuasion",
    relatedEffectIds: [81, 92, 94],
    rationale: "색채의 기능적 구분(Law of Similarity & Contrast)을 활용해 뇌의 정보 처리 효율을 극대화하고 복습 시 핵심을 빠르게 인출하도록 돕는 훌륭한 시각 전략입니다.",
    ethicalAlternative: "색채 구분에 더해 중요도에 따라 형광펜이나 밑줄 등 형태적 단서를 함께 병행하면 색각 이상자도 쉽게 구분할 수 있습니다."
  },
  {
    id: 19,
    title: "동아리 회비 결제 시 취소 위약금 숨기기",
    situation: "축제 체험 부스 이용권을 온라인 사전 예매로 판매하면서, '행사 당일 환불 절대 불가 및 50% 위약금' 규정을 스크롤을 5번 내려야 보이는 약관 구석에 숨겨두었습니다.",
    judgment: "manipulation",
    relatedEffectIds: [21, 30, 107],
    rationale: "숨겨진 비용(Hidden Costs) 패턴으로, 불리한 거래 조건을 의도적으로 은폐하여 소비자의 합리적인 계약 철회 권리를 침해하는 불공정 디자인입니다.",
    ethicalAlternative: "결제 완료 버튼 바로 직전에 환불 규정과 위약금 조건을 명확하고 굵은 글씨로 상단에 명시하여 확인을 받아야 합니다."
  },
  {
    id: 20,
    title: "학생회장 선거 공약집의 정보 그룹화",
    situation: "후보자의 10가지 공약을 무작위로 나열하지 않고 '학습 환경 / 복지·시설 / 축제·자치' 3개 테마로 분류하고 아이콘과 함께 깔끔하게 묶어 유권자에게 전달했습니다.",
    judgment: "persuasion",
    relatedEffectIds: [44, 89, 90],
    rationale: "청크 원리와 근접의 법칙을 활용해 유권자가 복잡한 정책 공약을 쉽게 비교하고 합리적인 투표 결정을 내릴 수 있도록 돕는 바람직한 정보 설계입니다.",
    ethicalAlternative: "각 공약별 구체적인 실행 일정과 예산 출처를 함께 명시하면 공약의 신뢰도가 더욱 올라갑니다."
  }
]

fs.writeFileSync(outputPath, JSON.stringify(ethicsQuestions, null, 2), 'utf-8')
console.log(`[buildQuizEthics] 총 ${ethicsQuestions.length}개 윤리 판정 퀴즈 데이터를 ${outputPath}에 성공적으로 생성 완료!`)
