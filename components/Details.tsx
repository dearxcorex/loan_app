import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "react-native-paper";
import { app, firestore } from "../firebase";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { BalanceContext } from "./AuthContext/BalanceContext";
import Background from "./Background";
import BackButton from "./BackButton";
import { Navigation } from "./types";
import { IconButton } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import Logo from "./Logo";
import { StatusBar } from "expo-status-bar";
interface Item {
  key: string;
  loanDate: string;
  name: string;
  loan: number;
}
type Props = {
  navigation: Navigation;
};
const Details = ({ navigation }: Props) => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState<number[]>([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(
    numberOfItemsPerPageList[0]
  );

  const [items, setItems] = useState<Item[]>([]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  const balanceContext = useContext(BalanceContext);

  if (!balanceContext) throw new Error("BalanceContext is undefined");

  const { setTotalLoan } = balanceContext;
  useEffect(() => {
    const fetchData = async () => {
      const user = getAuth(app).currentUser;
      if (user) {
        const q = query(
          collection(firestore, "loans"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const items: Item[] = [];
        let total = 0;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const loan = data.amount;

          total += loan;
          let date = new Date(data.date.toDate());
          let fomatDate = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
          items.push({
            key: doc.id,
            // loanDate: data.date.toDate().toDateString(),
            loanDate: fomatDate,
            name: data.name,
            loan: data.amount,
          });
        });
        setItems(items);
        setTotalLoan(total); // Update the totalLoan in the context
      } else {
        console.log("user is not logged in");
      }
    };
    fetchData();
    setPage(0);
  }, [itemsPerPage]);

  //handle delete
  const handleDelete = async (key: string) => {
    await deleteDoc(doc(firestore, "loans", key));

    setItems(items.filter((item) => item.key !== key));
  };

  return (
    <Background>
      <StatusBar style="auto" />
      <Logo />
      <View style={styles.backButton}>
        <BackButton goBack={() => navigation.navigate("Balance")} />
      </View>
      <DataTable
        style={{ flex: 1, marginTop: 100, backgroundColor: "#f8f8f8" }}
      >
        <DataTable.Header
          style={{
            backgroundColor: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Money</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item, index) => (
          <DataTable.Row
            key={item.key}
            style={{
              backgroundColor: index % 2 ? "#fff" : "#eee",

              paddingRight: 7,
            }}
          >
            <DataTable.Cell style={{ padding: 2 }}>{item.name}</DataTable.Cell>
            <DataTable.Cell style={{ padding: 2 }}>{item.loan}</DataTable.Cell>
            <DataTable.Cell
            // style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {item.loanDate}
            </DataTable.Cell>
            <IconButton
              icon="delete"
              size={15}
              onPress={() => handleDelete(item.key)}
            />
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
          style={{
            backgroundColor: "#ddd",
            padding: 5,
            marginTop: 5,
          }}
        />
      </DataTable>
    </Background>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: -50,
    left: 10,
  },
});

export default Details;
