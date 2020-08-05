import R from 'ramda'
import Benchmark from 'benchmark'
import path from 'path'
import { Racer } from './constants'
import renderTable from './renderTable'
import getBench from './getBench'
import saveHistory from './saveHistory'

/**
 *
 *
 *
 *
 * ~~~ benchmark
 *
 */
const benchmark = async function (
  discarded: undefined,
  racersObj: Record<string, Racer>,
): Promise<{
  message: () => string
  pass: boolean
}> {
  const suiteName = this.currentTestName
  const testPath = this.testPath
  const testName = path.basename(testPath)
  const racersPairs = R.toPairs(racersObj)

  await new Promise((resolve) => {
    const suite = new Benchmark.Suite(suiteName)

    racersPairs
      .reduce((acc, [name, fun]) => {
        acc.add(name, fun)
        return acc
      }, suite)
      .on('complete', async function onComplete() {
        const bench = await getBench(this)
        renderTable([bench], suiteName)
        await saveHistory(testPath, testName, bench)
        resolve()
      })
      .run()
  })

  return {
    message: (): string => `jest-performance`,
    pass: true,
  }
}

/**
 *
 *
 *
 *
 * ~~~ default
 *
 */
export default benchmark
