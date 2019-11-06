import React,{useContext,useEffect} from 'react'
import AdvanceContext from '../contexts/advance/advanceContext'
import Table from '../components/table/Table'


const Advances = () => {
    const advanceContext = useContext(AdvanceContext)
    const {advances,fetchAdvances,filterAdvances,filteredAdvances} = advanceContext

    useEffect(() => {
        fetchAdvances()
        // eslint-disable-next-line
    },[])

    const reduceAdvance = (data) => {
      return  data.map(({_id,farmer,amount,item,deadline,settled}) => {
        return {
          _id,
          farmer: farmer ? farmer.name: '',
          amount,
          item,
          deadline: new Date(deadline).toDateString(),
          settled
        }
      })
    }

    return (
      advances && <Table 
        title='Advances'
        head={['farmer','item','amount','deadline']} 
        body={filteredAdvances && filteredAdvances.length > 0 ? reduceAdvance(filteredAdvances) : reduceAdvance(advances) }
        filterHandler={(date) => filterAdvances(date)}
        searchType='date'
        >

    </Table>
)}

export default Advances