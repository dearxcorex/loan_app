import * as React from "react";
import { TextInput } from "react-native-paper";
import { View, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import { DatePickerInput } from "react-native-paper-dates";
import { Button } from "react-native-paper";

//firebase
import firestore from "../../firebase";
// import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { enGB, registerTranslation } from "react-native-paper-dates";

//add data to firebaestore
const addDataTofirebaestore = async (
  name: string,
  amount: number,
  date: Date
) => {
  const loansRef = collection(firestore, "loans");
  await addDoc(loansRef, {
    name: name,
    amount: amount,
    date: Timestamp.fromDate(date),
  });
};
const CreateInput = () => {
  registerTranslation("en-GB", enGB);
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [inputDate, setInputDate] = React.useState<Date | undefined>(undefined);
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

      <Button
        mode="contained"
        onPress={() => {
          if (inputDate !== undefined) {
            addDataTofirebaestore(name, Number(amount), inputDate);
          } else {
            console.log("inputDate is undefined");
          }
        }} //add data to firestore
        style={{
          width: 100,
          height: 50,

          alignSelf: "center",
        }}
      >
        create
      </Button>
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
