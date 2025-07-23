import { storeTypes } from "@/type/types";
import {
  getData,
  handleFavorite,
  isPopular,
  popularLanguageCodes,
} from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { create } from "zustand";

export const useSpeechStore = create<storeTypes>((set, get) => ({
  loadFavorites: async () => {
    const stored = await AsyncStorage.getItem("favorites")
    const result = stored ?  JSON.parse(stored) : []
    set({ favorites: result });
  },
  favorites: [],
  toggleFavorite: async (item) => {
    const state = get();
    const updatedFavorites = await handleFavorite({
      item,
      favorites: state.favorites,
    });
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    set({ favorites: updatedFavorites });
  },
  speakingItem: null,
  voiceList: null,
  userName: "",
  loadUserName: async () => {
    const name = await AsyncStorage.getItem("name");
    if (name) {
      set({ userName: name });
    }
  },
  setUserName: async (name: string) => {
    await AsyncStorage.setItem("name", name);
    set({ userName: name });
  },
  isVoiceReady: false,
  speaker: null,
  setSpeaker: async (selectedVoice: string) => {
    set({ speaker: selectedVoice });
  },

  fetchVoices: async () => {
    // get voices
    const voices = await Speech.getAvailableVoicesAsync();
    const popularVoices = isPopular({ popularLanguageCodes, voices });
    Speech.speak(" ");

    // update state
    set({ voiceList: popularVoices });
    set({ isVoiceReady: true });
  },
}));
