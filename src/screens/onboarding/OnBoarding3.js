import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import image from "../../../assets/3.png";

export default function OnBoarding2({ navigation }) {
  return (
    <View className="bg-white flex-1 items-center justify-end px-5 pb-20 space-y-10">
      <Image
        source={image}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />
      <Text className="text-black/60 tracking-tight font-medium text-xl text-center mt-5">
        Calendar view to see your tasks on a particular day.
      </Text>
      <Pressable
        onPress={() => navigation.replace("SignUp")}
        className="bg-[#0E7AFE] rounded-xl p-3 w-full items-center"
      >
        <Text className="text-white tracking-tight font-semibold text-xl">
          Get started
        </Text>
      </Pressable>
    </View>
  );
}
