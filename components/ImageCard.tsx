
import React from 'react';
import { DownloadIcon, ShareIcon } from './icons';

interface ImageCardProps {
  src: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src }) => {
    const handleShare = async () => {
        if(navigator.share) {
            try {
                const response = await fetch(src);
                const blob = await response.blob();
                const file = new File([blob], 'instaart-image.jpg', { type: 'image/jpeg' });
                await navigator.share({
                    title: 'AI Image from InstaArt',
                    text: 'Check out this image I generated with InstaArt!',
                    files: [file],
                });
            } catch (error) {
                console.error("Share failed:", error);
                alert("Sharing failed. You can download the image instead.");
            }
        } else {
            alert("Web Share API not supported in your browser. Please download the image.");
        }
    };
    
  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg shadow-lg border border-gray-200 dark:border-dark-border">
      <img src={src} alt="AI generated art" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center space-x-4">
        <a
          href={src}
          download={`instaart-image-${Date.now()}.jpg`}
          className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-300 bg-white/80 dark:bg-black/80 text-black dark:text-white p-3 rounded-full hover:bg-white dark:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          aria-label="Download Image"
        >
          <DownloadIcon className="w-6 h-6" />
        </a>
        <button
          onClick={handleShare}
          className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-300 delay-100 bg-white/80 dark:bg-black/80 text-black dark:text-white p-3 rounded-full hover:bg-white dark:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          aria-label="Share Image"
        >
          <ShareIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
