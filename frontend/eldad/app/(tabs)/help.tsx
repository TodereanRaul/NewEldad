import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { API_BASE_URL } from "../../config/api";
import SimpleImageCarousel from "../components/ui/SimpleImageCarousel";

// Define the AjutorareItem type
interface AjutorareItem {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  created_at: string;
  updated_at: string;
  images: string[];
}

// Custom AjutorareCard component
const AjutorareCard = ({ 
  item
}: { 
  item: AjutorareItem; 
}) => {
  return (
    <View className="mx-4 mb-6 overflow-hidden rounded-lg border border-white/15" style={{
      backgroundColor: 'rgba(36, 38, 50, 0.85)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    }}>
      {/* Header */}
      <View className="p-4 border-b border-white/10">
        <Text className="text-xl font-semibold text-center text-[#F5B841]">
          {item.title}
        </Text>
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Thumbnail */}
        {item.thumbnail && (
          <View className="mb-4">
            <Image
              source={{ uri: item.thumbnail }}
              className="w-full h-48 rounded-lg"
              resizeMode="cover"
            />
          </View>
        )}

        {/* Description */}
        <View className="mb-4">
          <Text className="text-white/90 text-base leading-6">
            {item.description}
          </Text>
        </View>

        {/* Additional Images */}
        {item.images && item.images.length > 0 && (
          <View className="mb-4">
            <Text className="text-white text-lg font-semibold mb-3">
              Imagini suplimentare:
            </Text>
            <SimpleImageCarousel
              images={item.images.map(image => 
                image.startsWith('http') ? image : `https://4a45368cbff3.ngrok-free.app${image}`
              )}
              height={200}
              showIndicators={true}
            />
          </View>
        )}

        {/* Created Date */}
        {/* <View className="pt-4 border-t border-white/10 flex-row items-center">
          <Ionicons name="calendar" size={16} color="#f89406" />
          <Text className="text-white/70 text-sm ml-2">
            Creat la: {new Date(item.created_at).toLocaleDateString('ro-RO')}
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default function HelpScreen() {
  const insets = useSafeAreaInsets();
  const [ajutorareItems, setAjutorareItems] = useState<AjutorareItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch ajutorare items from API
  useEffect(() => {
    fetchAjutorareItems();
  }, []);

  const fetchAjutorareItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = `${API_BASE_URL}/ajutorare/`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle paginated response - extract results array
      let items = [];
      if (data && typeof data === 'object') {
        if (Array.isArray(data)) {
          // Direct array response
          items = data;
        } else if (data.results && Array.isArray(data.results)) {
          // Paginated response with results field
          items = data.results;
        }
      }
      
      setAjutorareItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching ajutorare items:', err);
      // Set empty array on error to prevent map errors
      setAjutorareItems([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ paddingTop: insets.top }}
        className="flex-1 bg-[#242632] justify-center items-center"
      >
        <ActivityIndicator size="large" color="#F5B841" />
        <Text className="text-white mt-4">Se încarcă...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{ paddingTop: insets.top }}
        className="flex-1 bg-[#242632] justify-center items-center"
      >
        <Ionicons name="alert-circle" size={64} color="#F5B841" />
        <Text className="text-white text-lg mt-4 text-center mx-4">
          Eroare la încărcarea datelor: {error}
        </Text>
        <TouchableOpacity
          onPress={fetchAjutorareItems}
          className="bg-[#F5B841] px-6 py-3 rounded-lg mt-4"
        >
          <Text className="text-white font-semibold">Încearcă din nou</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-[#242632]">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        

        {/* Ajutorare Items List */}
        <View>
          {(ajutorareItems || []).map((item) => (
            <AjutorareCard
              key={item.id}
              item={item}
            />
          ))}
        </View>
        
        {(!ajutorareItems || ajutorareItems.length === 0) && (
          <View className="flex-1 justify-center items-center py-10">
            <Ionicons name="document-text" size={64} color="#F5B841" />
            <Text className="text-white text-lg mt-4">Nu s-au găsit elemente de ajutor</Text>
            <Text className="text-white/60 text-sm mt-2 text-center mx-4">
              Momentan nu sunt disponibile elemente de ajutor. Încearcă din nou mai târziu.
            </Text>
          </View>
        )}
        
        {/* Contact Section */}
        <View className="mx-4 mb-4 mt-6">
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
      </ScrollView>
    </View>
  );
} 