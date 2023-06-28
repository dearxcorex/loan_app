import React, { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";

interface Item {
  key: number;
  loanDate: string;
  loan: number;
}

const Detail = () => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState<number[]>([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(
    numberOfItemsPerPageList[0]
  );

  const [items] = useState([
    {
      key: 1,
      loanDate: "10/11/66",
      loan: 10000,
      backDate: "10/12/66",
    },
    {
      key: 2,
      loanDate: "10/11/66",
      loan: 10000,
      backDate: "10/12/66",
    },
    {
      key: 3,
      loanDate: "10/11/66",
      loan: 10000,
      backDate: "10/12/66",
    },
  ]);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Loan Date</DataTable.Title>
        <DataTable.Title numeric>LoanMoney</DataTable.Title>
        <DataTable.Title numeric>giveback</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.loanDate}</DataTable.Cell>
          <DataTable.Cell numeric>{item.loan}</DataTable.Cell>
          <DataTable.Cell numeric>{item.backDate}</DataTable.Cell>
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

export default Detail;
