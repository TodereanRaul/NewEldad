import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

interface BibleVerse {
  text: string;
  reference: string;
  translation?: string;
}

interface DailyBibleVerseProps {
  className?: string;
  showLoading?: boolean;
  customVerse?: BibleVerse;
}

export default function DailyBibleVerse({ 
  className = '', 
  showLoading = false,
  customVerse 
}: DailyBibleVerseProps) {
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default verse (fallback)
  const defaultVerse: BibleVerse = {
    text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
    translation: "NIV"
  };

  // Future function to fetch from backend
  const fetchDailyVerse = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('https://your-backend.com/api/daily-verse');
      // const data = await response.json();
      // setVerse(data);
      
      // For now, use default verse
      setVerse(defaultVerse);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (err) {
      setError('Failed to load daily verse');
      setVerse(defaultVerse); // Fallback to default
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customVerse) {
      setVerse(customVerse);
    } else {
      fetchDailyVerse();
    }
  }, [customVerse]);

  if (showLoading && loading) {
    return (
      <View className={`bg-white border border-gray-200 rounded-lg p-6 mx-6 shadow-sm ${className}`}>
        <View className="flex items-center justify-center py-8">
          <ActivityIndicator size="large" color="#f89406" />
          <Text className="text-gray-600 mt-2">Loading daily verse...</Text>
        </View>
      </View>
    );
  }

  if (error && !verse) {
    return (
      <View className={`bg-white border border-gray-200 rounded-lg p-6 mx-6 shadow-sm ${className}`}>
        <Text className="text-red-500 text-center">Failed to load daily verse</Text>
      </View>
    );
  }

  const currentVerse = verse || defaultVerse;

  return (
    <View className={`bg-gray-200 rounded-lg p-6 mx-6  ${className}`}>
      <Text className="text-gray-900 text-lg font-semibold mb-3">Bible Verse of the Day</Text>
      
      <Text className="text-gray-600 text-base leading-6 mb-3 italic">
        "{currentVerse.text}"
      </Text>
      
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-500 text-sm">{currentVerse.reference}</Text>
        {currentVerse.translation && (
          <Text className="text-gray-400 text-xs">{currentVerse.translation}</Text>
        )}
      </View>
      
      {loading && (
        <View className="mt-3">
          <ActivityIndicator size="small" color="#f89406" />
        </View>
      )}
    </View>
  );
} 