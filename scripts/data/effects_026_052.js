/**
 * 026 - 052 원리 데이터 모듈 (심리 효과 2부)
 */
export const effects026to052 = [
  {
    id: 26, code: "026", slug: "recency-effect", chapter: "psychology",
    nameKo: "최신 효과", nameEn: "Recency Effect", aliasesKo: ["신근성 효과", "막바지 효과"],
    oneLiner: "가장 마지막에 보고 들은 정보가 머릿속에 가장 또렷하게 기억된다.",
    oneLinerEn: "Items encountered at the very end of a sequence are remembered best.",
    why: "단기 기억(Short-term memory)에 머물러 있는 최신 정보는 다른 간섭 없이 즉시 인출될 수 있어요. 슬라이드나 문서의 마지막 요약이 강력한 잔상을 남깁니다.",
    analogy: "수업 50분 중 종 치기 직전 마지막 1분에 선생님이 강조한 시험 문제가 가장 생생한 이치예요.",
    apply: {
      classroom: "수업 종료 3분 전 오늘의 3대 핵심 포인트를 슬라이드 최종 화면에 크게 띄우세요.",
      webapp: "체크아웃이나 제출 완료 화면 하단에 격려 메시지와 다음 추천 행동을 배치하세요.",
      print: "안내장 맨 아랫부분에 문의 전화번호와 필수 준비물 요약 박스를 넣으세요."
    },
    doList: ["문서나 프레젠테이션 마지막 페이지에 핵심 액션 플랜을 명쾌하게 요약한다", "학습자가 문을 열고 나가며 기억해야 할 최종 메시지를 끝머리에 배치한다"],
    dontList: ["중요한 공지사항을 발표 중반부에 슬그머니 흘려버리고 마지막을 잡담으로 끝내지 않는다", "마지막 화면에 온갖 잡다한 링크를 무더기로 걸어 핵심 기억을 흐리지 않는다"],
    ethicsLevel: "caution", ethicsNote: "앞선 결격 사유를 숨기고 마지막에만 달콤한 약속을 강조해 착시를 일으키지 않도록 해야 해요.",
    promptSnippet: {
      ko: "발표 슬라이드의 맨 마지막 장에 오늘 꼭 실천해야 할 3가지 결론을 한눈에 요약해 줘.",
      en: "Design the closing slide with a bold, concise three-point summary to maximize takeaway recall."
    },
    english: { term: "recency effect", example: "Placing key takeaways at the very end leverages the recency effect for durable recall.", keyVocab: ["recency", "takeaway", "leverage"] },
    purposeTags: ["memory", "emphasis"], mediaTags: ["slide", "worksheet", "notice"],
    demoType: "scenarioQuiz", demoConfig: { listPosition: "endOfList" },
    related: [5, 27, 33], caseIds: [5], level: 1, factNote: "Hermann Ebbinghaus, 1885"
  },
  {
    id: 27, code: "027", slug: "mere-exposure-effect", chapter: "psychology",
    nameKo: "단순 접촉 효과", nameEn: "Mere-Exposure Effect", aliasesKo: ["자이언스 효과"],
    oneLiner: "자주 마주치고 익숙해질수록 대상에 대한 호감과 신뢰가 절로 높아진다.",
    oneLinerEn: "Repeated exposure to a stimulus naturally increases familiarity and liking.",
    why: "뇌는 자주 마주친 안전한 대상을 처리할 때 인지적 편안함(Fluency)을 느껴요. 경계심이 풀리면서 친숙함이 호감과 호의적인 신뢰로 전환됩니다.",
    analogy: "학기 초엔 어색했던 짝궁도 매일 얼굴을 마주 보다 보면 정이 드는 심리예요.",
    apply: {
      classroom: "학급 규칙이나 핵심 영단어를 교실 벽면과 슬라이드 상단에 일관되게 노출하세요.",
      webapp: "앱 상단바와 알림 메시지에 친근한 마스코트 아이콘을 자연스럽게 반복 등장시키세요.",
      print: "학교 축제 D-30부터 같은 로고를 담은 미니 포스터 시리즈를 교내에 순차 게시하세요."
    },
    doList: ["거부감 없는 자연스러운 시각 요소(로고, 색채, 마스코트)를 일정하게 반복 노출한다", "학습자에게 꼭 필요한 기본 개념을 매 차시 시작 화면에 가볍게 비춘다"],
    dontList: ["학생이 피로감을 느낄 정도로 거대한 팝업창을 무한 반복해 도배하지 않는다", "부담스럽고 자극적인 광고 문구를 집요하게 쫓아다니며 강제 노출하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "원치 않는 스팸성 노출로 사용자를 피로하게 만들거나 무비판적 수용을 유도하지 않아야 해요.",
    promptSnippet: {
      ko: "매 페이지 상단 구석에 친근한 학급 마스코트 심볼을 작고 깔끔하게 반복 배치해 줘.",
      en: "Place a subtle, consistent mascot icon in the corner across all pages to foster familiarity."
    },
    english: { term: "mere-exposure effect", example: "Subtle repeated exposure to the class logo builds comfortable familiarity among students.", keyVocab: ["exposure", "familiarity", "subtle"] },
    purposeTags: ["trust", "emotion"], mediaTags: ["poster", "slide", "webapp"],
    demoType: "scenarioQuiz", demoConfig: { repeatCount: [1, 5, 10] },
    related: [3, 5, 91], caseIds: [5], level: 1, factNote: "Robert Zajonc, 1968"
  },
  {
    id: 28, code: "028", slug: "goldilocks-effect", chapter: "psychology",
    nameKo: "골디락스 효과", nameEn: "Goldilocks Effect", aliasesKo: ["중간 선택 효과"],
    oneLiner: "양극단의 과하거나 모자란 것보다 딱 적당한 중간 선택지를 선호한다.",
    oneLinerEn: "People naturally gravitate toward the balanced middle option among three choices.",
    why: "인간은 결정을 내릴 때 너무 비싸거나 싼 것, 너무 크거나 작은 양극단의 위험을 피하려는 중간주의 회피 편향이 있어요. 중간 옵션이 가장 안전하다고 느낍니다.",
    analogy: "죽 세 그릇 중 너무 뜨거운 것도 차가운 것도 아닌 '딱 알맞은 죽'을 고른 동화 이야기예요.",
    apply: {
      classroom: "수행평가 과제 난이도를 '기초-표준(추천)-심화' 3단계로 제시해 참여율을 높이세요.",
      webapp: "학습 플랜이나 폰트 크기 설정을 3단계로 제공하고 중앙에 '가장 인기 있는 옵션'을 두세요.",
      print: "도서관 독서 챌린지 코스를 3가지 분량으로 나누어 중간 코스를 기본 추천하세요."
    },
    doList: ["3가지 선택지를 나란히 둘 때 중간 옵션에 '대다수 추천' 시각적 배지를 부여한다", "각 옵션의 장단점을 정직하게 설명해 학생 스스로 알맞은 단계를 고르게 돕는다"],
    dontList: ["양쪽 극단에 비현실적인 미끼를 두고 중간만 강요하는 인위적 조작을 하지 않는다", "선택지를 7~8개 이상 늘어놓아 결정 장애와 피로를 유발하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "원하는 중간 옵션을 팔기 위해 양옆에 가짜 선택지를 세우는 상술로 흐르지 않게 경계해야 해요.",
    promptSnippet: {
      ko: "과제 옵션 3개 중 가운데 표준 코스에 '추천' 뱃지와 테두리 하이라이트를 둘러 줘.",
      en: "Highlight the middle standard tier with a 'Recommended' badge and subtle border accent."
    },
    english: { term: "Goldilocks effect", example: "Presenting three tiers leads most students to choose the moderate, comfortable middle path.", keyVocab: ["moderate", "tier", "balanced"] },
    purposeTags: ["choice", "readability"], mediaTags: ["worksheet", "webapp", "notice"],
    demoType: "choiceLab", demoConfig: { options: ["light", "medium", "hard"] },
    related: [14, 25, 30], caseIds: [3], level: 1, factNote: null
  },
  {
    id: 29, code: "029", slug: "reframing-effect", chapter: "psychology",
    nameKo: "리프레이밍 효과", nameEn: "Reframing Effect", aliasesKo: ["프레이밍 효과", "관점 전환"],
    oneLiner: "상황을 어떤 관점의 틀로 표현하느냐에 따라 판단이 완전히 달라진다.",
    oneLinerEn: "The way information is framed dramatically alters perception and emotional response.",
    why: "동일한 객관적 사실도 긍정적 이득 프레임으로 보느냐, 부정적 손실 프레임으로 보느냐에 따라 뇌의 감정 반응과 위험 감수 성향이 판이하게 달라집니다.",
    analogy: "물이 반 남았을 때 '반밖에 안 남았네'와 '반이나 남았네'의 기분 차이와 같아요.",
    apply: {
      classroom: "'오답률 30%' 대신 '정답률 70% 달성!'으로 프레이밍해 학습 의욕을 북돋우세요.",
      webapp: "'틀린 단어 10개' 대신 '오늘 정복할 단어 10개'로 학습 큐레이션을 표현하세요.",
      print: "급식 잔반 줄이기 포스터에 '벌금 부과'보다 '지구를 살리는 깨끗한 한 끼'로 유도하세요."
    },
    doList: ["학습자의 가능성과 도전을 지지하는 긍정적이고 성장 지향적인 문장 프레임을 쓴다", "손실 회피가 필요한 안전 수칙에는 위험 요소를 명확히 인지할 수 있는 틀을 적용한다"],
    dontList: ["실제 사실을 왜곡하거나 실패의 원인을 감추는 무책임한 거짓 긍정으로 속이지 않는다", "공포심을 과도하게 조장해 학생들을 불안하게 만드는 위협 프레임을 남발하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "표현의 틀을 바꾸어 본질적인 위험이나 결함을 은폐하는 언어적 기만이 되지 않아야 해요.",
    promptSnippet: {
      ko: "오답 노트 제목을 '오답 모음' 대신 '나를 성장시키는 보물 단어 노트'로 긍정적으로 리프레이밍해 줘.",
      en: "Reframe the mistake review header from 'Incorrect Answers' to 'Growth Insight Notes'."
    },
    english: { term: "framing effect", example: "Reframing test scores as progress milestones cultivates a resilient growth mindset.", keyVocab: ["reframing", "milestone", "resilient"] },
    purposeTags: ["motivation", "emotion"], mediaTags: ["worksheet", "slide", "webapp"],
    demoType: "choiceLab", demoConfig: { frames: ["lossFrame", "gainFrame"] },
    related: [15, 24, 30], caseIds: [1], level: 2, factNote: "Amos Tversky & Daniel Kahneman, 1981"
  },
  {
    id: 30, code: "030", slug: "prospect-theory", chapter: "psychology",
    nameKo: "프로스펙트 이론", nameEn: "Prospect Theory", aliasesKo: ["전망 이론", "손실 회피성"],
    oneLiner: "같은 크기의 이익보다 손실을 2배 이상 훨씬 더 아프게 느낀다.",
    oneLinerEn: "The psychological pain of losing is roughly twice as intense as the pleasure of gaining.",
    why: "인류는 자원 상실이 곧 생존의 위협이었기에 손실에 훨씬 민감하게 진화했어요. 이익을 얻을 땐 안전을 택하고, 손실을 마주할 땐 극단적 위험을 무릅씁니다.",
    analogy: "길에서 1만 원을 주웠을 때의 기쁨보다 주머니에서 1만 원을 잃어버렸을 때의 속상함이 훨씬 커요.",
    apply: {
      classroom: "숙제 기한을 안내할 때 '지금 제출하면 감점을 막을 수 있어요'를 부드럽게 고지하세요.",
      webapp: "탈퇴 유예 화면에서 손실 회피 심리를 악용해 사용자를 옭아매는 다크 패턴을 금지하세요.",
      print: "장학금 신청 안내문에 '신청하지 않으면 놓치게 되는 혜택'을 놓치지 않도록 알려주세요."
    },
    doList: ["학생이 중요한 마감일이나 기회를 놓치지 않도록 위험 요소를 투명하게 알려준다", "손실에 대한 공포보다는 안전하게 자산을 지키는 정직한 안내를 제공한다"],
    dontList: ["'지금 끄면 영영 손해!' 같은 공포 마케팅 문구로 학생들을 협박해 결제를 유도하지 않는다", "정상적인 탈퇴 경로를 숨겨두고 손실을 과장하는 악성 다크 패턴을 설계하지 않는다"],
    ethicsLevel: "risk", ethicsNote: "사용자의 손실 공포를 자극해 원치 않는 행동을 강요하는 가장 위험한 심리 조작 축이에요.",
    promptSnippet: {
      ko: "기한 마감 공지에서 공포감을 주는 경고 대신 학생이 챙겨야 할 실질적인 혜택 안내를 차분히 적어 줘.",
      en: "Inform students of the upcoming deadline respectfully, without using aggressive fear-based loss framing."
    },
    english: { term: "loss aversion", example: "Understanding loss aversion helps educators appreciate why students dread making public mistakes.", keyVocab: ["aversion", "dread", "psychological"] },
    purposeTags: ["choice", "perception"], mediaTags: ["notice", "webapp"],
    demoType: "choiceLab", demoConfig: { graphType: "valueFunction" },
    related: [21, 25, 48], caseIds: [3, 10], level: 3, factNote: "Daniel Kahneman & Amos Tversky, 1979"
  },
  {
    id: 31, code: "031", slug: "tension-reduction-effect", chapter: "psychology",
    nameKo: "텐션 리덕션 효과", nameEn: "Tension Reduction Effect", aliasesKo: ["긴장 완화 효과"],
    oneLiner: "큰일을 끝내고 긴장이 풀리면 경계심이 무너져 쉽게 선택을 허락한다.",
    oneLinerEn: "Once a major stress is resolved, lowered vigilance makes people vulnerable to secondary offers.",
    why: "중대한 결단이나 힘든 과제를 마친 직후에는 뇌의 자기 통제 에너지가 고갈돼요. 긴장이 이완되면서 부차적인 제안에 대해 무비판적으로 '예스'를 외치게 됩니다.",
    analogy: "힘겨운 중간고사가 끝난 날 해방감에 취해 충동적으로 군것질거리를 잔뜩 사는 상황이에요.",
    apply: {
      classroom: "시험 직후 들뜬 분위기에서 중요한 다음 학기 선택 과목 신청을 서둘러 받지 마세요.",
      webapp: "결제 완료 직후 원치 않는 부가 상품을 은근슬쩍 끼워 파는 체크박스를 금지하세요.",
      print: "수능 직후 해방감에 취한 수험생을 노리는 과소비 충동 유발 상술을 비판적으로 지도하세요."
    },
    doList: ["중요한 의사결정은 긴장이 풀린 순간이 아니라 차분하게 맑은 정신일 때 내리도록 유도한다", "완료 화면에서는 오직 수고에 대한 진심 어린 격려와 안전한 영수증만 보여준다"],
    dontList: ["과제 제출 완료 직후 부주의해진 틈을 타 불필요한 유료 서비스를 쓱 끼워팔지 않는다", "긴장 완화 시점을 노려 학생에게 불리한 약관 동의를 기습적으로 받아내지 않는다"],
    ethicsLevel: "risk", ethicsNote: "쇼핑몰 결제 완료 창에서 슬그머니 추가 결제를 끼워 넣는 악명 높은 다크 패턴이에요.",
    promptSnippet: {
      ko: "과제 제출 완료 화면에는 군더더기 유도 버튼 없이 따뜻한 격려 문구와 영수증 정보만 깔끔히 둬 줘.",
      en: "Keep the submission confirmation clean and free of sneaky add-on prompts, showing only sincere praise."
    },
    english: { term: "tension reduction effect", example: "Avoid presenting binding choices right after exams when cognitive fatigue impairs judgment.", keyVocab: ["vigilance", "impair", "binding"] },
    purposeTags: ["choice", "perception"], mediaTags: ["webapp", "notice"],
    demoType: "scenarioQuiz", demoConfig: { stage: "postCheckoutAddon" },
    related: [14, 21, 47], caseIds: [9], level: 3, factNote: null
  },
  {
    id: 32, code: "032", slug: "goal-gradient-effect", chapter: "psychology",
    nameKo: "목표 구배 효과", nameEn: "Goal Gradient Effect", aliasesKo: ["목표 가속화 효과"],
    oneLiner: "결승선이 눈앞에 보일수록 달리는 발걸음의 속도가 점점 더 빨라진다.",
    oneLinerEn: "Effort and motivation accelerate as people perceive they are nearing the finish line.",
    why: "목표와의 거리가 좁혀질수록 남은 노력 대비 보상의 기대 가치가 급격히 치솟아요. 결승선이 가시권에 들어오면 마지막 에너지를 쏟아붓게 됩니다.",
    analogy: "운동장 10바퀴 달리기 중 마지막 반 바퀴가 남았을 때 전력 질주로 내달리는 힘이에요.",
    apply: {
      classroom: "수업 진도에서 '오늘 배울 5개 중 벌써 3개 통과!'를 칠판에 실시간 표시하세요.",
      webapp: "10단계 퀴즈 웹앱에서 8단계 진입 시 '거의 다 왔어요! 마지막 2문제' 하이라이트를 켜세요.",
      print: "독서 마일리지 카드에 10칸 중 처음 2칸에 미리 도장을 찍어주어 완주를 가속하세요."
    },
    doList: ["전체 진행률을 직관적인 진도 링이나 진행 바로 투명하게 시각화한다", "종착지에 가까워질수록 성취를 축하하는 시각적 응원 문구를 띄운다"],
    dontList: ["끝이 보이지 않는 막막한 단계를 숨겨두고 마치 곧 끝날 것처럼 속이지 않는다", "목표를 달성했더니 사전 고지 없이 추가 과제를 얹어 학생의 사기를 꺾지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "학습 진도바가 80%를 넘어서면 게이지 색상이 금빛으로 빛나며 '결승선 직전!' 안내를 띄워 줘.",
      en: "Animate the progress bar with a glowing accent as it nears 90% to trigger goal gradient motivation."
    },
    english: { term: "goal-gradient effect", example: "Visual progress rings leverage the goal-gradient effect, spurring learners toward the finish line.", keyVocab: ["progress", "spurring", "acceleration"] },
    purposeTags: ["motivation", "usability"], mediaTags: ["webapp", "worksheet"],
    demoType: "scenarioQuiz", demoConfig: { progressStep: 8, totalSteps: 10 },
    related: [19, 33, 104], caseIds: [11], level: 1, factNote: "Clark Hull, 1932"
  },
  {
    id: 33, code: "033", slug: "peak-end-rule", chapter: "psychology",
    nameKo: "피크-엔드 법칙", nameEn: "Peak-End Rule", aliasesKo: ["절정-종결의 법칙"],
    oneLiner: "경험의 평가는 가장 강렬했던 순간과 마지막 순간으로 결정된다.",
    oneLinerEn: "Memories of an experience are judged mainly by its emotional peak and how it ended.",
    why: "인간의 기억은 경험 전체의 시간 흐름을 평균 내지 않아요. 감정이 가장 격렬했던 피크 지점과 가장 최근 기억인 엔딩의 기분 두 가지로 전체를 압축 저장합니다.",
    analogy: "여행 중 숙소가 조금 불편했어도 마지막 날 노을이 환상적이었다면 '최고의 여행'으로 기억돼요.",
    apply: {
      classroom: "수업 중 가장 재미있는 핵심 퀴즈(피크)를 넣고, 끝날 때는 따뜻한 칭찬(엔드)으로 마무리하세요.",
      webapp: "어려운 과제를 마친 학생 화면에 찬란한 축하 꽃가루와 격려 카드를 띄우세요.",
      print: "방과후 활동 보고서 마지막 장에 환하게 웃는 학생들의 단체 사진을 배치하세요."
    },
    doList: ["학습 과정 중 가장 흥미진진한 킬러 콘텐츠나 하이라이트 활동을 의도적으로 설계한다", "종료 시점의 사용자 경험을 세심하고 따뜻하게 챙겨 긍정적인 여운을 남긴다"],
    dontList: ["수업 내내 좋았더라도 마지막 5분에 화를 내며 차갑게 수업을 끝내 전체를 망치지 않는다", "앱 이용이 끝나는 탈퇴나 오류 화면을 거칠고 불친절하게 방치하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "모듈 완주 시 화면 가득 컨페티 애니메이션과 함께 선생님의 따뜻한 수료 메시지를 띄워 줘.",
      en: "Celebrate lesson completion with joyful confetti animations and warm words to ensure a memorable ending."
    },
    english: { term: "peak-end rule", example: "Designing an inspiring lesson peak and a heartfelt ending ensures students cherish the class.", keyVocab: ["peak", "cherish", "memorable"] },
    purposeTags: ["memory", "emotion"], mediaTags: ["slide", "webapp", "notice"],
    demoType: "scenarioQuiz", demoConfig: { experienceGraph: "peakAndEnd" },
    related: [16, 26, 32], caseIds: [], level: 2, factNote: "Daniel Kahneman, 1993"
  },
  {
    id: 34, code: "034", slug: "stroop-effect", chapter: "psychology",
    nameKo: "스트루프 효과", nameEn: "Stroop Effect", aliasesKo: ["색상-단어 간섭 효과"],
    oneLiner: "글자의 의미와 글자의 색상이 다르면 읽는 뇌의 속도가 뚝 떨어진다.",
    oneLinerEn: "Semantic meaning interferes with color processing, slowing cognitive reaction time.",
    why: "글자를 보면 무의식적으로 뜻을 읽는 자동화된 인지 과정이 색상을 식별하는 과정과 충돌해요. 두 신호가 뇌에서 간섭을 일으켜 반응 시간이 지연됩니다.",
    analogy: "빨간색 잉크로 '파랑'이라고 적힌 글자를 보고 색상 이름을 말할 때 혀가 꼬이는 현상이에요.",
    apply: {
      classroom: "학습지에서 '정답'은 초록색, '오답'은 붉은색 계열로 인지 의미와 일치시키세요.",
      webapp: "취소 버튼에 눈에 띄는 초록색을 쓰거나, 확인 버튼에 경고용 붉은색을 쓰지 마세요.",
      print: "소방 안전 표지판에서 '주의' 문구는 반드시 노랑이나 주황색 등 표준 색채와 통일하세요."
    },
    doList: ["신호등 색채 규약(초록=진행, 빨강=위험, 노랑=주의)과 버튼 라벨의 의미를 일치시킨다", "사용자가 고민 없이 직관적으로 버튼을 누를 수 있도록 색상과 텍스트의 조화를 검수한다"],
    dontList: ["빨간색 글씨로 '안전'이라 쓰거나 파란색 글씨로 '위험'이라 써서 혼선을 초래하지 않는다", "삭제나 탈퇴 같은 위험 버튼에 안전해 보이는 파란색을 칠해 실수 클릭을 유도하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "'삭제' 버튼은 붉은 위험색으로, '보관' 버튼은 차분한 서피스 색상으로 기능과 색채를 통일해 줘.",
      en: "Align the 'Delete' button with danger red and the 'Save' button with neutral tones to avoid cognitive clash."
    },
    english: { term: "Stroop effect", example: "Matching button colors with their functional intent eliminates cognitive interference for users.", keyVocab: ["interference", "functional", "eliminate"] },
    purposeTags: ["readability", "usability"], mediaTags: ["webapp", "slide", "worksheet"],
    demoType: "timingGame", demoConfig: { gameType: "stroopSpeedTest" },
    related: [51, 81, 104], caseIds: [], level: 2, factNote: "John Ridley Stroop, 1935"
  },
  {
    id: 35, code: "035", slug: "cognitive-dissonance", chapter: "psychology",
    nameKo: "인지 부조화", nameEn: "Cognitive Dissonance", aliasesKo: ["신념-행동 불일치"],
    oneLiner: "자신의 신념과 상반되는 사실을 마주하면 불편함을 느껴 생각을 정당화한다.",
    oneLinerEn: "Mental discomfort from contradictory beliefs drives people to rationalize their choices.",
    why: "신념과 현실이 충돌할 때 발생하는 심리적 불협화음은 뇌에 큰 고통을 줘요. 실수를 인정하기보다 자신의 기존 신념을 옹호하는 핑계를 만들어 마음을 달랩니다.",
    analogy: "여우가 높은 포도밭의 포도를 따 먹지 못하자 '저 포도는 어차피 실 거야'라고 합리화하는 우화예요.",
    apply: {
      classroom: "토론 수업에서 학생들이 자신의 선입견과 반대되는 입장을 직접 변론해 보게 하세요.",
      webapp: "틀린 문제에 대해 '실수'로 치부하지 않고 오답 원인을 직접 기록하는 성찰 카드를 두세요.",
      print: "환경 신문에서 편리함 뒤에 숨은 플라스틱 배출 현실을 마주하도록 화두를 던지세요."
    },
    doList: ["새로운 과학적 사실이나 반증 데이터를 제시할 때 학생이 스스로 생각을 정리할 시간을 준다", "자신의 실수를 인정하고 올바른 지식을 흡수하는 것을 용기 있는 태도로 칭찬한다"],
    dontList: ["학생의 기존 신념을 공개적으로 망신 주며 억지로 생각을 뜯어고치려 들지 않는다", "학습자에게 인지적 모순만을 던져두고 아무런 해답이나 해결책을 주지 않고 방치하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "학생이 자신의 오답 이유를 스스로 솔직하게 기록하고 바로잡을 수 있는 성찰 피드백 박스를 짜 줘.",
      en: "Build a reflective feedback card where learners gently confront and resolve misconceptions."
    },
    english: { term: "cognitive dissonance", example: "Encouraging gentle confrontation of misconceptions helps learners resolve cognitive dissonance.", keyVocab: ["dissonance", "confront", "misconception"] },
    purposeTags: ["perception", "motivation"], mediaTags: ["worksheet", "slide"],
    demoType: "scenarioQuiz", demoConfig: { conflictType: "beliefVsFact" },
    related: [23, 29, 36], caseIds: [7], level: 3, factNote: "Leon Festinger, 1957"
  },
  {
    id: 36, code: "036", slug: "reciprocity-principle", chapter: "psychology",
    nameKo: "상호성의 원리", nameEn: "Reciprocity Principle", aliasesKo: ["기브 앤 테이크", "보은의 법칙"],
    oneLiner: "먼저 작은 호의를 받으면 무언가 보답해야 한다는 마음이 생긴다.",
    oneLinerEn: "Receiving an unsolicited favor triggers a strong psychological obligation to repay.",
    why: "서로 돕고 보답하는 상호 호혜성은 인류 사회를 지탱해 온 기본 규범이에요. 호의를 입고도 갚지 않으면 집단 내 배은망덕한 사람으로 낙인찍힐까 두려워합니다.",
    analogy: "친구가 맛있는 간식을 먼저 건네주면 나도 다음날 꼭 무언가 챙겨주고 싶은 마음이에요.",
    apply: {
      classroom: "학기 초 학생들에게 정성스러운 손편지 웰컴 카드를 먼저 건네 신뢰를 쌓으세요.",
      webapp: "무료로 유용한 학습 템플릿과 노트를 아낌없이 먼저 제공하고 참여를 제안하세요.",
      print: "학부모 총회 안내문과 함께 유용한 자녀 대화법 요약 소책자를 선물로 동봉하세요."
    },
    doList: ["조건 없이 진심 어린 유용한 가치(무료 자료, 격려)를 학습자에게 먼저 베푼다", "학습자가 부담 없이 자발적으로 참여하고 기여할 수 있는 통로를 열어둔다"],
    dontList: ["작은 샘플 하나 던져주고 거액의 결제를 강요하는 부담스러운 빚진 마음을 조장하지 않는다", "호의를 베푼 척 생색을 내며 학생들에게 굴종적인 복종을 요구하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "원치 않는 사소한 선물을 떠넘긴 뒤 과도한 보답이나 개인정보 제공을 압박하지 않아야 해요.",
    promptSnippet: {
      ko: "자료 다운로드 화면에서 회원가입 요구 없이 유용한 핵심 요약 PDF를 조건 없이 먼저 선물해 줘.",
      en: "Provide the valuable summary cheat sheet upfront without demanding mandatory sign-up."
    },
    english: { term: "norm of reciprocity", example: "Offering complimentary study templates builds goodwill and encourages mutual collaboration.", keyVocab: ["reciprocity", "complimentary", "goodwill"] },
    purposeTags: ["trust", "motivation"], mediaTags: ["webapp", "notice", "worksheet"],
    demoType: "scenarioQuiz", demoConfig: { giftScenario: "unconditionalResource" },
    related: [5, 12, 47], caseIds: [10], level: 1, factNote: "Robert Cialdini, 1984"
  },
  {
    id: 37, code: "037", slug: "hawthorne-effect", chapter: "psychology",
    nameKo: "호손 효과", nameEn: "Hawthorne Effect", aliasesKo: ["관찰자 효과"],
    oneLiner: "누군가 관심을 두고 지켜보고 있다는 사실만으로도 능률이 오른다.",
    oneLinerEn: "Individuals improve their behavior and productivity simply because they are being observed.",
    why: "물리적 환경보다 더 중요한 것은 자신이 중요한 존재로 인정받고 주목받고 있다는 사회적 유대감이에요. 관찰받고 있다는 자각이 책임감과 성취욕을 자극합니다.",
    analogy: "선생님이 내 책상 옆에 다가와 조용히 지켜보시면 흐트러졌던 자세를 고쳐잡는 심리예요.",
    apply: {
      classroom: "모둠 활동 중 모둠 사이를 순회하며 학생들의 작은 진도 메모에 눈길을 보내세요.",
      webapp: "웹앱에서 '선생님이 실시간으로 학생들의 학습 진도를 응원하고 있어요'를 표시하세요.",
      print: "자기주도학습 플래너에 매주 담임 선생님의 코멘트 도장 칸을 마련하세요."
    },
    doList: ["학생이 감시당한다는 불쾌감 대신 지지받고 있다는 온기를 느끼도록 관찰한다", "학습자의 작은 노력과 과정을 놓치지 않고 발견하여 피드백을 건넨다"],
    dontList: ["CCTV로 일거수일투족을 통제하듯 학생의 사생활을 감시하는 공포 분위기를 만들지 않는다", "관찰 결과를 약점으로 잡아 질책하거나 비교하는 용도로 오용하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "화면 상단에 '선생님이 실시간으로 질문을 확인하고 있어요'라는 안심 안내 배지를 배치해 줘.",
      en: "Add a subtle status badge reassuring students that their teacher is actively reviewing progress."
    },
    english: { term: "Hawthorne effect", example: "Knowing their thoughtful teacher is reviewing their work inspires students to produce quality essays.", keyVocab: ["observed", "reassure", "productivity"] },
    purposeTags: ["motivation", "trust"], mediaTags: ["webapp", "worksheet"],
    demoType: "scenarioQuiz", demoConfig: { observerState: "teacherReviewing" },
    related: [15, 20, 50], caseIds: [], level: 2, factNote: "Fritz Roethlisberger & William J. Dickson, 1939"
  },
  {
    id: 38, code: "038", slug: "diderot-effect", chapter: "psychology",
    nameKo: "디드로 효과", nameEn: "Diderot Effect", aliasesKo: ["연쇄 소비 효과", "통일성 집착"],
    oneLiner: "새 물건 하나를 사면 주변 물건까지 그에 맞춰 전부 바꾸고 싶어진다.",
    oneLinerEn: "Acquiring a new possession often spirals into a chain reaction of complementary purchases.",
    why: "사람은 자신이 소유한 사물과 환경 전체가 하나의 통일된 스타일과 격을 유지하기를 바라는 조화의 욕구가 있어요. 새 물건의 격에 맞추려 연쇄적인 변화를 시도합니다.",
    analogy: "새 필통을 산 뒤 어울리는 새 샤프, 지우개, 자까지 세트로 새로 사고 싶어지는 마음이에요.",
    apply: {
      classroom: "새 학기 노트 양식을 통일감 있는 컬러 세트로 배포해 필기 정돈을 유도하세요.",
      webapp: "프로젝트 템플릿 도입 시 아이콘, 폰트, 버튼 테마가 완벽히 어우러지는 세트를 제공하세요.",
      print: "학급 문고 코너를 만들 때 북엔드와 라벨 스티커 디자인을 깔끔하게 통일하세요."
    },
    doList: ["시각적 통일성을 갖춘 완전한 디자인 시스템 세트를 제공해 디자인 일관성을 돕는다", "학생들이 통일된 서식을 바탕으로 정갈하게 과제를 완성할 수 있는 템플릿을 준다"],
    dontList: ["하나를 사면 줄줄이 사야만 작동하도록 인위적인 호환성 폐쇄 생태계를 만들지 않는다", "과소비와 낭비를 부추겨 불필요한 학용품 교체를 강요하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "학습지 세트의 표지, 본문, 요약 카드가 완벽한 패밀리룩 디자인 톤앤매너를 이루게 해 줘.",
      en: "Design a harmonized template suite where handouts, cards, and slides share a unified aesthetic."
    },
    english: { term: "Diderot effect", example: "Providing a unified template suite satisfies the desire for aesthetic harmony across classroom materials.", keyVocab: ["harmonized", "aesthetic", "consistency"] },
    purposeTags: ["grouping", "usability"], mediaTags: ["slide", "worksheet", "poster"],
    demoType: "scenarioQuiz", demoConfig: { itemSuite: "matchingDesignKit" },
    related: [6, 91, 94], caseIds: [], level: 2, factNote: "Denis Diderot, 1769"
  },
  {
    id: 39, code: "039", slug: "word-of-mouth-effect", chapter: "psychology",
    nameKo: "입소문 효과", nameEn: "Word-of-Mouth Effect", aliasesKo: ["구전 효과", "추천 효과"],
    oneLiner: "공식 광고보다 진짜 써본 친구와 동료의 한마디 추천을 백배 더 신뢰한다.",
    oneLinerEn: "Peer recommendations carry far more credibility than official institutional promotions.",
    why: "이해관계가 얽힌 주최 측의 일방적 홍보와 달리, 동료의 생생한 평가는 진실되고 위험을 걸러주는 필터 역할을 해요. 사회적 신뢰망을 통한 정보가 가장 안전합니다.",
    analogy: "선생님 추천보다 '이 문제집 진짜 도움 됐어'라는 작년 선배의 한마디를 더 믿는 현상이에요.",
    apply: {
      classroom: "방과후 프로그램 포스터에 실제 선배들의 생생한 한 줄 후기를 말풍선으로 넣으세요.",
      webapp: "도서 추천 코너에 사서 추천사 대신 같은 반 친구들의 손글씨 추천평을 띄우세요.",
      print: "학교 축제 홍보 리플릿에 축제 기획단 학생들의 진솔한 인터뷰를 실으세요."
    },
    doList: ["실제 참여 학생들의 솔직 담백하고 긍정적인 경험담을 여과 없이 공유한다", "동료 간에 좋은 학습 자료와 팁을 서로 추천하고 나누는 문화를 활성화한다"],
    dontList: ["있지도 않은 학생 이름을 지어내어 가짜 리뷰를 조작해 게시하지 않는다", "부정적인 피드백을 무조건 가리고 장점만 과장해 신뢰를 잃지 않는다"],
    ethicsLevel: "caution", ethicsNote: "상업적 바이럴 마케팅처럼 가짜 사용자 후기를 지어내어 신뢰를 기만하는 행위를 엄단해야 해요.",
    promptSnippet: {
      ko: "선배들의 실제 조언 3가지를 친근한 따옴표 말풍선 카드로 하단에 배치해 줘.",
      en: "Feature authentic peer review quotes in speech bubbles to establish relatable credibility."
    },
    english: { term: "word-of-mouth effect", example: "Genuine peer reviews on the notice board resonate much deeper with freshmen than formal announcements.", keyVocab: ["genuine", "peer", "resonate"] },
    purposeTags: ["trust", "emotion"], mediaTags: ["poster", "notice", "sns"],
    demoType: "scenarioQuiz", demoConfig: { testimonialType: "peerReview" },
    related: [5, 12, 41], caseIds: [2], level: 1, factNote: null
  },
  {
    id: 40, code: "040", slug: "cocktail-party-effect", chapter: "psychology",
    nameKo: "칵테일 파티 효과", nameEn: "Cocktail Party Effect", aliasesKo: ["선택적 주의 집중"],
    oneLiner: "시끌벅적한 소음 속에서도 내 이름이나 관심사만은 귀신같이 쏙쏙 들린다.",
    oneLinerEn: "Selective attention filters out ambient noise to focus on personally relevant stimuli.",
    why: "뇌는 모든 감각 정보를 처리하지 않고 생존과 관련되거나 자신과 직결된 중요한 신호만을 선택적으로 걸러내는 고성능 인지 필터를 가지고 있어요.",
    analogy: "시끄러운 급식실 안에서도 저 멀리서 내 이름을 부르면 번쩍 고개가 돌아가는 순간이에요.",
    apply: {
      classroom: "슬라이드 제목을 '1학년 3반 여러분을 위한 질문'처럼 수신인을 콕 집어 명시하세요.",
      webapp: "학습 웹앱 첫 화면에 '홍길동 학생, 오늘 도전할 3단어예요' 맞춤 문구를 띄우세요.",
      print: "가정통신문 타이틀에 '진로를 고민하는 2학년 학부모님께' 타깃을 선명히 밝히세요."
    },
    doList: ["독자나 학습자의 학년, 관심사, 상황을 제목에서 명확히 호명해 주목도를 높인다", "자신과 관련된 이야기임을 즉시 알 수 있도록 맞춤형 키워드를 전면에 내세운다"],
    dontList: ["누구에게나 해당되는 뻔하고 두루뭉술한 제목으로 시선을 허공에 날리지 않는다", "학생의 프라이버시를 침해할 정도로 민감한 개인 신상을 공개 게시판에 노출하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "공지 배너 타이틀을 '영어가 막막한 2학년 주목!'처럼 대상자를 콕 집어 부르는 헤드라인으로 뽑아 줘.",
      en: "Craft a personalized banner headline directly addressing the target audience to trigger selective attention."
    },
    english: { term: "cocktail party effect", example: "Personalizing the dashboard greeting captures student attention amidst visual classroom noise.", keyVocab: ["selective", "personalize", "attention"] },
    purposeTags: ["attention", "emphasis"], mediaTags: ["banner", "slide", "notice"],
    demoType: "gazeMap", demoConfig: { variant: "personalizedTrigger" },
    related: [7, 8, 89], caseIds: [4], level: 1, factNote: "Colin Cherry, 1953"
  },
  {
    id: 41, code: "041", slug: "false-consensus-effect", chapter: "psychology",
    nameKo: "허위 합의 효과", nameEn: "False Consensus Effect", aliasesKo: ["착각적 일치 효과"],
    oneLiner: "자신의 생각과 가치관을 남들도 똑같이 생각할 것이라 제멋대로 넘겨짚는다.",
    oneLinerEn: "People overestimate the degree to which others share their own beliefs and choices.",
    why: "자신의 판단이 지극히 상식적이고 보편적이라고 믿고 싶은 자기중심적 편향이에요. 다른 사람들의 다양한 입장과 처지를 상상하는 인지적 노력을 게을리합니다.",
    analogy: "'이 문제는 당연히 다들 쉽다고 생각하겠지?'라며 나만의 기준으로 시험 난이도를 단정하는 착각이에요.",
    apply: {
      classroom: "수업 피드백을 설계할 때 '다들 알지?' 대신 익명 설문으로 실제 이해도를 실측하세요.",
      webapp: "UI 기획 시 디자이너의 직관만 믿지 말고 실제 학생들의 사용성 테스트를 반드시 거치세요.",
      print: "학교 행사 설문지에서 '모두가 동의하듯' 같은 편향된 전제 문구를 없애세요."
    },
    doList: ["자신의 디자인과 수업이 학습자에게 어떻게 보일지 객관적인 데이터로 검증한다", "다양한 시각과 반응이 존재함을 인정하고 사용자 인터뷰를 설계에 반영한다"],
    dontList: ["'나한테 편하니까 학생들도 편하겠지'라는 오만한 생각으로 복잡한 UI를 강요하지 않는다", "다수의 의견을 확인하지도 않고 독단적으로 규칙을 밀어붙이지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "설문 문항에서 유도성 질문을 빼고, 학생들의 상반된 의견을 객관적으로 담아낼 수 있게 중립적으로 써 줘.",
      en: "Formulate neutral survey questions that avoid projecting assumptions about student consensus."
    },
    english: { term: "false consensus effect", example: "User testing reveals false consensus assumptions, showing how differently students navigate the portal.", keyVocab: ["consensus", "assumptions", "navigate"] },
    purposeTags: ["perception", "usability"], mediaTags: ["worksheet", "webapp", "notice"],
    demoType: "scenarioQuiz", demoConfig: { biasTest: "consensusEstimate" },
    related: [12, 35, 42], caseIds: [], level: 2, factNote: "Lee Ross et al., 1977"
  },
  {
    id: 42, code: "042", slug: "suspension-bridge-effect", chapter: "psychology",
    nameKo: "흔들다리 효과", nameEn: "Suspension Bridge Effect", aliasesKo: ["생리적 각성의 착오 귀인"],
    oneLiner: "위기로 심장이 쿵쾅거릴 때 곁에 있는 사람에게 반했다고 착각한다.",
    oneLinerEn: "Physiological arousal from environmental thrill is mistaken for romantic attraction.",
    why: "뇌는 심장 박동이나 호흡 같은 신체 각성 상태의 원인을 주변의 가장 그럴듯한 시각 자극에서 찾으려 해요. 공포로 인한 두근거림을 호감으로 오인합니다.",
    analogy: "아슬아슬한 놀이기구를 같이 탄 친구에게 순간적으로 가슴이 뛰는 두근거림을 느끼는 현상이에요.",
    apply: {
      classroom: "모둠 협동 방 탈출 게임을 통해 팀원들 사이의 결속력과 유대감을 끌어올리세요.",
      webapp: "박진감 넘치는 실시간 카운트다운 퀴즈 대전으로 학습 몰입도를 폭발시키세요.",
      print: "체육대회 응원 포스터에 역동적인 스피드선과 강렬한 타이포로 두근거림을 연출하세요."
    },
    doList: ["건전한 게임화(Gamification) 요소로 적당한 긴장감을 주어 학습 에너지를 북돋운다", "활동 후 차분히 안정을 취할 수 있는 쿨다운 시간을 반드시 제공한다"],
    dontList: ["지나친 공포나 불안감을 주어 공황 상태를 유발하는 극단적 연출을 피한다", "학습자에게 과도한 스트레스를 주며 위험 상황을 강제하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "인위적인 공포나 스트레스를 주어 취약한 심리를 이용하지 않도록 각별히 유의해야 해요.",
    promptSnippet: {
      ko: "카운트다운 퀴즈 화면에 경쾌하고 박진감 넘치는 텐션 효과음을 연상시키는 비주얼 펄스를 줘.",
      en: "Design an exciting countdown timer interface that energizes the classroom without inducing panic."
    },
    english: { term: "suspension bridge effect", example: "Exciting quiz challenges create physiological arousal that bonds student project teams together.", keyVocab: ["arousal", "energize", "cooperation"] },
    purposeTags: ["emotion", "motivation"], mediaTags: ["webapp", "slide", "poster"],
    demoType: "scenarioQuiz", demoConfig: { arousalState: "highEnergyQuiz" },
    related: [1, 24, 46], caseIds: [], level: 2, factNote: "Donald Dutton & Arthur Aron, 1974"
  },
  {
    id: 43, code: "043", slug: "encoding-specificity-principle", chapter: "psychology",
    nameKo: "부호화 특수성 원리", nameEn: "Encoding Specificity Principle", aliasesKo: ["맥락 의존 기억"],
    oneLiner: "처음 기억할 때의 환경과 시험 볼 때의 환경이 같을수록 잘 떠오른다.",
    oneLinerEn: "Memory recall is most effective when the retrieval context matches the encoding context.",
    why: "기억은 지식 단독으로 저장되지 않고 당시의 시각 배경, 소리, 기분 등 주변 맥락과 함께 그물망처럼 얽혀 저장돼요. 맥락이 재현되면 기억 단서가 즉시 작동합니다.",
    analogy: "음악을 들으며 공부한 내용은 시험장에서 그 음악 멜로디를 떠올릴 때 스르륵 기억나는 경험이에요.",
    apply: {
      classroom: "실전 모의고사 연습 시 수능 시험장과 동일한 방송 안내 멘트와 OMR 카드를 쓰세요.",
      webapp: "단어장 앱에서 단어를 외울 때 보았던 예문 삽화를 복습 퀴즈 배경에 그대로 살려두세요.",
      print: "핵심 공식 정리 카드에 교과서 삽화와 동일한 색상 배색 힌트를 일관되게 유지하세요."
    },
    doList: ["학습할 때 사용한 핵심 아이콘과 시각적 테마를 평가 단계에서도 동일하게 연결한다", "실전 적용 환경과 가장 유사한 맥락과 폼팩터에서 연습 기회를 제공한다"],
    dontList: ["외울 때는 온갖 컬러 힌트를 주다가 시험 볼 땐 힌트를 뚝 끊어 멘붕에 빠뜨리지 않는다", "학습 맥락과 전혀 무관한 엉뚱한 배경 요소로 기억 회상을 방해하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "복습 퀴즈 화면에 단어 암기 시 사용했던 대표 삽화 아이콘을 미니 힌트 단서로 띄워 줘.",
      en: "Include the iconic visual cue from the study phase in the quiz card to trigger context recall."
    },
    english: { term: "encoding specificity", example: "Consistent visual cues between study and testing environments enhance retrieval performance.", keyVocab: ["retrieval", "encoding", "consistent"] },
    purposeTags: ["memory", "readability"], mediaTags: ["worksheet", "webapp", "slide"],
    demoType: "scenarioQuiz", demoConfig: { matchContext: true },
    related: [1, 24, 44], caseIds: [], level: 2, factNote: "Endel Tulving & Donald Thomson, 1973"
  },
  {
    id: 44, code: "044", slug: "chunk", chapter: "psychology",
    nameKo: "청크", nameEn: "Chunk", aliasesKo: ["청킹", "덩이짓기"],
    oneLiner: "낱개의 정보를 의미 있는 덩어리로 묶으면 기억력이 크게 늘어난다.",
    oneLinerEn: "Grouping isolated pieces of data into meaningful chunks drastically increases working memory.",
    why: "작업 기억(Working Memory)의 용량은 한 번에 4~7개 단위에 불과해요. 낱개 정보를 커다란 덩어리(Chunk)로 묶으면 기억의 슬롯을 획기적으로 아낄 수 있습니다.",
    analogy: "전화번호 '01012345678'보다 '010-1234-5678'로 세 토막 쪼개어 외우면 훨씬 쉬운 원리예요.",
    apply: {
      classroom: "긴 문법 설명을 3개의 핵심 공식 블록으로 네모 박스를 쳐서 묶어주세요.",
      webapp: "회원가입 폼이나 입력창을 끝없는 세로 나열 대신 3~4항목씩 카드 그룹으로 쪼개세요.",
      print: "가정통신문 공지사항을 날짜별/준비물별/주의사항별 3개 섹션 박스로 묶으세요."
    },
    doList: ["연관된 텍스트와 숫자를 3~4개의 친숙한 의미 단위로 묶어 하이픈이나 여백을 둔다", "카드나 컨테이너 박스를 사용해 한눈에 들어오는 시각적 덩어리를 만든다"],
    dontList: ["의미 없는 지점에서 텍스트를 무자비하게 쪼개어 오히려 가독성을 해치지 않는다", "수십 개의 정보를 한 문단 안에 쉼표로만 빽빽하게 이어 붙이지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "10개의 규칙을 3개씩 의미 단위로 묶어 '기본-수업-평가' 3대 청크 카드로 레이아웃해 줘.",
      en: "Group the ten classroom rules into three distinct, card-based chunks to reduce cognitive overload."
    },
    english: { term: "chunking principle", example: "Chunking complex historical timelines into thematic eras helps students memorize key events easily.", keyVocab: ["chunking", "cognitive", "overload"] },
    purposeTags: ["grouping", "readability"], mediaTags: ["worksheet", "slide", "notice", "webapp"],
    demoType: "timingGame", demoConfig: { gameType: "chunkingMemoryTest" },
    related: [6, 89, 94], caseIds: [8], level: 1, factNote: "George A. Miller, 1956"
  },
  {
    id: 45, code: "045", slug: "odd-pricing-effect", chapter: "psychology",
    nameKo: "단수 가격 효과", nameEn: "Odd Pricing Effect", aliasesKo: ["9900원 효과", "단수 효과"],
    oneLiner: "끝자리를 9로 낮추면 앞자리가 줄어들어 훨씬 더 저렴해 보인다.",
    oneLinerEn: "Pricing items just below a round number creates an outsized perception of bargain value.",
    why: "사람은 왼쪽에서 오른쪽으로 숫자를 읽기 때문에 가장 왼쪽 자릿수에 압도적인 인상을 받아요. 10,000원에서 100원만 뺀 9,900원은 앞자리가 '0'이 되어 대폭 할인된 느낌을 줍니다.",
    analogy: "10,000원짜리 옷보다 9,900원짜리 옷을 보면 만 원 이하의 알뜰 상품처럼 느껴지는 착각이에요.",
    apply: {
      classroom: "상업 경제 수업에서 가격 책정 심리와 소비자의 착시를 가르치는 교재로 활용하세요.",
      webapp: "모의 창업 프로젝트 웹앱에서 상품 가격표를 설정하는 실습 요소로 다루세요.",
      print: "학교 바자회 홍보물에서 기부 상품 가격을 5,000원, 3,000원처럼 정직하게 표기하세요."
    },
    doList: ["상업 마케팅의 단수 가격 전략을 학생들이 비판적으로 분석할 수 있는 능력을 키운다", "학교 교내 행사나 바자회에서는 계산이 쉬운 정직한 정수 단위 가격을 쓴다"],
    dontList: ["학생이나 학부모를 상대로 9,900원 착시를 걸어 과소비를 조장하는 상술을 쓰지 않는다", "실제로는 10원 단위까지 복잡하게 꼬아놓아 잔돈 거스름돈에 불편을 초래하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "착시를 이용해 실질적인 가격을 오인하게 만드는 기만적 마케팅 기법이므로 비판적 시각이 필요해요.",
    promptSnippet: {
      ko: "바자회 가격표는 잔돈 계산에 혼선이 없도록 1,000원 단위 정수로 정직하고 큼직하게 표기해 줘.",
      en: "Format the school charity bazaar price tags with clear, round numbers to facilitate quick mental math."
    },
    english: { term: "charm pricing", example: "Studying odd pricing illuminates how slight numerical shifts alter perceived affordability.", keyVocab: ["pricing", "numerical", "affordability"] },
    purposeTags: ["choice", "perception"], mediaTags: ["notice", "poster"],
    demoType: "choiceLab", demoConfig: { priceCompare: ["10000", "9900"] },
    related: [25, 30, 46], caseIds: [4], level: 2, factNote: null
  },
  {
    id: 46, code: "046", slug: "deadline-effect", chapter: "psychology",
    nameKo: "마감 효과", nameEn: "Deadline Effect", aliasesKo: ["마감 임박 효과"],
    oneLiner: "마감이 코앞에 다가오면 집중력이 치솟아 빠르게 결단을 내린다.",
    oneLinerEn: "Imminent deadlines trigger focused urgency, compelling people to act without delay.",
    why: "마감이 임박하면 '나중에 하지'라는 미루기 핑계가 차단돼요. 기회를 놓칠지도 모른다는 긴박감이 아드레날린을 분비시키며 행동 전환율을 최고치로 끌어올립니다.",
    analogy: "한 달 내내 미루던 방학 숙제를 개학 전날 밤 단 몇 시간 만에 번개처럼 끝내는 기적이에요.",
    apply: {
      classroom: "수행평가 제출 화면에 '제출 마감까지 3일 남음' 카운트다운을 명확히 표시하세요.",
      webapp: "신청 폼 상단에 실시간 남은 시간 타이머를 띄워 기한 내 제출을 독려하세요.",
      print: "동아리 지원서에 마감 날짜와 시각(예: 3월 15일 18:00 정각)을 굵은 빨간색으로 표기하세요."
    },
    doList: ["정확한 마감 일시를 달력 및 잔여 시간 카운트다운과 함께 명료하게 고지한다", "학생들이 마감 직전 서버 혼잡을 겪지 않도록 여유 있는 조기 제출을 권장한다"],
    dontList: ["새로고침할 때마다 리셋되는 가짜 마감 타이머로 사용자를 불안하게 쫓지 않는다", "마감 시간이 임박했다고 결제를 부추기는 악성 팝업 다크 패턴을 모방하지 않는다"],
    ethicsLevel: "risk", ethicsNote: "가짜 마감 시간으로 긴장감을 조작해 충동구매를 유발하는 기만적 마케팅의 대표 사례예요.",
    promptSnippet: {
      ko: "과제 제출 마감일까지 남은 날짜(D-3)를 상단 헤더에 정직하고 명확한 뱃지로 표시해 줘.",
      en: "Display an accurate deadline countdown badge to help students manage their study schedule responsibly."
    },
    english: { term: "deadline effect", example: "A clear deadline countdown prevents procrastination and helps students plan their revision timetable.", keyVocab: ["procrastination", "countdown", "schedule"] },
    purposeTags: ["motivation", "emphasis"], mediaTags: ["notice", "webapp", "poster"],
    demoType: "scenarioQuiz", demoConfig: { timerType: "countdownUrgency" },
    related: [21, 30, 42], caseIds: [4], level: 2, factNote: null
  },
  {
    id: 47, code: "047", slug: "default-effect", chapter: "psychology",
    nameKo: "디폴트 효과", nameEn: "Default Effect", aliasesKo: ["기본값 효과", "사전 설정 효과"],
    oneLiner: "특별한 이유가 없으면 미리 지정된 기본 선택지를 그대로 따른다.",
    oneLinerEn: "People overwhelmingly stick with preset default choices rather than opting out.",
    why: "새로운 옵션을 따져보는 데는 인지적 에너지와 결정 피로가 소모돼요. 기본값은 추천받은 표준이라는 무의식적 신뢰와 현상 유지 편향(Status Quo)이 결합합니다.",
    analogy: "새 스마트폰을 샀을 때 기본 벨소리와 배경화면을 몇 달 동안 그대로 쓰는 습관이에요.",
    apply: {
      classroom: "학습 웹앱에서 가장 눈이 편안한 표준 폰트와 다크 모드를 기본값으로 세팅해 두세요.",
      webapp: "개인정보 수집 체크박스는 절대 미리 체크(pre-checked)해 두지 말고 빈칸으로 두세요.",
      print: "방과후 수업 희망서에서 가장 균형 잡힌 표준 코스를 기본 안내 옵션으로 배치하세요."
    },
    doList: ["사용자에게 가장 안전하고 유익한 최적의 설정을 친절한 기본값으로 사전 구성한다", "언제든지 기본값을 쉽게 바꿀 수 있도록 옵션 변경 버튼을 찾기 쉽게 제공한다"],
    dontList: ["유료 정기결제나 마케팅 수신 동의 체크박스를 몰래 미리 켜두는 꼼수를 부리지 않는다", "기본값을 변경하는 설정 메뉴를 꽁꽁 숨겨두는 넛지 남용을 하지 않는다"],
    ethicsLevel: "risk", ethicsNote: "원치 않는 부가서비스나 개인정보 수집을 기본값으로 체크해 두는 다크 패턴의 핵심 주범이에요.",
    promptSnippet: {
      ko: "모든 선택 동의 체크박스는 미리 체크하지 않고 빈칸으로 두어 사용자의 자율적 선택을 존중해 줘.",
      en: "Keep all optional consent checkboxes unchecked by default to respect learner autonomy fully."
    },
    english: { term: "default effect", example: "Setting privacy-preserving options as the default protects students from accidental data exposure.", keyVocab: ["default", "preserve", "autonomy"] },
    purposeTags: ["choice", "usability"], mediaTags: ["webapp", "notice"],
    demoType: "choiceLab", demoConfig: { togglePreset: "precheckedVsBlank" },
    related: [14, 28, 51], caseIds: [9], level: 3, factNote: "William Samuelson & Richard Zeckhauser, 1988"
  },
  {
    id: 48, code: "048", slug: "endowment-effect", chapter: "psychology",
    nameKo: "보유 효과", nameEn: "Endowment Effect", aliasesKo: ["내 것 효과"],
    oneLiner: "내가 직접 소유한 물건은 남의 것일 때보다 훨씬 값지게 느껴진다.",
    oneLinerEn: "People ascribe vastly higher value to objects simply because they own them.",
    why: "소유권을 획득하는 순간 그 대상은 자신의 자아(Self)와 연결돼요. 그것을 포기하거나 남에게 넘기는 행위는 손실 회피 심리와 맞물려 뼈아픈 박탈감으로 다가옵니다.",
    analogy: "내가 쓰던 낡은 필통을 친구에게 팔라고 하면 새 필통 살 돈을 줘도 아까워 못 파는 마음이에요.",
    apply: {
      classroom: "학생 각자의 이름표가 붙은 개인 파일철을 주어 과제물 관리에 애착을 갖게 하세요.",
      webapp: "새 학습자에게 환영 포인트 100점을 먼저 지급해 포인트를 버리기 아깝게 만드세요.",
      print: "독서 여권 표지에 학생 자신의 서명란을 넣어 세상에 단 하나뿐인 여권으로 만드세요."
    },
    doList: ["학습자가 스스로 작성한 포트폴리오에 자부심과 주인의식을 갖도록 돕는다", "커스터마이징 기능을 제공해 나만의 맞춤 학습 도구로 애정을 느끼게 한다"],
    dontList: ["무료 체험 뒤 해지 절차를 꼬아 강제 결제시키는 상술을 쓰지 않는다", "학습자가 정성껏 만든 디지털 결과물을 예고 없이 삭제해 상처를 주지 않는다"],
    ethicsLevel: "caution", ethicsNote: "무료 체험으로 소유의 덫을 놓은 뒤 구독 해지를 극도로 어렵게 만드는 구독 함정을 피해야 해요.",
    promptSnippet: {
      ko: "학생 개인의 이름과 목표가 적힌 커스텀 학습 대시보드 카드로 소속감과 애착을 높여 줘.",
      en: "Design a personalized student dashboard showcasing their name and custom avatar to foster ownership."
    },
    english: { term: "endowment effect", example: "Encouraging students to personalize their portfolios fosters a protective sense of creative ownership.", keyVocab: ["endowment", "ownership", "foster"] },
    purposeTags: ["emotion", "motivation"], mediaTags: ["webapp", "worksheet"],
    demoType: "scenarioQuiz", demoConfig: { ownershipScenario: "customBadge" },
    related: [4, 21, 30], caseIds: [3], level: 2, factNote: "Richard Thaler, 1980"
  },
  {
    id: 49, code: "049", slug: "placebic-reason-effect", chapter: "psychology",
    nameKo: "이유 제시 효과", nameEn: "Placebic Reason Effect", aliasesKo: ["왜냐하면 효과"],
    oneLiner: "형식적인 핑계라도 이유를 덧붙이면 부탁의 수락률이 크게 뛴다.",
    oneLinerEn: "Adding any justification, even a trivial one, dramatically increases request compliance.",
    why: "사람의 뇌는 요청 뒤에 '왜냐하면'이라는 접속사가 붙으면 무의식적으로 타당한 이유가 있을 거라 짐작하고 자동 승낙 모드로 전환되는 휴리스틱을 가지고 있어요.",
    analogy: "'먼저 복사할게요'보다 '바빠서 그러는데 먼저 복사해도 될까요?'가 훨씬 잘 통하는 실험이에요.",
    apply: {
      classroom: "규칙을 고지할 때 '휴대폰 금지' 대신 '집중을 방해할 수 있으니 가방에 넣기'로 쓰세요.",
      webapp: "권한 허용 창에서 '카메라 권한 필요' 대신 '과제 사진 업로드를 위해 카메라 권한이 필요해요'로 쓰세요.",
      print: "가정통신문 회신 요구 시 '취합 통계를 교육청에 제출해야 하므로' 이유를 명시하세요."
    },
    doList: ["학생에게 지시나 과제를 내릴 때 '이걸 왜 해야 하는지' 교육적 이유를 반드시 덧붙인다", "시스템 권한 요청 시 왜 그 권한이 사용자에게 유익한지 투명하게 소명한다"],
    dontList: ["말도 안 되는 억지 이유나 알맹이 없는 동어반복으로 학생들의 지성을 모욕하지 않는다", "정당한 이유 없이 권위만을 앞세워 '그냥 하라는 대로 해'라는 식의 강요를 하지 않는다"],
    ethicsLevel: "caution", ethicsNote: "허울뿐인 가짜 이유를 둘러대어 비합리적인 요구를 정당화하는 조작 수단으로 쓰이지 않아야 해요.",
    promptSnippet: {
      ko: "카메라 권한 요청 다이얼로그에 '과제 제출 사진을 찍기 위해 카메라 권한이 필요해요'라고 이유를 밝혀 줘.",
      en: "State the clear purpose: 'Camera access is required to take photos of your completed worksheets.'"
    },
    english: { term: "reason compliance effect", example: "Explaining the pedagogical reason behind rules dramatically boosts student cooperation.", keyVocab: ["compliance", "pedagogical", "justification"] },
    purposeTags: ["trust", "usability"], mediaTags: ["notice", "webapp", "slide"],
    demoType: "scenarioQuiz", demoConfig: { reasonGiven: true },
    related: [5, 20, 36], caseIds: [], level: 2, factNote: "Ellen Langer et al., 1978"
  },
  {
    id: 50, code: "050", slug: "ringelmann-effect", chapter: "psychology",
    nameKo: "링겔만 효과", nameEn: "Ringelmann Effect", aliasesKo: ["사회적 태만", "무임승차 효과"],
    oneLiner: "집단 속에 숨으면 개인이 쏟는 노력의 양이 혼자일 때보다 줄어든다.",
    oneLinerEn: "Individual effort decreases as the size of the group working together increases.",
    why: "참여 인원이 늘어날수록 자신의 기여도가 눈에 띄지 않게 돼요. 책임감이 분산(Diffusion of responsibility)되면서 슬그머니 남에게 기대려는 심리가 작동합니다.",
    analogy: "혼자 줄다리기를 할 땐 온 힘을 다하지만 10명이 당길 땐 나 하나쯤 힘을 덜 줘도 모를 것 같은 마음이에요.",
    apply: {
      classroom: "모둠 활동 시 5~6명 대규모 모둠 대신 3명 소그룹으로 쪼개고 개인별 역할을 지정하세요.",
      webapp: "공동 문서 작성 툴에서 각 학생이 작성한 문장마다 기여자의 프로필 라벨을 달아주세요.",
      print: "수행평가 채점 루브릭에 모둠 점수 외에 '개인 기여도 동료 평가' 항목을 명시하세요."
    },
    doList: ["개인별 역할과 결과물에 대한 책임 소재를 명확히 분담한다", "모둠 활동에서도 각 구성원의 고유한 기여가 시각적으로 드러나도록 인터페이스를 설계한다"],
    dontList: ["개인별 평가 없이 모둠 전체에 일괄 점수만 주어 성실한 학생에게 박탈감을 주지 않는다", "사회적 태만을 방지한다는 명목으로 학생들 간의 불필요한 감시와 갈등을 유발하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "모둠 과제 제출 카드에 각 팀원별 담당 영역과 작성 상태를 한눈에 볼 수 있는 기여도 태그를 달아 줘.",
      en: "Add individual contributor tags to the team project card to highlight each student's role."
    },
    english: { term: "Ringelmann effect", example: "Assigning individual roles within group projects prevents social loafing and ensures equitable effort.", keyVocab: ["loafing", "equitable", "accountability"] },
    purposeTags: ["motivation", "usability"], mediaTags: ["worksheet", "webapp", "notice"],
    demoType: "scenarioQuiz", demoConfig: { groupSize: [1, 3, 8] },
    related: [12, 37, 41], caseIds: [], level: 2, factNote: "Max Ringelmann, 1913"
  },
  {
    id: 51, code: "051", slug: "hicks-law", chapter: "psychology",
    nameKo: "힉의 법칙", nameEn: "Hick's Law", aliasesKo: ["선택과 시간의 법칙", "힉-하이먼 법칙"],
    oneLiner: "선택지의 수가 많아질수록 결정을 내리는 시간은 더 길어진다.",
    oneLinerEn: "The time required to make a decision increases logarithmically with the number of choices.",
    why: "선택 항목이 늘어날수록 뇌는 각 항목을 비교하고 저울질하는 탐색 과정을 거쳐야 해요. 인지 처리 시간이 길어지며 심한 경우 결정 마비에 빠집니다.",
    analogy: "메뉴판에 음식이 50가지 적혀 있으면 무엇을 먹을지 한참 동안 고르지 못하는 현상이에요.",
    apply: {
      classroom: "학습 선택 활동에서 한 번에 10가지를 주지 말고 핵심 추천 3~4가지만 제시하세요.",
      webapp: "모바일 화면의 1차 메뉴 항목을 최대 5~7개 이내로 제한해 탭바를 구성하세요.",
      print: "수업 선택지 안내문에서 가장 적합한 옵션 3가지를 하이라이트 박스로 추려주세요."
    },
    doList: ["한 화면에서 제공하는 1차 액션 선택지를 3~5개 안팎으로 과감하게 압축한다", "선택지가 많을 때는 계층 구조나 단계별(Step-by-step) 마법사로 쪼개어 보여준다"],
    dontList: ["첫 페이지에 온갖 세부 링크 수십 개를 모조리 펼쳐놓아 사용자를 압도하지 않는다", "선택을 돕는 추천 기준 없이 무작위로 방대한 옵션을 던져두지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "메뉴 버튼 선택지를 7개 이하로 간결하게 압축하고, 가장 많이 쓰는 3개는 전면에 돋보이게 둬 줘.",
      en: "Limit top-level choices to five essential buttons according to Hick's Law to minimize decision delay."
    },
    english: { term: "Hick's law", example: "Simplifying the main navigation menu down to four options reduced decision friction for students.", keyVocab: ["navigation", "friction", "simplify"] },
    purposeTags: ["usability", "choice"], mediaTags: ["webapp", "slide", "notice"],
    demoType: "timingGame", demoConfig: { gameType: "hickReactionTime" },
    related: [28, 44, 103], caseIds: [1, 9], level: 1, factNote: "William Edmund Hick & Ray Hyman, 1952"
  },
  {
    id: 52, code: "052", slug: "context-effect", chapter: "psychology",
    nameKo: "문맥 효과", nameEn: "Context Effect", aliasesKo: ["배경 맥락 효과"],
    oneLiner: "같은 기호도 주변에 어떤 글자가 함께 있느냐에 따라 다르게 읽힌다.",
    oneLinerEn: "Environmental context and surrounding symbols determine how an ambiguous figure is perceived.",
    why: "우리의 지각 시스템은 모호한 자극을 해석할 때 주변에 배치된 단서들을 바탕으로 탑다운(Top-down) 기대치를 형성해요. 맥락이 대상을 규정합니다.",
    analogy: "가운데 모양이 'A 13 C' 사이에선 B로 읽히고, '12 13 14' 사이에선 13으로 읽히는 착시예요.",
    apply: {
      classroom: "다의어 단어를 가르칠 때는 단어 카드 단독이 아니라 생생한 문장 맥락 속에서 보여주세요.",
      webapp: "아이콘 옆에 명확한 텍스트 라벨을 함께 두어 아이콘의 의미가 오해 없이 통하게 하세요.",
      print: "전문 용어가 등장하는 학습 자료 주변에 친절한 각주와 용어 풀이 맥락을 곁들이세요."
    },
    doList: ["모호할 수 있는 기호나 아이콘은 반드시 주변 텍스트와 레이아웃 맥락으로 의미를 보강한다", "학습자가 지식을 실전 환경과 결합된 온전한 맥락 속에서 이해할 수 있도록 돕는다"],
    dontList: ["아무런 설명 없이 알쏭달쏭한 추상적 픽토그램만 덩그러니 두어 오해를 유발하지 않는다", "전후 맥락을 악의적으로 잘라내어 발언이나 사실을 왜곡 편집하지 않는다"],
    ethicsLevel: "safe", ethicsNote: null,
    promptSnippet: {
      ko: "모호한 아이콘 단독 표기를 지양하고, 아이콘 바로 옆에 명확한 한글 라벨 맥락을 병기해 줘.",
      en: "Accompany all interface icons with explicit textual labels to ensure clear contextual comprehension."
    },
    english: { term: "context effect", example: "Surrounding visual context disambiguates the symbol, ensuring students read the math formula correctly.", keyVocab: ["context", "disambiguate", "comprehension"] },
    purposeTags: ["perception", "readability"], mediaTags: ["worksheet", "slide", "webapp"],
    demoType: "compareToggle", demoConfig: { toggleStates: ["numericContext", "alphaContext"] },
    related: [1, 10, 43], caseIds: [], level: 1, factNote: null
  }
];
