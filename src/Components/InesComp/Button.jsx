import React, { useState } from 'react';

export default function Button() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300); // Optional: resets after 300ms
  };

  return (
    <button
      onClick={handleClick}
      onMouseOver={(e) => (e.target.style.opacity = 0.9)}
      onMouseOut={(e) => (e.target.style.opacity = 1)}
      style={{
        backgroundColor: clicked ? '#ffffff' : '#023E8A',
        color: clicked ? '#023E8A' : '#ffffff',
        border: clicked ? '1px solid #023E8A' : 'none',
        borderRadius: '6px',
        fontSize: '13px',
        padding: '4px 8px',
        cursor: 'pointer',
        transition: 'all 0.1s ease',
      }}
    >
      More Informations
    </button>
  );
}
