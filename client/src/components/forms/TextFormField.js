import React from 'react'
import {FieldProps,getIn} from 'formik'
import styled from 'styled-components'
import {FormWrapper} from './Form'

export const Input = styled.input`
    box-sizing: border-box;
    font-size: 1rem;
    line-height: 1.5;
    display: inline-block;
    padding: .375rem .75rem;
    flex: 1 1 auto;
    margin: 8px auto;
    border-radius: .25rem;
    font-weight: 400;
    border: none;
    outline: none;
    vertical-align: middle;
    border: 1px solid #ced4da;
    width: 100%;
    position: relative;

`

const TextFormField = ({field,form,...props}) => {
    return(
         <Input {...field} {...props}/>
)}

export default TextFormField