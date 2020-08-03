"use strict";

var _benchmark = _interopRequireDefault(require("./benchmark"));

var _expect;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(_expect = global.expect) === null || _expect === void 0 ? void 0 : _expect.extend({
  benchmark: _benchmark.default
});