import React from 'react';

const iaButton = ({ event, libelle, className, type, ...rest }) => {
  const handleClick = event || (() => {});

  return (
    <button
      {...(className && { className })} // Ajoute className uniquement s'il existe
      {...(type && { type })}          // Ajoute type uniquement s'il existe
      onClick={handleClick}
      {...rest} // Passe d'autres props éventuelles
    >
      {libelle}
    </button>
  );
};

export default iaButton;
