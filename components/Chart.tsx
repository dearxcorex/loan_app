import { View, StyleSheet, Text } from "react-native";
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
  const [loading, setLoading] = useState<boolean>(true);
  const maxValue = Math.max(...barData.map((item) => item.value));
  const stepValue = Math.ceil(maxValue / 5); // Divide the maximum value by the number of sections

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
      setLoading(false);
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
  // console.log(barData.length);
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : barData.length === 0 ? (
        <Text>No data</Text>
      ) : (
        <View style={styles.chart}>
          <Text
            style={{
              color: "rgb(120, 69, 172)",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            OverView
          </Text>
          <BarChart
            data={barData}
            barWidth={30}
            spacing={30}
            noOfSections={3}
            barBorderRadius={4}
            frontColor={"lightgray"}
            yAxisThickness={0}
            xAxisThickness={0}
            backgroundColor={"rgb(233, 223, 235)"}
            initialSpacing={10}
            yAxisTextStyle={{ color: "#665A6F" }}
            stepValue={stepValue}
            roundedTop={true}
            roundedBottom={true}
            width={Dimensions.get("window").width - 50}
          />
        </View>
      )}
    </View>
  );
};

export default Chart;
