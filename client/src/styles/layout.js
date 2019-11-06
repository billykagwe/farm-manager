import styled from 'styled-components'

export const Layout = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 1rem;
    flex-wrap: wrap;
`

export const SideDiv = styled.div`
    flex-grow: 1;
    
`
export const MainSection = styled.div`
    flex-grow: 3;
    margin: 0 1rem;
    box-shadow: 0 6px 16px 0 rgba(0,0,0,.2);
  `

export const FarmerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    justify-content: center;
    margin: auto;
    a{
        display:block;
        color:black;
        text-align:center
    }
    
    @media(max-width: 500px){
        width: 100%;
    }
`

export const CardWrapper = styled.div`
    box-shadow:0 6px 16px 0 rgba(0,0,0,.2);
    padding: 1rem;
    margin: 1rem;
`

export const FarmerInfoWrapper = styled.div`
{
    box-sizing: border-box;
    flex-direction: column;
    flex-grow: 1;
    align-self: inherit;
    display: flex;
    position: relative;
    left: 0;
    align-items: center;
    padding: 0 1rem;
    margin: 1rem;
    padding: 2rem;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12);

    ul{
        padding: 0;
        list-style: none;
        width: 100%
        flex-grow: 1;
        margin: 0 1rem;
    }

    span{
        color:#02bb8c
    }

    li{
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    }

      
`