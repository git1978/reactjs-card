import React from 'react';

const TagType = {
  Default: 'default',
};

const Tag = ({ type, color, children }) => {
  const backgroundColor = type === TagType.Default ? color : 'transparent';
  const textColor = type === TagType.Default ? 'white' : 'inherit';

  return (
    <span
      style={{
        backgroundColor,
        color: textColor,
        padding: '4px 8px',
        borderRadius: '2px',
        lineHeight: 1,
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: '12px', // Added font size
        fontFamily: 'roboto',
      }}
    >
      {children}
    </span>
  );
};

export default Tag;
