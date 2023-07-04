import firebase from "../firebase";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

//firebase

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Balance: undefined;
};

type navigationProp = StackNavigationProp<RootStackParamList, "Balance">;

interface AppProps {
  navigation: navigationProp;
}

const Userlogin: React.FC<AppProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const firebaseApp = getAuth();
    await signInWithEmailAndPassword(firebaseApp, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (user) {
          navigation.navigate("Balance");
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
        click me
      </Button>
    </View>
  );
};

export default Userlogin;
