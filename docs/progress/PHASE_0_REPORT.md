# Phase 0 보고서

## 1. 완료 기준 체크
- [x] `npm run dev`로 빈 화면 표시, `npm run build` 성공 (근거: `npm run check` 종료 코드 0, `dist/` 빌드 성공 산출물 확인)
- [x] 원본 사진 127장 그대로(개수·이름 변경 없음) (근거: 상위 폴더 원본 JPG 127개 무결성 전수 확인, 복사/이동 0건)
- [x] `docs/` 안에 문서 3개 존재 (근거: `docs/00_ANTIGRAVITY_PLAN.md`, `docs/01_WEBAPP_STANDARDS.md`, `docs/02_source-index.json` 및 `docs/DECISIONS.md` 위치 확인)
- [x] `package.json`에 `^` 없음 (근거: `package.json` 정규식 `\^` 검색 결과 0건, strict version pinning 적용)

## 2. 변경 파일 목록
- `docs/00_ANTIGRAVITY_PLAN.md` (루트에서 프로젝트 docs/ 폴더로 이동)
- `docs/01_WEBAPP_STANDARDS.md` (루트에서 프로젝트 docs/ 폴더로 이동)
- `docs/02_source-index.json` (루트에서 프로젝트 docs/ 폴더로 이동, 상대경로 `../../` 확인)
- `docs/DECISIONS.md` (신규 생성: Phase 0 기술 스택 의존성 및 버전 고정 내역 기록)
- `package.json` (Vite, React 19, Tailwind v4, Router, Lucide, Fuse.js, Zod, PWA 의존성 추가 및 캐럿 전면 제거)
- `vite.config.js` (`@tailwindcss/vite` 플러그인 연결)
- `eslint.config.js` (신규 생성: ESLint 플랫 컨피그, React 권장 룰 및 Node globals 설정)
- `.prettierrc` (신규 생성: 2칸 들여쓰기 공통 포맷터 설정)
- `.gitignore` (신규 생성: node_modules, dist, .env*, .vercel 등 제외 설정)
- `.env.example` (신규 생성: GEMINI_API_KEY, GEMINI_MODEL 플레이스홀더 명시)
- `vercel.json` (신규 생성: SPA 클라이언트 라우팅 rewrite 설정)
- `scripts/validateData.js` (신규 생성: Phase 0 데이터 검증 스크립트 베이스라인)
- `src/styles/tokens.css` (신규 생성: 표준 3·4장 디자인 토큰, 9.2장 챕터 색상, 라이트/다크 테마 CSS 변수)
- `src/styles/base.css` (신규 생성: 기본 스타일, 포커스 링, 모션 축소 접근성 설정)
- `src/index.css` (Tailwind v4 및 tokens/base 스타일 연결)
- `src/App.jsx` (불필요한 템플릿 코드 제거 및 DesignMind 108 베이스라인 화면 작성)
- `index.html` (`lang="ko"`, Pretendard 웹폰트 CDN 링크, 올바른 페이지 타이틀 설정)

## 3. 실행 결과
- `npm run check` (= `npm run lint && npm run validate:data && npm run build`): **통과 (종료 코드 0)**
  - `eslint .`: 0 errors, 0 warnings
  - `validate:data`: 정상 통과
  - `vite build`: `dist/assets/index-DnIxLis6.css` (12.91 kB), `dist/assets/index-DAJ6zIkp.js` (191.25 kB, gzip 60.37 kB) - 200KB 이하 성능 예산 완벽 충족

## 4. 스크린샷
- Phase 0은 UI 컴포넌트 렌더링 이전의 빈 베이스라인 셸 단계이므로 브라우저 스크린샷은 Phase 1(`/dev/ui` 및 셸 완성 단계)에서 360px/768px/1280px 3폭 캡처를 생성하여 저장할 예정입니다.

## 5. 계획과 달라진 점 (이유)
- `base.css`에 인라인되어 있던 Pretendard 웹폰트 `@import` 규칙이 Vite 번들러의 CSS 빌드 최적화 과정에서 경고(CSS spec상 `@import`는 모든 규칙보다 선행해야 함)를 유발하여, 성능 최적화 및 표준 준수를 위해 `index.html`의 `<head>` 내 `<link rel="stylesheet">` 선언 방식으로 정교하게 변경했습니다.
- `scripts/validateData.js`의 Node.js `process` 객체 사용을 지원하기 위해 `eslint.config.js` globals에 `process: 'readonly'`를 명시했습니다.

## 6. 제안 (구현하지 않음)
- 추후 Phase 7 PWA 단계에서 오프라인 캐시 적용 시 Pretendard 웹폰트 파일의 자체 로컬 호스팅(Self-hosting) 번들링 여부를 검토해볼 수 있습니다. (현재는 CDN 최적화 유지)

## 7. 알려진 문제
- 없음 (빌드, 린트, 데이터 검증 모두 결함 0건 정상 통과)
