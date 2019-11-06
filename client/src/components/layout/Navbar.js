import React,{useContext} from 'react';
import styled from 'styled-components'
import {Link,withRouter} from 'react-router-dom'
import AuthContext from '../../contexts/auth/authContext'

const Div = styled.div`
display: flex;
height: 3rem;
justify-content: space-between;
padding: 0 1rem;
align-items: center;
border-bottom: 1px solid #eee;
margin-bottom: 1rem;
a{
    text-decoration:none;
    color:black;
}
`;
const P = styled.p`
font-weight: 400;
    font-size: 1.1rem;
    background: #02bb8c;
    padding: 5px 13px;
    border-radius: 3px;
    color: white;
    font-size: 1.1rem;
    text-decoration:none;
`

const Logo = styled.h2`
margin: 0;
font-size: 1.5rem;
text-decoration: none
color: black;
`;


const Navbar = () => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated} = authContext
    
    return(
        <Div>
        <Link to='/'><Logo>FarmDits</Logo></Link>
        {isAuthenticated ? < Link onClick={() => authContext.logout()}  to='/login'><P>logout</P></Link>: <Link to='/login'><P>login</P></Link>}
        </Div>
    )}


export default withRouter(Navbar)