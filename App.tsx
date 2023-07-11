import { useState } from "react";
import {
  BalanceContext,
  BalanceContextProps,
} from "./components/AuthContext/BalanceContext";
import { StyleSheet, Text, View } from "react-native";

import { Provider as PaperProvider } from "react-native-paper";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "react-native-paper";
import UserLogin from "./components/UserLogin";
import Balance from "./components/Balance";
import DetailsScreen from "./components/Details";
import CreateButtonAdd from "./components/Addbutton/CreateButtonAdd";
import InputPage from "./components/Addbutton/inputPage";
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";

//menu bar

import {
  CompositeNavigationProp,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const Stack = createStackNavigator();
const DrawerNavigator = createDrawerNavigator();

type RootStackParamList = {
  InputPage: undefined;
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

  console.log("DrawerComponent");
  return (
    <View>
      <Drawer.Item
        style={{ backgroundColor: "#fff", width: screenWidth * 0.3 }}
        icon="star"
        label="Add"
        onPress={handleAddPress}
      />
    </View>
  );
};

// style drawer content
const MyDrawer = () => {
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
    marginTop: 50, // Adjust the marginTop value as needed
    marginBottom: 5, // Adjust the marginBottom value as needed
    marginRight: 5, // Adjust the ma
  },
  drawernavigator: {
    flex: 1,
    width: screenWidth * 0.6,
  },
});

//route
const StackNavigator: React.FC<HeaderStyleProps> = ({ navigation }) => {
  const [totalLoan, setTotalLoan] = useState(0);
  return (
    <BalanceContext.Provider value={{ totalLoan, setTotalLoan }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Balance"
          component={Balance}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="InputPage" component={InputPage} />
      </Stack.Navigator>
    </BalanceContext.Provider>
  );
};

const Mycomponent: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLogin ? (
            <Stack.Screen
              name="Home_2"
              component={MyDrawer}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Screen name="Userlogin">
              {(props) => <UserLogin {...props} setIslogin={setIsLogin} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Mycomponent;
