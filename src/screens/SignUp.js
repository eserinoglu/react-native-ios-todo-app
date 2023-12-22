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

export default function SignUp({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);

  const signUp = async () => {
    setIsPending(true);
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setIsPending(false);
      alert(error.message);
    }
    if (authData) {
      const { data, error } = await supabase
        .from("users")
        .update({
          first_name: firstName,
          last_name: lastName,
        })
        .eq("id", authData.user.id);
    }
    setIsPending(false);
  };
  return (
    <View
      style={{ paddingTop: insets.top + 10 }}
      className="flex-1 px-4 justify-center bg-white"
    >
      <Text className="font-bold text-3xl tracking-tight">Sign Up</Text>
      <Text className="text-gray-500 mt-2 tracking-tight">
        Welcome! Please create your account to continue.
      </Text>
      <View className="bg-white rounded-xl shadow-md mt-5 pb-4">
        <View className="flex-row items-center w-full">
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            style={{ fontSize: 16 }}
            placeholder="First Name"
            className="w-[49%] tracking-tight pl-4 py-4"
          />
          <TextInput
            onChangeText={setLastName}
            value={lastName}
            style={{ fontSize: 16 }}
            placeholder="Last Name"
            className="w-[49%] tracking-tight pr-4 py-4"
          />
        </View>
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
          onPress={signUp}
          className="bg-[#0E7AFE] py-3 rounded-xl items-center mt-5 w-[90%] mx-auto"
        >
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-lg">Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
      <Pressable onPress={() => navigation.replace("Login")} className="mt-10">
        <Text className="text-[#0E7AFEc0] tracking-tight text-center">
          Already have an account? Login.
        </Text>
      </Pressable>
    </View>
  );
}
