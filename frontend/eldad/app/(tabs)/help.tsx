import React, { useState } from "react";
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, Modal, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import VideoCard from "../components/Music/VideoCard";
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

const categories = [
  {
    id: 'tutorial',
    title: 'Tutoriale',
    description: 'Ghiduri pas cu pas pentru utilizarea aplicației și funcționalitățile disponibile.',
    icon: 'school',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    videos: [
      {
        id: "1",
        title: "Cum să navighezi în aplicație",
        youtubeId: "VJVN8QLNIv8",
        thumbnail: "https://i3.ytimg.com/vi/VJVN8QLNIv8/maxresdefault.jpg",
        uploadDate: "15 martie 2024",
        artist: "Eldad Media"
      },
      {
        id: "2",
        title: "Cum să adaugi favorite",
        youtubeId: "Yun5cu4Ie0c",
        thumbnail: "https://i3.ytimg.com/vi/Yun5cu4Ie0c/maxresdefault.jpg",
        uploadDate: "20 martie 2024",
        artist: "Eldad Media"
      }
    ]
  },
  {
    id: 'faq',
    title: 'Întrebări Frecvente',
    description: 'Răspunsuri la cele mai comune întrebări despre aplicație și serviciile noastre.',
    icon: 'help-circle',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    videos: [
      {
        id: "3",
        title: "Cum să raportezi o problemă",
        youtubeId: "IfPkIH_zM0w",
        thumbnail: "https://i3.ytimg.com/vi/IfPkIH_zM0w/maxresdefault.jpg",
        uploadDate: "25 martie 2024",
        artist: "Eldad Media"
      },
      {
        id: "4",
        title: "Cum să contactezi suportul",
        youtubeId: "n3oIP25QitU",
        thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
        uploadDate: "30 martie 2024",
        artist: "Eldad Media"
      }
    ]
  },
  {
    id: 'support',
    title: 'Suport Tehnic',
    description: 'Asistență tehnică pentru probleme cu aplicația sau întrebări despre funcționalități.',
    icon: 'settings',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    videos: [
      {
        id: "5",
        title: "Rezolvarea problemelor comune",
        youtubeId: "VJVN8QLNIv8",
        thumbnail: "https://i3.ytimg.com/vi/VJVN8QLNIv8/maxresdefault.jpg",
        uploadDate: "5 aprilie 2024",
        artist: "Eldad Media"
      },
      {
        id: "6",
        title: "Actualizări și îmbunătățiri",
        youtubeId: "Yun5cu4Ie0c",
        thumbnail: "https://i3.ytimg.com/vi/Yun5cu4Ie0c/maxresdefault.jpg",
        uploadDate: "10 aprilie 2024",
        artist: "Eldad Media"
      }
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Informații de contact și modalități de a ne ajunge pentru asistență.',
    icon: 'mail',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    videos: [
      {
        id: "7",
        title: "Cum să ne contactezi",
        youtubeId: "IfPkIH_zM0w",
        thumbnail: "https://i3.ytimg.com/vi/IfPkIH_zM0w/maxresdefault.jpg",
        uploadDate: "15 aprilie 2024",
        artist: "Eldad Media"
      },
      {
        id: "8",
        title: "Programul de suport",
        youtubeId: "n3oIP25QitU",
        thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
        uploadDate: "20 aprilie 2024",
        artist: "Eldad Media"
      }
    ]
  }
];

export default function HelpScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [playing, setPlaying] = useState(false);

  const filteredVideos = selectedCategory
    ? categories
        .find(cat => cat.id === selectedCategory)
        ?.videos || []
    : [];

  const renderCategoryCard = (category: any) => (
    <TouchableOpacity
      key={category.id}
      onPress={() => setSelectedCategory(category.id)}
      className="mx-4 mb-6 overflow-hidden rounded-lg bg-[#2C3E50]"
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={{ uri: category.image }}
          className="w-full h-48 opacity-60"
          resizeMode="cover"
        />
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/40" />
        <View className="absolute bottom-0 left-0 right-0 p-4">
          <View className="flex-row items-center mb-2">
            <Text className="text-xl font-semibold" style={{ color: '#F5B841' }}>
              {category.title}
            </Text>
          </View>
          <Text className="text-white/90 text-sm">
            {category.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-[#242632]"
    >
      {/* Header */}
      <View className="mx-4 space-y-1 mb-2">
        <View className="flex justify-between items-center flex-row">
          <Text className="text-2xl font-semibold text-white">Ajutor</Text>
          <Ionicons name="help-circle" size={32} color="#F5B841" />
        </View>
      </View>

      <ScrollView>
        {selectedCategory ? (
          <>
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => setSelectedCategory(null)}
              className="mx-4 mb-4 flex-row items-center"
            >
              <Ionicons name="arrow-back" size={24} color="#F5B841" />
              <Text className="text-[#F5B841] ml-2 font-semibold">
                Înapoi la categorii
              </Text>
            </TouchableOpacity>

            {/* Category Title */}
            <View className="mx-4 mb-4">
              <Text className="text-2xl font-semibold text-white">
                {categories.find(cat => cat.id === selectedCategory)?.title}
              </Text>
            </View>

            {/* Videos for selected category */}
            <View className="flex-row flex-wrap justify-between">
              {filteredVideos.map((item) => (
                <View key={item.id} className="w-[46%] mx-2 my-3">
                  <VideoCard
                    videoTitle={item.title}
                    videoArtist={item.artist}
                    videoThumbnail={item.thumbnail}
                    uploadDate={item.uploadDate}
                    isFavorite={false}
                    onPress={() => {
                      setCurrentVideo(item);
                      setModalVisible(true);
                      setPlaying(true);
                    }}
                    onFavoritePress={() => {}}
                  />
                </View>
              ))}
            </View>
            {filteredVideos.length === 0 && (
              <View className="flex-1 justify-center items-center py-10">
                <Text className="text-white text-lg">Nu s-au găsit videoclipuri</Text>
              </View>
            )}
          </>
        ) : (
          <>
            {/* Category Cards */}
            {categories.map(renderCategoryCard)}
            
            {/* Contact Section */}
            <View className="mx-4 mb-4">
              <View className="bg-[#2C3E50] rounded-lg p-6 mb-4">
                <Text className="text-white text-xl font-semibold text-center mb-2">
                  Ai nevoie de ajutor?
                </Text>
                <Text className="text-white/60 text-lg text-center font-medium mb-4">
                  Echipa noastră este aici să te ajute cu orice întrebare ai avea.
                </Text>

                {/* Email Contact */}
                <TouchableOpacity 
                  className="bg-[#0070BA] rounded-lg p-4 mb-4 flex-row items-center justify-center"
                  onPress={() => {/* Add email link */}}
                >
                  <Ionicons name="mail" size={24} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    Trimite email
                  </Text>
                </TouchableOpacity>

                {/* Contact Info */}
                <View className="bg-white/10 rounded-lg p-4">
                  <Text className="text-white font-semibold mb-2">
                    Informații de contact
                  </Text>
                  <Text className="text-white/80 text-sm mb-1">
                    Email: suport@eldad.ro
                  </Text>
                  <Text className="text-white/80 text-sm mb-1">
                    Telefon: +40 123 456 789
                  </Text>
                  <Text className="text-white/80 text-sm">
                    Program: Luni-Vineri 9:00-17:00
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Video Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 16,
              width: width * 0.9,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              {currentVideo && (
                <Text
                  style={{
                    flex: 1,
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {currentVideo.title}
                </Text>
              )}
              <View style={{ width: 24 }} />
            </View>

            {currentVideo && (
              <YoutubePlayer
                height={(width * 9) / 16}
                width="100%"
                videoId={currentVideo.youtubeId}
                play={playing}
                onChangeState={(state: any) => {
                  if (state === "ended") {
                    setPlaying(false);
                    setModalVisible(false);
                  }
                }}
              />
            )}

            {currentVideo && (
              <View>
                <Text className="text-base font-medium text-gray-800">
                  Artist: {currentVideo.artist}
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  Uploaded on: {currentVideo.uploadDate}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
} 