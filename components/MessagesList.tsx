import { messageListTypes } from "@/type/types";
import React from "react";
import { FlatList } from "react-native";
import Card from "./Card";

export default function MessagesList({
  currentItems,
  speakingItem,
  setSpeakingItem,
  favorites,
  toggleFavorite,
}: messageListTypes) {
  return (
    <FlatList
      data={currentItems}
      keyExtractor={(item, index) => `${item.text}-${index}`}
      renderItem={({ item }) => (
        <Card
          item={item}
          isSpeaking={speakingItem === item.text}
          isCardDisabled={speakingItem !== null && speakingItem !== item.text}
          setSpeakingItem={setSpeakingItem}
          speakingItem={speakingItem}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
      numColumns={2}
      contentContainerStyle={{
        paddingBottom: 100,
        paddingTop: 20,
      }}
    />
  );
}
