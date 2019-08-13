"use strict";

exports.__esModule = true;
exports.default = void 0;

var _object = require("../../../utils/object");

var _inspect = require("../../../utils/inspect");

// Recursively stringifies the values of an object, space separated, in an
// SSR safe deterministic way (keys are sorted before stringification)
//
//   ex:
//     { b: 3, c: { z: 'zzz', d: null, e: 2 }, d: [10, 12, 11], a: 'one' }
//   becomes
//     'one 3 2 zzz 10 12 11'
//
// Primitives (numbers/strings) are returned as-is
// Null and undefined values are filtered out
// Dates are converted to their native string format
var stringifyObjectValues = function stringifyObjectValues(val) {
  if ((0, _inspect.isUndefinedOrNull)(val)) {
    /* istanbul ignore next */
    return '';
  } // Arrays are also object, and keys just returns the array indexes
  // Date objects we convert to strings


  if ((0, _inspect.isObject)(val) && !(0, _inspect.isDate)(val)) {
    return (0, _object.keys)(val).sort() // Sort to prevent SSR issues on pre-rendered sorted tables
    .filter(function (v) {
      return !(0, _inspect.isUndefinedOrNull)(v);
    }) // Ignore undefined/null values
    .map(function (k) {
      return stringifyObjectValues(val[k]);
    }).join(' ');
  }

  return String(val);
};

var _default = stringifyObjectValues;
exports.default = _default;