import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Back Button */}
      <View className="px-4 pt-2">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="flex flex-row items-center gap-2 w-fit"
        >
          <Feather name="arrow-left" size={24} color="#00bfff" />
          <Text className="text-accentBlue text-base">Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mt-4 mb-6">
          <View className="flex flex-row justify-center items-center gap-3 px-4 py-3 bg-card/50 rounded-2xl">
            <Feather name="info" size={32} color="#00bfff" />
            <Text className="text-textPrimary text-3xl font-bold">About</Text>
          </View>
        </View>
        {/* Main Content */}
        <View className="px-4 pb-8">
          <View className="bg-card rounded-2xl p-6 shadow-sm">
            {/* App Description */}
            <View className="mb-6">
              <Text className="text-accentBlue text-lg font-semibold text-center mb-3">
                SpeechBoard
              </Text>
              <Text className="text-textPrimary text-base leading-6 text-center">
                A personalized communication tool designed to make speaking easier, faster, and more accessible for everyone.
              </Text>
            </View>
            {/* Features Section */}
            <View className="mb-6">
              <Text className="text-accentBlue text-lg font-semibold mb-4">
                Key Features
              </Text>
              <View className="flex flex-col gap-8">
                <View className="flex flex-row items-start gap-3">
                  <Feather name="folder" size={18} color="#00bfff" className="mt-1" />
                  <Text className="text-textPrimary text-base flex-1 leading-6">
                    Browse categorized phrases and messages
                  </Text>
                </View>
                <View className="flex flex-row items-start gap-3">
                  <Feather name="star" size={18} color="#00bfff" className="mt-1" />
                  <Text className="text-textPrimary text-base flex-1 leading-6">
                    Save and favorite your most-used messages
                  </Text>
                </View>
                <View className="flex flex-row items-start gap-3">
                  <Feather name="volume-2" size={18} color="#00bfff" className="mt-1" />
                  <Text className="text-textPrimary text-base flex-1 leading-6">
                    Instantly speak selected text using high-quality voices
                  </Text>
                </View>
                <View className="flex flex-row items-start gap-3">
                  <Feather name="settings" size={18} color="#00bfff" className="mt-1" />
                  <Text className="text-textPrimary text-base flex-1 leading-6">
                    Customize your speech experience to match your voice and tone
                  </Text>
                </View>
              </View>
            </View>
            {/* Mission Statement */}
            <View className="border-t border-border pt-6">
              <Text className="text-accentBlue text-base leading-6 text-center italic">
                We believe that communication should never be a barrier. SpeechBoard helps bridge that gap one message at a time.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}