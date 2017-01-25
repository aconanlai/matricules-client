import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import floppydisk from '../Assets/floppy.png';

const spinX = keyframes`
  0%   {transform: rotate(0deg);}  
  100% {transform: rotate(360deg);}  
`;

const Floppy = styled.img`
  position: absolute;
  height: 2000px;
  left: -500px;
  top: -200px;
  -webkit-animation: ${spinX} 300s infinite;
  animation: ${spinX} 300s infinite;
`;

class BackgroundImg extends Component {

  render() {
    return (
      <div>
        <Floppy src={floppydisk} />
      </div>
    );
  }
}

export default BackgroundImg;
