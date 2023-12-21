import { View, Text, FlatList } from "react-native";
import React from "react";
import TaskListItem from "./TaskListItem";
import { useUser } from "../context/UserContext";

export default function TodaysTasks() {
  const { userTasks } = useUser();
  const today = new Date();
  const tasks = userTasks?.filter(
    (task) =>
      !task.isCompleted &&
      new Date(task.date).toDateString() === today.toDateString()
  );
  return (
    <View className="mb-7">
      <Text className="text-black/50 tracking-tight ml-4 mb-2">TODAY</Text>
      <FlatList
        className="bg-white rounded-xl"
        data={tasks}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskListItem
            isInCalendar={false}
            color={"text-red-500"}
            task={item}
          />
        )}
      />
      {tasks?.length === 0 && (
        <View className="p-3 rounded-xl bg-white">
          <Text className="font-medium tracking-tight text-base text-black/60">
            No tasks for today.
          </Text>
        </View>
      )}
    </View>
  );
}
