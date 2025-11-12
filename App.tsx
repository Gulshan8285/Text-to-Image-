
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ImageGrid from './components/ImageGrid';
import { generateImagesFromApi } from './services/geminiService';
import type { FormState } from './types';

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const handleGenerate = async (formState: FormState) => {
    setIsLoading(true);
    setError(null);
    setImages([]);
    try {
      const fullPrompt = `${formState.prompt}, ${formState.style} style`;
      const generatedImages = await generateImagesFromApi(
        fullPrompt,
        formState.count,
        formState.aspectRatio
      );
      setImages(generatedImages);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Failed to generate images: ${err.message}. Please check your API key and try again.`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text font-sans transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <PromptForm onGenerate={handleGenerate} isLoading={isLoading} />
          <ImageGrid images={images} isLoading={isLoading} error={error} />
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} InstaArt. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
