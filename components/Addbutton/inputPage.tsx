import * as React from "react";
import { TextInput } from "react-native-paper";
import { View, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import { DatePickerInput } from "react-native-paper-dates";
import { Button } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
//firebase and Auth
import { firestore, app } from "../../firebase";
import { getAuth } from "firebase/auth";

import { addDoc, collection, Timestamp } from "firebase/firestore";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
//add data to firebaestore
type RootStackParamList = {
  Balance: undefined;
};

type AddScreenProp = StackNavigationProp<RootStackParamList, "Balance">;
const addDataTofirebaestore = async (
  name: string,
  amount: number,
  date: Date
) => {
  const loansRef = collection(firestore, "loans");
  const user = getAuth(app).currentUser;

  if (user) {
    {
      await addDoc(loansRef, {
        name: name,
        amount: amount,
        date: Timestamp.fromDate(date),
        userId: user.uid,
      });
    }
  } else {
    console.log("user is not logged in");
  }
};

const CreateInput: React.FC = () => {
  registerTranslation("en-GB", enGB);
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [inputDate, setInputDate] = React.useState<Date | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<AddScreenProp>();

  const onSubmit = () => {
    if (name && amount && inputDate) {
      setLoading(true);
      addDataTofirebaestore(name, Number(amount), inputDate)
        .then(() => {
          setLoading(false);
          navigation.navigate("Balance");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(name) => setName(name)}
        style={styles.TextInput}
      />

      <TextInput
        label="Amount"
        value={amount}
        onChangeText={(amount) => setAmount(amount)}
        style={styles.TextInput}
      />

      <DatePickerInput
        locale="en-GB"
        label="LoanDate"
        value={inputDate}
        onChange={(d) => setInputDate(d)}
        inputMode="start"
        style={styles.DatePickerInput}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          mode="contained"
          onPress={onSubmit}
          style={{
            width: 100,
            height: 50,
            alignSelf: "center",
          }}
        >
          create
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  TextInput: {
    margin: 15,
    padding: 5,
    borderRadius: 10,
    fontSize: 12,
  },
  DatePickerInput: {
    margin: 15,
    padding: 5,
    borderRadius: 10,
  },
});

export default CreateInput;
