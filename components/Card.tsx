import { useSpeechStore } from "@/store/useSpeechStore";
import { CardProps } from "@/type/types";
import { handleSpeech } from "@/utils/utils";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function Card({
  item,
  isSpeaking,
  isCardDisabled,
  favorites,
  toggleFavorite,
  speakingItem,
  setSpeakingItem,
}: CardProps) {
  // create an animated value
  const opacity = useSharedValue(1);
  const { voiceList, isVoiceReady } = useSpeechStore();

  // start animation
  useEffect(() => {
    if (isSpeaking) {
      opacity.value = withRepeat(withTiming(0.4, { duration: 1000 }), -1, true);
    } else {
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [isSpeaking]);

  // animated style
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // check if card is favorite
  const { text, icon, color } = item;
  const isFavorite = favorites.some((fav) => fav.text === text);

  if (!isVoiceReady) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#00CFFF" />
        <Text className="text-black mt-4">Loading voices...</Text>
      </View>
    );
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        disabled={isCardDisabled}
        className={`flex justify-center items-center gap-4  w-48 h-48 p-4 border m-2 bg-card rounded-lg shadow ${
          isSpeaking ? "border-accentBlue bg-accentBlue/20" : "border-card"
        }`}
        onPress={() =>
          handleSpeech({ text, voiceList, setSpeakingItem, speakingItem })
        }
      >
        <Pressable
          className="absolute  top-2 right-2 flex items-end ml-auto"
          onPress={() => toggleFavorite(item)}
        >
          <MaterialIcons
            name="favorite"
            color={isFavorite ? "#00CFFF" : "#F2F2F2"}
            size={25}
          />
        </Pressable>
        <Feather name={icon} color={color} size={60} />
        <Text className=" text-textPrimary text-lg text-center">{text}</Text>
      </Pressable>
    </Animated.View>
  );
}
