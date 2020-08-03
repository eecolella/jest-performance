"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

var _promise = _interopRequireDefault(require("simple-git/promise"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 *
 *
 * ~~~ getBench
 *
 */
const getBench = async rawTests => {
  const date = new Date().toUTCString();
  const gitStatus = await (0, _promise.default)().status();
  const gitLog = await (0, _promise.default)().log();
  const branch = `${gitStatus.current} -> ${gitStatus.tracking}`;
  const commit = `${gitLog.latest.hash}`;
  const changes = gitStatus.files.length; // @ts-ignore

  return {
    date,
    git: {
      branch,
      commit,
      changes
    },
    tests: _ramda.default.compose(_utils.addRunSlowerRatio, _ramda.default.map(test => ({
      name: test.name,
      samplesCount: test.stats.sample.length,
      errorPc: test.stats.rme,
      opsForSeconds: test.hz,
      durationMicroSeconds: 1000000 / test.hz,
      runSlowerRatio: 0
    })), // @ts-ignore
    _ramda.default.filter(_ramda.default.prop('stats')), _ramda.default.values)(rawTests)
  };
};
/**
 *
 *
 *
 *
 * ~~~ default
 *
 */


var _default = getBench;
exports.default = _default;