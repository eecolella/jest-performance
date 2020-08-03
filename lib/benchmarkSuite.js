"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _benchmark = _interopRequireDefault(require("benchmark"));

var _colors = _interopRequireDefault(require("colors"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("./utils");

var _renderTable = _interopRequireDefault(require("./renderTable"));

var _getBench = _interopRequireDefault(require("./getBench"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 *
 *
 * ~~~ benchmark
 *
 */
const benchmark = async function (discarded, racers, options) {
  const suiteName = this.currentTestName;
  const testPath = this.testPath;

  const testName = _path.default.basename(testPath);

  const testDirPath = _path.default.dirname(testPath);

  const perfDirPath = _path.default.join(testDirPath, '/__benchmarks__');

  const perfName = `${testName}.perf`;

  const perfPath = _path.default.join(perfDirPath, perfName);

  await new Promise(resolve => {
    const suite = new _benchmark.default.Suite(suiteName);
    racers.reduce((acc, [name, fun]) => {
      acc.add(name, fun);
      return acc;
    }, suite).on('cycle', function (event) {
      console.log(_colors.default.yellow.bold(suiteName), String(event.target));
    }).on('complete', async function onComplete() {
      const bench = await (0, _getBench.default)(this);

      if (!(await (0, _utils.existsPromise)(perfDirPath))) {
        await (0, _utils.mkdirPromise)(perfDirPath);
      }

      let history;

      if (await (0, _utils.existsPromise)(perfPath)) {
        history = JSON.parse((await (0, _utils.readFilePromise)(perfPath, 'utf8')));
      } else {
        history = [];
      }

      const newBenches = [...history, bench];
      (0, _renderTable.default)(newBenches, `${testName} / ${suiteName}`);
      resolve();
      await (0, _utils.writeFilePromise)(perfPath, JSON.stringify(newBenches, null, 2));
    }).run();
  });
  return {
    message: () => `[ermes] some message from the wrapper`,
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