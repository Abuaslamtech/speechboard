import { useSpeechStore } from "@/store/useSpeechStore";
import { getLanguageName } from "@/utils/utils";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  const {
    voiceList,
    setSpeaker,
    speaker,
    setUserName,
    userName,
    loadUserName,
  } = useSpeechStore();

  const [showVoiceSelector, setShowVoiceSelector] = useState(false);

  const [selectedVoice, setSelectedVoice] = useState(voiceList?.[0].identifier);
 
  useEffect(() => {
    loadUserName();
  }, []);

  return (
    <View className="w-[95%] flex flex-row justify-between bg-card py-4 px-4 rounded-full border-b border-x border-accentBlue">
      <View className="flex flex-col gap-1">
        <Text className="text-textPrimary">
          Hi, <Text className="text-accentBlue font-bold">{userName}</Text>
        </Text>
        <Text className="text-sm text-textPrimary">Welcome to SpeechBoard</Text>
      </View>
      <TouchableOpacity
        className="w-12 h-12 flex justify-center items-center border bg-accentBlue border-[#00CFFF] rounded-full"
        onPress={() => setShowVoiceSelector(true)}
      >
        <Feather name="users" color="#0C0C0E" size={20} />
      </TouchableOpacity>
      {/* modal */}
      <Modal
        visible={showVoiceSelector}
        animationType="fade"
        transparent
        onRequestClose={() => setShowVoiceSelector(false)}
      >
        {/* Dimmed background */}
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
        >
          {/* Modal content */}
          <View className="bg-background border border-accentBlue p-4 rounded-xl w-[90%] max-h-[80%]">
            {/* Close button */}
            <TouchableOpacity
              onPress={() => setShowVoiceSelector(false)}
              className="self-end"
            >
              <Feather name="x" size={20} color="white" />
            </TouchableOpacity>
            <View className="mb-8">
              <Text className="text-accentBlue font-bold text-2xl text-center">
                Choose Speaker
              </Text>
            </View>
            {/* Voice List */}
            <FlatList
              data={voiceList?.slice(0, 5)}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    // handle voice selection
                    setSelectedVoice(item.identifier);
                    setSpeaker(item.identifier);
                    setShowVoiceSelector(false);
                  }}
                  className="p-3 border-b border-gray-700"
                >
                  <View className="flex flex-row  items-center gap-2">
                    <View className="bg-accentBlue p-2 rounded-full">
                      <Feather name="user" color={"#0C0C0E"} size={15} />
                    </View>
                    <View>
                      <Text
                        className={`text-base font-semibold ${
                          item.identifier === selectedVoice
                            ? "text-accentBlue"
                            : "text-white"
                        }`}
                      >
                        Speaker - {item.name}
                      </Text>
                      <Text className="text-sm text-gray-400">
                        {getLanguageName(item.language)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
