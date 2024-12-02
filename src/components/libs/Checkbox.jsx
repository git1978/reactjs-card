import React from "react";

export const Checkbox = ({
  title,
  name,
  value,
  inputChange
}) => {
  return (
    <>
      <div className="control">
        <label className="checkbox">
          <input
            type="checkbox"
            name={name}
            onChange={inputChange}
            checked={value}
          />
          &nbsp;
          <span style={{ fontWeight: "bold", fontSize: "12px" }}>{title}</span>
        </label>
      </div>
    </>
  );
};
