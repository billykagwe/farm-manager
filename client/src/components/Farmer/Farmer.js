import React,{useEffect,useContext} from 'react'
import FarmerContext from '../../contexts/farmer/farmerContext'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Advance from './Advance'
import Transaction from './Transaction'
import Imprest from './Imprest'
import {FarmerWrapper} from '../../styles/layout'
import BackIcon from '../../images/back.png'

const Farmer = () => {
  const {farmer} = useParams()
  const farmerContext  = useContext(FarmerContext)
  const {loading,selectedFarmer,fetchFarmer,farmers} = farmerContext
  useEffect(() => {
    fetchFarmer(farmer)
    // eslint-disable-next-line
  },[farmers,loading])
    return (
        selectedFarmer && <FarmerWrapper>
          <div style={{display: 'flex',justifyContent: 'space-around',alignItems:'center'}}>
           <Link to='/farmers'> <img style={{height:'1.7rem'}} src={BackIcon} alt='back'/> </Link> 
            <p style={{color:'#02bb8c',margin:0}}>{selectedFarmer.name}</p>
          </div>
            
            <Transaction/>
            <Imprest/>
            <Advance/> 
        </FarmerWrapper>
        )
      
}


export default Farmer