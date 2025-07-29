import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/app/constants/Colors";
import { useColorScheme } from "@/app/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#242632',
        borderTopWidth: 0,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Acasa",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: "Muzica",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="music" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="kids"
        options={{
          title: "Kids",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="child" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="podcast"
        options={{
          title: "Podcast",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="microphone" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: "Ajutoare",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 