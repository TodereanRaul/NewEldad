import React, { useState, useMemo, useEffect } from "react";
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, RefreshControl, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoCard from "../components/Music/VideoCard";
import SearchInput from "../components/ui/SearchInput";
import FilterBar from "../components/ui/FilterBar";
import { useSearch } from "../../hooks/useSearch";
import { useFilter } from "../../hooks/useFilter";
import { FontAwesome } from "@expo/vector-icons";
import { api, Video } from "../../service/api";

import KidsCard from "../components/Music/KidsCard";
import PodcastCard from "../components/Music/PodcastCard";
import VeziToateCard from "../components/Music/VeziToateCard";
import FavoriteCard from "../components/Music/FavoriteCard";  
import VideoModal from "../components/Music/VideoModal";

const VIDEOS_CACHE_KEY = 'cached_videos';

export default function MusicScreen() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);

  // Load videos on component mount - only from cache since they're preloaded
  useEffect(() => {
    loadVideosFromCache();
  }, []);

  const loadVideosFromCache = async () => {
    try {
      setError(null);
      const cachedVideos = await loadFromCache();
      if (cachedVideos.length > 0) {
        setVideos(cachedVideos);
        console.log('Loaded videos from cache instantly');
      } else {
        // Only fetch from API if no cache exists (shouldn't happen since preloaded)
        setLoading(true);
        const freshVideos = await fetchVideosFromAPI();
        if (freshVideos.length > 0) {
          setVideos(freshVideos);
          await saveToCache(freshVideos);
        }
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to load videos');
      console.error('Error loading videos:', err);
      setLoading(false);
    }
  };

  const loadFromCache = async (): Promise<Video[]> => {
    try {
      const cachedData = await AsyncStorage.getItem(VIDEOS_CACHE_KEY);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (error) {
      console.log('Error loading from cache:', error);
    }
    return [];
  };

  const saveToCache = async (videos: Video[]) => {
    try {
      await AsyncStorage.setItem(VIDEOS_CACHE_KEY, JSON.stringify(videos));
      console.log('Videos saved to cache');
    } catch (error) {
      console.log('Error saving to cache:', error);
    }
  };

  const fetchVideosFromAPI = async (): Promise<Video[]> => {
    try {
      const fetchedVideos = await api.getVideos();
      return fetchedVideos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  };

  // Only refresh when user explicitly pulls to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const freshVideos = await fetchVideosFromAPI();
      if (freshVideos.length > 0) {
        setVideos(freshVideos);
        await saveToCache(freshVideos);
        console.log('Videos refreshed from API');
      }
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Use the filter hook
  const { activeFilter, changeFilter, filters } = useFilter({
    initialFilter: "Vezi toate",
    filters: ["Vezi toate", "Favorites", "Muzica", "Kids", "Podcast"]
  });

  // Filter content based on active filter
  const filteredContent = useMemo(() => {
    if (activeFilter === "Vezi toate") {
      return videos;
    }
    if (activeFilter === "Favorites") {
      return videos.filter(item => item.is_favorite);
    }
    
    const filterMap = {
      "Muzica": "music",
      "Kids": "kids", 
      "Podcast": "podcast"
    };
    
    const typeFilter = filterMap[activeFilter as keyof typeof filterMap];
    return videos.filter(item => item.category === typeFilter);
  }, [activeFilter, videos]);

  // Use the search hook on filtered content
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredData: searchFilteredContent, 
    clearSearch 
  } = useSearch({
    data: filteredContent,
    searchFields: ['title', 'channel_name']
  });

  const handleContentPress = (item: Video) => {
    setCurrentVideo({
      id: item.video_id, // Use video_id for YouTube player
      title: item.title,
      artist: item.channel_name,
      thumbnail: item.thumbnail,
      uploadDate: new Date(item.published_at).toLocaleDateString('en-GB'),
      type: item.category,
      isFavorite: item.is_favorite || false,
    });
    setModalVisible(true);
  };

  const handleFavoriteToggle = (item: any) => {
    setVideos(prevVideos => 
      prevVideos.map(v => 
        v.id === item.id 
          ? { ...v, is_favorite: !v.is_favorite }
          : v
      )
    );
    console.log("Favorite toggled for:", item.title);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentVideo(null);
  };

  const handleModalFavoriteToggle = (videoId: string) => {
    const video = videos.find(v => v.video_id === videoId);
    if (video) {
      handleFavoriteToggle(video);
    }
  };

  const renderContentCard = (item: Video) => {
    if (activeFilter === "Favorites") {
      return (
        <FavoriteCard
          key={item.id}
          id={item.id.toString()}
          title={item.title}
          artist={item.channel_name}
          thumbnail={item.thumbnail}
          uploadDate={new Date(item.published_at).toLocaleDateString('en-GB')}
          isFavorite={item.is_favorite}
          type={item.category}
          onPress={() => handleContentPress(item)}
          onFavoritePress={() => handleFavoriteToggle(item)}
        />
      );
    } else if (activeFilter === "Vezi toate") {
      return (
        <VeziToateCard
          key={item.id}
          id={item.id.toString()}
          title={item.title}
          artist={item.channel_name}
          thumbnail={item.thumbnail}
          uploadDate={new Date(item.published_at).toLocaleDateString('en-GB')}
          isFavorite={item.is_favorite}
          type={item.category}
          onPress={() => handleContentPress(item)}
          onFavoritePress={() => handleFavoriteToggle(item)}
        />
      );
    } else if (activeFilter === "Podcast") {
      return (
        <PodcastCard
          key={item.id}
          id={item.id.toString()}
          title={item.title}
          artist={item.channel_name}
          thumbnail={item.thumbnail}
          uploadDate={new Date(item.published_at).toLocaleDateString('en-GB')}
          isFavorite={item.is_favorite}
          onPress={() => handleContentPress(item)}
          onFavoritePress={() => handleFavoriteToggle(item)}
        />
      );
    } else if (activeFilter === "Kids") {
      return (
        <KidsCard
          key={item.id}
          id={item.id.toString()}
          title={item.title}
          artist={item.channel_name}
          thumbnail={item.thumbnail}
          uploadDate={new Date(item.published_at).toLocaleDateString('en-GB')}
          isFavorite={item.is_favorite}
          onPress={() => handleContentPress(item)}
          onFavoritePress={() => handleFavoriteToggle(item)}
        />
      );
    } else {
      return (
        <VideoCard
          key={item.id}
          videoTitle={item.title}
          videoArtist={item.channel_name}
          videoThumbnail={item.thumbnail}
          uploadDate={new Date(item.published_at).toLocaleDateString('en-GB')}
          isFavorite={item.is_favorite}
          onPress={() => handleContentPress(item)}
          onFavoritePress={() => handleFavoriteToggle(item)}
        />
      );
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#242632] justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-white text-lg mt-4">Loading videos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#242632] justify-center items-center">
        <Text className="text-red-400 mb-4">{error}</Text>
        <TouchableOpacity onPress={loadVideosFromCache} className="px-4 py-2 bg-blue-500 rounded">
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#242632]">
      {/* Fixed Header */}
      <SafeAreaView className="px-4 mx-4 pt-4 pb-2 bg-[#242632] shadow-b-lg">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-white mb-2">Media</Text>
          <Text className="text-gray-300">
            Discover and enjoy your favorite content. Browse music, kids content, and podcasts.
          </Text>
        </View>

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={changeFilter}
        />

        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={activeFilter === "Vezi toate" ? "Search all content..." : `Search ${activeFilter.toLowerCase()}...`}
          onClear={clearSearch}
          className="mb-4"
        />
      </SafeAreaView>

      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
            colors={["#ffffff"]}
          />
        }
      >
        <View className="px-4">
          {/* Content Cards */}
          <View className="space-y-2">
            {searchFilteredContent.map((item) => renderContentCard(item))}
          </View>

          {/* Empty State */}
          {activeFilter === "Favorites" && searchFilteredContent.length === 0 && (
            <View className="flex-1 justify-center items-center py-10">
              <Text className="text-white text-lg">No favorites yet</Text>
              <Text className="text-gray-400 text-sm">Tap the heart icon to add favorites</Text>
            </View>
          )}

          {/* Empty State for no content */}
          {searchFilteredContent.length === 0 && searchQuery.length === 0 && (
            <View className="flex-1 justify-center items-center py-10">
              <Text className="text-white text-lg">
                {activeFilter === "Vezi toate" ? "No content available" : `No ${activeFilter.toLowerCase()} available`}
              </Text>
              <Text className="text-gray-400 text-sm">Check back later for new content</Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      <VideoModal
        visible={modalVisible}
        onClose={closeModal}
        video={currentVideo}
        onFavoriteToggle={handleModalFavoriteToggle}
      />
    </View>
  );
} 