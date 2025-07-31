import React, { useState, useMemo, useEffect } from "react";
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
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

export default function MusicScreen() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedVideos = await api.getVideos();
      setVideos(fetchedVideos);
    } catch (err) {
      setError('Failed to fetch videos');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
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
      return videos.filter(item => item.isFavorite);
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
    setCurrentVideo(item);
    setModalVisible(true);
  };

  const handleFavoriteToggle = (item: Video) => {
    setVideos(prevVideos => 
      prevVideos.map(v => 
        v.id === item.id 
          ? { ...v, isFavorite: !v.isFavorite }
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
    const cardProps = {
      key: item.id,
      id: item.id.toString(),
      title: item.title,
      artist: item.channel_name,
      thumbnail: item.thumbnail,
      uploadDate: new Date(item.published_at).toLocaleDateString(),
      isFavorite: item.isFavorite || false,
      type: item.category,
      onPress: () => handleContentPress(item),
      onFavoritePress: () => handleFavoriteToggle(item),
    };

    if (activeFilter === "Favorites") {
      return <FavoriteCard {...cardProps} />;
    } else if (activeFilter === "Vezi toate") {
      return <VeziToateCard {...cardProps} />;
    } else if (activeFilter === "Podcast") {
      return <PodcastCard {...cardProps} />;
    } else if (activeFilter === "Kids") {
      return <KidsCard {...cardProps} />;
    } else {
      return <VideoCard {...cardProps} />;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading videos...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
        <TouchableOpacity onPress={fetchVideos} style={{ padding: 10, backgroundColor: '#007AFF', borderRadius: 5 }}>
          <Text style={{ color: 'white' }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ padding: 20, backgroundColor: 'white' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>
            Music & Videos
          </Text>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={clearSearch}
            placeholder="Search videos..."
          />
        </View>

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={changeFilter}
        />

        {/* Content */}
        <View style={{ padding: 20 }}>
          {searchFilteredContent.length === 0 ? (
            <View style={{ alignItems: 'center', padding: 40 }}>
              <Text style={{ fontSize: 16, color: '#666' }}>
                No videos found
              </Text>
            </View>
          ) : (
            searchFilteredContent.map(renderContentCard)
          )}
        </View>
      </ScrollView>

      {/* Video Modal */}
      {currentVideo && (
        <VideoModal
          visible={modalVisible}
          videoId={currentVideo.video_id}
          title={currentVideo.title}
          artist={currentVideo.channel_name}
          isFavorite={currentVideo.isFavorite || false}
          onClose={closeModal}
          onFavoriteToggle={handleModalFavoriteToggle}
        />
      )}
    </SafeAreaView>
  );
} 