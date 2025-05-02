import React from 'react';
import Carts from './Carts';

const Hero = () => {
  return (
    <div
      className="A mb-6"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        gap: '2rem',
        padding: '2rem',
        
      }}
    >
      <div className="hero mb-5 py-5">
        <h1 style={{ fontSize: '4rem', color: '#023E8A', margin: 0 }}>Pièca</h1>
        <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>We Offer a Wide Range Of</p>
        <p style={{ fontSize: '1.5rem', margin: 0 }}>
          High-Quality Spare Parts For All Car Models
        </p>
      </div>

      <div className='herocarts'>
        <Carts />
      </div>
    </div>
  );
};

export default Hero;
