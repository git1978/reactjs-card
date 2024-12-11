import React from "react";

// Pipe function
const pipe =
  (...fns) =>
  (initialValue) =>
    fns.reduce((acc, fn) => fn(acc), initialValue);

// transformPeriod function
const transformPeriod = (periodCode) => {
  switch (periodCode) {
    case "A":
      return "ANNUEL";
    case "S":
      return "SEMESTRIEL";
    case "M":
      return "MENSUEL";
    case "Q":
      return "QUOTIDIEN";
    case "H":
      return "HEBDOMADAIRE";
    case "T":
      return "TRIMESTRIEL";
    default:
      return "Invalide"; // Return a default message for unrecognized codes
  }
};

// Additional transformations
const addPrefix = (str) => `${str}`;
const toUpperCase = (str) => str.toUpperCase();

// React component
const PeriodPipe = ({ periodCode }) => {
  // Apply transformations using the pipe function
  const transformedPeriod = pipe(
    transformPeriod,
    addPrefix, // Optional transformation to add a prefix
    toUpperCase // Optional transformation to convert to uppercase
  )(periodCode);

  return <span>{transformedPeriod}</span>;
};

export default PeriodPipe;
