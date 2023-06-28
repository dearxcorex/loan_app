import React from "react";
// import { Text, Stack, Box } from "@react-native-material/core";
import { Card, Text } from "react-native-paper";
import { HStack } from "@react-native-material/core";

//fit for screen
import { Dimensions, TouchableOpacity } from "react-native";
//route
import { useNavigation } from "@react-navigation/native";
import Detail from "./Details";
const { width, height } = Dimensions.get("window");

const Balance: React.FC = () => {
  const navigation = useNavigation();
  // const navigateToDetail = () => {
  //   navigation.navigate("Detail");
  // };
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Detail")}>
      <HStack m={4} spacing={6}>
        <Card style={{ width: width * 0.6, height: height * 0.2 }}>
          <Card.Content>
            <Text variant="titleLarge">Dearxoasis!!</Text>
            <Text variant="bodyMedium">$5680.00</Text>
          </Card.Content>
        </Card>
      </HStack>
    </TouchableOpacity>
  );
};
export default Balance;
