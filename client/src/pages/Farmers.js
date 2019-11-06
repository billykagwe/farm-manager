import React,{useState,useContext,useEffect} from 'react'
import FarmerContext from '../contexts/farmer/farmerContext'
import Table from '../components/table/Table'
import {useLoadUser} from '../hooks/useLoadUser'
import {StyledInput,StyledForm,Button} from '../styles/form'


const Farmers = () => {
  const farmerContext = useContext(FarmerContext)
  const {farmers,fetchFarmers,deleteFarmer,addFarmer,editFarmer,loading,filterFarmers,filteredFarmers} = farmerContext
  useLoadUser()
  useEffect(() => {
    fetchFarmers()
    // eslint-disable-next-line
  },[loading])
  
  const [initialValues,setInitialValues] = useState({name:"",region:"",contacts: '',id: null})
  
  const clearState = () => {
    setInitialValues({name:"",region:"",contacts: '',id: null})
  }

  const onChangeHandler = (e) => {
      setInitialValues({...initialValues,[e.target.name] : e.target.value})
  }
    return farmers && <Table 
          title='Farmers'
          head={['name','region','contacts']} 
          body={filteredFarmers ? filteredFarmers : farmers} 
          navigation
          clearState ={clearState}
          editHandler={(b) => setInitialValues({name:b.name,region:b.region,contacts:b.contacts,id:b._id})}
          filterHandler ={(term) => filterFarmers(term)}
          deleteHandler={(id) => deleteFarmer(id)}
          submitHandler = {(farmerData) => addFarmer(farmerData)}
          >
             <StyledForm onSubmit ={(e) => {
               e.preventDefault()
               initialValues.id ? editFarmer(initialValues): addFarmer(initialValues) 
               setInitialValues({name:"",region:"",contacts: '',id: null})
              }}>
               <StyledInput type='text' name='name' onChange={(e) =>onChangeHandler(e)} value={initialValues.name} placeholder='name' />
               <StyledInput type='text' name='region' onChange={(e) =>onChangeHandler(e)} value={initialValues.region} placeholder='region' />
               <StyledInput type='text' name='contacts' onChange={(e) =>onChangeHandler(e)} value={initialValues.contacts} placeholder='contacts' />
               <Button type='submit'>Submit</Button>
           </StyledForm>

          </Table>
       
}
export default Farmers