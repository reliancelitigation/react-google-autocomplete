import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import usePlacesWidget from "./usePlacesWidget";

// Renders the Google `<gmp-place-autocomplete>` Web Component directly so
// className / style / placeholder / ref attach to the element itself (matching
// the old behaviour where they attached to a host <input>). Note: the actual
// text input is inside the element's shadow DOM, so some CSS (padding,
// background) won't visibly pierce through. Layout properties (width, height,
// border-radius, color-scheme) do work.
function ReactGoogleAutocomplete(props) {
  const {
    onPlaceSelected,
    apiKey,
    libraries,
    options,
    googleMapsScriptBaseUrl,
    refProp,
    language,
    // legacy prop, no longer applicable to the new element
    inputAutocompleteValue: _unusedAutocompleteValue,
    ...rest
  } = props;

  const { ref } = usePlacesWidget({
    ref: refProp,
    googleMapsScriptBaseUrl,
    onPlaceSelected,
    apiKey,
    libraries,
    options,
    language,
  });

  return React.createElement("gmp-place-autocomplete", { ref, ...rest });
}

ReactGoogleAutocomplete.propTypes = {
  apiKey: PropTypes.string,
  libraries: PropTypes.arrayOf(PropTypes.string),
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  googleMapsScriptBaseUrl: PropTypes.string,
  onPlaceSelected: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.shape({
    componentRestrictions: PropTypes.object,
    includedPrimaryTypes: PropTypes.arrayOf(PropTypes.string),
    includedRegionCodes: PropTypes.arrayOf(PropTypes.string),
    locationBias: PropTypes.object,
    locationRestriction: PropTypes.object,
    origin: PropTypes.object,
    types: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.arrayOf(PropTypes.string),
  }),
  language: PropTypes.string,
};

export default forwardRef((props, ref) => (
  <ReactGoogleAutocomplete {...props} refProp={ref} />
));
