import React, { useState, useRef } from "react";
import { View, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get('window');

interface SimpleImageCarouselProps {
  images: string[];
  height?: number;
  showIndicators?: boolean;
}

const SimpleImageCarousel: React.FC<SimpleImageCarouselProps> = ({
  images,
  height = 200,
  showIndicators = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <View style={{ height }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ height }}
      >
        {images.map((imageUrl, index) => (
          <View
            key={index}
            style={{
              width: screenWidth,
              height: height,
              paddingHorizontal: 16,
            }}
          >
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
              }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {showIndicators && images.length > 1 && (
        <View
          style={{
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => scrollToIndex(index)}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: index === activeIndex ? "#F5B841" : "rgba(255, 255, 255, 0.3)",
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      )}

      {/* {images.length > 1 && (
        <>
          <TouchableOpacity
            onPress={() => {
              const newIndex = activeIndex > 0 ? activeIndex - 1 : images.length - 1;
              scrollToIndex(newIndex);
            }}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: [{ translateY: -20 }],
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const newIndex = activeIndex < images.length - 1 ? activeIndex + 1 : 0;
              scrollToIndex(newIndex);
            }}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: [{ translateY: -20 }],
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </>
      )} */}
    </View>
  );
};

export default SimpleImageCarousel; 