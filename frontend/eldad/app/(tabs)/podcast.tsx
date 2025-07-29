import { Text, View } from "react-native";

export default function PodcastScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Podcast</Text>
      <Text className="text-gray-600 text-center px-6">
        Listen to your favorite podcasts. Discover new shows and episodes.
      </Text>
    </View>
  );
} 