import { useState } from "react";
import {
  BalanceContext,
  BalanceContextProps,
} from "./components/AuthContext/BalanceContext";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";
import UserLogin from "./components/UserLogin";
import { signOut, getAuth } from "firebase/auth";
import Balance from "./components/Balance";
import DetailsScreen from "./components/Details";
import InputPage from "./components/Addbutton/inputPage";
import Register from "./components/Register";
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";

import {
  CompositeNavigationProp,
  NavigationContainer,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";

import { useAuth } from "./components/AuthContext/SetupContext";

const screenWidth = Dimensions.get("window").width;
const Stack = createStackNavigator();
const DrawerNavigator = createDrawerNavigator();

type RootStackParamList = {
  InputPage: undefined;
  Userlogin: undefined;
};

type InputPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InputPage"
>;

interface HeaderStyleProps {
  navigation: (value: string) => void;
}

const DrawerContent: React.FC<DrawerContentComponentProps> = () => {
  const navigation = useNavigation<InputPageNavigationProp>();

  const handleAddPress = () => {
    navigation.navigate("InputPage");
  };

  const handleLogoutPress = async () => {
    await signOut(getAuth());
    navigation.reset({ index: 0, routes: [{ name: "Userlogin" }] });
  };

  console.log("DrawerComponent");
  return (
    <View>
      <Drawer.Item
        style={{ backgroundColor: "#fff", width: screenWidth * 0.3 }}
        icon="star"
        label="Add"
        onPress={handleAddPress}
      />
      <Drawer.Item icon="star" label="Logout" onPress={handleLogoutPress} />
    </View>
  );
};

const MyDrawer: React.FC = () => {
  const navigation = useNavigation();

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => (
        <View style={styles.drawerContent}>
          <DrawerContent {...props} />
        </View>
      )}
    >
      <DrawerNavigator.Screen name="Home" component={StackNavigator} />
    </DrawerNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingVertical: 30,
    width: screenWidth * 0.7,
    marginTop: 50,
    marginBottom: 5,
    marginRight: 5,
  },
  drawernavigator: {
    flex: 1,
    width: screenWidth * 0.6,
  },
});

const StackNavigator: React.FC<HeaderStyleProps> = () => {
  const [totalLoan, setTotalLoan] = useState(0);

  return (
    <BalanceContext.Provider value={{ totalLoan, setTotalLoan }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Balance"
          component={Balance}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InputPage"
          component={InputPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </BalanceContext.Provider>
  );
};

const Mycomponent: React.FC = () => {
  const { isSigedIn } = useAuth();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Userlogin"
            component={UserLogin}
            options={{ headerShown: isSigedIn }} // Hide header when signed in
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Home_2"
            component={MyDrawer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Balance" component={Balance} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Mycomponent;
