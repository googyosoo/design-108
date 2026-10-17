import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = path.join(__dirname, '..', 'src', 'data', 'checklist.json')

const checklistItems = [
  // 1. 시선 흐름 (gazeFlow) - 4문항
  {
    id: 1,
    category: 'gazeFlow',
    categoryKo: '시선 흐름',
    title: '인물의 시선과 손짓이 핵심 정보로 향하는가?',
    description: '화면 속 인물 사진이나 캐릭터의 시선·손가락 끝이 허공이나 화면 밖이 아닌, 가장 중요한 제목이나 버튼을 향하고 있는지 점검합니다.',
    relatedEffectIds: [7, 8, 9],
    passTip: '인물의 시선 방향을 따라 독자의 눈길이 자연스럽게 핵심 카피로 이어집니다.',
    failTip: '인물 사진의 좌우를 반전하거나 위치를 옮겨 핵심 텍스트를 바라보도록 맞추세요.'
  },
  {
    id: 2,
    category: 'gazeFlow',
    categoryKo: '시선 흐름',
    title: '매체에 맞는 최적의 시선 동선(Z/F/N/구텐베르크)을 따르는가?',
    description: '이미지 중심의 웹/포스터는 Z 패턴, 글이 많은 문서는 F 패턴, 세로 모바일 피드는 N 패턴을 따르고 있는지 확인합니다.',
    relatedEffectIds: [105, 106, 107, 108],
    passTip: '시선의 자연스러운 이동 경로 위에 징검다리처럼 정보가 놓여 있어 읽기 편합니다.',
    failTip: '동선 중간에 시선을 가로막는 무거운 요소를 치우고 독서 관례에 맞게 재배치하세요.'
  },
  {
    id: 3,
    category: 'gazeFlow',
    categoryKo: '시선 흐름',
    title: '최종 행동 버튼(CTA)이 시선의 종착점에 놓여 있는가?',
    description: '시선이 화면을 훑고 난 마지막 우측 하단이나 화면 하단 중앙에 핵심 액션(신청하기, 제출, 시작)이 명확히 자리 잡았는지 점검합니다.',
    relatedEffectIds: [103, 105, 106],
    passTip: '내용을 다 읽은 후 망설임 없이 즉각 다음 행동 버튼을 클릭할 수 있습니다.',
    failTip: '본문 한가운데 묻혀 있는 버튼을 화면의 우측 하단이나 고정 하단바로 이동시키세요.'
  },
  {
    id: 4,
    category: 'gazeFlow',
    categoryKo: '시선 흐름',
    title: '시선의 흐름을 유도하는 연속된 시각적 단서가 있는가?',
    description: '화살표, 숫자 번호(1-2-3), 연결선, 곡선 등의 단서를 통해 독자가 어떤 순서로 읽어야 할지 헤매지 않게 돕는지 확인합니다.',
    relatedEffectIds: [9, 93, 100],
    passTip: '번호 매기기와 유도선 덕분에 복잡한 절차도 단번에 순서대로 파악됩니다.',
    failTip: '각 단계마다 명확한 순번 배지(1, 2, 3)를 달아 시선의 길잡이를 놓아주세요.'
  },

  // 2. 가독성 (readability) - 4문항
  {
    id: 5,
    category: 'readability',
    categoryKo: '가독성',
    title: '배경과 텍스트의 명도 대비가 충분히 선명한가?',
    description: '본문 텍스트는 최소 4.5:1, 큰 제목은 최소 3:1 이상의 WCAG 2.2 AA 명도 대비를 만족하여 흐릿하게 보이지 않는지 점검합니다.',
    relatedEffectIds: [10, 78, 92],
    passTip: '햇빛 아래 모바일 화면이나 어두운 교실 프로젝터에서도 글자가 또렷이 읽힙니다.',
    failTip: '연회색 본문 글자를 더 짙은 먹색(#222 또는 토큰)으로 바꾸어 대비를 높이세요.'
  },
  {
    id: 6,
    category: 'readability',
    categoryKo: '가독성',
    title: '복잡한 긴 글이 3~4개의 의미 있는 청크로 나뉘어 있는가?',
    description: '밀러의 법칙에 따라 줄글을 통으로 두지 않고 문단 분할, 소제목, 불릿 포인트 등을 활용해 정보를 삼키기 쉬운 크기로 쪼갰는지 확인합니다.',
    relatedEffectIds: [44, 89, 107],
    passTip: '한눈에 핵심 키워드 3개가 쏙 들어와 긴 글이라도 부담 없이 읽힙니다.',
    failTip: '한 문단이 4줄을 넘지 않도록 나누고, 문단마다 굵은 소제목을 달아주세요.'
  },
  {
    id: 7,
    category: 'readability',
    categoryKo: '가독성',
    title: '한국어 문장에 적절한 단어 줄바꿈(keep-all)이 적용되었는가?',
    description: '조사나 단어의 한 글자만 다음 줄로 외롭게 떨어져 가독성을 해치지 않도록 어절 단위 줄바꿈을 적용했는지 점검합니다.',
    relatedEffectIds: [90, 93, 100],
    passTip: '문맥이 끊기지 않고 자연스러운 호흡으로 한국어 문장이 술술 읽힙니다.',
    failTip: 'CSS 스타일에 word-break: keep-all을 적용해 단어 중간 분절을 방지하세요.'
  },
  {
    id: 8,
    category: 'readability',
    categoryKo: '가독성',
    title: '글꼴의 종류가 한 화면에 2개 이내로 절제되었는가?',
    description: '화려한 장식 서체를 남발하지 않고 고딕/산세리프 계열의 고품질 본문 글꼴 1~2종으로 단정하게 통일했는지 확인합니다.',
    relatedEffectIds: [91, 94, 100],
    passTip: '시각적 피로감이 없고 교과서나 표준 문서처럼 전문적인 신뢰감을 줍니다.',
    failTip: '특이한 손글씨 폰트를 걷어내고 Pretendard 등 가독성이 검증된 단일 본문 폰트로 통일하세요.'
  },

  // 3. 정보 위계 (hierarchy) - 4문항
  {
    id: 9,
    category: 'hierarchy',
    categoryKo: '정보 위계',
    title: '제목, 부제목, 본문의 크기 차이가 확실한 비율로 구별되는가?',
    description: '베버-페히너 법칙에 따라 디자이너 눈에만 보이는 2px 차이가 아닌, 최소 1.5배 이상의 단계적 크기 스케일을 적용했는지 점검합니다.',
    relatedEffectIds: [92, 102, 6],
    passTip: '어디가 대제목이고 어디가 설명글인지 단 0.1초 만에 위계가 구분됩니다.',
    failTip: '대제목을 본문보다 최소 1.8배 이상 키우고 굵기(Bold)를 과감하게 달리하세요.'
  },
  {
    id: 10,
    category: 'hierarchy',
    categoryKo: '정보 위계',
    title: '연관된 정보끼리는 가깝게, 다른 정보와는 멀리 떼어놓았는가?',
    description: '게슈탈트 근접의 법칙에 따라 질문과 보기 사이 간격보다 문항과 문항 사이 여백이 최소 2배 이상 넓은지 확인합니다.',
    relatedEffectIds: [89, 95, 97],
    passTip: '어느 것이 한 묶음인지 따로 설명하지 않아도 직관적으로 파악됩니다.',
    failTip: '동일 그룹 내부 요소 간격은 좁히고, 서로 다른 그룹 사이 여백은 24px 이상 넓히세요.'
  },
  {
    id: 11,
    category: 'hierarchy',
    categoryKo: '정보 위계',
    title: '한 화면에서 시선을 끄는 주인공(폰 레스토프)이 단 하나인가?',
    description: '모든 요소를 화려하게 강조하여 시선이 충돌하지 않고, 오직 가장 중요한 단 하나의 요소만 주인공으로 강조되었는지 점검합니다.',
    relatedEffectIds: [6, 10, 92],
    passTip: '화면을 열자마자 무엇이 핵심 메시지인지 시선이 곧장 꽂힙니다.',
    failTip: '빨간색, 굵은 글씨, 밑줄이 3개 이상 난무한다면 가장 중요한 1개만 남기고 나머지는 차분하게 낮추세요.'
  },
  {
    id: 12,
    category: 'hierarchy',
    categoryKo: '정보 위계',
    title: '수평·수직 격자(Grid)에 맞춰 정렬선이 깔끔하게 맞아떨어지는가?',
    description: '제목, 본문, 이미지의 좌측 시작점이 하나의 보이지 않는 수직 기준선에 단정하게 정렬되어 있는지 점검합니다.',
    relatedEffectIds: [90, 98, 100],
    passTip: '화면 구석구석이 반듯하게 정돈되어 세련되고 프로페셔널한 인상을 줍니다.',
    failTip: '중앙 정렬과 좌측 정렬이 뒤섞여 있다면 좌측 정렬 하나로 일관되게 통일하세요.'
  },

  // 4. 일관성 (consistency) - 4문항
  {
    id: 13,
    category: 'consistency',
    categoryKo: '일관성',
    title: '동일한 기능의 요소는 같은 모양과 색상(유사의 법칙)을 유지하는가?',
    description: '모든 클릭 가능한 버튼이나 링크가 페이지마다 같은 스타일 규칙을 따르고 있어 사용자에게 혼란을 주지 않는지 확인합니다.',
    relatedEffectIds: [94, 99, 100],
    passTip: '한 번 버튼을 누르는 법을 배운 사용자가 다른 화면에서도 헤매지 않고 조작합니다.',
    failTip: '어떤 버튼은 네모, 어떤 버튼은 둥글다면 디자인 시스템 컴포넌트로 일원화하세요.'
  },
  {
    id: 14,
    category: 'consistency',
    categoryKo: '일관성',
    title: '업계 표준 관례(제이콥의 법칙)를 거스르지 않는가?',
    description: '로고 위치(좌상단), 닫기 버튼(우상단), 검색창 돋보기 등 사용자가 이미 다른 앱에서 체득한 표준적 배치를 준수하는지 점검합니다.',
    relatedEffectIds: [100, 101, 99],
    passTip: '별도의 사용 설명서 없이도 누구나 직관적으로 사이트를 탐색할 수 있습니다.',
    failTip: '닫기 버튼이나 메뉴 아이콘을 엉뚱한 위치에 숨기지 말고 가장 익숙한 관례 자리로 돌려놓으세요.'
  },
  {
    id: 15,
    category: 'consistency',
    categoryKo: '일관성',
    title: '아이콘의 선 굵기와 스타일이 전체 화면에서 통일되어 있는가?',
    description: '단일 아이콘 팩(예: Lucide)을 사용해 선 두께, 모서리 곡률, 크기 규격이 조화롭게 어우러지는지 확인합니다.',
    relatedEffectIds: [91, 94, 98],
    passTip: '아이콘 하나하나가 따로 놀지 않고 완성도 높은 디자인 시스템의 일부로 느껴집니다.',
    failTip: '채워진 실루엣 아이콘과 얇은 라인 아이콘이 뒤섞여 있다면 라인 아이콘 1종으로 통일하세요.'
  },
  {
    id: 16,
    category: 'consistency',
    categoryKo: '일관성',
    title: '색상 팔레트가 주조색 60%, 보조색 30%, 강조색 10% 규칙을 지키는가?',
    description: '원색을 무분별하게 남발하지 않고 통제된 색채 팔레트 안에서 조화롭게 배색되었는지 점검합니다.',
    relatedEffectIds: [78, 86, 92],
    passTip: '눈이 편안하고 브랜드나 과목의 고유 정체성이 명확하게 드러납니다.',
    failTip: '화면에 사용된 색상이 4가지를 넘는다면 배경 톤과 포인트 컬러 1개로 절제하세요.'
  },

  // 5. 접근성 (accessibility) - 4문항
  {
    id: 17,
    category: 'accessibility',
    categoryKo: '접근성',
    title: '터치 및 클릭 타깃의 크기가 최소 44×44px 이상인가?',
    description: '피츠의 법칙과 모바일 접근성 표준에 따라 손가락으로 누르는 모든 버튼과 링크 영역이 넉넉한 유효 면적을 확보했는지 점검합니다.',
    relatedEffectIds: [103, 51, 99],
    passTip: '버스 안이나 걸어가는 중에도 오타나 헛터치 없이 편안하게 조작할 수 있습니다.',
    failTip: '너무 작은 닫기 X 버튼이나 체크박스에 투명 패딩을 추가해 터치 영역을 44px 이상으로 키우세요.'
  },
  {
    id: 18,
    category: 'accessibility',
    categoryKo: '접근성',
    title: '색상에만 의존하지 않고 형태나 텍스트 단서를 함께 제공하는가?',
    description: '색각 이상자도 상태를 분간할 수 있도록 필수 입력 항목에 붉은색뿐 아니라 별표(*)나 라벨을 함께 병기했는지 확인합니다.',
    relatedEffectIds: [78, 99, 100],
    passTip: '흑백 프린터로 인쇄하거나 색각 이상이 있는 학습자도 내용을 완벽히 식별합니다.',
    failTip: '오류 필드에 붉은 테두리만 두르지 말고 "필수 입력 항목입니다"라는 텍스트 경고를 함께 표시하세요.'
  },
  {
    id: 19,
    category: 'accessibility',
    categoryKo: '접근성',
    title: '키보드 조작 시 포커스 링이 선명하게 노출되는가?',
    description: 'Tab 키로 이동할 때 현재 어느 버튼이나 링크에 위치해 있는지 2px 이상의 선명한 외곽선 포커스 링이 표시되는지 점검합니다.',
    relatedEffectIds: [99, 100, 104],
    passTip: '마우스 없이 키보드나 보조공학 기기만으로도 웹앱의 모든 기능을 원활히 조작합니다.',
    failTip: 'outline: none으로 포커스 링을 강제로 숨긴 스타일을 제거하고 고대비 포커스 스타일을 부여하세요.'
  },
  {
    id: 20,
    category: 'accessibility',
    categoryKo: '접근성',
    title: '모션 줄이기(prefers-reduced-motion) 설정을 배려했는가?',
    description: '어지러움이나 전정기관 장애가 있는 사용자를 위해 과도한 화면 회전이나 깜빡이는 애니메이션을 즉각 멈출 수 있는지 확인합니다.',
    relatedEffectIds: [96, 60, 64],
    passTip: '착시 효과나 화려한 애니메이션으로 인한 시각적 멀미를 방지하고 편안한 관람을 돕습니다.',
    failTip: 'CSS 미디어 쿼리 @media (prefers-reduced-motion: reduce)를 통해 전환 효과를 단순 페이드로 낮추세요.'
  }
]

fs.writeFileSync(outputPath, JSON.stringify(checklistItems, null, 2), 'utf-8')
console.log(`[buildChecklist] 총 ${checklistItems.length}개 수동 체크리스트 항목을 ${outputPath}에 성공적으로 생성 완료!`)
