import React,{Fragment,useContext} from 'react'
import Backdrop from './Backdrop'
import Modal from './Modal'
import DeleteContext from "../../contexts/delete/deleteContext";
const Deleting = () => {
    const deleteContext = useContext(DeleteContext)
   
    return deleteContext.delete ? <Fragment>
            <Backdrop/>
            <Modal title={deleteContext.delete.title} onCancel={() => deleteContext.removeDelete()} onConfirm={() => deleteContext.handleDelete()} >
                <p>`Are you sure you want to Delete`</p>
            </Modal>
    </Fragment> : null
}

export default Deleting