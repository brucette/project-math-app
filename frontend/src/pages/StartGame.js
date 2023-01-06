import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { OuterWrapper } from 'styles/globalStyles';

const StartGame = () => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    setTimeout(() => { navigate('/questions') }, 500);
  }

  return (
    <OuterWrapper>
      <Choose>Challenge:</Choose>
      <ChoiceWrapper>
        <Choice type="button" onClick={() => onButtonClick()}>Friend</Choice>
        <Choice type="button" onClick={() => onButtonClick()}>Random</Choice>
      </ChoiceWrapper>
    </OuterWrapper>
  )
}

export default StartGame;

const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: wrap;
`

const Choose = styled.p`
  font-size: 2rem;
  color: #555;
  margin-bottom: 1rem;
`

const Choice = styled.button`
  width: 12rem;
  background-color: #F7DD65;
  color: #666;
  border-radius: 15px;
  border: 3px solid #5DB0B2;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`