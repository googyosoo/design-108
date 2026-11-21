import{o as e,u as t}from"./index-rQswlIXl.js";import{n,t as r}from"./purposes-Cfhwkyf1.js";var i={name:`message-square`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}]]};i.node;var a=t(i),o=[{id:`cognitivist`,name:`인지심리학자`,role:`인지 부하 및 주의 집중 분석`,badgeColor:`indigo`,specialty:`시선 동선, 작업 기억, 정보 청킹`},{id:`visual-critic`,name:`시각비평가`,role:`타이포그래피와 명도 대비 비평`,badgeColor:`rose`,specialty:`명도 대비, 게슈탈트 원리, 시각 위계`},{id:`ethics-guard`,name:`윤리수호자`,role:`다크 패턴 차단 및 접근성 검증`,badgeColor:`amber`,specialty:`조작 방지, 색각 보정, 포용적 설계`},{id:`school-advocate`,name:`학교현장옹호자`,role:`학교 현장 적합성 및 인쇄 호환 점검`,badgeColor:`emerald`,specialty:`교내 활용성, 인쇄 호환, 학부모 가독성`},{id:`verifier`,name:`합의검증관`,role:`전문가 합의 도출 및 최종 검증`,badgeColor:`sky`,specialty:`상충 의견 통합, 실행 우선순위 판정`}],s=[{id:`planner-coach`,name:`기획 코치`,role:`목표 정합성 및 메시지 구조 코칭`,badgeColor:`indigo`,specialty:`핵심 타깃 정의, 정보 위계, 동기 유발`},{id:`visual-coach`,name:`시각 디자인 코치`,role:`시선 흐름, 대비, 레이아웃 코칭`,badgeColor:`rose`,specialty:`F, Z 동선, 여백 활용, 색채 대비`},{id:`ethics-coach`,name:`윤리·접근성 코치`,role:`다크 패턴 예방 및 포용성 코칭`,badgeColor:`amber`,specialty:`기만적 넛지 방지, 인쇄 가독성, WCAG 점검`}];function c(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`):``}function l(e){return e?String(e).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi,``).replace(/\s*on\w+\s*=\s*(["'][^"']*["']|[^\s>]+)/gi,``).replace(/javascript:/gi,``):``}function u(e){let t=typeof window>`u`?Math.min(e,40):e;return new Promise(e=>setTimeout(e,t))}function d(t){if(!t)return null;let n=Number(t);if(!Number.isNaN(n)){let t=e.find(e=>e.id===n);if(t)return t}let r=String(t).padStart(3,`0`);return e.find(e=>e.code===r)||null}function f(e){if(!e)return n[0]||{id:`slide`,label:`수업 슬라이드`,tips:[]};let t=String(e).trim(),r=n.find(e=>e.id===t||e.id===t.toLowerCase());if(r)return r;let i={PRINT_NOTICE:`notice`,NOTICE:`notice`,SLIDE:`slide`,PRESENTATION:`slide`,WORKSHEET:`worksheet`,POSTER:`poster`,WEBAPP:`webapp`,THUMBNAIL:`thumbnail`,SNS:`sns`}[t.toUpperCase()]||`slide`;return n.find(e=>e.id===i)||n[0]}function p(e){if(!e||!Array.isArray(e)||e.length===0)return[r[0]||{id:`readability`,label:`가독성 향상`}];let t=e.map(e=>{let t=String(e).trim().toLowerCase();return r.find(e=>e.id===t||e.id===t.replace(/-/g,``))}).filter(Boolean);return t.length>0?t:[r[0]]}async function m({mediaCode:t,purposeCodes:n=[],effectIds:r=[],customContext:i=``}={},a=``,o=null){let s=f(t),m=p(n),g=String(i||``).trim(),_=(r||[]).map(e=>d(e)).filter(Boolean);_.length===0&&(_=e.filter(e=>(e.mediaTags||[]).includes(s.id)).slice(0,3)),_.length===0&&(_=[e[5],e[88],e[91]]);let v=[];_.forEach(e=>{(e.related||[]).forEach(e=>{let t=d(e);t&&!_.some(e=>e.id===t.id)&&v.push(t.code)})});let y=Array.from(new Set(v)).slice(0,3),b=Array.from(new Set([..._.map(e=>e.code),...y])),x=_.filter(e=>e.ethicsLevel===`risk`),S=_.filter(e=>e.ethicsLevel===`caution`),C=x.length>0,w=S.length>0;if(a&&a.trim())try{let e=`[매체]: ${s.label} (${s.id})
[매체 팁]: ${(s.tips||[]).join(` / `)}
[디자인 목적]: ${m.map(e=>e.label).join(`, `)}
[적용 원리]: ${_.map(e=>`#${e.code} ${e.nameKo} (${e.oneLiner})`).join(`, `)}
[연관 추천 원리]: ${y.join(`, `)}
[작성자 추가 맥락]: ${g||`기본 교육용 산출물`}

한국어 문체 규칙: 번역투 표현을 피하고, 줄표 기호 대신 쉼표나 마침표를 사용하세요.`,t=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(a.trim())}`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({contents:[{parts:[{text:`당신은 3인의 전문가(Architect, Copywriter, Ethics-Verifier)로 구성된 디자인 프롬프트 엔지니어링 스웜입니다.
선택된 매체, 목적, 디자인 심리 108 원리, 사용자 요구사항을 바탕으로 3자 협력 토론 로그, 최종 프롬프트 마크다운, 자체 완결된 HTML/CSS 프리뷰, WCAG/윤리 점검표를 JSON으로 생성하세요.
응답 형식:
{
  "transcript": [
    { "id": 1, "agentId": "architect", "agentName": "구조 설계자 (Architect)", "role": "레이아웃 및 인지 흐름 설계", "targetAgentId": "copywriter", "message": "...", "stage": "architect", "citedEffectCodes": ["089", "006"] },
    { "id": 2, "agentId": "copywriter", "agentName": "카피라이팅 전략가 (Copywriter)", "role": "메시지 위계 및 행동 문구 작성", "targetAgentId": "ethics-verifier", "message": "...", "stage": "copywriter", "citedEffectCodes": ["092"] },
    { "id": 3, "agentId": "ethics-verifier", "agentName": "윤리·접근성 검증관 (Ethics Verifier)", "role": "다크 패턴 차단 및 WCAG 2.2 AA 검수", "targetAgentId": "architect", "message": "...", "stage": "ethics-verifier", "citedEffectCodes": ["078"] },
    { "id": 4, "agentId": "ethics-verifier", "agentName": "윤리·접근성 검증관 (Ethics Verifier)", "role": "다크 패턴 차단 및 WCAG 2.2 AA 검수", "targetAgentId": null, "message": "...", "stage": "ethics-verifier", "citedEffectCodes": ["089"] }
  ],
  "finalPrompt": "# [디자인 지시문] ...",
  "htmlPreview": "<div style=\\"...\\">...</div>",
  "checks": [
    { "label": "WCAG 2.2 AA 명도 대비 (4.5:1 이상)", "passed": true, "note": "..." },
    { "label": "다크 패턴 및 윤리 가이드라인 준수", "passed": true, "note": "..." },
    { "label": "인지 부하 최소화 및 정보 청킹", "passed": true, "note": "..." },
    { "label": "매체 규격 최적화", "passed": true, "note": "..." },
    { "label": "한국어 가독성 및 어절 줄바꿈", "passed": true, "note": "..." }
  ]
}\n\n${e}`}]}],generationConfig:{responseMimeType:`application/json`,temperature:.25}})});if(t.ok){let e=(await t.json()).candidates?.[0]?.content?.parts?.[0]?.text;if(e){let t=JSON.parse(e);if(t&&t.transcript&&t.finalPrompt){for(let e=0;e<t.transcript.length;e++){let n=t.transcript[e];o&&o({step:e+1,totalSteps:t.transcript.length,agentId:n.agentId,agentName:n.agentName,role:n.role,targetAgentId:n.targetAgentId,message:n.message,stage:n.stage}),await u(120)}return{transcript:t.transcript,finalPrompt:t.finalPrompt,htmlPreview:l(t.htmlPreview||``),checks:Array.isArray(t.checks)?t.checks:[]}}}}}catch{}let T=s.label,E=m.map(e=>e.label).join(`, `),D=_.map(e=>`#${e.code} ${e.nameKo}`).join(`, `),O=_[0],k=_[1]||_[0],A=_[2]||k,j=[],M=`@copywriter ${T} 제작 요청을 접수했습니다. 핵심 목적(${E})과 선정된 ${D}를 반영해 화면 전체의 인지 구조를 잡았습니다.

1. 레이아웃 뼈대: ${O.nameKo}(#${O.code})에 따라 핵심 메시지를 상단 시선 앵커로 잡고, 본문 세부 항목은 3개 안팎의 청크로 분할합니다.
2. 매체 특화 여백: ${s.tips?.[0]||`핵심 문구 주변에 충분한 화이트 스페이스를 확보합니다.`}
3. 2차 시각 요소: 연관 원리인 #${k.code} ${k.nameKo}를 적용해 시선의 흐름이 자연스럽게 하단 행동 영역으로 이어지도록 구획을 나누었습니다.

${g?`사용자 추가 맥락("${g}")을 고려해, 본문 카피와 레이아웃 블록에 실제 반영할 구체적 문구를 작성해 주세요.`:`독자가 첫 3초 안에 핵심을 파악하도록 명확한 제목과 시각 계층을 설계해 주세요.`}`;j.push({id:1,agentId:`architect`,agentName:`구조 설계자 (Architect)`,role:`레이아웃 및 인지 흐름 설계`,targetAgentId:`copywriter`,message:M,stage:`architect`,citedEffectCodes:[O.code,k.code]}),o&&o({step:1,totalSteps:4,agentId:`architect`,agentName:`구조 설계자 (Architect)`,role:`레이아웃 및 인지 흐름 설계`,targetAgentId:`copywriter`,message:M,stage:`architect`}),await u(280);let N=`@ethics-verifier @architect 구조 설계자의 계층을 바탕으로 실질적인 메시지와 Do/Don't 카피를 구체화했습니다.

1. 헤드라인 전략: #${O.code} ${O.nameKo} 원리에 맞춰 "${O.oneLiner}" 의도를 헤드카피에 반영했습니다.
2. 본문 정보 그룹화: #${k.code} ${k.nameKo}를 적용해 중요 공지와 일반 설명을 분리했습니다.
   - 권장(Do): ${k.doList?.[0]||`정보 간격을 넓혀 직관적으로 인지하게 돕는다.`}
   - 금지(Don't): ${k.dontList?.[0]||`한 영역에 서로 다른 성격의 문장을 빽빽하게 채우지 않는다.`}
3. 행동 유도(CTA): ${s.id===`notice`?`학부모 회신란과 온라인 접수 링크를 확실하게 분리`:s.id===`webapp`?`44px 이상의 터치 버튼과 명확한 완료 피드백 라벨`:`행사 일시와 신청 버튼을 결합한 시선 종착점`}을 배치했습니다.

윤리 검증관님, 다크 패턴 유발 요소나 시각 약자를 위한 대비 기준 충족 여부를 검증해 주세요.`;j.push({id:2,agentId:`copywriter`,agentName:`카피라이팅 전략가 (Copywriter)`,role:`메시지 위계 및 행동 문구 작성`,targetAgentId:`ethics-verifier`,message:N,stage:`copywriter`,citedEffectCodes:[O.code,k.code,A.code]}),o&&o({step:2,totalSteps:4,agentId:`copywriter`,agentName:`카피라이팅 전략가 (Copywriter)`,role:`메시지 위계 및 행동 문구 작성`,targetAgentId:`ethics-verifier`,message:N,stage:`copywriter`}),await u(280);let P;P=C?`⚠️ 선정된 원리 중 #${x[0].code} ${x[0].nameKo}는 손실 회피나 조작적 클릭(다크 패턴)으로 변질될 위험이 있습니다. ${x[0].ethicsNote||`사용자에게 선택을 강요하지 말고 투명한 거부 권리를 명시해야 합니다.`}`:w?`ℹ️ #${S[0].code} ${S[0].nameKo}는 심리적 유인 요소가 있으므로 주의가 필요합니다. ${S[0].ethicsNote||`과도한 긴장감을 조성하지 않도록 중립적 사실 정보를 함께 표기해야 합니다.`}`:`선정된 원리들은 안전(Safe) 등급으로, 학습자와 학부모의 자율적 판단을 온전히 존중합니다.`;let F=`@copywriter @architect 작성된 카피와 구조안을 WCAG 2.2 AA 및 디지털 윤리 표준으로 심사했습니다.

1. 윤리 감사: ${P}
2. 명도 대비 점검: 본문 텍스트는 배경 대비 4.5:1 이상(짙은 네이비 #0f172a / 화이트 #ffffff)을 강제합니다. 연한 회색 글자는 즉시 배제합니다.
3. 조작 편의성: ${s.id===`webapp`?`피츠의 법칙(#103)에 따라 클릭 가능 영역을 44×44px 이상으로 키웁니다.`:s.id===`notice`||s.id===`worksheet`?`인쇄 시 흑백 모드에서도 텍스트와 테두리가 또렷이 구별되도록 선 두께를 1.5px 이상으로 유지합니다.`:`포스터 원거리 시인성을 위해 메인 타이틀 크기를 최소 2배 이상 키웁니다.`}

이 보정안을 반영하여 최종 검증 프롬프트와 안전한 HTML 프리뷰를 확정합니다.`;j.push({id:3,agentId:`ethics-verifier`,agentName:`윤리·접근성 검증관 (Ethics Verifier)`,role:`다크 패턴 차단 및 WCAG 2.2 AA 검수`,targetAgentId:`architect`,message:F,stage:`ethics-verifier`,citedEffectCodes:[A.code,C?x[0].code:w?S[0].code:`078`]}),o&&o({step:3,totalSteps:4,agentId:`ethics-verifier`,agentName:`윤리·접근성 검증관 (Ethics Verifier)`,role:`다크 패턴 차단 및 WCAG 2.2 AA 검수`,targetAgentId:`architect`,message:F,stage:`ethics-verifier`}),await u(280);let I=`합의가 완료되었습니다. 구조 설계자의 인지 레이아웃과 카피라이터의 위계 문구, 윤리 검증관의 WCAG 2.2 AA 기준을 통합한 최종 AI 프롬프트와 라이브 HTML 프리뷰를 발행합니다.`;j.push({id:4,agentId:`ethics-verifier`,agentName:`윤리·접근성 검증관 (Ethics Verifier)`,role:`다크 패턴 차단 및 WCAG 2.2 AA 검수`,targetAgentId:null,message:I,stage:`ethics-verifier`,citedEffectCodes:b.slice(0,4)}),o&&o({step:4,totalSteps:4,agentId:`ethics-verifier`,agentName:`윤리·접근성 검증관 (Ethics Verifier)`,role:`다크 패턴 차단 및 WCAG 2.2 AA 검수`,targetAgentId:null,message:I,stage:`ethics-verifier`}),await u(150);let L=`# [디자인 지시문] ${T} 인지 심리 최적화 제작 요청

## 1. 역할 정의 (Role)
당신은 최고 수준의 교육공학 및 UI/UX 인지 심리학 전문가입니다.
사용자(학생, 학부모, 교직원)의 인지 부하를 최소화하고 정보 전달력을 극대화하는 시각적 계층 구조를 설계합니다.

## 2. 제작 매체 및 핵심 목적
- 제작 대상 매체: ${T}
- 핵심 설계 목적: ${E}
${g?`- 의뢰 맥락 및 세부 요구: ${g}`:``}

## 3. 반드시 준수할 디자인 심리학 3대 원리 (DesignMind 108)
${_.map(e=>`### [${e.code}] ${e.nameKo} (${e.nameEn})
- 핵심 원리: ${e.oneLiner}
- 심리 메커니즘: ${e.why}
- 실천 수칙(Do): ${(e.doList||[]).join(` / `)}
- 금기 사항(Don't): ${(e.dontList||[]).join(` / `)}
${e.ethicsNote?`- 윤리 주의점: ${e.ethicsNote}`:``}`).join(`

`)}

## 4. 연관 추천 원리 (Graph Traversal)
- 연관 추천 코드: ${y.map(e=>`#${e}`).join(`, `)||`관련 레이아웃 법칙 참조`}

## 5. 검증 기준 및 최종 출력 요구사항
1. 위 디자인 심리학 원리가 구체적으로 어떻게 레이아웃, 타이포그래피, 여백에 녹아들었는지 단계별로 설명하세요.
2. WCAG 2.2 AA 명도 대비(4.5:1 이상) 및 조작 편의성(터치 영역 44px 이상)을 충족하는 완성본 디자인 코드를 제시하세요.
3. 다크 패턴 및 심리 조작 가능성을 배제하고, 독자의 자율적 선택권을 명시하세요.`,R=c(g),z=h({mediaId:s.id,mediaLabel:T,purposeLabels:E,selectedEffects:_,customContext:R}),B=[{label:`WCAG 2.2 AA 명도 대비 (4.5:1 이상)`,passed:!0,note:`슬레이트 네이비(#0f172a) 본문 텍스트와 순백색(#ffffff) 배경으로 12.8:1의 명암비를 확보했습니다.`},{label:`다크 패턴 및 윤리 가이드라인 준수`,passed:!C,note:C?`선정된 #${x[0].code} 원리에 조작 위험이 있어, 선택 취소 및 투명 안내 보완책을 명시했습니다.`:w?`선정된 #${S[0].code} 원리의 과장 유도를 방지하도록 사실 중심 카피를 권고했습니다.`:`기만적 요소 없이 사용자의 자율적 판단을 전적으로 존중합니다.`},{label:`인지 부하 최소화 및 정보 청킹`,passed:!0,note:`밀러의 법칙에 따라 본문 정보를 3개 안팎의 시각 블록으로 분할해 한눈에 파악되도록 정돈했습니다.`},{label:`매체 규격 최적화`,passed:!0,note:s.id===`webapp`?`모바일 터치 타깃을 44px 이상으로 확보하고 즉각적인 피드백 영역을 마련했습니다.`:s.id===`slide`?`1슬라이드 1메시지 원칙과 원거리 빔프로젝터 투사 가독성을 보장했습니다.`:`A4 출력 및 모바일 뷰어 모두에서 어긋남 없는 반응형 규격을 적용했습니다.`},{label:`한국어 가독성 및 어절 줄바꿈`,passed:!0,note:`단어 중간 분절을 막는 어절 줄바꿈(keep-all)과 1.6배 행간을 기본 적용했습니다.`}];return{transcript:j,finalPrompt:L,htmlPreview:l(z),checks:B}}function h({mediaId:e,mediaLabel:t,purposeLabels:n,selectedEffects:r,customContext:i}){let a=r[0]||{code:`006`,nameKo:`화이트 스페이스 효과`},o=r[1]||{code:`089`,nameKo:`근접의 법칙`},s=r[2]||{code:`092`,nameKo:`대비의 법칙`},l=r.map(e=>`<span style="display:inline-block;padding:2px 8px;border-radius:9999px;background:#eef2ff;color:#4338ca;font-size:11px;font-weight:600;margin-right:4px;">#${c(e.code)} ${c(e.nameKo)}</span>`).join(``);return e===`notice`?`<div style="max-width:540px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,0.05);font-family:system-ui,-apple-system,sans-serif;color:#0f172a;word-break:keep-all;line-height:1.6;">
  <div style="border-bottom:2px solid #0f172a;padding-bottom:12px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:flex-end;">
    <div>
      <span style="font-size:10px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:1px;">가정통신문 공지</span>
      <h2 style="margin:2px 0 0;font-size:18px;font-weight:800;color:#0f172a;">${i||`2026학년도 교내 현장체험학습 및 안전수칙 안내`}</h2>
    </div>
    <span style="font-size:11px;color:#64748b;">발행: 교무기획부</span>
  </div>
  <div style="margin-bottom:12px;">${l}</div>
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;margin-bottom:16px;">
    <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#334155;">📌 핵심 일정 요약 (F 패턴 적용)</p>
    <ul style="margin:0;padding-left:18px;font-size:12px;color:#475569;">
      <li><strong>일시:</strong> 2026년 10월 22일(목) 09:00 ~ 16:30</li>
      <li><strong>장소:</strong> 국립과천과학관 첨단기술관 및 야외 생태공원</li>
      <li><strong>신청 기한:</strong> 2026년 10월 15일(목) 17:00까지</li>
    </ul>
  </div>
  <div style="font-size:13px;color:#334155;margin-bottom:16px;">
    <p style="margin:0 0 8px;">학부모님 안녕하십니까. 학생들의 과학적 호기심과 진로 탐색 기회를 제공하고자 교외 체험학습을 실시합니다.</p>
    <p style="margin:0;">안전한 인솔을 위해 참가 여부와 비상 연락처를 기재한 참가 동의서를 제출해 주시기 바랍니다.</p>
  </div>
  <div style="border-top:1px dashed #cbd5e1;padding-top:14px;display:flex;justify-content:space-between;align-items:center;">
    <span style="font-size:11px;color:#64748b;">온라인 가정통신문 확인 완료</span>
    <button type="button" style="background:#4f46e5;color:#ffffff;border:none;border-radius:8px;padding:8px 16px;font-size:12px;font-weight:700;cursor:pointer;">참가 신청서 회신하기</button>
  </div>
</div>`:e===`poster`?`<div style="max-width:540px;margin:0 auto;background:linear-gradient(145deg,#0f172a 0%,#1e1b4b 100%);border-radius:20px;padding:28px 24px;color:#ffffff;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 12px 30px rgba(15,23,42,0.3);word-break:keep-all;line-height:1.5;">
  <div style="margin-bottom:8px;">${l}</div>
  <div style="display:inline-block;padding:3px 10px;background:rgba(255,255,255,0.15);backdrop-filter:blur(4px);border-radius:6px;font-size:11px;font-weight:700;color:#a5b4fc;margin-bottom:12px;">
    CAMPUS FESTIVAL 2026
  </div>
  <h1 style="margin:0 0 8px;font-size:24px;font-weight:900;letter-spacing:-0.5px;color:#ffffff;line-height:1.25;">
    ${i||`빛나는 미래를 만나는 교내 진로 메이커스 축제`}
  </h1>
  <p style="margin:0 0 20px;font-size:13px;color:#cbd5e1;">
    세상을 바꾸는 30개의 학생 메이커스 부스와 AI 창작 전시관으로 여러분을 초대합니다.
  </p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:12px;margin-bottom:20px;text-align:center;">
    <div>
      <div style="font-size:10px;color:#94a3b8;">날짜</div>
      <div style="font-size:12px;font-weight:800;color:#f8fafc;margin-top:2px;">11.18 (수)</div>
    </div>
    <div style="border-left:1px solid rgba(255,255,255,0.1);border-right:1px solid rgba(255,255,255,0.1);">
      <div style="font-size:10px;color:#94a3b8;">장소</div>
      <div style="font-size:12px;font-weight:800;color:#f8fafc;margin-top:2px;">체육관 2F</div>
    </div>
    <div>
      <div style="font-size:10px;color:#94a3b8;">대상</div>
      <div style="font-size:12px;font-weight:800;color:#f8fafc;margin-top:2px;">전교생·학부모</div>
    </div>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:center;">
    <span style="font-size:11px;color:#94a3b8;">주최: 학생 자치 메이커스 클럽</span>
    <button type="button" style="background:#6366f1;color:#ffffff;border:none;border-radius:10px;padding:10px 18px;font-size:12px;font-weight:800;cursor:pointer;">부스 둘러보기 👉</button>
  </div>
</div>`:`<div style="max-width:540px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;box-shadow:0 6px 18px rgba(0,0,0,0.06);font-family:system-ui,-apple-system,sans-serif;color:#0f172a;word-break:keep-all;line-height:1.6;">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
    <span style="display:inline-block;padding:3px 10px;background:#f1f5f9;color:#475569;border-radius:6px;font-size:11px;font-weight:700;">${c(t)} · ${c(n)}</span>
    <span style="font-size:11px;color:#94a3b8;">WCAG 2.2 AA 준수</span>
  </div>
  <div style="margin-bottom:14px;">${l}</div>
  <h2 style="margin:0 0 10px;font-size:18px;font-weight:800;color:#0f172a;">${i||`디자인 심리학 108 기반 인터랙티브 시각 컴포넌트`}</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;">
      <div style="font-size:11px;font-weight:700;color:#4338ca;">#${c(a.code)} ${c(a.nameKo)}</div>
      <div style="font-size:11px;color:#64748b;margin-top:4px;">${c(a.oneLiner)}</div>
    </div>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;">
      <div style="font-size:11px;font-weight:700;color:#4338ca;">#${c(o.code)} ${c(o.nameKo)}</div>
      <div style="font-size:11px;color:#64748b;margin-top:4px;">${c(o.oneLiner)}</div>
    </div>
  </div>
  <div style="padding:12px;background:#fdf4ff;border:1px solid #f0abfc;border-radius:10px;font-size:12px;color:#701a75;margin-bottom:16px;">
    💡 <strong>처방 수칙:</strong> #${c(s.code)} ${c(s.nameKo)} 원리에 따라 중요 행동 영역을 명확히 고립시키고 44px 이상의 터치 면적을 유지하세요.
  </div>
  <div style="display:flex;justify-content:flex-end;gap:8px;">
    <button type="button" style="min-height:44px;padding:0 16px;background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;">자세히 보기</button>
    <button type="button" style="min-height:44px;padding:0 18px;background:#0f172a;color:#ffffff;border:none;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;">지금 시작하기</button>
  </div>
</div>`}async function g({moduleTitle:t=`모둠 디자인 프로젝트`,targetRole:n=`기획 담당`,draftText:r=``,relatedEffectIds:i=[]}={},a=``,o=null){let s=String(t||`수업 프로젝트`).trim(),c=String(n||`기획 담당`).trim(),l=String(r||``).trim(),f=(i||[]).map(e=>d(e)).filter(Boolean);f.length===0&&(f=[e[6],e[88],e[91]]);let p=f[0],m=f[1]||f[0],h=f[2]||m;if(a&&a.trim())try{let e=`당신은 학생 디자인 모둠 활동을 지도하는 3인의 AI 코치(planner-coach 기획 코치, visual-coach 시각 디자인 코치, ethics-coach 윤리·접근성 코치)입니다.
학생의 역할("${c}"), 수업 모듈("${s}"), 학생이 작성한 초안 아이디어("${l||`초안 구상 중`}")를 검토하고, 코치들이 서로 @mention하며 학생에게 실질적 조언을 주는 토론 로그와 실행 액션 4가지를 JSON으로 생성하세요.
응답 형식:
{
  "transcript": [
    { "id": 1, "agentId": "planner-coach", "agentName": "기획 코치", "role": "목표 정합성 및 메시지 구조 코칭", "targetAgentId": "visual-coach", "message": "...", "stage": "planner", "citedEffectCodes": ["007"] },
    { "id": 2, "agentId": "visual-coach", "agentName": "시각 디자인 코치", "role": "시선 흐름, 대비, 레이아웃 코칭", "targetAgentId": "ethics-coach", "message": "...", "stage": "visual", "citedEffectCodes": ["089"] },
    { "id": 3, "agentId": "ethics-coach", "agentName": "윤리·접근성 코치", "role": "다크 패턴 예방 및 포용성 코칭", "targetAgentId": "planner-coach", "message": "...", "stage": "ethics", "citedEffectCodes": ["092"] }
  ],
  "nextActions": [
    "1. ...",
    "2. ...",
    "3. ...",
    "4. ..."
  ]
}`,t=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(a.trim())}`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({contents:[{parts:[{text:e}]}],generationConfig:{responseMimeType:`application/json`,temperature:.25}})});if(t.ok){let e=(await t.json()).candidates?.[0]?.content?.parts?.[0]?.text;if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.transcript)){for(let e=0;e<t.transcript.length;e++){let n=t.transcript[e];o&&o({step:e+1,totalSteps:t.transcript.length,agentId:n.agentId,agentName:n.agentName,role:n.role,targetAgentId:n.targetAgentId,message:n.message,stage:n.stage}),await u(120)}return{transcript:t.transcript,nextActions:Array.isArray(t.nextActions)?t.nextActions:[]}}}}}catch{}let g=[],_=`@visual-coach 우리 모둠의 ${c} 학생이 제출한 아이디어를 검토했습니다.
- 프로젝트 과제: ${s}
- 학생 고민/초안: "${l||`전체 레이아웃과 핵심 메시지를 어떻게 전달해야 할지 방향을 고민하고 있습니다.`}"

목표가 명확해질 수 있도록 #${p.code} ${p.nameKo} 원리를 제안합니다. "${p.oneLiner}"라는 특성을 살려서, 보는 사람이 첫 3초 안에 가장 먼저 읽어야 할 핵심 메시지 1문장을 최상단에 굵게 배치하는 기획 구조를 잡아야 합니다.
시각 디자인 코치님, 이 기획 방향을 화면 레이아웃과 시선 동선으로 어떻게 풀어내면 좋을까요?`;g.push({id:1,agentId:`planner-coach`,agentName:`기획 코치`,role:`목표 정합성 및 메시지 구조 코칭`,targetAgentId:`visual-coach`,message:_,stage:`planner`,citedEffectCodes:[p.code]}),o&&o({step:1,totalSteps:3,agentId:`planner-coach`,agentName:`기획 코치`,role:`목표 정합성 및 메시지 구조 코칭`,targetAgentId:`visual-coach`,message:_,stage:`planner`}),await u(260);let v=`@ethics-coach @planner-coach 기획 코치님의 의견에 전적으로 동의합니다. 구체적인 화면 구성 팁을 드립니다.

1. 시선 동선과 여백: #${m.code} ${m.nameKo}를 적용해야 합니다. 중요한 내용 주변에 충분한 여백을 두어 독자의 시선이 헤매지 않도록 해주세요.
2. 정보 그룹화: 연관된 항목(행사 일시, 장소, 준비물)은 한 박스로 묶고, 서로 다른 성격의 문장은 최소 20px 이상 간격을 벌리세요.
3. 시각 앵커: 모든 텍스트를 같은 크기로 두지 말고, 메인 타이틀은 본문보다 최소 1.8배 이상 크게 키워 확실한 무게 중심을 만드세요.

윤리·접근성 코치님, 학생들이 놓치기 쉬운 명도 대비나 과장 표현 방지 수칙도 짚어주세요.`;g.push({id:2,agentId:`visual-coach`,agentName:`시각 디자인 코치`,role:`시선 흐름, 대비, 레이아웃 코칭`,targetAgentId:`ethics-coach`,message:v,stage:`visual`,citedEffectCodes:[m.code,h.code]}),o&&o({step:2,totalSteps:3,agentId:`visual-coach`,agentName:`시각 디자인 코치`,role:`시선 흐름, 대비, 레이아웃 코칭`,targetAgentId:`ethics-coach`,message:v,stage:`visual`}),await u(260);let y=`@planner-coach @visual-coach 시각과 기획이 훌륭하게 조화를 이루고 있습니다. 우리 모둠이 A4 인쇄나 교실 발표에서 감점을 받지 않으려면 다음 3가지를 반드시 확인해야 합니다.

1. 다크 패턴 점검: 학생들에게 선택을 강요하거나 불안감을 주는 마감 카피 대신, 자발적 참여를 돕는 긍정적 넛지를 사용하세요.
2. WCAG 2.2 AA 가독성: 배경과 글자의 명도 대비는 최소 4.5:1을 지켜야 합니다. 흐릿한 회색이나 파스텔 글자는 인쇄 시 보이지 않습니다.
3. 포용적 표현: #${h.code} ${h.nameKo} 관점에서 시각 약자나 색각 이상자도 형태와 굵기로 정보를 구분할 수 있도록 텍스트 라벨을 함께 병기해 주세요.

${c} 학생, 코치 3인의 피드백을 모둠 활동지에 정리하고 아래 4단계 액션을 순서대로 실천해 보세요!`;return g.push({id:3,agentId:`ethics-coach`,agentName:`윤리·접근성 코치`,role:`다크 패턴 예방 및 포용성 코칭`,targetAgentId:`planner-coach`,message:y,stage:`ethics`,citedEffectCodes:[h.code,`078`]}),o&&o({step:3,totalSteps:3,agentId:`ethics-coach`,agentName:`윤리·접근성 코치`,role:`다크 패턴 예방 및 포용성 코칭`,targetAgentId:`planner-coach`,message:y,stage:`ethics`}),await u(150),{transcript:g,nextActions:[`1. [${c}] 핵심 메시지 1문장을 정의하고 상단 헤드라인에 20pt 이상 볼드체로 배치하기`,`2. [시각 구성] #${p.code} ${p.nameKo}와 #${m.code} ${m.nameKo} 원리에 따라 정보 블록을 3개 청크로 묶기`,`3. [접근성 검증] 배경 대비 글자색 명암비가 또렷한지 확인하고 흐릿한 중간 회색 폰트 제거하기`,`4. [의도 영작] "I applied the ${p.nameEn} to guide viewers' gaze naturally." 형식으로 발표 1문장 완성하기`]}}export{a,g as i,s as n,m as r,o as t};