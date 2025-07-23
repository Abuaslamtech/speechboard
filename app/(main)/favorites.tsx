
import Header from "@/components/Header";
import MessagesList from "@/components/MessagesList";
import { useSpeechStore } from "@/store/useSpeechStore";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const [speakingItem, setSpeakingItem] = useState<string | null>(null);

  const { favorites, loadFavorites, toggleFavorite } = useSpeechStore();

  // load favorites
  useEffect(() => {
    loadFavorites();
  }, []);

  // hide navigation
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: undefined,
    });
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="items-center justify-center mt-4">
        <Header />

        <View className="flex flex-row justify-center gap-4 mt-8 items-center p-4 ">
          <Feather name="heart" size={40} color="#00bfff" />
          <Text className="text-textPrimary text-4xl font-bold">Favorites</Text>
        </View>

        {/* Messages List */}
        <MessagesList
          currentItems={favorites}
          speakingItem={speakingItem}
          setSpeakingItem={setSpeakingItem}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </View>
    </SafeAreaView>
  );
}
