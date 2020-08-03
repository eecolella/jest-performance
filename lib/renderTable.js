"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cliTable = _interopRequireDefault(require("cli-table"));

var _ramda = _interopRequireDefault(require("ramda"));

var _colors = _interopRequireDefault(require("colors"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 *
 *
 * ~~~ table
 *
 */
const table = new _cliTable.default({
  head: _constants.head
});
/**
 *
 *
 *
 *
 * ~~~ renderTable
 *
 */

const renderTable = (benches, suiteName) => {
  _ramda.default.forEach(bench => {
    const avgErrorPc = _ramda.default.compose(_ramda.default.sum, _ramda.default.pluck('errorPc'))(bench.tests) / bench.tests.length;

    _ramda.default.forEach(test => {
      table.push([new Date(bench.date).toLocaleString(), bench.git.branch, bench.git.commit, _colors.default[bench.git.changes > 0 ? 'red' : 'green'](`${bench.git.changes}`), test.name, `${test.durationMicroSeconds.toFixed(3)} µs`, `${test.opsForSeconds.toFixed(3)} hz`, _colors.default[test.errorPc < avgErrorPc ? 'green' : 'red'](`${test.errorPc.toFixed(3)} %`), test.samplesCount, _colors.default[test.runSlowerRatio > 1 ? 'red' : 'green'](`${test.runSlowerRatio.toFixed(3)}x`)]);
    })(bench.tests);
  })(benches);

  console.log(`\n${_colors.default.yellow.bold(suiteName)}\n${table.toString()}`);
};
/**
 *
 *
 *
 *
 * ~~~ default
 *
 */


var _default = renderTable;
exports.default = _default;