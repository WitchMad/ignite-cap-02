import { createContext, useState, useEffect, useContext } from 'react'
import { api } from '../services/api'

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>

interface IPropsContext {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionInput) => Promise<void>; 
}

const TransactionsContext = createContext<IPropsContext>({} as IPropsContext)

export const TransactionsProvider:React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get('transactions').then((response) => {
      setTransactions(response.data.transactions)
    })
  }, []);

  async function createTransaction(transaction: ITransactionInput) {
    const { data } = await api.post('/transactions', {
      ...transaction,
      createdAt: new Date(),
    });
    setTransactions([...transactions, data.transaction])
  } 

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>{children}</TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}