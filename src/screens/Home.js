import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
} from "react-native";
import React from "react";
import TaskListItem from "../components/TaskListItem";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext";
import TodaysTasks from "../components/TodaysTasks";
import InThisWeek from "../components/InThisWeek";
import DoneTasks from "../components/DoneTasks";

export default function Home({ navigation }) {
  const { userData, userTasks } = useUser();
  const today = new Date();
  const insets = useSafeAreaInsets();
  const todayTasks = userTasks?.filter(
    (task) =>
      !task.isCompleted &&
      new Date(task.date).toDateString() === today.toDateString()
  );
  const in7Days = userTasks?.filter(
    (task) =>
      !task.isCompleted &&
      new Date(task.date) > today &&
      new Date(task.date) <= new Date(today.setDate(today.getDate() + 7))
  );
  const doneTasks = userTasks?.filter(
    (task) => task.isCompleted && new Date(task.date) < today
  );
  return (
    <View style={{ paddingTop: insets.top + 10 }} className="flex-1 px-3">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-3xl p-5 space-y-2 mb-5 shadow-md">
          <View className="flex-row items-center justify-between">
            <Image
              source={{
                uri: userData?.profile_image,
              }}
              className="w-10 aspect-square rounded-full"
            />
            <Ionicons
              name="ios-notifications-circle"
              size={36}
              color="#0E7AFE"
            />
          </View>
          <Text className="text-2xl font-semibold tracking-tight">
            Welcome {userData?.first_name}
          </Text>
          <Text className="text-black/50 tracking-tight">
            Don't forget to complete your tasks. Good luck!
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("AddTask")}
          className="bg-[#0E7AFE] py-3 rounded-xl flex-row items-center space-x-2 justify-center mb-5"
        >
          <Ionicons name="ios-add-circle-outline" size={24} color="white" />
          <Text className="text-white font-medium tracking-tight text-lg">
            Add task
          </Text>
        </Pressable>
        <TodaysTasks />
        <InThisWeek />
        <DoneTasks />
      </ScrollView>
    </View>
  );
}
