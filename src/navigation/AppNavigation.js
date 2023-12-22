import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//Screens
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Calendar from "../screens/Calendar";
import AddTask from "../screens/AddTask";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import TaskDetails from "../screens/TaskDetails";
import ProfileEdit from "../screens/ProfileEdit";
import ChangePassword from "../screens/ChangePassword";
import OnBoarding1 from "../screens/onboarding/OnBoarding1";
import OnBoarding2 from "../screens/onboarding/OnBoarding2";
import OnBoarding3 from "../screens/onboarding/OnBoarding3";

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-calendar" size={size} color={color} />
          ),
        }}
        name="Calendar"
        component={Calendar}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-add-circle" size={32} color={color} />
          ),
        }}
        name="AddTask"
        component={AddTask}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person-circle" size={32} color={color} />
          ),
        }}
        name="User"
        component={UserStack}
      />
    </Tab.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default function AppNavigation() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);
  const { user } = useUser();
  if (isFirstLaunch === null) return null;
  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="TaskDetails" component={TaskDetails} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={isFirstLaunch ? "OnBoarding1" : "Login"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="OnBoarding1" component={OnBoarding1} />
          <Stack.Screen name="OnBoarding2" component={OnBoarding2} />
          <Stack.Screen name="OnBoarding3" component={OnBoarding3} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
