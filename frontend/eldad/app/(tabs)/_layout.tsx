import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import { useColorScheme } from "@/app/hooks/useColorScheme";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <View style={{ flex: 1, backgroundColor: '#242632' }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(36, 38, 50, 0.85)',
            borderTopWidth: 0,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
            marginHorizontal: 16,
            marginBottom: 20,
            borderRadius: 25,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backdropFilter: 'blur(20px)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Acasa",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="music"
          options={{
            title: "Media",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="library-music" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="radio"
          options={{
            title: "Radio",
            tabBarIcon: ({ color, size }) => (
              <Feather name="radio" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="help"
          options={{
            title: "Ajutoare",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="hands-helping" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
} 