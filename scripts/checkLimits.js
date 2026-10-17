import { effects001to025 } from './data/effects_001_025.js'
import { effects026to052 } from './data/effects_026_052.js'
import { effects053to078 } from './data/effects_053_078.js'
import { effects079to108 } from './data/effects_079_108.js'

const all = [
  ...effects001to025,
  ...effects026to052,
  ...effects053to078,
  ...effects079to108,
]

const errors = []

all.forEach((e) => {
  if (e.oneLiner.length > 40) {
    errors.push({ id: e.id, field: 'oneLiner', len: e.oneLiner.length, val: e.oneLiner })
  }
  if (e.why.length > 160) {
    errors.push({ id: e.id, field: 'why', len: e.why.length, val: e.why })
  }
  if (e.analogy.length > 80) {
    errors.push({ id: e.id, field: 'analogy', len: e.analogy.length, val: e.analogy })
  }
  if (e.apply.classroom.length > 90) {
    errors.push({ id: e.id, field: 'apply.classroom', len: e.apply.classroom.length, val: e.apply.classroom })
  }
  if (e.apply.webapp.length > 90) {
    errors.push({ id: e.id, field: 'apply.webapp', len: e.apply.webapp.length, val: e.apply.webapp })
  }
  if (e.apply.print.length > 90) {
    errors.push({ id: e.id, field: 'apply.print', len: e.apply.print.length, val: e.apply.print })
  }
  e.doList.forEach((d, i) => {
    if (d.length > 50) {
      errors.push({ id: e.id, field: `doList[${i}]`, len: d.length, val: d })
    }
  })
  e.dontList.forEach((d, i) => {
    if (d.length > 50) {
      errors.push({ id: e.id, field: `dontList[${i}]`, len: d.length, val: d })
    }
  })
  if ((e.ethicsLevel === 'caution' || e.ethicsLevel === 'risk') && (!e.ethicsNote || e.ethicsNote.length > 100)) {
    errors.push({ id: e.id, field: 'ethicsNote', len: e.ethicsNote ? e.ethicsNote.length : 0, val: e.ethicsNote })
  }
})

console.log('Total constraint errors:', errors.length)
errors.filter(err => err.id <= 77).forEach((err) => {
  console.log(`[#${err.id}] ${err.field} (${err.len}): ${err.val}`)
})
