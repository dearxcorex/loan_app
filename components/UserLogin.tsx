import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

//styles theme for the login page
import { useAuth } from "./AuthContext/SetupContext";
import { theme } from "../core/theme";
import Background from "./Background";
//import { emailValidator, passwordValidator } from "../core/utils";
import { emailValidator, passwordValidator } from "../core/utils";
type RootStackParamList = {
  Balance: undefined;
  Home_2: undefined;
  Register: undefined;
};
type navigationProp = StackNavigationProp<RootStackParamList, "Balance">;

const Userlogin: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<navigationProp>();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSubmit = async () => {
    const firebaseApp = getAuth(app);

    await signInWithEmailAndPassword(firebaseApp, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (user) {
          console.log("user is logged in");

          signIn();
          navigation.reset({ index: 0, routes: [{ name: "Home_2" }] });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };

  return (
    <Background>
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email.value}
          onChangeText={(email) => setEmail({ value: email, error: "" })}
        />
        <TextInput
          label="Password"
          value={password.value}
          onChangeText={(password) =>
            setPassword({ value: password, error: "" })
          }
          secureTextEntry
        />
        <Button mode="contained" onPress={onSubmit} style={styles.button}>
          Login
        </Button>
        <Button
          mode="contained"
          onPress={handleRegisterPress}
          style={styles.button}
        >
          Register
        </Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  button: {
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});

export default Userlogin;
