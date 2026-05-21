import { useEffect, useRef, useCallback } from "react";

import { loadGoogleMapScript, isBrowser } from "./utils";
import { GOOGLE_MAP_SCRIPT_BASE_URL } from "./constants";

const DEFAULT_FIELDS = [
  "addressComponents",
  "location",
  "id",
  "formattedAddress",
];

// Translate the legacy options shape (`types`, `componentRestrictions`,
// `bounds`, `strictBounds`) to the new PlaceAutocompleteElement options.
const buildElementOptions = ({
  types,
  componentRestrictions,
  bounds,
  strictBounds,
  locationBias,
  locationRestriction,
  includedPrimaryTypes,
  includedRegionCodes,
  origin,
  requestedLanguage,
  requestedRegion,
  language,
}) => {
  const opts = {};

  if (includedPrimaryTypes) {
    opts.includedPrimaryTypes = includedPrimaryTypes;
  } else if (Array.isArray(types) && types.length) {
    // Legacy collection aliases (`(cities)`, `(regions)`, `geocode`) are gone.
    const filtered = types.filter((t) => !/^\(.*\)$/.test(t) && t !== "geocode");
    if (filtered.length) opts.includedPrimaryTypes = filtered.slice(0, 5);
  }

  if (includedRegionCodes) {
    opts.includedRegionCodes = includedRegionCodes;
  } else if (componentRestrictions && componentRestrictions.country) {
    const country = componentRestrictions.country;
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
  if (requestedLanguage || language)
    opts.requestedLanguage = requestedLanguage || language;
  if (requestedRegion) opts.requestedRegion = requestedRegion;

  return opts;
};

export default function usePlacesWidget(props) {
  const {
    ref,
    onPlaceSelected,
    apiKey,
    libraries = "places",
    options: {
      fields = DEFAULT_FIELDS,
      ...options
    } = {},
    googleMapsScriptBaseUrl = GOOGLE_MAP_SCRIPT_BASE_URL,
    language,
  } = props;
  const elementRef = useRef(null);
  const autocompleteRef = useRef(null);
  const selectListenerRef = useRef(null);
  const onPlaceSelectedRef = useRef(onPlaceSelected);
  const fieldsRef = useRef(fields);

  useEffect(() => {
    onPlaceSelectedRef.current = onPlaceSelected;
  }, [onPlaceSelected]);

  useEffect(() => {
    fieldsRef.current = fields;
  }, [fields]);

  const languageQueryParam = language ? `&language=${language}` : "";
  const googleMapsScriptUrl = `${googleMapsScriptBaseUrl}?libraries=${libraries}&key=${apiKey}${languageQueryParam}`;

  const handleLoadScript = useCallback(
    () => loadGoogleMapScript(googleMapsScriptBaseUrl, googleMapsScriptUrl),
    [googleMapsScriptBaseUrl, googleMapsScriptUrl]
  );

  useEffect(() => {
    if (!elementRef.current || !isBrowser) return;
    if (autocompleteRef.current) return;

    if (ref && !ref.current) ref.current = elementRef.current;

    const wire = () => {
      if (typeof google === "undefined")
        return console.error(
          "Google has not been found. Make sure your provide apiKey prop."
        );

      if (!google.maps?.places?.PlaceAutocompleteElement)
        return console.error(
          "google.maps.places.PlaceAutocompleteElement not available. Make sure the places library is loaded."
        );

      const el = elementRef.current;
      if (!el) return;
      autocompleteRef.current = el;

      // Force light color-scheme so the element doesn't render its dark
      // variant when the page/UA reports dark mode. This is a documented host
      // style — not a shadow-DOM hack.
      if (!el.style.colorScheme) el.style.colorScheme = "light";

      const elOptions = buildElementOptions({ ...options, language });
      Object.assign(el, elOptions);

      selectListenerRef.current = async (event) => {
        const cb = onPlaceSelectedRef.current;
        if (!cb || !event?.placePrediction) return;
        try {
          const place = event.placePrediction.toPlace();
          await place.fetchFields({ fields: fieldsRef.current });
          cb(place, el, autocompleteRef);
        } catch (err) {
          console.error("Place.fetchFields failed:", err);
        }
      };
      el.addEventListener("gmp-select", selectListenerRef.current);
    };

    if (apiKey) {
      handleLoadScript().then(() => wire());
    } else {
      wire();
    }

    return () => {
      const el = autocompleteRef.current;
      if (el && selectListenerRef.current) {
        el.removeEventListener("gmp-select", selectListenerRef.current);
      }
      autocompleteRef.current = null;
      selectListenerRef.current = null;
    };
  }, []);

  // Push option changes to the live element.
  useEffect(() => {
    const el = autocompleteRef.current;
    if (!el) return;
    Object.assign(el, buildElementOptions({ ...options, language }));
  }, [
    options.types,
    options.componentRestrictions,
    options.bounds,
    options.strictBounds,
    options.locationBias,
    options.locationRestriction,
    options.includedPrimaryTypes,
    options.includedRegionCodes,
    options.origin,
    options.requestedLanguage,
    options.requestedRegion,
    language,
  ]);

  return {
    ref: elementRef,
    autocompleteRef,
  };
}
