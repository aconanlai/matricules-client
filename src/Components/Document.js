import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import floppydisk from '../Assets/floppy.png';

const Background = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  z-index: -9;
`;

const spinX = keyframes`
  0%   {transform: rotate(0deg);}  
  100% {transform: rotate(360deg);}  
`;

const Floppy = styled.img`
  z-index: -9;
  position: absolute;
  height: 1000px;
  left: 100px;
  top: 200px;
  -webkit-animation: ${spinX} 300s infinite;
  animation: ${spinX} 300s infinite;
`;

const Wrapper = styled.div`
  background: white;
  border: 5px solid black;
  width: 80%;
  max-width: 1000px;
  min-height: 80vh;
  margin: 100px auto;
  box-shadow: 5px 5px 0px #eee, 7px 7px 0px #707070;
  z-index: 999;
`;

const Title = styled.span`
  display: block;
  position: relative;
  top: -50px;
  left: -50px;
  font-size: 80px;
  text-shadow: 3px 3px 0px #1eb8d9, 3px 3px 0px #707070;
`;

class Document extends Component {

render() {
  return (
    <div>
      <Background>
        <Floppy src={floppydisk} />
      </Background>
      <Wrapper>
        <Title>
          2006FBR314124
        </Title>
      </Wrapper>
    </div>
  )
}
}

export default Document;
