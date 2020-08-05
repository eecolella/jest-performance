import R from 'ramda'
import sg from 'simple-git/promise'
import { addRunSlowerRatio } from './utils'
import { Bench, Test, RawTest } from './constants'

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
  const gitStatus = await sg().status()
  const gitLog = await sg().log()

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
      R.filter(R.prop('stats')),
      R.values,
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
