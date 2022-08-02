import { storeStateIntoLocalstorage } from '../common/localstorageHelper';
import { Transaction } from '../types/transaction';
import { ACTION_TRANSACTION_ADD, ACTION_TRANSACTION_DELETE } from './actionHelper';
import { GlobalState } from './GlobalState';

type ActionType = {
  type: string;
  payload: any;
};

const persistOnClient = (state: GlobalState) => {
  storeStateIntoLocalstorage(state);
  return state;
};

export default (state: GlobalState, action: ActionType) => {
  switch (action.type) {
    case ACTION_TRANSACTION_DELETE:
      return persistOnClient({
        ...state,
        transactions: state.transactions.filter((item: Transaction) => item.id !== action.payload)
      });
    case ACTION_TRANSACTION_ADD:
      const { transactions } = state;
      const { text, amount } = action.payload;
      let lastId = 1;
      if (transactions && transactions.length > 0) {
        lastId = transactions[transactions.length - 1].id;
      }

      return persistOnClient({
        ...state,
        transactions: [...state.transactions, { id: lastId + 1, text, amount: Number(amount) }]
      });
    default:
      return persistOnClient(state);
  }
};
