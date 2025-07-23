import { useSpeechStore } from "@/store/useSpeechStore";
import { signIn } from "@/utils/utils";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

export default function IndexScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const {setUserName} = useSpeechStore()

  useEffect(() => {
    const checkOnboarded = async () => {
      const onboarded = await AsyncStorage.getItem("onboarded");
      if (onboarded === "true" ) {
        router.replace("/(main)");
      }
    };
    checkOnboarded();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 mt-8 justify-center items-center">
        <View className="flex flex-col w-full h-5/6 justify-between items-center">
          <View className="flex flex-col gap-8 justify-between items-center">
            <Text className="text-accentBlue text-lg font-semi-old">
              Welcome to
            </Text>
            <Image
              source={require("@/assets/images/logo.png")}
              className="w-32 h-32"
              resizeMode="cover"
            />
            <Text className="text-accentBlue font-bold text-4xl">
              SpeechBoard
            </Text>
          </View>
          <TouchableOpacity
            className="bg-accentBlue w-4/5 p-4 rounded-lg"
            onPress={() => setIsModalOpen(true)}
          >
            <Text className="text-center font-semibold text-lg">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>

        <Modal visible={isModalOpen} animationType="slide" transparent>
          <View className="flex-1 items-center justify-end">
            <View className="bg-accentBlue flex justify-center items-center gap-8 h-1/2 w-11/12 rounded-3xl">
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor="#1B1C1E"
                className="border text-card border-card w-4/5 p-4 rounded-lg"
                value={name}
                onChangeText={setName}
              />
              <TouchableOpacity
                className="bg-card w-4/5 p-4 rounded-lg"
                onPress={() => {
                  const trimmed = name.trim();
                  if (!trimmed) {
                    Alert.alert("Name cannot be empty");
                    return;
                  }
                    if (trimmed.length < 3) {
                    Alert.alert("Name cannot have less than 3 characters");
                    return;
                  }
                  signIn({ name: trimmed , setUserName});
                }}
              >
                <View className="flex flex-row justify-center items-center gap-2">
                  <Text className="text-accentBlue text-center font-semibold text-lg">
                    Proceed
                  </Text>
                  <Feather name="log-in" size={20} color="#00CFFF" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
