import React, { useState } from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import VideoCard from "../components/Music/VideoCard";

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
    <SafeAreaView className="flex-1 bg-[#242632]">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="py-4">
          <Text className="text-2xl font-bold text-white mb-2">Music</Text>
          <Text className="text-gray-300">
            Discover and enjoy your favorite music. Browse playlists, artists, and albums.
          </Text>
        </View>

        {/* Video Cards */}
        <View className="space-y-2">
          {videos.map((video) => (
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
      </ScrollView>
    </SafeAreaView>
  );
} 