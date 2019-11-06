import React,{useContext,useEffect,useState,Fragment} from 'react'
import ProductContext from '../../contexts/product/productContext'
import TransactionContext from '../../contexts/transaction/transactionContext'
import FarmerContext from '../../contexts/farmer/farmerContext'
import Table from '../table/Table'
import {StyledInput,StyledForm,Button} from '../../styles/form'


const Payout = React.memo(() => {
    const productContext = useContext(ProductContext)
    const transactionContext = useContext(TransactionContext)
    const farmerContext = useContext(FarmerContext)

    const [initialValues,setInitialValues] = useState({product:"",weight: 0,id: null})

    const {products,fetchProducts} = productContext
    const {addTransaction,fetchFarmerTransactions,transactions,editTransaction,
            farmerTransaction,deleteTransaction,filteredTransactions,filterTransactions} = transactionContext
    const {selectedFarmer} = farmerContext
      
    useEffect(() => {
        fetchProducts()
        fetchFarmerTransactions(selectedFarmer._id)
        // eslint-disable-next-line
    },[transactions,selectedFarmer])

    const onChangeHandler = (e) => {
      setInitialValues({...initialValues,[e.target.name] : e.target.value})
  }

  const clearState = () => {
    setInitialValues({product:"",weight:0,id: null})
  }
    
    return (farmerTransaction && products)  && <Table 
      title='Transaction'
      head={['product','weight','rate','total']} 
      body={ filteredTransactions ? filteredTransactions : farmerTransaction} 
      editHandler={({product,weight,_id}) => setInitialValues({product:'',weight,id:_id})}
      filterHandler ={(term) => filterTransactions(term)}
      deleteHandler={(id) => deleteTransaction(id,selectedFarmer._id)}
      submitHandler = {(transactionData) => addTransaction(transactionData)}
      clearState = {clearState}
      >
        <StyledForm onSubmit ={(e) => {
          e.preventDefault()
          initialValues.id ? editTransaction({productId: initialValues.product,...initialValues}): addTransaction({farmer: selectedFarmer._id,...initialValues}) 
          clearState()
          }}>
          <select name='product' onChange={(e) =>onChangeHandler(e)} value={initialValues.product}>
          <option value=''>Select Product</option> 
            {products.map(product => (
                <option key={product._id} value={product._id}>{product.name}</option> 
            ))}
          </select>
          <StyledInput type='text' name='weight' onChange={(e) =>onChangeHandler(e)} value={initialValues.weight} placeholder='weight' />
          <Button type='submit'>Submit</Button>
      </StyledForm>

  </Table>
    })

export default Payout;