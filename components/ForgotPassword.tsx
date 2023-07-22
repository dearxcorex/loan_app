import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { emailValidator } from "../core/utils";
import { Navigation } from "./types";
import Background from "./Background";
// import TextInput from "./Textinput";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firestore, app } from "../firebase";
import { Button, TextInput } from "react-native-paper";
import BackButton from "./BackButton";
import Logo from "./Logo";

type Props = {
  navigation: Navigation;
};

const ForgotPassword = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: "", error: "" });

  const _sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    try {
      await sendPasswordResetEmail(getAuth(app), email.value);
    } catch (error) {
      console.log("Error sending email", error);
    }
    navigation.navigate("Userlogin");
  };

  return (
    <Background>
      <Logo />
      <BackButton goBack={() => navigation.navigate("Userlogin")} />
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

        <Button
          mode="contained"
          onPress={_sendResetPasswordEmail}
          style={{ margin: 20 }}
        >
          reset password
        </Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
    padding: 12,
  },
});

export default ForgotPassword;
