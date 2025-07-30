import React, { useState } from "react";
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import SearchInput from "../components/ui/SearchInput";
import { useSearch } from "../../hooks/useSearch";
import { FontAwesome } from "@expo/vector-icons";

// Sample radio station data for testing
const sampleRadioStations = [
  {
    id: "1",
    name: "Radio Eldad",
    genre: "Christian",
    isLive: true,
    listeners: 150,
    description: "Christian music and teachings"
  },
  {
    id: "2", 
    name: "Radio Hope",
    genre: "Gospel",
    isLive: true,
    listeners: 89,
    description: "Gospel music and inspiration"
  },
  {
    id: "3",
    name: "Radio Worship",
    genre: "Worship",
    isLive: false,
    listeners: 234,
    description: "24/7 worship music"
  },
  {
    id: "4",
    name: "Radio Prayer",
    genre: "Christian",
    isLive: true,
    listeners: 67,
    description: "Prayer and meditation music"
  }
];

export default function RadioScreen() {
  const [radioStations, setRadioStations] = useState(sampleRadioStations);

  // Use the search hook for radio stations
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredData: filteredStations, 
    clearSearch 
  } = useSearch({
    data: radioStations,
    searchFields: ['name', 'genre', 'description']
  });

  const handleStationPress = (station: any) => {
    console.log("Radio station pressed:", station.name);
    // TODO: Implement radio player
  };

  const handlePlayPress = (station: any) => {
    console.log("Play radio station:", station.name);
    // TODO: Implement play functionality
  };

  return (
    <SafeAreaView className="flex-1 bg-[#242632]">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="px-4">
          {/* Header */}
          <View className="py-4">
            <Text className="text-2xl font-bold text-white mb-2">Radio</Text>
            <Text className="text-gray-300 mb-4">
              Listen to live Christian radio stations and broadcasts.
            </Text>
          </View>

          {/* Search Input */}
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search radio stations..."
            onClear={clearSearch}
            className="mb-4"
          />

          {/* Radio Station Cards */}
          <View className="space-y-3">
            {filteredStations.map((station) => (
              <View key={station.id} className="bg-white/5 rounded-lg p-4">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text className="text-white font-semibold text-lg">
                        {station.name}
                      </Text>
                      {station.isLive && (
                        <View className="ml-2 bg-red-500 px-2 py-1 rounded-full">
                          <Text className="text-white text-xs font-bold">LIVE</Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-gray-300 text-sm mb-1">
                      {station.genre}
                    </Text>
                    <Text className="text-gray-400 text-xs mb-2">
                      {station.description}
                    </Text>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-gray-400 text-xs">
                        {station.listeners} listeners
                      </Text>
                      <View className="flex-row items-center space-x-2">
                        <TouchableOpacity 
                          onPress={() => handlePlayPress(station)}
                          className="bg-[#F5B841] px-3 py-1 rounded-full"
                        >
                          <Text className="text-white text-xs font-semibold">Play</Text>
                        </TouchableOpacity>
                        <FontAwesome
                          name="heart-o"
                          size={20}
                          color="#666"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Empty State */}
          {filteredStations.length === 0 && searchQuery.length > 0 && (
            <View className="flex-1 justify-center items-center py-10">
              <Text className="text-white text-lg">No radio stations found</Text>
              <Text className="text-gray-400 text-sm">Try a different search term</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 