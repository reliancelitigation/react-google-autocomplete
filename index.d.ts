import { RefObject } from "react";

export interface ReactGoogleAutocompleteProps {
  onPlaceSelected?: (
    place: google.maps.places.Place,
    element: HTMLElement,
    autocompleteRef: RefObject<HTMLElement>
  ) => void;
  options?: {
    fields?: string[];
    componentRestrictions?: { country: string | string[] };
    types?: string[];
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    strictBounds?: boolean;
    includedPrimaryTypes?: string[];
    includedRegionCodes?: string[];
    locationBias?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | google.maps.CircleLiteral;
    locationRestriction?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    origin?: google.maps.LatLng | google.maps.LatLngLiteral;
    requestedLanguage?: string;
    requestedRegion?: string;
  };
  libraries?: string[];
  apiKey?: string;
  language?: string;
  googleMapsScriptBaseUrl?: string;
}

export interface ReactGoogleAutocompleteInputProps
  extends ReactGoogleAutocompleteProps,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > {
  placeholder?: string;
}

export default function ReactGoogleAutocomplete<T extends any>(
  props: ReactGoogleAutocompleteInputProps & T
): JSX.Element;

export function usePlacesWidget<T extends HTMLElement = HTMLElement>(
  props: ReactGoogleAutocompleteProps
): {
  ref: RefObject<T>;
  autocompleteRef: RefObject<HTMLElement>;
};
