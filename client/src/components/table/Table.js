import React,{useContext, useState} from 'react';
import styled from 'styled-components'
import {StyledTable, TableWrapper,StyledTr,Td,Th} from '../../styles/Table'
import {Link} from 'react-router-dom'
import DeleteIcon from '../../images/delete.png'
import EditIcon from '../../images/edit.png'
import addIcon from '../../images/add.png'
import closeIcon from '../../images/close.png'
import next from '../../images/next.png'
import DeleteContext from '../../contexts/delete/deleteContext'

const StyledInput = styled.input`
    border-radius: 3px;
    padding: 5px 10px;
    width: 250px;
    margin: 0 1rem 1rem 0
    height: 1.7rem;
    border: 1px solid rgb(170, 170, 170);
`


const Table = ({head,body,navigation,editHandler,deleteHandler,filterHandler, children,clearState,searchType='text',title='title'}) => {
    const deleteContext = useContext(DeleteContext)
    const {setDelete} = deleteContext
    const [show,setShow]  = useState(false)
    
    return (
        <TableWrapper>
            <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',flexWrap:'wrap'}}>
                <p style={{margin:'10px 0',fontSize:'1.5rem'}}>{title}</p>
                {filterHandler && <StyledInput type={searchType} placeholder='Search' onChange={e => filterHandler(e.target.value)}/>}
                {children && <div >
                { show ? <img style={{height: '2.7rem'}} onClick={() => {
                    setShow(false)
                    clearState()
                    }} src={closeIcon} alt='close'/> : <img style={{height: '2.7rem'}} onClick={() => {
                    setShow(true)
                    }} src={addIcon} alt='add'/>} 
             </div>}
            </div>
                
           
            <div style={{margin:'1rem'}} >{show && children}</div> 
        <StyledTable>
            <thead>
                <StyledTr>
                    {head.map(h => <Th key={h}>{h.toUpperCase()}</Th>)}
                    {(editHandler || deleteHandler) &&<Th>ACTIONS</Th>}
                </StyledTr>
            </thead>
            <tbody>
                {body.map(b => (
                    <StyledTr  key={b._id}> 
                        {head.map((h) => (
                                <Td key={h}>{b[h]}</Td> 
                        ))}
                         {(editHandler || deleteHandler) && <Td style={{display:'flex',alignItems:'center'}}>
                         {deleteHandler && <img onClick= {() =>{ editHandler(b); setShow(true)}} style={{height:'1rem',width: '1rem'}} src={EditIcon} alt='edit'/>}
                         {deleteHandler && <img onClick={() => setDelete({title: 'Delete',confirm: () => deleteHandler(b._id)})} style={{height:'1rem',marginLeft:'8px', width: '1rem'}} src={DeleteIcon} alt='delete'/>}
                         { navigation &&<Link  to={`/farmers/${b._id}`}><img style={{height:'2.2rem',marginTop: '6px',marginLeft:'2rem', border:'1px solid', borderRadius:'50%'}} src={next} alt='more'/></Link>} 
                       </Td>}
                       
                    </StyledTr>
                ))}
            </tbody>
        </StyledTable>
        
        </TableWrapper>
    )
}

export default Table