import React from 'react'
import styled from 'styled-components'

const Div =styled.div`

    width: 60%;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    position: fixed;
    top: 20vh;
    left: 18%;
    z-index: 100;
    margin: auto;
  
  .modal__header {
    padding: 1rem;
    background: #c50808;
    color: white;
  }
  
  .modal__header h1 {
    margin: 0;
    font-size: 1.25rem;
  }
  
  .modal__content {
    padding: 1rem;
  }
  button {
    margin-right: 10px;
    background: black;
    color: white;
    padding: 4px;
    border: none;
    border-radius: 2px;
  }
  .btn-confirm {
    background: red;
  }
  div {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    button{
        margin-right: 10px
    }
  }
  
  @media (min-width: 768px) {
    .modal {
      width: 100%
    }
  }
`

const Modal = ({title,onCancel,onConfirm,children}) => {
    return (<Div className="modal">
        <header className="modal__header">
        <h1>{title}</h1>
        </header>
        <section className="modal__content">{children}</section>
        <div className="modal__actions">
            <button className="btn" onClick={onCancel}>
            Cancel
            </button>
            <button className="btn-confirm" onClick={onConfirm}>
            Confirm
            </button>
        </div>
  </Div>)
}

export default Modal