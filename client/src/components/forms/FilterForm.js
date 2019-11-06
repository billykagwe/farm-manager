import React,{useState} from 'react'
import styled from 'styled-components'

const InputDiv = styled.div`
border: 1px solid #aaa;
border-radius: 4px;
display: flex;
justify-content: center;
align-items: center;
height: 3rem;
margin: 10px;

input{
    
};

button{
    box-sizing: border-box;
    display: inline-block;
    padding: 10px 1.2rem;
    border: 2 solid pink;
    background: #02bb8c;
    outline: none;
    border: none;
    height:100%;
    color: white;
    font-size: 1rem;
    flex-grow: 1;
}
`
const Input = styled.input`
outline: none;
    border: none;
    box-sizing: border-box;
    padding: 10px;
    font-size: 1rem;
    width: 15rem;
    flex-grow: 1;
`

const FilterForm = ({filterHandler,placeholder,type="text"}) => {
    const [term,setTerm] = useState('')
    return(
    <InputDiv>
        <Input onChange={(e)=> setTerm(e.target.value)} value={term} type={type}  name='term'placeholder={placeholder}/>
        <button onClick={() => filterHandler(term)} type="submit">Search</button>
    </InputDiv>
)}

export default FilterForm