import React,{useContext,Fragment} from 'react'
import deleteIcon from '../../images/delete.png'
import editIcon from '../../images/edit.png'
import { Td } from '../../styles/Table'
import DeleteContext from '../../contexts/delete/deleteContext'

const styles = {height:'15px', margin:'5px'}

const Actions = ({confirm,editHandler,title}) => {
    const deleteContext = useContext(DeleteContext)
    return(
        <Fragment>
             <Td>
                <img onClick={() => deleteContext.setDelete({confirm,title})} style={styles} src={deleteIcon} alt="delete"/>
                <img onClick={editHandler}   style={styles} src={editIcon} alt="edit"/>
            </Td>
        </Fragment>
   
)}

export default Actions