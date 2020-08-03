import path from 'path'
import { Bench } from './constants'
import {
  readFilePromise,
  writeFilePromise,
  existsPromise,
  mkdirPromise,
} from './utils'

/**
 *
 *
 *
 *
 * ~~~ saveHistory
 *
 */
const saveHistory = async function (
  testPath: string,
  testName: string,
  bench: Bench,
): Promise<void> {
  const testDirPath = path.dirname(testPath)
  const perfDirPath = path.join(testDirPath, '/__benchmarks__')
  const perfName = `${testName}.perf`
  const perfPath = path.join(perfDirPath, perfName)

  if (!(await existsPromise(perfDirPath))) {
    await mkdirPromise(perfDirPath)
  }

  let history: any
  if (await existsPromise(perfPath)) {
    history = JSON.parse(await readFilePromise(perfPath, 'utf8'))
  } else {
    history = []
  }

  await writeFilePromise(perfPath, JSON.stringify([...history, bench], null, 2))
}

/**
 *
 *
 *
 *
 * ~~~ default
 *
 */
export default saveHistory
