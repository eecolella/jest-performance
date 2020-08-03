"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.head = void 0;

var _colors = _interopRequireDefault(require("colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 *
 *
 * ~~~ constants
 *
 */
const head = [_colors.default.yellow.bold('date'), _colors.default.yellow.bold('branch'), _colors.default.yellow.bold('commit'), _colors.default.yellow.bold('changes'), _colors.default.yellow.bold('name'), _colors.default.yellow.bold('duration'), _colors.default.yellow.bold('ops/seconds'), _colors.default.yellow.bold('% error'), _colors.default.yellow.bold('samples'), _colors.default.yellow.bold('run slower ratio')];
exports.head = head;