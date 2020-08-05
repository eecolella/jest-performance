import R from 'ramda'
import { addRunSlowerRatio } from './utils'
import { Bench, Test, RawTest } from './constants'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const git = require('simple-git/promise')()

/**
 *
 *
 *
 *
 * ~~~ getBench
 *
 */
const getBench = async (rawTests: RawTest[]): Promise<Bench> => {
  const date = new Date().toUTCString()
  const gitStatus = await git.status()
  const gitLog = await git.log()

  const branch = `${gitStatus.current} -> ${gitStatus.tracking}`
  const commit = `${gitLog.latest.hash}`
  const changes = gitStatus.files.length

  return {
    date,
    git: {
      branch,
      commit,
      changes,
    },
    tests: R.compose(
      addRunSlowerRatio,
      R.map(
        (test: RawTest): Test => ({
          name: test.name,
          samplesCount: test.stats.sample.length,
          errorPc: test.stats.rme,
          opsForSeconds: test.hz,
          durationMicroSeconds: 1000000 / test.hz,
          runSlowerRatio: 0,
        }),
      ),
      // @ts-ignore
      R.filter(R.prop('stats')),
      R.values,
      // @ts-ignore
    )(rawTests),
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
export default getBench
