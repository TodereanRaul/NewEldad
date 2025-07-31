import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Animated } from 'react-native';
import { Redirect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/api';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Start timer for minimum 3 seconds
        const startTime = Date.now();
        
        // Preload videos
        console.log('App starting - loading videos...');
        const videos = await api.getVideos();
        await AsyncStorage.setItem('cached_videos', JSON.stringify(videos));
        console.log('Videos preloaded successfully');
        
        // Calculate remaining time to ensure minimum 3 seconds
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 3000 - elapsedTime);
        
        // Wait for remaining time if needed
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
        // Smooth fade out before redirecting
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // Increased duration for smoother transition
          useNativeDriver: true,
        }).start(() => {
          setIsLoading(false);
        });
        
      } catch (error) {
        console.log('App initialization failed:', error);
        // Even on error, ensure minimum 3 seconds
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
        backgroundColor: '#ffffff', // Changed to white
        opacity: fadeAnim
      }}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ 
          marginTop: 10, 
          color: '#333333', // Changed to dark text for white background
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
