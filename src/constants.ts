import colors from 'colors'

/**
 *
 *
 *
 *
 * ~~~ types
 *
 */
export type Racer = [string, () => void]

export interface RawTest {
  name: string
  hz: number
  stats: { rme: number; sample: number[]; [key: string]: any }
  [key: string]: any
}

export interface Test {
  name: string
  samplesCount: number
  errorPc: number
  opsForSeconds: number
  durationMicroSeconds: number
  runSlowerRatio: number
}

export interface Bench {
  tests: Test[]
  date: string
  git: {
    branch: string
    commit: string
    changes: number
  }
}

/**
 *
 *
 *
 *
 * ~~~ constants
 *
 */
export const head = [
  colors.yellow.bold('date'),
  colors.yellow.bold('branch'),
  colors.yellow.bold('commit'),
  colors.yellow.bold('changes'),
  colors.yellow.bold('name'),
  colors.yellow.bold('duration'),
  colors.yellow.bold('ops/seconds'),
  colors.yellow.bold('% error'),
  colors.yellow.bold('samples'),
  colors.yellow.bold('run slower ratio'),
]
