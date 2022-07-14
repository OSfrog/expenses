import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";
import AuthProvider, { AuthContext } from "./store/auth-context";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AccountScreen from "./screens/AccountScreen";
import { useContext, useEffect, useState } from "react";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const ExpensesOverview = () => {
  const { logout } = useContext(AuthContext);

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cog" size={size} color={color} />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit-outline"
              size={24}
              color={tintColor}
              onPress={logout}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
      }}
      initialRouteName="ExpensesOverview"
    >
      <Stack.Screen
        options={{
          presentation: "modal",
        }}
        name="ManageExpense"
        component={ManageExpense}
      />
      <Stack.Screen
        name="ExpensesOverview"
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

SplashScreen.preventAutoHideAsync();

const RootNavigator = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { isAuthenticated, authenticate } = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authenticate(storedToken);
      }
      setIsLoggingIn(false);
    };
    fetchToken();
  }, []);

  if (!isLoggingIn) {
    SplashScreen.hideAsync();
  }

  return (
    <NavigationContainer>
      <ExpensesContextProvider>
        {isAuthenticated ? <MainStack /> : <AuthStack />}
      </ExpensesContextProvider>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </>
  );
}
