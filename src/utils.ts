import fs from 'fs'
import util from 'util'
import R from 'ramda'
import { Test } from './constants'

/*
 *
 *
 *
 *
 * ~~~ promisify node stuff
 *
 */
export const readFilePromise = util.promisify(fs.readFile)
export const writeFilePromise = util.promisify(fs.writeFile)
export const existsPromise = util.promisify(fs.exists)
export const mkdirPromise = util.promisify(fs.mkdir)

/**
 *
 *
 *
 *
 * ~~~ addRunSlowerRatio
 *
 */
export const addRunSlowerRatio = (tests: Test[]): Test[] => {
  const faster = R.reduce(
    (acc, t: Test) => R.min(acc, t.durationMicroSeconds),
    Number.POSITIVE_INFINITY,
  )(tests)

  return R.map(
    (test: Test): Test => {
      return {
        ...test,
        runSlowerRatio: test.durationMicroSeconds / faster,
      }
    },
  )(tests)
}
