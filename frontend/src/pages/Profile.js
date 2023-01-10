import React from 'react';
import Statistics from 'components/userComponents/Statistics';
import styled from 'styled-components/macro';
import { OuterWrapper } from 'Styles/globalStyles';
import Challenge from 'components/userComponents/Challenge';

const Profile = () => {
  return (
    <OuterWrapper>
      <Challenge />
      <Title>All profile info</Title>
      <Statistics />
    </OuterWrapper>
  )
}

export default Profile;

const Title = styled.h1`
  font-size: 2rem;
  color: #555;
  margin: 2rem;
`