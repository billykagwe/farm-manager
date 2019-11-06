import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Div = styled.div`
background: #02bb8c;
position: fixed;
bottom: 0;
width: 100%;
display: flex;
justify-content: space-around;
padding: 1rem 0;
a{
    color: white;
    text-decoration: none;
    cursor: pointer;
    font-weight: 500;
}
`;

const Footer = () => (
    <Div>
        <Link to='/farmers'>Farmers</Link>
        <Link to='/transactions'>Transactions</Link>
        <Link to='/products'>Products</Link>
        <Link to='/advances'>Advances</Link>
    </Div>
)

export default Footer