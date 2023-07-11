import React from "react";

interface BalanceContextProps {
  totalLoan: number;
  setTotalLoan: React.Dispatch<React.SetStateAction<number>>;
}

const BalanceContext = React.createContext<BalanceContextProps | undefined>(
  undefined
);

export { BalanceContext, BalanceContextProps };
