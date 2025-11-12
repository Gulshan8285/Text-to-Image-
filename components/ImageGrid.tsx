
import React from 'react';
import ImageCard from './ImageCard';
import InspirationGallery from './InspirationGallery';

interface ImageGridProps {
  images: string[];
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 animate-pulse-fast">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="aspect-square bg-gray-200 dark:bg-dark-surface rounded-lg"></div>
    ))}
  </div>
);

const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading, error }) => {
  if (isLoading) {
    return (
        <div className="text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Your masterpiece is being created...</h2>
            <p className="text-sm text-gray-500 mb-6">This can take a moment. Great art requires patience!</p>
            <LoadingSkeleton />
        </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg relative" role="alert">
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (images.length === 0) {
    return <InspirationGallery />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 animate-fade-in">
      {images.map((src, index) => (
        <ImageCard key={index} src={src} />
      ))}
    </div>
  );
};

export default ImageGrid;
