# 00. DesignMind 108 — Antigravity 실행 계획서 v1.0

> **프로젝트**: 『디자인 심리 108』의 108개 원리 + 11개 사례를 **교실·연수·웹앱 제작**에 바로 쓰는 인터랙티브 웹앱
> **작성**: Claude (계획·검수) · **실행**: Antigravity · **승인**: 홍진우 선생님
> **함께 읽을 문서**: `01_WEBAPP_STANDARDS.md`(공통 표준, 필수) · `02_source-index.json`(원본 사진 ↔ 효과 매핑)
> **작성일**: 2026-10-17

---

## 목차

- [0. 이 문서 사용법 (선생님용 3분 안내)](#0-이-문서-사용법-선생님용-3분-안내)
- [1. 프로젝트 개요](#1-프로젝트-개요)
- [2. 절대 규칙 (Hard Rules)](#2-절대-규칙-hard-rules)
- [3. 사용자와 핵심 시나리오](#3-사용자와-핵심-시나리오)
- [4. 정보 구조(IA)와 내비게이션](#4-정보-구조ia와-내비게이션)
- [5. 화면별 상세 명세](#5-화면별-상세-명세)
- [6. 데이터 모델](#6-데이터-모델)
- [7. 체험(Demo) 엔진](#7-체험demo-엔진)
- [8. AI 디자인 진단](#8-ai-디자인-진단)
- [9. 비주얼 디자인 방향](#9-비주얼-디자인-방향)
- [10. 기술 스택과 폴더 구조](#10-기술-스택과-폴더-구조)
- [11. 단계별 실행 계획 (Phase 0–7)](#11-단계별-실행-계획-phase-07)
- [12. 검수 프로토콜 (Antigravity ↔ Claude)](#12-검수-프로토콜-antigravity--claude)
- [13. 콘텐츠 작성 가이드](#13-콘텐츠-작성-가이드)
- [14. 수업 활용 모듈 4종](#14-수업-활용-모듈-4종)
- [15. 리스크와 대응](#15-리스크와-대응)
- [부록 A. Antigravity 프롬프트 모음](#부록-a-antigravity-프롬프트-모음)
- [부록 B. 108개 원리 · 11개 사례 목록](#부록-b-108개-원리--11개-사례-목록)

---

## 0. 이 문서 사용법 (선생님용 3분 안내)

### 0.1 역할 분담

| 주체 | 하는 일 | 하지 않는 일 |
|---|---|---|
| **Claude** | 계획서 작성 · Phase별 검수(코드 읽기, 빌드, 3가지 화면 폭 스크린샷, 콘텐츠 사실 확인) · 검수 보고서 작성 | 코드 직접 대량 작성 |
| **Antigravity** | 계획서대로 코드·콘텐츠 작성 · Phase 끝마다 보고서 작성 후 **멈춤** | 계획 범위 밖 기능 추가, 다음 Phase 임의 진행 |
| **선생님** | 각 Phase 시작 승인 · 검수 요청 전달 · 최종 판단 | 코드 수정 (필요 없음) |

### 0.2 진행 순서 (반복 루프)

```
① 선생님: Antigravity에 [부록 A]의 Phase 프롬프트 붙여넣기
② Antigravity: 구현 계획(Implementation Plan) 제시 → 선생님 승인 → 실행
③ Antigravity: docs/progress/PHASE_N_REPORT.md 작성 → 멈춤
④ 선생님: Claude에게 "Phase N 검수해줘" (폴더 연결 상태에서)
⑤ Claude: docs/reviews/PHASE_N_REVIEW.md 작성 (P0/P1/P2 분류)
⑥ 선생님: Antigravity에 "PHASE_N_REVIEW.md의 P0·P1 수정해줘"
⑦ P0·P1이 0개가 되면 다음 Phase로
```

### 0.3 폴더 배치 (Antigravity 작업 공간)

```
디자인 심리 108/                   ← Antigravity에서 이 폴더를 Workspace로 연다
├─ 00_ANTIGRAVITY_PLAN.md          ← 이 문서 (Phase 0에서 docs/로 이동)
├─ 01_WEBAPP_STANDARDS.md          ← 공통 표준 (Phase 0에서 docs/로 이동)
├─ 02_source-index.json            ← 원본 매핑 (Phase 0에서 docs/로 이동)
├─ 20261017_122705.jpg … (127장)   ← 원본 사진: 읽기 전용, 수정·이동·배포 금지
└─ design-psych-108/               ← Phase 0에서 생성되는 앱 프로젝트 (영문 경로)
```

> 원본 사진은 앱 프로젝트 **바깥**(상위 폴더)에 있으므로 Git·배포에 자동으로 포함되지 않습니다. 이 구조를 유지하세요.

---

## 1. 프로젝트 개요

### 1.1 한 줄 정의
**"디자인 심리 108개 원리를 30초 체험으로 이해하고, 내 수업자료·웹앱에 바로 적용하는 교실용 디자인 도감 + AI 코치"**

### 1.2 앱 이름
- 한글: **디자인마인드 108** / 영문: **DesignMind 108**
- 부제: "마음을 움직이는 디자인 원리 108"
- ⚠️ 책 제목·표지·로고를 앱 브랜딩에 사용하지 않습니다. 책은 "참고 도서"로만 표기합니다.

### 1.3 왜 만드는가 (선생님 맥락 연결)

| 선생님의 현재 활동 | 이 앱이 주는 가치 |
|---|---|
| Gemini 기반 웹앱 제작·고도화 교원 연수 | 바이브코딩으로 만든 웹앱을 **원리 기반으로 고도화**하는 체크리스트·프롬프트 빌더 |
| 영어 수업(영어I·심화영어·진로영어) | 원리 용어 **한·영 병기**, 영어 포스터 제작 + 영어로 디자인 의도 설명하기 활동 |
| AI 리터러시·미디어 리터러시 관심 | 광고·앱 화면 속 **"설득 vs 조작(다크 패턴)"** 판별 활동 |
| 수업 슬라이드·학습지·가정통신문 제작 | **AI 디자인 진단**: 화면을 올리면 개선점 3가지 제시 |
| 교사용 AI 책 집필·연수 강의 | 강의 중 바로 띄우는 **발표 모드**, 원리별 사례 자료 |

### 1.4 목표와 성공 기준

| 목표 | 측정 가능한 성공 기준 |
|---|---|
| 이해 | 108개 전부 "한 줄 정의 + 30초 체험 + 학교 적용 예시" 보유 |
| 적용 | 프롬프트 빌더로 3분 안에 "디자인 지시문" 생성 가능 |
| 학습 | 퀴즈 4종 작동, 개인 진도(수집률) 저장 |
| 진단 | 이미지 업로드 → 15초 안에 개선점 3개 + 관련 원리 링크 |
| 품질 | Lighthouse 모바일 성능 ≥ 90 · 접근성 ≥ 95, 360px 가로 스크롤 0 |
| 재사용 | `01_WEBAPP_STANDARDS.md` + 컴포넌트 라이브러리를 다른 프로젝트에 복사해 즉시 사용 가능 |

### 1.5 범위

| 포함 (In Scope) | 제외 (Out of Scope) — 요청 없이 추가 금지 |
|---|---|
| 도감·상세·체험·사례·연습·프롬프트 빌더·AI 진단·수업 활용·발표 모드·PWA | 로그인/회원가입, DB 서버, 관리자 페이지, 결제, 댓글/커뮤니티, 다국어 전체 번역(UI는 한국어, 용어만 영어 병기), 분석 트래킹 도구 |

---

## 2. 절대 규칙 (Hard Rules)

> 아래 규칙 위반은 검수에서 **P0(차단)** 입니다. 모든 Phase에서 항상 적용합니다.

### 2.1 저작권 (가장 중요)
1. **원본 사진(책 촬영본 127장)을 앱에 포함·배포·업로드하지 않는다.** `public/`, `src/`에 복사 금지. 내용 파악용으로 **읽기만** 한다.
2. **책 문장을 옮겨 적지 않는다.** 원리를 이해한 뒤 **자신의 말로** 새로 쓴다. (기준: 책과 같은 문장·같은 표현이 연속으로 나오면 위반)
3. **책의 예시(광고 시안, 제품, 브랜드명, 수치 예시, 일러스트)를 재현하지 않는다.** 모든 예시는 **학교 맥락으로 새로 창작**하고, 시각 자료는 **SVG/CSS로 직접 그린다**.
4. 착시(053–078)는 학술적으로 공개된 현상이므로 **SVG/Canvas로 직접 구현**한다. 사진 기반 착시(056 드레스, 075 크레이터, 076 피사의 사탑, 077 색채 동화 격자)는 **도형·그라디언트로 재설계**한다.
5. 원리 **이름(학술 용어)**과 **108개라는 분류 구조**는 참고 가능. `/about` 페이지에 출처 표기:
   > 참고 도서: 『디자인 심리 108 — 광고, UX/UI, 브랜딩에 바로 쓰는』, 321web(미쓰이 마사유키) 지음, 김현미 옮김, 시프트. 본 앱의 설명·예시·그림은 교육 목적으로 새로 작성되었습니다.

### 2.2 개인정보·보안
6. 로그인 없음. 학습 기록은 `localStorage`에만 (모든 접근 `try/catch`).
7. AI 진단 업로드 이미지는 **저장·로깅 금지**. API 키는 **서버 환경변수**에만.
8. 학생 이름·얼굴·학번 수집 금지. 업로드 화면에 안내 문구 필수.

### 2.3 작업 방식
9. **Phase 단위로 작업하고, Phase가 끝나면 보고서 작성 후 반드시 멈춘다.** 다음 Phase는 선생님 지시가 있을 때만.
10. 계획서에 없는 기능·파일·의존성 추가 금지. 필요하다고 판단되면 **제안만** 보고서에 적는다.
11. 모든 화면은 `01_WEBAPP_STANDARDS.md`를 따른다.
12. 의사결정은 `docs/DECISIONS.md`에 기록(무엇을 / 왜 / 고려한 대안).
13. Git: 단계(Step)마다 커밋, Phase 완료 시 태그 `phase-N`.

---

## 3. 사용자와 핵심 시나리오

### 3.1 사용자(페르소나)

| 페르소나 | 상황 | 핵심 니즈 | 주로 쓰는 화면 |
|---|---|---|---|
| **A. 수업자료 만드는 교사** | 내일 쓸 슬라이드·학습지·가정통신문 제작 | "이거 더 잘 보이게 하려면?" | AI 진단, 상황별 찾기, 상세 |
| **B. 고등학생** | 영어·창체·정보 수업 활동 | 쉽고 재미있게 이해, 퀴즈 | 도감, 체험, 연습, 사례 |
| **C. 연수 참가 교사** | Gemini/AI로 만든 웹앱을 고도화 | "AI에게 뭐라고 시켜야 예뻐지지?" | 프롬프트 빌더, 진단 |
| **D. 선생님 본인(강사)** | 연수·수업에서 화면 띄워 설명 | 크게, 깔끔하게, 바로 | 발표 모드, 사례, 수업 활용 |

### 3.2 핵심 시나리오 (각 시나리오는 Phase 7 수용 테스트로 사용)

- **S1 (교사, 3탭 이내)**: 홈 → "가정통신문" 칩 선택 → 추천 원리 8개 → 「근접의 법칙」 상세 → "AI 지시문 복사".
- **S2 (학생)**: 도감 → 착시 챕터 → 「뮐러-리어 착시」 체험 → "정답 보기"로 길이 동일 확인 → 퀴즈 10문항 → 결과 화면에서 틀린 원리 복습.
- **S3 (연수 교사)**: 도구 → 프롬프트 빌더 → "웹앱 / 신뢰 주기·쓰기 쉽게" 선택 → 추천 원리 6개 확인 → 한국어 지시문 복사 → Gemini에 붙여넣기.
- **S4 (교사)**: 도구 → AI 진단 → 학습지 사진 업로드 → 점수 5항목 + 개선점 3개 → 각 개선점의 원리 링크 탭.
- **S5 (강사)**: 사례 → CASE 10(구독 해지 화면, 다크 패턴) → 발표 모드 → 핫스팟 하나씩 공개하며 설명.

---

## 4. 정보 구조(IA)와 내비게이션

### 4.1 라우트 목록

| 경로 | 화면 | 비고 |
|---|---|---|
| `/` | 홈 | |
| `/library` | 도감(108 카드) | 쿼리: `?chapter=&purpose=&media=&ethics=&q=` (필터 상태 URL 보존) |
| `/effect/:code` | 원리 상세 | `code` = `001`~`108` |
| `/effect/:code/present` | 발표 모드 | 전체화면, 큰 글씨 |
| `/cases` | 사례 목록 (11개) | |
| `/cases/:caseCode` | 사례 스튜디오 | `CASE01`~`CASE11` |
| `/practice` | 연습 허브 | |
| `/practice/:mode` | 퀴즈 진행 | `flash` · `quiz` · `ethics` · `english` |
| `/tools` | 도구 허브 | |
| `/tools/builder` | 프롬프트 빌더 | |
| `/tools/diagnose` | AI 디자인 진단 | |
| `/teach` | 수업 활용 허브 | |
| `/teach/:moduleId` | 수업 모듈 상세 | 인쇄용 활동지 포함 |
| `/my` | 내 도감 (즐겨찾기·수집률·퀴즈 기록) | |
| `/about` | 소개·사용법·출처·개인정보 | |
| `*` | 404 | 홈·도감으로 안내 |

### 4.2 내비게이션

- **모바일·태블릿 하단 탭(5개)**: `홈` · `도감` · `사례` · `연습` · `도구`
  - `도구` 탭 안에: AI 진단, 프롬프트 빌더, 수업 활용, 내 도감, 소개
- **데스크톱 좌측 사이드바**: 위 5개 + 하위 메뉴 펼침
- **상단바(공통)**: 뒤로가기(하위 화면에서만) · 화면 제목 · 검색 아이콘 · **X-ray 토글(🔍)** · 테마 토글(라이트/다크)
- **전역 검색**: 상단 검색 아이콘 → 오버레이 → 한글·영문·**초성**(예: `ㅅㅅㅇㄷ` → 시선 유도) 검색

### 4.3 시그니처 기능: X-ray 모드 (이 앱 자체가 교재)
- 상단바 🔍 토글을 켜면, **현재 화면에 실제로 적용된 원리**가 번호 배지로 표시된다.
  - 예: 하단 탭바에 `103 피츠`·`100 제이콥`, 카드 그리드에 `089 근접`·`091 반복`, 홈 진도 링에 `032 목표 구배`.
- 배지를 탭하면 미니 카드(이름·한 줄 정의·"자세히")가 뜬다.
- 구현: `<Principle ids={[89, 91]}>…</Principle>` 래퍼 컴포넌트 + `XrayContext`. 꺼져 있을 때는 렌더 비용 0(배지 미생성).
- **모든 주요 화면에 최소 3개 이상** X-ray 표시를 넣는다.

---

## 5. 화면별 상세 명세

> 각 화면은 "목적 → 구성(위에서 아래 순서) → 상호작용 → 빈/오류 상태 → X-ray 원리" 순으로 정의합니다.

### 5.1 홈 `/`
- **목적**: 처음 온 사람이 3탭 안에 원하는 원리에 도달.
- **구성**
  1. 헤드라인: "디자인이 마음을 움직이는 108가지 이유" + 부제 1줄
  2. **"지금 무엇을 만들고 있나요?"** 매체 칩(가로 스크롤): `수업 슬라이드` `학습지` `가정통신문·안내문` `포스터` `웹앱·웹페이지` `영상 썸네일` `SNS 카드뉴스` → 탭하면 `/library?media=…`
  3. **"무엇을 하고 싶나요?"** 목적 카드 2열 그리드(아이콘+라벨, 8개): 시선 끌기 · 강조하기 · 신뢰 주기 · 선택 돕기 · 기억에 남기기 · 읽기 쉽게 · 묶어 보이기 · 쓰기 쉽게 → `/library?purpose=…`
  4. **오늘의 원리** 카드 (날짜 기반 고정 랜덤, 체험 바로가기 버튼)
  5. **내 수집률** 진도 링 (예: "108개 중 23개 익힘") + "이어서 학습" 버튼 → 가장 최근 본 원리의 다음 번호
  6. 챕터 5개 카드: 심리(52) · 착시(26) · 색채(10) · 레이아웃·UX(20) · 사례(11)
  7. 도구 바로가기 2개: AI 진단 · 프롬프트 빌더
- **X-ray**: 032 목표 구배(진도 링), 019 자이가르닉("이어서 학습"), 051 힉의 법칙(선택지 7~8개 제한), 089 근접

### 5.2 도감 `/library`
- **구성**
  1. 검색창(placeholder: "이름, 영어, 초성으로 검색 (예: ㄷㅂ)")
  2. 필터 칩 줄: `챕터`(5) · `목적`(8) · `매체`(7) · `윤리`(안전/주의/위험) — 다중 선택, 선택 개수 배지, "초기화"
  3. 결과 수 표시 "23개의 원리"
  4. 카드 그리드(1/2/3/4열)
- **원리 카드(EffectCard)**: 번호 원형 배지(챕터 색) · 한글 이름 · 영문 이름(작게) · 한 줄 정의(2줄 말줄임) · 데모 유형 아이콘 · 익힘 체크 표시 · 윤리 주의 아이콘(해당 시)
- **상호작용**: 필터 변경 시 URL 쿼리 갱신(뒤로가기 복원), 결과 0개면 EmptyState("조건을 하나 빼 볼까요?" + 필터 초기화 버튼)
- **X-ray**: 091 반복, 089 근접, 094 유사, 010 대비(선택된 칩)

### 5.3 원리 상세 `/effect/:code` (가장 중요한 화면)
위에서 아래 순서 고정. 모든 원리가 같은 순서를 가져야 함(제이콥의 법칙 — 한 번 익히면 108개 모두 쉽게).

| 순서 | 섹션 | 내용 | 비고 |
|---|---|---|---|
| ① | 헤더 | 번호 배지 · 챕터 칩 · 한글 이름(h1) · 영문 이름 · **한 줄 정의**(굵게) · ☆즐겨찾기 · ✓익혔어요 | |
| ② | **30초 체험** | 데모 컴포넌트 (7장) | 첫 화면 안에 보이도록 |
| ③ | 왜 그럴까? | 원리 설명 2~3문장 + 💡비유 1문장 | |
| ④ | 이렇게 써 보세요 | 탭 3개: `수업자료` `웹앱` `인쇄물` — 각 1~2문장 | |
| ⑤ | Do & Don't | 2열(모바일 1열) 각 2개, ✓/✕ 아이콘 + 텍스트 | |
| ⑥ | 윤리 체크 | `ethicsLevel`이 caution/risk일 때만. "설득과 조작의 경계" 박스 | risk는 빨간 테두리 |
| ⑦ | AI에게 이렇게 시키기 | 지시문(한/영 토글) + 복사 버튼 → 토스트 "복사했어요" | |
| ⑧ | English Corner | 영어 용어 · 예문 1개 · 핵심 어휘 3개 | 영어 수업 연계 |
| ⑨ | 함께 보면 좋은 원리 | 관련 원리 카드 2~4개 + 이 원리가 쓰인 사례 링크 | |
| ⑩ | 하단 내비 | ← 이전 번호 · 다음 번호 → · "발표 모드로 보기" | 스와이프 대신 버튼(접근성) |

- **X-ray**: 019 자이가르닉(익혔어요 체크), 044 청크(섹션 분할), 100 제이콥(동일 구조), 007 시선 유도

### 5.4 발표 모드 `/effect/:code/present`
- 16:9 기준 전체화면, 본문 최소 28px, 배경 단색
- 슬라이드 3장 구성: ① 이름+한 줄 정의 ② 체험(데모 확대) ③ "수업자료에 쓰면?" 예시
- 키보드: ←/→ 이동, Esc 종료, `F` 전체화면 / 화면 하단에 큰 이전·다음 버튼
- 사례 스튜디오에도 동일 발표 모드 적용(핫스팟 1개씩 공개)

### 5.5 사례 목록 `/cases` · 사례 스튜디오 `/cases/:caseCode`
- **원칙**: 책의 사례 이미지를 쓰지 않고, **같은 구조·같은 원리 조합을 학교 맥락으로 새로 디자인한 목업**을 HTML/CSS/SVG로 제작한다. (매핑은 부록 B-2)
- **사례 스튜디오 구성**
  1. 사례 제목 · 핵심 메시지 1줄 · 사용된 원리 칩 목록
  2. **목업 캔버스**: 학교판 리메이크 디자인 (반응형, 최대폭 480px 세로형 또는 720px 가로형)
  3. 모드 토글 3개:
     - `원리 보기`: 번호 핫스팟 표시 → 탭하면 바텀시트(원리 미니카드 + "여기에 이렇게 적용됨" 설명)
     - `숨은 원리 찾기`(게임): 핫스팟 숨김 → 사용자가 영역을 탭 → 정답 영역이면 공개 + 점수
     - `Before/After`: 원리를 뺀 평범한 버전 ↔ 적용 버전 비교(토글 버튼, 슬라이더 아님)
  4. 사례 해설(3~5문장, 직접 작성) + "내 작품에 적용하기" 체크리스트 3개
- **CASE 09·10은 "비판적 분석" 사례**: 상단에 `미디어 리터러시` 배지, 해설에 "소비자로서 알아차리는 법" 3줄 추가.
- **핫스팟 접근성**: 각 핫스팟은 `<button>` + `aria-label="003 베이비페이스 효과 적용 위치"`, 키보드 Tab으로 순회.

### 5.6 연습 `/practice`
| 모드 | 내용 | 문항 생성 |
|---|---|---|
| `flash` 플래시카드 | 앞: 이름 / 뒤: 한 줄 정의+비유. "알아요/몰라요" 분류 | effects.json 자동 |
| `quiz` 개념 퀴즈 | 10문항 4지선다. 유형 3가지 섞기: 정의→이름, 상황→가장 알맞은 원리, 데모 화면→이름 | 자동 생성 + `quiz-scenarios.json`(상황형) |
| `ethics` 설득 vs 조작 | 화면 설명을 읽고 "설득/조작" 판정 + 이유 선택 | `quiz-ethics.json` (20문항, 직접 작성) |
| `english` 용어 매칭 | 한글 ↔ 영문 용어 짝짓기(탭 2번으로 짝 선택, 드래그 없음) | 자동 생성 |

- 공통: 챕터 범위 선택, 결과 화면(점수 · 틀린 원리 목록 → 상세 링크 · "틀린 것만 다시"), 기록 `localStorage`
- 오답 선택지는 **같은 챕터·비슷한 목적 태그**에서 뽑아 변별력 확보

### 5.7 프롬프트 빌더 `/tools/builder` (재사용성의 핵심)
4단계 마법사(상단 단계 표시 1/4…):
1. **무엇을 만드나요?** 매체 1개 선택
2. **무엇을 하고 싶나요?** 목적 1~3개 선택
3. **추천 원리 확인**: 매체×목적 태그 점수로 5~8개 자동 추천(체크박스로 빼기/더하기, 검색으로 추가)
4. **결과 출력** (탭 3개)
   - `AI 지시문`: Antigravity·Gemini·Claude 등에 붙여넣는 디자인 지시문 (한/영 토글, 복사)
   - `체크리스트`: 선택 원리별 확인 항목 → **`DESIGN_CHECKLIST.md` 다운로드**
   - `학생 활동지`: 인쇄용(A4, 흑백 가독) — 원리 이름·정의·"내 작품 어디에 적용했나?" 빈칸

**AI 지시문 템플릿** (`src/lib/buildPrompt.js`가 생성)
```
[역할] 너는 교육용 {매체}를 디자인하는 UI/UX 디자이너야.
[대상] {대상: 고등학생/교사/학부모}
[목표] {목적 라벨들}
[적용할 디자인 원리]
1. {nameKo}({nameEn}) — {promptSnippet.ko}
2. …
[공통 품질 기준]
- 모바일 360px에서 가로 스크롤 없이 보일 것
- 본문 16px 이상, 줄간격 1.6 이상, 명도 대비 4.5:1 이상
- 버튼 터치 영역 44px 이상
- 강조색은 1가지 계열만 사용
[결과물] 수정한 부분마다 어떤 원리를 적용했는지 한 줄씩 설명해 줘.
```

### 5.8 AI 디자인 진단 `/tools/diagnose` → 상세는 [8장](#8-ai-디자인-진단)

### 5.9 수업 활용 `/teach` · `/teach/:moduleId` → 상세는 [14장](#14-수업-활용-모듈-4종)

### 5.10 내 도감 `/my`
- 수집률 진도 링 + 챕터별 막대(텍스트 수치 병기)
- 즐겨찾기 목록, 최근 본 원리 5개, 퀴즈 기록(최근 10회)
- "기록 초기화"(확인 다이얼로그) · "기록 내보내기/가져오기"(JSON 파일 — 기기 이동용)

### 5.11 소개 `/about`
- 앱 사용법(3단계 그림 설명) · 출처 표기(2.1-5) · 개인정보 안내(10장 요약) · 만든 사람(선생님 이름·사이트 링크) · 라이선스 고지(Pretendard OFL 등)

---

## 6. 데이터 모델

> 모든 콘텐츠는 `src/data/*.json`. 화면 코드에 문장 하드코딩 금지(UI 라벨 제외).
> `npm run validate:data`(zod 스키마 검사)를 Phase 2부터 매 커밋 전에 실행.

### 6.1 `chapters.json`
```json
[
  { "id": "psychology", "no": 1, "nameKo": "디자인에 쓰는 심리 효과", "nameEn": "Design Psychology", "range": [1, 52], "colorToken": "--ch-psychology", "intro": "직접 작성 2문장" },
  { "id": "illusion",   "no": 2, "nameKo": "착시 효과", "nameEn": "Visual Illusions", "range": [53, 78], "colorToken": "--ch-illusion", "intro": "…" },
  { "id": "color",      "no": 3, "nameKo": "색채 효과", "nameEn": "Color Effects", "range": [79, 88], "colorToken": "--ch-color", "intro": "…" },
  { "id": "layout",     "no": 4, "nameKo": "레이아웃·UX 법칙", "nameEn": "Layout & UX Laws", "range": [89, 108], "colorToken": "--ch-layout", "intro": "…" }
]
```

### 6.2 `effects.json` (108개) — 필드 정의

| 필드 | 타입 | 필수 | 제약 |
|---|---|---|---|
| `id` | number | ✓ | 1–108, 고유 |
| `code` | string | ✓ | `"001"`–`"108"` |
| `slug` | string | ✓ | 영문 kebab-case (`eye-guiding-effect`) |
| `chapter` | enum | ✓ | psychology/illusion/color/layout |
| `nameKo` / `nameEn` | string | ✓ | 부록 B 표기 그대로 |
| `aliasesKo` | string[] | | 다른 이름(예: "후광 효과") |
| `oneLiner` | string | ✓ | **40자 이내**, "~한다/~보인다" 평서문 |
| `oneLinerEn` | string | ✓ | 15단어 이내 |
| `why` | string | ✓ | **160자 이내**, 2~3문장 |
| `analogy` | string | ✓ | **80자 이내**, 학생 일상 비유 1문장 |
| `apply.classroom` / `apply.webapp` / `apply.print` | string | ✓ | 각 **90자 이내** |
| `doList` / `dontList` | string[2] | ✓ | 각 항목 50자 이내 |
| `ethicsLevel` | enum | ✓ | safe / caution / risk |
| `ethicsNote` | string\|null | 조건 | caution·risk면 필수, 100자 이내 |
| `promptSnippet.ko` / `.en` | string | ✓ | AI에게 주는 구체적 지시 1문장 |
| `english.term` / `.example` / `.keyVocab` | string/string/string[3] | ✓ | 예문 20단어 이내, 고등학생 수준 어휘 |
| `purposeTags` | enum[] | ✓ | 1~3개: attention, emphasis, trust, choice, memory, readability, grouping, usability, motivation, emotion, perception |
| `mediaTags` | enum[] | ✓ | 1~5개: slide, worksheet, notice, poster, webapp, thumbnail, sns |
| `demoType` | enum | ✓ | 7장의 7종 중 1 (시드값: `02_source-index.json`) |
| `demoConfig` | object | ✓ | 데모별 설정 (7장) |
| `related` | number[] | ✓ | 2~4개, 존재하는 id |
| `caseIds` | number[] | | 사례 매핑(부록 B-2에서 자동 역산) |
| `level` | 1\|2\|3 | ✓ | 1 입문 · 2 응용 · 3 심화 |
| `factNote` | string\|null | | 실험·수치 언급 시 **원 연구자·연도**. 확인 불가하면 그 수치를 쓰지 말 것 |

> ⚠️ `sourceImage`(원본 사진 경로)는 `effects.json`에 넣지 않는다. 원본 매핑은 `docs/02_source-index.json`에만 존재.

**작성 예시 ① — 007 시선 유도 효과** (톤·길이 기준 샘플. 이 수준으로 108개 통일)
```json
{
  "id": 7, "code": "007", "slug": "eye-guiding-effect", "chapter": "psychology",
  "nameKo": "시선 유도 효과", "nameEn": "Eye-Guiding Effect", "aliasesKo": ["시선 단서 효과"],
  "oneLiner": "사진 속 인물이 보는 곳을 보는 사람도 따라 본다.",
  "oneLinerEn": "We look where the people in a picture are looking.",
  "why": "사람은 다른 사람이 무엇을 보는지 확인하려는 습관이 있어요. 그래서 인물의 눈과 얼굴 방향은 화면 위의 보이지 않는 화살표처럼 작동합니다.",
  "analogy": "친구 몇 명이 창밖을 보고 있으면 나도 모르게 창밖을 보게 되는 것과 같아요.",
  "apply": {
    "classroom": "슬라이드 속 인물 사진이 핵심 문장 쪽을 바라보도록 배치하세요.",
    "webapp": "첫 화면 인물 이미지의 시선이 '시작하기' 버튼을 향하게 하세요.",
    "print": "포스터 모델이 행사 날짜·장소를 바라보도록 사진 좌우를 맞추세요."
  },
  "doList": ["인물의 시선 끝에 가장 중요한 정보를 둔다", "시선 방향과 읽는 방향(왼쪽→오른쪽)을 맞춘다"],
  "dontList": ["인물이 화면 밖을 보게 두지 않는다", "정면 응시 사진과 옆을 보는 사진을 한 화면에 섞지 않는다"],
  "ethicsLevel": "safe", "ethicsNote": null,
  "promptSnippet": {
    "ko": "히어로 이미지 속 인물의 시선이 메인 버튼을 향하도록 배치하고, 시선 끝에 핵심 문구를 둬 줘.",
    "en": "Place the hero image so the person's gaze points to the main button, with the key headline at the end of that gaze."
  },
  "english": { "term": "gaze cueing", "example": "The model's gaze leads readers straight to the headline.", "keyVocab": ["gaze", "lead", "headline"] },
  "purposeTags": ["attention", "emphasis"],
  "mediaTags": ["slide", "poster", "webapp", "thumbnail"],
  "demoType": "gazeMap",
  "demoConfig": { "variant": "faceDirection", "states": ["toward", "away"], "labels": ["버튼을 바라볼 때", "밖을 바라볼 때"] },
  "related": [8, 9, 105],
  "caseIds": [2, 3],
  "level": 1,
  "factNote": null
}
```

**작성 예시 ② — 065 뮐러-리어 착시** (착시 챕터 기준 샘플)
```json
{
  "id": 65, "code": "065", "slug": "muller-lyer-illusion", "chapter": "illusion",
  "nameKo": "뮐러-리어 착시", "nameEn": "Müller-Lyer Illusion", "aliasesKo": [],
  "oneLiner": "길이가 같은 선도 끝 모양에 따라 길거나 짧아 보인다.",
  "oneLinerEn": "Equal lines look different lengths because of their arrow-shaped ends.",
  "why": "뇌는 선 끝의 꺾인 모양을 모서리나 거리 단서로 해석해요. 바깥으로 벌어진 끝은 더 멀리 뻗은 것처럼, 안으로 접힌 끝은 짧게 닫힌 것처럼 느끼게 됩니다.",
  "analogy": "같은 키의 친구도 팔을 벌리고 서 있으면 더 커 보이는 것과 비슷해요.",
  "apply": {
    "classroom": "도표에서 길이를 비교시킬 때는 막대 끝 장식을 모두 같은 모양으로 통일하세요.",
    "webapp": "진행 바나 구분선 끝에 화살표 장식을 넣으면 길이 인상이 달라지니 의도해서 쓰세요.",
    "print": "포스터 구분선 길이를 맞췄는데 달라 보이면 끝 장식부터 확인하세요."
  },
  "doList": ["비교할 요소의 끝 모양을 통일한다", "길이를 강조하고 싶을 때 바깥쪽 꺾임을 활용한다"],
  "dontList": ["정확한 수치 비교가 필요한 그래프에 장식 화살표를 섞지 않는다", "눈대중만 믿고 정렬하지 않는다(실제 수치로 확인)"],
  "ethicsLevel": "safe", "ethicsNote": null,
  "promptSnippet": {
    "ko": "막대·구분선 끝 장식을 모두 같은 모양으로 통일해서 길이가 정확히 비교되게 해 줘.",
    "en": "Use identical end caps on all bars and dividers so their lengths can be compared accurately."
  },
  "english": { "term": "Müller-Lyer illusion", "example": "Both lines are equal, but the arrowheads trick our eyes.", "keyVocab": ["equal", "arrowhead", "perceive"] },
  "purposeTags": ["perception", "readability"],
  "mediaTags": ["slide", "worksheet", "webapp"],
  "demoType": "illusion",
  "demoConfig": {
    "component": "MullerLyer",
    "controls": [
      { "type": "toggle", "key": "hideFins", "label": "끝 모양 숨기기" },
      { "type": "range", "key": "finAngle", "label": "끝 각도", "min": 20, "max": 160, "step": 5, "default": 45 }
    ],
    "reveal": "두 선의 길이는 똑같이 240px입니다. 눈금자로 확인해 보세요."
  },
  "related": [70, 71, 74],
  "caseIds": [],
  "level": 1,
  "factNote": "Franz Carl Müller-Lyer, 1889"
}
```

### 6.3 `cases.json` (11개)
```json
{
  "id": 2, "code": "CASE02",
  "titleSchool": "나눔 바자회 참여 포스터",
  "originType": "후원 요청 포스터",
  "keyMessage": "정보를 묶고 시선이 흐르는 길을 만들면 한눈에 읽힌다.",
  "layout": "portrait",
  "critical": false,
  "hotspots": [
    { "effectId": 7, "x": 52, "y": 18, "w": 30, "h": 14, "note": "아기 사진의 시선이 행사 제목을 향함" }
  ],
  "beforeNote": "같은 내용이지만 원리를 빼고 정보를 나열만 한 버전",
  "explain": "3~5문장, 직접 작성",
  "checklist": ["…", "…", "…"]
}
```
- 핫스팟 좌표 `x, y, w, h`는 **목업 캔버스 대비 % 단위**(반응형 유지).

### 6.4 그 밖의 데이터 파일
| 파일 | 내용 | 분량 |
|---|---|---|
| `purposes.json` | 목적 태그 11개: id, 라벨, 아이콘 이름, 설명 1줄 | 11 |
| `media.json` | 매체 태그 7개: id, 라벨, 아이콘, 매체별 기본 품질 팁 2개 | 7 |
| `quiz-scenarios.json` | 상황형 문항: 상황 설명 → 정답 원리 id + 오답 id 3개 + 해설 | 40 |
| `quiz-ethics.json` | 설득/조작 판정 문항 + 이유 + 관련 원리 | 20 |
| `checklist.json` | AI 진단 대체용 수동 체크리스트 (5영역 × 4문항) | 20 |
| `lessons.json` | 수업 모듈 4종 (14장) | 4 |

---

## 7. 체험(Demo) 엔진

> 108개를 108개의 별도 화면으로 만들지 않는다. **7가지 템플릿 컴포넌트 + 데이터(`demoConfig`)** 조합으로 만든다. (착시만 개별 SVG 컴포넌트)
> 모든 데모 공통: 첫 화면 높이 안에 들어옴(모바일 최대 360px 높이) · 조작은 버튼/토글/`input[type=range]`만 · "정답/원리 보기" 버튼으로 결론 공개 · `aria-live`로 결과 안내 · `prefers-reduced-motion` 대응.

| demoType | 대상(시드 기준) | 동작 | demoConfig 핵심 키 |
|---|---|---|---|
| `compareToggle` | 레이아웃 법칙 다수, 대칭·대비 등 | A안/B안 미니 목업을 토글로 비교 → "어느 쪽이 더 ○○해 보이나요?" 투표 → 원리 공개 | `variants[2]{label, mockId}`, `question`, `answerIndex` |
| `scenarioQuiz` | 사회심리·행동경제 원리 | 짧은 학교 상황 → 선택 → 원리로 해설 | `scenario`, `choices[]`, `insight` |
| `choiceLab` | 디코이·앵커링·골디락스·단수가격·디폴트·프레이밍 | 가상 "가격표/선택지"를 원리 有/無로 바꿔 보며 "내 선택" 기록 → 일반적 경향 설명 (**실제 통계처럼 꾸미지 말 것**) | `optionsA[]`, `optionsB[]`, `toggleLabel`, `insight` |
| `timingGame` | 034 스트루프 · 044 청크 · 051 힉 · 103 피츠 · 104 도허티 | 반응 시간 측정 미니게임 (예: 피츠 — 큰/작은·가까운/먼 버튼 누르기, 힉 — 선택지 2개 vs 8개) | `game`, `rounds`, `conditions[]` |
| `gazeMap` | 시선 유도·포인팅·화살표·터널·칵테일파티·구텐베르크·Z·F·N | 미니 레이아웃 위에 **예상 시선 경로 애니메이션**(번호 점 1→2→3) 재생 / 단계별 버튼 | `variant`, `path[]{x,y}`, `states[]` |
| `colorLab` | 078–088 | 색 견본 비교, 배경색 바꾸기, 명도 슬라이더, "어느 쪽이 더 무거워/가까워/따뜻해 보이나요?" | `swatches[]`, `background[]`, `question` |
| `illusion` | 053–077 | 개별 SVG 착시 + 조절 슬라이더 + **"정답 보기"(보조선·측정 눈금·배경 제거)** | `component`, `controls[]`, `reveal` |

### 7.1 착시 개별 컴포넌트 구현 노트 (`src/components/demos/illusions/`)

| id | 컴포넌트 | 구현 요점 | "정답 보기" |
|---|---|---|---|
| 053 | `Munker` | 같은 색 원 위에 서로 다른 색 줄무늬 덮기 | 줄무늬 제거 |
| 054 | `MunkerWhite` | 흑백 줄무늬 위 동일 회색 막대 | 배경 제거 |
| 055 | `ColorConstancy` | 색 필터를 씌운 장면 속 "빨갛게 보이는" 회색 패치 | 패치만 떼어 보기 |
| 056 | `IlluminantDress` | 사진 대신 **도형 드레스 실루엣** + 조명 색(따뜻/차가운) 토글 | 원래 RGB 값 표시 |
| 057 | `CheckerShadow` | 체커보드 + 원기둥 그림자, A·B 칸 동일 색 | A·B를 잇는 동일 색 막대 |
| 058 | `Ehrenstein` | 방사선 끝이 비는 중앙이 밝아 보임 | 선 제거 |
| 059 | `NeonSpread` | 십자 격자 중앙 색 선 | 격자 제거 |
| 060 | `Fraser` | 꼬인 줄 패턴의 동심원 | 한 원만 강조선 |
| 061 | `MachBand` | 계단형 명도 띠 | 각 띠의 실제 값 그래프 |
| 062 | `Zollner` | 평행선 + 빗금 | 빗금 숨기기 |
| 063 | `Kanizsa` | 팩맨 원 3개 | 원 회전으로 삼각형 해체 |
| 064 | `HermannGrid` | 검은 사각형 격자 | 칸 색 변경 슬라이더 |
| 065 | `MullerLyer` | 예시 ② 참조 | 눈금자 |
| 066 | `Fick` | 가로선·세로선 ⊥ | 가로로 회전 |
| 067 | `Bicolor` | 2색 분할 막대 가로/세로 | 단색으로 |
| 068 | `Delboeuf` | 원 + 바깥 테두리 원 크기 슬라이더 | 테두리 제거 |
| 069 | `Ebbinghaus` | 중앙 원 + 주변 원 크기 슬라이더 | 주변 원 제거 |
| 070 | `Ponzo` | 소실선 위 같은 길이 막대 | 소실선 제거 |
| 071 | `OppelKundt` | 눈금 채운 구간 vs 빈 구간 | 눈금 제거 |
| 072 | `HelmholtzSquare` | 가로줄/세로줄 정사각형 | 외곽선만 |
| 073 | `TopHeavy` | 숫자 8·S 상하 비율, 정사각형 상하 여백 | 중심선 표시 |
| 074 | `Jastrow` | 부채꼴 2개 위치 교체 버튼 | 겹쳐 보기 |
| 075 | `Crater` | 사진 대신 **위/아래 그라디언트 음영 원** + 180° 회전 버튼 | 광원 방향 표시 |
| 076 | `LeaningTower` | 사진 대신 **원근 그린 SVG 탑** 2개 나란히 | 두 그림이 동일함을 겹쳐 보기 |
| 077 | `ColorAssimilationGrid` | 흑백 SVG 장면(집·나무) + 색 격자선 오버레이 | 격자 제거 |

- **광과민성 안내**: 착시 챕터 첫 진입 시 1회 "일부 착시는 어지러움을 줄 수 있어요. 불편하면 바로 화면을 넘기세요" 안내.
- 정확성: 비교 대상의 **실제 수치(px, RGB)를 코드에서 동일 상수**로 사용하고 "정답 보기"에서 그 값을 텍스트로 노출.

### 7.2 데모 공통 셸 `DemoFrame`
- 제목 줄("30초 체험") · 데모 영역 · 컨트롤 영역 · [원리 보기] 버튼 · 결과 영역(`aria-live`)
- 데모 컴포넌트는 `React.lazy`로 지연 로딩 → 도감 첫 로드 용량 보호

---

## 8. AI 디자인 진단

### 8.1 사용자 흐름
1. 업로드(카메라 촬영 허용 `accept="image/*" capture="environment"`) 또는 파일 선택, 최대 10MB
2. 선택 입력: 매체(7) · 대상(학생/교사/학부모/일반) · 목적(최대 3)
3. 안내 문구 체크박스: "학생 얼굴·이름 등 개인정보가 보이지 않습니다" (체크해야 분석 버튼 활성)
4. [분석하기] → 진행 표시("화면을 읽는 중… 약 10~15초")
5. 결과:
   - 총평 2문장
   - 5개 영역 점수(1~5, 막대 + 숫자 텍스트): 시선 흐름 · 가독성 · 정보 위계 · 일관성 · 접근성
   - **잘한 점**(적용된 원리 칩)
   - **개선점 Top 3**(문제 → 해결 → 관련 원리 링크)
   - "고쳐 달라고 AI에게 시키기" 지시문(복사)
6. AI 미사용 대안: [수동 체크리스트로 진단] (20문항 자가 점검 → 같은 결과 레이아웃)

### 8.2 서버 함수 `api/diagnose.js` (Vercel Node 함수)
- 입력: `POST { imageBase64, mimeType, media, audience, purposes[], accessCode? }`
- 처리:
  1. `ACCESS_CODE` 환경변수가 설정돼 있으면 일치 확인(수업·연수 때 코드 공유, 남용 방지)
  2. 크기 검사(디코드 후 4MB 이하) — 클라이언트에서 미리 **긴 변 1600px, JPEG 품질 0.8로 압축**
  3. Gemini API 호출 (SDK: `@google/genai`, 모델명 `GEMINI_MODEL` 환경변수 — **구현 시점 Google AI 공식 문서에서 최신 안정 Flash 계열 모델명을 확인해 기본값 설정**)
  4. 구조화 출력(JSON 스키마 강제) → 서버에서 다시 검증(`effectId`가 1~108 밖이면 제거)
  5. 이미지·결과 **저장·로그 금지**
- 오류 응답: `{ error: { code, messageKo } }` — 코드: `INVALID_CODE` · `TOO_LARGE` · `AI_TIMEOUT` · `AI_ERROR` · `RATE_LIMITED`
- 개발 편의: `DIAGNOSE_MOCK=true`면 고정 샘플 JSON 반환 → **키 없이도 UI 개발 가능**
- 환경변수(`.env.example`에 이름만): `GEMINI_API_KEY`, `GEMINI_MODEL`, `ACCESS_CODE`, `DIAGNOSE_MOCK`

### 8.3 시스템 프롬프트 (서버 상수 `DIAGNOSE_SYSTEM_PROMPT`)
```
너는 학교 교육자료와 교육용 웹앱을 검토하는 친절한 UI/UX 디자인 코치다.
- 사용자가 올린 화면을 보고, 아래 108개 디자인 원리 목록의 번호만 사용해 근거를 제시한다.
- 칭찬 1개 이상, 개선점은 정확히 3개. 개선점은 "무엇이 문제인지 → 어떻게 고칠지"를 초보자도 바로 따라 할 수 있게 쓴다.
- 화면에 없는 요소를 추측해 지어내지 않는다. 확신이 낮으면 confidence를 low로 표시한다.
- 사람의 외모·신원에 대해 언급하지 않는다. 화면 속 개인정보를 읽어 출력하지 않는다.
- 다크 패턴(조작적 설계)을 개선안으로 제안하지 않는다.
- 모든 문장은 한국어 해요체, 문장당 60자 이내.
[원리 목록]
{id}. {nameKo} ({nameEn}) — {oneLiner}   ← effects.json에서 108줄 자동 삽입
```

### 8.4 응답 JSON 스키마
```json
{
  "summary": "string (2문장)",
  "scores": { "gazeFlow": 1, "readability": 1, "hierarchy": 1, "consistency": 1, "accessibility": 1 },
  "strengths": [ { "effectId": 89, "where": "string", "comment": "string" } ],
  "improvements": [
    { "priority": 1, "problem": "string", "fix": "string", "effectIds": [10, 92], "confidence": "high|medium|low" }
  ],
  "fixPrompt": "string (AI 코딩/디자인 도구에 붙여넣을 수정 지시문)"
}
```

---

## 9. 비주얼 디자인 방향

### 9.1 콘셉트: "따뜻한 종이 위의 디자인 실험실"
- 바탕은 따뜻한 오프화이트 종이색, 글자는 잉크 블랙 → 교과서처럼 편안하게 오래 읽힘
- 챕터마다 고유 색(번호 원형 배지·칩·상단 띠에만 사용) → 위치 감각("지금 착시 챕터구나")
- 데모 영역은 흰 카드 + 얇은 선 → "실험대" 느낌
- 장식 최소화: 아이콘은 한 세트만(**Lucide** 아이콘, 선 굵기 1.75 통일)

### 9.2 챕터 색 토큰 (대비 계산 완료 — `01_WEBAPP_STANDARDS.md` 3장과 함께 사용)

| 토큰 | 라이트(텍스트·배지용) | 다크 | 의미 |
|---|---|---|---|
| `--ch-psychology` | `#B3304A` (배경 대비 5.8:1) | `#F27A8D` | 심리 — 로즈 |
| `--ch-illusion` | `#1D6AA8` (5.4:1) | `#6CB4F0` | 착시 — 스카이 블루 |
| `--ch-color` | `#12735F` (5.4:1) | `#4CC9AA` | 색채 — 틸 그린 |
| `--ch-layout` | `#835F10` (5.5:1) | `#E2B85A` | 레이아웃 — 머스터드 |
| `--ch-cases` | `#6B3D93` (7.3:1) | `#C49BE6` | 사례 — 플럼 |

- 라이트 모드 배지: 챕터색 배경 + 흰 글자(모두 5.7:1 이상) / 다크 모드 배지: 챕터색 배경 + `#14161A` 글자
- 각 챕터 색의 연한 배경 틴트(`color-mix(in srgb, var(--ch-…) 10%, var(--color-surface))`)는 섹션 배경에만

### 9.3 시그니처 요소
1. **번호 원형 배지**(지름 40px, `tabular-nums`, 굵게) — 모든 카드·상세·핫스팟에서 동일
2. **진도 링**(홈·내 도감) — 수치 텍스트 병기
3. **X-ray 배지**(점선 테두리 + 번호) — 앱이 스스로 원리를 설명

---

## 10. 기술 스택과 폴더 구조

### 10.1 스택 (선택 이유)

| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | **React + Vite** (JavaScript, TS 미사용) | 선생님 주력 스택, 빠른 개발 서버 |
| 스타일 | **Tailwind CSS v4** (CSS 변수 `@theme` 토큰) | 표준 문서의 토큰을 그대로 유틸리티로 사용 |
| 라우팅 | **React Router** | 표준적, URL 쿼리로 필터 보존 |
| 검색 | **Fuse.js** + 자체 초성 함수 `getChoseong()` | 가벼운 퍼지 검색 + 한국어 초성 |
| 데이터 검증 | **zod** (`scripts/validateData.js`) | 108개 콘텐츠 누락·오타 자동 검출 |
| 아이콘 | **lucide-react** | 일관된 선 아이콘 |
| PWA | **vite-plugin-pwa** | 설치·오프라인(도감·체험은 오프라인 동작) |
| AI | **@google/genai** (서버 함수 안에서만) | Gemini 생태계, 키 보호 |
| 배포 | **Vercel** (+ GitHub 연동) | 서버 함수 `api/` 지원 |

- 버전: 설치 시점 최신 **안정** 버전을 쓰고 `package.json`에 정확히 고정. 설치한 버전 목록을 `docs/DECISIONS.md`에 기록.
- 이 외 라이브러리 추가 금지(애니메이션 라이브러리·상태관리 라이브러리·UI 키트 금지 → 상태는 React Context + 훅으로 충분).

### 10.2 폴더 구조
```
design-psych-108/
├─ api/
│  └─ diagnose.js                 # Vercel 서버 함수 (Gemini 호출)
├─ docs/
│  ├─ 00_ANTIGRAVITY_PLAN.md
│  ├─ 01_WEBAPP_STANDARDS.md
│  ├─ 02_source-index.json        # 원본 매핑 (앱 번들에 import 금지)
│  ├─ DECISIONS.md
│  ├─ progress/PHASE_N_REPORT.md  # Antigravity 작성
│  └─ reviews/PHASE_N_REVIEW.md   # Claude 작성
├─ public/
│  ├─ icons/ (PWA 아이콘)
│  └─ og-image.png
├─ scripts/
│  └─ validateData.js
├─ src/
│  ├─ main.jsx · App.jsx · routes.jsx
│  ├─ styles/
│  │  ├─ tokens.css               # 표준 3·4장 + 챕터 색
│  │  └─ base.css
│  ├─ data/                       # 6장의 JSON 전부
│  ├─ lib/                        # 순수 함수 (UI 없음)
│  │  ├─ searchEffects.js · getChoseong.js · filterEffects.js
│  │  ├─ recommendEffects.js      # 매체×목적 → 추천
│  │  ├─ buildPrompt.js · buildChecklistMarkdown.js
│  │  ├─ generateQuiz.js
│  │  ├─ compressImage.js
│  │  └─ storage.js               # localStorage try/catch 래퍼
│  ├─ hooks/  (useProgress, useFavorites, useXray, useMediaQuery, useTheme)
│  ├─ context/ (XrayContext, ThemeContext)
│  ├─ components/
│  │  ├─ ui/       # 표준 5.1 공통 컴포넌트
│  │  ├─ layout/   # AppShell, TopBar, BottomNav, SideNav, SkipLink
│  │  ├─ effect/   # EffectCard, EffectHeader, WhySection, ApplyTabs, DoDont, EthicsBox, PromptBox, EnglishCorner, RelatedList
│  │  ├─ demos/    # DemoFrame + 6개 템플릿 + illusions/*
│  │  ├─ cases/    # CaseCanvas, Hotspot, mockups/Case01…Case11
│  │  ├─ xray/     # Principle, XrayBadge
│  │  └─ present/  # PresentDeck
│  └─ pages/  (Home, Library, EffectDetail, EffectPresent, Cases, CaseStudio, Practice, PracticeRun, Tools, Builder, Diagnose, Teach, TeachModule, My, About, NotFound)
├─ .env.example
├─ vercel.json
└─ package.json
```

### 10.3 npm 스크립트
`dev` · `build` · `preview` · `lint` · `validate:data` · `check`(= lint + validate:data + build)

---

## 11. 단계별 실행 계획 (Phase 0–7)

> 각 Phase = **목표 → 단계(Step) → 산출물 → 완료 기준(체크박스) → 검수 게이트**.
> 완료 기준을 **모두** 만족해야 보고서를 쓰고 멈춘다.

### 한눈에 보기

| Phase | 이름 | 핵심 산출물 | 규모 |
|---|---|---|---|
| 0 | 준비 | 프로젝트 생성, 문서 이동, Git | S |
| 1 | 디자인 시스템 + 앱 셸 | 토큰, 공통 컴포넌트, 레이아웃, 라우트, X-ray 뼈대, `/dev/ui` 견본 페이지 | M |
| 2 | 콘텐츠 구축 | `effects.json` 108 · `cases.json` 11 · 부가 데이터 (5개 배치) | **L** |
| 3 | 도감 + 상세 | 홈, 도감(검색·필터), 상세 10섹션, 내 도감 | M |
| 4 | 체험 엔진 | 데모 템플릿 6종 + 착시 25종 + 컬러랩 | **L** |
| 5 | 사례·연습·빌더·수업 | 사례 스튜디오 11, 퀴즈 4종, 프롬프트 빌더, 수업 모듈 4, 발표 모드 | L |
| 6 | AI 진단 | 서버 함수, 업로드·압축, 결과 화면, 수동 체크리스트 | M |
| 7 | 품질·PWA·배포 | 접근성·성능 감사, PWA, Vercel 배포, 사용 설명 | M |

---

### Phase 0 — 준비

**목표**: 아무 기능 없이도 "빈 앱이 뜨고, 규칙이 등록된" 상태.

| Step | 할 일 |
|---|---|
| 0-1 | Workspace(`디자인 심리 108/`) 확인. 원본 사진 127장이 있는지 개수만 확인(**수정·이동 금지**) |
| 0-2 | `design-psych-108/` 생성 → Vite React(JavaScript) 템플릿으로 초기화 |
| 0-3 | 루트의 `00_`·`01_`·`02_` 파일 3개를 `design-psych-108/docs/`로 **이동** |
| 0-4 | `02_source-index.json`의 `sourceFolder`가 `../../`(docs 기준 원본 위치)로 맞는지 확인·수정 |
| 0-5 | 10.1장 의존성 설치, 버전 고정, `DECISIONS.md` 생성(설치 버전 기록) |
| 0-6 | Tailwind v4 설정, `tokens.css`·`base.css` 빈 틀, Pretendard 연결 |
| 0-7 | ESLint 설정(React 권장 규칙), Prettier(2칸) |
| 0-8 | `.gitignore`(node_modules, dist, .env*, .vercel), `.env.example`, `vercel.json`(SPA rewrites) |
| 0-9 | `git init` → 첫 커밋 → 태그 `phase-0` |
| 0-10 | (선택) Antigravity의 워크스페이스 규칙(Rules) 기능에 "`docs/01_WEBAPP_STANDARDS.md`와 `docs/00_ANTIGRAVITY_PLAN.md` 2장 Hard Rules 준수" 등록 — 메뉴 위치는 Antigravity 버전에 따라 다르므로 Customizations/Rules 메뉴에서 확인 |

**완료 기준**
- [ ] `npm run dev`로 빈 화면 표시, `npm run build` 성공
- [ ] 원본 사진 127장 그대로(개수·이름 변경 없음)
- [ ] `docs/` 안에 문서 3개 존재
- [ ] `package.json`에 `^` 없음

---

### Phase 1 — 디자인 시스템 + 앱 셸

**목표**: 어떤 화면이든 "조립만 하면 되는" 부품과 뼈대 완성. (다른 프로젝트에 재사용할 부품)

| Step | 할 일 |
|---|---|
| 1-1 | `tokens.css`: 표준 3·4장 + 9.2 챕터 색 + 라이트/다크(`prefers-color-scheme` + `[data-theme]`) |
| 1-2 | `base.css`: 글꼴, `word-break: keep-all`, 포커스 링, `prefers-reduced-motion`, 스크롤 동작 |
| 1-3 | `components/ui/` 공통 컴포넌트 12종(표준 5.1) — **상태 6종** 모두 구현 |
| 1-4 | `layout/`: AppShell(모바일 하단탭 ↔ 데스크톱 사이드바 자동 전환), TopBar, SkipLink |
| 1-5 | `routes.jsx`: 4.1장 전 라우트를 "준비 중" 플레이스홀더 페이지로 연결 + 404 |
| 1-6 | ThemeContext(라이트/다크/시스템, `localStorage` 기억) |
| 1-7 | XrayContext + `<Principle ids>` + `XrayBadge` (아직 원리 데이터 없으면 번호만 표시) |
| 1-8 | `storage.js`(try/catch), `useMediaQuery` |
| 1-9 | **`/dev/ui` 견본 페이지**: 모든 컴포넌트 × 모든 상태 × 라이트/다크를 한 화면에 (배포 빌드에서는 라우트 제외) |

**완료 기준**
- [ ] 360 / 768 / 1280px에서 셸 레이아웃 정상, 가로 스크롤 없음
- [ ] 키보드만으로 하단탭·사이드바·다이얼로그 조작 가능(포커스 가두기, Esc)
- [ ] `/dev/ui`에서 모든 컴포넌트 상태 확인 가능
- [ ] 컴포넌트 안 `#hex` 하드코딩 0건
- [ ] X-ray 토글 시 셸 요소(탭바·상단바)에 배지 3개 이상 표시

**검수 게이트**: Claude가 `/dev/ui` 3폭 스크린샷 + 대비 + 키보드 순회 확인.

---

### Phase 2 — 콘텐츠 구축 (5개 배치)

**목표**: 앱의 심장인 데이터 완성. **배치마다 멈추고 검수**(특히 2a는 톤 보정용).

| 배치 | 범위 | 원본 사진 확인 방법 | 검수 |
|---|---|---|---|
| **2a** | 001–013 (13개) — **톤 보정 배치** | `02_source-index.json`의 `sourceImage`로 해당 사진을 열어 원리 파악 | Claude 검수 후 2b 진행 |
| 2b | 014–052 (39개) | 동일 | Claude 검수 |
| 2c | 053–078 착시 (26개) + `demoConfig` 상세 | 동일 | Claude 검수 |
| 2d | 079–108 색채·레이아웃 (30개) | 동일 | Claude 검수 |
| 2e | `chapters` · `cases`(11, 학교판 리메이크 기획 포함) · `purposes` · `media` · `quiz-scenarios`(40) · `quiz-ethics`(20) · `checklist`(20) · `lessons`(4) | 사례 사진 18장 | Claude 검수 |

**각 원리 작성 절차 (반드시 이 순서)**
1. 원본 사진을 보고 **핵심 개념만** 파악한다 (메모는 키워드 수준).
2. 사진을 닫고, 일반 지식 + 이해한 내용으로 **자기 문장**을 쓴다 (13장 가이드).
3. 예시는 반드시 **학교 맥락으로 새로 창작**한다 (책의 제품·브랜드·수치 사용 금지).
4. 실험·수치를 언급하면 `factNote`에 원 연구자·연도. 확인할 수 없으면 수치를 빼고 일반 서술.
5. `validate:data` 실행 → 통과해야 다음 원리.

**사례(2e) 기획 산출물**: `docs/CASE_REMAKE_SPEC.md` — 사례별 ① 학교판 제목 ② 목업 구성 요소 목록(위→아래) ③ 핫스팟 원리·위치·설명 ④ Before 버전에서 뺄 요소 ⑤ 사용할 가상 텍스트(실존 기관·인물·상표 금지).

**완료 기준**
- [ ] `effects.json` 108개, `validate:data` 오류 0
- [ ] 모든 `related` id 유효, 모든 원리가 최소 1번 이상 다른 원리의 `related`에 등장(고립 원리 0)
- [ ] 글자 수 제약(6.2) 100% 준수 — 스크립트로 검사
- [ ] `ethicsLevel` caution/risk 원리 전부 `ethicsNote` 보유
- [ ] 책 문장·예시 미복제 자기 점검표(`docs/progress/PHASE_2x_REPORT.md`에 "원리별 예시 소재" 한 줄 목록 첨부 → Claude가 원본과 대조)

---

### Phase 3 — 도감 + 상세

**목표**: 시나리오 S1을 끝까지 수행 가능.

| Step | 할 일 |
|---|---|
| 3-1 | `lib/`: `getChoseong`, `searchEffects`(Fuse: nameKo·nameEn·aliasesKo·oneLiner 가중치), `filterEffects`, `recommendEffects` + 단위 확인용 간단 테스트(Vitest 1파일) |
| 3-2 | 홈(5.1) — 데모 영역은 Phase 4 전까지 플레이스홀더 |
| 3-3 | 도감(5.2) — 필터 상태 URL 동기화, 결과 0개 EmptyState |
| 3-4 | 상세(5.3) 10섹션 컴포넌트, 이전/다음, 복사 토스트 |
| 3-5 | 전역 검색 오버레이(초성 포함, 최근 검색 5개) |
| 3-6 | `useProgress`·`useFavorites` + 내 도감(5.10) |
| 3-7 | 각 화면에 X-ray `<Principle>` 3개 이상 배치 |
| 3-8 | 문서 `<title>`·`description`을 라우트별로 설정(예: "007 시선 유도 효과 · DesignMind 108") |

**완료 기준**
- [ ] S1 시나리오 3탭 안에 수행
- [ ] `ㅅㅅㅇㄷ` → 시선 유도 효과, `contrast` → 대비 관련 결과
- [ ] 상세 108페이지 모두 렌더 오류 0 (스크립트로 전 페이지 순회 확인)
- [ ] 필터 → 상세 → 뒤로가기 시 필터·스크롤 복원

---

### Phase 4 — 체험 엔진

**목표**: 108개 전부 "30초 체험" 작동.

| Step | 할 일 |
|---|---|
| 4-1 | `DemoFrame` 공통 셸 + 지연 로딩 레지스트리(`demoType` → 컴포넌트) |
| 4-2 | `compareToggle` + 미니 목업 라이브러리(`mockId`로 호출: 슬라이드·학습지·포스터·앱 화면 축소판) |
| 4-3 | `scenarioQuiz` · `choiceLab` |
| 4-4 | `timingGame` 5종(스트루프·청크·힉·피츠·도허티) — 결과를 "내 기록 vs 조건별 비교"로 표시 |
| 4-5 | `gazeMap` — 경로 애니메이션(모션 줄이기 시 번호만 순서대로 표시) |
| 4-6 | `colorLab` |
| 4-7 | 착시 25종 SVG(7.1 표) — 각 "정답 보기" 필수 |
| 4-8 | 착시 챕터 광과민성 1회 안내 |

**완료 기준**
- [ ] 108개 상세 페이지 모두 데모 표시(플레이스홀더 0)
- [ ] 모든 데모 키보드 조작 가능, 결과 `aria-live` 안내
- [ ] 착시 "정답 보기"가 실제 동일 값(px/RGB)을 텍스트로 표시
- [ ] 360px에서 데모가 가로로 넘치지 않음
- [ ] 첫 로드 JS ≤ 200KB(gzip) 유지 — 빌드 리포트 첨부

---

### Phase 5 — 사례·연습·빌더·수업·발표 모드

| Step | 할 일 |
|---|---|
| 5-1 | 사례 목록 + `CaseCanvas`·`Hotspot` + 목업 11종(`CASE_REMAKE_SPEC.md`대로) + 모드 3종(원리 보기/숨은 원리 찾기/Before·After) |
| 5-2 | 연습 4모드 + `generateQuiz`(오답 선택 규칙 5.6) + 결과 화면 + 기록 |
| 5-3 | 프롬프트 빌더 4단계 + 3종 출력(지시문 복사, `DESIGN_CHECKLIST.md` 다운로드, 인쇄 활동지) |
| 5-4 | 수업 활용 허브 + 모듈 4종 상세 + 인쇄 CSS(`@media print`: A4, 흑백, 버튼 숨김) |
| 5-5 | 발표 모드(원리·사례 공통 `PresentDeck`) |

**완료 기준**
- [ ] S2·S3·S5 시나리오 수행
- [ ] 다운로드한 `DESIGN_CHECKLIST.md`가 마크다운 문법상 올바름
- [ ] 인쇄 미리보기에서 활동지 1~2쪽, 잘림 없음
- [ ] 발표 모드 키보드(←/→/Esc/F) 동작

---

### Phase 6 — AI 진단

| Step | 할 일 |
|---|---|
| 6-1 | `compressImage`(긴 변 1600px, JPEG 0.8, EXIF 제거) |
| 6-2 | `api/diagnose.js` — 8.2 전 항목, **먼저 `DIAGNOSE_MOCK=true`로 UI 완성** |
| 6-3 | 진단 화면(8.1) — 업로드 → 옵션 → 개인정보 확인 → 진행 → 결과 |
| 6-4 | 결과의 `effectId` → 원리 칩 링크, `fixPrompt` 복사 |
| 6-5 | 수동 체크리스트 대안 모드 |
| 6-6 | 실제 키로 연결 테스트(선생님이 Vercel/로컬 `.env`에 키 입력) — 샘플 3종(슬라이드·학습지·웹앱 화면, **개인정보 없는 이미지**) |

**완료 기준**
- [ ] 키 없이 mock으로 전체 흐름 작동
- [ ] 빌드 결과물(`dist/`)에서 `GEMINI_API_KEY` 문자열·키 값 검색 0건
- [ ] 오류 5종 각각 친절한 한국어 메시지 표시
- [ ] 실제 호출 15초 이내(샘플 3종 평균), 범위 밖 effectId 필터링 확인

---

### Phase 7 — 품질·PWA·배포

| Step | 할 일 |
|---|---|
| 7-1 | 접근성 감사: Lighthouse + 브라우저 axe 확장(가능 시) + 키보드 전 화면 순회 → 결함 수정 |
| 7-2 | 성능: 번들 분석, 이미지 최적화, 폰트 `font-display: swap` |
| 7-3 | PWA: 매니페스트, 아이콘(192/512/maskable), 오프라인 캐시(도감·상세·체험·연습; 진단은 온라인 안내) |
| 7-4 | 메타: OG 이미지(직접 디자인, 책 이미지 금지), 파비콘, `robots.txt` |
| 7-5 | `/about` 완성(출처·개인정보·사용법) |
| 7-6 | GitHub 저장소 → Vercel 연결 → 환경변수 등록 → 배포 (선생님 계정 로그인이 필요한 단계는 **멈추고 선생님에게 안내**) |
| 7-7 | `docs/USER_GUIDE.md`(선생님·학생용 1쪽 사용법), `README.md`(설치·실행·배포 방법, 초보자용) |
| 7-8 | 수용 테스트: S1~S5 시나리오 + 실기기(안드로이드·아이폰) |

**완료 기준**
- [ ] 표준 8장 성능 예산 전부 충족(모바일 Lighthouse 리포트 첨부)
- [ ] S1~S5 통과 기록
- [ ] 배포 URL에서 새로고침 404 없음, PWA 설치 가능
- [ ] 원본 사진이 배포 결과물에 0장 (빌드 산출물 검색으로 확인)

---

## 12. 검수 프로토콜 (Antigravity ↔ Claude)

### 12.1 Antigravity 보고서 양식 — `docs/progress/PHASE_N_REPORT.md`
```markdown
# Phase N 보고서
## 1. 완료 기준 체크
- [x] 항목 … (근거: 파일/스크린샷 경로)
## 2. 변경 파일 목록
## 3. 실행 결과
- npm run check: 통과/실패 (출력 요약)
## 4. 스크린샷
- docs/progress/img/phaseN-360.png / -768.png / -1280.png
## 5. 계획과 달라진 점 (이유)
## 6. 제안(구현하지 않음)
## 7. 알려진 문제
```

### 12.2 Claude 검수 방법
1. 보고서 읽기 → 완료 기준 근거 확인
2. 코드 정적 검토(표준 9장, Hard Rules, 하드코딩 색, 불필요 파일)
3. 빌드·검증 직접 실행(`npm run check`)
4. 헤드리스 브라우저로 360/768/1280px 스크린샷 + 대비·키보드 점검
5. 콘텐츠: 원본 사진과 대조해 **사실 오류·문장 복제·예시 복제** 확인, 톤·길이 일관성
6. `docs/reviews/PHASE_N_REVIEW.md` 작성 — 표준 12장 P0/P1/P2 분류, 각 항목에 파일·위치·수정 방법

### 12.3 Phase 통과 조건
- P0 = 0, P1 = 0 → 다음 Phase 진행 / P2는 백로그(`docs/BACKLOG.md`)로 이월 가능

---

## 13. 콘텐츠 작성 가이드

### 13.1 톤
- **해요체**, 고등학생이 혼자 읽고 이해할 수준. 전문용어는 처음 나올 때 괄호로 풀이.
- 한 문장 50자 이내, 수동태·번역투("~에 대해", "~를 통해", "~되어진다") 지양.
- 단정적 과장 금지("무조건", "반드시 매출이 오른다"). 심리 효과는 **경향**이지 법칙이 아님 → "~하기 쉬워요", "~하는 경향이 있어요".

### 13.2 예시 소재 풀 (학교 맥락 — 여기서 골라 창작)
수업 슬라이드 · 학습지 · 수행평가 안내문 · 가정통신문 · 학급 게시판 · 동아리 모집 포스터 · 축제/체육대회 홍보물 · 급식 메뉴판 · 도서관 추천 코너 · 학교 홈페이지 · 학습 웹앱(단어장·퀴즈) · 수업 영상 썸네일 · 진로 박람회 부스 · 학교 매점 · 교사 연수 안내 · 학생회 선거 포스터(※ 특정 정치 성향 표현 금지)

### 13.3 윤리 등급 기준
| 등급 | 기준 | 예 |
|---|---|---|
| `safe` | 이해·사용성을 돕는 원리 | 근접·정렬·대비·착시 대부분 |
| `caution` | 설득에 쓰이며 과하면 오해를 만들 수 있음 → "투명하게 쓰기" 안내 | 앵커링, 밴드왜건, 헤일로, 프라이밍 |
| `risk` | 다크 패턴으로 자주 악용 → "소비자로서 알아차리기" 안내 | 매몰 비용, 마감(가짜 타이머), 디폴트(몰래 체크), 텐션 리덕션, 디코이 |

> `02_source-index.json`의 `ethicsLevel`은 **초안**입니다. 작성하며 조정하되 변경 사유를 보고서에 적으세요.

### 13.4 금지 표현·소재
- 실존 브랜드·상표·기업명·연예인·실존 인물 사진 / 특정 정당·종교 / 외모 비하 / 학생 실명
- 의료·효능 과장(화장품·건강식품 효능 주장 예시 금지)

### 13.5 영어(English Corner)
- 고등학교 2학년 수준 어휘, 예문은 디자인 상황을 묘사하는 문장(20단어 이내)
- `keyVocab` 3개는 수업에서 바로 쓸 수 있는 범용 어휘 우선(예: contrast, emphasize, align)

---

## 14. 수업 활용 모듈 4종

> `lessons.json` + `/teach/:moduleId`. 각 모듈: 개요 · 대상 · 시간 · 준비물 · 차시 흐름(도입/전개/정리, 분 단위) · 활동지(인쇄) · **루브릭(명시적 판정 로직)**.
> 성취기준 코드는 **임의로 만들지 말고** `"standards": []`로 비워 둔다(이후 Claude가 공식 데이터로 검증해 채움).

| ID | 모듈 | 대상·시간 | 핵심 활동 | 연결 화면 |
|---|---|---|---|---|
| `M1-english-poster` | **Design a Poster That Speaks** | 고등 영어(진로영어 등)·2차시 | 진로 박람회/학교 행사 **영어 포스터** 제작 → 원리 3개(레이아웃·색채·심리 각 1개) 적용 → 영어 3문장으로 디자인 의도 발표 ("I used the Law of Proximity to group…") → 동료 피드백 | 도감, 빌더(학생 활동지), English Corner |
| `M2-persuade-or-manipulate` | **설득일까, 조작일까?** | 고등 전 학년·1~2차시 | CASE 09·10 분석 → 연습 `ethics` 모드 → 모둠별 "소비자 행동 수칙 3가지" 제작 | 사례, 연습 |
| `M3-webapp-upgrade` | **바이브코딩 웹앱 고도화 — 디자인 원리 10선** | 교사 연수·90분 | 참가자 웹앱 캡처 → AI 진단 → 원리 3개 선택 → 빌더 지시문으로 재생성 → Before/After 공유 | 진단, 빌더, X-ray |
| `M4-material-redesign` | **내 수업자료 15분 리디자인** | 교사 개인·15분 | 슬라이드/학습지/가정통신문 1장을 수동 체크리스트로 점검 → 3곳 수정 | 진단(수동), 매체 칩 |

**루브릭 예시 (M1) — 명시적 판정 로직**
| 기준 | 상 | 중 | 하 |
|---|---|---|---|
| 원리 적용 | 서로 다른 챕터 원리 **3개 이상** 적용 **AND** 각 적용 위치를 정확히 지목 | 원리 2개 적용 **OR** 3개 적용했으나 위치 설명 1개 이상 부정확 | 원리 1개 이하 적용 |
| 영어 설명 | 3문장 모두 원리명 + 목적(to-부정사/so that) 포함, 의미 전달 오류 0 | 2문장 조건 충족 | 1문장 이하 충족 |
| 가독성 | 체크리스트 가독성 4문항 중 4개 충족 | 2~3개 충족 | 1개 이하 |

---

## 15. 리스크와 대응

| 리스크 | 가능성 | 영향 | 대응 |
|---|---|---|---|
| 책 내용·이미지 복제(저작권) | 중 | **치명** | Hard Rules 2.1, 배치별 Claude 대조 검수, 빌드 산출물 이미지 검사 |
| 108개 콘텐츠 품질 편차 | 높음 | 높음 | 2a 톤 보정 배치 + 예시 JSON 2개 + 글자 수 스크립트 |
| 착시 SVG가 착시를 못 일으킴 | 중 | 중 | 파라미터 슬라이더 제공, Claude 시각 확인, 실패 시 `compareToggle`로 대체 허용 |
| Gemini 모델명·SDK 변경 | 중 | 중 | 모델명 환경변수, mock 모드, SDK 공식 문서 확인 후 구현 |
| AI 비용·남용 | 낮음 | 중 | `ACCESS_CODE`, 크기 제한, 클라이언트 10초 재요청 제한 |
| Antigravity 범위 확장·임의 진행 | 중 | 중 | Hard Rules 9·10, Phase별 프롬프트에 "끝나면 멈춤" 명시 |
| 한글·공백 포함 경로 도구 오류 | 낮음 | 중 | 앱은 영문 경로(`design-psych-108`), 문제 시 보고 후 선생님 승인 받아 이동 |
| 아이폰 Safari 차이 | 중 | 중 | `100dvh`, safe-area, 실기기 테스트(Phase 7) |
| localStorage 차단 환경(시크릿 모드) | 중 | 낮음 | `storage.js` try/catch, 기록 없이도 전 기능 동작 |

---

## 부록 A. Antigravity 프롬프트 모음

> 선생님은 아래 블록을 **그대로 복사**해 Antigravity 에이전트 입력창에 붙여넣으면 됩니다.
> 권장 설정: 에이전트 모드는 **Planning(계획 후 실행)**. 모델은 사용 가능한 최고 성능 모델.

### A-0. 최초 1회 (Phase 0 시작)
```
너는 이 프로젝트의 실행 담당 개발자야. 계획·검수는 Claude가, 최종 승인은 내가 한다.

1) 먼저 아래 3개 파일을 처음부터 끝까지 읽어:
   - 00_ANTIGRAVITY_PLAN.md (실행 계획서)
   - 01_WEBAPP_STANDARDS.md (공통 표준)
   - 02_source-index.json (원본 사진 매핑)
2) 읽은 뒤, 계획서 "2. 절대 규칙"을 너의 말로 5줄 요약해서 보여 줘.
3) 그다음 "Phase 0 — 준비"의 구현 계획(Implementation Plan)을 작성해 보여 주고, 내가 승인하면 실행해.
4) Phase 0 완료 기준을 모두 만족하면 docs/progress/PHASE_0_REPORT.md를 계획서 12.1 양식으로 쓰고 멈춰.
   절대 Phase 1로 넘어가지 마.

주의: 이 폴더의 jpg 사진 127장은 책 촬영 원본이야. 읽기만 하고 수정·이동·복사·배포하지 마.
```

### A-1 ~ A-7. 각 Phase 시작 (N과 이름만 바꿔 사용)
```
docs/00_ANTIGRAVITY_PLAN.md의 "Phase {N} — {이름}"을 시작해.
- 시작 전에 docs/reviews/에 이전 Phase 검수 보고서가 있으면 읽고, 남은 P0·P1이 없는지 확인해.
- 해당 Phase의 Step 표를 순서대로 진행하고, Step마다 git 커밋해.
- 01_WEBAPP_STANDARDS.md를 모든 화면에 적용해.
- 계획서에 없는 기능·파일·라이브러리를 추가하지 마. 필요해 보이면 보고서 "제안"에만 적어.
- 완료 기준을 모두 만족하면 360/768/1280px 스크린샷을 docs/progress/img/에 저장하고,
  docs/progress/PHASE_{N}_REPORT.md를 작성한 뒤 git tag phase-{N} 하고 멈춰.
```

### A-2a. 콘텐츠 배치 전용 (Phase 2의 각 배치)
```
Phase 2의 배치 {2a/2b/2c/2d/2e} ({범위})를 진행해.
- 계획서 6.2 필드 정의, 작성 예시 ①②, 13장 콘텐츠 가이드를 기준으로 삼아.
- 원리마다: 02_source-index.json의 sourceImage 사진을 열어 개념만 파악 → 사진을 닫고 너의 말로 작성 →
  예시는 학교 맥락으로 새로 창작 → npm run validate:data 통과.
- 책의 문장·제품·브랜드·수치 예시를 쓰지 마. 확인할 수 없는 통계는 넣지 마.
- 배치가 끝나면 보고서에 "원리별 예시 소재 한 줄 목록"을 첨부하고 멈춰.
```

### A-R. 검수 반영
```
docs/reviews/PHASE_{N}_REVIEW.md를 읽고 P0 → P1 순서로 모두 수정해.
P2는 docs/BACKLOG.md로 옮기고, 수정 결과를 PHASE_{N}_REPORT.md 맨 아래 "검수 반영" 절에 항목별로 기록한 뒤 멈춰.
```

### Claude에게 검수 요청할 때 (선생님 → Claude)
```
Phase {N} 검수해줘. 보고서는 design-psych-108/docs/progress/PHASE_{N}_REPORT.md야.
```

---

## 부록 B. 108개 원리 · 11개 사례 목록

### B-1. 원리 108 (번호 · 한글 · 영문 · 시드 demoType · 시드 윤리)

**① 디자인에 쓰는 심리 효과 (001–052)**

| No | 이름 | English | demo | 윤리 |
|---|---|---|---|---|
| 001 | 쿨레쇼프 효과 | Kuleshov Effect | scenarioQuiz | safe |
| 002 | 샤르팡티에 효과 | Charpentier Effect | choiceLab | caution |
| 003 | 베이비페이스 효과 | Babyface Effect | compareToggle | safe |
| 004 | 베블런 효과 | Veblen Effect | choiceLab | caution |
| 005 | 헤일로 효과 | Halo Effect | scenarioQuiz | caution |
| 006 | 화이트 스페이스 효과 | Whitespace Effect | compareToggle | safe |
| 007 | 시선 유도 효과 | Eye-Guiding Effect | gazeMap | safe |
| 008 | 포인팅 효과 | Pointing Effect | gazeMap | safe |
| 009 | 화살표 효과 | Arrow Effect | gazeMap | safe |
| 010 | 대비 효과 | Contrast Effect | compareToggle | safe |
| 011 | 터널 효과 | Tunnel Effect | gazeMap | safe |
| 012 | 밴드왜건 효과 | Bandwagon Effect | scenarioQuiz | caution |
| 013 | 허니문·행오버 효과 | Honeymoon-Hangover Effect | scenarioQuiz | safe |
| 014 | 디코이 효과 | Decoy Effect | choiceLab | risk |
| 015 | 낙인 효과 | Labeling Effect | scenarioQuiz | safe |
| 016 | 게인로스 효과 | Gain-Loss Effect | scenarioQuiz | safe |
| 017 | 대칭 효과 | Symmetry Effect | compareToggle | safe |
| 018 | 스놉 효과 | Snob Effect | scenarioQuiz | risk |
| 019 | 자이가르닉 효과 | Zeigarnik Effect | scenarioQuiz | safe |
| 020 | 플라세보 효과 | Placebo Effect | scenarioQuiz | caution |
| 021 | 매몰 비용 효과 | Sunk Cost Fallacy | scenarioQuiz | risk |
| 022 | 스토리텔링 | Storytelling | scenarioQuiz | safe |
| 023 | 칼리굴라 효과 | Caligula Effect | scenarioQuiz | risk |
| 024 | 프라이밍 효과 | Priming Effect | scenarioQuiz | caution |
| 025 | 앵커링 효과 | Anchoring Effect | choiceLab | caution |
| 026 | 최신 효과 | Recency Effect | scenarioQuiz | caution |
| 027 | 단순 접촉 효과 | Mere-Exposure Effect | scenarioQuiz | caution |
| 028 | 골디락스 효과 | Goldilocks Effect | choiceLab | caution |
| 029 | 리프레이밍 효과 | Reframing Effect | choiceLab | caution |
| 030 | 프로스펙트 이론 | Prospect Theory | choiceLab | risk |
| 031 | 텐션 리덕션 효과 | Tension Reduction Effect | scenarioQuiz | risk |
| 032 | 목표 구배 효과 | Goal Gradient Effect | scenarioQuiz | safe |
| 033 | 피크-엔드 법칙 | Peak-End Rule | scenarioQuiz | safe |
| 034 | 스트루프 효과 | Stroop Effect | timingGame | safe |
| 035 | 인지 부조화 | Cognitive Dissonance | scenarioQuiz | safe |
| 036 | 상호성의 원리 | Reciprocity Principle | scenarioQuiz | caution |
| 037 | 호손 효과 | Hawthorne Effect | scenarioQuiz | safe |
| 038 | 디드로 효과 | Diderot Effect | scenarioQuiz | safe |
| 039 | 입소문 효과 | Word-of-Mouth Effect | scenarioQuiz | caution |
| 040 | 칵테일 파티 효과 | Cocktail Party Effect | gazeMap | safe |
| 041 | 허위 합의 효과 | False Consensus Effect | scenarioQuiz | safe |
| 042 | 흔들다리 효과 | Suspension Bridge Effect | scenarioQuiz | caution |
| 043 | 부호화 특수성 원리 | Encoding Specificity Principle | scenarioQuiz | safe |
| 044 | 청크 | Chunk | timingGame | safe |
| 045 | 단수 가격 효과 | Odd Pricing Effect | choiceLab | caution |
| 046 | 마감 효과 | Deadline Effect | scenarioQuiz | risk |
| 047 | 디폴트 효과 | Default Effect | choiceLab | risk |
| 048 | 보유 효과 | Endowment Effect | scenarioQuiz | caution |
| 049 | 이유 제시 효과 | Placebic Reason Effect | scenarioQuiz | caution |
| 050 | 링겔만 효과 | Ringelmann Effect | scenarioQuiz | safe |
| 051 | 힉의 법칙 | Hick's Law | timingGame | safe |
| 052 | 문맥 효과 | Context Effect | compareToggle | safe |

**② 착시 효과 (053–078)**

| No | 이름 | English | demo |
|---|---|---|---|
| 053 | 문커 착시 | Munker Illusion | illusion |
| 054 | 문커-화이트 착시 | Munker-White Illusion | illusion |
| 055 | 색채 항상성 | Color Constancy | illusion |
| 056 | 환경광의 착시 | The Dress Illusion | illusion |
| 057 | 체커 그림자 착시 | Checker Shadow Illusion | illusion |
| 058 | 에렌슈타인 착시 | Ehrenstein Illusion | illusion |
| 059 | 네온 색 확산 효과 | Neon Color Spreading | illusion |
| 060 | 프레이저 착시 | Fraser Illusion | illusion |
| 061 | 마흐 밴드 착시 | Mach Band Illusion | illusion |
| 062 | 쵤너 착시 | Zöllner Illusion | illusion |
| 063 | 카니자 삼각형 | Kanizsa Triangle | illusion |
| 064 | 헤르만 격자 착시 | Hermann Grid Illusion | illusion |
| 065 | 뮐러-리어 착시 | Müller-Lyer Illusion | illusion |
| 066 | 피크 착시 | Fick Illusion | illusion |
| 067 | 바이컬러 착시 | Bicolor Illusion | illusion |
| 068 | 델뵈프 착시 | Delboeuf Illusion | illusion |
| 069 | 에빙하우스 착시 | Ebbinghaus Illusion | illusion |
| 070 | 폰조 착시 | Ponzo Illusion | illusion |
| 071 | 오펠-쿤트 착시 | Oppel-Kundt Illusion | illusion |
| 072 | 헬름홀츠의 정사각형 | Helmholtz Square | illusion |
| 073 | 상방 거리 과대 착시 | Top-Heavy Illusion | illusion |
| 074 | 자스트로 착시 | Jastrow Illusion | illusion |
| 075 | 크레이터 착시 | Crater Illusion | illusion |
| 076 | 피사의 사탑 착시 | Leaning Tower Illusion | illusion |
| 077 | 색채 동화 격자 착시 | Color Assimilation Grid Illusion | illusion |
| 078 | 색채 대비 | Color Contrast | colorLab |

**③ 색채 효과 (079–088)** — 모두 `colorLab`, safe

| No | 이름 | English |
|---|---|---|
| 079 | 전진색과 후퇴색 | Advancing and Receding Colors |
| 080 | 팽창색과 수축색 | Expanding and Contracting Colors |
| 081 | 난색과 한색 | Warm and Cool Colors |
| 082 | 무거운 색과 가벼운 색 | Heavy and Light Colors |
| 083 | 색에 따라 연상되는 미각 | Color and Flavor Association |
| 084 | 미각 이미지와 색의 차이 | Mismatch Between Flavor Image and Color |
| 085 | 음식과 보색 | Food and Complementary Color |
| 086 | 음조에 따른 색감 | Color Impressions by Tone |
| 087 | 색과 후각 | Color and Scent Perception |
| 088 | 후각 이미지와 색의 차이 | Color and Scent Image Mismatch |

**④ 레이아웃·UX 법칙 (089–108)**

| No | 이름 | English | demo |
|---|---|---|---|
| 089 | 근접의 법칙 | Law of Proximity | compareToggle |
| 090 | 정렬의 법칙 | Law of Alignment | compareToggle |
| 091 | 반복의 법칙 | Law of Repetition | compareToggle |
| 092 | 대비의 법칙 | Law of Contrast | compareToggle |
| 093 | 연속의 법칙 | Law of Continuity | compareToggle |
| 094 | 유사의 법칙 | Law of Similarity | compareToggle |
| 095 | 폐쇄의 법칙 | Law of Closure | compareToggle |
| 096 | 공통 운명의 법칙 | Law of Common Fate | compareToggle |
| 097 | 면적의 법칙 | Law of Area | compareToggle |
| 098 | 대칭의 법칙 | Law of Symmetry | compareToggle |
| 099 | 시그니파이어 | Signifier | compareToggle |
| 100 | 제이콥의 법칙 | Jakob's Law | compareToggle |
| 101 | 프로토타입 이론과 모범 이론 | Prototype Theory & Exemplar Theory | compareToggle |
| 102 | 베버-페히너 법칙 | Weber-Fechner Law | compareToggle |
| 103 | 피츠의 법칙 | Fitts's Law | timingGame |
| 104 | 도허티 임계값 | Doherty Threshold | timingGame |
| 105 | 구텐베르크 다이어그램 | Gutenberg Diagram | gazeMap |
| 106 | Z의 법칙 | Z Pattern | gazeMap |
| 107 | F의 법칙 | F Pattern | gazeMap |
| 108 | N의 법칙 | N Pattern | gazeMap |

> 096 공통 운명의 법칙은 움직임이 핵심이므로 `compareToggle` 안에서 "함께 움직이기" 애니메이션 버튼을 제공(모션 줄이기 시 화살표 표시).

### B-2. 사례 11 — 원본 구조 → 학교판 리메이크

| 사례 | 원본 유형 (참고만) | 사용 원리 | 학교판 리메이크 (새로 디자인) | 분류 |
|---|---|---|---|---|
| CASE01 | 고급 커피 전문점 웹사이트 | 100·006·001·078·083·005·022·029·051 | 동아리(예: 바리스타·제과 동아리) 소개 웹페이지 | 일반 |
| CASE02 | 후원 요청 포스터 | 007·003·015·005·012·039·022 | 교내 나눔 바자회 참여 포스터 | 일반 |
| CASE03 | 화장품 랜딩 페이지 | 007·002·025·020·012·024·014·028·010·004·030·048 | 방과후 강좌 신청 페이지 (원리별 "괜찮은 사용/선 넘는 사용" 비교 포함) | 일반+윤리 |
| CASE04 | 이직 서비스 배너 | 040·046·106·045 | 진로 박람회 안내 배너 (영어 버전 병행 → M1 연계) | 일반 |
| CASE05 | 화장품 브랜드 배너 | 017·108·018·010·027·026 | 학교 축제 공연 홍보 배너 | 일반 |
| CASE06 | YouTube 썸네일(디저트) | 008·098·019·092 | 수업 영상 썸네일 ("영어 발표 꿀팁" 등) | 일반 |
| CASE07 | 엔터테인먼트 영상 썸네일 | 023·009·019·035 | 학습 영상 썸네일 + "낚시성 썸네일" 비판 포인트 | 일반+윤리 |
| CASE08 | 명함 | 095·073·089·091·044 | 교사 명함 / 학생 영어 자기소개 카드 | 일반 |
| CASE09 | 쇼핑몰 결제 직전 화면 | 031·012·051·047 | 가상 쇼핑 앱 결제 화면 분석 | **비판적 분석** |
| CASE10 | 구독 해지 방어 화면 | 004·036·021·030 | 가상 구독 앱 해지 화면 — 다크 패턴 찾기 | **비판적 분석** |
| CASE11 | 운동 기록 앱 UI | 032·100·103·093 | 학습 진도 대시보드 웹앱 UI | 일반 |

> 원본 사진 파일명은 `02_source-index.json`의 `cases[].sourceImages`에 있습니다. 목업의 모든 텍스트·이름·숫자는 **가상**으로 새로 만듭니다.

---

*이 계획서의 변경은 Claude 검수 또는 선생님 지시로만 이루어지며, 변경 시 문서 상단 버전을 올리고 `docs/DECISIONS.md`에 기록합니다.*
