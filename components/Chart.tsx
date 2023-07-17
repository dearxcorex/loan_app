import { View, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app } from "../firebase";
import { Dimensions } from "react-native";
import Balance from "./Balance";
interface BarData {
  value: number;
  label: string;
  frontColor: string;
}

//get data from firebase and unique user id
const Chart: React.FC = () => {
  const [barData, setBarData] = useState<BarData[]>([]);

  const fetchData = async () => {
    const user = getAuth(app).currentUser;
    if (user) {
      const firestore = getFirestore();
      const q = query(
        collection(firestore, "loans"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      let data: BarData[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const loan = docData.amount;
        const name = docData.name;
        data.push({
          value: loan,
          label: name,
          frontColor: "rgb(120, 69, 172)",
        });
      });
      setBarData(data);
    } else {
      console.log("User is not logged in");
    }
  };

  useEffect(() => {
    fetchData();
  }, [barData]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
      marginTop: 100,
    },
    chart: {
      width: "100%",
      height: 300,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        <BarChart
          data={barData}
          barWidth={35}
          noOfSections={3}
          barBorderRadius={4}
          frontColor={"lightgray"}
          yAxisThickness={0}
          xAxisThickness={0}
          backgroundColor={"rgb(233, 223, 235)"}
        />
      </View>
    </View>
  );
};

export default Chart;