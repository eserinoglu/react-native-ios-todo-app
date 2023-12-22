import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import image from "../../../assets/2.png";

export default function OnBoarding2({ navigation }) {
  return (
    <View className="bg-white flex-1 items-center justify-end px-5 pb-20 space-y-10">
      <Image
        resizeMode="contain"
        source={image}
        style={{ width: 300, height: 300 }}
      />
      <Text className="text-black/60 tracking-tight font-medium text-xl text-center mt-5">
        Add tasks and track them easily.
      </Text>
      <Pressable
        onPress={() => navigation.replace("OnBoarding3")}
        className="bg-[#0E7AFE] rounded-xl p-3 w-full items-center"
      >
        <Text className="text-white tracking-tight font-semibold text-xl">
          Next
        </Text>
      </Pressable>
    </View>
  );
}
