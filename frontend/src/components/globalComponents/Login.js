/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import user from 'reducers/user';
import VipBtn from 'components/userComponents/VipBtn';
import styled from 'styled-components/macro';
import { Devices } from 'Styles/globalStyles';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState('login');
  const [activeError, setActiveError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);

  useEffect(() => {
    if (accessToken) {
      navigate('/welcome');
    }
  }, [accessToken]);

  const loginOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, email })
  }

  const fetchData = (type, options) => {
    fetch(API_URL(type), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            localStorage.setItem('accessToken', data.response.accessToken);
            localStorage.setItem('username', data.response.username);
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setId(data.response.id));
            dispatch(user.actions.setUserEmail(data.response.email));
            dispatch(user.actions.setError(null));
          });
          setActiveError(false);
        } else {
          batch(() => {
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setId(null));
            dispatch(user.actions.setUserEmail(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setActiveError(true);
        }
      })
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    fetchData(mode, loginOptions);
  };

  return (
    <PageWrapper>
      <Intro>
        <h2> Please register or sign in </h2>
      </Intro>
      <Selection>
        <div>
          <label htmlFor="register">Register
            <input
              type="radio"
              id="register"
              checked={mode === 'register'}
              onChange={() => {
                setActiveError(false)
                setMode('register')
              }} />
          </label>
        </div>
        <div>
          <label htmlFor="login">Login
            <input
              type="radio"
              id="login"
              checked={mode === 'login'}
              onChange={() => {
                setActiveError(false)
                setMode('login')
              }} />
          </label>
        </div>
      </Selection>
      <StyledForm onSubmit={onFormSubmit}>
        <label htmlFor="username">Username
          <input
            required
            type="text"
            id="username"
            placeholder={mode === 'login' ? 'Enter your username' : 'Choose your username'}
            value={username}
            onChange={(e) => {
              setActiveError(false)
              setUsername(e.target.value)
            }} />
        </label>
        <label htmlFor="password">Password
          <input
            required
            type="password"
            id="password"
            placeholder={mode === 'login' ? 'Enter your password' : 'Choose your password'}
            value={password}
            onChange={(e) => {
              setActiveError(false)
              setPassword(e.target.value)
            }} />
        </label>
        <label htmlFor="email">Email
          <input
            required
            type="email"
            id="email"
            placeholder={mode === 'login' ? 'Enter your email' : 'Add your email-adress'}
            value={email}
            onChange={(e) => {
              setActiveError(false)
              setEmail(e.target.value)
            }} />
        </label>
        <StyledButton type="submit">{mode === 'login' ? 'Log In' : 'Submit'}</StyledButton>
      </StyledForm>
      <ErrorDisplay>{activeError ? error : ''}</ErrorDisplay>
      <VipBtn fetchData={fetchData} />
    </PageWrapper>
  )
}

export default Login;

const PageWrapper = styled.section`
  color: white;
  font-weight: bold;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color:  #0093E9;
  background-image: linear-gradient(160deg, #80D0C7 0%, #0093E9 100%);

  @media ${Devices.tablet} {
    display: flex;
  }
  @media ${Devices.laptop} {
    display: flex;
  }
  @media ${Devices.desktop} {
    display: flex;
  }
`

const Intro = styled.div`
  width: 15rem;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  align-self: center;
`

const Selection = styled.div`
  width: 16rem;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  input {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-size: 1.2rem;

  label {
    color: white;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0.6rem;
  }
  label + button {
    margin-top: 0.6rem;
  }
  input {
    margin-left: 0.6rem;
    border-radius: 0.3rem;
    border: none;
    padding: 0.5rem;
  }
`

const StyledButton = styled.button`
  font-size: 1.2rem;
  color: white;
  background-color: green;
  opacity: .60;
  border: 2px solid white;
  padding: 7px 10px;
  border-radius: 10px;
  &:hover {
    color: #b84545;
    background-color: white;
    transition: 0.5s background-color ease-in-out;
    cursor: pointer;
  }
  &:active {
    transform: translateY(3px);
  }
`

const ErrorDisplay = styled.p`
  margin-top: 2rem;
`
