import React from 'react';
import { CameraIcon, MoonIcon, SunIcon } from './icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CameraIcon className="w-8 h-8 text-black dark:text-white" />
          <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
            InstaArt <span className="text-gray-500 dark:text-gray-400 font-normal hidden sm:inline">– Free Ai Image Generate</span>
          </h1>
        </div>
        <div className="flex items-center">
            <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-dark-bg"
            aria-label="Toggle dark mode"
            >
            {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;