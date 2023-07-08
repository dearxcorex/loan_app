import React, { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { app, firestore } from "../firebase";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Item {
  key: string;
  loanDate: string;
  name: string;
  loan: number;
}

const Details = () => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState<number[]>([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(
    numberOfItemsPerPageList[0]
  );

  const [items, setItems] = useState<Item[]>([]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

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
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            key: doc.id,
            loanDate: data.date.toDate().toDateString(),
            name: data.name,
            loan: data.amount,
          });
        });
        setItems(items);
      } else {
        console.log("user is not logged in");
      }
    };
    fetchData();
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>Money</DataTable.Title>
        <DataTable.Title>Loan Date</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.loan}</DataTable.Cell>
          <DataTable.Cell>{item.loanDate}</DataTable.Cell>

          {/* <DataTable.Cell numeric>{item.backDate}</DataTable.Cell> */}
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
      />
    </DataTable>
  );
};

export default Details;
