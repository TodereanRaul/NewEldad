import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Animated } from 'react-native';
import { Redirect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/api';
import { useVideoStore } from '../store/videoStore';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));
  const { setVideos, setIsLoaded } = useVideoStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const startTime = Date.now();
        
        console.log('App starting - loading videos...');
        const videos = await api.getVideos();
        
        // Set videos in global store
        setVideos(videos);
        setIsLoaded(true);
        
        // Cache for persistence
        await AsyncStorage.setItem('cached_videos', JSON.stringify(videos));
        console.log('Videos preloaded and stored globally');
        
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 3000 - elapsedTime);
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setIsLoading(false);
        });
        
      } catch (error) {
        console.log('App initialization failed:', error);
        const startTime = Date.now();
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 3000 - elapsedTime);
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setIsLoading(false);
        });
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <Animated.View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#ffffff',
        opacity: fadeAnim
      }}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ 
          marginTop: 10, 
          color: '#333333',
          fontSize: 16,
          fontWeight: '500'
        }}>
          Loading videos...
        </Text>
      </Animated.View>
    );
  }

  return <Redirect href="/(tabs)" />;
}
