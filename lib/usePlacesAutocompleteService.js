"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePlacesAutocompleteService;
var _react = require("react");
var _lodash = _interopRequireDefault(require("lodash.debounce"));
var _utils = require("./utils");
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Wraps the new Place class so existing consumers can keep calling
// `placesService.getDetails({ placeId, fields }, cb)` style code without change.
// `fields` should already be camelCase (e.g. "formattedAddress"); pass the
// legacy snake_case strings and they'll be translated.
var SNAKE_TO_CAMEL_FIELDS = {
  address_components: "addressComponents",
  adr_address: "adrFormatAddress",
  business_status: "businessStatus",
  formatted_address: "formattedAddress",
  formatted_phone_number: "nationalPhoneNumber",
  geometry: "location",
  "geometry.location": "location",
  "geometry.viewport": "viewport",
  icon: "svgIconMaskURI",
  international_phone_number: "internationalPhoneNumber",
  name: "displayName",
  opening_hours: "regularOpeningHours",
  photos: "photos",
  place_id: "id",
  plus_code: "plusCode",
  price_level: "priceLevel",
  rating: "rating",
  reviews: "reviews",
  types: "types",
  url: "googleMapsURI",
  user_ratings_total: "userRatingCount",
  utc_offset_minutes: "utcOffsetMinutes",
  vicinity: "formattedAddress",
  website: "websiteURI"
};
var translateFields = function translateFields(fields) {
  if (!Array.isArray(fields)) return fields;
  return fields.map(function (f) {
    return SNAKE_TO_CAMEL_FIELDS[f] || f;
  });
};
var buildPlacesServiceShim = function buildPlacesServiceShim() {
  return {
    getDetails: function getDetails(request, callback) {
      try {
        var _ref = request || {},
          placeId = _ref.placeId,
          fields = _ref.fields;
        if (!placeId) {
          callback && callback(null, "INVALID_REQUEST");
          return;
        }
        var place = new google.maps.places.Place({
          id: placeId
        });
        place.fetchFields({
          fields: translateFields(fields)
        }).then(function (_ref2) {
          var fetched = _ref2.place;
          return callback && callback(fetched, "OK");
        }).catch(function (err) {
          console.error("Place.fetchFields failed:", err);
          callback && callback(null, "UNKNOWN_ERROR");
        });
      } catch (err) {
        console.error("placesService.getDetails shim failed:", err);
        callback && callback(null, "UNKNOWN_ERROR");
      }
    }
  };
};
function usePlacesAutocompleteService(_ref3) {
  var _google$maps2;
  var apiKey = _ref3.apiKey,
    _ref3$libraries = _ref3.libraries,
    libraries = _ref3$libraries === void 0 ? "places" : _ref3$libraries,
    _ref3$googleMapsScrip = _ref3.googleMapsScriptBaseUrl,
    googleMapsScriptBaseUrl = _ref3$googleMapsScrip === void 0 ? _constants.GOOGLE_MAP_SCRIPT_BASE_URL : _ref3$googleMapsScrip,
    _ref3$debounce = _ref3.debounce,
    debounce = _ref3$debounce === void 0 ? 300 : _ref3$debounce,
    _ref3$options = _ref3.options,
    options = _ref3$options === void 0 ? {} : _ref3$options,
    sessionToken = _ref3.sessionToken,
    language = _ref3.language;
  var languageQueryParam = language ? "&language=".concat(language) : "";
  var googleMapsScriptUrl = "".concat(googleMapsScriptBaseUrl, "?key=").concat(apiKey, "&libraries=").concat(libraries).concat(languageQueryParam);
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    placePredictions = _useState2[0],
    setPlacePredictions = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isPlacePredsLoading = _useState4[0],
    setIsPlacePredsLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    placeInputValue = _useState6[0],
    setPlaceInputValue = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isQueryPredsLoading = _useState8[0],
    setIsQueryPredsLoading = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    queryInputValue = _useState0[0],
    setQueryInputValue = _useState0[1];
  var _useState1 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState1, 2),
    queryPredictions = _useState10[0],
    setQueryPredictions = _useState10[1];
  var placesServiceRef = (0, _react.useRef)(null);
  var autocompleteSession = (0, _react.useRef)(null);
  var handleLoadScript = (0, _react.useCallback)(function () {
    return (0, _utils.loadGoogleMapScript)(googleMapsScriptBaseUrl, googleMapsScriptUrl);
  }, [googleMapsScriptBaseUrl, googleMapsScriptUrl]);

  // Fetch via the new AutocompleteSuggestion API. Result of
  // `fetchAutocompleteSuggestions` is `{ suggestions: [{ placePrediction }] }`;
  // we surface the array of `placePrediction` objects directly so consumers can
  // call `.toPlace()` / `.fetchFields()` on each.
  var fetchSuggestions = function fetchSuggestions(optionsArg) {
    var request = _objectSpread(_objectSpread(_objectSpread({}, sessionToken && autocompleteSession.current ? {
      sessionToken: autocompleteSession.current
    } : {}), options), optionsArg);
    return google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request).then(function (_ref4) {
      var suggestions = _ref4.suggestions;
      return (suggestions || []).map(function (s) {
        return s.placePrediction;
      }).filter(Boolean);
    });
  };
  var debouncedPlacePredictions = (0, _react.useCallback)((0, _lodash.default)(function (optionsArg) {
    if (!optionsArg.input) return;
    fetchSuggestions(optionsArg).then(function (preds) {
      setIsPlacePredsLoading(false);
      setPlacePredictions(preds);
    }).catch(function (err) {
      console.error("fetchAutocompleteSuggestions failed:", err);
      setIsPlacePredsLoading(false);
      setPlacePredictions([]);
    });
  }, debounce), [debounce]);

  // Query predictions have no direct equivalent in the new API. We fall back to
  // the same place-prediction fetch so existing consumers keep working; raw
  // free-text query suggestions are no longer supported by Google.
  var debouncedQueryPredictions = (0, _react.useCallback)((0, _lodash.default)(function (optionsArg) {
    if (!optionsArg.input) return;
    fetchSuggestions(optionsArg).then(function (preds) {
      setIsQueryPredsLoading(false);
      setQueryPredictions(preds);
    }).catch(function (err) {
      console.error("fetchAutocompleteSuggestions failed:", err);
      setIsQueryPredsLoading(false);
      setQueryPredictions([]);
    });
  }, debounce), [debounce]);
  (0, _react.useEffect)(function () {
    if (!_utils.isBrowser) return;
    var buildService = function buildService() {
      var _google$maps;
      if (typeof google === "undefined") return console.error("Google has not been found. Make sure your provide apiKey prop.");
      if (!((_google$maps = google.maps) !== null && _google$maps !== void 0 && (_google$maps = _google$maps.places) !== null && _google$maps !== void 0 && _google$maps.AutocompleteSuggestion)) return console.error("google.maps.places.AutocompleteSuggestion not available. Make sure the places library is loaded.");
      placesServiceRef.current = buildPlacesServiceShim();
      if (sessionToken) autocompleteSession.current = new google.maps.places.AutocompleteSessionToken();
    };
    if (apiKey) {
      handleLoadScript().then(function () {
        return buildService();
      });
    } else {
      buildService();
    }
  }, []);
  return {
    placesService: placesServiceRef.current,
    autocompleteSessionToken: autocompleteSession.current,
    // `placesAutocompleteService` no longer wraps a stateful service object —
    // the new API is a static method. Kept for backwards compatibility; calling
    // `.fetchAutocompleteSuggestions(...)` works as before.
    placesAutocompleteService: typeof google !== "undefined" && (_google$maps2 = google.maps) !== null && _google$maps2 !== void 0 && (_google$maps2 = _google$maps2.places) !== null && _google$maps2 !== void 0 && _google$maps2.AutocompleteSuggestion ? google.maps.places.AutocompleteSuggestion : null,
    placePredictions: placeInputValue ? placePredictions : [],
    isPlacePredictionsLoading: isPlacePredsLoading,
    getPlacePredictions: function getPlacePredictions(opt) {
      if (opt.input) {
        setPlaceInputValue(opt.input);
        setIsPlacePredsLoading(true);
        debouncedPlacePredictions(opt);
        return;
      }
      setPlacePredictions([]);
      setPlaceInputValue(null);
      debouncedPlacePredictions(opt);
      setIsPlacePredsLoading(false);
    },
    queryPredictions: queryInputValue ? queryPredictions : [],
    isQueryPredictionsLoading: isQueryPredsLoading,
    getQueryPredictions: function getQueryPredictions(opt) {
      if (opt.input) {
        setQueryInputValue(opt.input);
        setIsQueryPredsLoading(true);
        debouncedQueryPredictions(opt);
        return;
      }
      setQueryPredictions([]);
      setQueryInputValue(null);
      debouncedQueryPredictions(opt);
      setIsQueryPredsLoading(false);
    },
    refreshSessionToken: function refreshSessionToken() {
      autocompleteSession.current = new google.maps.places.AutocompleteSessionToken();
    }
  };
}