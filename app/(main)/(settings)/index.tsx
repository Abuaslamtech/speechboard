import InputModal from "@/components/InputModal";
import { useSpeechStore } from "@/store/useSpeechStore";
import { settingsDataType } from "@/type/types";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
  const navigation = useNavigation();
  // hide navigation
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: undefined,
    });
  });

  const [showModal, setShowModal] = useState(false);
  const { setUserName } = useSpeechStore();

  // data
  const settingsdata: settingsDataType[] = [
    { icon: "user", label: "Change Name", onPress: () => setShowModal(true) },
    { icon: "info", label: "About SpeechBoard", onPress: () => {} },
    {
      icon: "log-out",
      label: "Log Out",
      onPress: async () => {
        await AsyncStorage.setItem("onboarded", "false");
        setUserName("");
        router.replace("/(home)");
      },
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="items-center justify-center mt-4">
        {/* header */}
        <View className="w-full">
          <View className="flex flex-row justify-center gap-4 mt-8 items-center p-4 ">
            <Feather name="settings" size={40} color="#00bfff" />
            <Text className="text-textPrimary text-4xl font-bold">
              Settings
            </Text>
          </View>
          <FlatList
            data={settingsdata}
            contentContainerStyle={{ paddingVertical: 16 }}
            ItemSeparatorComponent={() => <View className="h-4" />}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="w-11/12 m-auto flex p-2 "
                onPress={item.onPress}
              >
                <View className=" flex flex-row  justify-between p-4 bg-card rounded-lg border border-background">
                  <View className="flex flex-row gap-4 justify-center items-center">
                    <View className="bg-background p-4 rounded-lg">
                      <Feather name={item.icon} color="#00bfff" size={20} />
                    </View>
                    <Text className="text-textPrimary">{item.label}</Text>
                  </View>
                  <View className="bg-background p-4 rounded-lg">
                    <Feather name="chevron-right" color="#ccc" size={20} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* Modal */}
        <InputModal isModalOpen={showModal} setIsModalOpen={setShowModal} />
        {/* Category Tabs */}
      </View>
    </SafeAreaView>
  );
}
