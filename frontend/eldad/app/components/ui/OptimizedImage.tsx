import React from 'react';
import { Image as ExpoImage } from 'expo-image';
import { View, ActivityIndicator } from 'react-native';

interface OptimizedImageProps {
  source: string | number;
  width?: number;
  height?: number;
  borderRadius?: number;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  className?: string;
  style?: any;
}

export default function OptimizedImage({
  source,
  width = 200,
  height = 200,
  borderRadius = 0,
  contentFit = 'cover',
  className,
  style,
}: OptimizedImageProps) {
  return (
    <ExpoImage
      source={typeof source === 'string' ? { uri: source } : source}
      style={[
        {
          width: typeof width === 'string' ? width : width,
          height,
          borderRadius,
        },
        style,
      ]}
      contentFit={contentFit}
      transition={200}
      placeholder="blurhash"
      className={className}
    />
  );
} 