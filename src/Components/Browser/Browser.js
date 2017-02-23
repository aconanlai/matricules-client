import React, { Component } from 'react';
import styled, { keyframes, injectGlobal } from 'styled-components';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import floppydisk from '../../Assets/floppy.png';
import Wrapper from './Wrapper';
import Home from './Home/Home';
import Doc from './Document/Document';
import Keyword from './Keyword/Keyword';

injectGlobal`
.contentsquare {
  height: 80vh;
}

.doc-height {
  transition: height .5s ease-in-out;
}

.doc-enter, .doc-leave {
  -webkit-transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
  transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
}

.doc-enter {
  transform: translate(-50%, -150%);
}

.doc-enter.doc-enter-active {
  transform: translate(-50%, -50%);
}

.doc-leave {
  transform: translate(-50%, -50%);
}

.doc-leave.doc-leave-active {
  transform: translate(150%, -50%);
}

.keyword-height {
  transition: height .5s ease-in-out;
}

.keyword-enter, .keyword-leave {
  -webkit-transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
  transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
}

.keyword-enter {
  transform: translate(-50%, -150%);
}

.keyword-enter.keyword-enter-active {
  transform: translate(-50%, -50%);
}

.keyword-leave {
  transform: translate(-50%, -50%);
}

.keyword-leave.keyword-leave-active {
  transform: translate(150%, -50%);
}

.home-height {
  transition: height .5s ease-in-out;
}

.home-enter, .home-leave {
  -webkit-transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
  transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
}

.home-enter {
  transform: translate(-150%, -50%);
}

.home-enter.home-enter-active {
  transform: translate(-50%, -50%);
}

.home-leave {
  background: yellow;
  transform: translate(-50%, -50%);
}

.home-leave.home-leave-active {
  transform: translate(-50%, -150%);
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
      selectedContent: 'home',
    };
    this.handleGoAway = this.handleGoAway.bind(this);
  }

  handleGoAway() {
    const newcontent = (this.state.selectedContent === 'home') ? 'doc' : 'home';
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
      case 'home':
        content = <Wrapper key="home"><Home /></Wrapper>;
        break;
      default:
        content = <Wrapper key="home"><Home /></Wrapper>;
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
          overflowHidden={false}
        >
          {content}
        </ReactCSSTransitionReplace>
      </Browser>
    );
  }
}

export default Document;
