import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Logo from "./Logo";

//styles theme for the login page
import { useAuth } from "./AuthContext/SetupContext";
import { theme } from "../core/theme";
import Background from "./Background";

//email valid and password valid
import { emailValidator, passwordValidator } from "../core/utils";
type RootStackParamList = {
  Balance: undefined;
  Home_2: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};
type navigationProp = StackNavigationProp<RootStackParamList, "Balance">;

const Userlogin: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<navigationProp>();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSubmit = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value); //password validator

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

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
      <Logo />
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email.value}
          onChangeText={(email) => setEmail({ value: email, error: "" })}
          error={!!email.error}
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        {email.error && <Text style={styles.error}>{email.error}</Text>}
        <TextInput
          label="Password"
          value={password.value}
          onChangeText={(password) =>
            setPassword({ value: password, error: "" })
          }
          error={!!password.error}
          secureTextEntry
        />
        {password.error && <Text style={styles.error}>{password.error}</Text>}
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onSubmit} style={styles.button}>
          Login
        </Button>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
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
    paddingTop: 4,
  },
  link: {
    paddingTop: 4,
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
