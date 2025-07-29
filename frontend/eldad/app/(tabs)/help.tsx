import { Text, View } from "react-native";

export default function HelpScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Help</Text>
      <Text className="text-gray-600 text-center px-6">
        Need assistance? Find answers to common questions and get support here.
      </Text>
    </View>
  );
} 