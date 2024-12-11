import React from "react";
import PropTypes from "prop-types";

const iaCheckbox = ({ checked, onChange, label }) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

iaCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

iaCheckbox.defaultProps = {
  checked: false,
};

export default iaCheckbox;
