import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

export default function SearchInput({ 
  value, 
  onChangeText, 
  placeholder = "Search...",
  onClear,
  className = ""
}: SearchInputProps) {
  return (
    <View className={`flex-row items-center bg-white/10 rounded-lg px-3 py-2 ${className}`}>
      <FontAwesome name="search" size={16} color="#666" />
      <TextInput
        className="flex-1 ml-2 placeholder:text-gray-400 text-white"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
      {value.length > 0 && onClear && (
        <TouchableOpacity onPress={onClear}>
          <FontAwesome name="times-circle" size={16} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
} 