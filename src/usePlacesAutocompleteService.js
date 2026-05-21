import { useEffect, useCallback, useRef, useState } from "react";
import debounceFn from "lodash.debounce";

import { isBrowser, loadGoogleMapScript } from "./utils";
import { GOOGLE_MAP_SCRIPT_BASE_URL } from "./constants";

// Wraps the new Place class so existing consumers can keep calling
// `placesService.getDetails({ placeId, fields }, cb)` style code without change.
// `fields` should already be camelCase (e.g. "formattedAddress"); pass the
// legacy snake_case strings and they'll be translated.
const SNAKE_TO_CAMEL_FIELDS = {
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
  website: "websiteURI",
};

const translateFields = (fields) => {
  if (!Array.isArray(fields)) return fields;
  return fields.map((f) => SNAKE_TO_CAMEL_FIELDS[f] || f);
};

const buildPlacesServiceShim = () => ({
  getDetails: (request, callback) => {
    try {
      const { placeId, fields } = request || {};
      if (!placeId) {
        callback && callback(null, "INVALID_REQUEST");
        return;
      }
      const place = new google.maps.places.Place({ id: placeId });
      place
        .fetchFields({ fields: translateFields(fields) })
        .then(({ place: fetched }) => callback && callback(fetched, "OK"))
        .catch((err) => {
          console.error("Place.fetchFields failed:", err);
          callback && callback(null, "UNKNOWN_ERROR");
        });
    } catch (err) {
      console.error("placesService.getDetails shim failed:", err);
      callback && callback(null, "UNKNOWN_ERROR");
    }
  },
});

export default function usePlacesAutocompleteService({
  apiKey,
  libraries = "places",
  googleMapsScriptBaseUrl = GOOGLE_MAP_SCRIPT_BASE_URL,
  debounce = 300,
  options = {},
  sessionToken,
  language,
}) {
  const languageQueryParam = language ? `&language=${language}` : "";
  const googleMapsScriptUrl = `${googleMapsScriptBaseUrl}?key=${apiKey}&libraries=${libraries}${languageQueryParam}`;
  const [placePredictions, setPlacePredictions] = useState([]);
  const [isPlacePredsLoading, setIsPlacePredsLoading] = useState(false);
  const [placeInputValue, setPlaceInputValue] = useState(null);
  const [isQueryPredsLoading, setIsQueryPredsLoading] = useState(false);
  const [queryInputValue, setQueryInputValue] = useState(false);
  const [queryPredictions, setQueryPredictions] = useState([]);
  const placesServiceRef = useRef(null);
  const autocompleteSession = useRef(null);
  const handleLoadScript = useCallback(
    () => loadGoogleMapScript(googleMapsScriptBaseUrl, googleMapsScriptUrl),
    [googleMapsScriptBaseUrl, googleMapsScriptUrl]
  );

  // Fetch via the new AutocompleteSuggestion API. Result of
  // `fetchAutocompleteSuggestions` is `{ suggestions: [{ placePrediction }] }`;
  // we surface the array of `placePrediction` objects directly so consumers can
  // call `.toPlace()` / `.fetchFields()` on each.
  const fetchSuggestions = (optionsArg) => {
    const request = {
      ...(sessionToken && autocompleteSession.current
        ? { sessionToken: autocompleteSession.current }
        : {}),
      ...options,
      ...optionsArg,
    };
    return google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
      request
    ).then(({ suggestions }) =>
      (suggestions || [])
        .map((s) => s.placePrediction)
        .filter(Boolean)
    );
  };

  const debouncedPlacePredictions = useCallback(
    debounceFn((optionsArg) => {
      if (!optionsArg.input) return;
      fetchSuggestions(optionsArg)
        .then((preds) => {
          setIsPlacePredsLoading(false);
          setPlacePredictions(preds);
        })
        .catch((err) => {
          console.error("fetchAutocompleteSuggestions failed:", err);
          setIsPlacePredsLoading(false);
          setPlacePredictions([]);
        });
    }, debounce),
    [debounce]
  );

  // Query predictions have no direct equivalent in the new API. We fall back to
  // the same place-prediction fetch so existing consumers keep working; raw
  // free-text query suggestions are no longer supported by Google.
  const debouncedQueryPredictions = useCallback(
    debounceFn((optionsArg) => {
      if (!optionsArg.input) return;
      fetchSuggestions(optionsArg)
        .then((preds) => {
          setIsQueryPredsLoading(false);
          setQueryPredictions(preds);
        })
        .catch((err) => {
          console.error("fetchAutocompleteSuggestions failed:", err);
          setIsQueryPredsLoading(false);
          setQueryPredictions([]);
        });
    }, debounce),
    [debounce]
  );

  useEffect(() => {
    if (!isBrowser) return;

    const buildService = () => {
      if (typeof google === "undefined")
        return console.error(
          "Google has not been found. Make sure your provide apiKey prop."
        );

      if (!google.maps?.places?.AutocompleteSuggestion)
        return console.error(
          "google.maps.places.AutocompleteSuggestion not available. Make sure the places library is loaded."
        );

      placesServiceRef.current = buildPlacesServiceShim();

      if (sessionToken)
        autocompleteSession.current =
          new google.maps.places.AutocompleteSessionToken();
    };

    if (apiKey) {
      handleLoadScript().then(() => buildService());
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
    placesAutocompleteService:
      typeof google !== "undefined" &&
      google.maps?.places?.AutocompleteSuggestion
        ? google.maps.places.AutocompleteSuggestion
        : null,
    placePredictions: placeInputValue ? placePredictions : [],
    isPlacePredictionsLoading: isPlacePredsLoading,
    getPlacePredictions: (opt) => {
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
    getQueryPredictions: (opt) => {
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
    refreshSessionToken: () => {
      autocompleteSession.current =
        new google.maps.places.AutocompleteSessionToken();
    },
  };
}
