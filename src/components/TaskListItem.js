import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TaskListItem({ task, color, isInCalendar }) {
  const navigation = useNavigation();
  const isTaskDone = task.isCompleted;
  return (
    <TouchableOpacity
      onPress={() => navigation.push("TaskDetails", { task })}
      className="items-center flex-row justify-between p-3 border-b border-black/5"
    >
      <View className="flex-row items-center space-x-1">
        {!isInCalendar ? (
          <Text className={`${color}`}>●</Text>
        ) : isTaskDone ? (
          <Ionicons name="ios-checkmark-circle" size={22} color="green" />
        ) : (
          <Text className={`${color}`}>●</Text>
        )}
        <Text className="text-base font-medium tracking-tight">
          {task.title}
        </Text>
      </View>
      <Ionicons name="ios-chevron-forward" size={22} color="#00000060" />
    </TouchableOpacity>
  );
}
