import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../supabase/supabase";

export default function Login({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);
  const login = async () => {
    setIsPending(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsPending(false);
    if (error) {
      setIsPending(false);
      alert(error.message);
    }
  };
  return (
    <View
      style={{ paddingTop: insets.top + 10 }}
      className="flex-1 px-4 justify-center bg-white"
    >
      <Text className="font-bold text-3xl tracking-tight">Login</Text>
      <Text className="text-gray-500 mt-2 tracking-tight">
        Welcome back! Please login to your account.
      </Text>
      <View className="bg-white rounded-xl shadow-md mt-5 pb-4">
        <View className="items-center flex-row space-x-2 justify-between p-4">
          <Ionicons name="ios-mail" size={24} color="#00000030" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            clearButtonMode="always"
            style={{ fontSize: 16 }}
            placeholder="Email"
            className="w-[90%] tracking-tight"
          />
        </View>
        <View className="items-center flex-row space-x-2 justify-between p-4">
          <Ionicons name="ios-lock-closed" size={24} color="#00000030" />
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            clearButtonMode="always"
            style={{ fontSize: 16 }}
            placeholder="Password"
            className="w-[90%] tracking-tight"
          />
        </View>
        <TouchableOpacity
          disabled={isPending}
          onPress={login}
          className="bg-[#0E7AFE] py-3 rounded-xl items-center mt-5 w-[90%] mx-auto"
        >
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-lg">Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <Pressable onPress={() => navigation.replace("SignUp")} className="mt-10">
        <Text className="text-[#0E7AFEc0] tracking-tight text-center">
          Don't you have an account? Sign Up.
        </Text>
      </Pressable>
    </View>
  );
}
