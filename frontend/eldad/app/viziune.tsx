import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ViziuneModal() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#242632]">
      {/* Header with back button */}
      <View className="flex-row justify-between p-6 pt-12">
        <TouchableOpacity 
          onPress={() => router.back()}
          // className="bg-[#f89406]/10 px-4 py-2 rounded-lg"
        >
          <Text className="text-[#f89406] font-medium text-lg">Inapoi</Text>
        </TouchableOpacity>
        {/* <Text className="text-white text-2xl text-center font-medium">Viziunea Noastră</Text> */}
        <View style={{ width: 80 }} />
      </View>
      
      {/* Content */}
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="bg-[#242632]/50 border border-white/10 rounded-lg p-6 mb-6">
          <Text className="text-white text-xl font-bold mb-4 text-center">
            Misiunea Noastră
          </Text>
          <Text className="text-white text-base leading-6 mb-4">
            Viziunea Grupului Eldad este să aducem speranță și iubire prin Evanghelie 
            în toate locurile unde suntem chemați să slujim. Credem că fiecare suflet 
            merită să cunoască iubirea lui Dumnezeu și să experimenteze transformarea 
            pe care o aduce Evanghelia.
          </Text>
          
          <Text className="text-white text-xl font-bold mb-4 text-center">
            Valorile Noastre
          </Text>
          <Text className="text-white text-base leading-6 mb-4">
            • <Text className="font-semibold">Credința</Text> - Baza tuturor lucrurilor pe care le facem{'\n'}
            • <Text className="font-semibold">Iubirea</Text> - Motoarele care ne împinge să slujim{'\n'}
            • <Text className="font-semibold">Speranța</Text> - Mesajul pe care îl aducem în lume{'\n'}
            • <Text className="font-semibold">Comunitatea</Text> - Modul în care construim împreună{'\n'}
            • <Text className="font-semibold">Dedicarea</Text> - Angajamentul nostru față de misiune
          </Text>
          
          <Text className="text-white text-xl font-bold mb-4 text-center">
            Obiectivele Noastre
          </Text>
          <Text className="text-white text-base leading-6">
            Să construim comunități puternice în credință, să inspirăm generații 
            viitoare să urmeze calea lui Hristos, să sprijinim familiile în nevoie 
            și să răspândim mesajul Evangheliei prin muzică, rugăciune și acțiuni 
            concrete de iubire.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
