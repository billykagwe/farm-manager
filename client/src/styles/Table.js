import styled from 'styled-components'

export const TableWrapper =styled.div`
    box-sizing: border-box;
    padding: 1rem;
    border: 1px solid #eee;
    margin: 1rem;
    margin-bottom: 4rem;
    overflow: scroll;
    ::-webkit-scrollbar {
    display: none;
    }

a{
    color:black;
    text-decoration: none;
}
`

export const Th = styled.th`
    padding:10px;
    text-align: left;
    font-weight: 600;
`

export const StyledTr = styled.tr`
    border-bottom: 1px solid #ccc;
`

export const Td = styled.td`
    text-align: left;
    padding: 3px 10px;
   
`

export const StyledTable = styled.table`
border-collapse: collapse;
width: 100%;
margin-top: 1rem;
border: 1px solid #ccc; 
`
