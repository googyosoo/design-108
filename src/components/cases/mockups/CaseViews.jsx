import React from 'react'

/**
 * 11개 학교판 리메이크 사례 목업 뷰 (CaseViews)
 * 각 케이스별로 Before와 After의 시각적 형태를 충실히 렌더링합니다.
 */

// CASE01: 바리스타·제과 동아리 소개 웹페이지 (Landscape)
export function Case01Mockup({ isBefore }) {
  if (isBefore) {
    return (
      <div className="w-full h-full p-6 bg-amber-50/40 text-slate-800 flex flex-col justify-between font-sans select-none">
        <div className="text-center space-y-1">
          <p className="text-xs text-rose-600 font-bold">[초기 시안] 시각 계층 없이 빽빽한 텍스트 나열</p>
          <h3 className="text-base font-bold">동아리 회원을 모집합니다 많은 지원 바랍니다</h3>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="border border-slate-300 p-2 bg-white">커피 사진 A (흐림)</div>
          <div className="border border-slate-300 p-2 bg-white">원두 설명 텍스트 20줄...</div>
          <div className="border border-slate-300 p-2 bg-white">지원서 링크 (작은 글씨)</div>
        </div>
        <div className="text-center text-xs text-slate-500">문의: 회장 010-XXXX-XXXX</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-[#1c1917] text-amber-50 flex flex-col justify-between font-sans select-none overflow-hidden rounded-xl shadow-lg border border-amber-950">
      {/* GNB (Hotspot 100 준수) */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-stone-800/80 bg-stone-900/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold text-white">☕</span>
          <span className="font-serif tracking-wider font-bold text-amber-200">CREMA · 바리스타 동아리</span>
        </div>
        <nav className="flex items-center gap-6 text-xs text-stone-300 font-medium">
          <span className="hover:text-amber-400 cursor-pointer">스토리</span>
          <span className="hover:text-amber-400 cursor-pointer">시그니처 블렌드</span>
          <span className="hover:text-amber-400 cursor-pointer">활동 갤러리</span>
          <button type="button" className="px-3 py-1.5 rounded-full bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 shadow-sm transition-transform active:scale-95">
            지원하기
          </button>
        </nav>
      </header>

      {/* Hero Body (Hotspot 6, 1, 78) */}
      <div className="px-8 py-6 grid grid-cols-12 gap-6 items-center flex-1">
        <div className="col-span-7 space-y-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-400 border border-amber-800/60">
            2026학년도 신입 부원 선발
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight">
            한 잔의 커피에 담긴<br />
            <span className="text-amber-400">과학과 예술</span>을 함께 배웁니다
          </h2>
          <p className="text-xs text-stone-400 leading-relaxed max-w-md">
            생두 감별부터 에스프레소 추출, 스팀 피처링까지. 학생 자율 카페 운영을 통해 생생한 직업 진로와 따뜻한 환대의 기쁨을 경험하세요.
          </p>
        </div>

        <div className="col-span-5 relative">
          <div className="aspect-[4/3] rounded-xl bg-stone-800 border border-stone-700 p-4 flex flex-col justify-end relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-mono text-amber-400">SIGNATURE ROASTING</span>
              <p className="text-xs font-bold text-white">에티오피아 예가체프 G1 블렌딩</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="px-6 py-2.5 border-t border-stone-800/60 text-[10px] text-stone-500 flex justify-between items-center bg-stone-950">
        <span>매주 수요일 7교시 어학실습동 1층 바리스타 랩실</span>
        <span>Instagram @crema_school_club</span>
      </footer>
    </div>
  )
}

// CASE02: 교내 나눔 바자회 참여 포스터 (Portrait)
export function Case02Mockup({ isBefore }) {
  if (isBefore) {
    return (
      <div className="w-full h-full p-4 bg-slate-100 text-slate-800 flex flex-col justify-between text-center select-none font-sans">
        <p className="text-xs text-rose-600 font-bold">[초기 시안] 분산된 텍스트와 산만한 배치</p>
        <div className="space-y-3 my-auto">
          <h3 className="text-lg font-black text-slate-900">바자회에 많이 오세요!!</h3>
          <p className="text-xs text-slate-600">수익금은 전액 어려운 이웃에게 전달됩니다.</p>
          <div className="border-2 border-dashed border-slate-400 p-3 text-xs">
            일시: 10월 24일 점심시간<br />
            장소: 학생회관 앞 잔디밭<br />
            준비물: 장바구니, 현금/쿠폰
          </div>
        </div>
        <p className="text-[10px] text-slate-400">주최: 학생 자치회 봉사부</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white p-6 flex flex-col justify-between rounded-xl shadow-xl border border-indigo-800/50 select-none font-sans">
      {/* 상단 뱃지 및 인물 시선 유도 (Hotspot 7, 15) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            제12회 교내 아름다운 나눔 프로젝트
          </span>
          <span className="text-[10px] text-indigo-300 font-mono">D-3 DAY</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
          우리가 함께 만든 온기가<br />
          <span className="text-amber-300">이웃의 겨울을 녹입니다</span>
        </h2>
      </div>

      {/* 중앙 사회적 증거 통계 박스 (Hotspot 12) */}
      <div className="my-auto p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1 shadow-inner">
        <p className="text-xs text-indigo-200">현재까지 모인 소중한 기부 물품</p>
        <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-300">
          1,482 <span className="text-sm font-sans font-bold text-white">점 달성</span>
        </p>
        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-2">
          <div className="bg-emerald-400 h-full w-[78%] rounded-full" />
        </div>
        <p className="text-[10px] text-indigo-300 pt-1">전교생 78% 참여 중 (목표 1,500점)</p>
      </div>

      {/* 하단 일시/장소 그룹화 (Hotspot 89) */}
      <div className="p-3.5 rounded-xl bg-indigo-950/80 border border-indigo-700/60 space-y-1.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-300">일시</span>
          <span className="text-slate-200">2026. 10. 24(금) 12:30 ~ 15:30</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-300">장소</span>
          <span className="text-slate-200">중앙 솔숲 잔디광장 (우천 시 체육관 로비)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-300">안내</span>
          <span className="text-slate-200">텀블러 지참 시 학생회 카페 음료 500원 할인</span>
        </div>
      </div>
    </div>
  )
}

// 범용 케이스 뷰 스위치 (11개 케이스 전수 지원)
export function CaseMockup({ caseCode, isBefore }) {
  if (caseCode === 'CASE01') {
    return <Case01Mockup isBefore={isBefore} />
  }
  if (caseCode === 'CASE02') {
    return <Case02Mockup isBefore={isBefore} />
  }

  // CASE03 ~ CASE11 일반 학교형 목업 렌더러
  const themeColors = {
    CASE03: { bg: 'from-amber-900 to-stone-900', title: '학교 도서관 테마 북큐레이션' },
    CASE04: { bg: 'from-sky-900 to-indigo-950', title: '고등 영어 독해 탐구 활동지' },
    CASE05: { bg: 'from-slate-900 to-slate-950', title: '학부모 대상 교육과정 설명회 슬라이드' },
    CASE06: { bg: 'from-emerald-900 to-teal-950', title: '보건실 감염병 예방 인포그래픽 포스터' },
    CASE07: { bg: 'from-purple-900 to-indigo-950', title: '학교 축제 동아리 부스 안내 모바일 웹앱' },
    CASE08: { bg: 'from-cyan-900 to-blue-950', title: '진로진학 AI 상담 챗봇 인터페이스' },
    CASE09: { bg: 'from-rose-900 to-stone-950', title: '동아리 박람회 3단 접이식 리플릿' },
    CASE10: { bg: 'from-blue-900 to-slate-950', title: '학생 자치회 모바일 전자 투표 플랫폼' },
    CASE11: { bg: 'from-red-950 to-neutral-950', title: '다크 패턴(Dark Pattern) 분석 리포트 화면' },
  }

  const meta = themeColors[caseCode] || { bg: 'from-indigo-900 to-slate-900', title: '학교 디자인 리메이크' }

  if (isBefore) {
    return (
      <div className="w-full h-full p-6 bg-slate-100 text-slate-800 flex flex-col justify-between select-none">
        <div className="space-y-1 text-center">
          <span className="text-xs font-bold text-rose-600">[초기 시안] 원리 미적용으로 인한 가독성 및 탐색 저하</span>
          <h3 className="text-base font-bold text-slate-900">{meta.title} (개선 전)</h3>
        </div>
        <div className="my-auto p-4 border border-slate-300 rounded bg-white text-xs space-y-2 text-slate-600">
          <p>• 정보의 우선순위 구분이 모호하여 어디를 먼저 봐야 할지 혼란스럽습니다.</p>
          <p>• 시각적 여백과 그룹화(게슈탈트 원리)가 부족하여 인지 과부하가 발생합니다.</p>
          <p>• 행동 유도 버튼(CTA)의 크기와 대비가 충분하지 않아 조작 실수가 잦습니다.</p>
        </div>
        <p className="text-[10px] text-slate-400 text-center">DesignMind 108 학교 디자인 진단 아카이브</p>
      </div>
    )
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br ${meta.bg} text-white p-6 flex flex-col justify-between rounded-xl shadow-xl select-none`}>
      <div className="flex items-center justify-between border-b border-white/20 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold tracking-wide text-white">{meta.title}</h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
          {caseCode} · AFTER
        </span>
      </div>

      <div className="my-auto space-y-3 py-4">
        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2 shadow-inner">
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
            Key Design Psychological Architecture
          </span>
          <p className="text-sm font-semibold text-white leading-relaxed">
            시각적 위계, 명도 대비, 친숙한 멘탈 모델을 조화롭게 결합하여 인지 부하를 60% 경감했습니다.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-1">
            <span className="text-emerald-400 font-bold">✓ 명확한 시각 단서</span>
            <p className="text-[11px] text-white/70">핵심 정보와 보조 정보를 여백으로 명확히 분리</p>
          </div>
          <div className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-1">
            <span className="text-indigo-300 font-bold">✓ 인지 마찰 최소화</span>
            <p className="text-[11px] text-white/70">단 2회의 터치만으로 원하는 행동을 완수하도록 설계</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-white/60">
        <span>교육청 디자인 가이드라인 준수</span>
        <span className="text-emerald-300 font-semibold">100% 학교 현장 실전 맞춤 설계</span>
      </div>
    </div>
  )
}
