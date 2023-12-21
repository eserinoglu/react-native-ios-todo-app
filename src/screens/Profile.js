import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../supabase/supabase";
import { useUser } from "../context/UserContext";

export default function Profile({ navigation }) {
  const { userData } = useUser();
  const insets = useSafeAreaInsets();
  const settings = [
    {
      name: "Update profile",
      icon: "ios-person",
      screen: "ProfileEdit",
    },
    {
      name: "Change password",
      icon: "ios-lock-closed",
      screen: "ChangePassword",
    },
    {
      name: "Change email",
      icon: "ios-mail",
      screen: "ChangeEmail",
    },
  ];
  const logout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <View style={{ paddingTop: insets.top + 20 }} className="flex-1 px-3">
      <View className="flex-1">
        <View className="rounded-2xl p-5 shadow-md bg-white items-center space-y-3">
          <Image
            source={{
              uri: userData?.profile_image,
            }}
            className="w-14 aspect-square rounded-full"
          />
          <Pressable>
            <Text className="text-blue-600 text-xs">Change image</Text>
          </Pressable>
          <Text className="text-xl font-semibold tracking-tight">
            {userData?.first_name} {userData?.last_name}
          </Text>
        </View>
        <View className="mt-5">
          <Text className="text-black/50 tracking-tight ml-4 mb-2">
            SETTINGS
          </Text>
          <FlatList
            className="rounded-xl bg-white"
            data={settings}
            keyExtractor={(item) => item.name}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.push(item.screen)}
                className="items-center flex-row justify-between p-3 border-b border-black/10"
              >
                <View className="flex-row items-center space-x-2">
                  <Ionicons name={item.icon} size={22} color="black" />
                  <Text className="text-base tracking-tight font-medium">
                    {item.name}
                  </Text>
                </View>
                <Ionicons
                  name="ios-chevron-forward"
                  size={24}
                  color="#00000060"
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <Pressable
          onPress={logout}
          className="bg-red-600 py-3 rounded-xl items-center mt-auto mb-4 flex-row justify-center space-x-2"
        >
          <Text className="text-white tracking-tight text-lg font-semibold">
            Logout
          </Text>
          <Ionicons name="ios-exit-outline" size={22} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
