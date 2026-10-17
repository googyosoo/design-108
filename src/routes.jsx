import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell.jsx'
import { PlaceholderPage, NotFoundPage } from './pages/Placeholder.jsx'
import { DevUiPage } from './pages/DevUi.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell title="DesignMind 108" />,
    children: [
      {
        index: true,
        element: (
          <PlaceholderPage
            title="홈 (Home)"
            phase="3"
            description="오늘의 원리, 빠른 상황별 찾기, 내 진도 링, 실전 사례 핫링크를 제공합니다."
          />
        ),
      },
      {
        path: 'library',
        element: (
          <PlaceholderPage
            title="원리 도감 (108)"
            phase="3"
            description="108개 디자인 심리 원리를 4대 챕터와 태그, 초성 검색으로 탐색합니다."
          />
        ),
      },
      {
        path: 'effect/:code',
        element: (
          <PlaceholderPage
            title="원리 상세 (Detail)"
            phase="3"
            description="한 줄 정의, 왜 작동하는가, 30초 체험, 학교 현장 Do & Don't, 프롬프트 복사를 제공합니다."
          />
        ),
      },
      {
        path: 'effect/:code/present',
        element: (
          <PlaceholderPage
            title="원리 발표 모드"
            phase="5"
            description="교실 프로젝터 및 연수 강의용 대화면 전용 슬라이드 덱입니다."
          />
        ),
      },
      {
        path: 'cases',
        element: (
          <PlaceholderPage
            title="실전 사례 목록 (11)"
            phase="5"
            description="학습지, 슬라이드, 웹앱, 다크 패턴 분석 등 11개 실전 리메이크 사례입니다."
          />
        ),
      },
      {
        path: 'cases/:caseCode',
        element: (
          <PlaceholderPage
            title="사례 스튜디오"
            phase="5"
            description="Before/After 전환 및 인터랙티브 핫스팟 탐색 모드입니다."
          />
        ),
      },
      {
        path: 'practice',
        element: (
          <PlaceholderPage
            title="연습 허브 (Practice)"
            phase="5"
            description="플래시 카드, 4지선다 퀴즈, 윤리/다크패턴 판별, 영어 퀴즈 4종을 제공합니다."
          />
        ),
      },
      {
        path: 'practice/:mode',
        element: (
          <PlaceholderPage
            title="퀴즈 진행 (Quiz)"
            phase="5"
            description="랜덤 생성되는 10문항 인터랙티브 퀴즈 화면입니다."
          />
        ),
      },
      {
        path: 'tools',
        element: (
          <PlaceholderPage
            title="도구 허브 (Tools)"
            phase="5"
            description="프롬프트 빌더, AI 디자인 진단, 수업 활용 도구를 한곳에 모았습니다."
          />
        ),
      },
      {
        path: 'tools/builder',
        element: (
          <PlaceholderPage
            title="프롬프트 빌더 (Prompt Builder)"
            phase="5"
            description="매체와 목적을 고르면 AI 지시문과 체크리스트 마크다운을 3분 안에 생성합니다."
          />
        ),
      },
      {
        path: 'tools/diagnose',
        element: (
          <PlaceholderPage
            title="AI 디자인 진단 (Diagnose)"
            phase="6"
            description="수업자료/웹앱 캡처를 올리면 15초 안에 3대 개선점과 원리 링크를 제시합니다."
          />
        ),
      },
      {
        path: 'teach',
        element: (
          <PlaceholderPage
            title="수업 활용 허브 (Teach)"
            phase="5"
            description="고등 영어 포스터, 미디어 리터러시, 교원 연수 웹앱 고도화 등 4종 수업 모듈입니다."
          />
        ),
      },
      {
        path: 'teach/:moduleId',
        element: (
          <PlaceholderPage
            title="수업 모듈 상세"
            phase="5"
            description="차시별 지도안, 인쇄용 활동지, 명시적 루브릭을 제공합니다."
          />
        ),
      },
      {
        path: 'my',
        element: (
          <PlaceholderPage
            title="내 도감 (My Studio)"
            phase="3"
            description="즐겨찾기 보관함, 108개 수집 달성률 링, 퀴즈 오답 복습장입니다."
          />
        ),
      },
      {
        path: 'about',
        element: (
          <PlaceholderPage
            title="앱 소개 및 출처 (About)"
            phase="7"
            description="DesignMind 108 기획 의도, 저작권 출처 표기, 개인정보 처리방침 안내입니다."
          />
        ),
      },
      {
        path: 'dev/ui',
        element: <DevUiPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
