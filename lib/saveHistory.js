"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 *
 *
 * ~~~ saveHistory
 *
 */
const saveHistory = async function (testPath, testName, bench) {
  const testDirPath = _path.default.dirname(testPath);

  const perfDirPath = _path.default.join(testDirPath, '/__benchmarks__');

  const perfName = `${testName}.perf`;

  const perfPath = _path.default.join(perfDirPath, perfName);

  if (!(await (0, _utils.existsPromise)(perfDirPath))) {
    await (0, _utils.mkdirPromise)(perfDirPath);
  }

  let history;

  if (await (0, _utils.existsPromise)(perfPath)) {
    history = JSON.parse(await (0, _utils.readFilePromise)(perfPath, 'utf8'));
  } else {
    history = [];
  }

  await (0, _utils.writeFilePromise)(perfPath, JSON.stringify([...history, bench], null, 2));
};
/**
 *
 *
 *
 *
 * ~~~ default
 *
 */


var _default = saveHistory;
exports.default = _default;