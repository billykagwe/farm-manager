import React,{useContext,useEffect, useState, Fragment} from 'react';
import ProductContext from '../contexts/product/productContext'
import Table from '../components/table/Table'
import {StyledInput,StyledForm,Button} from '../styles/form'

const Products = () =>  {
  const productContext = useContext(ProductContext)
  const {fetchProducts,products,deleteProduct,addProduct,editProduct,loading,filterProducts,filteredProducts} = productContext
  const [initialValues,setInitialValues] = useState({name:"",rate:"",overpay: '',id: null})
  
  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line
  },[])

  console.log(products)

  const onChangeHandler = (e) => {
      setInitialValues({...initialValues,[e.target.name] : e.target.value})
  }

  const clearState = () => {
    setInitialValues({name:"",rate:0,overpay: 0,id: null})
  }

  return products && <Table 
        title='Products'
        head={['name','rate','overpay']} 
        body={ filteredProducts ? filteredProducts : products} 
        editHandler={({name,rate,overpay,_id}) => setInitialValues({name,rate,overpay,id:_id})}
        filterHandler ={(term) => filterProducts(term)}
        deleteHandler={(id) => deleteProduct(id)}
        submitHandler = {(productData) => addProduct(productData)}
        clearState = {clearState}
        >
          <StyledForm onSubmit ={(e) => {
            e.preventDefault()
            initialValues.id ? editProduct(initialValues): addProduct(initialValues) 
            clearState()
            }}>
            <StyledInput type='text' name='name' onChange={(e) =>onChangeHandler(e)} value={initialValues.name} placeholder='name' />
            <StyledInput type='number' name='rate' onChange={(e) =>onChangeHandler(e)} value={initialValues.rate} placeholder='rate' />
            <StyledInput type='text' name='overpay' onChange={(e) =>onChangeHandler(e)} value={initialValues.overpay} placeholder='overpay' />
            <Button type='submit'>Submit</Button>
        </StyledForm>

    </Table>
          
}

export default Products