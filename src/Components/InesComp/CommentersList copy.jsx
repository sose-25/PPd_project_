import React from 'react';
import CommenterCard from './CommenterCard';
// Example commenters data
const commenters = [
  {
    image: 'path_to_image1.jpeg',
    name: 'Ines',
    comments: ['Great post!', 'I love the insights.', 'Very informative.'],
  },
  {
    image: 'path_to_image2.jpeg',
    name: 'Samah',
    comments: ['This helped me a lot!', 'Good job on this.', 'Looking forward to more posts!'],
  },
  {
    image: 'path_to_image3.jpeg',
    name: 'Souha',
    comments: ['Interesting perspective!', 'Thanks for sharing!', 'This is amazing!'],
  },
];

const CommentersList = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center align-middle">
      <h1 className="text-3xl font-bold mb-6 text-center">Commenters</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {commenters.map((commenter, index) => (
          <CommenterCard
            key={index}

            name={commenter.name}
            comments={commenter.comments}
          />
          
        ))}
      </div>
    </div>
  );
};

export default CommentersList;
