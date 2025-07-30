import { Text, View, ScrollView, Linking } from "react-native";
import OptimizedImage from "../components/ui/OptimizedImage";
import CustomButton from "../components/ui/CustomButton";
import DailyBibleVerse from "../components/ui/DailyBibleVerse";
import NextEvents from "../components/ui/NextEvents";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#242632]">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="">
          {/* About Eldad */}
          <View className="backdrop-blur-sm rounded-lg p-6 mb-6 shadow-sm">
            <Text className="text-3xl text-center font-semibold text-[#f89406] mb-5">Oameni pentru oameni... Suflete pentru Dumnezeu...</Text>
            <View className="mb-4">
              <OptimizedImage
                source={require('../../assets/images/eldad-team.jpg')}
                width={400}
                height={200}
                borderRadius={12}
                contentFit="cover"
              />
            </View>
            <Text className="text-white font-bold text-2xl text-center leading-6 my-4">Cine suntem?</Text>
              <Text className="text-white text-lg leading-6 mb-4 text-center">
          Grupul Eldad Spania a fost înființat în mai 2008 de Cristian și
              Mariana Drăgușin, împreună cu Emanuel Dincă și Alexandru
              Sighiartău, având ca scop răspândirea mesajului Evangheliei prin
              misiuni și muzică.
          </Text>
          <Text className="text-white text-lg leading-6 mb-4 text-center">
          Grupul s-a extins treptat și a organizat mai
              multe turnee misionare în România, sprijinind familii și
              comunități, în special în timpul crizei economice din 2012. De-a
              lungul anilor, echipa s-a schimbat, dar rugăciunea, posturile și
              dedicarea membrilor au rămas esențiale pentru succesul lucrării.
          </Text>
          <Text className="text-white text-lg leading-6 text-center">
          Grupul continuă să servească și să inspire prin credință și
          misiuni.
          </Text>
          
          <View className="flex items-center mt-4">
            <CustomButton
              title="Citeste mai multe"
              icon="book"
              onPress={() => Linking.openURL('https://www.eldad.ro/echipa-eldad/')}
              size="large"
              className="w-full"
            />
          </View>
        </View>

        {/* Bible Verse of the Day */}
        <DailyBibleVerse className="mb-6" />
               {/* Viziune Section */}
        <NextEvents />
        {/* Viziunea Noastră */}
        <View className="relative rounded-lg mx-6 my-6 shadow-sm overflow-hidden">
          <OptimizedImage
            source={require('../../assets/images/viziune.jpg')}
            width={400}
            height={200}
            contentFit="cover"
            borderRadius={12}
            className="absolute inset-0"
          />
          <View className="relative z-10">
            <Text className="text-white text-2xl font-bold  my-4 text-center">Viziunea Noastră</Text>
            <Text className="text-white text-lg leading-6 mb-4 text-center">
            Într-o vreme ca aceasta avem nevoie de modele, oameni după inima lui Dumnezeu, care să împânzească platformele de internet, cu mărturii vii, sfaturi curate și sănătoase și care să promoveze sfinţenia, calea cea mai bună spre a fii plăcuți lui Dumnezeu.
            Scopul adânc al misiunii noastre este de a aduce laudă și onoare lui Dumnezeu, să-L vestim pe El și Mântuirea de care ne bucuram noi înşine!            </Text>
            
            <View className="mt-4">
              <CustomButton
                title="Citeste mai multe"
                icon="eye"
                onPress={() => 
                  // router.push('/viziune')
                Linking.openURL('https://www.eldad.ro/viziune/')}
                size="large"
                className="w-full"
              />
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
} 