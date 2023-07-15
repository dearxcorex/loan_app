import { View, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useEffect, useState } from "react";
// firebasse
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { Dimensions } from "react-native";

const Chart: React.FC = () => {
  const [barData, setBarData] = useState<any>([]);

  // get data from firebase   and  set to barData
  useEffect(() => {
    let data: any = [];
    const firestore = getFirestore();
    const q = collection(firestore, "loans");

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      data = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data(); // get data from firebase
        const loan = docData.amount;
        const name = docData.name;
        data.push({
          value: loan,
          label: name,
          frontColor: "rgb(120, 69, 172)",
        });
      });
      setBarData(data);
    });

    return () => unsubscribe(); // Unsubscribe from changes when component is unmounted
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
      marginTop: 100,
    },
    chart: {
      width: Dimensions.get("window").width, // full width
      height: Dimensions.get("window").height, // full height
    },
  });

  return (
    <View style={styles.container}>
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
  );
};

export default Chart;
