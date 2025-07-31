import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface KidsCardProps {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  uploadDate: string;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

export default function KidsCard({
  id,
  title,
  artist,
  thumbnail,
  uploadDate,
  isFavorite,
  onPress,
  onFavoritePress
}: KidsCardProps) {
  // Truncate title if it's too long
  const truncatedTitle = title.length > 30 
    ? title.substring(0, 30) + '...' 
    : title;

  return (
    <View 
      className="rounded-xl p-4 mb-3"
      style={{
        backgroundColor: 'rgba(255, 193, 7, 0.15)',
        backdropFilter: 'blur(20px)',
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.3)',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        {/* Header with Type Badge and Favorite */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <View 
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{
                backgroundColor: 'rgba(255, 193, 7, 0.3)',
                borderWidth: 1,
                borderColor: 'rgba(255, 193, 7, 0.5)',
              }}
            >
              <FontAwesome name="child" size={16} color="#ffffff" />
            </View>
            <View>
              <Text 
                className="text-xs font-bold"
                style={{ color: '#ffc107' }}
              >
                KIDS
              </Text>
              <Text className="text-gray-300 text-xs">
                {uploadDate}
              </Text>
            </View>
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
            className="w-full h-28 rounded-lg"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/20 rounded-lg items-center justify-center">
            <View 
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              <FontAwesome name="play" size={16} color="#ffffff" />
            </View>
          </View>
        </View>

        {/* Content Info */}
        <View>
          <Text
            className="text-white font-semibold text-base mb-1"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {truncatedTitle}
          </Text>
          <Text 
            className="text-sm font-medium"
            style={{ color: '#ffc107' }}
          >
            {artist}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}