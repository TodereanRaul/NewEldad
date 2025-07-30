import React, { useState } from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import SearchInput from "../components/ui/SearchInput";
import { useSearch } from "../../hooks/useSearch";
import { FontAwesome } from "@expo/vector-icons";

// Sample podcast data for testing
const samplePodcasts = [
  {
    id: "1",
    title: "Daily Devotional - Morning Prayer",
    host: "Pastor John Smith",
    description: "Start your day with prayer and reflection",
    duration: "15 min",
    uploadDate: "2024-01-15",
    isFavorite: false
  },
  {
    id: "2", 
    title: "Bible Study - Book of Romans",
    host: "Dr. Sarah Johnson",
    description: "Deep dive into the teachings of Paul",
    duration: "45 min",
    uploadDate: "2024-01-10",
    isFavorite: true
  },
  {
    id: "3",
    title: "Youth Ministry - Building Faith",
    host: "Youth Pastor Mike",
    description: "Engaging discussions for young believers",
    duration: "30 min",
    uploadDate: "2024-01-05",
    isFavorite: false
  },
  {
    id: "4",
    title: "Worship Music Discussion",
    host: "Music Director Lisa",
    description: "Exploring the power of worship through music",
    duration: "25 min",
    uploadDate: "2024-01-01", 
    isFavorite: true
  }
];

export default function PodcastScreen() {
  const [podcasts, setPodcasts] = useState(samplePodcasts);

  // Use the search hook for podcasts
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredData: filteredPodcasts, 
    clearSearch 
  } = useSearch({
    data: podcasts,
    searchFields: ['title', 'host', 'description']
  });

  const handlePodcastPress = (podcast: any) => {
    console.log("Podcast pressed:", podcast.title);
    // TODO: Implement podcast player
  };

  const handleFavoriteToggle = (podcast: any) => {
    setPodcasts(prevPodcasts => 
      prevPodcasts.map(p => 
        p.id === podcast.id 
          ? { ...p, isFavorite: !p.isFavorite }
          : p
      )
    );
    console.log("Favorite toggled for:", podcast.title);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#242632]">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="py-4">
          <Text className="text-2xl font-bold text-white mb-2">Podcast</Text>
          <Text className="text-gray-300 mb-4">
            Listen to your favorite podcasts. Discover new shows and episodes.
          </Text>
        </View>

        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search podcasts, hosts, or topics..."
          onClear={clearSearch}
          className="mb-4"
        />

        {/* Podcast Cards */}
        <View className="space-y-3">
          {filteredPodcasts.map((podcast) => (
            <View key={podcast.id} className="bg-white/5 rounded-lg p-4">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-white font-semibold text-lg mb-1">
                    {podcast.title}
                  </Text>
                  <Text className="text-gray-300 text-sm mb-1">
                    {podcast.host}
                  </Text>
                  <Text className="text-gray-400 text-xs mb-2">
                    {podcast.description}
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-400 text-xs">
                      {podcast.duration} • {podcast.uploadDate}
                    </Text>
                    <View className="flex-row items-center space-x-2">
                      <Text className="text-white text-xs">Play</Text>
                      <FontAwesome
                        name={podcast.isFavorite ? "heart" : "heart-o"}
                        size={20}
                        color="red"
                        onPress={() => handleFavoriteToggle(podcast)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Empty State */}
        {filteredPodcasts.length === 0 && searchQuery.length > 0 && (
          <View className="flex-1 justify-center items-center py-10">
            <Text className="text-white text-lg">No podcasts found</Text>
            <Text className="text-gray-400 text-sm">Try a different search term</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 