import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, 'data')

const patches = [
  {
    file: 'effects_001_025.js',
    find: 'oneLiner: "새로운 도구를 처음 만났을 땐 열광하지만 익숙해지면 현실적인 피로가 찾아온다."',
    replace: 'oneLiner: "새 도구를 처음 만났을 땐 열광하지만 점차 피로감이 찾아온다."'
  },
  {
    file: 'effects_001_025.js',
    find: 'oneLiner: "열등한 미끼 선택지를 슬쩍 끼워 넣으면 특정 목표 선택지가 훨씬 이득처럼 보인다."',
    replace: 'oneLiner: "미끼 선택지를 끼워 넣으면 목표 선택지가 훨씬 이득처럼 보인다."'
  },
  {
    file: 'effects_053_078.js',
    find: 'oneLiner: "명암이 변하는 경계선 옆에 실제로는 없는 가상의 밝고 어두운 띠가 맺힌다."',
    replace: 'oneLiner: "명암 경계선 옆에 실제로는 없는 가상의 밝고 어두운 띠가 맺힌다."'
  },
  {
    file: 'effects_053_078.js',
    find: 'oneLiner: "같은 크기의 원도 큰 테두리 안에선 작아 보이고, 작은 테두리에선 커 보인다."',
    replace: 'oneLiner: "같은 원도 큰 테두리에선 작아 보이고, 작은 테두리에선 커 보인다."'
  },
  {
    file: 'effects_079_108.js',
    find: 'oneLiner: "빨강 계열의 난색은 온기와 활력을, 파랑 계열의 한색은 냉정과 차분함을 준다."',
    replace: 'oneLiner: "빨강 계열은 온기와 활력을, 파랑 계열은 냉정과 차분함을 준다."'
  },
  {
    file: 'effects_079_108.js',
    find: 'oneLiner: "어둡고 짙은 색은 묵직하게 무겁고, 밝은 파스텔색은 깃털처럼 가볍게 느껴진다."',
    replace: 'oneLiner: "어둡고 짙은 색은 무겁고, 밝은 파스텔색은 깃털처럼 가볍게 느껴진다."'
  },
  {
    file: 'effects_079_108.js',
    find: 'oneLiner: "색깔과 맛의 연결이 어긋나면 뇌가 혼란에 빠져 실제 맛조차 분간하지 못한다."',
    replace: 'oneLiner: "색깔과 맛이 어긋나면 뇌가 혼란에 빠져 실제 맛조차 분간하지 못한다."'
  },
  {
    file: 'effects_079_108.js',
    find: 'oneLiner: "두 영역이 겹칠 때 면적이 작은 쪽이 주인공으로, 넓은 쪽이 배경이 된다."',
    replace: 'oneLiner: "두 영역이 겹칠 때 작은 쪽이 주인공으로, 넓은 쪽이 배경이 된다."'
  },
  {
    file: 'effects_079_108.js',
    find: 'oneLiner: "컴퓨터의 반응 시간이 0.4초 이내일 때 사람의 작업 몰입도가 극대화된다."',
    replace: 'oneLiner: "반응 시간이 0.4초 이내일 때 사람의 작업 몰입도가 극대화된다."'
  }
]

for (const p of patches) {
  const filePath = path.join(dataDir, p.file)
  const content = fs.readFileSync(filePath, 'utf-8')
  if (content.includes(p.find)) {
    fs.writeFileSync(filePath, content.replace(p.find, p.replace), 'utf-8')
    console.log(`[patch] ${p.file} -> 성공: ${p.replace.slice(0, 30)}...`)
  } else {
    console.warn(`[patch] ${p.file} -> 패턴 미발견: ${p.find.slice(0, 30)}...`)
  }
}
