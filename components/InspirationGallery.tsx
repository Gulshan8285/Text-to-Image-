
import React from 'react';
import { INSPIRATIONS } from '../constants';

const InspirationGallery: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Welcome to InstaArt!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Describe anything you can imagine. Here's some inspiration to get you started:</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {INSPIRATIONS.map((item, index) => (
          <div key={index} className="group relative cursor-pointer">
            <img src={item.image} alt={item.prompt} className="w-full h-full object-cover rounded-lg aspect-square" loading="lazy"/>
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-medium">{item.prompt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationGallery;
