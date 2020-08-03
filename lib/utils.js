"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRunSlowerRatio = exports.mkdirPromise = exports.existsPromise = exports.writeFilePromise = exports.readFilePromise = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("util"));

var _ramda = _interopRequireDefault(require("ramda"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 *
 *
 *
 *
 * ~~~ promisify node stuff
 *
 */
const readFilePromise = _util.default.promisify(_fs.default.readFile);

exports.readFilePromise = readFilePromise;

const writeFilePromise = _util.default.promisify(_fs.default.writeFile);

exports.writeFilePromise = writeFilePromise;

const existsPromise = _util.default.promisify(_fs.default.exists);

exports.existsPromise = existsPromise;

const mkdirPromise = _util.default.promisify(_fs.default.mkdir);
/**
 *
 *
 *
 *
 * ~~~ addRunSlowerRatio
 *
 */


exports.mkdirPromise = mkdirPromise;

const addRunSlowerRatio = tests => {
  const faster = _ramda.default.reduce((acc, t) => _ramda.default.min(acc, t.durationMicroSeconds), Number.POSITIVE_INFINITY)(tests);

  return _ramda.default.map(test => {
    return _objectSpread(_objectSpread({}, test), {}, {
      runSlowerRatio: test.durationMicroSeconds / faster
    });
  })(tests);
};

exports.addRunSlowerRatio = addRunSlowerRatio;