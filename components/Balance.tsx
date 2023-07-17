import React, { useContext, useEffect, useState } from "react";
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
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const screenWidth = Dimensions.get("window").width;
const { width, height } = Dimensions.get("window");

type RootStackParamList = {
  Balance: undefined;
  Details: undefined;
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
      console.log("userName", user.displayName);

      const querySnapshot = await getDocs(q);
      let data: LoanData[] = [];
      console.log(data);
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
              title={user ? user.displayName : "None"}
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
          <View>
            <Text>Loan Data:</Text>
            {loanData.map((item, index) => (
              <Text key={index}>
                Name: {item.name}, Loan: {item.loan}
              </Text>
            ))}
          </View>
          <Chatcomponent />
        </View>
      </HStack>
    </>
  );
};

export default Balance;
