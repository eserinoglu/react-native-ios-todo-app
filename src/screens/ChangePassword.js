import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../supabase/supabase";
import { Ionicons } from "@expo/vector-icons";

export default function ChangePassword({ navigation }) {
  const [isPending, setIsPending] = React.useState(false);
  const insets = useSafeAreaInsets();
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const changePassword = async () => {
    if (!currentPassword || !newPassword) {
      return alert("Please fill all fields.");
    }
    setIsPending(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      alert(error.message);
    }
    if (!error) {
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    }
    setIsPending(false);
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
        <Text className="text-xl font-semibold">Change password</Text>
      </View>
      <View className="mt-5">
        <Text className="ml-3 text-black/50 tracking-tight mb-1">
          CURRENT PASSWORD
        </Text>
        <TextInput
          secureTextEntry
          clearButtonMode="always"
          className="bg-white p-4 rounded-xl"
          onChangeText={(text) => setCurrentPassword(text)}
          value={currentPassword}
          style={{ fontSize: 16 }}
        />
      </View>
      <View className="mt-5">
        <Text className="ml-3 text-black/50 tracking-tight mb-1">
          NEW PASSWORD
        </Text>
        <TextInput
          secureTextEntry
          clearButtonMode="always"
          className="bg-white p-4 rounded-xl"
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
          style={{ fontSize: 16 }}
        />
      </View>
      <TouchableOpacity
        onPress={changePassword}
        disabled={isPending}
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
