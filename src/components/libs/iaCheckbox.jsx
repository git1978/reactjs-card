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

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

Checkbox.defaultProps = {
  checked: false,
};

export default iaCheckbox;
