import React,{useState,useContext} from 'react'
import Table from '../table/Table'
import FarmerContext from '../../contexts/farmer/farmerContext'
import {StyledInput,StyledForm,Button} from '../../styles/form'

const Imprest = () => {
    const [initialValues,setInitialValues] = useState({item:"",amount:"",date: '',id:''})

    const farmerContext = useContext(FarmerContext)
    
    const {selectedFarmer,issueImprest,editImprest,deleteImprest,filterImprest} = farmerContext

    const clearState = () => {
      setInitialValues({item:"",amount:"",date: ''})
    }
    const onChangeHandler = (e) => {
      setInitialValues({...initialValues,[e.target.name] : e.target.value})
  }
    return( 
        
        selectedFarmer &&  <Table 
        title='Imprest'
        head={['item','amount','date']} 
        body={selectedFarmer.imprest.map(({_id,item,amount}) =>{ 
          return{
               _id,
               item,
               amount,
               date: new Date().toDateString()
        }})}
        editHandler={({item,amount,date,_id}) => setInitialValues({item,amount,date: null,id:_id})}
        filterHandler ={(term) => filterImprest(term)}
        deleteHandler={(id) => deleteImprest(id)}
        submitHandler = {(imprestData) => issueImprest({farmerId: selectedFarmer._id,...imprestData})}
        clearState = {clearState}
        >
          <StyledForm onSubmit ={(e) => {
            e.preventDefault()
            initialValues.id ? editImprest({farmerId: selectedFarmer._id,...initialValues}): issueImprest({farmerId: selectedFarmer._id,...initialValues}) 
            clearState()
            }}>
            <StyledInput type='text' name='item' onChange={(e) =>onChangeHandler(e)} value={initialValues.item} placeholder='Item' />
            <StyledInput type='number' name='amount' onChange={(e) =>onChangeHandler(e)} value={initialValues.amount} placeholder='amount' />
            <Button type='submit'>Submit</Button>
        </StyledForm>

    </Table>

    )
}

export default Imprest