import * as React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { BlurView } from "expo-blur";

const { width: windowWidth } = Dimensions.get('window');
const PAGE_WIDTH = windowWidth / 2;

interface ImageCarouselProps {
  images: string[];
  height?: number;
  loop?: boolean;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

// Parallax layout function
const parallaxLayout = (
  size: { size: number; vertical: boolean },
  config: {
    parallaxScrollingScale: number;
    parallaxAdjacentItemScale: number;
    parallaxScrollingOffset: number;
  }
) => {
  const { size: itemSize, vertical } = size;
  const {
    parallaxScrollingScale,
    parallaxAdjacentItemScale,
    parallaxScrollingOffset,
  } = config;

  return (value: number) => {
    const translate = interpolate(
      value,
      [-1, 0, 1],
      [
        -(itemSize + parallaxScrollingOffset),
        0,
        itemSize + parallaxScrollingOffset,
      ]
    );

    const scale = interpolate(
      value,
      [-1, 0, 1],
      [parallaxAdjacentItemScale, parallaxScrollingScale, parallaxAdjacentItemScale]
    );

    return {
      transform: vertical
        ? [{ translateY: translate }, { scale }]
        : [{ translateX: translate }, { scale }],
    };
  };
};

interface CarouselItemProps {
  index: number;
  animationValue: Animated.SharedValue<number>;
  imageUrl: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ index, animationValue, imageUrl }) => {
  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [1, 0, 1]);

    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <View
      style={{
        flex: 1,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 8,
      }}
    >
      <View style={{ flex: 1, width: "100%" }}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
      </View>
      <AnimatedBlurView
        intensity={50}
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, maskStyle]}
      />
    </View>
  );
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height = 240,
  loop = true,
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        width: windowWidth,
        height: height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Carousel
        loop={loop}
        style={{
          width: windowWidth,
          height: height,
          justifyContent: "center",
          alignItems: "center",
        }}
        width={PAGE_WIDTH}
        data={images}
        renderItem={({ item, index, animationValue }) => {
          return (
            <CarouselItem
              key={index}
              index={index}
              animationValue={animationValue}
              imageUrl={item}
            />
          );
        }}
        customAnimation={parallaxLayout(
          {
            size: PAGE_WIDTH,
            vertical: false,
          },
          {
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 0.5,
            parallaxScrollingOffset: 40,
          }
        )}
        scrollAnimationDuration={1200}
      />
    </View>
  );
};

export default ImageCarousel; 