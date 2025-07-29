import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import NextEvents from './components/ui/NextEvents';

export default function EventsModal() {
  const router = useRouter();

  return (
    
    <View className="flex-1 bg-[#242632]">
      {/* Header with back button */}
      <View className="flex-row items-center p-6 pt-12">
        <TouchableOpacity 
          onPress={() => router.back()}
        //   className="bg-[#f89406]/10 px-4 py-2 rounded-lg"
        >
          <Text className="text-[#f89406] font-medium text-lg">Inapoi</Text>
        </TouchableOpacity>
      </View>
      
      {/* Events list */}
      {/* <View >
        <Text className="text-white text-center text-2xl font-medium">Evenimente</Text>
      </View> */}
         
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <NextEvents 
          maxEvents={20}
          showLoading={false}
          hideHeader={true}
        />
      </ScrollView>
    
    </View>
  );
}
