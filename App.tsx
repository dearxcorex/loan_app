import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Header, Icon } from "@rneui/base";

import UserLogin from "./components/UserLogin";
import Balance from "./components/Balance";
import DetailsScreen from "./components/Details";
import CreateButtonAdd from "./components/Addbutton/CreateButtonAdd";
import InputPage from "./components/Addbutton/inputPage";

//menu bar
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
interface HeaderStyleProps {
  navigation: any; // You may want to replace 'any' with the correct type
}
//menu bar
// const DrawerNavigator: React.FC = () => {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={StackNavigator} />
//       <Drawer.Screen name="add" component={CreateButtonAdd} />
//     </Drawer.Navigator>
//   );
// };

const HomeScreen: React.FC = () => {
  console.log("HomeScreen");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen!!</Text>
    </View>
  );
};

const HeaderStyle: React.FC<HeaderStyleProps> = ({ navigation }) => {
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
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
        onPress: openDrawer,
      }}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="center"
      rightComponent={{ icon: "home", color: "#fff" }}
    />
  );
};

//route
const StackNavigator: React.FC<HeaderStyleProps> = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Balance"
        component={Balance}
        options={{
          header: () => <HeaderStyle navigation={navigation} />, // use it as a custom header
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="inputPage" component={InputPage} />
    </Stack.Navigator>
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
              name="x"
              component={StackNavigator}
              options={{ headerShown: false }}
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
