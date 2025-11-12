
import type { ImageStyle, AspectRatio, Inspiration } from './types';

export const IMAGE_STYLES: ImageStyle[] = ['Realistic', 'Cinematic', 'Digital Art', 'Painting', 'Anime', '3D Render'];
export const ASPECT_RATIOS: AspectRatio[] = ['1:1', '16:9', '9:16'];
export const MAX_IMAGES = 4;

export const INSPIRATIONS: Inspiration[] = [
    {
        prompt: "A futuristic cyberpunk city glowing in neon lights, realistic style",
        image: "https://picsum.photos/seed/cyberpunk/512/512"
    },
    {
        prompt: "A peaceful mountain village during sunset, painting style",
        image: "https://picsum.photos/seed/village/512/512"
    },
    {
        prompt: "An ancient Indian temple in the middle of the forest, cinematic style",
        image: "https://picsum.photos/seed/temple/512/512"
    },
    {
        prompt: "Cute cat wearing astronaut suit floating in space, 3d render style",
        image: "https://picsum.photos/seed/catstronaut/512/512"
    }
];
