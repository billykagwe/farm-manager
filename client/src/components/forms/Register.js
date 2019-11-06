import React,{useContext,useEffect} from 'react';
import {Form,Field,Formik} from 'formik'
import TextFormField from './TextFormField'
import {FormWrapper} from './Form'
import AuthContext from '../../contexts/auth/authContext'
import AlertContext from '../../contexts/alert/alertContext'
import {withRouter,Link} from 'react-router-dom'

const Register = ({history}) => {
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)

    const {register,isAuthenticated,error,clearErrors} = authContext
    
    useEffect(() => {
        if(isAuthenticated){
            history.push('/')
        }

        if(error){
            alertContext.setAlert(error,'danger')
            clearErrors()
        }
        
        //eslint-disable-next-line
    },[isAuthenticated,history,error])

    return(
     <Formik initialValues={{email:"",password:"",confirmPassword:""}} onSubmit={(values) => register(values)}>
        {() => (
                <Form>
                    <FormWrapper>
                        <h2>Register </h2>
                        <Field name='email' placeholder='Email' required component={TextFormField}/>
                        <Field name='password' type="password" placeholder="Password" required component={TextFormField}/>
                        <Field name='confirmPassword' type="password" placeholder="Confirm Password" required component={TextFormField}/>
                        <button type="submit">Submit</button>
                        <small ><Link style={{fontSize:'1.2rem',display: 'block', textAlign:'center', margin: "1rem auto"}} to='/login'>or Login</Link> </small> 
                    </FormWrapper>  
                </Form>
         )}
    </Formik>
 
)}

export default withRouter(Register);