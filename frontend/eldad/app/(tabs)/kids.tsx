import React, { useState } from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import SearchInput from "../components/ui/SearchInput";
import { useSearch } from "../../hooks/useSearch";
import { FontAwesome } from "@expo/vector-icons";

// Sample kids content data for testing
const sampleKidsContent = [
  {
    id: "1",
    title: "Bible Stories for Kids - Noah's Ark",
    category: "Bible Stories",
    ageGroup: "3-8 years",
    duration: "10 min",
    description: "Learn about Noah and the great flood",
    uploadDate: "2024-01-15",
    isFavorite: false
  },
  {
    id: "2", 
    title: "Christian Songs for Children",
    category: "Music",
    ageGroup: "2-10 years",
    duration: "15 min",
    description: "Fun and educational Christian songs",
    uploadDate: "2024-01-10",
    isFavorite: true
  },
  {
    id: "3",
    title: "Prayer Time for Little Ones",
    category: "Prayer",
    ageGroup: "4-8 years",
    duration: "8 min",
    description: "Simple prayers children can learn",
    uploadDate: "2024-01-05",
    isFavorite: false
  },
  {
    id: "4",
    title: "Coloring Pages - Jesus Loves Me",
    category: "Activities",
    ageGroup: "3-6 years",
    duration: "5 min",
    description: "Printable coloring pages with Bible themes",
    uploadDate: "2024-01-01", 
    isFavorite: true
  }
];

export default function KidsScreen() {
  const [kidsContent, setKidsContent] = useState(sampleKidsContent);

  // Use the search hook for kids content
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredData: filteredKidsContent, 
    clearSearch 
  } = useSearch({
    data: kidsContent,
    searchFields: ['title', 'category', 'description']
  });

  const handleContentPress = (content: any) => {
    console.log("Kids content pressed:", content.title);
    // TODO: Implement content player/viewer
  };

  const handleFavoriteToggle = (content: any) => {
    setKidsContent(prevContent => 
      prevContent.map(c => 
        c.id === content.id 
          ? { ...c, isFavorite: !c.isFavorite }
          : c
      )
    );
    console.log("Favorite toggled for:", content.title);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#242632]">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="py-4">
          <Text className="text-2xl font-bold text-white mb-2">Kids</Text>
          <Text className="text-gray-300 mb-4">
            Safe and fun content for children. Educational videos, games, and stories.
          </Text>
        </View>

        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search kids content, categories..."
          onClear={clearSearch}
          className="mb-4"
        />

        {/* Kids Content Cards */}
        <View className="space-y-3">
          {filteredKidsContent.map((content) => (
            <View key={content.id} className="bg-white/5 rounded-lg p-4">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-white font-semibold text-lg mb-1">
                    {content.title}
                  </Text>
                  <View className="flex-row items-center space-x-2 mb-1">
                    <Text className="text-yellow-400 text-sm font-medium">
                      {content.category}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      {content.ageGroup}
                    </Text>
                  </View>
                  <Text className="text-gray-400 text-xs mb-2">
                    {content.description}
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-400 text-xs">
                      {content.duration} • {content.uploadDate}
                    </Text>
                    <View className="flex-row items-center space-x-2">
                      <Text className="text-white text-xs">Play</Text>
                      <FontAwesome
                        name={content.isFavorite ? "heart" : "heart-o"}
                        size={20}
                        color="red"
                        onPress={() => handleFavoriteToggle(content)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Empty State */}
        {filteredKidsContent.length === 0 && searchQuery.length > 0 && (
          <View className="flex-1 justify-center items-center py-10">
            <Text className="text-white text-lg">No content found</Text>
            <Text className="text-gray-400 text-sm">Try a different search term</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 