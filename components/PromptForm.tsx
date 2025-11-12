
import React, { useState } from 'react';
import { IMAGE_STYLES, ASPECT_RATIOS, MAX_IMAGES } from '../constants';
import type { FormState } from '../types';
import { SparklesIcon } from './icons';

interface PromptFormProps {
  onGenerate: (formState: FormState) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onGenerate, isLoading }) => {
  const [formState, setFormState] = useState<FormState>({
    prompt: '',
    style: 'Realistic',
    count: 1,
    aspectRatio: '1:1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: name === 'count' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.prompt.trim()) {
      onGenerate(formState);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-surface p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border mb-8">
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <textarea
            name="prompt"
            value={formState.prompt}
            onChange={(e) => setFormState(prev => ({ ...prev, prompt: e.target.value }))}
            placeholder="Describe anything... e.g., 'A haunted village under a red sky'"
            className="w-full p-4 pr-12 text-base border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-dark-primary focus:border-transparent transition bg-gray-50 dark:bg-gray-800 dark:text-white resize-none"
            rows={3}
            disabled={isLoading}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Style</label>
            <select
              id="style"
              name="style"
              value={formState.style}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-gray-800 focus:ring-1 focus:ring-black dark:focus:ring-dark-primary"
            >
              {IMAGE_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aspect Ratio</label>
            <select
              id="aspectRatio"
              name="aspectRatio"
              value={formState.aspectRatio}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-gray-800 focus:ring-1 focus:ring-black dark:focus:ring-dark-primary"
            >
              {ASPECT_RATIOS.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Images ({formState.count})</label>
            <input
              type="range"
              id="count"
              name="count"
              min="1"
              max={MAX_IMAGES}
              value={formState.count}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !formState.prompt.trim()}
          className="w-full flex items-center justify-center bg-black dark:bg-dark-primary text-white dark:text-black font-bold py-3 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-dark-primary disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 text-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-6 h-6 mr-2" />
              Generate Images
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PromptForm;
