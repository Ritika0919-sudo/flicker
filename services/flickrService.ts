import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

interface FlickrPhoto {
  id: string;
  title: string;
  url_s?: string;
  farm?: number;
  server?: string;
  secret?: string;
}

interface CacheData {
  timestamp: number;
  photos: FlickrPhoto[];
  response: string;
}

const CACHE_KEY = 'flickr_photos_cache';
const FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';

export const flickrService = {
  async getPhotos(): Promise<{ photos: FlickrPhoto[]; isCache: boolean; error?: string }> {
    try {
      const state = await NetInfo.fetch();
      const isOnline = state.isConnected;

      if (isOnline) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);
          const response = await fetch(FLICKR_API_URL, {
            signal: controller.signal,
          }).finally(() => clearTimeout(timeoutId));

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const data = await response.json();
          const photos = data.photos?.photo || [];
          const responseStr = JSON.stringify(photos);

          // Get cached data to compare
          const cachedData = await this.getCachedData();

          // Only update cache if response changed
          if (!cachedData || cachedData.response !== responseStr) {
            const cacheData: CacheData = {
              timestamp: Date.now(),
              photos,
              response: responseStr,
            };
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
          }

          return { photos, isCache: false };
        } catch (apiError) {
          console.log('API fetch error, falling back to cache:', apiError);
          // Fall back to cache if API fails
          const cachedData = await this.getCachedData();
          if (cachedData) {
            return { photos: cachedData.photos, isCache: true };
          }
          throw apiError;
        }
      } else {
        // Offline - use cache
        const cachedData = await this.getCachedData();
        if (cachedData) {
          return { photos: cachedData.photos, isCache: true };
        }
        throw new Error('No cached data available and app is offline');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error in getPhotos:', errorMessage);
      return {
        photos: [],
        isCache: false,
        error: errorMessage,
      };
    }
  },

  async getCachedData(): Promise<CacheData | null> {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  },

  async clearCache(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },
};
