import { useSpeechStore } from "@/store/useSpeechStore";
import { InputModalType } from "@/type/types";
import { updateName } from "@/utils/utils";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function InputModal({
  isModalOpen,
  setIsModalOpen,
}: InputModalType) {
  const [name, setName] = useState("");
  const { setUserName } = useSpeechStore();

  return (
    isModalOpen && (
      <View className="bg-red-100">
        <Modal visible={true} animationType="slide" transparent>
          {/* Dimmed background */}
          <View
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          >
            {/* Modal content */}

            <View className="relative  bg-accentBlue flex   h-1/2 w-11/12 rounded-xl">
              {/* Close button */}
              <TouchableOpacity
                onPress={() => setIsModalOpen(false)}
                className="p-2 m-2 bg-background rounded-lg absolute top-10 right-0 "
              >
                <Feather name="x" size={20} color="#00CFFF" />
              </TouchableOpacity>
              <View className="flex-1 flex gap-8 justify-center items-center">
                <Text className="text-4xl font-bold">Update Name</Text>
                <TextInput
                  placeholder="Enter your name"
                  placeholderTextColor="#1B1C1E"
                  className="border text-card border-card w-4/5 p-4 rounded-lg"
                  value={name}
                  onChangeText={setName}
                />
                <TouchableOpacity
                  className="bg-card w-4/5 p-4 rounded-lg"
                  onPress={() =>
                    updateName({ name, setUserName, setIsModalOpen })
                  }
                >
                  <View className="flex flex-row justify-center items-center gap-2">
                    <Text className="text-accentBlue text-center font-semibold text-lg">
                      Update
                    </Text>
                    <Feather name="edit-3" size={20} color="#00CFFF" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  );
}
