import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import VideoCard from "../components/Music/VideoCard";
import SearchInput from "../components/ui/SearchInput";
import { useSearch } from "../../hooks/useSearch";

// Sample data for testing
const sampleVideos = [
  {
    id: "1",
    title: "Amazing Grace - Traditional Hymn",
    artist: "Eldad Worship Team",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-15",
    isFavorite: false
  },
  {
    id: "2", 
    title: "How Great Thou Art - Classic Worship",
    artist: "Eldad Choir",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-10",
    isFavorite: true
  },
  {
    id: "3",
    title: "It Is Well With My Soul - Hymn",
    artist: "Eldad Worship Band",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", 
    uploadDate: "2024-01-05",
    isFavorite: false
  },
  {
    id: "4",
    title: "Great Is Thy Faithfulness - Traditional",
    artist: "Eldad Ensemble",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-01", 
    isFavorite: true
  }
];

export default function MusicScreen() {
  const [videos, setVideos] = useState(sampleVideos);

  // Use the search hook
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredData: filteredVideos, 
    clearSearch 
  } = useSearch({
    data: videos,
    searchFields: ['title', 'artist']
  });

  const handleVideoPress = (video: any) => {
    console.log("Video pressed:", video.title);
    // TODO: Implement video player modal
  };

  const handleFavoriteToggle = (video: any) => {
    setVideos(prevVideos => 
      prevVideos.map(v => 
        v.id === video.id 
          ? { ...v, isFavorite: !v.isFavorite }
          : v
      )
    );
    console.log("Favorite toggled for:", video.title);
  };

  return (
    <View className="flex-1 bg-[#242632]">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="px-4">
          {/* Header */}
          <View className="py-4">
            <Text className="text-2xl font-bold text-white mb-2">Music</Text>
            <Text className="text-gray-300 mb-4">
              Discover and enjoy your favorite music. Browse playlists, artists, and albums.
            </Text>
          </View>

          {/* Search Input */}
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search songs or artists..."
            onClear={clearSearch}
            className="mb-4"
          />

          {/* Video Cards */}
          <View className="space-y-2">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                videoTitle={video.title}
                videoArtist={video.artist}
                videoThumbnail={video.thumbnail}
                uploadDate={video.uploadDate}
                isFavorite={video.isFavorite}
                onPress={() => handleVideoPress(video)}
                onFavoritePress={() => handleFavoriteToggle(video)}
              />
            ))}
          </View>

          {/* Empty State */}
          {filteredVideos.length === 0 && searchQuery.length > 0 && (
            <View className="flex-1 justify-center items-center py-10">
              <Text className="text-white text-lg">No songs found</Text>
              <Text className="text-gray-400 text-sm">Try a different search term</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
} 