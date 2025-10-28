
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  image: string;
}

const TestimonialCard = ({ quote, author, position, image }: TestimonialCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <p className="text-gray-800 mb-4 italic">"{quote}"</p>
    <div className="flex items-center">
      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        <img src={image} alt={author} className="h-full w-full object-cover" />
      </div>
      <div className="ml-4">
        <p className="font-medium">{author}</p>
        <p className="text-sm text-gray-600">{position}</p>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
