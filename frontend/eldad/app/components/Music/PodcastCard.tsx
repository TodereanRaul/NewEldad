import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface PodcastCardProps {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  uploadDate: string;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

export default function PodcastCard({
  id,
  title,
  artist,
  thumbnail,
  uploadDate,
  isFavorite,
  onPress,
  onFavoritePress
}: PodcastCardProps) {
  // Truncate podcast title if it's too long
  const truncatedTitle = title.length > 35 
    ? title.substring(0, 35) + '...' 
    : title;

  return (
    <View 
      className="rounded-xl p-4 mb-3"
      style={{
        backgroundColor: 'rgba(147, 112, 219, 0.15)',
        backdropFilter: 'blur(25px)',
        borderWidth: 1,
        borderColor: 'rgba(147, 112, 219, 0.3)',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 10,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        {/* Podcast Header with Icon */}
        <View className="flex-row items-center mb-3">
          <View 
            className="w-12 h-12 rounded-full items-center justify-center mr-3"
            style={{
              backgroundColor: 'rgba(147, 112, 219, 0.3)',
              borderWidth: 1,
              borderColor: 'rgba(147, 112, 219, 0.5)',
            }}
          >
            <FontAwesome name="microphone" size={20} color="#e6e6fa" />
          </View>
          <View className="flex-1">
            <Text className="text-purple-200 text-xs font-medium">
              PODCAST
            </Text>
            <Text className="text-gray-300 text-xs">
              {uploadDate}
            </Text>
          </View>
          <TouchableOpacity onPress={onFavoritePress}>
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={24}
              color={isFavorite ? "red" : "red"}
            />
          </TouchableOpacity>
        </View>

        {/* Thumbnail with Play Overlay */}
        <View className="relative mb-3">
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-24 rounded-lg"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/20 rounded-lg items-center justify-center">
            <View 
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{
                backgroundColor: 'rgba(147, 112, 219, 0.8)',
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <FontAwesome name="play" size={14} color="#ffffff" />
            </View>
          </View>
        </View>

        {/* Content Info */}
        <View className="mb-3">
          <Text
            className="text-white font-semibold text-base mb-1"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {truncatedTitle}
          </Text>
          <Text className="text-purple-200 text-sm font-medium">
            {artist}
          </Text>
        </View>

        {/* Bottom Actions */}
        {/* <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-3">
            <View className="flex-row items-center space-x-1">
              <FontAwesome name="headphones" size={14} color="#e6e6fa" />
              <Text className="text-gray-300 text-xs">Listen</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <FontAwesome name="clock-o" size={12} color="#e6e6fa" />
              <Text className="text-gray-300 text-xs">45 min</Text>
            </View>
          </View>
        </View> */}
      </TouchableOpacity>
    </View>
  );
}