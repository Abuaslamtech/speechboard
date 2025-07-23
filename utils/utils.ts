import {
  Card,
  getCurrentItemType,
  handleSpeechTypes,
  isPopularType,
  signInTypes,
  updateNameTypes,
} from "@/type/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as Speech from "expo-speech";

// handleFavorite
export async function handleFavorite({ item, favorites }: Card) {
  const exist = favorites.some((fav) => fav.text === item.text);

  const updatedFavorites = exist
    ? favorites.filter((fav) => fav.text !== item.text)
    : [...favorites, item];
  try {
    const jsonValue = JSON.stringify(updatedFavorites);
    await AsyncStorage.setItem("favorites", jsonValue);
  } catch (error) {
    console.log(error);
  }
  return updatedFavorites;
}

// Update favorites

export const getData = async () => {
  try {
    const favoriteData = await AsyncStorage.getItem("favorites");
    const favorites = favoriteData ? JSON.parse(favoriteData) : [];
    return favorites;
  } catch (error) {
    console.log(error);
  }
};

// handle speech
export async function handleSpeech({
  text,
  voiceList,
  setSpeakingItem,
  speakingItem,
  speaker,
}: handleSpeechTypes) {
  if (!voiceList) {
    console.log("TTS Engine not ready");
    return;
  }
  const currentlySpeaking = await Speech.isSpeakingAsync();

  if (currentlySpeaking && speakingItem === text) {
    Speech.pause();
    setSpeakingItem(null);
    return;
  }
  setSpeakingItem(text);

  Speech.speak(text, {
    voice: speaker,
    onDone: () => setSpeakingItem(null),
    onStopped: () => setSpeakingItem(null),
    onError: () => setSpeakingItem(null),
  });
}
// get current item
export function getCurrentItem({
  messageData,
  selectedCategory,
}: getCurrentItemType) {
  const currentItems =
    messageData.find((section) => section.category === selectedCategory)
      ?.items || [];

  return currentItems;
}

// navigate to home
export const signIn = async ({ name, setUserName }: signInTypes) => {
  await AsyncStorage.setItem("onboarded", "true");
  await AsyncStorage.setItem("name", name);
  setUserName(name);
  router.replace("/(main)");
};
// sort languages
export const isPopular = ({ popularLanguageCodes, voices }: isPopularType) => {
  const popularLanguages = voices?.filter((voice) =>
    popularLanguageCodes.includes(voice.language)
  );
  return popularLanguages;
};

export const popularLanguageCodes = [
  "en-US", // English (US)
  "en-GB", // English (UK)
];

// languageMap
export const getLanguageName = (code: string): string => {
  const map: Record<string, string> = {
    "en-US": "English (US)",
    "en-GB": "English (UK)",
  };
  return map[code] || code;
};

// update name
export const updateName = async ({
  name,
  setUserName,
  setIsModalOpen,
}: updateNameTypes) => {
  await AsyncStorage.setItem("name", name);
  setUserName(name);
  setIsModalOpen(false);
};
