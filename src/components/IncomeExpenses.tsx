import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from '../types/transaction';

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  let incomes = 0;
  let expenses = 0;
  transactions.map((item: Transaction) => {
    if (item.amount > 0) {
      incomes += item.amount;
    } else {
      expenses += item.amount;
    }
  });

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+${incomes}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-${Math.abs(expenses)}</p>
      </div>
    </div>
  );
};
