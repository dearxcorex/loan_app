import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

//firebase
import firestore from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Userlogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    const firebaseApp = getAuth();
    await signInWithEmailAndPassword(firebaseApp, email, password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      }
    );
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
