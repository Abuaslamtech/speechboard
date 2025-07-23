import Category from "@/components/Category";
import Header from "@/components/Header";
import MessagesList from "@/components/MessagesList";
import { messageData } from "@/constants/data";
import { useSpeechStore } from "@/store/useSpeechStore";

import { getCurrentItem } from "@/utils/utils";
import { useNavigation } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
  const navigation = useNavigation();
  // states

  const categories = useMemo(
    () => messageData.map((section) => section.category),
    [messageData]
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [speakingItem, setSpeakingItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const currentItems = useMemo(() => {
    return getCurrentItem({ messageData, selectedCategory });
  }, [messageData, selectedCategory]);

  const { favorites, loadFavorites, toggleFavorite, fetchVoices } =
    useSpeechStore();
  // load favorites
  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Start loading
      await loadFavorites();
      setLoading(false); // Done loading

      fetchVoices();
    };
    loadData();
  }, []);

  // hide navigation
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: loading ? { display: "none" } : undefined,
    });
  }, [loading]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {!loading ? (
        <View className="items-center justify-center mt-4">
          <Header />

          {/* Category Tabs */}
          <Category
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Messages List */}

          <MessagesList
            currentItems={currentItems}
            speakingItem={speakingItem}
            setSpeakingItem={setSpeakingItem}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center bg-background">
          <ActivityIndicator size="large" color="#00CFFF" />
          <Text className="mt-2 text-muted text-accentBlue">
            Loading voices and favorites...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
