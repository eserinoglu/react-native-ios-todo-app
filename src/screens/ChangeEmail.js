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
import { useUser } from "../context/UserContext";

export default function ChangeEmail({ navigation }) {
  const { user } = useUser();
  const [isPending, setIsPending] = React.useState(false);
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState("");

  const changeEmail = async () => {
    setIsPending(true);
    const { error } = await supabase.auth.updateUser({
      email: email,
    });
    if (error) {
      alert(error.message);
    }
    if (!error) {
      alert("Email changed successfully!");
      setEmail("");
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
        <Text className="text-xl font-semibold">Change email</Text>
      </View>
      <View className="mt-5">
        <Text className="ml-3 text-black/50 tracking-tight mb-1">
          CURRENT EMAIL
        </Text>
        <View className="p-4 rounded-xl bg-black/10">
          <Text className="font-medium text-base tracking-tight text-black/60">
            {user?.email}
          </Text>
        </View>
      </View>
      <View className="mt-5">
        <Text className="ml-3 text-black/50 tracking-tight mb-1">
          NEW EMAIL
        </Text>
        <TextInput
          clearButtonMode="always"
          className="bg-white p-4 rounded-xl"
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={{ fontSize: 16 }}
        />
      </View>
      <TouchableOpacity
        onPress={changeEmail}
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
