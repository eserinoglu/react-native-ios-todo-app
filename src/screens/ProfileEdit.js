import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { supabase } from "../supabase/supabase";

export default function ProfileEdit({ navigation }) {
  const { userData, updateUserData } = useUser();
  const insets = useSafeAreaInsets();
  const [firstName, setFirstName] = React.useState(userData?.first_name);
  const [lastName, setLastName] = React.useState(userData?.last_name);
  const [isPending, setIsPending] = React.useState(false);

  const updateProfile = async () => {
    setIsPending(true);
    await updateUserData(firstName, lastName, userData.id);
    setIsPending(false);
    navigation.pop();
  };
  return (
    <View style={{ paddingTop: insets.top + 10 }} className="flex-1 px-3">
      <View className="flex-row items-center space-x-2">
        <Ionicons
          onPress={() => navigation.pop()}
          name="ios-chevron-back"
          size={24}
          color="black"
        />
        <Text className="text-xl font-semibold tracking-tight">
          Edit profile
        </Text>
      </View>
      <View className="mt-5">
        <Text className="ml-3 text-black/50 tracking-tight mb-1">
          FIRST NAME
        </Text>
        <TextInput
          clearButtonMode="always"
          className="bg-white p-4 rounded-xl"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          style={{ fontSize: 16 }}
        />
      </View>
      <View className="mt-5">
        <Text className="ml-3 text-black/50 tracking-tight mb-1">
          LAST NAME
        </Text>
        <TextInput
          clearButtonMode="always"
          className="bg-white p-4 rounded-xl"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          style={{ fontSize: 16 }}
        />
      </View>
      <TouchableOpacity
        disabled={isPending}
        onPress={updateProfile}
        className="bg-[#0E7AFE] p-3 rounded-xl items-center mt-5"
      >
        {isPending ? (
          <ActivityIndicator color="white" className="py-1" />
        ) : (
          <Text className="text-white font-semibold text-lg">Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
