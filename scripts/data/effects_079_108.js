/**
 * 079 - 108 원리 데이터 모듈 (색채 효과 10개 + 레이아웃·UX 법칙 20개)
 */
export const effects079to108 = [
  // ③ 색채 효과 (079–088)
  {
    id: 79, code: "079", slug: "advancing-and-receding-colors", chapter: "color",
    nameKo: "전진색과 후퇴색", nameEn: "Advancing and Receding Colors", aliasesKo: ["진출색과 후퇴색"],
    oneLiner: "따뜻하고 밝은색은 앞으로 튀어나오고, 차가운색은 뒤로 물러나 보인다.",
    oneLinerEn: "Warm, bright colors appear to advance forward, while cool, dark colors recede.",
    why: "빛의 파장이 길수록 망막 앞쪽에 초점이 맺히고, 파장이 짧을수록 망막 뒤쪽에 맺히는 색수차 현상 때문에 뇌가 거리의 깊이감 차이로 해석하기 때문이에요.",
    analogy: "신호등의 빨간불은 눈앞에 확 다가오는 것 같고, 푸른 밤하늘은 저 멀리 아득하게 느껴지는 기분이에요.",
    apply: {
      classroom: "슬라이드에서 반드시 클릭해야 할 제출 버튼에는 전진색(따뜻한 색)을 입히세요.",
      webapp: "배경 컨테이너에는 차분한 후퇴색을 깔고, 중요한 모달 팝업에는 따뜻한 전진색 테두리를 두르세요.",
      print: "안전 포스터에서 위험 경고 타이틀은 전진하는 붉은색으로, 바탕은 후퇴하는 남색으로 잡으세요."
    },
    doList: ["가장 먼저 주목받아야 할 CTA 버튼에 난색 계열의 전진색을 부여한다", "깊이감 있는 공간 연출을 위해 배경에는 차분한 블루나 어두운 무채색을 배치한다"],
    dontList: ["중요하지 않은 부차적 장식에 쨍한 전진색을 발라 본문보다 장식이 튀어나오게 하지 않는다", "본문 글씨에 배경보다 더 후퇴하는 색을 발라 글자가 파묻히게 방치하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "배경은 차분한 네이비 후퇴색으로 가라앉히고, 핵심 버튼은 밝은 오렌지 전진색으로 튀어나오게 해 줘.",
      en: "Use a receding deep-navy background paired with an advancing warm-orange accent for the CTA."
    },
    english: { term: "advancing colors", example: "Advancing warm hues ensure the primary submission button immediately catches the student's eye.", keyVocab: ["advancing", "receding", "chromatic"] },
    purposeTags: ["emphasis", "attention"], mediaTags: ["slide", "poster", "webapp"],
    demoType: "colorLab", demoConfig: { labType: "depthPerception" },
    related: [80, 81, 92], caseIds: [], level: 1, factNote: null
  },
  {
    id: 80, code: "080", slug: "expanding-and-contracting-colors", chapter: "color",
    nameKo: "팽창색과 수축색", nameEn: "Expanding and Contracting Colors", aliasesKo: ["팽창색", "수축색"],
    oneLiner: "밝은색은 실제보다 부풀어 커 보이고, 어두운색은 축소되어 작아 보인다.",
    oneLinerEn: "High-luminance bright colors appear larger and expanded compared to dark shrinking colors.",
    why: "밝은 빛이 망막에 도달하면 주변 시신경으로 빛이 번져나가는 시각적 광도 조사(Irradiation) 현상 때문에 면적이 부풀려져 지각됩니다.",
    analogy: "하얀 옷을 입으면 체격이 커 보이고, 검은 옷을 입으면 날씬하고 왜소해 보이는 착시예요.",
    apply: {
      classroom: "학습지에서 작은 글자나 기호는 밝은 팽창색 배경 위에 얹어 시원하게 키워 보이세요.",
      webapp: "모바일 화면에서 크기가 작은 터치 버튼은 밝은색을 칠해 시각적 크기감을 든든하게 보강하세요.",
      print: "학교 행사 현수막 타이틀을 하얀색 팽창색으로 뽑아 멀리서도 거대하게 보이게 하세요."
    },
    doList: ["작지만 중요한 아이콘이나 태그는 명도 높은 팽창색을 부여해 존재감을 키운다", "넓은 면적을 차지하는 사이드바는 수축색을 써서 화면이 답답해 보이지 않게 정돈한다"],
    dontList: ["어두운 수축색 박스 안에 얇은 글씨를 빽빽하게 채워넣어 질식할 것처럼 보이게 하지 않는다", "도표에서 면적이 똑같은 두 항목의 색상을 팽창색과 수축색으로 배치해 수치를 왜곡하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "소형 모바일 배지에 밝은 옐로우 팽창색을 입혀 터치 타깃이 시각적으로 넉넉하고 커 보이게 해 줘.",
      en: "Apply high-luminance expanding colors to compact badges to enhance their perceived visual presence."
    },
    english: { term: "expanding colors", example: "Expanding bright colors make small interface controls feel more accessible and prominent.", keyVocab: ["expanding", "irradiation", "prominent"] },
    purposeTags: ["emphasis", "readability"], mediaTags: ["webapp", "poster", "slide"],
    demoType: "colorLab", demoConfig: { labType: "sizeIllusion" },
    related: [2, 79, 82], caseIds: [], level: 1, factNote: null
  },
  {
    id: 81, code: "081", slug: "warm-and-cool-colors", chapter: "color",
    nameKo: "난색과 한색", nameEn: "Warm and Cool Colors", aliasesKo: ["따뜻한 색과 차가운 색"],
    oneLiner: "빨강 계열은 온기와 활력을, 파랑 계열은 냉정과 차분함을 준다.",
    oneLinerEn: "Warm tones stimulate energy and comfort, while cool tones promote tranquility and logical focus.",
    why: "인류가 불과 태양에서 온기와 음식을, 물과 밤하늘에서 냉정과 휴식을 얻었던 진화적 경험이 자율신경계 반응(체온·맥박)과 결합해 정서적 온도를 유발해요.",
    analogy: "추운 겨울날 붉은 벽돌 난로를 보면 몸이 훈훈해지고, 여름날 푸른 바다를 보면 소름 돋게 시원한 감각이에요.",
    apply: {
      classroom: "토론이나 협동 활동지에는 활기찬 오렌지 톤을, 수학·과학 시험지에는 차분한 블루 톤을 쓰세요.",
      webapp: "친근한 커뮤니티 게시판에는 따스한 난색을, 데이터 분석 대시보드에는 이성적인 한색을 적용하세요.",
      print: "겨울철 독감 예방 안내문에는 경각심을 주는 난색 포인트를, 여름방학 안내장에는 청량한 한색을 쓰세요."
    },
    doList: ["학습 활동의 정서적 목표에 맞춰 주도 색상의 온도를 결정한다", "한 화면에 따뜻한 색과 차가운 색을 적절히 배분해 상쾌한 시각적 균형을 완성한다"],
    dontList: ["차분하게 깊이 읽어야 할 긴 논문 슬라이드에 눈부신 형광 빨강을 도배해 피로를 주지 않는다", "온기가 필요한 상담 안내문에 얼음장처럼 차가운 회청색만 써서 위압감을 주지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "차분한 집중을 돕기 위해 배경과 카드는 쿨 블루 한색으로 잡고, 완료 버튼에만 웜 오렌지 난색을 줘.",
      en: "Set the base theme with tranquil cool blues, using a warm amber accent solely for the action button."
    },
    english: { term: "color temperature", example: "Balancing warm and cool tones creates an interface that feels both inviting and intellectually focused.", keyVocab: ["temperature", "tranquil", "inviting"] },
    purposeTags: ["emotion", "readability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "colorLab", demoConfig: { labType: "temperatureShift" },
    related: [78, 79, 86], caseIds: [], level: 1, factNote: null
  },
  {
    id: 82, code: "082", slug: "heavy-and-light-colors", chapter: "color",
    nameKo: "무거운 색과 가벼운 색", nameEn: "Heavy and Light Colors", aliasesKo: ["색채의 중량감"],
    oneLiner: "어둡고 짙은 색은 무겁고, 밝은 파스텔색은 깃털처럼 가볍게 느껴진다.",
    oneLinerEn: "Dark, low-luminance colors evoke physical heaviness, while light pastel colors feel airy.",
    why: "우리가 흙, 바위, 쇠 등 무거운 사물은 어둡고, 공기, 구름, 솜털 등 가벼운 물질은 밝다는 일상적 물리 법칙을 평생 뇌 속에 학습해 왔기 때문이에요.",
    analogy: "하얀 상자와 검은 상자가 있으면 크기가 같아도 검은 상자가 2배는 더 묵직하게 느껴져요.",
    apply: {
      classroom: "슬라이드 레이아웃에서 무거운 어두운 박스를 아래쪽에 두어야 시각적 안정감이 생겨요.",
      webapp: "모바일 하단 탭바나 푸터를 어둡게 받쳐주어 화면 전체가 둥둥 떠다니지 않게 무게중심을 잡으세요.",
      print: "안내 포스터 상단을 너무 어둡게 칠하면 머리가 무거워 쏟아질 것 같으니 하단에 짙은 색을 두세요."
    },
    doList: ["시각적 무게중심을 아래쪽에 두어 자연스럽고 안정감 있는 '하중 안정형' 레이아웃을 짠다", "경쾌하고 빠른 조작이 필요한 캐주얼 도구에는 가벼운 파스텔 톤과 높은 명도를 부여한다"],
    dontList: ["상단 헤더는 새까맣게 칠하고 본문은 가볍게 날려버려 화면이 곤두박질치는 불안을 주지 않는다", "엄중하고 신뢰가 필요한 공문서에 깃털처럼 가볍고 유치한 형광색만 도배하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "레이아웃 하단 푸터에 묵직한 차콜 색상을 배치해 문서 전체의 무게중심을 안정감 있게 잡아 줘.",
      en: "Ground the layout by placing heavier, low-luminance charcoal tones in the bottom footer."
    },
    english: { term: "perceived color weight", example: "Grounding the base with heavier dark hues gives the dashboard interface solid visual equilibrium.", keyVocab: ["equilibrium", "grounding", "heaviness"] },
    purposeTags: ["readability", "usability"], mediaTags: ["slide", "poster", "webapp"],
    demoType: "colorLab", demoConfig: { labType: "weightBalance" },
    related: [2, 73, 80], caseIds: [], level: 2, factNote: null
  },
  {
    id: 83, code: "083", slug: "color-and-flavor-association", chapter: "color",
    nameKo: "색에 따라 연상되는 미각", nameEn: "Color and Flavor Association", aliasesKo: ["미각 공감각"],
    oneLiner: "빨강은 달콤함, 노랑은 새콤함, 초록은 신선한 맛을 저절로 떠올린다.",
    oneLinerEn: "Specific colors naturally awaken taste associations: red tastes sweet, yellow sour, and green fresh.",
    why: "익은 열매(빨강=단맛), 설익은 레몬(노랑=신맛), 풋과일과 잎사귀(초록=신선함과 쓴맛)를 구별하던 인류의 섭식 본능이 색채와 미각 신경망을 직결해 두었기 때문이에요.",
    analogy: "딸기 사탕 포장지의 선명한 빨간색만 봐도 입안에 달콤한 침이 저절로 고이는 생리 현상이에요.",
    apply: {
      classroom: "학교 축제 먹거리 장터 메뉴판이나 급식 식단표 디자인에 생생한 미각 색채를 적용하세요.",
      webapp: "요리·영양 동아리 레시피 웹앱에서 맛 카테고리별로 최적의 색상 태그를 분류하세요.",
      print: "학교 매점 인기 간식 포스터에 식욕을 돋우는 난색 계열의 생동감 넘치는 배색을 입히세요."
    },
    doList: ["음식이나 맛과 관련된 정보 전달 시 대중이 직관적으로 공감하는 미각 색채 코드를 쓴다", "신선함엔 올리브 그린을, 달콤함엔 따스한 코랄 레드를 쓴다"],
    dontList: ["식욕을 뚝 떨어뜨리는 탁한 청자색이나 시체빛 회녹색을 식단표나 음식 안내에 쓰지 않는다", "매운맛 안내에 엉뚱하게 파란색을 칠해 학생들이 매운 떡볶이를 달콤하게 오인하게 하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "동아리 바자회 디저트 메뉴판에 달콤함이 침샘을 자극하는 따뜻한 베리 레드와 바닐라 크림색을 입혀 줘.",
      en: "Style the bakery menu card using warm berry-red and creamy vanilla palettes to evoke sweetness."
    },
    english: { term: "flavor-color synesthesia", example: "Luscious berry red evokes sweet flavor associations, making the snack stand flyer mouthwatering.", keyVocab: ["synesthesia", "palatable", "association"] },
    purposeTags: ["emotion", "attention"], mediaTags: ["poster", "notice", "webapp"],
    demoType: "colorLab", demoConfig: { labType: "flavorMapping" },
    related: [81, 84, 85], caseIds: [1], level: 1, factNote: null
  },
  {
    id: 84, code: "084", slug: "mismatch-between-flavor-image-and-color", chapter: "color",
    nameKo: "미각 이미지와 색의 차이", nameEn: "Mismatch Between Flavor Image and Color", aliasesKo: ["미각 불일치 착시"],
    oneLiner: "색깔과 맛이 어긋나면 뇌가 혼란에 빠져 실제 맛조차 분간하지 못한다.",
    oneLinerEn: "Mismatched color cues deceive taste buds, causing people to misidentify actual flavors.",
    why: "인간의 미각은 혀의 미뢰뿐 아니라 시각 정보의 선행 기대에 지배당해요. 녹색으로 칠해진 딸기 주스를 마시면 대부분의 사람이 사과나 라임 맛이라고 착각합니다.",
    analogy: "노란색 음료를 마실 때 눈을 감으면 포도 주스인데도 눈을 뜨면 레몬에이드 맛처럼 느껴지는 실험이에요.",
    apply: {
      classroom: "미디어 리터러시 수업에서 시각적 연출이 감각 판단을 어떻게 조작하는지 실험 교재로 쓰세요.",
      webapp: "상태 아이콘(성공=초록, 오류=빨강)의 관습적 색상을 뒤집지 말고 일관되게 지키세요.",
      print: "과학 동아리 축제 부스에서 '오감의 착각 체험' 체험형 안내지를 제작하세요."
    },
    doList: ["사용자의 인지적 기대와 시각적 피드백을 정확히 일치시켜 불필요한 혼선을 원천 차단한다", "감각 간섭 효과를 탐구하는 흥미진진한 융합 인지과학 수업 활동으로 기획한다"],
    dontList: ["중요한 시스템 알림에서 성공 메시지에 빨간색을 칠해 학생을 깜짝 놀라게 하지 않는다", "사용자에게 불쾌한 배신감을 주는 시각적 장난을 상업 서비스 UI에 적용하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "초록색 딸기 주스 실험 사례를 보여주는 인포그래픽 카드에 시각 기대와 미각의 충돌을 도해해 줘.",
      en: "Illustrate the cognitive discord of green-colored strawberry juice to teach visual expectation bias."
    },
    english: { term: "flavor expectation mismatch", example: "Mismatched flavor coloring shows how visual expectations completely overpower raw sensory input.", keyVocab: ["discord", "expectation", "sensory"] },
    purposeTags: ["perception", "readability"], mediaTags: ["worksheet", "slide"],
    demoType: "colorLab", demoConfig: { labType: "flavorClashTest" },
    related: [34, 83, 85], caseIds: [], level: 2, factNote: null
  },
  {
    id: 85, code: "085", slug: "food-and-complementary-color", chapter: "color",
    nameKo: "음식과 보색", nameEn: "Food and Complementary Color", aliasesKo: ["식품 보색 대비"],
    oneLiner: "음식 색상과 대비되는 보색 그릇에 담을 때 요리의 신선함이 극대화된다.",
    oneLinerEn: "Pairing food with complementary colored plates maximizes freshness and visual appeal.",
    why: "색상환에서 서로 마주 보는 보색은 서로의 채도를 극대화해 주는 광학적 보완 작용을 해요. 붉은 고기 밑에 깔린 파란 깻잎이나 녹색 파슬리는 고기를 더욱 붉고 신선해 보이게 만듭니다.",
    analogy: "노란 카레라이스를 짙은 코발트 블루 접시에 담으면 카레 색이 2배는 더 먹음직스러워 보여요.",
    apply: {
      classroom: "가정·영양 수업에서 식탁 플레이팅과 시각적 영양 연출의 보색 원리를 교육하세요.",
      webapp: "음식 사진이나 상품 카탈로그 배경색을 선택할 때 피사체 핵심 컬러의 보색 틴트를 쓰세요.",
      print: "교내 친환경 급식 홍보 포스터에서 신선한 채소 뒤에 은은한 난색 보색 배경을 받쳐주세요."
    },
    doList: ["주 피사체와 배경 사이에 세련된 보색 관계를 적용한다", "음식 본연의 싱싱한 색감을 살려주기 위해 곁들임 가니시의 색채 배합을 고려한다"],
    dontList: ["보색 둘 다 100% 원색으로 맞춰 눈이 피로한 보색 잔상을 만들지 않는다", "음식과 완전히 동일한 칙칙한 색상의 그릇을 써서 요리가 배경에 묻히게 두지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "황금빛 샌드위치 일러스트 뒤에 은은한 틸 블루 보색 접시를 받쳐 음식의 신선도를 극대화해 줘.",
      en: "Place a subtle teal-blue complementary backdrop behind warm bakery items to enhance visual freshness."
    },
    english: { term: "complementary food plating", example: "Plating warm golden pastries on cool navy ceramics employs complementary contrast to stimulate appetite.", keyVocab: ["complementary", "plating", "appetite"] },
    purposeTags: ["emphasis", "emotion"], mediaTags: ["poster", "slide", "sns"],
    demoType: "colorLab", demoConfig: { labType: "complementaryPlating" },
    related: [10, 78, 83], caseIds: [], level: 2, factNote: null
  },
  {
    id: 86, code: "086", slug: "color-impressions-by-tone", chapter: "color",
    nameKo: "음조에 따른 색감", nameEn: "Color Impressions by Tone", aliasesKo: ["톤 온 톤", "색조 인상"],
    oneLiner: "같은 파랑이라도 파스텔톤은 온화하고, 딥톤은 권위와 신뢰를 준다.",
    oneLinerEn: "Tone shifts transform mood: pastel tints evoke gentleness, while deep shades project authority.",
    why: "색상(Hue)보다 인간의 감성을 직접 자극하는 것은 명도와 채도가 결합된 '톤(Tone)'이에요. 톤의 밝기와 선명도가 심리적 격식과 에너지 수준을 지배합니다.",
    analogy: "연한 파스텔블루 교복 셔츠는 화사해 보이고, 짙은 네이비 정장 블레이저는 진중해 보이는 차이예요.",
    apply: {
      classroom: "학급 회칙이나 공식 평가 기준표에는 신뢰를 주는 다크/딥 톤을 적용하세요.",
      webapp: "도움말이나 튜토리얼 카드에는 부담을 덜어주는 부드러운 페일(Pale) 톤을 쓰세요.",
      print: "동아리 축제 리플릿에는 생동감 넘치는 비비드(Vivid) 톤으로 축제 무드를 살리세요."
    },
    doList: ["문서의 성격(친근한 안내 vs 엄숙한 공식 규정)에 맞춰 배색 톤의 영역을 일치시킨다", "한 화면 안에서는 동일한 톤 패밀리를 유지해 난잡함을 막는다"],
    dontList: ["진중해야 할 대입 전형 안내서에 채도 높은 알록달록 원색들을 무분별하게 섞지 않는다", "파스텔 톤 텍스트를 흰 배경에 얹어 흐리멍덩하게 날려버리지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "학급 임원 선거 공보물은 신뢰와 책임감을 풍기는 딥 네이비 톤과 차분한 그레이로 배색해 줘.",
      en: "Color the student council bulletin using authoritative deep-navy and muted slate tones."
    },
    english: { term: "tonal color impression", example: "Mastering color tone allows educators to shift materials effortlessly from playful to scholarly.", keyVocab: ["tonal", "scholarly", "authoritative"] },
    purposeTags: ["emotion", "trust"], mediaTags: ["slide", "poster", "notice"],
    demoType: "colorLab", demoConfig: { labType: "toneSpectrum" },
    related: [81, 82, 87], caseIds: [], level: 2, factNote: null
  },
  {
    id: 87, code: "087", slug: "color-and-scent-perception", chapter: "color",
    nameKo: "색과 후각", nameEn: "Color and Scent Perception", aliasesKo: ["후각 공감각", "향기 색채"],
    oneLiner: "연보라색은 라벤더 향을, 맑은 녹색은 싱그러운 풀잎 향을 떠올리게 한다.",
    oneLinerEn: "Specific color palettes unconsciously trigger vivid scent memories, like lavender purples.",
    why: "뇌 속 시각 피질과 후각을 관장하는 후각망울(Olfactory bulb) 및 변연계는 매우 긴밀히 연결되어 있어요. 자연물과 꽃의 색채 기억이 향기의 환각을 불러일으킵니다.",
    analogy: "비 온 뒤 젖은 흙빛 갈색과 연녹색 이끼를 보며 상쾌한 피톤치드 숲내음을 떠올리는 감각이에요.",
    apply: {
      classroom: "환경 동아리 생태 도감이나 숲 체험 학습지에 상쾌한 숲내음이 풍기는 허브 그린을 쓰세요.",
      webapp: "명상과 마음 챙김 힐링 웹앱에서 라벤더 퍼플과 소프트 세이지 그린 톤을 깔아주세요.",
      print: "도서관 독서 축제 책갈피에 오래된 종이책의 그윽한 향을 풍기는 미색 한지 톤을 입히세요."
    },
    doList: ["자연과 휴식을 테마로 한 안내물에 부드럽고 차분한 파스텔 자연 색채를 쓴다", "시각 요소만으로도 쾌적하고 맑은 공기감을 느낄 수 있는 은은한 배색을 연출한다"],
    dontList: ["화학 약품 냄새가 날 것 같은 칙칙한 형광 연두나 독한 화학 물질 색상을 피한다", "향기로운 꽃 축제 포스터에 악취를 연상시키는 탁한 진흙 배색을 쓰지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "명상 및 힐링 학습지 배경을 은은한 라벤더 향기가 묻어나는 소프트 바이올렛 파스텔 톤으로 채색해 줘.",
      en: "Tint the mindfulness journal card with gentle lavender and eucalyptus green to evoke calming scents."
    },
    english: { term: "scent-color association", example: "Gentle herbal greens trigger scent memories of fresh morning dew, soothing anxious students.", keyVocab: ["soothing", "association", "recollection"] },
    purposeTags: ["emotion", "perception"], mediaTags: ["worksheet", "poster", "notice"],
    demoType: "colorLab", demoConfig: { labType: "scentPalette" },
    related: [83, 86, 88], caseIds: [], level: 2, factNote: null
  },
  {
    id: 88, code: "088", slug: "color-and-scent-image-mismatch", chapter: "color",
    nameKo: "후각 이미지와 색의 차이", nameEn: "Color and Scent Image Mismatch", aliasesKo: ["후각 불일치"],
    oneLiner: "향기로운 비누라도 칙칙한 색이면 고약한 냄새가 날 것이라 오해한다.",
    oneLinerEn: "Unappealing colors deceive our sense of smell, making even fragrant objects seem foul.",
    why: "우리의 뇌는 색깔을 통해 사물의 부패 여부를 먼저 감별해요. 시각적으로 썩었거나 상한 것처럼 보이는 색채는 후각 수용기가 신호를 보내기도 전에 불쾌한 냄새로 낙인찍습니다.",
    analogy: "장미 향이 나는 향수병이 구정물 같은 흙탕물 색으로 채워져 있다면 향기를 맡기 꺼려지는 심리예요.",
    apply: {
      classroom: "교실 환경 개선 프로젝트에서 쓰레기통 주변 환경을 밝고 화사한 톤으로 도색해 악취 인상을 줄이세요.",
      webapp: "화장실이나 청소 당번 웹앱에서 청결과 위생을 나타내는 맑은 민트와 화이트를 쓰세요.",
      print: "학교 매점 위생 점검 안내문에 산뜻하고 깨끗한 위생 색채를 적용해 신뢰를 주세요."
    },
    doList: ["청결, 위생, 상쾌함이 중요한 안내판에는 티 없이 맑은 화이트와 파스텔 톤을 쓴다", "시각적 색채 관리가 공간의 전반적인 공기 질과 청결 인상을 좌우함을 학생들에게 가르친다"],
    dontList: ["청소 구역 팻말에 칙칙하고 곰팡이 핀 듯한 얼룩덜룩한 색채를 방치하지 않는다", "화장실 안내문에 퀴퀴한 냄새를 연상시키는 탁한 황갈색을 조합하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "교실 청결 수칙 카드에 상쾌한 비누 거품을 연상시키는 맑은 스카이 블루와 퓨어 화이트를 적용해 줘.",
      en: "Style the hygiene guidelines poster with crisp sky-blue and pure white to communicate spotless cleanliness."
    },
    english: { term: "scent-color discord", example: "Unsightly murky hues produce a scent-color discord, leading viewers to perceive clean areas as unhygienic.", keyVocab: ["discord", "hygiene", "murky"] },
    purposeTags: ["perception", "emotion"], mediaTags: ["poster", "notice"],
    demoType: "colorLab", demoConfig: { labType: "scentClash" },
    related: [84, 87, 83], caseIds: [], level: 2, factNote: null
  },

  // ④ 레이아웃·UX 법칙 (089–108)
  {
    id: 89, code: "089", slug: "law-of-proximity", chapter: "layout",
    nameKo: "근접의 법칙", nameEn: "Law of Proximity", aliasesKo: ["근접성의 원리"],
    oneLiner: "가까이 붙어 있는 요소들은 하나의 관련 있는 그룹으로 묶여 인식된다.",
    oneLinerEn: "Elements placed close together are naturally perceived as belonging to the same group.",
    why: "게슈탈트 심리학의 핵심 원리로, 뇌는 물리적 거리가 가까운 자극들을 서로 연관된 하나의 덩어리로 묶어 인지 처리 비용을 아끼려 합니다.",
    analogy: "운동장에 흩어져 있던 학생들이 3명씩 모여 서 있으면 하나의 팀으로 보이는 것과 같아요.",
    apply: {
      classroom: "학습지 문제 번호와 문제 설명 사이 간격은 4px로 붙이고, 다음 문제와의 간격은 24px로 띄우세요.",
      webapp: "입력창과 라벨 텍스트는 바짝 붙이고, 다음 입력 그룹과는 넉넉한 마진을 두세요.",
      print: "가정통신문에서 날짜와 장소는 한 박스로 묶고, 주의사항은 별도 단락으로 분리하세요."
    },
    doList: ["연관된 텍스트와 버튼 사이 간격은 8px 이하로 좁힌다", "서로 다른 그룹 사이의 여백은 최소 24px~32px 이상 크게 벌려 구획을 나눈다"],
    dontList: ["라벨과 입력창 사이 간격이 다음 라벨과의 간격보다 더 멀어서 짝을 잃어버리게 하지 않는다", "모든 항목 간격을 똑같이 맞춰 어느 것이 한 묶음인지 헷갈리게 하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "질문 텍스트와 4개 선택지 사이 간격은 좁히고, 다음 문항과의 간격은 32px로 넓게 분리해 줘.",
      en: "Group each question tightly with its options while separating consecutive questions with 32px margins."
    },
    english: { term: "Law of Proximity", example: "The Law of Proximity dictates that labels must sit closer to their input fields than neighboring items.", keyVocab: ["proximity", "consecutive", "dictate"] },
    purposeTags: ["grouping", "readability"], mediaTags: ["worksheet", "slide", "webapp", "notice"],
    demoType: "compareToggle", demoConfig: { variant: "spacingLayout" },
    related: [6, 90, 94], caseIds: [2, 8], level: 1, factNote: "Max Wertheimer, 1923"
  },
  {
    id: 90, code: "090", slug: "law-of-alignment", chapter: "layout",
    nameKo: "정렬의 법칙", nameEn: "Law of Alignment", aliasesKo: ["정렬의 원리"],
    oneLiner: "보이지 않는 기준선에 줄을 맞추면 복잡한 화면도 단번에 단정해진다.",
    oneLinerEn: "Aligning elements along invisible common axes creates immediate visual structure and polish.",
    why: "선상에 정렬된 요소들은 안구의 불필요한 지그재그 시선 방황을 없애줘요. 시선이 매끄럽게 흐르며 정보의 시작점을 명확히 인지하게 됩니다.",
    analogy: "책꽂이에 꽂힌 책들의 등 표지가 한 줄로 반듯하게 정렬되어 있으면 마음이 편안해지는 느낌이에요.",
    apply: {
      classroom: "슬라이드의 제목, 본문, 도표의 왼쪽 시작선을 1px의 오차도 없이 좌측 정렬하세요.",
      webapp: "모바일 카드 리스트의 아이콘, 텍스트, 화살표를 일관된 그리드 축에 맞추세요.",
      print: "학습지 문제 번호와 들여쓰기 선을 일관되게 정렬해 시선의 피로를 덜어주세요."
    },
    doList: ["긴 글이나 본문 텍스트는 읽기 시작점이 균일한 '좌측 정렬'을 기본 원칙으로 삼는다", "모든 시각 요소가 반드시 다른 요소와 하나 이상의 정렬 축을 공유하도록 설계한다"],
    dontList: ["긴 문단 전체를 중앙 정렬해 줄마다 읽기 시작점이 들쭉날쭉 춤추게 만들지 않는다", "왼쪽 정렬, 오른쪽 정렬, 가운데 정렬을 한 화면에 무분별하게 섞어 어수선함을 주지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "헤드라인, 본문 단락, CTA 버튼의 왼쪽 시작선을 24px 패딩 기준선에 칼같이 맞춰 정렬해 줘.",
      en: "Snap the headline, description, and action button strictly to a single left-aligned vertical axis."
    },
    english: { term: "Law of Alignment", example: "Rigorous left-alignment provides an intuitive reading track that speeds up document comprehension.", keyVocab: ["alignment", "comprehension", "intuitive"] },
    purposeTags: ["readability", "usability"], mediaTags: ["slide", "worksheet", "notice", "webapp"],
    demoType: "compareToggle", demoConfig: { variant: "alignmentDemo" },
    related: [6, 89, 91], caseIds: [2, 8], level: 1, factNote: null
  },
  {
    id: 91, code: "091", slug: "law-of-repetition", chapter: "layout",
    nameKo: "반복의 법칙", nameEn: "Law of Repetition", aliasesKo: ["일관성의 원리"],
    oneLiner: "동일한 색상과 형태를 규칙적으로 반복하면 일관성과 통일감이 생긴다.",
    oneLinerEn: "Repeating consistent visual motifs across screens unifies the design and fosters familiarity.",
    why: "규칙적인 패턴의 반복은 사용자가 시스템의 작동 논리를 한 번만 배우면(Learnability) 나머지 모든 화면을 직관적으로 탐색할 수 있게 돕습니다.",
    analogy: "신호등의 모양과 색이 전국 어디를 가나 똑같아서 고민 없이 신호를 건널 수 있는 규칙이에요.",
    apply: {
      classroom: "20장의 슬라이드 전체에서 소제목 위치, 폰트 크기, 강조 컬러를 단 하나의 규칙으로 고정하세요.",
      webapp: "모든 카드의 모서리 둥글기(radius-lg)와 그림자(shadow-1) 토큰을 동일하게 반복하세요.",
      print: "학습지 시리즈 전체의 헤더 박스 양식을 통일해 패밀리룩을 완성하세요."
    },
    doList: ["디자인 토큰(색, 여백, 반경, 폰트)을 정의하고 시스템 전반에 엄격히 반복 적용한다", "비슷한 기능의 버튼과 카드는 항상 동일한 형태와 상호작용 피드백을 유지한다"],
    dontList: ["페이지마다 기분에 따라 제목 폰트와 배경색을 무작위로 바꿔 통일성을 깨뜨리지 않는다", "반복이 너무 과해 모든 페이지가 복사기처럼 지루하지 않도록 내용의 변주를 적절히 준다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "모든 챕터 카드에 동일한 radius-lg, shadow-1, 16px 패딩 스타일을 일관되게 반복 적용해 줘.",
      en: "Standardize all chapter cards with identical radius, shadow, and padding tokens for visual rhythm."
    },
    english: { term: "Law of Repetition", example: "Repeating visual patterns builds predictable consistency, allowing students to navigate smoothly.", keyVocab: ["repetition", "predictable", "rhythm"] },
    purposeTags: ["usability", "readability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "compareToggle", demoConfig: { variant: "repetitionPattern" },
    related: [27, 38, 94], caseIds: [8], level: 1, factNote: null
  },
  {
    id: 92, code: "092", slug: "law-of-contrast", chapter: "layout",
    nameKo: "대비의 법칙", nameEn: "Law of Contrast", aliasesKo: ["시각적 위계 대비"],
    oneLiner: "중요한 요소는 크기와 색상을 과감하게 달리해야 시선이 꽂힌다.",
    oneLinerEn: "Crucial elements must contrast decisively in scale, weight, and color to establish clear hierarchy.",
    why: "모든 요소가 비슷한 크기와 색을 가지면 아무것도 돋보이지 않아요. 극명한 시각적 위계(Visual hierarchy)가 있어야 뇌가 우선순위를 1초 만에 판별합니다.",
    analogy: "까만 밤하늘에 반짝이는 보름달처럼, 주변과 압도적으로 달라야 누구나 쳐다보게 돼요.",
    apply: {
      classroom: "슬라이드 제목 폰트 크기를 본문보다 최소 2배 이상 키우고 굵기를 볼드(Bold)로 잡으세요.",
      webapp: "보조 버튼은 은은한 테두리만 주고, 핵심 제출 버튼은 채도 높은 단색 배경으로 쏘아 올리세요.",
      print: "포스터 타이틀과 행사 일시 텍스트 사이에 3단계 이상의 명도 및 크기 격차를 두세요."
    },
    doList: ["차이를 주려면 최소 1.5배 이상 과감하게 대비를 준다", "한 화면에서 가장 강렬한 시각적 대비를 받는 주인공 요소를 단 1개로 압축한다"],
    dontList: ["중요한 문구 5개를 전부 빨간색 볼드로 칠해 화면 전체가 아우성치게 만들지 않는다", "제목과 본문의 크기 차이가 미미해 어느 것이 헤드라인인지 헤매게 하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "헤드라인은 32px Bold와 ink 컬러로, 본문 설명은 16px Regular와 muted 컬러로 확실한 대비를 줘.",
      en: "Establish a punchy visual hierarchy with a 32px bold headline contrasted against 16px muted body text."
    },
    english: { term: "Law of Contrast", example: "Bold scale contrast between the header and body text cuts through visual noise immediately.", keyVocab: ["hierarchy", "decisive", "prominence"] },
    purposeTags: ["emphasis", "readability"], mediaTags: ["slide", "poster", "worksheet", "webapp"],
    demoType: "compareToggle", demoConfig: { variant: "hierarchyContrast" },
    related: [6, 10, 78], caseIds: [6], level: 1, factNote: null
  },
  {
    id: 93, code: "093", slug: "law-of-continuity", chapter: "layout",
    nameKo: "연속의 법칙", nameEn: "Law of Continuity", aliasesKo: ["연속성의 원리"],
    oneLiner: "사람의 눈은 부드럽게 이어지는 선의 궤적을 멈추지 않고 따라간다.",
    oneLinerEn: "The eye naturally follows continuous lines and smooth pathways from start to finish.",
    why: "시각 체계는 꺾이고 단절된 궤적보다 매끄럽게 연결된 경로를 최소한의 저항으로 따라가는 지각적 연속성(Good continuation)을 선호합니다.",
    analogy: "구불구불 이어진 오솔길을 내려다보면 길의 끝까지 눈길이 절로 미끄러져 내려가는 경험이에요.",
    apply: {
      classroom: "시간의 흐름이나 프로젝트 단계를 설명할 때 완만한 곡선 패스 위에 단계별 뱃지를 얹으세요.",
      webapp: "온보딩 가이드라인이나 타임라인 UI에서 세로 점선으로 이전과 다음 스텝을 부드럽게 잇따르세요.",
      print: "체험 학습 안내 리플릿에서 지도 동선 경로를 부드러운 화살표 곡선으로 연결하세요."
    },
    doList: ["사용자가 읽어 내려가야 할 흐름(좌측 상단 → 우측 하단)을 따라 부드러운 시선 길을 튼다", "프로세스 다이어그램에서 급격한 직각 꺾임 대신 부드러운 라운드 연결선을 쓴다"],
    dontList: ["선이 중간에 뚝뚝 끊기거나 교차점이 엉켜 어디로 가야 할지 길을 잃게 하지 않는다", "시선의 자연스러운 연속 흐름을 가로막는 무거운 장식 장벽을 중간에 놓지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "4단계 학습 로드맵 카드를 연결하는 부드러운 S자 곡선 패스를 배경에 은은하게 깔아 줘.",
      en: "Connect the 4-step progress nodes with a smooth continuous curve to guide sequential scanning."
    },
    english: { term: "Law of Continuity", example: "The Law of Continuity guides the student's eye smoothly along the curved timeline without disruption.", keyVocab: ["continuity", "sequential", "disruption"] },
    purposeTags: ["readability", "usability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "compareToggle", demoConfig: { variant: "continuousLine" },
    related: [9, 105, 106], caseIds: [11], level: 1, factNote: "Max Wertheimer, 1923"
  },
  {
    id: 94, code: "094", slug: "law-of-similarity", chapter: "layout",
    nameKo: "유사의 법칙", nameEn: "Law of Similarity", aliasesKo: ["유사성의 원리"],
    oneLiner: "모양과 색상이 비슷한 요소들은 같은 기능의 형제로 묶여 보인다.",
    oneLinerEn: "Elements sharing visual traits like color and shape are perceived as sharing the same function.",
    why: "뇌는 시각적 공통점(모양, 색, 질감)을 가진 사물들을 단일한 카테고리로 빠르게 분류해 인지 효율을 극대화하는 게슈탈트 묶음 연산을 수행합니다.",
    analogy: "체육대회 때 같은 색 티셔츠를 입은 학생들이 멀리서도 같은 팀으로 한눈에 묶여 보이는 원리예요.",
    apply: {
      classroom: "학습지에서 '핵심 개념 박스'는 모두 파란색, '연습 문제 박스'는 모두 초록색으로 통일하세요.",
      webapp: "클릭 가능한 모든 링크 텍스트에 동일한 밑줄과 포커스 컬러 토큰을 일관되게 부여하세요.",
      print: "가정통신문에서 학년별 공지사항 머리글 아이콘 모양을 학년별로 각각 통일하세요."
    },
    doList: ["동일한 성격의 정보 블록은 동일한 형태, 아이콘, 배경색을 부여해 범주화를 돕는다", "클릭 가능한 액션 버튼들은 동일한 둥글기와 그림자 스타일을 유지한다"],
    dontList: ["일반 텍스트에 파란색과 밑줄을 그어 마치 클릭 가능한 하이퍼링크처럼 오인하게 하지 않는다", "역할이 완전히 다른 두 버튼에 똑같은 색과 모양을 주어 기능 구분을 방해하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "모든 보충 설명 박스는 연한 노랑 배경과 둥근 모서리로 맞춰 한눈에 보충 자료임을 알게 해 줘.",
      en: "Apply matching light-amber backgrounds and identical pill tags to all supplementary tip boxes."
    },
    english: { term: "Law of Similarity", example: "Applying the Law of Similarity ensures all clickable navigational tags share the same pill shape.", keyVocab: ["similarity", "category", "navigational"] },
    purposeTags: ["grouping", "readability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "compareToggle", demoConfig: { variant: "similarityGrouping" },
    related: [89, 91, 99], caseIds: [], level: 1, factNote: "Max Wertheimer, 1923"
  },
  {
    id: 95, code: "095", slug: "law-of-closure", chapter: "layout",
    nameKo: "폐쇄의 법칙", nameEn: "Law of Closure", aliasesKo: ["완결성의 원리"],
    oneLiner: "선이 살짝 끊겨 있어도 뇌는 빈틈을 메워 온전한 형태로 완성한다.",
    oneLinerEn: "The mind fills in missing gaps to perceive incomplete shapes as whole, unified figures.",
    why: "시각 피질은 불완전한 파편을 마주했을 때 익숙하고 안정된 대상을 찾으려는 패턴 완성(Pattern completion) 메커니즘을 작동시켜 틈새를 무의식적으로 봉합합니다.",
    analogy: "동그라미의 한구석이 조금 뚫려 있어도 우리는 그것을 굽은 선이 아니라 '뚫린 원'으로 보는 심리예요.",
    apply: {
      classroom: "모바일 화면 오른쪽 끝에 다음 카드의 일부를 살짝 노출시켜 '더 넘겨볼 수 있음'을 암시하세요.",
      webapp: "가로 스크롤 캐러셀에서 카드가 화면 가장자리에 반쯤 걸치게 배치해 스크롤을 유도하세요.",
      print: "심플한 아이콘 디자인에서 불필요한 외곽선을 덜어내고 열린 윤곽선으로 미니멀함을 연출하세요."
    },
    doList: ["가로 스크롤 카드 끝을 잘라 보여주어 스크롤 힌트를 준다", "형태의 본질적인 뼈대만 남기고 테두리를 비워 가볍고 현대적인 그래픽을 설계한다"],
    dontList: ["틈새를 너무 벌려 뇌가 온전한 형태를 상상조차 못하게 하지 않는다", "가로 스크롤 카드가 딱 맞아 다음 내용이 없는 것처럼 오해하게 두지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "가로 스크롤 카드 리스트의 마지막 카드가 우측 엣지에 30% 걸쳐 보이도록 패딩을 세팅해 줘.",
      en: "Peek the edge of the next carousel card by 24px so users intuitively perceive continuous scrollability."
    },
    english: { term: "Law of Closure", example: "Peeking the subsequent slide relies on the Law of Closure, hinting that more content awaits off-screen.", keyVocab: ["closure", "subsequent", "affordance"] },
    purposeTags: ["perception", "usability"], mediaTags: ["webapp", "slide", "poster"],
    demoType: "compareToggle", demoConfig: { variant: "peekingCard" },
    related: [58, 63, 100], caseIds: [8], level: 1, factNote: "Max Wertheimer, 1923"
  },
  {
    id: 96, code: "096", slug: "law-of-common-fate", chapter: "layout",
    nameKo: "공통 운명의 법칙", nameEn: "Law of Common Fate", aliasesKo: ["공동 운명의 원리"],
    oneLiner: "같은 방향으로 함께 움직이는 요소들은 하나의 무리로 묶여 인식된다.",
    oneLinerEn: "Elements that move in the same direction at the same velocity are perceived as a single entity.",
    why: "자연계에서 같은 속도와 방향으로 비행하는 새 떼나 물고기 무리처럼, 함께 기동하는 시각 자극은 동일한 운명을 공유하는 단일 객체로 처리하는 것이 생존에 유리하기 때문이에요.",
    analogy: "하늘을 나는 철새 떼가 제각각 날갯짓을 해도 한 방향으로 나아가면 하나의 거대한 V자 무리로 보여요.",
    apply: {
      classroom: "슬라이드 전환 시 하위 목록 항목들이 같은 속도로 동시에 스르륵 슬라이드인 되게 하세요.",
      webapp: "아코디언 메뉴나 드롭다운이 열릴 때 내부 서브메뉴들이 일제히 한 덩어리로 펼쳐지게 하세요.",
      print: "정적인 포스터에서는 대각선으로 나란히 질주하는 모션 라인을 그어 한 팀의 결속력을 보이세요."
    },
    doList: ["함께 묶여야 할 모달 메뉴는 내부 요소가 한 덩어리로 움직이게 한다", "모션 줄이기 환경에서는 애니메이션 대신 화살표 지시선으로 대체한다"],
    dontList: ["같은 메뉴 박스 안의 버튼들이 제각기 다른 속도와 방향으로 어지럽게 튀어나오게 하지 않는다", "움직임이 너무 산만하고 요란해 학생들의 학습 집중을 방해하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "하위 메뉴가 열릴 때 부모 컨테이너와 자식 링크들이 단일한 그룹으로 부드럽게 아래로 슬라이드되게 해 줘.",
      en: "Animate dropdown items expanding downward synchronously to demonstrate the Law of Common Fate."
    },
    english: { term: "Law of Common Fate", example: "Synchronous motion across interface cards signals to users that they function as a unified module.", keyVocab: ["synchronous", "entity", "unified"] },
    purposeTags: ["grouping", "usability"], mediaTags: ["webapp", "slide"],
    demoType: "compareToggle", demoConfig: { variant: "synchronizedMotion" },
    related: [89, 93, 94], caseIds: [], level: 2, factNote: "Max Wertheimer, 1923"
  },
  {
    id: 97, code: "097", slug: "law-of-area", chapter: "layout",
    nameKo: "면적의 법칙", nameEn: "Law of Area", aliasesKo: ["도형과 배경", "면적의 원리"],
    oneLiner: "두 영역이 겹칠 때 작은 쪽이 주인공으로, 넓은 쪽이 배경이 된다.",
    oneLinerEn: "When shapes overlap, the smaller surface is instinctively perceived as the figure, and the larger as ground.",
    why: "시각 피질은 한정된 좁은 면적을 독립된 물체(Figure)로, 그 바깥을 감싸는 광활한 면적을 무한한 배경(Ground)으로 분류하는 게슈탈트 전경-배경 분리 본능을 작동시킵니다.",
    analogy: "하얀 백지(넓은 배경) 위에 콩알만 한 까만 점(작은 면적)을 찍으면 점이 주인공으로 튀어나와 보여요.",
    apply: {
      classroom: "핵심 요약 카드는 슬라이드 전체 면적의 30% 내외로 콤팩트하게 잡아 전경으로 도드라지게 하세요.",
      webapp: "모달 다이얼로그나 토스트 알림창의 면적을 화면 전체 대비 적절히 작게 잡아 주인공으로 띄우세요.",
      print: "포스터에서 가장 중요한 행사 날짜 박스를 작고 알차게 프레임화하여 배경과 분리하세요."
    },
    doList: ["주목받아야 할 대상은 배경보다 상대적으로 작은 면적으로 응축하여 전경으로 도출한다", "배경과 전경의 경계선을 명확히 분리해 어디가 주인공인지 단번에 알 수 있게 한다"],
    dontList: ["모달 창을 화면 가득 채워 전경인지 배경인지 헷갈리게 하지 않는다", "면적 차이가 반반이라 전경과 배경이 뒤바뀌어 혼란스럽게 하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "화면 중앙에 배경 대비 35% 크기의 콤팩트한 카드를 배치해 전경-배경 대비가 즉각 체감되게 해 줘.",
      en: "Scale the focal dialog box to 35% of viewport width so it pops out unequivocally as the active figure."
    },
    english: { term: "Law of Area", example: "The Law of Area ensures the compact dialog box stands out decisively against the spacious background.", keyVocab: ["figure", "ground", "compact"] },
    purposeTags: ["emphasis", "perception"], mediaTags: ["slide", "webapp", "poster"],
    demoType: "compareToggle", demoConfig: { variant: "figureGroundArea" },
    related: [6, 11, 92], caseIds: [], level: 2, factNote: "Edgar Rubin, 1915"
  },
  {
    id: 98, code: "098", slug: "law-of-symmetry", chapter: "layout",
    nameKo: "대칭의 법칙", nameEn: "Law of Symmetry", aliasesKo: ["대칭적 형태화"],
    oneLiner: "떨어져 있는 도형도 대칭축을 중심으로 균형을 이루면 한 쌍으로 묶인다.",
    oneLinerEn: "Symmetrical regions are perceived as coherent unified figures rather than disparate elements.",
    why: "자연계에서 생명체와 얼굴 등 의미 있는 대부분의 유기체는 좌우 대칭이에요. 뇌는 대칭성을 마주하면 별개의 파편이 아니라 하나의 완결된 개체로 즉시 통합합니다.",
    analogy: "양 날개를 펼친 나비 그림을 보면 왼쪽 날개와 오른쪽 날개를 따로 보지 않고 한 마리 나비로 봐요.",
    apply: {
      classroom: "토론 수업 슬라이드에서 찬성과 반대 의견 카드를 중앙축 좌우에 대칭으로 나란히 맞세우세요.",
      webapp: "비교 테이블이나 듀얼 카드 컴포넌트를 정확한 수직 중심축 기준으로 좌우 대칭 배치하세요.",
      print: "학교 공식 졸업장이나 표창장의 모든 장식 테두리와 문단을 대칭 구도로 완성하세요."
    },
    doList: ["비교할 두 그룹은 중심축 기준 동일한 폭과 대칭 구조로 배치한다", "대칭성을 부여해 보는 이에게 신뢰감, 균형미, 시각적 안정감을 선사한다"],
    dontList: ["한쪽 카드만 엉뚱하게 길어지거나 여백이 찌그러져 대칭의 안정감을 깨뜨리지 않는다", "단조로운 기계적 대칭에 갇혀 역동적인 정보의 흐름을 억누르지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "찬성과 반대 의견을 담은 두 카드를 중앙 구분선을 사이에 두고 완벽한 좌우 대칭으로 구성해 줘.",
      en: "Arrange the pro and con opinion columns in perfect bilateral symmetry across the central dividing axis."
    },
    english: { term: "Law of Symmetry", example: "Bilateral symmetry between comparison cards reinforces impartial balance in student debates.", keyVocab: ["symmetry", "bilateral", "impartial"] },
    purposeTags: ["grouping", "trust"], mediaTags: ["slide", "worksheet", "notice"],
    demoType: "compareToggle", demoConfig: { variant: "symmetricPair" },
    related: [17, 90, 94], caseIds: [6], level: 1, factNote: "Max Wertheimer, 1923"
  },
  {
    id: 99, code: "099", slug: "signifier", chapter: "layout",
    nameKo: "시그니파이어", nameEn: "Signifier", aliasesKo: ["기표", "행동 단서"],
    oneLiner: "버튼의 그림자나 밑줄이 어떻게 행동해야 할지 단서를 친절히 알려준다.",
    oneLinerEn: "Visual signifiers clearly communicate where, how, and when an action should take place.",
    why: "어포던스(행동 유도성)가 물리적 가능성이라면, 시그니파이어는 그것을 눈으로 보이게 알려주는 구체적 시각 신호예요. 명확한 단서가 있어야 사용자가 망설임 없이 조작합니다.",
    analogy: "문 손잡이에 '당기시오'라고 적힌 명판이나 손잡이의 둥근 모양새가 어떻게 열지 알려주는 신호예요.",
    apply: {
      classroom: "학습지의 주관식 빈칸에 밑줄이나 연한 박스를 둘러 '여기에 답을 적으세요'를 암시하세요.",
      webapp: "누를 수 있는 모든 버튼에는 살짝 솟아오른 입체 그림자나 테두리, 손가락 커서 피드백을 두세요.",
      print: "절취선 안내문에 가위 모양 아이콘과 점선을 함께 인쇄해 쉽게 자르게 하세요."
    },
    doList: ["클릭이나 탭이 가능한 인터랙티브 요소에는 그림자, 밑줄, 화살표 등 뚜렷한 단서를 제공한다", "터치나 마우스 호버 시 즉각적인 시각 변화(100ms 이내)로 반응을 확증한다"],
    dontList: ["누를 수 없는 단순한 본문 텍스트에 파란색과 밑줄을 그어 헛클릭을 유발하지 않는다", "클릭해야 할 버튼을 평평하고 밋밋한 일반 글씨처럼 방치해 지나치게 만들지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "클릭 가능한 카드 우측 하단에 '자세히 보기 →' 텍스트와 뚜렷한 화살표 시그니파이어를 달아 줘.",
      en: "Add an explicit 'Explore details →' arrow affordance to signal that the card is fully interactive."
    },
    english: { term: "signifier", example: "Effective visual signifiers eliminate user hesitation by clearly revealing how to operate the tool.", keyVocab: ["signifier", "affordance", "hesitation"] },
    purposeTags: ["usability", "readability"], mediaTags: ["webapp", "worksheet", "slide"],
    demoType: "compareToggle", demoConfig: { variant: "clickableAffordance" },
    related: [8, 91, 100], caseIds: [], level: 1, factNote: "Donald Norman, 2013"
  },
  {
    id: 100, code: "100", slug: "jakobs-law", chapter: "layout",
    nameKo: "제이콥의 법칙", nameEn: "Jakob's Law", aliasesKo: ["친숙한 사용성의 법칙"],
    oneLiner: "사용자는 당신의 앱도 다른 앱들과 익숙한 방식으로 작동하길 기대한다.",
    oneLinerEn: "Users spend most of their time on other sites, so they expect your app to work the same familiar way.",
    why: "새로운 인터페이스를 만날 때마다 작동법을 새로 배우는 것은 극심한 뇌의 스트레스예요. 이미 검증된 공통의 표준 멘탈 모델(Mental model)을 따를 때 가장 편안하게 씁니다.",
    analogy: "어떤 자동차를 타든 엑셀 페달이 오른쪽에 있고 브레이크가 왼쪽에 있어야 안전하게 운전할 수 있어요.",
    apply: {
      classroom: "온라인 학습 플랫폼을 구축할 때 네이버나 유튜브처럼 친숙한 상단 검색창 위치를 유지하세요.",
      webapp: "모바일 하단 탭바, 좌상단 뒤로가기 버튼, 우상단 닫기(X) 버튼의 표준 위치를 철저히 지키세요.",
      print: "학교 신문이나 보고서의 목차와 페이지 번호를 모두가 익숙한 전통적 위치에 배치하세요."
    },
    doList: ["업계 표준 UX 패턴(햄버거 메뉴, 돋보기 검색, 하단 탭바)을 겸손하게 따르고 존중한다", "독창성은 기괴한 내비게이션 조작 방식이 아니라 훌륭한 교육 콘텐츠의 알맹이에서 발휘한다"],
    dontList: ["개성을 뽐내겠다고 닫기(X) 버튼을 화면 왼쪽 아래 구석에 숨겨두는 기행을 벌이지 않는다", "사용자에게 익숙한 표준 아이콘의 뜻을 제멋대로 왜곡해 엉뚱한 기능에 매핑하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "모바일 레이아웃은 누구나 직관적으로 쓸 수 있게 하단 5개 탭바와 우상단 닫기 버튼 등 표준 UX를 따라 줘.",
      en: "Structure the app using standard mobile conventions like bottom navigation tabs according to Jakob's Law."
    },
    english: { term: "Jakob's Law", example: "Respecting Jakob's Law spares learners from mental fatigue by adhering to familiar navigation patterns.", keyVocab: ["familiar", "conventions", "fatigue"] },
    purposeTags: ["usability", "trust"], mediaTags: ["webapp", "notice"],
    demoType: "compareToggle", demoConfig: { variant: "standardVsOddNav" },
    related: [51, 99, 101], caseIds: [1, 11], level: 1, factNote: "Jakob Nielsen, 2000"
  },
  {
    id: 101, code: "101", slug: "prototype-theory-and-exemplar-theory", chapter: "layout",
    nameKo: "프로토타입 이론과 모범 이론", nameEn: "Prototype Theory & Exemplar Theory", aliasesKo: ["전형성 이론"],
    oneLiner: "사람들은 가장 전형적인 원형 표본을 기준으로 새 대상을 이해한다.",
    oneLinerEn: "People categorize concepts by comparing them to an idealized mental prototype or stored exemplars.",
    why: "추상적인 개념을 정의할 때 뇌는 사전적 정의보다 머릿속에 떠오르는 가장 대표적인 모범 사례(예: '새' 하면 참새)와 대조하여 얼마나 그 범주에 부합하는지 신속하게 판정해요.",
    analogy: "'과일'을 생각할 때 사과나 바나나가 먼저 떠오르고 두리안은 뒤늦게 떠오르는 인지 과정이에요.",
    apply: {
      classroom: "새로운 문학 장르나 과학 개념을 소개할 때 가장 표준적이고 전형적인 명작 예시부터 시작하세요.",
      webapp: "아이콘을 디자인할 때 '설정'은 톱니바퀴, '저장'은 디스켓 등 가장 전형적인 원형을 채택하세요.",
      print: "동아리 홍보 포스터에 각 분야를 상징하는 가장 대표적이고 직관적인 상징물을 그리세요."
    },
    doList: ["누구나 보자마자 1초 만에 무릎을 치는 가장 친숙하고 전형적인 모범 사례를 먼저 제시한다", "독창적인 변형 아이콘보다 대중적인 전형성(Typicality)을 갖춘 기호를 우선 적용한다"],
    dontList: ["너무 특이하고 기이한 비주류 사례를 처음부터 들이밀어 학생들의 개념 형성을 꼬아놓지 않는다", "설정 아이콘에 톱니바퀴 대신 뜬금없이 드라이버나 펜치를 그려서 혼선을 주지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "설정 메뉴는 전 세계 표준 원형인 톱니바퀴 아이콘으로, 검색은 돋보기 아이콘으로 전형성을 지켜 줘.",
      en: "Use prototypical iconography like a gear for settings to ensure instantaneous semantic recognition."
    },
    english: { term: "prototype theory", example: "Relying on prototypical icons accelerates visual search because users compare icons to mental prototypes.", keyVocab: ["prototypical", "categorize", "recognition"] },
    purposeTags: ["usability", "readability"], mediaTags: ["webapp", "slide", "worksheet"],
    demoType: "compareToggle", demoConfig: { variant: "typicalVsAtypicalIcons" },
    related: [52, 99, 100], caseIds: [], level: 2, factNote: "Eleanor Rosch, 1973"
  },
  {
    id: 102, code: "102", slug: "weber-fechner-law", chapter: "layout",
    nameKo: "베버-페히너 법칙", nameEn: "Weber-Fechner Law", aliasesKo: ["감각 차이 식별의 법칙"],
    oneLiner: "원래 자극이 강할수록 차이를 느끼기 위한 변화량도 훨씬 커져야 한다.",
    oneLinerEn: "The just-noticeable difference between stimuli is proportional to the original magnitude.",
    why: "감각 기관은 산술적인 절대 차이(더하기)가 아니라 로그 스케일의 비율(곱하기)로 변화를 감지해요. 기본 자극이 강할 땐 웬만한 변화는 뇌가 알아차리지도 못합니다.",
    analogy: "촛불 하나 켜진 어두운 방에 촛불 하나를 더 켜면 환하지만, 대낮 야외에선 촛불 하나가 티도 안 나요.",
    apply: {
      classroom: "폰트 크기 계층을 설계할 때 12px→14px(16% 증가)과 32px→34px(6% 증가, 차이 안 남)을 구분하세요.",
      webapp: "큰 제목일수록 크기 단계를 4px씩 찔끔 키우지 말고 24px → 36px → 48px로 배수 스케일링하세요.",
      print: "배경이 어두운 포스터에서는 밝기 차이를 과감하게 주어야 글자가 묻히지 않고 눈에 띕니다."
    },
    doList: ["글자 크기는 비율 스케일(1.25배 등)을 적용해 단계별 차이를 확실히 준다", "큰 제목의 굵기를 바꿀 때는 2단계 이상 과감하게 건너뛴다"],
    dontList: ["36px 제목 옆에 38px 부제목을 두는 미세한 차이에 매달리지 않는다", "원래 강렬한 색상 위에 미세한 파스텔 틴트를 얹어 구분이 전혀 안 되게 방치하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "타이포 스케일을 16px, 20px, 28px, 40px처럼 단계마다 최소 1.3배 이상의 뚜렷한 격차로 구성해 줘.",
      en: "Scale typography using a 1.333 modular scale so that size increments are perceptually obvious."
    },
    english: { term: "Weber-Fechner law", example: "The Weber-Fechner law explains why font size scales must increase proportionally, not linearly.", keyVocab: ["proportional", "magnitude", "stimulus"] },
    purposeTags: ["emphasis", "readability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "compareToggle", demoConfig: { variant: "modularFontScale" },
    related: [10, 61, 92], caseIds: [], level: 2, factNote: "Ernst Heinrich Weber, 1834 & Gustav Fechner, 1860"
  },
  {
    id: 103, code: "103", slug: "fittss-law", chapter: "layout",
    nameKo: "피츠의 법칙", nameEn: "Fitts's Law", aliasesKo: ["피츠 법칙", "타깃 도달 시간의 법칙"],
    oneLiner: "버튼이 클수록, 그리고 손가락과 가까울수록 누르는 시간이 단축된다.",
    oneLinerEn: "Target acquisition time is a function of the distance to the target and the target's size.",
    why: "원하는 목표 지점에 손을 뻗거나 마우스를 이동시킬 때 걸리는 시간은 이동 거리(Distance)와 목표물의 폭(Width)에 의해 수학적으로 결정돼요. 거리는 좁히고 크기는 키워야 합니다.",
    analogy: "문 손잡이가 크고 손 뻗으면 닿는 허리 높이에 있어야 문을 홱 열기 쉬운 이치예요.",
    apply: {
      classroom: "스마트보드 전자칠판 수업 화면에서 학생이 터치할 정답 버튼을 최소 주먹만 하게 키우세요.",
      webapp: "모바일에서 가장 중요한 '다음' 버튼은 엄지손가락이 닿기 쉬운 하단에 최소 44×44px로 두세요.",
      print: "체험형 활동지에서 스티커를 붙이는 타깃 영역을 아이들의 서툰 손놀림에 맞춰 큼직하게 그리세요."
    },
    doList: ["모바일 주요 버튼 높이는 최소 44px 이상 넉넉히 확보한다", "화면 모서리와 하단 가장자리(무한대 타깃 효과)에 주요 내비게이션 바를 고정 배치한다"],
    dontList: ["모바일에서 닫기 버튼을 너무 작게 만들어 헛터치를 유발하지 않는다", "취소 버튼과 삭제 버튼을 1px 틈새도 없이 바짝 붙여놓아 오작동 재앙을 부르지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "모바일 화면 최하단 엄지 영역에 최소 높이 48px 이상의 풀 와이드 '신청 완료' 버튼을 넉넉히 고정해 줘.",
      en: "Position a full-width 48px high action button within easy thumb reach at the bottom edge."
    },
    english: { term: "Fitts's law", example: "Applying Fitts's law by placing primary buttons within the thumb zone slashes interaction error rates.", keyVocab: ["acquisition", "thumb", "proportional"] },
    purposeTags: ["usability", "attention"], mediaTags: ["webapp", "slide"],
    demoType: "timingGame", demoConfig: { gameType: "fittsTargetClick" },
    related: [51, 99, 104], caseIds: [11], level: 1, factNote: "Paul Fitts, 1954"
  },
  {
    id: 104, code: "104", slug: "doherty-threshold", chapter: "layout",
    nameKo: "도허티 임계값", nameEn: "Doherty Threshold", aliasesKo: ["400ms 반응성 법칙"],
    oneLiner: "반응 시간이 0.4초 이내일 때 사람의 작업 몰입도가 극대화된다.",
    oneLinerEn: "Productivity soars when the computer and user interact at a pace under 400 milliseconds.",
    why: "인간의 생각 흐름이 끊기지 않는 인지적 임계 반응 시간이 바로 400ms예요. 응답이 0.4초를 넘어가면 사용자는 딴생각을 하거나 시스템이 멈춘 줄 알고 짜증을 냅니다.",
    analogy: "친구에게 질문했을 때 0.4초 만에 즉각 대답이 돌아와야 신나게 대화가 술술 이어지는 것과 같아요.",
    apply: {
      classroom: "온라인 단어 퀴즈 앱에서 정답 제출 시 100ms 안에 즉각 시각적 효과음과 피드백을 주세요.",
      webapp: "400ms 이상 소요되는 AI 분석 작업에는 즉시 스켈레톤이나 '분석 중…' 진행률 표시를 띄우세요.",
      print: "현장 수업에서 질문을 던진 뒤 침묵이 3초를 넘어가면 힌트를 주어 텐션 저하를 막으세요."
    },
    doList: ["버튼을 누른 즉시(100ms 이내) 색상이나 눌림 효과를 주어 명령이 접수되었음을 알린다", "로딩이 길어질 때는 단순 멈춤 대신 스켈레톤 UI와 친절한 예상 대기 시간 멘트를 노출한다"],
    dontList: ["버튼을 눌렀는데 아무 피드백 없이 2초간 멍하니 굳어있게 하지 않는다", "불필요하게 길고 화려한 화면 전환 애니메이션을 1초 이상 틀어 작업 리듬을 방해하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "버튼 클릭 시 50ms 만에 딤드 및 로딩 텍스트 피드백을 주어 도허티 임계값을 완벽히 만족시켜 줘.",
      en: "Provide visual active feedback within 100ms of clicking to satisfy the Doherty threshold."
    },
    english: { term: "Doherty threshold", example: "Keeping interaction latency under the 400ms Doherty threshold keeps students engaged without breaking flow.", keyVocab: ["latency", "threshold", "productivity"] },
    purposeTags: ["usability", "motivation"], mediaTags: ["webapp"],
    demoType: "timingGame", demoConfig: { gameType: "latencyResponseTest" },
    related: [19, 51, 103], caseIds: [11], level: 2, factNote: "Walter J. Doherty & Ahrvind J. Thadani, 1982"
  },
  {
    id: 105, code: "105", slug: "gutenberg-diagram", chapter: "layout",
    nameKo: "구텐베르크 다이어그램", nameEn: "Gutenberg Diagram", aliasesKo: ["읽기 중력 다이어그램"],
    oneLiner: "균일한 문서를 읽을 때 시선은 좌측 상단에서 우측 하단으로 흘러내린다.",
    oneLinerEn: "Reading gravity pulls visual attention naturally from the top-left origin to the bottom-right terminal.",
    why: "서구권 및 한글 읽기 습관에서 비롯된 '읽기 중력(Reading gravity)' 때문에 좌측 상단은 첫 시선 영역(Primary), 우측 하단은 최종 종착 영역(Terminal area)이 됩니다.",
    analogy: "미끄럼틀을 타듯 문서 좌측 상단에서 출발해 우측 하단으로 자연스럽게 미끄러지는 시선이에요.",
    apply: {
      classroom: "학습지 좌상단에 제목과 학습 목표를 두고, 우하단에 최종 정답 제출란과 서명을 두세요.",
      webapp: "랜딩 페이지 좌상단에 매력적인 헤드라인을, 우하단에 메인 '지금 시작하기' 버튼을 배치하세요.",
      print: "가정통신문 좌상단에 핵심 알림 제목을, 우하단에 학교장 직인과 회신 확인란을 배치하세요."
    },
    doList: ["가장 먼저 읽혀야 할 중요한 출발 메시지는 좌측 상단에 배치한다", "사용자가 결정을 내리고 누를 최종 결정 버튼(CTA)은 우측 하단 터미널 영역에 배치한다"],
    dontList: ["가장 중요한 최종 제출 버튼을 시선이 닿지 않는 애매한 좌측 중간에 묻어두지 않는다", "우측 상단에 너무 무거운 정보를 넣어 자연스러운 시선의 흐름을 방해하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "구텐베르크 다이어그램을 따라 좌상단에 핵심 가치 헤드라인을, 우하단에 신청 버튼을 배치해 줘.",
      en: "Structure the layout following the Gutenberg diagram: primary headline top-left, final CTA bottom-right."
    },
    english: { term: "Gutenberg diagram", example: "The Gutenberg diagram predicts that terminal decision buttons perform best in the lower-right quadrant.", keyVocab: ["gravity", "quadrant", "terminal"] },
    purposeTags: ["readability", "usability"], mediaTags: ["slide", "notice", "worksheet", "webapp"],
    demoType: "gazeMap", demoConfig: { pathType: "diagonalGravity" },
    related: [7, 106, 107], caseIds: [], level: 1, factNote: "Arthur T. Turnbull & Russell N. Baird, 1964"
  },
  {
    id: 106, code: "106", slug: "z-pattern", chapter: "layout",
    nameKo: "Z의 법칙", nameEn: "Z Pattern", aliasesKo: ["Z자형 시선 흐름"],
    oneLiner: "시각 중심의 웹페이지나 포스터를 볼 때 시선은 Z자를 그리며 이동한다.",
    oneLinerEn: "On visually light, image-driven pages, the user's eye scans horizontally, diagonally, and horizontally.",
    why: "텍스트가 빽빽하지 않은 시각 중심 레이아웃에서 뇌는 상단 바를 훑고(좌→우), 대각선으로 내려와(우상→좌하), 다시 하단 바를 훑는(좌→우) 가장 경제적인 Z 궤적을 그립니다.",
    analogy: "영화 포스터를 볼 때 제목(좌상)→개봉일(우상)→배우 얼굴(중앙 대각선)→예매 버튼(우하) 순으로 보는 길이에요.",
    apply: {
      classroom: "학교 축제 홍보 포스터에서 상단 로고(좌)와 날짜(우), 중앙 사진, 하단 신청 링크(우)를 배치하세요.",
      webapp: "서비스 소개 첫 화면의 상단 내비바와 중앙 히어로 일러스트, 하단 CTA 버튼을 Z자 경로에 얹으세요.",
      print: "동아리 박람회 배너에서 핵심 카피와 부스 번호를 Z자 시선 길목에 정확히 걸치게 하세요."
    },
    doList: ["Z자의 4대 꼭짓점(좌상, 우상, 좌하, 우하)에 시선이 멈출 만한 핵심 정보를 배치한다", "대각선 경로 중간에 매력적인 시각 요소를 두어 시선을 연결한다"],
    dontList: ["중요한 버튼을 Z자 경로를 벗어난 애매한 좌측 여백 구석에 방치해 놓치게 만들지 않는다", "텍스트가 빽빽한 문서에 억지로 Z 패턴을 적용해 피로를 주지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "배너 카드의 좌상단에 로고, 우상단에 날짜, 대각선 가로질러 우하단에 접수 버튼을 두는 Z 패턴을 짜 줘.",
      en: "Design the promotional banner along a Z-pattern: logo top-left, date top-right, CTA bottom-right."
    },
    english: { term: "Z-pattern layout", example: "The Z-pattern layout guides casual visitors seamlessly through visual landing banners.", keyVocab: ["scanning", "diagonal", "promotional"] },
    purposeTags: ["attention", "readability"], mediaTags: ["poster", "banner", "webapp"],
    demoType: "gazeMap", demoConfig: { pathType: "zScan" },
    related: [7, 105, 107], caseIds: [4], level: 1, factNote: null
  },
  {
    id: 107, code: "107", slug: "f-pattern", chapter: "layout",
    nameKo: "F의 법칙", nameEn: "F Pattern", aliasesKo: ["F자형 시선 흐름"],
    oneLiner: "글이 많은 웹페이지를 볼 때 시선은 F자를 그리며 앞머리 위주로 훑는다.",
    oneLinerEn: "When scanning text-heavy web pages, reading behavior drops sharply into an F-shaped pattern.",
    why: "웹 사용자는 글을 꼼꼼히 완독하지 않고 필요한 키워드만 사냥(Information foraging)해요. 첫 줄은 길게 읽지만 아래로 내려갈수록 왼쪽 앞머리만 대충 훑어 내려갑니다.",
    analogy: "긴 신문 기사를 읽을 때 첫 문단만 읽고 그다음부터는 문단 첫 단어만 쓱쓱 훑어보는 습관이에요.",
    apply: {
      classroom: "학습지 긴 지문에서 문단의 첫 1~2단어에 핵심 키워드를 볼드체로 전진 배치하세요.",
      webapp: "공지사항 게시판 리스트에서 제목의 핵심 단어가 말줄임표(...)에 잘리지 않게 맨 앞에 두세요.",
      print: "가정통신문 각 단락의 첫머리에 불릿 포인트(•)와 굵은 소제목을 달아 훑어읽기를 도우세요."
    },
    doList: ["문단 첫머리 3~4단어 안에 핵심 키워드를 압축해 배치한다", "긴 줄글 사이에 시선을 붙잡는 명확한 소제목(H2, H3)과 불릿 기호를 3줄마다 삽입한다"],
    dontList: ["문단의 가장 마지막 문장에 결정적인 반전이나 결론을 숨겨두어 학생들이 놓치게 만들지 않는다", "단락 구분 없이 벽돌처럼 빽빽한 글 덩어리를 던져두어 스크롤만 휙 내리게 하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "F자 훑어읽기 습관을 고려해 각 항목의 핵심 명사를 맨 앞 첫머리에 굵은 텍스트로 배치해 줘.",
      en: "Front-load every list item with its core keyword in bold to support rapid F-pattern scanning."
    },
    english: { term: "F-shaped pattern", example: "Front-loading important keywords combats the F-shaped reading pattern and ensures key facts get noticed.", keyVocab: ["scanning", "front-load", "behavior"] },
    purposeTags: ["readability", "usability"], mediaTags: ["notice", "worksheet", "webapp"],
    demoType: "gazeMap", demoConfig: { pathType: "fScan" },
    related: [6, 92, 105], caseIds: [], level: 1, factNote: "Jakob Nielsen, 2006"
  },
  {
    id: 108, code: "108", slug: "n-pattern", chapter: "layout",
    nameKo: "N의 법칙", nameEn: "N Pattern", aliasesKo: ["N자형 시선 흐름", "세로 읽기 시선"],
    oneLiner: "세로로 긴 모바일 콘텐츠를 볼 때 시선은 N자를 그리며 위아래로 흐른다.",
    oneLinerEn: "Mobile users scan vertical feeds and tall banners in an N-shaped up-and-down visual rhythm.",
    why: "스마트폰의 세로형 종횡비 화면에서 사용자는 엄지손가락으로 스크롤을 내리며 왼쪽 기준선을 따라 내려갔다가 주요 시각 포인트로 사선 상승하는 N자 리듬을 탑니다.",
    analogy: "인스타그램이나 숏폼 피드를 볼 때 세로로 훑고 내려갔다가 관심 있는 태그로 튕겨 올라가는 눈길이에요.",
    apply: {
      classroom: "모바일 화면에 최적화된 한 컷 학습 카드뉴스에서 N자 동선 길목에 퀴즈 정답을 배치하세요.",
      webapp: "세로로 긴 모바일 상세 페이지에서 썸네일(상좌)→요약(하좌)→구매버튼(우상/우하) 흐름을 타세요.",
      print: "세로로 길쭉한 배너 현수막이나 세로형 명함 디자인에서 N자 시선 유도를 설계하세요."
    },
    doList: ["모바일 세로 화면의 특성에 맞춰 좌측 세로 기둥 라인에 핵심 시각 앵커를 배치한다", "스크롤 다운 시 자연스럽게 엄지가 닿는 우측 하단에 최종 다음 페이지 버튼을 둔다"],
    dontList: ["가로로 긴 데스크톱용 레이아웃을 무작정 세로 배너에 우겨넣어 시선 흐름을 뚝뚝 끊지 않는다", "글씨가 너무 작아 화면을 확대하느라 N자 시선 리듬을 깨뜨리지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "세로형 모바일 카드뉴스 레이아웃에 맞춰 좌상단 인트로에서 우하단 결론으로 이어지는 N자 동선을 짜 줘.",
      en: "Design a mobile vertical layout optimized for N-pattern scanning with key anchors along the vertical axis."
    },
    english: { term: "N-pattern scanning", example: "The N-pattern layout adapts classical reading gravity to the modern ergonomics of vertical mobile scrolling.", keyVocab: ["ergonomics", "vertical", "scanning"] },
    purposeTags: ["attention", "usability"], mediaTags: ["sns", "banner", "webapp"],
    demoType: "gazeMap", demoConfig: { pathType: "nScan" },
    related: [103, 105, 106], caseIds: [5], level: 2, factNote: null
  }
];
