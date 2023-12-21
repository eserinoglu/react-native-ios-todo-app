import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useUser } from "../context/UserContext";

export default function TaskDetails({ navigation, route }) {
  const { completeTask, deleteTask } = useUser();
  const insets = useSafeAreaInsets();
  const task = route.params.task;
  const [isCompleted, setIsCompleted] = React.useState(task.isCompleted);

  const removeTask = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteTask(task.id).then(() => navigation.pop());
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ paddingTop: insets.top + 10 }} className="flex-1">
      <ScrollView>
        <View className="flex-row items-center space-x-2 border-b border-black/10 px-3 pb-4">
          <Ionicons
            onPress={() => navigation.pop()}
            name="ios-chevron-back"
            size={32}
            color="black"
          />
          <Text className="text-2xl font-bold tracking-tight">
            Task Details
          </Text>
        </View>
        <View className="px-3">
          <View>
            <View className="flex-row items-center justify-between mt-4">
              <View
                className={`${
                  isCompleted ? "bg-green-400" : "bg-yellow-400"
                } w-32 p-2 rounded-xl flex-row items-center space-x-2 mt-1 justify-center`}
              >
                <Text className="text-xs font-semibold tracking-tight text-white">
                  {isCompleted ? "COMPLETED" : "NOT COMPLETED"}
                </Text>
              </View>
              <View className="flex-row items-center space-x-4">
                <Ionicons
                  onPress={() => {
                    removeTask();
                  }}
                  name="ios-trash"
                  size={24}
                  color="#0E7AFE"
                />
                <Ionicons name="ios-pencil" size={24} color="#0E7AFE" />
              </View>
            </View>
          </View>
          <Text className="mt-4 text-xs tracking-tight text-black/50">
            CREATED AT{" "}
            {dayjs(task.created_at).format("DD MMMM YYYY").toUpperCase()}
          </Text>
          <View className="mt-2 bg-white p-4 rounded-xl shadow-md">
            <Text className="text-3xl font-bold tracking-tight">
              {task.title}
            </Text>
            <Text className="text-lg tracking-tight text-black/50 mt-2">
              {task.notes}
            </Text>
          </View>
          <View>
            <Text className="ml-3 mb-1 mt-5 text-black/50 tracking-tight">
              DATE
            </Text>
            <View className="bg-white w-full p-3 rounded-xl flex-row items-center space-x-2 mt-1">
              <Ionicons name="ios-calendar" size={24} color="#00000060" />
              <Text className="text-base tracking-tight text-black/60">
                {dayjs(task.date).format("DD MMMM YYYY")}
              </Text>
            </View>
          </View>
          <View>
            <Text className="ml-3 mb-1 mt-5 text-black/50 tracking-tight">
              TIME
            </Text>
            <View className="bg-white w-full p-3 rounded-xl flex-row items-center space-x-2 mt-1">
              <Ionicons name="ios-calendar" size={24} color="#00000060" />
              <Text className="text-base tracking-tight text-black/60">
                {dayjs(task.date).format("HH:mm")}
              </Text>
            </View>
          </View>
        </View>
        <View className="px-3 mt-5">
          {!isCompleted && (
            <TouchableOpacity
              onPress={() => {
                completeTask(task.id);
                setIsCompleted(true);
              }}
              className="bg-green-400 p-3 rounded-xl items-center"
            >
              <Text className="text-white tracking-tight text-base font-semibold">
                MARK AS COMPLETED
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
