import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
//firebase and Auth
import { firestore, app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setname] = useState<string>("");

  console.log(name);
  const onSubmit = async () => {
    const firebaseApp = getAuth(app);
    const firestore = getFirestore();
    const { user } = (await createUserWithEmailAndPassword(
      firebaseApp,
      email,
      password
    )) as UserCredential;
    if (user) {
      await updateProfile(user, { displayName: name });
      const docRef = doc(firestore, "users", user.uid);
      await setDoc(docRef, { name: name });
      console.log("User created");
    }
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
