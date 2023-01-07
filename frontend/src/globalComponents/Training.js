/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import { game } from 'reducers/game';
import { headShake, pulse } from 'react-animations';
import styled, { keyframes } from 'styled-components/macro';
import { useMultiDrop } from 'react-dnd-multi-backend';
import DnDForm from 'dndComponents/DnDForm';
import Timer from './Timer';
import TextForm from './TextForm';
import { OuterWrapper } from '../styles/globalStyles';

const HeadShakeAnimation = keyframes`${headShake}`;
const HeartBeatAnimation = keyframes`${pulse}`;

const Training = () => {
  const [answer, setAnswer] = useState('');
  const [nextQuestion, setNextQuestion] = useState(true);
  const [nextButton, setNextButton] = useState(false);
  const [providedAnswer, setProvidedAnswer] = useState(false);
  const [time, setTime] = useState(0);
  const [basket, setBasket] = useState([]);
  const [startFetch, setStartFetch] = useState(true);
  // const [challenge, setChallenge] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const operation = useSelector((state) => state.game.operation);
  const setNumber = useSelector((state) => state.game.setNumber);
  const problem = useSelector((state) => state.game.questions);
  const problemNumber = useSelector((state) => state.game.currentProblemIndex);
  const trainingOver = useSelector((state) => state.game.gameOver);
  const isAnswerCorrect = useSelector((state) => state.game.isCorrect);
  const mode = useSelector((state) => state.game.mode);

  const addAnswerToBasket = (name) => {
    const selected = name;
    setAnswer(name);
    setBasket([selected]);
    setNextButton(true);
  }

  const [[dropProps], {
    html5: [html5Props, html5Drop],
    touch: [touchProps, touchDrop]
  }] = useMultiDrop({
    accept: 'card',
    drop: (item) => addAnswerToBasket(item.name),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  const html5DropStyle = { backgroundColor: (dropProps.isOver && html5Props.canDrop) ? '#f3f3f3' : '#bbbbbb' } // (html5Props.isOver && html5Props.canDrop)
  const touchDropStyle = { backgroundColor: (touchProps.isOver && touchProps.canDrop) ? '#f3f3f3' : 'lightcoral' } // (touchProps.isOver && touchProps.canDrop)

  // Function that start's the counter to a 1 second interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function that activates when user enters an answer,
  // also resets the goToNextQuestion-state hook
  const moveToNext = () => {
    dispatch(game.actions.submitAnswer(answer));
    setAnswer('');
    setBasket([]);
    setProvidedAnswer(true);
    dispatch(game.actions.goToNextQuestion());
    setTimeout(() => { setNextQuestion(true) }, 2000);
    setNextButton(false);
  }

  const onFormSubmit = (event) => {
    // To be ADDED to onFormsubmit once it is fully working
    // dispatch(game.actions.submitTime(time));
    // dispatch(game.actions.submitAnswer(answer));
    const { keyCode } = event;

    if (keyCode === 13 && !trainingOver) {
      moveToNext(event);
    } else if (keyCode === 13 && trainingOver) {
      navigate('/summary');
    } else {
      event.preventDefault();
    }
  }

  // Enables the user to use the enter-key to progress.
  const onKeyDown = (event) => {
    const { keyCode } = event;

    if (keyCode === 13 && !trainingOver) {
      moveToNext();
    } else if (keyCode === 13 && trainingOver) {
      onFormSubmit(event);
    }
  }

  const handleUserAnswerInput = (event) => {
    setAnswer(event.target.value);
    setNextButton(true);
  }

  // Get set of questions from database
  useEffect(() => {
    if (nextQuestion && startFetch) {
      console.log('startFetch', startFetch)
      setTime(0);
      <Timer />
      setNextQuestion(false);
      setStartFetch(false);
      setProvidedAnswer(false);
      console.log('startFetch', startFetch)
      // To post type of math problems to be trained
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operation,
          setNumber
        })
      }
      fetch(API_URL(mode === 'challenge' ? 'challenges' : 'questions'), options)
        .then((res) => res.json())
        .then((json) => {
          console.log('json.response', json.response)
          dispatch(game.actions.submitQuestion(json.response.questions));
        })
    } else if (nextQuestion && !startFetch) {
      setTime(0);
      <Timer />
      setNextQuestion(false);
      setProvidedAnswer(false);
    }
  }, [nextQuestion]);

  if (problem.length === 0) {
    return (
      <>
      </>
    );
  }

  let formInput;
  if (problem[problemNumber].operation === '+' || problem[problemNumber].operation === '-' || problem[problemNumber].operation === '*' || problem[problemNumber].operation === '/') {
    formInput = true;
  } else {
    formInput = false;
  }

  return (
    <OuterWrapper>
      <h1>Question: {problem[problemNumber].question}</h1>
      <form onSubmit={onFormSubmit}>
        {formInput ? <TextForm
          answer={answer}
          handleUserAnswerInput={handleUserAnswerInput}
          onKeyDown={onKeyDown} /> : <DnDForm
          basket={basket}
          html5DropStyle={html5DropStyle}
          html5Drop={html5Drop}
          touchDropStyle={touchDropStyle}
          touchDrop={touchDrop}
          problem={problem[problemNumber]} />}
        {!trainingOver && (
          <Button
            className={providedAnswer ? (isAnswerCorrect ? 'correct' : 'wrong') : 'default'}
            onClick={moveToNext}
            disabled={!nextButton}
            type="button">Next
          </Button>
        )}
        {trainingOver && (
          <Button
            className={providedAnswer ? (isAnswerCorrect ? 'correct' : 'wrong') : 'default'}
            type="submit"
            disabled={!nextButton}
            onClick={(event) => onFormSubmit(event)}>
              Submit
          </Button>
        )}
      </form>
      <Timer time={time} />
      <p>Question number {problemNumber + 1}</p>
    </OuterWrapper>
  );
}

export default Training;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightblue;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  width: 400px;
  margin: 10%;
  padding: 5% 2%;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;

  &.correct {
    background-color: lightgreen;
    color: white;
    animation: infinite 0.5s ${HeartBeatAnimation};
  }

  &.wrong {
    background-color: red;
    color: white;
    animation: infinite 1s ${HeadShakeAnimation};
  }

  &:disabled {
    color: rgb(0, 0, 0, 0.2);
  }
`

