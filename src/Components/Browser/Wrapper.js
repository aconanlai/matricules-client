import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: block;
  background: white;
  border: 5px solid black;
  height: 100%;
  width: 80%;
  max-width: 1000px;
  margin: 100px auto;
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
