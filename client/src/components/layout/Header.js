import React from 'react'
import styled from 'styled-components'
import add from '../../images/add.png'

const Div = styled.div`
        display: flex;
        justify-content: space-between;
        margin: 10px;
        margin-bottom:1rem;
        align-items: center;
        h2{
            text-align:center;
            margin:0
        }
`

const Header = ({title,onClick}) => (
    <Div>
        <h2>{title}</h2>
        <img src={add} onClick={onClick} alt="add" />
    </Div>
)

export default Header;