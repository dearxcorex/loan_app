import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  inputPage: undefined;
};

type AddScreenProp = StackNavigationProp<RootStackParamList, "inputPage">;

const CreateButtonAdd = () => {
  const navigation = useNavigation<AddScreenProp>();

  return (
    <Button
      mode="contained"
      onPress={() => navigation.navigate("inputPage")}
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
        padding: 10,
      }}
    >
      Add
    </Button>
  );
};

export default CreateButtonAdd;
