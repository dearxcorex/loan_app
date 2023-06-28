import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
} from "@react-native-material/core";

const BlackDrop = () => {
  const [revealed, setRevealed] = useState(false);

  return <BackdropSubheader title="Subheader" />;
};

export default BlackDrop;
