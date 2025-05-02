import React from 'react';
import Button from './Button';
import './Styles.css';
import { Slide } from 'react-awesome-reveal';
const CategoryCard = ({ title, description, image }) => (
  
  <div className="category-card">
    {/* Image section */}
    <div className="card-image">
      <img src={image} alt={title} />
    </div>

    {/* Text section */}
    <div className="card-content">
      <h2>{title}</h2>
      <p>{description}</p>
      <Button />
    </div>
  </div>
);

export default CategoryCard;
