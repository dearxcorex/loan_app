// UserLogout.tsx
import { app } from "../firebase";
import { signOut, getAuth } from "firebase/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

type RootStackParamList = {
  Userlogin: undefined;
};

type navigationProp = StackNavigationProp<RootStackParamList, "Userlogin">;

interface AppProps {
  navigation: navigationProp;
}

const UserLogout: React.FC<AppProps> = ({ navigation }) => {
  React.useEffect(() => {
    const firebaseApp = getAuth(app);
    signOut(firebaseApp)
      .then(() => {
        console.log("signout");
        navigation.reset({
          index: 0,
          routes: [{ name: "Userlogin" }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return null;
};

export default UserLogout;
