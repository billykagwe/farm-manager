import React,{useContext,useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import AdvanceContext from '../../contexts/advance/advanceContext'
import Table from '../table/Table'
import FarmerContext from '../../contexts/farmer/farmerContext'
import {StyledInput,StyledForm,Button} from '../../styles/form'

const Advance = () => {
    const advanceContext = useContext(AdvanceContext)
    const farmerContext = useContext(FarmerContext)
    const {addAdvance,deleteAdvance,editAdvance,advances,filterAdvance} = advanceContext
    const {selectedFarmer,fetchFarmer} = farmerContext
    const {farmer} = useParams()
    
    const [initialValues,setInitialValues] = useState({item:"",amount:"",deadline: '',settled: false})
 
    useEffect(() => {
      fetchFarmer(farmer)
      // eslint-disable-next-line
    },[advances])

    const clearState = () => {
      setInitialValues({item:"",amount:"",deadline: '',settled: ''})
    }

    const onChangeHandler = (e) => {
        setInitialValues({...initialValues,[e.target.name] : e.target.value})
    }

    return  selectedFarmer && <Table 
        title='Advance'
        head={['item','amount','deadline','settled']} 
        body={selectedFarmer.advance.map(({_id,item,amount,deadline,settled}) =>{ 
          console.log(settled)
          return{
               _id,
               item,
               amount,
               settled: settled.toString(),
               deadline: new Date(deadline).toDateString()
        }})}
        editHandler={({item,amount,deadline,settled,_id}) => setInitialValues({item,amount,deadline: null,settled,id:_id})}
        filterHandler ={(term) => filterAdvance(term)}
        deleteHandler={(id) => deleteAdvance(id)}
        submitHandler = {(advanceData) => addAdvance({farmerId: selectedFarmer._id,...advanceData})}
        clearState = {clearState}
        >
          <StyledForm onSubmit ={(e) => {
            e.preventDefault()
            initialValues.id ? editAdvance({farmerId: selectedFarmer._id,...initialValues}): addAdvance({farmerId: selectedFarmer._id,...initialValues}) 
            clearState()
            }}>
            <StyledInput type='text' name='item' onChange={(e) =>onChangeHandler(e)} value={initialValues.item} placeholder='Item' />
            <StyledInput type='number' name='amount' onChange={(e) =>onChangeHandler(e)} value={initialValues.amount} placeholder='amount' />
            <input type='date' name='deadline' onChange={(e) =>onChangeHandler(e)} value={initialValues.deadline} placeholder='deadline' />
            <Button type='submit'>Submit</Button>
        </StyledForm>

    </Table>

        
}

export default Advance