"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePlacesWidget;
var _react = require("react");
var _utils = require("./utils");
var _constants = require("./constants");
var _excluded = ["fields"];
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DEFAULT_FIELDS = ["addressComponents", "location", "id", "formattedAddress"];

// Translate the legacy options shape (`types`, `componentRestrictions`,
// `bounds`, `strictBounds`) to the new PlaceAutocompleteElement options.
var buildElementOptions = function buildElementOptions(_ref) {
  var types = _ref.types,
    componentRestrictions = _ref.componentRestrictions,
    bounds = _ref.bounds,
    strictBounds = _ref.strictBounds,
    locationBias = _ref.locationBias,
    locationRestriction = _ref.locationRestriction,
    includedPrimaryTypes = _ref.includedPrimaryTypes,
    includedRegionCodes = _ref.includedRegionCodes,
    origin = _ref.origin,
    requestedLanguage = _ref.requestedLanguage,
    requestedRegion = _ref.requestedRegion,
    language = _ref.language;
  var opts = {};
  if (includedPrimaryTypes) {
    opts.includedPrimaryTypes = includedPrimaryTypes;
  } else if (Array.isArray(types) && types.length) {
    // Legacy collection aliases (`(cities)`, `(regions)`, `geocode`) are gone.
    var filtered = types.filter(function (t) {
      return !/^\(.*\)$/.test(t) && t !== "geocode";
    });
    if (filtered.length) opts.includedPrimaryTypes = filtered.slice(0, 5);
  }
  if (includedRegionCodes) {
    opts.includedRegionCodes = includedRegionCodes;
  } else if (componentRestrictions && componentRestrictions.country) {
    var country = componentRestrictions.country;
    opts.includedRegionCodes = Array.isArray(country) ? country : [country];
  }
  if (locationRestriction) {
    opts.locationRestriction = locationRestriction;
  } else if (bounds && strictBounds) {
    opts.locationRestriction = bounds;
  }
  if (locationBias) {
    opts.locationBias = locationBias;
  } else if (bounds && !strictBounds) {
    opts.locationBias = bounds;
  }
  if (origin) opts.origin = origin;
  if (requestedLanguage || language) opts.requestedLanguage = requestedLanguage || language;
  if (requestedRegion) opts.requestedRegion = requestedRegion;
  return opts;
};
function usePlacesWidget(props) {
  var ref = props.ref,
    onPlaceSelected = props.onPlaceSelected,
    apiKey = props.apiKey,
    _props$libraries = props.libraries,
    libraries = _props$libraries === void 0 ? "places" : _props$libraries,
    _props$options = props.options,
    _props$options2 = _props$options === void 0 ? {} : _props$options,
    _props$options2$field = _props$options2.fields,
    fields = _props$options2$field === void 0 ? DEFAULT_FIELDS : _props$options2$field,
    options = _objectWithoutProperties(_props$options2, _excluded),
    _props$googleMapsScri = props.googleMapsScriptBaseUrl,
    googleMapsScriptBaseUrl = _props$googleMapsScri === void 0 ? _constants.GOOGLE_MAP_SCRIPT_BASE_URL : _props$googleMapsScri,
    language = props.language;
  var elementRef = (0, _react.useRef)(null);
  var autocompleteRef = (0, _react.useRef)(null);
  var selectListenerRef = (0, _react.useRef)(null);
  var onPlaceSelectedRef = (0, _react.useRef)(onPlaceSelected);
  var fieldsRef = (0, _react.useRef)(fields);
  (0, _react.useEffect)(function () {
    onPlaceSelectedRef.current = onPlaceSelected;
  }, [onPlaceSelected]);
  (0, _react.useEffect)(function () {
    fieldsRef.current = fields;
  }, [fields]);
  var languageQueryParam = language ? "&language=".concat(language) : "";
  var googleMapsScriptUrl = "".concat(googleMapsScriptBaseUrl, "?libraries=").concat(libraries, "&key=").concat(apiKey).concat(languageQueryParam);
  var handleLoadScript = (0, _react.useCallback)(function () {
    return (0, _utils.loadGoogleMapScript)(googleMapsScriptBaseUrl, googleMapsScriptUrl);
  }, [googleMapsScriptBaseUrl, googleMapsScriptUrl]);
  (0, _react.useEffect)(function () {
    if (!elementRef.current || !_utils.isBrowser) return;
    if (autocompleteRef.current) return;
    if (ref && !ref.current) ref.current = elementRef.current;
    var wire = function wire() {
      var _google$maps;
      if (typeof google === "undefined") return console.error("Google has not been found. Make sure your provide apiKey prop.");
      if (!((_google$maps = google.maps) !== null && _google$maps !== void 0 && (_google$maps = _google$maps.places) !== null && _google$maps !== void 0 && _google$maps.PlaceAutocompleteElement)) return console.error("google.maps.places.PlaceAutocompleteElement not available. Make sure the places library is loaded.");
      var el = elementRef.current;
      if (!el) return;
      autocompleteRef.current = el;
      var elOptions = buildElementOptions(_objectSpread(_objectSpread({}, options), {}, {
        language: language
      }));
      Object.assign(el, elOptions);
      selectListenerRef.current = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
          var cb, place, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                cb = onPlaceSelectedRef.current;
                if (!(!cb || !(event !== null && event !== void 0 && event.placePrediction))) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2);
              case 1:
                _context.p = 1;
                place = event.placePrediction.toPlace();
                _context.n = 2;
                return place.fetchFields({
                  fields: fieldsRef.current
                });
              case 2:
                cb(place, el, autocompleteRef);
                _context.n = 4;
                break;
              case 3:
                _context.p = 3;
                _t = _context.v;
                console.error("Place.fetchFields failed:", _t);
              case 4:
                return _context.a(2);
            }
          }, _callee, null, [[1, 3]]);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }();
      el.addEventListener("gmp-select", selectListenerRef.current);
    };
    if (apiKey) {
      handleLoadScript().then(function () {
        return wire();
      });
    } else {
      wire();
    }
    return function () {
      var el = autocompleteRef.current;
      if (el && selectListenerRef.current) {
        el.removeEventListener("gmp-select", selectListenerRef.current);
      }
      autocompleteRef.current = null;
      selectListenerRef.current = null;
    };
  }, []);

  // Push option changes to the live element.
  (0, _react.useEffect)(function () {
    var el = autocompleteRef.current;
    if (!el) return;
    Object.assign(el, buildElementOptions(_objectSpread(_objectSpread({}, options), {}, {
      language: language
    })));
  }, [options.types, options.componentRestrictions, options.bounds, options.strictBounds, options.locationBias, options.locationRestriction, options.includedPrimaryTypes, options.includedRegionCodes, options.origin, options.requestedLanguage, options.requestedRegion, language]);
  return {
    ref: elementRef,
    autocompleteRef: autocompleteRef
  };
}