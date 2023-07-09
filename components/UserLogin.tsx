import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Balance: undefined;
};
type navigationProp = StackNavigationProp<RootStackParamList, "Balance">;
interface AppProps {
  navigation: navigationProp;
  setIslogin: (value: boolean) => void;
}
const Userlogin: React.FC<AppProps> = ({ navigation, setIslogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const firebaseApp = getAuth(app);
    await signInWithEmailAndPassword(firebaseApp, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (user) {
          console.log("user is logged in");
          setIslogin(true);
          navigation.reset({ index: 0, routes: [{ name: "Balance" }] });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <Button mode="contained" onPress={onSubmit}>
        Login
      </Button>
    </View>
  );
};

export default Userlogin;
