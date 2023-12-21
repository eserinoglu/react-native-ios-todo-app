import { View, Text, FlatList } from "react-native";
import React from "react";
import { useUser } from "../context/UserContext";
import TaskListItem from "./TaskListItem";

export default function DoneTasks() {
  const { userTasks } = useUser();
  const today = new Date();
  const doneTasks = userTasks?.filter(
    (task) =>
      task.isCompleted &&
      new Date(task.date).getTime() >= today.setTime(0, 0, 0)
  );
  return (
    <View className="mb-7">
      <Text className="text-black/50 tracking-tight ml-4 mb-2">DONE</Text>
      <FlatList
        className="bg-white rounded-xl"
        data={doneTasks}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskListItem
            isInCalendar={false}
            color={"text-green-400"}
            task={item}
          />
        )}
      />
      {doneTasks?.length === 0 && (
        <View className="p-3 rounded-xl bg-white">
          <Text className="font-medium tracking-tight text-base text-black/60">
            No completed tasks yet.
          </Text>
        </View>
      )}
    </View>
  );
}
