import { useColorScheme } from '@/hooks/use-color-scheme';
import { flickrService } from '@/services/flickrService';
import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface FlickrPhoto {
  id: string;
  title: string;
  url_s?: string;
}

export default function HomeScreen() {
  const [photos, setPhotos] = useState<FlickrPhoto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCache, setIsCache] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme();

  const loadPhotos = useCallback(async () => {
    try {
      setError(null);
      const result = await flickrService.getPhotos();
      setPhotos(result.photos);
      setIsCache(result.isCache);
      if (result.error && photos.length === 0) {
        setError(result.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load photos';
      setError(errorMessage);
      console.error('Error loading photos:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [photos.length]);

  React.useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPhotos();
  }, [loadPhotos]);

  const renderItem = ({ item }: { item: FlickrPhoto }) => (
    <View style={styles.photoContainer}>
      {item.url_s ? (
        <Image
          source={{ uri: item.url_s }}
          style={styles.photo}
          contentFit="cover"
          cachePolicy="memory-disk"
        />
      ) : (
        <View style={[styles.photo, styles.placeholderContainer]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]} numberOfLines={2}>
        {item.title || 'Untitled'}
      </Text>
    </View>
  );

  if (loading && photos.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      {isCache && <Text style={styles.cacheIndicator}>Showing Cached Images</Text>}
      {error && photos.length === 0 && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  photoContainer: {
    width: '48%',
    marginBottom: 8,
  },
  photo: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 12,
  },
  title: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  cacheIndicator: {
    textAlign: 'center',
    color: '#ff6600',
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  errorText: {
    textAlign: 'center',
    color: '#ff0000',
    paddingVertical: 8,
    fontSize: 12,
  },
});
