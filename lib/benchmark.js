"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _benchmark = _interopRequireDefault(require("benchmark"));

var _path = _interopRequireDefault(require("path"));

var _renderTable = _interopRequireDefault(require("./renderTable"));

var _getBench = _interopRequireDefault(require("./getBench"));

var _saveHistory = _interopRequireDefault(require("./saveHistory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 *
 *
 * ~~~ benchmark
 *
 */
const benchmark = async function (discarded, racers) {
  const suiteName = this.currentTestName;
  const testPath = this.testPath;

  const testName = _path.default.basename(testPath);

  await new Promise(resolve => {
    const suite = new _benchmark.default.Suite(suiteName);
    racers.reduce((acc, [name, fun]) => {
      acc.add(name, fun);
      return acc;
    }, suite).on('complete', async function onComplete() {
      const bench = await (0, _getBench.default)(this);
      (0, _renderTable.default)([bench], suiteName);
      await (0, _saveHistory.default)(testPath, testName, bench);
      resolve();
    }).run();
  });
  return {
    message: () => `jest-performance`,
    pass: true
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


var _default = benchmark;
exports.default = _default;