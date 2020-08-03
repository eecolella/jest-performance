import Table from 'cli-table'
import R from 'ramda'
import colors from 'colors'
import { head, Bench, Test } from './constants'

/**
 *
 *
 *
 *
 * ~~~ table
 *
 */
const table = new Table({
  head,
})

/**
 *
 *
 *
 *
 * ~~~ renderTable
 *
 */
const renderTable = (benches: Bench[], suiteName: string): void => {
  R.forEach((bench: Bench) => {
    const avgErrorPc =
      R.compose(R.sum, R.pluck('errorPc'))(bench.tests) / bench.tests.length
    R.forEach((test: Test): void => {
      table.push([
        new Date(bench.date).toLocaleString(),
        bench.git.branch,
        bench.git.commit,
        colors[bench.git.changes > 0 ? 'red' : 'green'](`${bench.git.changes}`),
        test.name,
        `${test.durationMicroSeconds.toFixed(3)} µs`,
        `${test.opsForSeconds.toFixed(3)} hz`,
        colors[test.errorPc < avgErrorPc ? 'green' : 'red'](
          `${test.errorPc.toFixed(3)} %`,
        ),
        test.samplesCount,
        colors[test.runSlowerRatio > 1 ? 'red' : 'green'](
          `${test.runSlowerRatio.toFixed(3)}x`,
        ),
      ])
    })(bench.tests)
  })(benches)

  console.log(`\n${colors.yellow.bold(suiteName)}\n${table.toString()}`)
}

/**
 *
 *
 *
 *
 * ~~~ default
 *
 */
export default renderTable
