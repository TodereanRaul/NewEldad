import React, { useState, useMemo } from "react";
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native";
import VideoCard from "../components/Music/VideoCard";
import SearchInput from "../components/ui/SearchInput";
import FilterBar from "../components/ui/FilterBar";
import { useSearch } from "../../hooks/useSearch";
import { useFilter } from "../../hooks/useFilter";
import { FontAwesome } from "@expo/vector-icons";

import KidsCard from "../components/Music/KidsCard";
import PodcastCard from "../components/Music/PodcastCard";
import VeziToateCard from "../components/Music/VeziToateCard";
import FavoriteCard from "../components/Music/FavoriteCard";  
import VideoModal from "../components/Music/VideoModal";

// Sample music data
const sampleMusic = [
  {
    id: "m1",
    title: "Amazing Grace - Traditional Hymn",
    artist: "Eldad Worship Team",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-15",
    isFavorite: false,
    type: "music"
  },
  {
    id: "m2", 
    title: "How Great Thou Art - Classic Worship",
    artist: "Eldad Choir",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-10",
    isFavorite: true,
    type: "music"
  },
  {
    id: "m3",
    title: "It Is Well With My Soul - Hymn",
    artist: "Eldad Worship Band",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", 
    uploadDate: "2024-01-05",
    isFavorite: false,
    type: "music"
  },
  {
    id: "m4",
    title: "Great Is Thy Faithfulness - Traditional",
    artist: "Eldad Ensemble",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-01", 
    isFavorite: true,
    type: "music"
  }
];

// Sample kids data
const sampleKids = [
  {
    id: "k1",
    title: "Bible Stories for Kids - Noah's Ark",
    artist: "Kids Ministry",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-15",
    isFavorite: false,
    type: "kids"
  },
  {
    id: "k2",
    title: "Christian Songs for Children",
    artist: "Children's Choir",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-10",
    isFavorite: true,
    type: "kids"
  },
  {
    id: "k3",
    title: "Prayer Time for Little Ones",
    artist: "Kids Worship",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-05",
    isFavorite: false,
    type: "kids"
  }
];

// Sample podcast data
const samplePodcasts = [
  {
    id: "p1",
    title: "Daily Devotional - Morning Prayer",
    artist: "Pastor John Smith",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-15",
    isFavorite: false,
    type: "podcast"
  },
  {
    id: "p2", 
    title: "Bible Study - Book of Romans",
    artist: "Dr. Sarah Johnson",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-10",
    isFavorite: true,
    type: "podcast"
  },
  {
    id: "p3",
    title: "Youth Ministry - Building Faith",
    artist: "Youth Pastor Mike",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-05",
    isFavorite: false,
    type: "podcast"
  },
  {
    id: "p4",
    title: "Worship Music Discussion",
    artist: "Music Director Lisa",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    uploadDate: "2024-01-01", 
    isFavorite: true,
    type: "podcast"
  }
];

export default function MusicScreen() {
  // Combine all content
  const allContent = [...sampleMusic, ...sampleKids, ...samplePodcasts];
  const [content, setContent] = useState(allContent);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);

  // Use the filter hook
  const { activeFilter, changeFilter, filters } = useFilter({
    initialFilter: "Vezi toate",
    filters: ["Vezi toate", "Favorites", "Muzica", "Kids", "Podcast"]
  });

  // Filter content based on active filter
  const filteredContent = useMemo(() => {
    if (activeFilter === "Vezi toate") {
      return content; // Use content instead of allContent to reflect favorite changes
    }
    if (activeFilter === "Favorites") {
      return content.filter(item => item.isFavorite);
    }
    
    const filterMap = {
      "Muzica": "music",
      "Kids": "kids", 
      "Podcast": "podcast"
    };
    
    const typeFilter = filterMap[activeFilter as keyof typeof filterMap];
    return content.filter(item => item.type === typeFilter); // Use content instead of allContent
  }, [activeFilter, content]);

  // Use the search hook on filtered content
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredData: searchFilteredContent, 
    clearSearch 
  } = useSearch({
    data: filteredContent,
    searchFields: ['title', 'artist']
  });

  const handleContentPress = (item: any) => {
    setCurrentVideo(item);
    setModalVisible(true);
  };

  const handleFavoriteToggle = (item: any) => {
    setContent(prevContent => 
      prevContent.map(c => 
        c.id === item.id 
          ? { ...c, isFavorite: !c.isFavorite }
          : c
      )
    );
    console.log("Favorite toggled for:", item.title);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentVideo(null);
  };

  const handleModalFavoriteToggle = (videoId: string) => {
    handleFavoriteToggle({ id: videoId });
  };

  const renderContentCard = (item: any) => {
    if (activeFilter === "Favorites") {
      return (
        <FavoriteCard
          key={item.id}
          id={item.id}
          title={item.title}
          artist={item.artist}
          thumbnail={item.thumbnail}
          uploadDate={item.uploadDate}
          isFavorite={item.isFavorite}
          type={item.type}
          onPress={() => handleContentPress(item)}
          onFavoritePress={() => handleFavoriteToggle(item)}
        />
      );
    } else if (activeFilter === "Vezi toate") {
      return (
        <VeziToateCard
          key={item.id}
          id={item.id}
          title={item.title}
          artist={item.artist}
          thumbnail={item.thumbnail}
          uploadDate={item.uploadDate}
          isFavorite={item.isFavorite}
          type={item.type}
          onPress={() => handleContentPress(item)}
          onFavoritePress={() => handleFavoriteToggle(item)}
        />
      );
    } else if (activeFilter === "Podcast") {
      // Podcast card design
      return (
        <PodcastCard
      key={item.id}
      id={item.id}
      title={item.title}
      artist={item.artist}
      thumbnail={item.thumbnail}
      uploadDate={item.uploadDate}
      isFavorite={item.isFavorite}
      onPress={() => handleContentPress(item)}
      onFavoritePress={() => handleFavoriteToggle(item)}
    />
      );
    } else if (activeFilter === "Kids") {
      // Kids card design
      return (
        <KidsCard
        key={item.id}
        id={item.id} // Add this line
        title={item.title}
        artist={item.artist}
        thumbnail={item.thumbnail}
        uploadDate={item.uploadDate}
        isFavorite={item.isFavorite}
        onPress={() => handleContentPress(item)}
        onFavoritePress={() => handleFavoriteToggle(item)}
      />
      );

    } else {
      // Music card design (using existing VideoCard)
      return (
        <VideoCard
          key={item.id}
          videoTitle={item.title}
          videoArtist={item.artist}
          videoThumbnail={item.thumbnail}
          uploadDate={item.uploadDate}
          isFavorite={item.isFavorite}
          onPress={() => handleContentPress(item)}
          onFavoritePress={() => handleFavoriteToggle(item)}
        />
      );
    }
  };

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