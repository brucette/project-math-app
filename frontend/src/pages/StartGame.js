/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';
import BackBtn from 'components/globalComponents/BackBtn';
import { API_URL } from 'utils/utils';
import { OuterWrapper, Choose, ChoiceWrapper, Choice } from 'Styles/globalStyles';

// Rendered when user makes a choice to challenge another user
const StartGame = () => {
  const userId = useSelector((state) => state.user.id);
  const username = useSelector((state) => state.user.username);

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
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({
        opponent: event,
        userId,
        username
      })
    }
    fetch(API_URL('challenges'), options)
      .then((res) => res.json())
      .then((json) => {
        dispatch(game.actions.submitOpponent(json.response.opponentusername))
        dispatch(game.actions.submitQuestion(json.response.questions))
        dispatch(game.actions.submitMatchId(json.response.id))
        dispatch(game.actions.submitCheck(false))
      })
    dispatch(game.actions.setMode('challenge'));
    setTimeout(() => { navigate('/questions') }, 500);
  }

  return (
    <OuterWrapper>
      <BackBtn />
      <Choose>Click to get an opponent:</Choose>
      <ChoiceWrapper>
        <Choice type="button" onClick={() => onButtonClick('random')}>Random</Choice>
      </ChoiceWrapper>
    </OuterWrapper>
  )
}

export default StartGame;
