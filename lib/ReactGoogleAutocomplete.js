"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _usePlacesWidget2 = _interopRequireDefault(require("./usePlacesWidget"));
var _excluded = ["onPlaceSelected", "apiKey", "libraries", "options", "googleMapsScriptBaseUrl", "refProp", "language", "inputAutocompleteValue"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// Renders the Google `<gmp-place-autocomplete>` Web Component directly so
// className / style / placeholder / ref attach to the element itself (matching
// the old behaviour where they attached to a host <input>). Note: the actual
// text input is inside the element's shadow DOM, so some CSS (padding,
// background) won't visibly pierce through. Layout properties (width, height,
// border-radius, color-scheme) do work.
function ReactGoogleAutocomplete(props) {
  var onPlaceSelected = props.onPlaceSelected,
    apiKey = props.apiKey,
    libraries = props.libraries,
    options = props.options,
    googleMapsScriptBaseUrl = props.googleMapsScriptBaseUrl,
    refProp = props.refProp,
    language = props.language,
    _unusedAutocompleteValue = props.inputAutocompleteValue,
    rest = _objectWithoutProperties(props, _excluded);
  var _usePlacesWidget = (0, _usePlacesWidget2.default)({
      ref: refProp,
      googleMapsScriptBaseUrl: googleMapsScriptBaseUrl,
      onPlaceSelected: onPlaceSelected,
      apiKey: apiKey,
      libraries: libraries,
      options: options,
      language: language
    }),
    ref = _usePlacesWidget.ref;
  return /*#__PURE__*/_react.default.createElement("gmp-place-autocomplete", _objectSpread({
    ref: ref
  }, rest));
}
ReactGoogleAutocomplete.propTypes = {
  apiKey: _propTypes.default.string,
  libraries: _propTypes.default.arrayOf(_propTypes.default.string),
  ref: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.any
  })]),
  googleMapsScriptBaseUrl: _propTypes.default.string,
  onPlaceSelected: _propTypes.default.func,
  placeholder: _propTypes.default.string,
  options: _propTypes.default.shape({
    componentRestrictions: _propTypes.default.object,
    includedPrimaryTypes: _propTypes.default.arrayOf(_propTypes.default.string),
    includedRegionCodes: _propTypes.default.arrayOf(_propTypes.default.string),
    locationBias: _propTypes.default.object,
    locationRestriction: _propTypes.default.object,
    origin: _propTypes.default.object,
    types: _propTypes.default.arrayOf(_propTypes.default.string),
    fields: _propTypes.default.arrayOf(_propTypes.default.string)
  }),
  language: _propTypes.default.string
};
var _default = exports.default = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(ReactGoogleAutocomplete, _extends({}, props, {
    refProp: ref
  }));
});