import React from "react";
// import { Text, Stack, Box } from "@react-native-material/core";
import { Card, Text } from "react-native-paper";
import { HStack } from "@react-native-material/core";

const screenWidth = Dimensions.get("window").width;
import { Dimensions, TouchableOpacity } from "react-native";
//route
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const { width, height } = Dimensions.get("window");

type RootStackParamList = {
  Balance: undefined;

  Details: undefined;
};

const Balance: React.FC = () => {
  type HomeScreenProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "Balance">,
    StackNavigationProp<RootStackParamList, "Details">
  >;
  const navigation = useNavigation<HomeScreenProp>();

  const handlePress = () => {
    navigation.navigate("Details");
  };
  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <HStack m={4} spacing={3}>
          <Card style={{ width: width * 0.4, height: height * 0.15 }}>
            <Card.Content>
              <Text variant="titleLarge">Dearxoasis!!</Text>
              <Text variant="bodyMedium">$5680.00</Text>
            </Card.Content>
          </Card>
        </HStack>
      </TouchableOpacity>
    </>
  );
};
export default Balance;
