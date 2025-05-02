import React from 'react';
import { Avatar } from '@mui/material';
import { Slide } from 'react-awesome-reveal';
const CommenterCard = ({ image, name, comments }) => {
  return (
    <Slide direction='up' className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col justify-between w-96 hover:shadow-2xl">
      <div className="flex justify-center p-4">
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-gray-700 font-semibold text-lg">{name}</h3>
        <div className="text-gray-600 text-sm mb-4">
          <p>Comments:</p>
          {comments.map((comment, index) => (
            <p key={index} className="text-gray-500 text-sm">{comment}</p>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default CommenterCard;
