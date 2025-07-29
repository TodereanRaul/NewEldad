import { Text, View } from "react-native";

export default function MusicScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Music</Text>
      <Text className="text-gray-600 text-center px-6">
        Discover and enjoy your favorite music. Browse playlists, artists, and albums.
      </Text>
    </View>
  );
} 