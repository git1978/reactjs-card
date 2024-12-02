import React from "react";

export const Button = ({
  loading,
  type,
  title,
  onClick,
  disabled
}) => {
  return (
    <button
      className={loading ? "button is-small is-loading " : "button is-small " + type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
