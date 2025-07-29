import { Text, View } from "react-native";

export default function KidsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Kids</Text>
      <Text className="text-gray-600 text-center px-6">
        Safe and fun content for children. Educational videos, games, and stories.
      </Text>
    </View>
  );
} 