import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: block;
  background: white;
  border: 5px solid black;
  width: 80%;
  max-width: 1000px;
  box-shadow: 5px 5px 0px #eee, 7px 7px 0px #707070;
  z-index: 999;
`;

class Document extends Component {
  render() {
    return (
      <Wrapper className="contentsquare" >
        {this.props.children}
      </Wrapper>
    );
  }
}

export default Document;
