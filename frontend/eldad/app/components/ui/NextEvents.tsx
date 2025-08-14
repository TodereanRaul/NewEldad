import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../../../config/api';

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  type: 'mission' | 'concert' | 'prayer' | 'meeting';
}

interface NextEventsProps {
  className?: string;
  showLoading?: boolean;
  customEvents?: Event[];
  maxEvents?: number;
  hideHeader?: boolean;
}

export default function NextEvents({ 
  className = '', 
  showLoading = false,
  customEvents,
  maxEvents = 3,
  hideHeader = false
}: NextEventsProps) {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default events (fallback)
  const defaultEvents: Event[] = [
    {
      id: '1',
      title: 'Misiune în România',
      date: '2024-12-15',
      time: '18:00',
      location: 'Biserica El-Shadai, Spania',
      description: 'Turneu misionar în România pentru sprijinul familiilor',
      type: 'mission'
    },
    {
      id: '2',
      title: 'Concert de Crăciun',
      date: '2024-12-24',
      time: '20:00',
      location: 'Centrul Comunității',
      description: 'Concert special de Crăciun cu muzică spirituală',
      type: 'concert'
    },
    {
      id: '3',
      title: 'Rugăciune Comunitate',
      date: '2024-12-30',
      time: '19:00',
      location: 'Casa de Rugăciune',
      description: 'Sesiune de rugăciune pentru comunitate',
      type: 'prayer'
    }
  ];

  // Fetch events from backend
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/events/upcoming/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setEvents(data);
      } else {
        throw new Error('Invalid data format');
      }
      
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
      setEvents(defaultEvents); // Fallback to default
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customEvents) {
      setEvents(customEvents);
    } else {
      fetchEvents();
    }
  }, [customEvents]);

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'mission':
        return 'globe';
      case 'concert':
        return 'music';
      case 'prayer':
        return 'heart'; // or 'praying-hands', 'cross', 'star', 'lightbulb-o'
      case 'meeting':
        return 'users';
      default:
        return 'calendar';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (showLoading && loading) {
    return (
      <View className={`bg-white border border-gray-200 rounded-lg p-6 mx-6 shadow-sm ${className}`}>
        <View className="flex items-center justify-center py-8">
          <ActivityIndicator size="large" color="#f89406" />
          <Text className="text-gray-600 mt-2">Loading events...</Text>
        </View>
      </View>
    );
  }

  if (error && events.length === 0) {
    return (
      <View className={`bg-white border border-gray-200 rounded-lg p-6 mx-6 shadow-sm ${className}`}>
        <Text className="text-red-500 text-center">Failed to load events</Text>
      </View>
    );
  }

  const displayEvents = events.slice(0, maxEvents);

  return (
    <View className={`bg-[#242632]/50 border border-white/10 rounded-lg p-6 mx-6 my-6 shadow-sm ${className}`}>
      {!hideHeader && (
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-lg font-semibold">Următoarele Evenimente</Text>
          <TouchableOpacity onPress={() => router.push('/events')}>
            <Text className="text-[#f89406] text-sm font-medium">Vezi toate</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {displayEvents.map((event, index) => (
        <View key={event.id} className={`${index > 0 ? 'border-t border-white/10 pt-4 mt-4' : ''}`}>
          <View className="flex-row items-start">
            <View className="bg-[#f89406]/10 p-2 mr-3 mt-1 rounded-lg h-10 w-10 flex items-center justify-center">
              <FontAwesome 
                name={getEventIcon(event.type) as any} 
                size={16} 
                color="#f89406" 
              />
            </View>
            
            <View className="flex-1">
              <Text className="text-white font-medium text-base mb-1">
                {event.title}
              </Text>
              
              <View className="flex-row items-center mb-1">
                <FontAwesome name="calendar" size={12} color="#f89406" />
                <Text className="text-white text-sm ml-2">
                  {formatDate(event.date)}
                </Text>
                {event.time && (
                  <>
                    <FontAwesome name="clock-o" size={12} color="#f89406" className="ml-3" />
                    <Text className="text-white text-sm ml-2">{event.time}</Text>
                  </>
                )}
              </View>
              
              {event.location && (
                <View className="flex-row items-center mb-2">
                  <FontAwesome name="map-marker" size={12} color="#f89406" />
                  <Text className="text-white text-sm ml-2">{event.location}</Text>
                </View>
              )}
              
              {event.description && (
                <Text className="text-white text-sm leading-5">
                  {event.description}
                </Text>
              )}
            </View>
          </View>
        </View>
      ))}
      
      {loading && (
        <View className="mt-4 pt-4 border-t border-white/10">
          <ActivityIndicator size="small" color="#f89406" />
        </View>
      )}
    </View>
  );
}
