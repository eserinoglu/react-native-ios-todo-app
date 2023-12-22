import { View, Text, FlatList } from "react-native";
import React from "react";
import { useUser } from "../context/UserContext";
import TaskListItem from "./TaskListItem";

export default function InThisWeek() {
  const { userTasks } = useUser();
  const today = new Date();
  const thisWeeksTasks = userTasks?.filter(
    (task) =>
      !task.isCompleted &&
      new Date(task.date) >
        new Date(today.getTime() + 0.2 * 24 * 60 * 60 * 1000) &&
      new Date(task.date) <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  );
  return (
    <View className="mb-7">
      <Text className="text-black/50 tracking-tight ml-4 mb-2">
        IN NEXT 7 DAYS
      </Text>
      <FlatList
        className="bg-white rounded-xl"
        data={thisWeeksTasks?.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskListItem
            isInCalendar={false}
            color={"text-yellow-400"}
            task={item}
          />
        )}
      />
      {thisWeeksTasks?.length === 0 && (
        <View className="p-3 rounded-xl bg-white">
          <Text className="font-medium tracking-tight text-base text-black/60">
            No tasks in next 7 days.
          </Text>
        </View>
      )}
    </View>
  );
}
