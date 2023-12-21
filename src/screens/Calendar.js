import { View, Text, FlatList, Pressable, ScrollView } from "react-native";
import React from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import TaskListItem from "../components/TaskListItem";
import { useUser } from "../context/UserContext";

export default function Calendar() {
  const { userTasks } = useUser();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = React.useRef(null);
  const snapPoints = ["45%"];
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const selectedDateString = dayjs(selectedDate).format("DD MMMM YYYY");

  const filteredTasks = userTasks?.filter(
    (task) => new Date(task.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <View style={{ paddingTop: insets.top + 10 }} className="flex-1 px-4">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View>
          <Text className="text-black/50 tracking-tight ml-3 mb-2">
            SELECT DATE
          </Text>
          <Pressable
            onPress={() => bottomSheetRef.current?.expand()}
            className="bg-[#0E7AFE] p-4 rounded-xl flex-row items-center space-x-2"
          >
            <Ionicons name="ios-calendar" size={24} color="#FFFFFF" />
            <Text className="text-lg tracking-tight text-white font-medium">
              {selectedDateString}
            </Text>
          </Pressable>
        </View>
        <View className="mt-5">
          <Text className="text-black/50 tracking-tight ml-3 mb-2">
            TASKS FOR {selectedDateString.toUpperCase()}
          </Text>
          <FlatList
            className="bg-white rounded-xl"
            data={filteredTasks}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TaskListItem
                color={"text-yellow-400"}
                isInCalendar={true}
                task={item}
              />
            )}
          />
          {filteredTasks?.length === 0 && (
            <View className="items-center justify-center h-96">
              <Text className="text-black/50 tracking-tight text-center">
                No tasks for {selectedDateString}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomSheet
        backgroundStyle={{ borderRadius: 30 }}
        style={{ paddingHorizontal: 16 }}
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
      >
        <RNDateTimePicker
          onChange={(_event, date) => {
            setSelectedDate(date);
            bottomSheetRef.current?.close();
          }}
          display="inline"
          mode="date"
          value={selectedDate}
        />
      </BottomSheet>
    </View>
  );
}
