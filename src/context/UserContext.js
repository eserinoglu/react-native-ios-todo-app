import React, { useContext, useState, createContext, useEffect } from "react";
import { supabase } from "../supabase/supabase";
import { ActivityIndicator, View } from "react-native";
import dayjs from "dayjs";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userTasks, setUserTasks] = useState(null);
  const fetchUserData = async (id) => {
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      alert(error.message);
    }
    setUserData(userData);
  };
  const fetchUserTasks = async (id) => {
    const { data: userTasks, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", id)
      .order("date", { ascending: false });
    if (error) {
      alert(error.message);
    }
    setUserTasks(userTasks);
  };
  const addTask = async (taskName, taskNote, taskDate, taskTime) => {
    const { data: task, error } = await supabase.from("tasks").insert([
      {
        title: taskName,
        notes: taskNote,
        date: taskDate,
        time: dayjs(taskTime).format("HH:mm:ss"),
        user_id: user.id,
      },
    ]);
    if (error) {
      alert(error.message);
    }
    if (!error) {
      fetchUserTasks(user.id);
    }
  };
  const completeTask = async (taskId) => {
    const { data: task, error } = await supabase
      .from("tasks")
      .update({ isCompleted: true })
      .eq("id", taskId);
    if (error) {
      alert(error.message);
    }
    if (!error) {
      fetchUserTasks(user.id);
    }
  };
  const deleteTask = async (taskId) => {
    const { data: task, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId);
    if (error) {
      alert(error.message);
    }
    if (!error) {
      fetchUserTasks(user.id);
    }
  };
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id)
          .then(() => fetchUserTasks(session.user.id))
          .then(() => setLoading(false));
      }
    });
  }, []);
  return (
    <UserContext.Provider
      value={{ user, userTasks, userData, addTask, completeTask, deleteTask }}
    >
      {loading ? (
        <View className="absolute top-0 right-0 left-0 w-full h-full z-10 items-center justify-center">
          <ActivityIndicator size="large" color="#0E7AFE" />
        </View>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
