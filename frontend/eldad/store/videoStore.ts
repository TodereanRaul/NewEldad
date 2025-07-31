import { create } from 'zustand';
import { Video } from '../service/api';

interface VideoStore {
  videos: Video[];
  setVideos: (videos: Video[]) => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  videos: [],
  setVideos: (videos) => set({ videos }),
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
})); 