const API_BASE_URL = 'http://localhost:8000/api/v1';

export interface Video {
  id: number;
  title: string;
  video_id: string;
  thumbnail: string;
  category: 'music' | 'kids' | 'podcast' | 'reels' | 'video' | 'autres';
  published_at: string;
  channel_id: string;
  channel_name: string;
  is_favorite: boolean;
}

export const api = {
  // Fetch all videos
  async getVideos(): Promise<Video[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },

  // Fetch videos by category
  async getVideosByCategory(category: string): Promise<Video[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${category}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${category} videos:`, error);
      throw error;
    }
  },

  // Fetch videos from specific channel
  async getVideosByChannel(channelId: string): Promise<Video[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/?channel_id=${channelId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching videos from channel ${channelId}:`, error);
      throw error;
    }
  },

  // Toggle favorite status
  async toggleFavorite(videoId: string): Promise<{success: boolean, is_favorite: boolean}> {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${videoId}/favorite/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }
};