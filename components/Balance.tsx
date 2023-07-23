import React, { useContext, useEffect, useState } from "react";
import { Card, Text, Button, Avatar, IconButton } from "react-native-paper";
import { HStack } from "@react-native-material/core";
import { Dimensions } from "react-native";
import Background from "./Background";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import Chatcomponent from "./Chart";
import { View, StyleSheet } from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type RootStackParamList = {
  Balance: undefined;
  Details: undefined;
};
type LoanItem = {
  loan: number;
};

const calculateTotal = (loanData: LoanItem[]) => {
  return loanData.reduce((acc, item) => acc + item.loan, 0);
};

interface LoanData {
  name: string;
  loan: number;
}

const Balance: React.FC = () => {
  const [loanData, setLoanData] = useState<LoanData[]>([]);
  const [user, setUser] = useState<any>(null);

  const fetchData = async (user: any) => {
    if (user) {
      const firestore = getFirestore();
      const q = query(
        collection(firestore, "loans"),
        where("userId", "==", user.uid)
      );
      // console.log("userName", user.displayName);

      const querySnapshot = await getDocs(q);
      let data: LoanData[] = [];
      // console.log(data);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const loan = docData.amount;
        const name = docData.name;
        data.push({
          loan: loan,
          name: name,
        });
      });
      setLoanData(data);
    } else {
      console.log("User is not logged in");
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      fetchData(user);
    });

    return () => unsubscribe();
  }, [loanData]);
  type HomeScreenProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "Balance">,
    StackNavigationProp<RootStackParamList, "Details">
  >;

  const navigation = useNavigation<HomeScreenProp>();

  const handlePress = () => {
    console.log("pressed");
    navigation.navigate("Details");
  };

  const styles = StyleSheet.create({
    container: {
      position: "relative",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",

      top: 100,
    },
    card: {
      alignItems: "center",
      width: "75%",
    },
    buttton: {
      width: "35%", // adjust this to set the width of the card
      height: 40,
      margin: 5,

      alignSelf: "center",
    },
    chatContainer: {
      position: "absolute", // Change from "relative" to "absolute"
      bottom: 200, // Adjust this value to position the Chatcomponent properly
      zIndex: 1, // Set
    },
    balanceText: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 10,
      color: "green",
    },
  });

  return (
    <>
      <Background>
        <HStack>
          <View style={styles.container}>
            <Card>
              <Card.Title
                title={` Welcome! ${user ? user.displayName : "None"}`}
                subtitle={`Balance: ${calculateTotal(loanData)}`}
                left={(props) => <AwesomeIcon {...props} name="home" />}
                style={styles.card}
              />
              <Card.Content>
                <Text
                  variant="bodyMedium"
                  style={[styles.balanceText]}
                >{`compound interest: ${
                  calculateTotal(loanData) * 1.07
                }`}</Text>
                <Button
                  mode="contained"
                  onPress={handlePress}
                  style={styles.buttton}
                >
                  info
                </Button>
              </Card.Content>
            </Card>
            <View></View>
            {/* <View>
            <Text>Loan Data:</Text>
            {loanData.map((item, index) => (
              <Text key={index}>
                Name: {item.name}, Loan: {item.loan}
              </Text>
            ))}
          </View> */}
            <View style={styles.chatContainer}>
              <Chatcomponent />
            </View>
          </View>
        </HStack>
      </Background>
    </>
  );
};

export default Balance;
