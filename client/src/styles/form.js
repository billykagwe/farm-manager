import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;

  @media(max-width: 600px){
    flex-direction: column;
  }
`
export const StyledInput = styled.input`
  border: 1px solid #eee;
  padding: 5px;
`

export const Button = styled.button`
background: #02bb8c;
border: none;
padding: 6px 12px;
color: white;
`