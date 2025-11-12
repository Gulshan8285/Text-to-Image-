
import { GoogleGenAI } from "@google/genai";
import type { AspectRatio } from "../types";

export const generateImagesFromApi = async (
  prompt: string,
  numberOfImages: number,
  aspectRatio: AspectRatio
): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: numberOfImages,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages.map(img => `data:image/jpeg;base64,${img.image.imageBytes}`);
    } else {
      throw new Error("No images were generated. The response may have been blocked.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(error instanceof Error ? error.message : "An unexpected error occurred during image generation.");
  }
};
