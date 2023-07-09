import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Header, Icon } from "@rneui/base";
import UserLogin from "./components/UserLogin";
import Balance from "./components/Balance";
import DetailsScreen from "./components/Details";
import CreateButtonAdd from "./components/Addbutton/CreateButtonAdd";
import InputPage from "./components/Addbutton/inputPage";
import { DrawerActions, StackActions } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const feed = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
    </View>
  );
};

const StackNavigator = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Userlogin"
        component={UserLogin}
        options={{ headerShown: false }}
        initialParams={{ navigation }}
      />
      <Stack.Screen
        name="Balance"
        component={Balance}
        options={{ headerStyle: { backgroundColor: "red" } }}
      />

      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="CreateButton" component={CreateButtonAdd} />
      <Stack.Screen name="inputPage" component={InputPage} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => (
          <Header
            barStyle="default"
            centerComponent={{
              text: "MY LOAN",
              style: { color: "#fff" },
            }}
            containerStyle={{ width: screenWidth }}
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: () => navigation.dispatch(DrawerActions.toggleDrawer()), // This will open the drawer
            }}
            leftContainerStyle={{}}
            linearGradientProps={{}}
            placement="center"
            rightComponent={{ icon: "home", color: "#fff" }}
          />
        ),
      }}
    >
      <Drawer.Screen name="add" component={StackNavigator} />
      {/* <Drawer.Screen name="feed" component={CreateButtonAdd} /> */}
    </Drawer.Navigator>
  );
};

const Mycomponent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <PaperProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <DrawerNavigator />
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="UserLogin" component={UserLogin} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Mycomponent;
