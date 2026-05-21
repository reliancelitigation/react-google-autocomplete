interface PlacesServiceShim {
  getDetails(
    request: { placeId: string; fields?: string[] },
    callback: (result: google.maps.places.Place | null, status: string) => void
  ): void;
}

interface usePlacesAutocompleteServiceConfig {
  apiKey?: string;
  libraries?: string;
  googleMapsScriptBaseUrl?: string;
  debounce?: number;
  options?: Partial<{
    input: string;
    sessionToken: google.maps.places.AutocompleteSessionToken;
    includedPrimaryTypes: string[];
    includedRegionCodes: string[];
    locationBias: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | google.maps.CircleLiteral;
    locationRestriction: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    origin: google.maps.LatLng | google.maps.LatLngLiteral;
    language: string;
    region: string;
    inputOffset: number;
  }>;
  sessionToken?: boolean;
  language?: string;
}

interface usePlacesAutocompleteServiceResponse {
  placesService: PlacesServiceShim | null;
  autocompleteSessionToken: google.maps.places.AutocompleteSessionToken | undefined;
  /** Now points at the static AutocompleteSuggestion class; kept for compat. */
  placesAutocompleteService: typeof google.maps.places.AutocompleteSuggestion | null;
  placePredictions: google.maps.places.PlacePrediction[];
  isPlacePredictionsLoading: boolean;
  getPlacePredictions: (opt: { input: string; [k: string]: unknown }) => void;
  /** Query predictions: now backed by place predictions (no true query API). */
  queryPredictions: google.maps.places.PlacePrediction[];
  isQueryPredictionsLoading: boolean;
  getQueryPredictions: (opt: { input: string; [k: string]: unknown }) => void;
  refreshSessionToken: () => void;
}

export default function usePlacesAutocompleteService(
  options: usePlacesAutocompleteServiceConfig
): usePlacesAutocompleteServiceResponse;
