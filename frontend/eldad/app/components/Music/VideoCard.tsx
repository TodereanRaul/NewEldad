import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface VideoCardProps {
  videoTitle: string;
  videoArtist: string;
  videoThumbnail: string;
  uploadDate: string;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

export default function VideoCard({
  videoTitle,
  videoArtist,
  videoThumbnail,
  uploadDate,
  isFavorite,
  onPress,
  onFavoritePress
}: VideoCardProps) {
  // Truncate video title if it's too long
  const truncatedVideoTitle = videoTitle.length > 30 
    ? videoTitle.substring(0, 30) + '...' 
    : videoTitle;

  return (
    <View className="rounded-lg shadow-md mb-1 overflow-hidden">
      {/* Video Information Container */}
      <View className="flex-row items-center justify-between py-2 px-2">
        <TouchableOpacity onPress={onPress}>
          {/* Image Container */}
          <View className="flex-row items-center">
            <View className="relative">
              <Image
                source={{ uri: videoThumbnail }}
                className="w-20 h-20 rounded-lg"
                resizeMode="cover"
              />
              <View className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/30 rounded-lg">
                <FontAwesome name="play-circle" size={35} color="#F5B841"/>
              </View>
            </View>

            {/* Text Container */}
            <View className="ml-4 flex-col justify-between">
              <Text
                className="text-base font-bold text-white/95"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {truncatedVideoTitle}
              </Text>
              <Text className="text-white/80 text-sm">{videoArtist}</Text>
              <Text className="text-white/60 text-xs">{uploadDate}</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        {/* Like Button */}
        <View className="flex-row items-center">
          <TouchableOpacity onPress={onFavoritePress}>
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={30}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}