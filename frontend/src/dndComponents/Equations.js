/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { game } from 'reducers/game';
// import { headShake, pulse } from 'react-animations';
// import styled, { keyframes } from 'styled-components/macro';
// import { useMultiDrop } from 'react-dnd-multi-backend';
// import { Devices } from 'styles/GlobalStyles';
// import { OptionCard } from './OptionCard';

// const HeadShakeAnimation = keyframes`${headShake}`;
// const HeartBeatAnimation = keyframes`${pulse}`;

// const Equations = () => {
//   // const [answer, setAnswer] = useState('');
//   const [nextQuestion, setNextQuestion] = useState(true);
//   const [nextButton, setNextButton] = useState(false);
//   const [providedAnswer, setProvidedAnswer] = useState(false);
//   const [basket, setBasket] = useState([])
//   console.log('THE DROPPED ONE:', basket[0])

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const problemNumber = useSelector((state) => state.game.currentProblemIndex);
//   const problem = useSelector((state) => state.game.equations);
//   const trainingOver = useSelector((state) => state.game.gameOver);
//   const isAnswerCorrect = useSelector((state) => state.game.isCorrect);
//   console.log('problem:', problem)
//   // console.log('problem:', Array.isArray(problem))

//   const addAnswerToBasket = (id) => {
//     const answerList = problem.answers.filter((pet, index) => index === id)
//     setBasket([answerList[0]])
//     // setAnswer(basket[0])
//     setNextButton(true);
//     console.log('BASKET SET TO:', answerList[0])
//   }

//   const [[dropProps], { html5: [html5Props, html5Drop],
// touch: [touchProps, touchDrop] }] = useMultiDrop({
//     // input object:
//     // accept is mandatory
//     accept: 'card',
//     // drop is a callback function, triggers with every drop, receives data from item in useDrag
//     // adds the item to the basket array if it's not already there, a new instance of array returned
//     drop: (item) => addAnswerToBasket(item.id),
//     collect: (monitor) => ({
//       isOver: monitor.isOver()
//     })
//   })

//   // Function that activates when user enters an answer,
//   // also resets the goToNextQuestion-state hook
//   const moveToNext = () => {
//     dispatch(game.actions.submitEqAnswer(basket[0]));
//     // setAnswer('');
//     setBasket([]);
//     setProvidedAnswer(true);
//     dispatch(game.actions.goToNextQuestion());
//     setTimeout(() => { setNextQuestion(true) }, 2000);
//     setNextButton(false);
//   }

//   const onFormSubmit = (event) => {
//     const { keyCode } = event;

//     if (keyCode === 13 && !trainingOver) {
//       moveToNext(event);
//     } else if (keyCode === 13 && trainingOver) {
//       navigate('/summary');
//     } else {
//       event.preventDefault();
//     }
//   }

//   // DOES NOT WORK WITH DND SO FAR:
//   // Enables the user to use the enter-key to progress.
//   // const onKeyDown = (event) => {
//   //   const { keyCode } = event;

//   //   if (keyCode === 13 && !trainingOver) {
//   //     moveToNext();
//   //   } else if (keyCode === 13 && trainingOver) {
//   //     onFormSubmit(event);
//   //   }
//   // }

//   // Get set of questions from database
//   useEffect(() => {
//     if (nextQuestion) {
//       setNextQuestion(false);
//       setProvidedAnswer(false);
//       fetch('http://localhost:8080/questions') // fetch('http://10.0.5.52:8080/equations')
//         .then((res) => res.json())
//         .then((json) => {
//           // console.log(json)
//           dispatch(game.actions.submitEquations(json[0]));
//         })
//     }
//   }, [nextQuestion]);

//   // DROPPROPS - Where should it be used??
//   const html5DropStyle = { backgroundColor: (dropProps.isOver && html5Props.canDrop) ? '#f3f3f3' : '#bbbbbb' } // (html5Props.isOver && html5Props.canDrop)
//   const touchDropStyle = { backgroundColor: (touchProps.isOver && touchProps.canDrop) ? '#f3f3f3' : 'lightcoral' } // (touchProps.isOver && touchProps.canDrop)

//   return (
//     <QuestionWrapper>
//       <Question>{problem} {problem.question}</Question>
//       <form onSubmit={onFormSubmit}>

//         <MouseDropArea style={html5DropStyle} ref={html5Drop}>
//           {basket.map((card, index) => <OptionCard key={card} id={index} name={card} />)}
//           <div>Drag your answer here!</div>
//         </MouseDropArea>

//         <TouchDropArea style={touchDropStyle} ref={touchDrop}>
//           {basket.map((card, index) => <OptionCard key={card} id={index} name={card} />)}
//           {/* {!touchProps.isOver && <Instruct>Drag & drop your answer here!</Instruct>} */}
//           {basket.length === 0 && <Instruct>Drag & drop your answer here!</Instruct>}
//           {/* {touchProps.isOver && <div>Drop Here!</div>} */}
//         </TouchDropArea>

//         <Pets>
//           {problem.answers?.map((card, index) => <OptionCard key={card} id={index} name={card} />)}
//         </Pets>

//         {!trainingOver && (
//           <Button
//             className={providedAnswer ? (isAnswerCorrect ? 'correct' : 'wrong') : 'default'}
//             onClick={moveToNext}
//             disabled={!nextButton}
//             type="button">Next
//           </Button>
//         )}
//       </form>
//       <Question>Question number {problemNumber + 1}</Question>
//     </QuestionWrapper>
//   );
// }

// export default Equations;

// const QuestionWrapper = styled.section`
//   width: 80vw;
//   margin: 15vh auto;
//   /* border: 2px red solid; */
// `

// const Question = styled.h1`
//   font-size: 1.2rem;
//   font-weight: bold;
//   color: #666;
// `
// const Instruct = styled.div`
//   font-size: 1.2rem;
//   font-weight: bold;
//   color: white;

//   align-items: center;
//   justify-content: center;
// `

// const Pets = styled.div`
//   height: 8rem;
//   width: 80vw;
//   border-radius: 5px;
//   background-color: beige;
//   display: flex;
//   margin-top: 1rem;
//   margin-bottom: 2rem;
//   align-items: center;
// `

// const MouseDropArea = styled.div`
//     height: 10rem;
//     width: 30rem;
//     /* background-color: thistle; */
//     display: none;
//     margin: 1rem;
//     border-radius: 5px;

//     @media ${Devices.laptop} {
//       display: flex;
//     }

//     @media ${Devices.desktop} {
//       display: flex;
//     }
//   `

// const TouchDropArea = styled.div`
//     height: 10rem;
//     width: 80vw;
//     /* background-color: thistle; */
//     display: flex;
//     align-items: center;
//     margin: 1rem 0;
//     border-radius: 5px;
//     justify-content: center;

//     @media ${Devices.laptop} {
//       display: none;
//     }

//     @media ${Devices.desktop} {
//       display: none;
//     }
//   `

// const Button = styled.button`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: lightblue;
//   color: white;
//   font-size: 1.5em;
//   font-weight: bold;
//   border: none;
//   width: 330px;
//   /* margin: 5%; */
//   margin: 1rem 0;
//   padding: 5% 2%;
//   border-radius: 25px;
//   cursor: pointer;
//   text-align: center;

//   &.correct {
//     background-color: lightgreen;
//     color: white;
//     animation: infinite 0.5s ${HeartBeatAnimation};
//   }

//   &.wrong {
//     background-color: red;
//     color: white;
//     animation: infinite 1s ${HeadShakeAnimation};
//   }

//   &:disabled {
//     color: rgb(0, 0, 0, 0.2);
//   }
// `