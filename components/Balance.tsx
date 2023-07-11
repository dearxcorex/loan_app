import React, { useContext } from "react";
import { Card, Text } from "react-native-paper";
import { HStack } from "@react-native-material/core";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BalanceContext } from "./AuthContext/BalanceContext";

const screenWidth = Dimensions.get("window").width;
const { width, height } = Dimensions.get("window");

type RootStackParamList = {
  Balance: undefined;
  Details: undefined;
};

const Balance: React.FC = () => {
  const context = useContext(BalanceContext);
  if (!context) throw new Error("BalanceContext is undefined");
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
              <Text variant="bodyMedium">${context.totalLoan}</Text>
            </Card.Content>
          </Card>
        </HStack>
      </TouchableOpacity>
    </>
  );
};

export default Balance;
