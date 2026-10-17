/**
 * 053 - 078 원리 데이터 모듈 (착시 효과 26개)
 */
export const effects053to078 = [
  {
    id: 53, code: "053", slug: "munker-illusion", chapter: "illusion",
    nameKo: "문커 착시", nameEn: "Munker Illusion", aliasesKo: ["명암 격자 착시"],
    oneLiner: "같은 색이라도 앞을 가로지르는 줄무늬에 따라 다른 색으로 보인다.",
    oneLinerEn: "The same color appears drastically different depending on the overlying stripes.",
    why: "눈의 망막과 뇌 시각 피질이 미세한 색상을 개별적으로 식별하지 않고 인접한 전경 줄무늬 색상과 평균을 내어 혼합 지각(색채 동화)하기 때문이에요.",
    analogy: "같은 회색 옷을 입고 있어도 노란 조명 아래 서면 옷까지 노랗게 물들어 보이는 것과 같아요.",
    apply: {
      classroom: "학습지 도표에서 겹치는 격자선이 데이터 막대의 고유 색상을 왜곡하지 않게 주의하세요.",
      webapp: "차트 위에 반투명 줄무늬 패턴을 얹을 때 데이터 수치 색상이 변색되어 보이지 않게 점검하세요.",
      print: "배경에 미세한 사선 패턴이 들어간 포스터에서 글씨 색상이 탁해지지 않도록 대비를 확보하세요."
    },
    doList: ["정확한 색상 구분이 필요한 핵심 지표 뒤에는 복잡한 격자 패턴을 깔지 않는다", "착시로 인한 색채 왜곡을 보정하기 위해 색상 외에 텍스트 수치를 반드시 함께 표기한다"],
    dontList: ["배경 무늬 때문에 본문 색상이 다르게 보이는 실수를 방치하지 않는다", "눈을 어지럽히는 과도한 반복 스트라이프로 시각적 피로감을 유발하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "데이터 차트의 막대 색상이 배경 줄무늬에 의해 왜곡되지 않도록 단색 배경 위에 깔끔하게 올려 줘.",
      en: "Render data bars on a solid neutral background to prevent Munker color assimilation distortion."
    },
    english: { term: "Munker illusion", example: "The Munker illusion demonstrates how overlapping foreground stripes alter perceived background colors.", keyVocab: ["illusion", "stripes", "assimilation"] },
    purposeTags: ["perception", "readability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "illusion", demoConfig: { component: "Munker", reveal: "두 영역의 기본 원형 색상은 모두 동일한 RGB(230, 180, 80)입니다." },
    related: [54, 77, 78], caseIds: [], level: 2, factNote: "Hans Munker, 1970"
  },
  {
    id: 54, code: "054", slug: "munker-white-illusion", chapter: "illusion",
    nameKo: "문커-화이트 착시", nameEn: "Munker-White Illusion", aliasesKo: ["화이트 착시"],
    oneLiner: "검은 줄 사이의 회색은 더 어둡게, 흰 줄 사이는 더 밝게 보인다.",
    oneLinerEn: "Identical grey bars appear lighter when surrounded by white stripes, and darker by black.",
    why: "명암 대비와 공간 주파수의 상호작용으로 인해 뇌가 인접한 줄무늬의 밝기 방향으로 회색을 동화시켜 지각해요.",
    analogy: "같은 회색 신발이라도 하얀 양말 위에 신으면 더 밝고 깨끗해 보이는 착각이에요.",
    apply: {
      classroom: "슬라이드 줄글 사이의 구분선 두께가 본문 글자 밝기에 영향을 주지 않도록 정돈하세요.",
      webapp: "테이블 표의 얼룩말(Zebra) 줄무늬 배경이 내부 텍스트 명도를 왜곡하지 않게 은은하게 깔으세요.",
      print: "시험지 인쇄 시 격자선 명도가 정답 체크 표시를 흐리게 만들지 않는지 감리하세요."
    },
    doList: ["줄무늬 배경 위의 텍스트는 테두리 스트로크를 주어 배경 간섭을 원천 차단한다", "줄무늬 배경의 투명도를 5% 이내로 낮춰 내부 콘텐츠의 시인성을 지킨다"],
    dontList: ["강한 흑백 대비 줄무늬 위에 얇은 회색 본문 글씨를 얹어 눈을 피로하게 만들지 않는다", "명암 착시를 고려하지 않고 배경과 글자 명도를 어정쩡하게 맞추지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "테이블의 지브라 줄무늬 배경을 은은한 3% 그레이로 낮춰 내부 텍스트의 가독성을 보호해 줘.",
      en: "Lower alternating table row stripes to a subtle 3% tint so text brightness is not distorted."
    },
    english: { term: "White's illusion", example: "White's illusion reminds UI designers to keep alternating table backgrounds extremely subtle.", keyVocab: ["alternating", "brightness", "distortion"] },
    purposeTags: ["perception", "readability"], mediaTags: ["worksheet", "webapp"],
    demoType: "illusion", demoConfig: { component: "MunkerWhite", reveal: "양쪽 회색 직사각형의 실제 명도는 정확히 50% 중성 회색(#808080)입니다." },
    related: [53, 57, 78], caseIds: [], level: 2, factNote: "Michael White, 1979"
  },
  {
    id: 55, code: "055", slug: "color-constancy", chapter: "illusion",
    nameKo: "색채 항상성", nameEn: "Color Constancy", aliasesKo: ["색채 보정 본능"],
    oneLiner: "조명 색이 바뀌어도 뇌는 사물 본래의 고유한 색을 그대로 알아본다.",
    oneLinerEn: "The visual system perceives constant surface colors despite drastic shifts in ambient lighting.",
    why: "뇌는 주변 환경광의 파장을 계산해 조명 색을 자동으로 차감하고 사물 본래의 반사율을 복원하는 고도의 보정 연산을 수행합니다.",
    analogy: "노란 백열등 아래에 사과를 놓아도 우리는 사과를 노란색이 아니라 여전히 빨간색으로 인식해요.",
    apply: {
      classroom: "미술 수업 슬라이드에서 조명 환경에 따른 색상 추출 스포이트 실습 자료로 쓰세요.",
      webapp: "다크 모드와 라이트 모드 전환 시 브랜드 고유 색상의 정체성이 유지되도록 명도를 미세 조정하세요.",
      print: "누런 재생지나 미색 종이에 인쇄할 때 잉크 색상이 본래 의도대로 보정되도록 감리하세요."
    },
    doList: ["다크 모드 배경에서는 채도를 살짝 낮추어 눈부심을 막고 본래 색상 인상을 보존한다", "배경 조명 톤에 구애받지 않도록 핵심 아이콘에 충분한 대비 경계를 부여한다"],
    dontList: ["다크 모드라고 해서 라이트 모드의 원색 코드를 그대로 복사해 눈을 찌르게 하지 않는다", "주변 색조의 변화를 무시한 채 고정된 절대값 색상만 고집하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "다크 모드 전환 시 브랜드 블루의 명도를 10% 높이고 채도를 5% 낮춰 고유 색감을 자연스럽게 유지해 줘.",
      en: "Adjust brand color luminance slightly in dark mode to preserve perceptual color constancy."
    },
    english: { term: "color constancy", example: "Color constancy allows our brain to recognize brand logos accurately under warm or cool screen tints.", keyVocab: ["constancy", "perceive", "ambient"] },
    purposeTags: ["perception", "emotion"], mediaTags: ["slide", "webapp"],
    demoType: "illusion", demoConfig: { component: "ColorConstancy", reveal: "푸른 필터와 붉은 필터 아래의 패치는 물리적으로 동일한 무채색 회색입니다." },
    related: [56, 78, 81], caseIds: [], level: 2, factNote: null
  },
  {
    id: 56, code: "056", slug: "the-dress-illusion", chapter: "illusion",
    nameKo: "환경광의 착시", nameEn: "The Dress Illusion", aliasesKo: ["파검 흰금 드레스", "조명 추정 착시"],
    oneLiner: "주변 조명을 어떻게 추론하느냐에 따라 같은 옷의 색상이 다르게 보인다.",
    oneLinerEn: "Differences in assumed ambient light cause the same dress to appear blue/black or white/gold.",
    why: "조명 정보가 모호한 사진을 볼 때, 뇌가 푸른 그늘빛을 보정하면 흰색-금색으로 보이고, 밝은 햇빛을 보정하면 파란색-검은색으로 해석하기 때문이에요.",
    analogy: "2015년 전 세계를 뜨겁게 달구었던 파검 vs 흰금 드레스 사진 논쟁의 바로 그 원리예요.",
    apply: {
      classroom: "과학과 미술 융합 수업에서 인간 시각 뇌의 개별 해석 차이를 설명하는 최고 교재로 쓰세요.",
      webapp: "모바일 화면의 트루톤(True Tone) 기능이 앱 인터페이스 색상에 미치는 영향을 안내하세요.",
      print: "야외용 현수막 디자인 시 한낮 태양광과 그늘 아래에서 색상이 어떻게 달라지는지 검토하세요."
    },
    doList: ["서로 다른 시각적 경험이 뇌의 무의식적 가설 차이에서 비롯됨을 상호 존중 교육에 활용한다", "색상 전달이 결정적인 제품 사진에는 주변 환경광 힌트를 명확히 함께 배치한다"],
    dontList: ["사진 원본을 무단 복제해 저작권을 침해하지 않고 도형과 그라디언트로 현상을 재설계한다", "내 눈에 보이는 색만 옳다고 우기며 타인의 지각 차이를 틀린 것으로 매도하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "조명 그라디언트 슬라이더를 조절함에 따라 중앙 줄무늬가 밝거나 어둡게 전환되는 데모를 구성해 줘.",
      en: "Build an interactive SVG demonstrating how assumed lighting flips perceived stripe colors."
    },
    english: { term: "ambient illumination illusion", example: "The famous dress controversy proves that visual perception is an active inference, not a passive camera.", keyVocab: ["illumination", "inference", "controversy"] },
    purposeTags: ["perception", "readability"], mediaTags: ["slide", "worksheet"],
    demoType: "illusion", demoConfig: { component: "TheDress", reveal: "픽셀의 실제 색상 코드는 탁한 하늘색(#7D8CB4)과 어두운 갈색(#5B4C38)입니다." },
    related: [55, 57, 78], caseIds: [], level: 3, factNote: "Brainard & Hurlbert, 2015"
  },
  {
    id: 57, code: "057", slug: "checker-shadow-illusion", chapter: "illusion",
    nameKo: "체커 그림자 착시", nameEn: "Checker Shadow Illusion", aliasesKo: ["아델슨 체커 착시"],
    oneLiner: "그림자 속 밝은 칸과 빛 아래 어두운 칸의 실제 밝기는 똑같다.",
    oneLinerEn: "A square in shadow appears much lighter than an identical square in direct light.",
    why: "뇌는 원통 그림자가 드리워진 영역의 반사율을 무의식적으로 보정해 계산해요. 그림자 속 칸은 원래 밝은 체크무늬라는 맥락을 감안해 뇌가 색을 밝게 부풀립니다.",
    analogy: "동일한 회색 종이인데도 그늘진 곳에 놓이면 뇌가 알아서 '원래 하얀 종이구나'라고 믿는 것과 같아요.",
    apply: {
      classroom: "그림자가 진 교실 칠판 구석의 글씨도 학생들이 선명히 읽을 수 있도록 조명을 조절하세요.",
      webapp: "UI에서 버튼에 드롭 섀도우를 줄 때 그림자 속 배경 텍스트가 묻히지 않게 명도를 챙기세요.",
      print: "입체 도해 일러스트에서 그림자 영역 내부의 텍스트 대비를 의도적으로 2단계 높이세요."
    },
    doList: ["3D 그림자가 드리워진 영역 내의 라벨이나 텍스트는 명도를 추가로 보정해 가독성을 사수한다", "실제 RGB 수치를 스포이트로 찍어 확인하며 디자인 감리를 수행한다"],
    dontList: ["그림자 효과를 과도하게 주어 그늘진 카드 속 본문이 칙칙하게 가려지도록 방치하지 않는다", "사람의 눈대중 밝기만을 믿고 접근성 명도 대비 수치를 무시하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "체커보드 원통 그림자 인터랙티브 SVG를 제작하고, 두 체크 타일을 잇는 브릿지 바 토글을 만들어 줘.",
      en: "Create the Adelson checkerboard shadow SVG with a toggleable connecting bridge bar."
    },
    english: { term: "checker shadow illusion", example: "Adelson's checker shadow illusion proves that our brain discounts shadows when judging lightness.", keyVocab: ["checkerboard", "discount", "luminance"] },
    purposeTags: ["perception", "readability"], mediaTags: ["slide", "worksheet"],
    demoType: "illusion", demoConfig: { component: "CheckerShadow", reveal: "체커 A(햇빛 아래 어두운 칸)와 체커 B(그림자 속 밝은 칸)의 색상은 정확히 동일한 #787878입니다." },
    related: [54, 55, 61], caseIds: [], level: 3, factNote: "Edward H. Adelson, 1995"
  },
  {
    id: 58, code: "058", slug: "ehrenstein-illusion", chapter: "illusion",
    nameKo: "에렌슈타인 착시", nameEn: "Ehrenstein Illusion", aliasesKo: ["단절선 원 착시"],
    oneLiner: "선들의 중심이 비어 있으면 그 자리에 밝은 가상 원이 떠오른다.",
    oneLinerEn: "Discontinued radial lines produce an illusory bright circle in the central empty gap.",
    why: "선들이 특정 영역 앞에서 일제히 끊어지면, 시각 피질은 단절을 설명하기 위해 그 자리에 빛나는 밝은 원형 물체가 가로막고 있다고 가상의 윤곽선을 만듭니다.",
    analogy: "동그랗게 모여 선 친구들 사이에 실제로는 아무도 없는데 보이지 않는 둥근 무대가 있는 것 같아요.",
    apply: {
      classroom: "방사형으로 뻗은 도표 중심에 빈 원을 두어 핵심 키워드가 저절로 빛나 보이게 유도하세요.",
      webapp: "집중을 모으는 로딩 화면이나 엠블럼 중앙 영역에 단절선을 활용해 자연스러운 시선을 모으세요.",
      print: "학급 문집 표지에서 방사형 라인 중앙의 공백에 학교 이름이나 슬로건을 배치하세요."
    },
    doList: ["선 끝의 단절 지점을 정교하게 맞춰 인지적 윤곽선을 만든다", "중심부 여백을 활용해 테두리선 없이도 주목도 높은 타이포그래피 공간을 확보한다"],
    dontList: ["단절선의 간격이 들쭉날쭉해 착시 윤곽이 깨지고 지저분해 보이지 않게 주의한다", "화려한 선 장식이 정작 중심부의 텍스트 가독성을 침범하지 않게 거리를 둔다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "방사형 선 16개가 중심에서 40px 직경으로 일제히 끊어지며 가상의 밝은 원을 만드는 SVG를 짜 줘.",
      en: "Render an Ehrenstein illusion SVG with 16 radial lines interrupted to create an illusory central disc."
    },
    english: { term: "Ehrenstein illusion", example: "The Ehrenstein illusion generates a luminous circular boundary without a single drawn curve.", keyVocab: ["luminous", "boundary", "contour"] },
    purposeTags: ["attention", "perception"], mediaTags: ["slide", "poster"],
    demoType: "illusion", demoConfig: { component: "Ehrenstein", reveal: "중앙 원 영역에는 어떠한 원형 테두리나 색상 칠도 없으며, 선 단절이 만든 순수한 뇌의 착각입니다." },
    related: [59, 63, 95], caseIds: [], level: 2, factNote: "Walter Ehrenstein, 1941"
  },
  {
    id: 59, code: "059", slug: "neon-color-spreading", chapter: "illusion",
    nameKo: "네온 색 확산 효과", nameEn: "Neon Color Spreading", aliasesKo: ["네온 발광 착시"],
    oneLiner: "검은 선 사이의 색선이 투명한 네온 빛처럼 빈 공간으로 번져 보인다.",
    oneLinerEn: "Colored line segments within a black grid appear to diffuse outward like a glowing neon veil.",
    why: "뇌는 선 위의 색상 정보와 단절된 윤곽선을 결합하면서, 그 색을 띤 반투명한 필터가 선 위에 덮여 있다고 착각해 색을 주변 공백으로 확산시켜 채웁니다.",
    analogy: "철조망 일부에 형광 페인트를 칠해두면 마치 그 주변 공기 전체가 은은하게 빛나는 것 같아요.",
    apply: {
      classroom: "어두운 테마의 과학 발표 슬라이드에서 은은하게 발광하는 미래지향적 뱃지를 표현하세요.",
      webapp: "웹앱의 액티브 탭이나 알림 뱃지에 네온 글로우(Glow) 효과를 주어 세련된 입체감을 연출하세요.",
      print: "학교 축제 야간 행사 포스터의 네온사인 그래픽을 선의 색채 확산 원리로 디자인하세요."
    },
    doList: ["검은색 선과 채도 높은 원색 세그먼트의 연결 부위를 매끄럽게 정렬한다", "은은한 반투명 네온 빛으로 첨단 기술이나 미래지향적인 분위기를 조성한다"],
    dontList: ["확산 효과를 너무 과도하게 번지게 해 글자의 획을 뭉개버리지 않는다", "낮은 명도 대비의 흐리멍덩한 색상을 써서 착시가 일어나지 않고 지저분해 보이게 하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "십자 격자선 중앙부에 시안(Cyan) 색상 마디를 주어 중앙에 푸른 네온 빛이 퍼져 보이는 SVG를 구성해 줘.",
      en: "Build a neon color spreading SVG grid where colored inner segments cast an illusory glowing veil."
    },
    english: { term: "neon color spreading", example: "Neon color spreading creates an ethereal glowing effect ideal for nocturnal festival posters.", keyVocab: ["diffuse", "luminous", "ethereal"] },
    purposeTags: ["emotion", "emphasis"], mediaTags: ["poster", "slide", "webapp"],
    demoType: "illusion", demoConfig: { component: "NeonSpreading", reveal: "중앙 마디 외의 여백에는 색이 전혀 칠해져 있지 않으며, 순수한 뇌의 색채 채우기(Filling-in) 현상입니다." },
    related: [58, 63, 78], caseIds: [], level: 2, factNote: "Dario Varin, 1971"
  },
  {
    id: 60, code: "060", slug: "fraser-illusion", chapter: "illusion",
    nameKo: "프레이저 착시", nameEn: "Fraser Illusion", aliasesKo: ["거짓 나선 착시", "꼬인 밧줄 착시"],
    oneLiner: "완전히 닫힌 동심원이 꼬인 패턴 때문에 소용돌이 나선처럼 보인다.",
    oneLinerEn: "Concentric circular rings appear to spiral inward due to tilted herringbone segments.",
    why: "국소적인 짧은 사선들이 안쪽으로 기울어져 있으면, 뇌의 방향 감지 뉴런들이 국소 기울기를 따라가며 전체 원형을 나선형 회오리로 오독하기 때문이에요.",
    analogy: "동그란 훌라후프를 겹쳐 놓았는데 밧줄 꼬임 때문에 안으로 끝없이 빨려 들어가는 소용돌이 같아요.",
    apply: {
      classroom: "착시 원리를 활용한 디자인 창의성 실습에서 시각 패턴의 인지 왜곡 탐구에 쓰세요.",
      webapp: "로딩 스피너 디자인 시 나선형 착시 모티프를 활용해 회전 속도감을 역동적으로 연출하세요.",
      print: "창의 융합 페스티벌 리플릿 표지에 사람들의 시선을 압도하는 키 비주얼로 활용하세요."
    },
    doList: ["정확한 동심원임을 사용자가 직접 마우스 커서나 눈금선으로 확인할 수 있는 인터랙션을 둔다", "시선을 사로잡는 강력한 시각적 훅(Hook)으로 표지나 인트로에 제한적으로 쓴다"],
    dontList: ["본문 글씨 뒤에 배경 패턴으로 깔아 심한 어지럼증과 시각 피로를 초래하지 않는다", "광과민성 발작 위험이 있는 미세 격자 깜빡임 애니메이션과 결합하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "완벽한 동심원 4개에 빗살 꼬임 무늬를 둘러 나선형으로 착각되는 프레이저 착시 SVG를 제작해 줘.",
      en: "Generate a Fraser spiral illusion SVG using concentric circles overlaid with directional chevrons."
    },
    english: { term: "Fraser spiral illusion", example: "The Fraser illusion tricks the eye into seeing an endless inward spiral instead of concentric rings.", keyVocab: ["concentric", "spiral", "directional"] },
    purposeTags: ["attention", "perception"], mediaTags: ["poster", "slide"],
    demoType: "illusion", demoConfig: { component: "Fraser", reveal: "원을 하나 손가락으로 따라가 보면 소용돌이가 아니라 출발점으로 되돌아오는 완벽한 동심원입니다." },
    related: [62, 71, 74], caseIds: [], level: 3, factNote: "James Fraser, 1908"
  },
  {
    id: 61, code: "061", slug: "mach-band-illusion", chapter: "illusion",
    nameKo: "마흐 밴드 착시", nameEn: "Mach Band Illusion", aliasesKo: ["마흐 띠 착시", "측두 억제"],
    oneLiner: "명암 경계선 옆에 실제로는 없는 가상의 밝고 어두운 띠가 맺힌다.",
    oneLinerEn: "Exaggerated light and dark bands appear at the borders between shaded steps.",
    why: "망막 세포의 '측두 억제(Lateral Inhibition)' 신경망이 경계선의 대비를 극대화해 모서리를 재빨리 감지하려고 밝은 쪽은 더 밝게, 어두운 쪽은 더 어둡게 과장해요.",
    analogy: "계단식 명암 표를 볼 때 경계면 모서리마다 얇은 형광펜을 그어놓은 것처럼 선명해 보이는 현상이에요.",
    apply: {
      classroom: "슬라이드 차트에서 인접한 막대 색상 간의 경계면 띠 착시가 수치 오인을 주지 않게 하세요.",
      webapp: "그라디언트 밴딩(Color banding) 현상을 방지하기 위해 디더링(Dithering)을 적용하세요.",
      print: "인쇄물에서 은은한 음영 그라데이션이 계단 현상 없이 매끄럽게 출력되는지 농도를 조절하세요."
    },
    doList: ["경계면의 인위적 과장을 막기 위해 색상 단계 사이에 미세한 1px 흰색 구분선을 둔다", "디지털 화면에서 계단식 그라디언트 대신 부드러운 연속 톤을 구현한다"],
    dontList: ["명암이 끊기는 그래픽을 방치해 모서리에 원치 않는 얼룩 띠를 만들지 않는다", "수치 비교용 히트맵에서 마흐 밴드로 인해 경계부 수치가 왜곡되어 읽히게 두지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "밝기 단계가 다른 6개 직사각형을 나란히 배열하고, 경계선 클릭 시 평탄한 단색임을 보이는 SVG를 짜 줘.",
      en: "Create a Mach bands SVG demonstrating exaggerated contrast bands at step-gradient boundaries."
    },
    english: { term: "Mach bands", example: "Mach bands explain why stepping gradients create exaggerated edge lines at brightness transitions.", keyVocab: ["gradient", "transition", "inhibition"] },
    purposeTags: ["perception", "readability"], mediaTags: ["slide", "worksheet"],
    demoType: "illusion", demoConfig: { component: "MachBands", reveal: "각 사각형 내부의 명도는 균일한 단색이며, 모서리에 보이는 밝거나 어두운 줄무늬는 망막의 착각입니다." },
    related: [54, 57, 78], caseIds: [], level: 2, factNote: "Ernst Mach, 1865"
  },
  {
    id: 62, code: "062", slug: "zollner-illusion", chapter: "illusion",
    nameKo: "쵤너 착시", nameEn: "Zöllner Illusion", aliasesKo: ["빗살 평행선 착시"],
    oneLiner: "나란한 평행선이 엇갈린 빗살 무늬 때문에 사선으로 기울어져 보인다.",
    oneLinerEn: "Parallel straight lines appear tilted and divergent due to intersecting diagonal slashes.",
    why: "교차하는 짧은 사선들의 예각을 뇌가 실제 각도보다 더 넓은 둔각으로 과대평가하여 지각하기 때문에, 전체 평행선이 삐뚤빼뚤 벌어지거나 오므라들어 보입니다.",
    analogy: "똑바른 철길 레일 침목이 사선으로 어긋나게 깔려 있으면 레일 자체가 굽어 보이는 느낌이에요.",
    apply: {
      classroom: "표나 레이아웃을 디자인할 때 배경의 격자 빗살 패턴이 텍스트 수평선을 왜곡하지 않게 하세요.",
      webapp: "테이블 외곽선이나 카드 테두리 바로 곁에 사선 해치 패턴을 배치하지 마세요.",
      print: "책 표지나 리플릿에서 수평 로고 뒤에 각도가 엇갈리는 배경 빗금을 과하게 넣지 마세요."
    },
    doList: ["배경에 빗살 무늬를 넣을 때는 주 텍스트와 24px 이상 이격해 수평선 왜곡을 방지한다", "수평 수직 정렬이 정확한지 그리드 안내선(Guide)을 켜고 객관적으로 확인한다"],
    dontList: ["배경 사선 장식 때문에 텍스트 줄이 삐뚤빼뚤 기울어 보이게 두지 않는다", "눈대중만 믿고 '기울어 보인다'며 실제 수평 평행선을 임의로 꺾어 왜곡하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "평행선 4개에 엇갈린 빗살을 둘러 기울어져 보이게 한 뒤, 빗살을 제거하는 토글이 있는 SVG를 제작해 줘.",
      en: "Render a Zöllner illusion SVG with a toggle button that strips away the diagonal hatched lines."
    },
    english: { term: "Zöllner illusion", example: "The Zöllner illusion cautions designers against placing hatched textures behind horizontal lines.", keyVocab: ["parallel", "intersect", "distortion"] },
    purposeTags: ["perception", "readability"], mediaTags: ["slide", "worksheet"],
    demoType: "illusion", demoConfig: { component: "Zollner", reveal: "긴 직선들은 오차 없이 완벽한 0도 수평 평행선입니다." },
    related: [60, 65, 90], caseIds: [], level: 2, factNote: "Johann Karl Friedrich Zöllner, 1860"
  },
  {
    id: 63, code: "063", slug: "kanizsa-triangle", chapter: "illusion",
    nameKo: "카니자 삼각형", nameEn: "Kanizsa Triangle", aliasesKo: ["가상 윤곽선 삼각형"],
    oneLiner: "실제 선이 없어도 팩맨 원 3개가 온전한 흰색 삼각형을 만들어낸다.",
    oneLinerEn: "Three packman shapes induce the vivid perception of a solid bright white triangle in the center.",
    why: "뇌는 파편화된 조각들을 볼 때 하나의 완전한 형태(게슈탈트 폐쇄성)로 묶어 해석하길 좋아해요. 가려진 틈을 채우기 위해 가상의 경계선과 밝기 차이를 스스로 창조합니다.",
    analogy: "세 친구가 각자 한 입 베어 문 피자를 모았을 때 가운데에 투명한 삼각 조각이 떠 있는 착각이에요.",
    apply: {
      classroom: "창의 미술이나 수학 수업에서 '선 없이도 형태를 만드는 네거티브 스페이스' 원리로 지도하세요.",
      webapp: "테두리 선을 빽빽하게 두르지 않고도 여백과 모서리 요소의 배치만으로 카드 형태를 암시하세요.",
      print: "미니멀한 로고나 심볼 디자인에서 여백이 스스로 만들어내는 상징 형태를 연출하세요."
    },
    doList: ["불필요한 테두리 박스를 줄이고 주변 요소의 배치로 세련된 가상 영역을 만든다", "네거티브 스페이스(여백의 형태)를 활용해 위트 있고 인상적인 그래픽을 설계한다"],
    dontList: ["가상 윤곽선이 성립할 수 없을 정도로 주변 팩맨 요소의 배치가 흐트러지게 방치하지 않는다", "너무 모호하게 여백을 파두어 사용자가 경계를 인식하지 못하고 헤매게 만들지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "팩맨 모양 3개와 V자 선 3개를 배치해 중앙에 선명한 역삼각형이 저절로 떠오르는 SVG를 짜 줘.",
      en: "Construct the Kanizsa triangle SVG to demonstrate illusory contours emerging from negative space."
    },
    english: { term: "Kanizsa triangle", example: "The Kanizsa triangle reveals the brain's instinct to complete missing boundaries using negative space.", keyVocab: ["contour", "closure", "negative"] },
    purposeTags: ["perception", "emphasis"], mediaTags: ["slide", "poster", "worksheet"],
    demoType: "illusion", demoConfig: { component: "Kanizsa", reveal: "중앙 삼각형에는 실선 테두리가 0개이며, 배경색과 정확히 동일한 #FAF8F4 종이색입니다." },
    related: [58, 59, 95], caseIds: [], level: 1, factNote: "Gaetano Kanizsa, 1955"
  },
  {
    id: 64, code: "064", slug: "hermann-grid-illusion", chapter: "illusion",
    nameKo: "헤르만 격자 착시", nameEn: "Hermann Grid Illusion", aliasesKo: ["격자 교차점 회색 점"],
    oneLiner: "검은 격자 사이의 흰 교차로를 볼 때 주변 길목마다 회색 점이 깜빡인다.",
    oneLinerEn: "Ghostly grey smudges flicker at the intersections of a white grid on a black background.",
    why: "십자 교차로는 사방에서 흰빛이 들어오므로 직선 길목보다 망막의 측두 억제를 4배 강하게 받아요. 그 결과 뇌가 교차점의 밝기를 떨어뜨려 회색 점을 보게 됩니다.",
    analogy: "바둑판 눈금을 멍하니 바라보고 있으면 교차점마다 연한 회색 먼지가 깜빡깜빡 맺히는 느낌이에요.",
    apply: {
      classroom: "사진 갤러리나 바둑판식 카드 레이아웃에서 사진 간격이 너무 좁아 점이 깜빡이지 않게 하세요.",
      webapp: "모바일 사진 격자 뷰에서 경계선 두께를 충분히 넓히거나 배경 명도를 차분하게 조절하세요.",
      print: "시간표나 시험 일정표를 짤 때 굵은 검은색 테두리 대신 얇은 연회색 선을 사용하세요."
    },
    doList: ["격자형 카드 뷰를 만들 때 타일 간격을 넓히거나 배경과 타일의 명도 차이를 완화한다", "표 테두리 선은 새까만 검은색 대신 은은한 경계선 토큰(--color-line)을 쓴다"],
    dontList: ["새까만 배경에 새하얀 격자를 촘촘히 배열해 사용자의 눈에 극심한 깜빡임 피로를 주지 않는다", "사진 그리드 간격을 1~2px로 좁게 붙여 교차로마다 눈부신 고스트 현상을 방치하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "헤르만 격자 SVG를 만들고, 교차로 선 색상을 연회색으로 바꾸면 깜빡임이 사라지는 토글을 넣어 줘.",
      en: "Build a Hermann grid SVG with a control to soften grid contrast, eliminating phantom intersection dots."
    },
    english: { term: "Hermann grid illusion", example: "Softer grid lines prevent the Hermann grid illusion from straining users' eyes during long study sessions.", keyVocab: ["intersection", "phantom", "contrast"] },
    purposeTags: ["perception", "readability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "illusion", demoConfig: { component: "HermannGrid", reveal: "교차로를 정면으로 똑바로 쳐다보면 중심와(Fovea)의 좁은 수용장 덕분에 회색 점이 사라집니다." },
    related: [54, 61, 78], caseIds: [], level: 2, factNote: "Ludimar Hermann, 1870"
  },
  {
    id: 65, code: "065", slug: "muller-lyer-illusion", chapter: "illusion",
    nameKo: "뮐러-리어 착시", nameEn: "Müller-Lyer Illusion", aliasesKo: ["화살표 선 착시"],
    oneLiner: "길이가 같은 선도 끝에 달린 화살표 방향에 따라 길거나 짧아 보인다.",
    oneLinerEn: "Lines of equal length appear markedly different depending on inward or outward arrowheads.",
    why: "선 끝에 달린 화살표 날개가 안으로 접히면 방의 튀어나온 모서리(가까움)로, 바깥으로 벌어지면 방의 오목한 구석(멂)으로 뇌가 공간 원근감을 소급 적용하기 때문이에요.",
    analogy: "키가 똑같은 친구라도 양팔을 활짝 벌리고 서 있으면 웅크린 친구보다 훨씬 커 보이는 것 같아요.",
    apply: {
      classroom: "막대그래프나 도표에서 길이를 공정하게 비교시킬 때 막대 끝 장식을 동일하게 통일하세요.",
      webapp: "진행 바나 구분선 끝에 화살표 장식을 넣을 때 길이 인상이 왜곡될 수 있음을 고려하세요.",
      print: "포스터에서 수치를 맞춘 구분선의 양 끝 마감(Cap) 형태를 반드시 하나로 통일하세요."
    },
    doList: ["비교용 도해는 선 끝 화살표를 떼고 평평한 평면 끝으로 마감한다", "길이를 시각적으로 과장해 강조하고 싶을 때 바깥쪽 벌림 화살표를 의도적으로 쓴다"],
    dontList: ["정확한 수치 비교가 생명인 통계 인포그래픽에 멋 부리느라 화살표 장식을 혼용하지 않는다", "시각적 착시를 눈대중으로만 판단하고 실제 픽셀 수치 검증을 생략하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "뮐러-리어 착시 SVG를 구현하고, 날개 각도를 조절하거나 날개를 감추는 정답 확인 버튼을 달아 줘.",
      en: "Render the Müller-Lyer illusion with interactive sliders to adjust fin angles and reveal equal lengths."
    },
    english: { term: "Müller-Lyer illusion", example: "The Müller-Lyer illusion demonstrates how directional end fins distort our estimation of linear length.", keyVocab: ["linear", "estimation", "distort"] },
    purposeTags: ["perception", "readability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "illusion", demoConfig: { component: "MullerLyer", reveal: "두 수평선의 길이는 똑같이 240px입니다. 눈금자로 확인해 보세요." },
    related: [66, 70, 74], caseIds: [], level: 1, factNote: "Franz Carl Müller-Lyer, 1889"
  },
  {
    id: 66, code: "066", slug: "fick-illusion", chapter: "illusion",
    nameKo: "피크 착시", nameEn: "Fick Illusion", aliasesKo: ["수직-수평 착시"],
    oneLiner: "길이가 똑같아도 수직선이 수평선보다 훨씬 더 길어 보인다.",
    oneLinerEn: "Vertical lines are consistently perceived as longer than horizontal lines of identical length.",
    why: "우리의 눈은 좌우로 움직이기 쉬운 반면 위아래로 안구를 움직일 때 더 많은 근육 긴장이 요구돼요. 뇌는 더 큰 노력이 들어간 수직 방향 길이를 더 길다고 평가합니다.",
    analogy: "가로세로 길이가 똑같은 완벽한 정사각형도 언뜻 보면 세로로 홀쭉한 직사각형처럼 보여요.",
    apply: {
      classroom: "정사각형 모양의 카드나 프레임을 만들 때는 세로 길이를 3~5% 살짝 줄여야 완벽해 보여요.",
      webapp: "가로 진행 바와 세로 진행 바의 레이아웃 배치 시 수직 바의 시각적 과대평가를 감안하세요.",
      print: "학교 명함이나 포스터에 정사각 박스를 그릴 때 착시를 보정하는 광학적 보정(Optical fix)을 쓰세요."
    },
    doList: ["완벽한 정사각형처럼 보이게 하려면 세로 높이를 미세하게 줄여 광학적 보정을 가한다", "수평선과 수직선을 조합한 십자 기호 디자인 시 세로획 길이를 정밀하게 미세 조정한다"],
    dontList: ["정확한 수치 비교가 필요한 바 차트에서 가로 막대와 세로 막대를 한 그래프에 뒤섞지 않는다", "수직 요소가 주는 압도적인 길이감을 무시한 채 화면 상단을 무리하게 채우지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "역T자 모양으로 수평선과 수직선이 만나는 피크 착시 SVG를 제작하고, 회전 애니메이션 버튼을 줘.",
      en: "Build a vertical-horizontal Fick illusion SVG showing an inverted T that rotates to prove equal lengths."
    },
    english: { term: "vertical-horizontal illusion", example: "Optical adjustments counteract the Fick illusion, making square frames appear truly balanced.", keyVocab: ["counteract", "optical", "vertical"] },
    purposeTags: ["perception", "usability"], mediaTags: ["slide", "worksheet"],
    demoType: "illusion", demoConfig: { component: "Fick", reveal: "수평선과 수직선의 길이는 정확히 200px로 일치합니다." },
    related: [65, 72, 73], caseIds: [], level: 2, factNote: "Adolf Fick, 1851"
  },
  {
    id: 67, code: "067", slug: "bicolor-illusion", chapter: "illusion",
    nameKo: "바이컬러 착시", nameEn: "Bicolor Illusion", aliasesKo: ["투톤 분할 착시"],
    oneLiner: "하나의 색면도 가운데 경계선을 넣으면 양쪽 색조가 달라 보인다.",
    oneLinerEn: "A single continuous color block appears two-toned when divided by a contrasting line.",
    why: "분할선이 생기는 순간 뇌는 하나의 통일된 면이 아니라 서로 다른 두 영역으로 분류하고, 분할선과의 국소 대비를 통해 양쪽의 밝기를 독자적으로 해석하기 때문이에요.",
    analogy: "하나의 커다란 칠판 중간에 테이프를 딱 붙이면 양쪽 칠판의 녹색 농도가 달라 보이는 착각이에요.",
    apply: {
      classroom: "슬라이드 카드 중간에 불필요한 장식 분할선을 그어 배경색이 쪼개져 보이지 않게 주의하세요.",
      webapp: "단일한 카드 컨테이너 내부를 불필요하게 가로지르는 선을 빼고 화이트 스페이스로 정돈하세요.",
      print: "상장이나 인증서 배경을 깔끔한 단색 톤으로 유지할 때 중앙 장식선의 간섭을 피하세요."
    },
    doList: ["하나의 연속된 덩어리로 보여주고 싶을 때는 내부 분할선을 없애고 여백으로 구분한다", "의도적으로 대비감을 연출하고 싶을 때 얇은 구분선과 함께 양쪽 명암 차를 설계한다"],
    dontList: ["단일 카드를 무심코 선으로 반 토막 내어 독립 박스로 오인하게 하지 않는다", "분할선으로 인해 글자 배경색이 미묘하게 얼룩져 보이는 시각 결함을 방치하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "단색 직사각형 위에 중앙 분할선을 토글하여 분할선 유무에 따른 색 분리 착시를 확인하는 SVG를 짜 줘.",
      en: "Create a bicolor illusion SVG demonstrating how a central dividing line splits a single hue."
    },
    english: { term: "bicolor division illusion", example: "Removing unnecessary divider lines preserves unified surface color and visual cohesion.", keyVocab: ["cohesion", "divider", "unified"] },
    purposeTags: ["perception", "grouping"], mediaTags: ["slide", "webapp"],
    demoType: "illusion", demoConfig: { component: "Bicolor", reveal: "구분선을 제거하면 분할되었던 양쪽 면이 완전히 동일한 하나의 단색(#D4A373)입니다." },
    related: [53, 54, 78], caseIds: [], level: 2, factNote: null
  },
  {
    id: 68, code: "068", slug: "delboeuf-illusion", chapter: "illusion",
    nameKo: "델뵈프 착시", nameEn: "Delboeuf Illusion", aliasesKo: ["동심원 크기 착시"],
    oneLiner: "같은 원도 큰 테두리에선 작아 보이고, 작은 테두리에선 커 보인다.",
    oneLinerEn: "Identical inner circles appear smaller within large concentric rings, and larger within tight rings.",
    why: "동심원의 바깥 테두리가 내부 원의 기준 프레임 역할을 해요. 테두리가 좁으면 내부 원이 꽉 찬 느낌(확대 착시)을 주고, 테두리가 너무 크면 왜소한 느낌(축소 착시)을 줍니다.",
    analogy: "큰 접시에 담긴 밥 한 공기는 적어 보이지만, 작은 종지에 담긴 밥은 고봉밥처럼 푸짐해 보여요.",
    apply: {
      classroom: "급식실 음식물 잔반 줄이기 캠페인에서 식판 크기와 배식량 착시 교육 자료로 쓰세요.",
      webapp: "모바일 버튼 안의 아이콘이 왜소해 보이지 않도록 버튼 패딩과 아이콘 비율을 최적화하세요.",
      print: "원형 뱃지나 스티커 디자인 시 테두리 여백과 중앙 심볼 크기의 비율을 조화롭게 맞추세요."
    },
    doList: ["중앙 아이콘을 돋보이게 하려면 바깥쪽 원형 버튼의 테두리 여백을 너무 과하지 않게 잡는다", "식판이나 그릇 크기 설계를 통해 과식을 예방하는 넛지 디자인으로 응용한다"],
    dontList: ["버튼 테두리가 너무 커 내부 텍스트나 아이콘이 왜소해 보이게 하지 않는다", "도표에서 중요 수치를 표시하는 원형 마커의 크기 인상을 외곽선으로 왜곡하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "크기가 동일한 두 중심 원 주변에 큰 외곽원과 좁은 외곽원을 둘러 크기 차이를 체감하는 SVG를 짜 줘.",
      en: "Build a Delboeuf illusion SVG contrasting how outer concentric ring sizes alter inner circle perception."
    },
    english: { term: "Delboeuf illusion", example: "The Delboeuf illusion teaches designers to balance button padding against icon proportions.", keyVocab: ["proportions", "concentric", "balance"] },
    purposeTags: ["perception", "usability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "illusion", demoConfig: { component: "Delboeuf", reveal: "두 내부 원의 지름은 정확히 동일한 60px입니다." },
    related: [69, 70, 74], caseIds: [], level: 1, factNote: "Franz Joseph Delboeuf, 1865"
  },
  {
    id: 69, code: "069", slug: "ebbinghaus-illusion", chapter: "illusion",
    nameKo: "에빙하우스 착시", nameEn: "Ebbinghaus Illusion", aliasesKo: ["티치너 원 착시"],
    oneLiner: "같은 원이라도 큰 원에 둘러싸이면 작아지고, 작은 원에선 커 보인다.",
    oneLinerEn: "A circle surrounded by large circles appears smaller than an identical circle surrounded by small ones.",
    why: "주변을 둘러싼 이웃 요소들과의 상대적인 크기 대비(Size contrast)가 중심 대상의 절대적 크기 평가를 직접적으로 왜곡하기 때문이에요.",
    analogy: "키가 큰 성인들 사이에 선 중학생은 작아 보이지만, 유치원생들 사이에 서면 거인처럼 보이는 원리예요.",
    apply: {
      classroom: "수업 슬라이드에서 중요한 키워드 폰트가 주변 거대한 일러스트에 눌려 작아 보이지 않게 하세요.",
      webapp: "모바일 화면에서 메인 CTA 버튼 주변의 보조 요소들이 너무 커서 버튼을 위축시키지 않게 하세요.",
      print: "동아리 부원 모집 포스터에서 핵심 접수 링크가 주변 화려한 사진들에 가려지지 않게 여백을 두세요."
    },
    doList: ["핵심 요소를 돋보이게 하려면 주변 부차적 요소들의 크기를 상대적으로 축소 배치한다", "중요한 중심 정보 주변에 넉넉한 공간을 주어 주변 크기 간섭으로부터 해방시킨다"],
    dontList: ["중요한 제목 옆에 3배 큰 장식 아이콘을 붙여 제목을 작아 보이게 하지 않는다", "크기 대비 착시를 감안하지 않고 단순 수치(px)만 맞춰 시각적 왜소함을 방치하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "거대한 꽃잎 원들에 둘러싸인 주황 원과, 작은 꽃잎들에 둘러싸인 주황 원을 비교하는 SVG를 제작해 줘.",
      en: "Render the Ebbinghaus illusion SVG with central orange dots of identical radii."
    },
    english: { term: "Ebbinghaus illusion", example: "The Ebbinghaus illusion warns against surrounding small key actions with oversized decorative graphics.", keyVocab: ["surround", "contrast", "radii"] },
    purposeTags: ["emphasis", "perception"], mediaTags: ["slide", "poster", "webapp"],
    demoType: "illusion", demoConfig: { component: "Ebbinghaus", reveal: "양쪽 꽃밭의 중심에 놓인 두 주황색 원의 지름은 정확히 똑같은 50px입니다." },
    related: [10, 68, 70], caseIds: [], level: 1, factNote: "Hermann Ebbinghaus, 1902"
  },
  {
    id: 70, code: "070", slug: "ponzo-illusion", chapter: "illusion",
    nameKo: "폰조 착시", nameEn: "Ponzo Illusion", aliasesKo: ["철도 레일 착시"],
    oneLiner: "모여드는 원근 선로 위에 놓인 가로선은 위쪽이 훨씬 더 길어 보인다.",
    oneLinerEn: "The upper of two identical horizontal lines appears longer between converging linear tracks.",
    why: "원근법상 위쪽으로 모여드는 수렴선은 '저 멀리 있는 깊은 공간'이라는 3차원 깊이 단서를 줘요. 뇌는 멀리 있는 물체가 망막에 같은 크기로 맺혔다면 실제 크기는 거대할 것이라 추론합니다.",
    analogy: "철길 저 멀리 서 있는 강아지와 내 바로 앞 강아지가 사진상 같은 크기라면 먼 강아지가 거대해 보여요.",
    apply: {
      classroom: "원근감이 들어간 풍경 삽화 위에 수치 도표를 얹을 때 배경 깊이감이 막대 길이를 왜곡하지 않게 하세요.",
      webapp: "사선 그리드가 들어간 3D 입체 배경 위에 배치된 평면 카드들이 크기 착시를 일으키지 않게 주의하세요.",
      print: "원근법이 적용된 포스터에서 위쪽 헤드라인 폰트가 지나치게 비대해 보이는 효과를 감안해 조율하세요."
    },
    doList: ["3D 원근 배경 위에 평면 데이터를 올릴 때는 명확한 외곽선 프레임으로 배경과 분리한다", "착시를 역이용해 웅장하고 깊이감 있는 시각적 연출이 필요할 때 수렴선을 설계한다"],
    dontList: ["데이터 그래프 뒷배경에 원근감이 강한 소실점 투시도 사진을 무작정 깔지 않는다", "배경 원근 착시로 인해 동일한 크기의 두 버튼이 서로 다른 크기로 느껴지게 방치하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "수렴하는 두 사선 선로 위에 놓인 위아래 두 노란 막대의 길이를 눈금자로 재보는 폰조 착시 SVG를 제작해 줘.",
      en: "Build a Ponzo illusion SVG featuring two horizontal bars between converging perspective tracks."
    },
    english: { term: "Ponzo illusion", example: "The Ponzo illusion demonstrates how 3D linear perspective cues distort our flat 2D size judgments.", keyVocab: ["converging", "perspective", "distort"] },
    purposeTags: ["perception", "emphasis"], mediaTags: ["slide", "worksheet"],
    demoType: "illusion", demoConfig: { component: "Ponzo", reveal: "위쪽 선과 아래쪽 선의 실제 길이는 완전히 일치하는 160px입니다." },
    related: [65, 68, 71], caseIds: [], level: 2, factNote: "Mario Ponzo, 1911"
  },
  {
    id: 71, code: "071", slug: "oppel-kundt-illusion", chapter: "illusion",
    nameKo: "오펠-쿤트 착시", nameEn: "Oppel-Kundt Illusion", aliasesKo: ["분할 공간 과대 착시"],
    oneLiner: "빈 공간보다 눈금이나 요소들로 채워진 구간이 훨씬 더 길어 보인다.",
    oneLinerEn: "A divided or textured space is perceived as significantly longer than an empty unfilled space.",
    why: "눈금이 쪼개져 있으면 안구가 그 구간을 훑고 지나갈 때 더 많은 정지점(Saccade)과 인지적 처리가 필요해요. 뇌는 더 많은 정보가 담긴 구간의 물리적 거리가 더 멀다고 판단합니다.",
    analogy: "아무것도 없는 빈 방보다 가구와 장식장이 가득 찬 방을 둘러볼 때 방이 더 넓고 길어 보여요.",
    apply: {
      classroom: "학습 진행 바에 눈금 세부 단계를 촘촘히 넣으면 학습량이 너무 방대해 보일 수 있으니 주의하세요.",
      webapp: "진행 단계 바(Stepper)를 설계할 때 학생이 지치지 않도록 세부 분할을 4~5단계로 절제하세요.",
      print: "포스터 레이아웃에서 여백 구간과 텍스트 구간의 시각적 길이 균형을 맞출 때 분할 착시를 고려하세요."
    },
    doList: ["단계를 쪼갤 때는 학습자가 지치지 않도록 적절한 크기의 덩어리로 묶는다", "넓고 시원한 공간감을 주어야 하는 헤더 영역은 분할선을 빼고 탁 트이게 비워둔다"],
    dontList: ["진행 바에 수십 개의 잘잘한 눈금을 촘촘히 그어 학생들에게 까마득한 피로감을 주지 않는다", "분할 착시를 계산에 넣지 않고 눈대중으로만 좌우 여백의 균형을 맞추지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "동일한 길이의 두 구간 중 한쪽은 촘촘한 세로선으로 채우고 한쪽은 비워둔 오펠-쿤트 착시 SVG를 구성해 줘.",
      en: "Create an Oppel-Kundt illusion SVG contrasting a segmented interval with an uninterrupted empty interval."
    },
    english: { term: "Oppel-Kundt illusion", example: "Over-segmented progress bars make lessons feel deceptively longer due to the Oppel-Kundt illusion.", keyVocab: ["segmented", "interval", "deceptively"] },
    purposeTags: ["perception", "usability"], mediaTags: ["slide", "webapp"],
    demoType: "illusion", demoConfig: { component: "OppelKundt", reveal: "점선들로 나뉜 왼쪽 구간과 텅 빈 오른쪽 구간의 물리적 거리는 똑같이 200px입니다." },
    related: [6, 65, 72], caseIds: [], level: 2, factNote: "J. J. Oppel, 1855 & August Kundt, 1863"
  },
  {
    id: 72, code: "072", slug: "helmholtz-square", chapter: "illusion",
    nameKo: "헬름홀츠의 정사각형", nameEn: "Helmholtz Square", aliasesKo: ["줄무늬 사각 착시"],
    oneLiner: "가로 줄무늬 정사각형은 세로로 길어 보이고, 세로 줄무늬는 넓어 보인다.",
    oneLinerEn: "A square filled with horizontal stripes looks taller, while vertical stripes look wider.",
    why: "줄무늬를 가로질러 세는 시선의 방향으로 안구가 이동하면서 뇌가 줄무늬에 직각인 방향의 길이를 더 길게 확장하여 지각하기 때문이에요.",
    analogy: "가로 줄무늬 옷을 입으면 뚱뚱해 보인다는 상식과 달리 실제 헬름홀츠 착시에서는 세로로 더 길어 보여요.",
    apply: {
      classroom: "인포그래픽 카드 배경에 패턴을 넣을 때 수평선 패턴이 카드를 길쭉해 보이게 만듦을 활용하세요.",
      webapp: "좁은 모바일 화면의 가로 폭을 시각적으로 넓혀 보이게 하려면 수직 정렬 라인을 응용하세요.",
      print: "학교 안내 리플릿의 표지 레이아웃에서 가로형 줄무늬로 슬림하고 단정한 비례를 연출하세요."
    },
    doList: ["카드의 세로 비율을 날씬하고 길어 보이게 연출하고 싶을 때 얇은 가로 스트라이프를 응용한다", "공간이 협소한 곳을 좌우로 넓어 보이게 트고 싶을 때 수직 분할선을 적용한다"],
    dontList: ["줄무늬 두께가 너무 두꺼워 시각적 간섭(모아레 현상)으로 눈을 시리게 만들지 않는다", "착시 방향을 반대로 오해해 넓어 보여야 할 화면을 가로선으로 억누르지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "가로 줄무늬 정사각형과 세로 줄무늬 정사각형을 나란히 배치해 종횡비 착시를 체감하는 SVG를 짜 줘.",
      en: "Render the Helmholtz squares illusion SVG showing how internal stripe orientation alters perceived aspect ratio."
    },
    english: { term: "Helmholtz square illusion", example: "Contrary to popular myth, the Helmholtz square shows that horizontal stripes create a slender, taller impression.", keyVocab: ["slender", "orientation", "aspect"] },
    purposeTags: ["perception", "readability"], mediaTags: ["slide", "worksheet"],
    demoType: "illusion", demoConfig: { component: "HelmholtzSquare", reveal: "두 사각형은 가로와 세로가 모두 정확히 150px인 정규 정사각형입니다." },
    related: [66, 71, 73], caseIds: [], level: 2, factNote: "Hermann von Helmholtz, 1867"
  },
  {
    id: 73, code: "073", slug: "top-heavy-illusion", chapter: "illusion",
    nameKo: "상방 거리 과대 착시", nameEn: "Top-Heavy Illusion", aliasesKo: ["위쪽 과대평가 착시"],
    oneLiner: "위아래 크기가 똑같아도 위쪽 형태를 더 크고 무겁게 느낀다.",
    oneLinerEn: "The upper half of an object is perceived as larger than an identical lower half.",
    why: "중력의 세계에 사는 인간은 지표면 위쪽에 놓인 사물이 떨어질 때의 잠재적 위험에 대비해 위쪽 시야의 정보에 더 민감하게 주의와 가중치를 부여해요.",
    analogy: "숫자 '8'이나 알파벳 'B', 'S'를 자세히 보면 위쪽 동그라미를 일부러 살짝 작게 디자인해 뒀어요.",
    apply: {
      classroom: "슬라이드 레이아웃 시 상단 헤더 박스를 하단 본문 박스보다 살짝 슬림하게 잡으세요.",
      webapp: "모바일 명함 카드나 인증서 디자인에서 기하학적 중심보다 3~5% 살짝 위쪽을 시각적 중심으로 잡으세요.",
      print: "학교 표창장이나 브로슈어 테두리를 두를 때 하단 여백을 상단 여백보다 약간 더 넓게 두세요."
    },
    doList: ["타이포그래피나 로고 디자인 시 위쪽 요소를 미세하게 축소해 시각적 균형을 맞춘다", "카드나 액자의 하단 여백을 상단 여백보다 약간 더 넉넉히 주어 안정감을 확보한다"],
    dontList: ["물리적 정중앙에 그래픽을 배치해 아래로 푹 꺼져 처져 보이는 시각적 불안감을 주지 않는다", "위쪽 여백을 너무 좁게 두어 상단이 무겁게 쏟아져 내릴 것 같은 위압감을 초래하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "숫자 8 모양의 상하 크기를 똑같이 그린 뒤, 위아래를 뒤집었을 때의 어색함을 확인하는 SVG를 제작해 줘.",
      en: "Build a top-heavy illusion SVG with inverted 8 and B letterforms to show optical weighting."
    },
    english: { term: "top-heavy illusion", example: "Type designers reduce the upper loops of letters like 'B' to counteract the top-heavy illusion.", keyVocab: ["counteract", "optical", "weighting"] },
    purposeTags: ["readability", "perception"], mediaTags: ["poster", "slide", "notice"],
    demoType: "illusion", demoConfig: { component: "TopHeavy", reveal: "상하 높이를 똑같이 맞춘 기하학적 8은 뒤집어보면 위쪽이 비정상적으로 거대해 보입니다." },
    related: [66, 72, 90], caseIds: [8], level: 2, factNote: null
  },
  {
    id: 74, code: "074", slug: "jastrow-illusion", chapter: "illusion",
    nameKo: "자스트로 착시", nameEn: "Jastrow Illusion", aliasesKo: ["부메랑 크기 착시"],
    oneLiner: "크기가 똑같은 두 부채꼴 도형도 아래쪽에 놓인 쪽이 더 커 보인다.",
    oneLinerEn: "The lower of two identical curved arc segments appears significantly larger.",
    why: "두 곡선 도형을 겹쳐 놓으면 아래쪽 도형의 긴 바깥쪽 호가 위쪽 도형의 짧은 안쪽 호와 바로 맞닿아 비교돼요. 인접한 두 선분의 국소 대비 때문에 크기가 크게 왜곡됩니다.",
    analogy: "장난감 부메랑 두 개를 위아래로 포개어 놓으면 아래쪽 부메랑이 훨씬 더 길쭉해 보이는 착각이에요.",
    apply: {
      classroom: "곡선형 파이 차트나 부채꼴 다이어그램을 배열할 때 크기 착시가 없는지 확인하세요.",
      webapp: "둥근 탭 버튼들이 곡면을 그리며 겹쳐질 때 상하 크기가 일그러져 보이지 않게 주의하세요.",
      print: "동아리 로고나 엠블럼에 곡선 리본 띠를 여러 겹 겹쳐 배치할 때 비례를 실측하세요."
    },
    doList: ["곡면 다이어그램을 비교할 때는 위아래로 포개지 말고 좌우로 분리하거나 수치 라벨을 붙인다", "착시가 발생하는 원인이 인접한 두 호의 길이 차이임을 수학적 원리로 안내한다"],
    dontList: ["부채꼴 크기로 비교할 때 착시를 방치해 아래쪽이 더 커 보이게 속이지 않는다", "눈대칭만 보고 곡선 도형의 크기가 일치한다고 속단하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "똑같은 크기의 부채꼴 도형 2개가 위아래로 놓여 있다가 겹쳐지며 같은 크기임을 입증하는 SVG를 짜 줘.",
      en: "Create an interactive Jastrow illusion SVG that animates the lower arc over the upper arc to prove equality."
    },
    english: { term: "Jastrow illusion", example: "The Jastrow illusion cautions against placing curved data visualizers vertically adjacent to one another.", keyVocab: ["adjacent", "curved", "visualizer"] },
    purposeTags: ["perception", "readability"], mediaTags: ["slide", "worksheet"],
    demoType: "illusion", demoConfig: { component: "Jastrow", reveal: "아래쪽 부채꼴을 끌어당겨 위쪽 부채꼴에 포개면 100% 한 치의 오차도 없이 완전히 겹쳐집니다." },
    related: [65, 68, 70], caseIds: [], level: 2, factNote: "Joseph Jastrow, 1889"
  },
  {
    id: 75, code: "075", slug: "crater-illusion", chapter: "illusion",
    nameKo: "크레이터 착시", nameEn: "Crater Illusion", aliasesKo: ["달 분화구 돔 착시"],
    oneLiner: "사진을 뒤집으면 파인 분화구가 볼록 솟아오른 언덕으로 뒤바뀐다.",
    oneLinerEn: "Inverting shaded terrain photos flips perceived concave craters into convex mounds.",
    why: "인류의 뇌는 태양광(조명)이 언제나 위쪽에서 내려쬔다는 '빛은 위에서 온다(Light-from-above)'는 강력한 사전 가정(Prior)을 평생토록 품고 있기 때문이에요.",
    analogy: "달 표면 분화구 사진을 거꾸로 뒤집으면 웅덩이가 언덕처럼 볼록하게 튀어나와 보여요.",
    apply: {
      classroom: "지리·지구과학 수업에서 입체 등고선과 지형 사진을 판독할 때 조명 방향을 먼저 확인시키세요.",
      webapp: "버튼의 볼록함(Emboss)과 음각(Deboss) 그림자를 넣을 때 빛이 왼쪽 위에서 온다고 가정하세요.",
      print: "입체 아이콘을 디자인할 때 그림자를 위쪽에 그리면 사물이 꺼져 보인다는 점을 유의하세요."
    },
    doList: ["UI의 버튼과 카드 입체 그림자는 전통적인 '좌상단 광원' 원칙에 맞춰 일관되게 설계한다", "지형이나 3D 모델 사진을 게시할 때는 빛의 방향 안내 표식을 함께 제공한다"],
    dontList: ["빛 방향을 제각각 주어 어떤 버튼은 솟고 어떤 것은 꺼져 보이게 하지 않는다", "그림자 방향을 뒤집어 볼록한 클릭 버튼이 푹 꺼진 구멍처럼 보이게 만들지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "음영 그라디언트 원을 클릭하면 180도 회전하며 분화구와 볼록 언덕으로 지각이 뒤집히는 SVG를 제작해 줘.",
      en: "Render a crater illusion SVG that flips between concave pit and convex mound upon rotation."
    },
    english: { term: "crater illusion", example: "The crater illusion proves that UI depth cues rely fundamentally on the light-from-above assumption.", keyVocab: ["concave", "convex", "assumption"] },
    purposeTags: ["perception", "usability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "illusion", demoConfig: { component: "Crater", reveal: "빛이 위에서 온다는 뇌의 본능 때문에 위쪽 그림자는 음각 구덩이, 아래쪽 그림자는 양각 언덕으로 해석됩니다." },
    related: [57, 76, 78], caseIds: [], level: 2, factNote: null
  },
  {
    id: 76, code: "076", slug: "leaning-tower-illusion", chapter: "illusion",
    nameKo: "피사의 사탑 착시", nameEn: "Leaning Tower Illusion", aliasesKo: ["기울어진 탑 착시"],
    oneLiner: "똑같이 기운 탑 사진 2장을 나란히 두면 한쪽이 더 기울어져 보인다.",
    oneLinerEn: "Identical side-by-side images of a leaning tower appear to diverge at different angles.",
    why: "현실에서 평행하게 서 있는 두 건물을 올려다보면 원근법상 위쪽으로 모여들어야 해요. 그런데 사진 속 두 탑이 완벽히 평행하게 기울어 있으면 뇌는 둘이 서로 벌어지고 있다고 보정합니다.",
    analogy: "피사의 사탑 사진을 복사해 나란히 붙였더니 오른쪽 탑이 넘어질 것처럼 더 기울어져 보여요.",
    apply: {
      classroom: "미술 원근법 수업에서 인간 뇌의 3차원 투시 보정 알고리즘을 설명하는 시각 자료로 쓰세요.",
      webapp: "사선으로 기울어진 카드나 스크린샷 2장을 나란히 배치할 때 각도 착시를 고려하세요.",
      print: "포스터에 기울어진 텍스트 블록 2개를 나란히 놓을 때 둘이 엇갈려 보이지 않는지 점검하세요."
    },
    doList: ["기울어진 사선 그래픽을 복제 배치할 때는 두 번째 객체의 기울기 각도를 미세 조정한다", "실제 동일한 각도의 복사본임을 오버레이 가이드라인을 띄워 사용자에게 검증해 준다"],
    dontList: ["기울어진 두 요소의 착시를 방치해 전체 배치가 삐딱해 보이게 두지 않는다", "눈의 착각을 믿고 실제 각도를 엉뚱하게 비틀어버리는 실수를 하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "동일한 사선 사탑 그래픽 2개를 나란히 배치하고, 오버레이로 겹쳐 동일 각도를 입증하는 SVG를 만들어 줘.",
      en: "Build a leaning tower illusion SVG with interactive overlay alignment proving identical lean angles."
    },
    english: { term: "leaning tower illusion", example: "The leaning tower illusion shows how our visual perspective system assumes real-world parallel convergence.", keyVocab: ["convergence", "perspective", "diverge"] },
    purposeTags: ["perception", "readability"], mediaTags: ["slide", "worksheet"],
    demoType: "illusion", demoConfig: { component: "LeaningTower", reveal: "두 탑 그래픽은 오차 0도의 완벽한 복사본이며 기울어진 각도는 똑같이 15도입니다." },
    related: [62, 70, 75], caseIds: [], level: 3, factNote: "Frederick Kingdom et al., 2007"
  },
  {
    id: 77, code: "077", slug: "color-assimilation-grid-illusion", chapter: "illusion",
    nameKo: "색채 동화 격자 착시", nameEn: "Color Assimilation Grid Illusion", aliasesKo: ["격자 색채 착색 착시"],
    oneLiner: "흑백 사진 위에 색상 격자선만 얹어도 전체가 채색된 것처럼 보인다.",
    oneLinerEn: "Overlying a colored grid on a grayscale image tricks the brain into seeing a fully colored photo.",
    why: "시각 피질은 고해상도의 명암(휘도) 윤곽선을 먼저 잡은 뒤, 저해상도의 색채 정보를 그 윤곽선 내부 영역으로 부드럽게 확산시켜 채워 넣는 압축 방식을 쓰기 때문이에요.",
    analogy: "흑백 만화 위에 빨강, 파랑 체크 줄만 몇 줄 그었을 뿐인데 알록달록한 컬러 만화처럼 보여요.",
    apply: {
      classroom: "컴퓨터 그래픽스나 인지과학 수업에서 JPEG 색차 압축(Chroma Subsampling) 원리를 설명하세요.",
      webapp: "저용량 흑백 일러스트와 얇은 컬러 라인을 조합해 독특하고 가벼운 빈티지 비주얼을 연출하세요.",
      print: "단색 인쇄비로 풀컬러 느낌의 포스터 분위기를 내는 창의적 그래픽 기법으로 활용하세요."
    },
    doList: ["색채 동화가 잘 일어나도록 격자선 두께와 간격을 사진의 스케일에 맞게 정밀 조율한다", "인간 시각 체계의 색채 복원 능력을 이해하고 압축 효율적인 그래픽 디자인을 탐구한다"],
    dontList: ["격자선이 너무 두꺼워 사진 디테일을 가리거나 답답해 보이게 하지 않는다", "착시 현상을 실제 풀컬러 사진인 것처럼 속여 저화질 이미지를 납품하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "흑백 얼굴 일러스트 위에 RGB 색채 격자를 얹어 컬러로 착각되게 한 뒤, 격자를 끄는 토글을 제공해 줘.",
      en: "Render a color assimilation grid SVG where colored gridlines tint a grayscale face illustration."
    },
    english: { term: "color assimilation grid", example: "The color assimilation grid proves our brain interpolates color information across grayscale boundaries.", keyVocab: ["assimilation", "interpolate", "grayscale"] },
    purposeTags: ["perception", "emotion"], mediaTags: ["slide", "worksheet"],
    demoType: "illusion", demoConfig: { component: "ColorGrid", reveal: "격자선 뒤의 인물 사진은 채도가 0%인 완벽한 순수 흑백 이미지입니다." },
    related: [53, 59, 78], caseIds: [], level: 3, factNote: "Øyvind Kolås, 2019"
  },
  {
    id: 78, code: "078", slug: "color-contrast", chapter: "illusion",
    nameKo: "색채 대비", nameEn: "Color Contrast", aliasesKo: ["동시 대비", "배경색 대비"],
    oneLiner: "같은 주황색도 노란 배경에선 어둡고, 어두운 배경에선 밝아 보인다.",
    oneLinerEn: "The identical hue appears significantly darker or brighter depending on its background field.",
    why: "주변 배경색이 망막의 색채 수용기를 지속적으로 자극하면, 뇌는 그 보색 잔상을 중심 영역에 투사해 주변 배경과 반대되는 방향으로 색감을 극대화해 지각합니다.",
    analogy: "같은 회색 글씨라도 하얀 종이 위에선 검게 보이고, 까만 칠판 위에선 하얗게 돋보이는 원리예요.",
    apply: {
      classroom: "슬라이드 텍스트를 작성할 때 배경색과 글자색의 대비비(최소 4.5:1 이상)를 철저히 검증하세요.",
      webapp: "모바일 버튼을 만들 때 다크 모드와 라이트 모드 각각에서 글자 명도 대비를 WCAG AA 이상 사수하세요.",
      print: "학습지나 시험지 인쇄 시 회색 박스 안의 텍스트가 묻히지 않도록 글자 농도를 짙게 조정하세요."
    },
    doList: ["배경과 본문 사이에 충분한 명도 차이(WCAG 4.5:1 이상)를 확보한다", "배경색이 변할 때 텍스트 색상도 자동으로 반전되도록 테마 토큰 시스템을 구축한다"],
    dontList: ["연노랑 배경에 흰색 글씨를 쓰거나 진회색 배경에 검은 글씨를 써서 눈을 멀게 하지 않는다", "색채 대비 효과를 무시한 채 감으로만 색을 골라 저시력 학생의 학습권을 침해하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "밝은 배경과 어두운 배경 위에 동일한 색상의 중앙 칩을 배치하고 실시간 대비비를 계산해 보여 줘.",
      en: "Design an interactive color contrast lab showing the same central patch against dual background fields."
    },
    english: { term: "simultaneous contrast", example: "Simultaneous contrast requires designers to calculate exact luminance ratios rather than trusting the naked eye.", keyVocab: ["luminance", "contrast", "simultaneous"] },
    purposeTags: ["readability", "perception"], mediaTags: ["slide", "worksheet", "webapp", "notice"],
    demoType: "colorLab", demoConfig: { labType: "simultaneousContrast" },
    related: [6, 10, 81], caseIds: [1], level: 1, factNote: "Michel Eugène Chevreul, 1839"
  }
];
