import React, { useContext } from "react";
import { Card, Text, Button, Avatar, IconButton } from "react-native-paper";
import { HStack } from "@react-native-material/core";
import { Dimensions } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BalanceContext } from "./AuthContext/BalanceContext";
import Chatcomponent from "./Chart";
import { View, StyleSheet } from "react-native";
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      marginTop: 10,
    },
    card: {
      width: "60%",
    },
    buttton: {
      width: "30%", // adjust this to set the width of the card
      margin: 5,
      alignSelf: "center",
    },
  });

  return (
    <>
      <HStack>
        <View style={styles.container}>
          <Card>
            <Card.Title
              title="Dearxoasis"
              // subtitle={`Balance: ${loan}`}
              left={(props) => <AwesomeIcon {...props} name="home" />}
              style={styles.card}
            />
            <Card.Content>
              <Button
                mode="contained"
                onPress={handlePress}
                style={styles.buttton}
              >
                info
              </Button>
            </Card.Content>
          </Card>

          <Chatcomponent />
        </View>
      </HStack>
    </>
  );
};

export default Balance;
