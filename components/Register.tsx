import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import Logo from "./Logo";
import Background from "./Background";
//firebase and Auth
import { firestore, app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommonActions } from "@react-navigation/native";
type RootStackParamList = {
  Balance: undefined;
};
const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setname] = useState<string>("");
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Balance">>();
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
      // navigation.navigate("Balance");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home_2" }],
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <TextInput
        style={styles.input}
        placeholder="name"
        onChangeText={setname}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={setEmail}
        autoCapitalize="none"
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
  logoContainer: {
    position: "absolute", // positions the logo independently of other elements
    top: 50, // sets the logo at the top
    alignSelf: "center", // centers the logo on the screen
  },
  input: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
});

export default Register;
