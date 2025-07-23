import * as Speech from "expo-speech";
import React from "react";
import { Feather } from "@expo/vector-icons";

export type FeatherIconName = keyof typeof Feather.glyphMap;


// CardItem Types
export type CardItem = {
  text: string;
  icon: string;
  color: string;
};

// card
export type Card = {
  item: CardItem;
  favorites: CardItem[];
};

export type CardProps = {
  item: CardItem;
  isSpeaking: boolean;
  isCardDisabled: boolean;
  favorites: CardItem[];
  speakingItem: string | null;
  setSpeakingItem: React.Dispatch<React.SetStateAction<string | null>>;
  toggleFavorite: (item: CardItem) => void;
};

// handlespeech
export type handleSpeechTypes = {
  text: string;
  voiceList: Speech.Voice[] | null;
  setSpeakingItem: React.Dispatch<React.SetStateAction<string | null>>;
  speakingItem: string | null;
  speaker?: string ;
};

// cartegory
export type categoryTypes = {
  categories: string[];
};

// messageList
export type messageListTypes = {
  currentItems?: CardItem[];
  speakingItem: string | null;
  setSpeakingItem: React.Dispatch<React.SetStateAction<string | null>>;
  favorites: CardItem[];
  toggleFavorite: (item: CardItem) => void;
};

// message data
export type mesageDataType = {
  category: string;
  items: CardItem[];
};

// getCurrentItem
export type getCurrentItemType = {
  messageData: mesageDataType[];
  selectedCategory: string;
};

// zustand type

export type storeTypes = {
  favorites: CardItem[];
  speakingItem: string | null;
  voiceList: Speech.Voice[] | null;
  fetchVoices: () => Promise<void>;
  loadFavorites: () => Promise<void>;
  toggleFavorite: (item: CardItem) => Promise<void>;
  isVoiceReady: boolean;
  speaker:string | null;
  setSpeaker: (selectedVoice:string) => Promise<void>;
  userName: string;
  setUserName: (name:string) => void;
  loadUserName: () => Promise<void>;
};

// signIn
export type signInTypes = {
  name: string;
  setUserName: (name:string) => void;
}

// cateories
export type categoriesTypes = {
  selectedCategory: string;
  setSelectedCategory?: (category: string) => void;
};

// isPopular
export type isPopularType = {
  popularLanguageCodes: string[];
  voices: Speech.Voice[] | null;
};

// settingsData
export type settingsDataType = {
  icon: FeatherIconName;
  label: string;
  onPress: () => void;
}

// input modal
export type InputModalType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; 
}
// update name
export type updateNameTypes = {
  name: string;
  setUserName: (name: string) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}