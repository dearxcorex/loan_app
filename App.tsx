import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

//theme
import { Header, Icon } from "@rneui/base";

const screenWidth = Dimensions.get("window").width;
import UserLogin from "./components/UserLogin";
import Balance from "./components/Balance";
import DetailsScreen from "./components/Details";
import CreateButtonAdd from "./components/Addbutton/CreateButtonAdd";
import InputPage from "./components/Addbutton/inputPage";
const Stack = createStackNavigator();

const Mycomponent: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Header
          barStyle="default"
          centerComponent={{
            text: "MY LOAN",
            style: { color: "#fff" },
          }}
          containerStyle={{ width: screenWidth }}
          leftComponent={{ icon: "menu", color: "#fff" }}
          leftContainerStyle={{}}
          linearGradientProps={{}}
          placement="center"
          rightComponent={{ icon: "home", color: "#fff" }}
        />

        <Stack.Navigator>
          <Stack.Screen name="Userlogin" component={UserLogin} />
          <Stack.Screen
            name="Balance"
            component={Balance}
            options={{ headerStyle: { backgroundColor: "red" } }}
          />
          {/* <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="CreateButton" component={CreateButtonAdd} />
          <Stack.Screen name="inputPage" component={InputPage} />  */}
        </Stack.Navigator>

        <CreateButtonAdd />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Mycomponent;
