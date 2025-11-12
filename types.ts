
export type ImageStyle = 'Realistic' | 'Cinematic' | 'Digital Art' | 'Painting' | 'Anime' | '3D Render';
export type AspectRatio = '1:1' | '16:9' | '9:16';

export interface FormState {
  prompt: string;
  style: ImageStyle;
  count: number;
  aspectRatio: AspectRatio;
}

export interface Inspiration {
  prompt: string;
  image: string;
}
