import React from 'react'
import styled from 'styled-components'
import {useLoadUser } from '../hooks/useLoadUser'

const Div = styled.div`
    h1{
        text-align: center;
        padding: 1rem;
    }
`
const Home = () => {
   useLoadUser()
    return(
        <Div>
                <h1>Welcome to your Farm Products Management System</h1>
        </Div>


    )
}

export default Home