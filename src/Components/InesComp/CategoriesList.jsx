import React from 'react';
import CategoryCard from './CategoryCard';
import Button from './Button';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpeg';
import img4 from '../../assets/img4.jpeg';
import img5 from '../../assets/img5.jpeg';
import img6 from '../../assets/img6.jpeg';
import img7 from '../../assets/img7.webp';

import { Slide } from 'react-awesome-reveal';
const categories = [
  {
    title: "Body Work",
    description: "The body parts of a car include the chassis for structure, hood for engine protection, doors for access, trunk for storage, windows for visibility, bumpers for impact absorption, and lights for safety. These components shape the car’s design and functionality.",
    image: img1
  },
  {
    title: "Braking System",
    description: "The braking system ensures vehicle safety by slowing or stopping the car when needed. It includes brake pads, rotors, calipers, brake lines, and the master cylinder, working together to apply friction and reduce speed. Modern systems often feature ABS (Anti-lock Braking System) for improved control during emergency braking.",
    image: img2
  },
  {
    title: "Electronic System",
    description: "The electronic system controls various functions, including engine management, lighting, infotainment, sensors, and safety features. It consists of the ECU (Engine Control Unit), battery, alternator, wiring, and sensors, ensuring smooth operation and connectivity.",
    image: img3
  },
  {
    title: "Interior",
    description: "The interior of a car includes components that provide comfort, convenience, and functionality for passengers. Key elements include seats, dashboard, steering wheel, center console, infotainment system, air conditioning, and upholstery. Modern interiors focus on ergonomics, luxury, and technology integration.",
    image: img4
  },
  {
    title: "Drivetrain",
    description: "The drivetrain transfers power from the engine to the wheels, allowing the car to move. It consists of the transmission, driveshaft, differential, axles, and CV joints. Depending on the vehicle, it can be front-wheel drive (FWD), rear-wheel drive (RWD), all-wheel drive (AWD), or four-wheel drive (4WD).",
    image: img5
  },
  {
    title: "Steering System",
    description: "The steering system allows the driver to control the car's direction with ease. It includes the steering wheel, steering column, rack-and-pinion mechanism, power steering pump, and tie rods. Most modern cars use power steering (hydraulic or electric) for smoother handling and better control.",
    image: img6
  },
  {
    title: "Fuel & Exhaust System",
    description: "The fuel system supplies fuel to the engine, consisting of the fuel tank, fuel pump, injectors, and fuel lines, ensuring efficient combustion. The exhaust system removes waste gases through exhaust pipes, catalytic converter, muffler, and tailpipe, reducing emissions and noise while improving performance.",
    image: img7
  }
];

const CategoriesList = () => {
  return (
    <Slide direction='left' style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }} className='mt-4'>
      {categories.map((category, index) => (
        
        <CategoryCard
          key={index}
          title={category.title}
          description={category.description}
          image={category.image}
        />
      ))}
    </Slide>
  );
};

export default CategoriesList;

