import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useUser } from "../context/UserContext";
import BottomSheet from "@gorhom/bottom-sheet";

export default function AddTask() {
  const { addTask } = useUser();
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [taskName, setTaskName] = React.useState("");
  const [taskNote, setTaskNote] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);

  const submitTask = async (taskName, taskNote, selectedDate) => {
    setIsPending(true);
    await addTask(taskName, taskNote, selectedDate);
    setIsPending(false);
    setTaskName("");
    setTaskNote("");
    setSelectedDate(new Date());
    bottomSheetRef.current?.expand();
  };

  const bottomSheetRef = React.useRef(null);
  const snapPoints = ["35%"];

  return (
    <View style={{ paddingTop: insets.top + 20 }} className="px-3 flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white rounded-2xl p-5 shadow-md space-y-1">
          <Text className="text-2xl font-bold tracking-tight">Add Task</Text>
          <Text className="text-black/50 tracking-tight">
            Add your task to your list.
          </Text>
        </View>
        <View className="mt-4">
          <Text className="text-black/50 tracking-tight ml-3 mb-1">TITLE</Text>
          <TextInput
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
            style={{ fontSize: 16 }}
            clearButtonMode="always"
            className="bg-white p-4 rounded-xl tracking-tight font-medium"
            placeholder="eg. Go shopping"
          />
        </View>
        <View className="mt-4">
          <Text className="text-black/50 tracking-tight ml-3 mb-1">NOTES</Text>
          <TextInput
            value={taskNote}
            onChangeText={(text) => setTaskNote(text)}
            style={{ fontSize: 16 }}
            clearButtonMode="always"
            className="bg-white p-4 rounded-xl tracking-tight font-medium"
            placeholder="eg. Buy milk, eggs, bread, and bananas"
          />
        </View>
        <View className="mt-4">
          <Text className="text-black/50 tracking-tight ml-3">DATE</Text>
          <Pressable
            onPress={() => setShowDatePicker(!showDatePicker)}
            className="bg-white w-full p-3 rounded-xl flex-row items-center space-x-2 mt-1"
          >
            <Ionicons name="ios-calendar" size={24} color="#00000060" />
            <Text className="text-base tracking-tight text-black/60">
              {dayjs(selectedDate).format("DD MMMM YYYY hh:mm A")}
            </Text>
          </Pressable>
          <RNDateTimePicker
            style={{ display: showDatePicker ? "flex" : "none" }}
            accentColor="#0E7AFE"
            display="spinner"
            mode="datetime"
            minimumDate={new Date()}
            value={selectedDate}
            onChange={(event, date) => {
              setSelectedDate(date);
            }}
          />
        </View>
        <Pressable
          disabled={isPending}
          onPress={() => submitTask(taskName, taskNote, selectedDate)}
          className="bg-[#0E7AFE] mb-5 py-3 rounded-xl flex-row items-center space-x-2 justify-center mt-10"
        >
          {isPending ? (
            <ActivityIndicator color="white" className="py-1" />
          ) : (
            <>
              <Ionicons name="ios-add-circle-outline" size={24} color="white" />
              <Text className="text-white font-medium tracking-tight text-lg">
                Add task
              </Text>
            </>
          )}
        </Pressable>
      </ScrollView>
      <BottomSheet
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "#0E7AFE", borderRadius: 30 }}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
      >
        <View className="p-4 items-center justify-center flex-1">
          <Ionicons name="ios-checkmark-circle" size={60} color="white" />
          <Text className="text-white tracking-tight font-semibold text-2xl">
            Task added successfully!
          </Text>
        </View>
      </BottomSheet>
    </View>
  );
}
