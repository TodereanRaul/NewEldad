import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface FilterButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

export default function FilterButton({ title, isActive, onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full mr-2 ${
        isActive 
          ? 'bg-[#f89406]' 
          : 'bg-gray-700'
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          isActive 
            ? 'text-black' 
            : 'text-white'
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
} 