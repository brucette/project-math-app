/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';
import { OuterWrapper, Choose, ChoiceWrapper, Choice } from 'Styles/globalStyles';
import BackBtn from 'components/globalComponents/BackBtn';
import FadeInDownBig from 'Styles/FadeInDownBig';

// Rendered when user makes a choice to do a traning problem set
const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Authenticate user
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, []);

  const onButtonClick = (event) => {
    dispatch(game.actions.restart());
    dispatch(game.actions.setMode('training'));
    dispatch(game.actions.submitCheck(true));
    dispatch(game.actions.submitOperation(event));
    setTimeout(() => { navigate('/questions') }, 500);
  }

  return (
    <OuterWrapper>
      <BackBtn />
      <Choose>What do you want to practice today?</Choose>
      <Choose>Pick your poison!</Choose>
      <ChoiceWrapper>
        <FadeInDownBig duration="0.8s" delay="0.2s">
          <Choice type="button" onClick={() => onButtonClick('+')}>+</Choice>
          <Choice type="button" onClick={() => onButtonClick('-')}>-</Choice>
          <Choice type="button" onClick={() => onButtonClick('*')}>*</Choice>
          <Choice type="button" onClick={() => onButtonClick('/')}>/</Choice>
          <Choice type="button" onClick={() => onButtonClick('eq')}>Equations</Choice>
          <Choice type="button" onClick={() => onButtonClick('fr')}>Fractions</Choice>
        </FadeInDownBig>
      </ChoiceWrapper>
    </OuterWrapper>
  )
}

export default Categories;
