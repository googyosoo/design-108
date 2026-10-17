/**
 * 001 - 025 원리 데이터 모듈 (심리 효과 1부)
 */
export const effects001to025 = [
  {
    id: 1, code: "001", slug: "kuleshov-effect", chapter: "psychology",
    nameKo: "쿨레쇼프 효과", nameEn: "Kuleshov Effect", aliasesKo: ["맥락 병치 효과"],
    oneLiner: "앞뒤에 놓인 이미지에 따라 같은 대상도 다르게 느껴진다.",
    oneLinerEn: "The meaning of an image changes depending on the surrounding visuals.",
    why: "뇌는 나란히 놓인 두 장면을 논리적으로 연결해 하나의 이야기로 해석하려는 경향이 있어요. 중간 대상이 무표정해도 앞뒤 맥락에 따라 감정을 채워 넣습니다.",
    analogy: "같은 학생 얼굴이라도 시험지 뒤에 보면 슬퍼 보이고 피자 뒤에 보면 행복해 보이는 것과 같아요.",
    apply: {
      classroom: "수업 슬라이드에서 인물 사진 바로 옆에 문제 상황이나 성공 장면을 배치해 맥락을 만드세요.",
      webapp: "완료 뱃지 옆에 축하 일러스트를 배치해 성취감을 극대화하세요.",
      print: "봉사활동 포스터에서 봉사자 얼굴 옆에 환하게 웃는 이웃의 모습을 나란히 두세요."
    },
    doList: ["의도하는 감정을 전달하는 전후 맥락 이미지를 신중히 고른다", "서로 다른 두 이미지를 나란히 두어 자연스러운 연결을 유도한다"],
    dontList: ["전달하려는 메시지와 상반되는 배경 사진을 무심코 나란히 두지 않는다", "인물의 표정과 완전히 동떨어진 상황 사진을 배치해 혼란을 주지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "학생 얼굴 사진 옆에 성취한 결과물 이미지를 배치해서 뿌듯한 감정이 절로 느껴지도록 카드 구도를 잡아 줘.",
      en: "Place the student portrait directly beside the achievement visual to create a natural feeling of pride."
    },
    english: { term: "Kuleshov effect", example: "Juxtaposing two images changes how viewers interpret the character's facial expression.", keyVocab: ["juxtapose", "interpret", "expression"] },
    purposeTags: ["emotion", "attention"], mediaTags: ["slide", "poster", "thumbnail"],
    demoType: "scenarioQuiz", demoConfig: { contextType: "adjacentVisuals" },
    related: [5, 24, 52], caseIds: [1], level: 1, factNote: "Lev Kuleshov, 1910s"
  },
  {
    id: 2, code: "002", slug: "charpentier-effect", chapter: "psychology",
    nameKo: "샤르팡티에 효과", nameEn: "Charpentier Effect", aliasesKo: ["크기-무게 착시"],
    oneLiner: "겉보기 부피가 크면 작을 때보다 더 가볍게 느껴진다.",
    oneLinerEn: "Objects with larger visual volume are perceived as lighter than smaller ones of equal weight.",
    why: "시각적으로 크면 무거울 것이라는 사전 기대를 갖게 돼요. 막상 들었을 때 기대보다 가벼우면 뇌가 실제 무게보다 훨씬 가볍다고 착각합니다.",
    analogy: "커다란 상자를 들었을 때 생각보다 쑥 들리면 깃털처럼 가볍게 느껴지는 것과 같아요.",
    apply: {
      classroom: "두꺼운 과제물 안내서라도 표지 여백을 넓혀 시각적 무게감을 덜어주세요.",
      webapp: "다운로드 용량이 큰 학습 파일은 카드 디자인을 넉넉하고 경쾌하게 구성하세요.",
      print: "많은 공지사항을 담은 가정통신문은 여백과 밝은 배경으로 부담을 줄이세요."
    },
    doList: ["방대한 학습 콘텐츠는 시원한 여백을 두어 가벼운 인상을 준다", "슬라이드 박스 크기를 키우고 글씨를 넉넉히 배치해 가독성을 높인다"],
    dontList: ["실제 분량은 적은데 겉포장만 과도하게 부풀려 실망감을 주지 않는다", "학습량을 축소 왜곡해 학생들에게 불필요한 혼선을 유발하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "시각적 경량화가 실제 학습량이나 과제 난이도를 속이는 수단으로 변질되지 않도록 주의해야 해요.",
    promptSnippet: {
      ko: "방대한 분량의 학습지라도 여백을 넓히고 경쾌한 폰트를 써서 첫인상이 부담스럽지 않게 만들어 줘.",
      en: "Design the multi-page handout layout with ample white space to reduce perceived study burden."
    },
    english: { term: "size-weight illusion", example: "The spacious layout makes the dense workbook feel much lighter and easier to read.", keyVocab: ["spacious", "perceived", "dense"] },
    purposeTags: ["perception", "readability"], mediaTags: ["worksheet", "slide", "webapp"],
    demoType: "choiceLab", demoConfig: { items: ["bigLight", "smallDense"] },
    related: [10, 82, 97], caseIds: [3], level: 2, factNote: "Augustin Charpentier, 1891"
  },
  {
    id: 3, code: "003", slug: "babyface-effect", chapter: "psychology",
    nameKo: "베이비페이스 효과", nameEn: "Babyface Effect", aliasesKo: ["동안 효과"],
    oneLiner: "동글동글한 동안 특징을 보면 무의식적인 호감과 보호 본능이 생긴다.",
    oneLinerEn: "Round and childlike facial features trigger trust and a protective instinct.",
    why: "큰 눈과 둥근 턱선 등 아기의 신체 특징은 진화론적으로 보호 본능을 자극해요. 화면 속 캐릭터나 아이콘이 둥글면 더 친근하고 무해하게 느낍니다.",
    analogy: "동그란 눈망울의 강아지 캐릭터를 보면 저절로 미소가 지어지는 마음이에요.",
    apply: {
      classroom: "신입생 안내 자료나 안전 수칙에 둥근 마스코트 캐릭터를 활용하세요.",
      webapp: "친근한 학습 피드백을 주는 챗봇 아바타에 둥근 곡선 요소를 적용하세요.",
      print: "동아리 신입 부원 모집 포스터에 부드러운 인상의 캐릭터를 배치하세요."
    },
    doList: ["친근함이 필요한 안내물에 둥근 곡선의 마스코트 디자인을 적용한다", "버튼 모서리를 부드럽게 굴려 친절한 인상을 강화한다"],
    dontList: ["엄중한 경고문이나 공식 징계 안내에 과도하게 귀여운 캐릭터를 남발하지 않는다", "전문성과 진중함이 최우선인 학술 문서에 유아적 요소를 넣지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "신입생 오리엔테이션 카드에 큰 눈과 둥근 볼을 가진 학교 마스코트 일러스트를 넣어 친근하게 꾸며 줘.",
      en: "Incorporate a friendly mascot with rounded facial features on the welcoming card to build trust."
    },
    english: { term: "babyface effect", example: "The rounded avatar creates instant warmth and approachable guidance for new students.", keyVocab: ["rounded", "approachable", "instinct"] },
    purposeTags: ["emotion", "trust"], mediaTags: ["poster", "notice", "webapp"],
    demoType: "compareToggle", demoConfig: { toggleStates: ["sharp", "rounded"] },
    related: [5, 27, 80], caseIds: [2], level: 1, factNote: null
  },
  {
    id: 4, code: "004", slug: "veblen-effect", chapter: "psychology",
    nameKo: "베블런 효과", nameEn: "Veblen Effect", aliasesKo: ["과시 효과"],
    oneLiner: "희소하고 얻기 어려울수록 소장 가치가 더 높게 느껴진다.",
    oneLinerEn: "People value and desire exclusive rewards more when they seem scarce.",
    why: "남들이 쉽게 갖지 못하는 희소한 표식은 자신의 특별함을 드러내고 싶은 욕구를 자극해요. 웹앱에서 달성하기 어려운 한정판 뱃지는 강력한 동기가 됩니다.",
    analogy: "전교생 중 단 10명만 받는 특별 독서 배지를 다들 갖고 싶어 하는 현상이에요.",
    apply: {
      classroom: "성실하게 과제를 완수한 학생에게만 수여하는 '골드 마스터' 인증 뱃지를 운영하세요.",
      webapp: "완벽 출석 달성자에게 차별화된 테마 컬러나 프로필 테두리를 부여하세요.",
      print: "우수 학급 신문 기자단에게 수여되는 특별 프레임 명함을 디자인하세요."
    },
    doList: ["노력에 상응하는 명예롭고 품격 있는 한정 배지 디자인을 제공한다", "달성 기준을 공정하고 투명하게 공개해 건강한 성취감을 고취한다"],
    dontList: ["물질적 과시나 위화감을 조성하는 방식으로 학생들을 서열화하지 않는다", "획득 조건을 숨겨두고 사행심을 자극하는 다크 패턴으로 악용하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "학생 간의 지나친 과시나 소외감을 유발하지 않도록 명예 중심의 보상으로 설계해야 해요.",
    promptSnippet: {
      ko: "학습 성취 100% 달성자에게 주어지는 인증서에 금빛 테두리와 고급스러운 엠블럼을 둘러 줘.",
      en: "Add an elegant gold border and distinguished emblem to the certificate for top-tier achievers."
    },
    english: { term: "Veblen effect", example: "Exclusive digital badges motivate learners by rewarding their sustained academic effort.", keyVocab: ["exclusive", "motivate", "reward"] },
    purposeTags: ["motivation", "emphasis"], mediaTags: ["webapp", "worksheet", "notice"],
    demoType: "choiceLab", demoConfig: { items: ["standard", "exclusive"] },
    related: [18, 30, 48], caseIds: [3, 10], level: 2, factNote: "Thorstein Veblen, 1899"
  },
  {
    id: 5, code: "005", slug: "halo-effect", chapter: "psychology",
    nameKo: "헤일로 효과", nameEn: "Halo Effect", aliasesKo: ["후광 효과"],
    oneLiner: "눈에 띄는 뛰어난 특징 하나가 전체 인상을 긍정적으로 좌우한다.",
    oneLinerEn: "One prominent positive attribute influences the overall impression of the entire design.",
    why: "사람은 복잡한 요소를 일일이 분석하기보다 첫눈에 들어오는 강렬한 장점을 바탕으로 전체를 빠르게 평가해요. 완성도 높은 표지는 내용 전체의 신뢰도를 높입니다.",
    analogy: "표지가 단정하고 깔끔한 보고서를 보면 내용도 알차고 정확할 것이라 기대하는 심리예요.",
    apply: {
      classroom: "학습지 맨 첫 장의 제목 타이포그래피와 여백을 정갈하게 디자인하세요.",
      webapp: "로그인이나 첫 홈 화면의 폰트와 간격을 완벽히 정돈해 신뢰감을 심어주세요.",
      print: "학교 설명회 브로슈어의 표지 종이 질감과 타이틀 로고를 고급화하세요."
    },
    doList: ["첫 대면 화면이나 표지의 레이아웃 완성도를 최상으로 끌어올린다", "신뢰를 주는 공인 기관 로고나 깔끔한 엠블럼을 상단에 정돈해 둔다"],
    dontList: ["화려한 겉포장으로 부실한 학습 내용을 가리는 눈속임으로 쓰지 않는다", "단 하나의 시각 요소만 믿고 본문의 오탈자나 정렬 오류를 방치하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "외형적 완성도가 알맹이 없는 부실한 정보를 과대포장하는 용도로 오남용되지 않아야 해요.",
    promptSnippet: {
      ko: "연수 교재 표지에 단정한 Pretendard 폰트와 절제된 엠블럼을 적용해 전문적인 첫인상을 줘.",
      en: "Create a highly polished cover design with clean typography to establish credibility immediately."
    },
    english: { term: "halo effect", example: "A professionally crafted cover creates a positive halo over the entire educational booklet.", keyVocab: ["crafted", "credibility", "influence"] },
    purposeTags: ["trust", "attention"], mediaTags: ["slide", "worksheet", "poster"],
    demoType: "scenarioQuiz", demoConfig: { compare: ["polished", "cluttered"] },
    related: [1, 3, 27], caseIds: [1, 2], level: 1, factNote: "Edward Thorndike, 1920"
  },
  {
    id: 6, code: "006", slug: "whitespace-effect", chapter: "psychology",
    nameKo: "화이트 스페이스 효과", nameEn: "Whitespace Effect", aliasesKo: ["여백의 미", "여백 효과"],
    oneLiner: "주변 여백이 넉넉할수록 그 안의 핵심 정보가 귀하고 선명하게 돋보인다.",
    oneLinerEn: "Ample surrounding space makes the central information look refined and prominent.",
    why: "요소 주위가 비어 있으면 시선이 분산되지 않고 핵심으로 자연스럽게 모여요. 뇌의 인지 부하가 줄어들어 훨씬 고급스럽고 정돈된 느낌을 받습니다.",
    analogy: "미술관 벽면에 그림 한 점만 걸려 있으면 저절로 숨을 죽이고 주목하게 되는 것과 같아요.",
    apply: {
      classroom: "수업 슬라이드 한 장에는 핵심 질문 하나만 두고 사방에 40px 이상 여백을 두세요.",
      webapp: "주요 행동 유도 버튼 주변에 최소 24px 이상의 빈 공간을 확보하세요.",
      print: "가정통신문 상단 안내 박스 주변 여백을 넓혀 전달력을 극대화하세요."
    },
    doList: ["강조하고 싶은 키워드 주위의 부가 요소를 과감하게 덜어낸다", "단락과 단락 사이에 최소 32px 이상의 숨 쉴 여백을 배치한다"],
    dontList: ["빈자리가 아깝다고 자투리 공간마다 아이콘이나 문구를 욱여넣지 않는다", "화이트 스페이스를 확보한다면서 글자 크기까지 지나치게 줄이지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "본문 슬라이드의 불필요한 장식을 걷어내고, 중앙 핵심 문장 주변에 넉넉한 화이트 스페이스를 남겨 줘.",
      en: "Clear clutter around the core sentence and apply generous white space for a focused, elegant layout."
    },
    english: { term: "whitespace effect", example: "Generous whitespace directs students' attention effortlessly to the key discussion question.", keyVocab: ["generous", "whitespace", "effortless"] },
    purposeTags: ["emphasis", "readability"], mediaTags: ["slide", "worksheet", "poster", "webapp"],
    demoType: "compareToggle", demoConfig: { toggleStates: ["crowded", "spacious"] },
    related: [10, 89, 92], caseIds: [1], level: 1, factNote: null
  },
  {
    id: 7, code: "007", slug: "eye-guiding-effect", chapter: "psychology",
    nameKo: "시선 유도 효과", nameEn: "Eye-Guiding Effect", aliasesKo: ["시선 단서 효과"],
    oneLiner: "사진 속 인물이 바라보는 곳을 보는 사람도 따라 보게 된다.",
    oneLinerEn: "We intuitively look where the people in an image are looking.",
    why: "인간은 타인의 시선 방향을 살펴 환경 속 위험이나 중요한 대상을 빠르게 확인하는 본능이 있어요. 화면 속 인물의 눈빛은 강력한 시선 안내자가 됩니다.",
    analogy: "길을 걷다 누군가 하늘을 쳐다보면 나도 모르게 하늘을 올려다보게 되는 심리예요.",
    apply: {
      classroom: "슬라이드 속 학생 사진의 시선이 오늘 배울 핵심 학습 목표 문장을 향하게 하세요.",
      webapp: "회원가입이나 제출 버튼 쪽으로 인물 일러스트의 고개와 시선을 맞추세요.",
      print: "동아리 모집 포스터에서 선배 모델이 지원 링크 QR코드를 바라보게 배치하세요."
    },
    doList: ["인물의 시선 끝부분에 사용자가 꼭 읽어야 할 텍스트를 배치한다", "시선 방향을 왼쪽에서 오른쪽으로 흐르는 자연스러운 읽기 동선과 일치시킨다"],
    dontList: ["인물이 화면 바깥을 멍하니 바라보게 두어 사용자 시선을 이탈시키지 않는다", "여러 인물의 시선이 서로 제각각 다른 방향을 보게 해 혼선을 주지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "인물 사진의 시선이 오른쪽 '참가 신청' 버튼을 똑바로 가리키도록 사진을 좌우 반전해 배치해 줘.",
      en: "Position the portrait so that the gaze directly guides the viewer toward the registration button."
    },
    english: { term: "gaze cueing", example: "The teacher's gaze leads students straight to the crucial formula on the slide.", keyVocab: ["gaze", "cueing", "crucial"] },
    purposeTags: ["attention", "emphasis"], mediaTags: ["slide", "poster", "webapp", "thumbnail"],
    demoType: "gazeMap", demoConfig: { variant: "faceDirection", states: ["toward", "away"] },
    related: [8, 9, 105], caseIds: [2, 3], level: 1, factNote: null
  },
  {
    id: 8, code: "008", slug: "pointing-effect", chapter: "psychology",
    nameKo: "포인팅 효과", nameEn: "Pointing Effect", aliasesKo: ["지시 효과", "손짓 효과"],
    oneLiner: "손가락이나 손짓이 가리키는 대상에 무조건 시선이 먼저 꽂힌다.",
    oneLinerEn: "Pointing gestures instantly draw and focus visual attention onto specific elements.",
    why: "손짓은 언어 이전부터 의사소통에 쓰인 가장 원초적인 지각 신호예요. 손가락 끝이 향하는 지점은 뇌에서 즉각적인 주의 집중 명령으로 처리됩니다.",
    analogy: "친구가 '저기 봐!' 하고 손가락을 뻗으면 반사적으로 그 손끝을 쳐다보는 행동이에요.",
    apply: {
      classroom: "복잡한 과학 실험 도해에서 캐릭터의 손짓으로 주의해야 할 밸브를 가리키세요.",
      webapp: "처음 방문한 튜토리얼 화면에서 가이드 손짓 아이콘으로 다음 입력창을 가리키세요.",
      print: "진로 박람회 리플릿에서 캐릭터가 부스 배치도 입구를 짚어주게 하세요."
    },
    doList: ["가장 결정적인 핵심 버튼이나 요약 수치에 한해 손짓 그래픽을 사용한다", "손가락 끝과 대상 요소 사이의 거리를 가깝게 두어 즉각성을 높인다"],
    dontList: ["한 화면에 손짓 화살표를 여러 개 어지럽게 남발하지 않는다", "손짓 끝에 아무런 정보가 없거나 엉뚱한 여백을 가리키지 않게 검수한다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "캐릭터가 손가락으로 '핵심 정리 3가지' 박스를 정확히 가리키는 일러스트를 삽입해 줘.",
      en: "Add a friendly illustration pointing directly to the three key takeaways box."
    },
    english: { term: "pointing effect", example: "A clear pointing gesture directs the student's eye to the most important safety rule.", keyVocab: ["gesture", "direct", "safety"] },
    purposeTags: ["attention", "emphasis"], mediaTags: ["thumbnail", "slide", "poster"],
    demoType: "gazeMap", demoConfig: { variant: "pointingFinger" },
    related: [7, 9, 103], caseIds: [6], level: 1, factNote: null
  },
  {
    id: 9, code: "009", slug: "arrow-effect", chapter: "psychology",
    nameKo: "화살표 효과", nameEn: "Arrow Effect", aliasesKo: ["방향 지시선"],
    oneLiner: "화살표의 뾰족한 방향을 따라 뇌는 저절로 다음 행동을 예측한다.",
    oneLinerEn: "Arrows serve as universal signposts that guide movement and logical sequence.",
    why: "화살표는 문화와 언어를 초월한 만국 공통의 시각 기호예요. 뾰족한 머리 방향으로 움직임과 인과 관계가 발생한다고 뇌가 무의식적으로 확신합니다.",
    analogy: "복도 바닥에 그려진 화살표만 따라가면 자연스럽게 목적지에 도달하는 원리예요.",
    apply: {
      classroom: "역사 사건의 전개나 생물 순환 과정을 설명할 때 명확한 화살표로 연결하세요.",
      webapp: "온보딩 단계(Step 1 → Step 2 → Step 3) 사이에 부드러운 화살표를 넣으세요.",
      print: "행사장 동선 안내문에 크고 선명한 화살표를 배치해 혼잡을 막으세요."
    },
    doList: ["순서와 인과관계가 중요한 흐름도에 직관적인 화살표 머리를 사용한다", "읽기 순서(좌→우, 상→하)와 화살표 진행 방향을 일치시킨다"],
    dontList: ["단순 장식 목적으로 무의미한 화살표를 배경에 남발하지 않는다", "화살표 꼬리와 머리가 불분명해 어느 쪽으로 가야 할지 헷갈리게 하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "3단계 학습 절차 카드 사이에 오른쪽을 가리키는 깔끔한 선형 화살표를 이어 줘.",
      en: "Connect the 3-step learning cards with clean horizontal directional arrows."
    },
    english: { term: "arrow cueing", example: "Directional arrows guide readers seamlessly through the complex experimental process.", keyVocab: ["directional", "seamlessly", "process"] },
    purposeTags: ["attention", "usability"], mediaTags: ["slide", "worksheet", "thumbnail"],
    demoType: "gazeMap", demoConfig: { variant: "arrowPath" },
    related: [7, 8, 93], caseIds: [7], level: 1, factNote: null
  },
  {
    id: 10, code: "010", slug: "contrast-effect", chapter: "psychology",
    nameKo: "대비 효과", nameEn: "Contrast Effect", aliasesKo: ["비교 대비"],
    oneLiner: "상반된 두 요소를 나란히 놓으면 차이점이 몇 배로 또렷하게 드러난다.",
    oneLinerEn: "Juxtaposing opposite elements magnifies the perceived difference between them.",
    why: "인간의 지각 체계는 절대적인 값을 측정하기보다 주변 기준점과의 상대적 차이를 통해 정보를 인지해요. 어두운 배경 속 밝은 점은 더 밝게 느껴집니다.",
    analogy: "키가 아주 큰 농구 선수 옆에 서면 내 키가 평소보다 훨씬 작아 보이는 현상이에요.",
    apply: {
      classroom: "문법의 올바른 예문과 틀린 예문을 좌우로 나란히 두어 오류를 즉각 식별하게 하세요.",
      webapp: "무료 플랜과 프리미엄 추천 플랜을 나란히 배치해 혜택 차이를 극대화하세요.",
      print: "청소 전 어수선한 교실과 청소 후 쾌적한 교실 사진을 대조해 게시하세요."
    },
    doList: ["비교하려는 핵심 속성을 명확한 기준에 맞춰 1:1로 나란히 맞세운다", "배경과 텍스트의 명도 대비를 4.5:1 이상 확보해 또렷하게 대비시킨다"],
    dontList: ["차이를 과장하기 위해 한쪽 데이터의 축이나 크기 척도를 왜곡하지 않는다", "너무 많은 요소를 한꺼번에 비교해 인지적 과부하를 주지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "잘못된 문단 작성 사례(왼쪽)와 모범 리라이팅 사례(오른쪽)를 2단 카드 대비로 나란히 구성해 줘.",
      en: "Design a two-column card layout contrasting the flawed draft on the left with the polished version on the right."
    },
    english: { term: "contrast effect", example: "Side-by-side contrast illuminates the structural differences between the two essay drafts.", keyVocab: ["contrast", "illuminate", "structural"] },
    purposeTags: ["emphasis", "readability"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "compareToggle", demoConfig: { variant: "beforeAfter" },
    related: [6, 92, 102], caseIds: [3, 5], level: 1, factNote: null
  },
  {
    id: 11, code: "011", slug: "tunnel-effect", chapter: "psychology",
    nameKo: "터널 효과", nameEn: "Tunnel Effect", aliasesKo: ["터널 비전"],
    oneLiner: "주변을 어둡게 가리거나 좁히면 오직 열린 통로 끝에만 시선이 몰입된다.",
    oneLinerEn: "Dimming the periphery directs intense visual focus exclusively through a narrow opening.",
    why: "위기 상황이나 좁은 시야 속에서 뇌는 주변 정보를 차단하고 유일하게 탈출구 역할을 하는 빛나는 지점에 모든 주의 자원을 집중시킵니다.",
    analogy: "어두운 터널 속을 달릴 때 저 멀리 보이는 출구 불빛만 응시하게 되는 경험이에요.",
    apply: {
      classroom: "선생님이 설명하는 문장 외에 나머지 텍스트를 반투명 블러 처리해 집중시키세요.",
      webapp: "모달 창이 뜰 때 배경 화면을 어두운 딤드(dimmed) 처리해 모달에만 몰입시키세요.",
      print: "학급 앨범에서 단체 사진 속 특정 주인공 주위에 비네팅 그림자를 둘러주세요."
    },
    doList: ["집중이 필요한 결정적 순간에 배경을 딤드 처리해 조작 실수를 예방한다", "중요한 알림창이 닫히기 전까지는 배경 클릭을 일시 차단해 확인을 돕는다"],
    dontList: ["사용자가 언제든 벗어날 수 있는 닫기(X) 버튼이나 Esc 키를 차단하지 않는다", "터널 뷰 상태에서 너무 많은 텍스트를 담아 답답함을 초래하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "중요 퀴즈 질문이 뜰 때 뒷배경을 60% 블랙 오버레이로 어둡게 가려 질문에만 온전히 시선을 모아 줘.",
      en: "Apply a 60% black dimmed overlay behind the quiz card to create a tunnel focus on the question."
    },
    english: { term: "tunnel vision effect", example: "The dimmed background creates tunnel focus, preventing distractions during the test.", keyVocab: ["dimmed", "distraction", "focus"] },
    purposeTags: ["attention", "readability"], mediaTags: ["webapp", "slide"],
    demoType: "gazeMap", demoConfig: { variant: "vignetteFocus" },
    related: [6, 10, 89], caseIds: [], level: 2, factNote: null
  },
  {
    id: 12, code: "012", slug: "bandwagon-effect", chapter: "psychology",
    nameKo: "밴드왜건 효과", nameEn: "Bandwagon Effect", aliasesKo: ["편승 효과", "대세 효과"],
    oneLiner: "다수의 동료가 선택했다는 사실을 보면 나도 따라 선택하고 싶어진다.",
    oneLinerEn: "People are inclined to follow choices made by the majority of their peers.",
    why: "다수가 선택한 길은 검증되었고 안전할 것이라는 사회적 증거(Social Proof) 심리와 소외되기 싫은 동조 심리가 복합적으로 작용해요.",
    analogy: "급식실에서 친구들이 모두 A메뉴 줄에 서 있으면 나도 덩달아 A를 고르는 심리예요.",
    apply: {
      classroom: "방과후 강좌 안내서에 '지난 학기 수강생 94% 만족' 지표를 부착하세요.",
      webapp: "가장 인기 있는 추천 단어장 옆에 '학생 1,200명이 학습 중' 라벨을 표시하세요.",
      print: "동아리 홍보지에 '작년 최우수 동아리 선정, 부원 40명 활동' 수치를 강조하세요."
    },
    doList: ["실제 검증된 통계 수치와 긍정적인 학생 후기를 투명하게 공유한다", "선택을 망설이는 학생에게 가장 대중적인 추천 옵션을 친절히 안내한다"],
    dontList: ["가짜 참가자 수나 조작된 리뷰로 거짓 대세를 꾸며내지 않는다", "소수 학생의 개성 있는 선택을 비정상인 것처럼 위축시키는 문구를 쓰지 않는다"],
    ethicsLevel: "caution", ethicsNote: "거짓 통계로 편승을 유도하거나 소수 의견을 배제하는 군중 심리 조작으로 흘러가지 않도록 경계해야 해요.",
    promptSnippet: {
      ko: "'전교생의 85%가 신청 완료한 인기 강좌' 뱃지를 카드 우측 상단에 눈에 띄게 달아 줘.",
      en: "Add a prominent badge indicating that 85% of peers have enrolled in this popular workshop."
    },
    english: { term: "bandwagon effect", example: "Displaying enrollment statistics harnesses the bandwagon effect to reassure hesitant learners.", keyVocab: ["enrollment", "harness", "reassure"] },
    purposeTags: ["trust", "choice"], mediaTags: ["notice", "poster", "webapp"],
    demoType: "scenarioQuiz", demoConfig: { scenario: "classEnrollment" },
    related: [4, 18, 41, 39], caseIds: [2, 3, 9], level: 1, factNote: null
  },
  {
    id: 13, code: "013", slug: "honeymoon-hangover-effect", chapter: "psychology",
    nameKo: "허니문·행오버 효과", nameEn: "Honeymoon-Hangover Effect", aliasesKo: ["도입기 환호와 피로"],
    oneLiner: "새 도구를 처음 만났을 땐 열광하지만 점차 피로감이 찾아온다.",
    oneLinerEn: "Initial enthusiasm for a new tool fades over time, replaced by practical friction.",
    why: "초기 새로움(Novelty)이 주는 도파민 흥분은 시간이 흐르면 급격히 사라져요. 장기적인 사용성을 위해서는 반짝 흥미보다 지속 가능한 습관 설계가 필수적입니다.",
    analogy: "새 학용품을 산 첫날은 공부가 잘되다가 일주일만 지나면 평소대로 돌아오는 기분이에요.",
    apply: {
      classroom: "새 교육 앱 도입 2주 차에 난이도를 낮춘 복습 퀘스트로 피로감을 덜어주세요.",
      webapp: "첫 온보딩의 화려한 연출에만 치중하지 말고, 일상 조작의 단축키와 반응속도를 갈고닦으세요.",
      print: "학습 플래너 첫 페이지에 작심삼일을 극복할 수 있는 2주 차 점검 체크리스트를 넣으세요."
    },
    doList: ["도입 초기 신선함에 의존하지 않고 장기 유지에 필요한 실용적 가치를 제공한다", "반복 사용 시 피로를 유발하는 불필요한 클릭 수와 애니메이션을 축소한다"],
    dontList: ["화려한 겉보기 기능만 앞세우고 정작 자주 쓰는 기본 입력 기능을 불편하게 방치하지 않는다", "초기 흥미가 식은 사용자를 불성실한 태도로 탓하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "첫 진입 화면은 경쾌하게 환영하되, 3회 차 이상 방문 학생에게는 곧바로 본문으로 진입하는 바로가기를 줘.",
      en: "Keep the initial welcome friendly, but provide direct bypass shortcuts for returning regular students."
    },
    english: { term: "honeymoon-hangover effect", example: "Designing simple daily workflows helps students overcome the post-honeymoon fatigue with digital tools.", keyVocab: ["workflow", "fatigue", "sustain"] },
    purposeTags: ["motivation", "usability"], mediaTags: ["webapp", "worksheet"],
    demoType: "scenarioQuiz", demoConfig: { stage: "retentionDrop" },
    related: [27, 32, 104], caseIds: [], level: 2, factNote: "Boswell et al., 2005"
  },
  {
    id: 14, code: "014", slug: "decoy-effect", chapter: "psychology",
    nameKo: "디코이 효과", nameEn: "Decoy Effect", aliasesKo: ["미끼 효과", "비대칭 지배"],
    oneLiner: "미끼 선택지를 끼워 넣으면 목표 선택지가 훨씬 이득처럼 보인다.",
    oneLinerEn: "An inferior decoy option makes the target choice look far more attractive and valuable.",
    why: "인간은 절대 가치보다 비교 가능한 두 선택지 사이의 우열을 훨씬 쉽게 판단해요. 매력 없는 미끼를 배치하면 목표 선택지의 가치가 압도적으로 돋보입니다.",
    analogy: "팝콘 소형(3천원), 중형(5천원), 대형(5천5백원)일 때 중형 때문에 대형을 고르게 되는 원리예요.",
    apply: {
      classroom: "토론 수업에서 다크 패턴 분석 예시로 디코이 가격 책정 사례를 다루세요.",
      webapp: "학습 플랜 구성 시 학생이 합리적으로 판단할 수 있도록 미끼 없는 정직한 옵션을 제시하세요.",
      print: "도서관 독서 프로그램에서 다양한 난이도 옵션을 왜곡 없이 공정하게 나열하세요."
    },
    doList: ["미끼 효과의 작동 원리를 투명하게 공개해 학생들의 비판적 미디어 리터러시를 기른다", "선택지의 혜택과 비용을 있는 그대로 명확하게 병기한다"],
    dontList: ["가장 비싼 결제를 유도하기 위해 교묘한 들러리 옵션을 끼워 넣어 속이지 않는다", "불필요한 과소비를 학생이나 학부모에게 유도하는 상업적 상술을 모방하지 않는다"],
    ethicsLevel: "risk", ethicsNote: "소비자를 조작해 더 비싼 지출을 유도하는 대표적 상업 기술이므로 교육적으로 비판적 분석 대상이에요.",
    promptSnippet: {
      ko: "선택지 3개를 비교할 때 미끼 없이 각 플랜의 순수 혜택과 특성을 왜곡 없이 동등하게 보여 줘.",
      en: "Display all three options equitably with objective feature comparisons, avoiding manipulative decoy tactics."
    },
    english: { term: "decoy effect", example: "Analyzing the decoy effect empowers students to spot subtle pricing manipulation in modern apps.", keyVocab: ["decoy", "manipulation", "empower"] },
    purposeTags: ["choice", "perception"], mediaTags: ["webapp", "notice"],
    demoType: "choiceLab", demoConfig: { items: ["basic", "decoy", "target"] },
    related: [25, 28, 30], caseIds: [3], level: 3, factNote: "Joel Huber et al., 1982"
  },
  {
    id: 15, code: "015", slug: "labeling-effect", chapter: "psychology",
    nameKo: "낙인 효과", nameEn: "Labeling Effect", aliasesKo: ["라벨링 효과", "스티그마 효과"],
    oneLiner: "이름표를 붙이면 점차 그 라벨에 어울리는 행동을 하게 된다.",
    oneLinerEn: "Attaching a label influences people to conform to the expectations of that label.",
    why: "사람은 부여받은 정체성(Identity)과 사회적 호칭에 자신의 태도와 자기 암시를 일치시키려는 심리적 동조 성향을 가지고 있어요.",
    analogy: "'우리 반의 친절 대사'라는 명찰을 달아주면 친구들을 더 배려하고 돕게 되는 변화예요.",
    apply: {
      classroom: "역할 분담 시 '청소 담당' 대신 '교실 환경 지킴이'라는 긍정적 라벨을 붙이세요.",
      webapp: "오답자에게 '낙제자' 대신 '도전 탐험가'라는 성장의 라벨을 부여하세요.",
      print: "봉사활동 표창장에 '성실하고 믿음직한 멘토'라는 기대 명칭을 크게 기재하세요."
    },
    doList: ["학생의 자존감과 잠재력을 북돋우는 긍정적이고 성장 지향적인 라벨을 사용한다", "구체적인 행동과 태도를 격려하는 따뜻한 역할 명칭을 부여한다"],
    dontList: ["'수포자', '지각 대장' 등 학생의 미래를 규정짓고 위축시키는 부정적 낙인을 찍지 않는다", "학업 성적을 기준으로 학생을 등급화하여 고착화된 꼬리표를 붙이지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "학습 성취 배지에 '수학 탐구 마스터'라는 자긍심을 주는 긍정적 역할 라벨을 달아 줘.",
      en: "Attach an inspiring achievement label like 'Curious Math Explorer' to boost student self-efficacy."
    },
    english: { term: "labeling effect", example: "Positive labeling reinforces student confidence and encourages constructive classroom participation.", keyVocab: ["labeling", "reinforce", "constructive"] },
    purposeTags: ["motivation", "trust"], mediaTags: ["worksheet", "notice", "webapp"],
    demoType: "scenarioQuiz", demoConfig: { labelType: "positiveIdentity" },
    related: [20, 24, 37], caseIds: [2], level: 1, factNote: "Howard S. Becker, 1963"
  },
  {
    id: 16, code: "016", slug: "gain-loss-effect", chapter: "psychology",
    nameKo: "게인로스 효과", nameEn: "Gain-Loss Effect", aliasesKo: ["득실 효과"],
    oneLiner: "처음부터 따뜻했던 사람보다 차갑다가 친절해진 반전에 더 끌린다.",
    oneLinerEn: "A shift from negative to positive feedback creates a stronger emotional impact than constant praise.",
    why: "늘 주어지는 칭찬은 익숙해져 감흥이 덜하지만, 비판이나 무관심 속에서 획득한 인정은 불확실성을 해소하며 뇌에 더 강력한 보상 쾌감을 제공해요.",
    analogy: "엄격하기로 소문난 호랑이 선생님께 받은 '참 잘했다' 칭찬 한마디가 평생 기억에 남는 이치예요.",
    apply: {
      classroom: "피드백을 줄 때 부족한 점을 먼저 냉정히 짚어준 뒤 극적인 개선점을 칭찬하세요.",
      webapp: "어려운 고난도 문제를 푼 순간 화면 가득 반전 축하 애니메이션을 선물하세요.",
      print: "자기소개서 작성 가이드에서 초반 갈등과 후반 성장의 반전 서사를 안내하세요."
    },
    doList: ["냉정한 객관적 평가 뒤에 진심 어린 개선 칭찬을 배치해 신뢰를 구축한다", "엄격한 기준을 통과했을 때 진정한 성취의 기쁨을 느낄 수 있게 설계한다"],
    dontList: ["일부러 학생에게 상처를 주기 위해 인격 모독적 악평을 가하는 폭력을 쓰지 않는다", "칭찬 효과를 극대화하겠다고 학생을 불안과 공포에 떨게 만들지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "도전 과제 피드백 카드에 엄격한 기준 안내 후 '훌륭히 극복해냈어요!'라는 축하 배지를 크게 보여 줘.",
      en: "Structure the feedback card with a realistic challenge assessment followed by an inspiring congratulatory badge."
    },
    english: { term: "gain-loss effect", example: "Constructive critique followed by sincere affirmation amplifies the student's sense of achievement.", keyVocab: ["critique", "affirmation", "amplify"] },
    purposeTags: ["emotion", "motivation"], mediaTags: ["worksheet", "webapp", "slide"],
    demoType: "scenarioQuiz", demoConfig: { feedbackPattern: "critiqueToPraise" },
    related: [22, 30, 33], caseIds: [], level: 2, factNote: "Elliot Aronson & Darwyn Linder, 1965"
  },
  {
    id: 17, code: "017", slug: "symmetry-effect", chapter: "psychology",
    nameKo: "대칭 효과", nameEn: "Symmetry Effect", aliasesKo: ["대칭의 미학"],
    oneLiner: "좌우나 상하가 균형 잡힌 대칭 구조는 안정감과 신뢰감을 준다.",
    oneLinerEn: "Symmetrical compositions naturally convey balance, order, and visual stability.",
    why: "인간의 뇌는 대칭 구조를 정보 처리가 쉬운 친숙한 형태로 인식해요. 인지적 노력이 적게 들기 때문에 본능적인 편안함과 질서를 느끼게 됩니다.",
    analogy: "좌우가 반듯하게 정돈된 교실 게시판을 보면 마음이 차분해지는 느낌이에요.",
    apply: {
      classroom: "학교 공식 상장이나 장학 증서 디자인에 좌우 완벽한 대칭 레이아웃을 쓰세요.",
      webapp: "회원가입 완료 화면이나 결제 영수증 카드를 중앙 대칭으로 정렬하세요.",
      print: "학교 축제 초대장의 타이틀과 대표 엠블럼을 정중앙 대칭으로 배치하세요."
    },
    doList: ["공식 행사나 엄숙한 의식 안내문에 좌우 균형 잡힌 중앙 정렬을 활용한다", "대칭축을 명확히 잡고 양쪽 여백의 폭을 정밀하게 일치시킨다"],
    dontList: ["모든 본문 텍스트까지 중앙 정렬해 긴 글의 읽기 시작점을 헤매게 만들지 않는다", "지나치게 경직된 대칭만 고집해 디자인을 지루하고 따분하게 만들지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "장학증서 디자인의 모든 로고, 제목, 서명란을 정중앙 수직축 기준으로 완벽한 대칭으로 맞춰 줘.",
      en: "Align all certificates elements symmetrically along the central vertical axis for formal dignity."
    },
    english: { term: "visual symmetry", example: "Symmetrical alignment lends institutional authority and calm order to the ceremonial brochure.", keyVocab: ["symmetry", "authority", "ceremonial"] },
    purposeTags: ["trust", "readability"], mediaTags: ["poster", "notice", "slide"],
    demoType: "compareToggle", demoConfig: { toggleStates: ["asymmetric", "symmetric"] },
    related: [6, 90, 98], caseIds: [5], level: 1, factNote: null
  },
  {
    id: 18, code: "018", slug: "snob-effect", chapter: "psychology",
    nameKo: "스놉 효과", nameEn: "Snob Effect", aliasesKo: ["속물 효과", "백로 효과"],
    oneLiner: "모두가 다 가진 흔한 것은 싫고, 나만의 특별한 것을 찾고 싶어진다.",
    oneLinerEn: "Demand drops when goods become common, driven by a desire for individuality.",
    why: "집단에 묻히지 않고 자신만의 뚜렷한 개성과 고유한 정체성을 표현하고 싶은 심리가 작동해요. 너무 흔해진 유행은 매력을 잃고 독창적인 소수를 선호합니다.",
    analogy: "모두가 똑같은 롱패딩을 입고 다닐 때 일부러 다른 색 코트를 골라 입는 마음이에요.",
    apply: {
      classroom: "진로 탐색 수업에서 남들이 잘 선택하지 않는 이색 직업 로드맵을 소개하세요.",
      webapp: "학습자 프로필에 획일화된 기본 아바타 외에 개성을 뽐낼 커스텀 옵션을 주세요.",
      print: "독서 캠프 포스터에 '남들이 안 읽은 숨겨진 명작 찾기' 테마를 내세우세요."
    },
    doList: ["자신만의 고유한 진로와 취향을 당당하게 탐색할 수 있는 선택지를 마련한다", "개인화된 학습 테마 선택을 지원해 주도적인 학습 태도를 장려한다"],
    dontList: ["타인의 대중적인 취향을 '흔하다'며 비하하거나 조롱하는 분위기를 만들지 않는다", "값비싼 물건을 소유해야만 특별한 사람인 양 물질적 우월감을 부추기지 않는다"],
    ethicsLevel: "risk", ethicsNote: "차별화 욕구가 타인에 대한 우월의식이나 배타적 속물근성으로 왜곡되지 않도록 주의해야 해요.",
    promptSnippet: {
      ko: "개성 넘치는 커스텀 학습 테마 3가지를 제시해서 나만의 스타일을 직접 고르게 해 줘.",
      en: "Provide distinctive customizable theme options so learners can express their individuality."
    },
    english: { term: "snob effect", example: "Offering custom interface themes satisfies students' desire for individual expression.", keyVocab: ["custom", "individuality", "expression"] },
    purposeTags: ["motivation", "choice"], mediaTags: ["webapp", "poster"],
    demoType: "scenarioQuiz", demoConfig: { choiceScenario: "customAvatar" },
    related: [4, 12, 48], caseIds: [5], level: 2, factNote: "Harvey Leibenstein, 1950"
  },
  {
    id: 19, code: "019", slug: "zeigarnik-effect", chapter: "psychology",
    nameKo: "자이가르닉 효과", nameEn: "Zeigarnik Effect", aliasesKo: ["미완성 효과"],
    oneLiner: "끝마친 일보다 하다가 도중에 중단된 일이 훨씬 오래 머릿속에 맴돈다.",
    oneLinerEn: "Unfinished tasks stick in the memory longer than fully completed ones.",
    why: "과제가 미완성 상태일 때 뇌는 심리적 긴장감을 계속 유지해요. 작업이 완료되어 뇌의 인지적 파일이 완전히 닫히기 전까지는 기억이 끊임없이 인출됩니다.",
    analogy: "드라마가 가장 흥미진진한 순간에 '다음 주에 계속' 하고 끝나면 일주일 내내 생각나는 현상이에요.",
    apply: {
      classroom: "수업을 마칠 때 다음 차시의 핵심 미스터리 질문을 던지며 끝내 호기심을 유지하세요.",
      webapp: "학습 진도바를 '80% 완료! 마지막 2문제 남음'처럼 미완성 상태로 시각화하세요.",
      print: "학습지 마지막 문제 하단에 '정답 해설은 다음 주 수업에서 공개!' 문구를 넣으세요."
    },
    doList: ["다음에 이어서 해야 할 행동을 명확한 체크박스와 잔여 수치로 보여준다", "수업 도입부나 종료부에 흥미로운 물음표를 남겨 자율적인 탐구를 유도한다"],
    dontList: ["낚시성 썸네일처럼 허탈하고 사기적인 미완성 낚시로 학생들을 기만하지 않는다", "과제를 끝내지 못했다는 자책감과 극심한 스트레스를 주며 압박하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "단어장 상단에 '오늘의 목표 5개 중 4개 완료! 단 1개 남았어요'라는 진도 카드를 띄워 줘.",
      en: "Display an incomplete progress state showing '4 of 5 done, just 1 remaining!' to prompt completion."
    },
    english: { term: "Zeigarnik effect", example: "Highlighting incomplete tasks motivates students to return and finish their daily study goals.", keyVocab: ["incomplete", "motivate", "sustain"] },
    purposeTags: ["motivation", "memory"], mediaTags: ["webapp", "worksheet", "thumbnail"],
    demoType: "scenarioQuiz", demoConfig: { progressState: "incomplete80" },
    related: [31, 32, 104], caseIds: [6, 7], level: 1, factNote: "Bluma Zeigarnik, 1927"
  },
  {
    id: 20, code: "020", slug: "placebo-effect", chapter: "psychology",
    nameKo: "플라세보 효과", nameEn: "Placebo Effect", aliasesKo: ["위약 효과"],
    oneLiner: "효과가 있을 것이라는 굳은 믿음 자체가 긍정적인 실제 결과를 만들어낸다.",
    oneLinerEn: "Believing that an intervention will work can trigger actual positive improvements.",
    why: "뇌가 품은 기대와 믿음은 엔도르핀과 신경전달물질의 분비를 촉진해요. 심리적 확신이 실제 인지 수행 능력과 신체적 반응의 향상으로 이어집니다.",
    analogy: "'이 비타민 사탕을 먹으면 집중력이 좋아진다'는 말을 믿고 시험을 더 잘 치르는 경우예요.",
    apply: {
      classroom: "활동 전 '이 학습법은 암기 속도를 2배 높여준다'는 긍정적 안내를 들려주세요.",
      webapp: "집중 모드 진입 시 '뇌가 가장 편안해지는 음향과 화면이 준비되었어요'를 띄우세요.",
      print: "수능 응원 카드에 '노력한 만큼 반드시 기적이 일어난다'는 확신 문구를 새기세요."
    },
    doList: ["학습자의 자기 효능감과 도전 의지를 고취하는 건설적인 암시를 활용한다", "학습 도구의 설계 의도와 긍정적 효과를 사전에 친절하게 설명한다"],
    dontList: ["검증되지 않은 민간요법이나 영양제 효능을 의학적 진실인 것처럼 속이지 않는다", "근거 없는 거짓 효능으로 학생들에게 가짜 기대감을 심어주지 않는다"],
    ethicsLevel: "caution", ethicsNote: "긍정적 동기 유발을 넘어 과학적 사실을 왜곡하거나 사기성 효과를 조장하지 않아야 해요.",
    promptSnippet: {
      ko: "집중 타이머 실행 전 '지금부터 당신의 집중력이 최고조로 발휘됩니다'라는 문구를 띄워 줘.",
      en: "Show an encouraging affirmation stating that peak concentration begins now before the timer starts."
    },
    english: { term: "placebo effect", example: "Encouraging design affirmations prime students' confidence before tackling demanding tests.", keyVocab: ["affirmation", "confidence", "demanding"] },
    purposeTags: ["motivation", "trust"], mediaTags: ["webapp", "slide", "notice"],
    demoType: "scenarioQuiz", demoConfig: { affirmationType: "confidenceBoost" },
    related: [5, 15, 24], caseIds: [3], level: 2, factNote: null
  },
  {
    id: 21, code: "021", slug: "sunk-cost-fallacy", chapter: "psychology",
    nameKo: "매몰 비용 효과", nameEn: "Sunk Cost Fallacy", aliasesKo: ["매몰 비용 오류"],
    oneLiner: "이미 쏟아부은 시간과 노력이 아까워 손해인 줄 알면서도 그만두지 못한다.",
    oneLinerEn: "People persist in an endeavor because of previously invested time and resources.",
    why: "과거에 투입한 자원을 잃는 것에 대한 극심한 아까움(손실 회피)이 발동해요. 합리적인 미래 손익보다 과거의 헛된 투자에 얽매여 결정을 망칩니다.",
    analogy: "재미없는 영화라도 입장료 1만 5천 원이 아까워 끝까지 극장에 앉아 있는 심리예요.",
    apply: {
      classroom: "잘못 푼 문제에 매달리기보다 빠르게 넘어가도록 시간 관리 전략을 지도하세요.",
      webapp: "구독 해지 화면에서 '지금까지 쌓은 레벨이 아깝지 않으신가요?' 협박 문구를 배제하세요.",
      print: "공부법 매뉴얼에 '아깝더라도 비효율적인 필기 방식은 과감히 버리기'를 권장하세요."
    },
    doList: ["학생이 지금까지 쏟은 노력을 인정하되 객관적인 방향 전환을 따뜻하게 돕는다", "앞으로 얻을 실질적인 배움과 기회비용을 바라보도록 시야를 넓혀준다"],
    dontList: ["앱 탈퇴나 해지를 막기 위해 지금까지의 누적 기록을 인질 삼아 위협하지 않는다", "더 이상 쓸모없는 활동에 억지로 매달리도록 죄책감을 유발하지 않는다"],
    ethicsLevel: "risk", ethicsNote: "해지 방어선이나 도박성 중독 게임에서 사용자를 감금하는 다크 패턴의 핵심 기제예요.",
    promptSnippet: {
      ko: "해지 다이얼로그에서 죄책감을 주는 협박 문구를 없애고, 투명하고 정직한 탈퇴 확인 버튼을 둬 줘.",
      en: "Eliminate guilt-inducing retention copy and offer a clean, respectful unsubscribe confirmation."
    },
    english: { term: "sunk cost fallacy", example: "Studying the sunk cost fallacy helps learners make rational choices rather than clinging to past efforts.", keyVocab: ["rational", "cling", "investment"] },
    purposeTags: ["choice", "perception"], mediaTags: ["webapp", "notice"],
    demoType: "scenarioQuiz", demoConfig: { scenario: "subscriptionCancel" },
    related: [23, 30, 48], caseIds: [10], level: 2, factNote: null
  },
  {
    id: 22, code: "022", slug: "storytelling", chapter: "psychology",
    nameKo: "스토리텔링", nameEn: "Storytelling", aliasesKo: ["이야기 기법"],
    oneLiner: "딱딱한 사실 나열보다 인물과 갈등이 담긴 이야기가 마음에 깊이 꽂힌다.",
    oneLinerEn: "Narratives with characters and conflict resonate much deeper than dry facts alone.",
    why: "인류는 수만 년간 이야기를 통해 지혜와 위험을 전승해 왔어요. 스토리 구조는 뇌의 여러 감각 피질을 동시에 자극해 강력한 감정 이입과 기억을 유발합니다.",
    analogy: "역사 연표만 달달 외울 땐 졸리지만 위인의 흥미진진한 일화를 들으면 눈이 반짝이는 것과 같아요.",
    apply: {
      classroom: "수학 공식을 가르칠 때 그 공식을 발견한 학자의 치열한 고민 일화를 도입부에 넣으세요.",
      webapp: "신규 기능 업데이트 공지를 건조한 나열 대신 교사와 학생의 문제 해결 스토리로 쓰세요.",
      print: "동아리 부원 모집 포스터에 한 편의 성장 드라마 같은 선배의 인터뷰를 싣으세요."
    },
    doList: ["공감할 수 있는 주인공과 명확한 문제, 해결의 3단계 서사를 설계한다", "감정을 터치하는 생생한 대화체와 시각적 묘사를 적절히 버무린다"],
    dontList: ["핵심 정보는 쏙 빼놓은 채 횡설수설 줄거리만 길게 늘어놓지 않는다", "실제와 전혀 다른 거짓 미담을 날조해 진정성을 훼손하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "동아리 소개 페이지를 선배가 겪었던 좌절과 극복 과정을 담은 3막 이야기 구조로 풀어 써 줘.",
      en: "Structure the club introduction as a compelling three-act narrative of overcoming initial challenges."
    },
    english: { term: "storytelling", example: "Narrative storytelling transforms abstract scientific theories into memorable human adventures.", keyVocab: ["narrative", "transform", "memorable"] },
    purposeTags: ["emotion", "memory"], mediaTags: ["slide", "poster", "sns"],
    demoType: "scenarioQuiz", demoConfig: { narrativeType: "heroJourney" },
    related: [1, 5, 16], caseIds: [1, 2], level: 1, factNote: null
  },
  {
    id: 23, code: "023", slug: "caligula-effect", chapter: "psychology",
    nameKo: "칼리굴라 효과", nameEn: "Caligula Effect", aliasesKo: ["금기 효과", "판도라의 상자"],
    oneLiner: "하지 말라고 금지하면 호기심이 폭발해 오히려 더 하고 싶어진다.",
    oneLinerEn: "Prohibiting an action dramatically amplifies curiosity and the urge to do it.",
    why: "자유를 제한받았을 때 잃어버린 자율성을 되찾으려는 심리적 반발(Reactance)이 일어나요. 가려진 장막 뒤에 특별한 비밀이 숨겨져 있을 거라 믿게 됩니다.",
    analogy: "'절대 열어보지 마시오'라고 적힌 상자를 보면 온몸이 근질거리며 열고 싶은 충동이에요.",
    apply: {
      classroom: "수업 호기심을 유발할 때 '오늘 수업 내용은 3학년 전에는 비밀이야'라고 힌트를 던지세요.",
      webapp: "유튜브 낚시성 썸네일('절대 누르지 마시오')을 비판적으로 분석하는 미디어 수업을 하세요.",
      print: "축제 포스터 티저에 '공개 금지! D-3일 후 밝혀지는 무대 라인업'을 활용하세요."
    },
    doList: ["수업 흥미를 돋우는 무해한 수준의 호기심 티저로 적절히 활용한다", "다크 패턴 분석 수업에서 낚시성 금지 마케팅의 심리를 비판적으로 해체한다"],
    dontList: ["불안이나 공포심을 자극해 유해한 사이트로 클릭을 유도하는 사기 수법을 쓰지 않는다", "학교 안전 수칙이나 법적 금지 규정을 가볍게 어기도록 부추기지 않는다"],
    ethicsLevel: "risk", ethicsNote: "가짜 호기심을 유발해 무분별한 클릭을 낚는 악성 낚시 콘텐츠로 남용되기 쉬운 고위험 심리예요.",
    promptSnippet: {
      ko: "학생들의 낚시성 클릭 방지를 위해 '절대 금지' 대신 호기심을 건강하게 채워주는 정직한 제목을 지어 줘.",
      en: "Replace sensationalist forbidden-clickbait headlines with honest, informative topic titles."
    },
    english: { term: "Caligula effect", example: "The Caligula effect explains why sensationalist warnings often trigger irresistible clickbait engagement.", keyVocab: ["sensationalist", "forbidden", "trigger"] },
    purposeTags: ["attention", "motivation"], mediaTags: ["thumbnail", "poster"],
    demoType: "scenarioQuiz", demoConfig: { variant: "forbiddenTeaser" },
    related: [19, 21, 35], caseIds: [7], level: 2, factNote: null
  },
  {
    id: 24, code: "024", slug: "priming-effect", chapter: "psychology",
    nameKo: "프라이밍 효과", nameEn: "Priming Effect", aliasesKo: ["점화 효과"],
    oneLiner: "먼저 접한 단어나 이미지가 뒤이어 내리는 판단과 행동의 물꼬를 튼다.",
    oneLinerEn: "Exposure to an initial stimulus subconsciously shapes subsequent perceptions and choices.",
    why: "특정 자극을 받으면 뇌 속 관련 기억망이 미리 활성화(점화)돼요. 무의식중에 활성화된 신경망을 통해 다음 정보를 더 빠르고 편향되게 받아들입니다.",
    analogy: "'사과, 바나나, 포도'를 연달아 말한 뒤 '과'로 시작하는 말을 물으면 '과일'이라 답하는 원리예요.",
    apply: {
      classroom: "글쓰기 수업 전 교실 화면에 평화로운 숲과 따뜻한 가족 일러스트를 띄워 점화하세요.",
      webapp: "수학 퀴즈 앱 배경에 침착하고 이성적인 딥블루 색상을 깔아 차분한 집중을 돕게 하세요.",
      print: "환경 보호 포스터 상단에 푸른 지구와 맑은 물방울을 배치해 책임감을 점화하세요."
    },
    doList: ["학습 목표에 어울리는 긍정적이고 차분한 배경 이미지와 색상으로 무드를 조성한다", "수업 도입부에 오늘 배울 핵심 가치와 연관된 따뜻한 어휘를 먼저 노출한다"],
    dontList: ["학생들에게 부정적 편견이나 불안감을 심어주는 자극적인 단어를 무의식에 주입하지 않는다", "상업적 결제나 클릭을 부추기기 위해 교묘한 심리 조작 단어를 배치하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "무의식적인 인지 유도가 학습자의 자율적 판단을 침해하는 교묘한 조작이 되지 않도록 유의해야 해요.",
    promptSnippet: {
      ko: "창의적 작문 활동지 상단에 상상력을 자극하는 별빛과 열린 문 일러스트를 은은하게 깔아 줘.",
      en: "Subtly incorporate starry night and open-door graphics at the header to prime creative imagination."
    },
    english: { term: "priming effect", example: "Calm visual cues in the classroom prime students for cooperative and thoughtful group discussions.", keyVocab: ["priming", "stimulus", "subconscious"] },
    purposeTags: ["perception", "emotion"], mediaTags: ["slide", "worksheet", "webapp"],
    demoType: "scenarioQuiz", demoConfig: { primeType: "visualWarmup" },
    related: [1, 5, 20], caseIds: [3], level: 2, factNote: null
  },
  {
    id: 25, code: "025", slug: "anchoring-effect", chapter: "psychology",
    nameKo: "앵커링 효과", nameEn: "Anchoring Effect", aliasesKo: ["닻 내림 효과", "정박 효과"],
    oneLiner: "처음 제시된 숫자가 마음에 닻을 내려 이후 모든 판단의 기준이 된다.",
    oneLinerEn: "An initial benchmark number anchors perception and heavily influences all subsequent estimates.",
    why: "불확실한 상황에서 뇌는 맨 처음 본 숫자를 절대 기준점(닻)으로 삼아요. 이후 새로운 정보를 고려하더라도 첫 숫자의 영향권에서 크게 벗어나지 못합니다.",
    analogy: "정가 10만 원을 먼저 보고 5만 원으로 할인된 가격을 보면 엄청나게 싸다고 느끼는 심리예요.",
    apply: {
      classroom: "수학 시험 시간 분배를 가르칠 때 킬러 문항에 15분 이상 얽매이지 않도록 지도하세요.",
      webapp: "모금이나 기부 웹앱에서 추천 금액 기본 단위를 적절한 중도 금액으로 닻을 내리세요.",
      print: "학급 바자회 물품 가격표에 권장 소비자가격과 바자회 판매가를 함께 적어 가치를 보이세요."
    },
    doList: ["합리적인 의사결정을 돕는 정직하고 객관적인 기준 수치를 먼저 제시한다", "학생들이 비판적으로 기준 수치를 의심하고 재검토할 수 있는 안목을 길러준다"],
    dontList: ["원래 있지도 않은 터무니없는 정가를 가짜로 적어두고 대폭 할인하는 척 속이지 않는다", "과도한 첫 제시액으로 학부모나 학생에게 심리적 위압감을 주지 않는다"],
    ethicsLevel: "caution", ethicsNote: "가짜 정가나 부풀려진 수치로 소비자를 착각에 빠뜨리는 악성 마케팅 기법으로 쓰이지 않게 해야 해요.",
    promptSnippet: {
      ko: "바자회 도서 정가와 나눔 판매가를 나란히 표기하되, 정가는 연한 회색 취소선으로 정직하게 표기해 줘.",
      en: "Display the original retail price with a subtle strikethrough next to the fair charity price."
    },
    english: { term: "anchoring effect", example: "The initial suggested study hours anchored students' expectations for the upcoming semester.", keyVocab: ["anchoring", "benchmark", "subsequent"] },
    purposeTags: ["choice", "perception"], mediaTags: ["notice", "webapp", "worksheet"],
    demoType: "choiceLab", demoConfig: { items: ["discountShowcase"] },
    related: [10, 14, 45], caseIds: [3], level: 2, factNote: "Amos Tversky & Daniel Kahneman, 1974"
  }
];
