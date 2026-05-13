import { Lab, Progress } from '@prisma/client'

const LAB_ORDER: Lab[] = ['ECO_LAB', 'MIND_LAB', 'ART_LAB', 'TECH_LAB', 'LIFE_LAB']

export function computeUnlockedWeeks(rows: Progress[]): Record<Lab, number[]> {
  const completed = new Set(rows.filter((r) => r.isCompleted).map((r) => `${r.lab}:${r.week}`))

  const result = {} as Record<Lab, number[]>

  for (let li = 0; li < LAB_ORDER.length; li++) {
    const lab = LAB_ORDER[li]
    result[lab] = []

    // first lab first week is always open
    if (li === 0) {
      result[lab].push(1)
    } else {
      // week 1 of this lab unlocks when all 4 weeks of the previous lab are done
      const prevLab = LAB_ORDER[li - 1]
      const prevDone = [1, 2, 3, 4].every((w) => completed.has(`${prevLab}:${w}`))
      if (!prevDone) continue
      result[lab].push(1)
    }

    // within a lab, each week unlocks after the previous is done
    for (let week = 2; week <= 4; week++) {
      if (completed.has(`${lab}:${week - 1}`)) {
        result[lab].push(week)
      }
    }
  }

  return result
}
