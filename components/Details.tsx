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
import ModalComponent from "./Modal";
import { Navigation } from "./types";
import { IconButton } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";
import Logo from "./Logo";
import { StatusBar } from "expo-status-bar";

interface Item {
  key: string;
  loanDate: string;
  name: string;
  amount: number;
}
type Props = {
  navigation: Navigation;
};
const Details = ({ navigation }: Props) => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState<number[]>([2, 3, 4]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const [itemsPerPage, onItemsPerPageChange] = useState<number>(
    numberOfItemsPerPageList[0]
  );
  const [modalVisible, setModalVisible] = useState(false);

  const [items, setItems] = useState<Item[]>([]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  const balanceContext = useContext(BalanceContext);

  if (!balanceContext) throw new Error("BalanceContext is undefined");

  const { setTotalLoan } = balanceContext;

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
          amount: data.amount,
        });
      });
      setItems(items);
      setTotalLoan(total); // Update the totalLoan in the context
    } else {
      console.log("user is not logged in");
    }
  };

  useEffect(() => {
    fetchData();
    setPage(0);
  }, [itemsPerPage]);

  const handleSave = (updatedItem: Item) => {
    // Update the state with the updated item
    setItems(
      items.map((item) => (item.key === updatedItem.key ? updatedItem : item))
    );
  };
  const handleDelete = (deletedItem: Item) => {
    // Delete the document from Firestore

    setItems(items.filter((item) => item.key !== deletedItem.key));
  };
  const defaultItem: Item = {
    key: "",
    loanDate: "",
    name: "",
    amount: 0,
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <>
      <Background>
        <StatusBar style="auto" />
        <Logo />

        <View style={styles.backButton}>
          <BackButton goBack={() => navigation.navigate("Balance")} />
        </View>

        <DataTable
          style={{ flex: 1, marginTop: 0, backgroundColor: "#f8f8f8" }}
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
              <DataTable.Cell style={{ padding: 2 }}>
                {item.name}
              </DataTable.Cell>
              <DataTable.Cell style={{ padding: 2 }}>
                {item.amount}
              </DataTable.Cell>
              <DataTable.Cell
              // style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                {item.loanDate}
              </DataTable.Cell>
              <IconButton
                icon="pencil"
                size={15}
                onPress={() => handleEdit(item)}
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
      <ModalComponent
        visible={modalVisible}
        hideModal={hideModal}
        item={selectedItem || defaultItem}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
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
