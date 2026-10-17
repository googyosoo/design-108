# DECISIONS.md — 기술 의사결정 기록

이 문서는 프로젝트 진행 중 내린 주요 기술적 의사결정(무엇을 / 왜 / 고려한 대안)을 기록하는 아키텍처 원장입니다.

---

## [D001] Phase 0 기술 스택 의존성 선정 및 버전 고정 (Strict Pinning)

- **결정일**: 2026-10-17
- **결정 내용**:
  - `00_ANTIGRAVITY_PLAN.md` 10.1장 명세에 따라 필요한 런타임 및 개발 라이브러리를 설치하고, 재현 가능한 빌드를 위해 `package.json`에서 `^`(캐럿)을 전면 제거하여 정확한 버전으로 고정함.
- **설치 라이브러리 및 고정 버전**:
  - **런타임 의존성**:
    - `react`: `19.2.8` (최신 React 19 코어)
    - `react-dom`: `19.2.8` (React 19 렌더러)
    - `react-router-dom`: `7.18.4` (SPA 라우팅 및 쿼리 파라미터 상태 보존)
    - `fuse.js`: `7.5.0` (경량 클라이언트 퍼지 검색 및 한국어 초성 검색 연동)
    - `lucide-react`: `1.59.0` (일관된 선형 아이콘 세트)
    - `zod`: `4.6.7` (108개 콘텐츠 데이터 정적 스키마 유효성 검증)
    - `@google/genai`: `2.30.0` (Vercel 서버 함수 내 Gemini 공식 SDK)
  - **개발 의존성**:
    - `vite`: `8.3.0` (초고속 ESM 기반 개발 서버 및 빌드 툴)
    - `@vitejs/plugin-react`: `6.1.1` (Vite 공식 React 플러그인)
    - `tailwindcss`: `4.3.3` (Tailwind CSS v4 CSS-first 엔진)
    - `@tailwindcss/vite`: `4.3.3` (Tailwind CSS v4 공식 Vite 번들러 플러그인)
    - `vite-plugin-pwa`: `2.0.0` (서비스 워커 및 웹 앱 매니페스트 PWA 지원)
    - `@eslint/js`: `10.0.1` (ESLint 공식 자바스크립트 기본 규칙 세트)
    - `eslint`: `10.13.0` (자바스크립트/JSX 정적 코드 분석)
    - `eslint-plugin-react-hooks`: `7.1.1` (React Hooks 규칙 검사)
    - `eslint-plugin-react-refresh`: `0.5.7` (React 빠른 새로고침 지원)
    - `prettier`: `3.9.10` (2칸 들여쓰기 공통 코드 포맷팅)
- **선정 이유**:
  - 계획서 10.1장 요구사항에 100% 부합하며, UI 프레임워크나 전역 상태 관리 라이브러리(Redux, Zustand 등) 없이 React Context와 훅만으로 가볍고 유지보수 용이한 아키텍처를 구현하기 위함.
- **고려한 대안 및 기각 사유**:
  - Tailwind v3 vs v4: 최신 2026 표준에 따라 별도 `tailwind.config.js` 없이 CSS 변수(`@theme`) 기반으로 동작하는 v4를 채택.
  - 외부 UI 라이브러리: `01_WEBAPP_STANDARDS.md`의 디자인 토큰 및 6대 상태 요건을 완벽히 통제하고 번들 크기를 200KB 이하로 유지하기 위해 커스텀 순수 컴포넌트 개발 방식 채택.
