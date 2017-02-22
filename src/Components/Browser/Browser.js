import React, { Component } from 'react';
import styled, { keyframes, injectGlobal } from 'styled-components';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import floppydisk from '../../Assets/floppy.png';
import Wrapper from './Wrapper';
import Doc from './Document/Document';
import Keyword from './Keyword/Keyword';

injectGlobal`

.contentsquare {
  min-height: 80vh;
}

.doc-height {
  height: 80vh;
}

.doc-enter, .doc-leave {
  -webkit-transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
  transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
}

.doc-enter {
  transform: translateY(150%);
}

.doc-enter.doc-enter-active {
  transform: translateY(0%);
}

.doc-leave {
  transform: translateY(0%);
}

.doc-leave.doc-leave-active {
  transform: translateY(-150%);
}

.keyword-height {
  height: 80vh;
}

.keyword-enter, .keyword-leave {
  -webkit-transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
  transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
}

.keyword-enter {
  transform: translate(150%);
}

.keyword-enter.keyword-enter-active {
  transform: translate(0%);
}

.keyword-leave {
  transform: translate(0%);
}

.keyword-leave.keyword-leave-active {
  transform: translate(-150%);
}
`;

const Browser = styled.div`
  overflow: hidden;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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


class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContent: 'doc'
    }
    this.handleGoAway = this.handleGoAway.bind(this);
  }

  handleGoAway() {
    const newcontent = (this.state.selectedContent === 'doc') ? 'keyword' : 'doc';
    this.setState({ selectedContent: newcontent });
  }

  render() {
    let content;
    switch (this.state.selectedContent) {
      case 'doc':
        content = <Wrapper key="doc"><Doc /></Wrapper>;
        break;
      case 'keyword':
        content = <Wrapper key="keyword"><Keyword /></Wrapper>;
        break;
      default:
        content = <Wrapper key="doc"><Doc /></Wrapper>;
    }
    return (
      <Browser>
        <button onClick={this.handleGoAway}>go away</button>
        <Background>
          <Floppy src={floppydisk} />
        </Background>
        <ReactCSSTransitionReplace
          transitionName={this.state.selectedContent}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {content}
        </ReactCSSTransitionReplace>
      </Browser>
    );
  }
}

export default Document;
