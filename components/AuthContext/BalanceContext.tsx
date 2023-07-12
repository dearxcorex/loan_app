import React from "react";

interface BalanceContextProps {
  totalLoan: number;
  setTotalLoan: React.Dispatch<React.SetStateAction<number>>;
  // userName: string;
  // setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const BalanceContext = React.createContext<BalanceContextProps | undefined>(
  undefined
);

export { BalanceContext, BalanceContextProps };
