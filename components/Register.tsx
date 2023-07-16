import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
//firebase and Auth
import { firestore, app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");

  console.log(name);
  const onSubmit = async () => {
    const firebaseApp = getAuth(app);
    const firestore = getFirestore();
    await createUserWithEmailAndPassword(firebaseApp, email, password)
      .then(async (user) => {
        let docRef = doc(collection(firestore, "users"), user.user.uid);
        await setDoc(docRef, { name: name });
        console.log("user is registered");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="name"
        onChangeText={setname}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button mode="contained" onPress={() => onSubmit()}>
        Register
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
});

export default Register;
