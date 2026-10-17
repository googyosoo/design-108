import React from 'react'
import { PhotosensitivityWarning } from './PhotosensitivityWarning.jsx'
import { CompareToggle } from './templates/CompareToggle.jsx'
import { ScenarioQuiz } from './templates/ScenarioQuiz.jsx'
import { ChoiceLab } from './templates/ChoiceLab.jsx'
import { TimingGame } from './templates/TimingGame.jsx'
import { GazeMap } from './templates/GazeMap.jsx'
import { ColorLab } from './templates/ColorLab.jsx'

// 착시 25종 컴포넌트 임포트
import { MullerLyer, Ponzo, Ebbinghaus, Hering, Wundt } from './illusions/GroupA.jsx'
import { OppelKundt, Poggendorff, Zollner, KanizsaTriangle, WhiteIllusion } from './illusions/GroupB.jsx'
import { HermannGrid, MachBands, CheckerShadow, FraserSpiral, OuchiIllusion } from './illusions/GroupC.jsx'
import { NeckerCube, RubinVase, DalmatianFigure, CafeWall, TitchenerCircles } from './illusions/GroupD.jsx'
import { MotionAftereffect, BowtieContrast, BezoldAssimilation, SubjectiveContours, IllusionContours } from './illusions/GroupE.jsx'

/**
 * 25개 착시 전용 컴포넌트 맵 (053 ~ 077)
 */
const illusionMap = {
  '053': MullerLyer,
  '054': Ponzo,
  '055': Ebbinghaus,
  '056': Hering,
  '057': Wundt,
  '058': OppelKundt,
  '059': Poggendorff,
  '060': Zollner,
  '061': KanizsaTriangle,
  '062': WhiteIllusion,
  '063': HermannGrid,
  '064': MachBands,
  '065': CheckerShadow,
  '066': FraserSpiral,
  '067': OuchiIllusion,
  '068': NeckerCube,
  '069': RubinVase,
  '070': DalmatianFigure,
  '071': CafeWall,
  '072': TitchenerCircles,
  '073': MotionAftereffect,
  '074': BowtieContrast,
  '075': BezoldAssimilation,
  '076': SubjectiveContours,
  '077': IllusionContours,
}

/**
 * 원리별 인터랙티브 데모 라우터 컴포넌트
 * @param {Object} props
 * @param {Object} props.effect - 원리 데이터 객체
 */
export function EffectDemo({ effect }) {
  if (!effect) return null

  const code = effect.code

  // 1. 착시 챕터 (053 ~ 077)
  const IllusionComponent = illusionMap[code]
  if (IllusionComponent) {
    return (
      <div className="space-y-4">
        <PhotosensitivityWarning />
        <IllusionComponent />
      </div>
    )
  }

  // 2. 특화 템플릿 매핑
  // 001: 피츠의 법칙 (Fitts's Law)
  if (code === '001') {
    return (
      <TimingGame
        title={`${code}: 피츠의 법칙 (Fitts's Law)`}
        targetLabel="제출하기"
        lawName="피츠의 법칙"
        itemCountOptions={[2, 4, 8]}
        explanation="타깃 버튼의 면적이 크고 마우스/손가락 커서와의 거리가 가까울수록 도달 속도와 조작 성공률이 비례하여 증가합니다."
      />
    )
  }

  // 002: 힉의 법칙 (Hick's Law)
  if (code === '002') {
    return (
      <TimingGame
        title={`${code}: 힉의 법칙 (Hick's Law)`}
        targetLabel="수업자료"
        lawName="힉의 법칙"
        itemCountOptions={[2, 4, 8]}
        explanation="선택할 수 있는 메뉴나 버튼 개수가 늘어날수록 결정 시간(Decision Time)은 대수적(Logarithmic)으로 증가합니다."
      />
    )
  }

  // 003: 밀러의 법칙 (Miller's Law - 7±2 청킹)
  if (code === '003') {
    return (
      <ChoiceLab
        title={`${code}: 밀러의 법칙 (Miller's Law)`}
        controls={[
          { id: 'chunkSize', label: '단위 묶음(청킹) 크기', min: 2, max: 8, default: 4, unit: '자리' },
        ]}
        renderPreview={(v) => (
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">연락처 / 학번 정보 인지 부하 비교</span>
            <div className="text-xl sm:text-2xl font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {'01012345678'
                .match(new RegExp(`.{1,${v.chunkSize}}`, 'g'))
                ?.join(' - ') || '010-1234-5678'}
            </div>
            <span className="text-xs text-slate-500">
              {v.chunkSize <= 4 ? '✓ 한눈에 파악하기 쉬운 적정 인지 덩어리' : '✕ 한 번에 기억하기 부담스러운 긴 숫자열'}
            </span>
          </div>
        )}
        explanation="인간의 단기 작업 기억 용량은 한 번에 5~9개 정보 덩어리로 제한되므로, 정보를 의미 있는 3~4자리 단위로 그룹핑해야 인지 과부하를 막을 수 있습니다."
      />
    )
  }

  // 005: 폰 레스토프 효과 (Von Restorff / Isolation Effect)
  if (code === '005') {
    return (
      <ChoiceLab
        title={`${code}: 폰 레스토프 효과 (고립 효과)`}
        controls={[
          { id: 'contrast', label: '타깃 버튼 대비 강도', min: 1, max: 5, default: 4 },
        ]}
        renderPreview={(v) => (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium">
              이전 활동
            </button>
            <button
              type="button"
              className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all ${
                v.contrast >= 3
                  ? 'bg-rose-500 text-white scale-110 shadow-rose-200 dark:shadow-none'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-800'
              }`}
            >
              ★ 핵심 과제 제출 (타깃)
            </button>
            <button type="button" className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium">
              임시 저장
            </button>
          </div>
        )}
        explanation="동일한 여러 자극들 중 형태, 색상, 크기 면에서 눈에 띄게 고립된 단 하나의 요소가 가장 먼저 주의를 끌고 기억에 오래 남습니다."
      />
    )
  }

  // 008: 게슈탈트 근접성의 원리 (Proximity)
  if (code === '008') {
    return (
      <ChoiceLab
        title={`${code}: 게슈탈트 근접성의 원리 (Proximity)`}
        controls={[
          { id: 'groupGap', label: '그룹 간 여백 (Outer Gap)', min: 8, max: 48, default: 32, unit: 'px' },
          { id: 'itemGap', label: '항목 내 여백 (Inner Gap)', min: 4, max: 20, default: 8, unit: 'px' },
        ]}
        renderPreview={(v) => (
          <div className="flex items-center" style={{ gap: `${v.groupGap}px` }}>
            <div className="p-3 border border-indigo-200 rounded-lg bg-indigo-50/50 flex flex-col" style={{ gap: `${v.itemGap}px` }}>
              <span className="text-xs font-bold text-indigo-700">1반 명단</span>
              <div className="h-4 w-16 bg-indigo-300 rounded" />
              <div className="h-4 w-16 bg-indigo-300 rounded" />
            </div>
            <div className="p-3 border border-emerald-200 rounded-lg bg-emerald-50/50 flex flex-col" style={{ gap: `${v.itemGap}px` }}>
              <span className="text-xs font-bold text-emerald-700">2반 명단</span>
              <div className="h-4 w-16 bg-emerald-300 rounded" />
              <div className="h-4 w-16 bg-emerald-300 rounded" />
            </div>
          </div>
        )}
        explanation="서로 가까이 위치한 요소들은 뇌에서 하나의 연관된 그룹으로 자동 결합되어 인식됩니다. 그룹 간 여백은 그룹 내부 여백보다 최소 2~3배 이상 커야 시각적 혼선을 방지합니다."
      />
    )
  }

  // 012, 025: 색상 및 명도 대비 관련 원리
  if (code === '012' || code === '025') {
    return (
      <ColorLab
        title={`${code}: ${effect.name_ko} (${effect.name_en})`}
        explanation={effect.summary}
      />
    )
  }

  // 020: Z-패턴 시선 유도
  if (code === '020') {
    return (
      <GazeMap
        title={`${code}: Z-패턴 시선 이동 (Z-Pattern)`}
        patternType="z-pattern"
        explanation={effect.summary}
      />
    )
  }

  // 021: F-패턴 시선 유도
  if (code === '021') {
    return (
      <GazeMap
        title={`${code}: F-패턴 시선 이동 (F-Pattern)`}
        patternType="f-pattern"
        explanation={effect.summary}
      />
    )
  }

  // 022: 구텐베르크 다이어그램
  if (code === '022') {
    return (
      <GazeMap
        title={`${code}: 구텐베르크 다이어그램 (Gutenberg Diagram)`}
        patternType="gutenberg"
        explanation={effect.summary}
      />
    )
  }

  // 030: 앵커링 효과 (Anchoring Effect)
  if (code === '030') {
    return (
      <ChoiceLab
        title={`${code}: 앵커링 효과 (기준점 편향)`}
        controls={[
          { id: 'originalPrice', label: '정가(앵커) 제시 금액', min: 20000, max: 90000, step: 5000, default: 60000, unit: '원' },
        ]}
        renderPreview={(v) => (
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              교원 연수 워크숍 교재 특가
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-slate-400 line-through">
                {v.originalPrice.toLocaleString()}원
              </span>
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
                19,900원
              </span>
            </div>
            <span className="text-xs text-slate-500">
              할인 체감율: {Math.round((1 - 19900 / v.originalPrice) * 100)}% 이득으로 인식
            </span>
          </div>
        )}
        explanation="사용자는 최초로 제시된 수치(정가 앵커)를 기준점으로 삼아 이후의 조건(19,900원)을 평가하므로, 최초 기준점에 따라 제품의 가치가 매우 저렴하게 체감됩니다."
      />
    )
  }

  // 042, 100 등 윤리 및 선택 관련 원리
  if (effect.ethics_flag || Number(code) % 3 === 0) {
    return (
      <ScenarioQuiz
        title={`${code}: ${effect.name_ko}`}
        scenario={`[상황 제시] 학교 학습 관리 시스템(LMS)에서 ${effect.name_ko} 원리를 적용하여 학생들의 과제 제출률을 높이고자 합니다. 어떤 방식을 선택하시겠습니까?`}
        options={[
          {
            id: 'opt1',
            text: `[투명한 유도] 마감 3일 전 '남은 기한'을 명확히 시각화하고, 제출 시 얻는 성취 포인트를 강조한다.`,
            isCorrect: true,
            feedback: `훌륭한 설계입니다! 사용자의 자율성과 인지적 명확성을 보장하면서 긍정적인 행동을 촉진합니다.`,
          },
          {
            id: 'opt2',
            text: `[강제적 압박] 마감 카운트다운 타이머를 화면 중앙에 깜빡이게 하고, 미제출 시 페널티 경고를 반복 팝업으로 띄운다.`,
            isCorrect: false,
            feedback: `주의가 필요합니다. 불안감을 조성하는 다크 패턴(Urgency/Shaming)에 해당하여 학생들에게 인지적 스트레스와 반발을 초래합니다.`,
          },
        ]}
        principleSummary={effect.summary}
      />
    )
  }

  // 기본 폴백: 전후 비교 토글 (CompareToggle)
  return (
    <CompareToggle
      title={`${code}: ${effect.name_ko} (${effect.name_en})`}
      beforeContent={
        <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-center space-y-2 max-w-xs">
          <div className="h-4 w-3/4 bg-slate-300 dark:bg-slate-700 rounded mx-auto" />
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
          <button type="button" className="px-3 py-1 bg-slate-400 text-white rounded text-xs">
            기본 배치 (미적용)
          </button>
        </div>
      }
      afterContent={
        <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center space-y-2 max-w-xs shadow-md">
          <div className="h-4 w-3/4 bg-indigo-500 rounded mx-auto" />
          <div className="h-3 w-full bg-indigo-200 dark:bg-indigo-900 rounded" />
          <div className="h-3 w-5/6 bg-indigo-200 dark:bg-indigo-900 rounded mx-auto" />
          <button type="button" className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow">
            {effect.name_ko} 최적화 적용
          </button>
        </div>
      }
      explanation={effect.summary}
    />
  )
}
