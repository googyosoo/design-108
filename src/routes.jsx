/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell.jsx'
import { Skeleton } from './components/ui/Skeleton.jsx'
import { PlaceholderPage, NotFoundPage } from './pages/Placeholder.jsx'

const HomePage = lazy(() => import('./pages/Home.jsx').then((m) => ({ default: m.HomePage })))
const LibraryPage = lazy(() => import('./pages/Library.jsx').then((m) => ({ default: m.LibraryPage })))
const EffectDetailPage = lazy(() => import('./pages/EffectDetail.jsx').then((m) => ({ default: m.EffectDetailPage })))
const PresentDeckPage = lazy(() => import('./pages/PresentDeck.jsx').then((m) => ({ default: m.PresentDeckPage })))
const CasesPage = lazy(() => import('./pages/Cases.jsx').then((m) => ({ default: m.CasesPage })))
const CaseStudioPage = lazy(() => import('./pages/CaseStudio.jsx').then((m) => ({ default: m.CaseStudioPage })))
const PracticeHubPage = lazy(() => import('./pages/PracticeHub.jsx').then((m) => ({ default: m.PracticeHubPage })))
const QuizRunnerPage = lazy(() => import('./pages/QuizRunner.jsx').then((m) => ({ default: m.QuizRunnerPage })))
const ToolsHubPage = lazy(() => import('./pages/ToolsHub.jsx').then((m) => ({ default: m.ToolsHubPage })))
const PromptBuilderPage = lazy(() => import('./pages/PromptBuilder.jsx').then((m) => ({ default: m.PromptBuilderPage })))
const TeachHubPage = lazy(() => import('./pages/TeachHub.jsx').then((m) => ({ default: m.TeachHubPage })))
const TeachModulePage = lazy(() => import('./pages/TeachModule.jsx').then((m) => ({ default: m.TeachModulePage })))
const MyPage = lazy(() => import('./pages/My.jsx').then((m) => ({ default: m.MyPage })))
const DevUiPage = lazy(() => import('./pages/DevUi.jsx').then((m) => ({ default: m.DevUiPage })))

function PageSuspense({ children }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl p-6 space-y-6" aria-busy="true" aria-label="페이지 로딩 중">
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="rectangular" height={220} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton variant="rectangular" height={140} />
            <Skeleton variant="rectangular" height={140} />
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell title="DesignMind 108" />,
    children: [
      {
        index: true,
        element: (
          <PageSuspense>
            <HomePage />
          </PageSuspense>
        ),
      },
      {
        path: 'library',
        element: (
          <PageSuspense>
            <LibraryPage />
          </PageSuspense>
        ),
      },
      {
        path: 'effect/:code',
        element: (
          <PageSuspense>
            <EffectDetailPage />
          </PageSuspense>
        ),
      },
      {
        path: 'effect/:code/present',
        element: (
          <PageSuspense>
            <PresentDeckPage />
          </PageSuspense>
        ),
      },
      {
        path: 'cases',
        element: (
          <PageSuspense>
            <CasesPage />
          </PageSuspense>
        ),
      },
      {
        path: 'cases/:caseCode',
        element: (
          <PageSuspense>
            <CaseStudioPage />
          </PageSuspense>
        ),
      },
      {
        path: 'practice',
        element: (
          <PageSuspense>
            <PracticeHubPage />
          </PageSuspense>
        ),
      },
      {
        path: 'practice/:mode',
        element: (
          <PageSuspense>
            <QuizRunnerPage />
          </PageSuspense>
        ),
      },
      {
        path: 'tools',
        element: (
          <PageSuspense>
            <ToolsHubPage />
          </PageSuspense>
        ),
      },
      {
        path: 'tools/builder',
        element: (
          <PageSuspense>
            <PromptBuilderPage />
          </PageSuspense>
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
          <PageSuspense>
            <TeachHubPage />
          </PageSuspense>
        ),
      },
      {
        path: 'teach/:moduleId',
        element: (
          <PageSuspense>
            <TeachModulePage />
          </PageSuspense>
        ),
      },
      {
        path: 'my',
        element: (
          <PageSuspense>
            <MyPage />
          </PageSuspense>
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
        element: (
          <PageSuspense>
            <DevUiPage />
          </PageSuspense>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
