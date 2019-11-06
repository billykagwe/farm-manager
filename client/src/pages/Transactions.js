import React,{useContext,useEffect} from 'react'
import TransactionContext from '../contexts/transaction/transactionContext'
import Table from '../components/table/Table'

const Transactions = () => {
    const transactionContext = useContext(TransactionContext)
    const {fetchTransactions,transactions,filterTransactions,loading} = transactionContext
    
    useEffect(() => {
      fetchTransactions()
      // eslint-disable-next-line
    },[])
    
    return (
      transactions && <Table 
        title='Transactions'
        head={['farmer','product','rate','total']} 
        body={transactions.map(({farmer,product,rate,total,_id}) => {
          return {
            farmer: farmer ? farmer.name : '',
            product,
            rate,
            total: total,
            _id
          }
        })} 
        filterHandler={(date) => filterTransactions(date)}
        searchType='date'
        ></Table>

)
  
}

export default Transactions


