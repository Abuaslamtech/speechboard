import { messageData } from "@/constants/data";
import { categoriesTypes } from "@/type/types";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Category({
  selectedCategory,
  setSelectedCategory,
}: categoriesTypes) {
  const categories = messageData.map((section) => section.category);

  return (
    <View className="flex-row bg-card rounded-full p-2 border  mt-8 space-x-2">
      {categories.map((category: string) => (
        <Pressable
          key={category}
          onPress={() => setSelectedCategory?.(category)}
          className={`px-3 py-2 rounded-full ${
            selectedCategory === category ? " bg-accentBlue" : "text-gray-200"
          }`}
        >
          <Text
            className={`text-sm ${
              selectedCategory === category ? "text-card" : "text-textPrimary"
            }`}
          >
            {category}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
