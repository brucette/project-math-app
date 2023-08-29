import React from 'react';
import styled from 'styled-components/macro';

const VipBtn = ({ fetchData }) => {
  const giveVipAccess = () => {
    const vipOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'testyMcTesty',
        password: 'testyMcTesty',
        email: 'testy@mctesty.com'
      })
    }
    fetchData('login', vipOptions)
  }

  return (
    <VIPButton type="button" onClick={giveVipAccess}>ACCES WITHOUT LOGIN!</VIPButton>
  )
}

export default VipBtn;

const VIPButton = styled.button`
  padding: 1rem;
  background-color: #F0A62A;
  border: transparent;
  margin: 1rem;
  border-radius: 10px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    color: #b84545;
    background-color: white;
    transition: 0.5s background-color ease-in-out;
    cursor: pointer;
  }
`