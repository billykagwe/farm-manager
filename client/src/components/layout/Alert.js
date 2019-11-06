import React,{useContext} from 'react'
import AlertContext from '../../contexts/alert/alertContext'
import styled from 'styled-components'

const Div = styled.div`
    text-align: center;
    color: ${(props) => props.type === 'danger' ? 'red' : 'green'};
`

const Alert = () => {
    const alertContext = useContext(AlertContext)
    const {alerts} = alertContext
    return(
        alerts.length > 0 && alerts.map(alert => {
            console.log(alert.type)
            return (<Div key={alert.id} type={alert.type} >
                {alert.msg}
            </Div>)
        
            })
    
    )}

export default Alert