import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

// This is a shim for web and Android where the tab bar is generally opaque.
export default function TabBarBackground() {
  if (Platform.OS === 'ios') {
    return <BlurView 
      intensity={20}
      tint="dark"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: 'rgba(36, 38, 50, 0.8)' // #242632 with opacity
      }} 
    />;
  }
  return null;
}

export function useBottomTabOverflow() {
  return 0;
}
