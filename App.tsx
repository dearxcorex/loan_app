import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
//theme
import { Header, Icon } from "@rneui/base";

const screenWidth = Dimensions.get("window").width;

import Balance from "./components/Balance";
import Detail from "./components/Details";

type RootStackParamList = {
  Balance: undefined;

  Detail: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Mycomponent: React.FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
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
          <Stack.Screen
            name="Balance"
            component={Balance}
            options={{ headerStyle: { backgroundColor: "red" } }}
          />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>

        {/* <PaperProvider><Detail /></PaperProvider> */}
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default Mycomponent;
