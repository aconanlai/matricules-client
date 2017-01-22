import React, { Component } from 'react';
import styled from 'styled-components';
import Chart from './Chart';
import keywords from './keywords.json';
import logo from './logo.png';

const Title = styled.h1`
  font-size: 1.5em;
  color: #00b9db;

  &.dog {
    color: red;
  }
`;

const Wrapper = styled.section`
  padding: 4em;
  text-align: center;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: [],
      selectedKeyword: '',
    };
    this.selectKeyword = this.selectKeyword.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/documents?year=all&searchterm=&keyword=', {
      method: 'get'
    }).then(function(response) {
      console.log(response)
    }).catch(function(err) {
      // Error :(
    });
    // this.setState({
    //   keywords,
    //   docs
    // }, () => setInterval(this.selectKeyword, 1000));
  }

  selectKeyword() {
    const rando = Math.floor(Math.random() * this.state.keywords.length + 1);
    this.setState({
      selectedKeyword: keywords[rando].english
    })
  }

  render() {
    return (
      <Wrapper>
        <img src={logo} />
        <Title className="dog">MATRICULES</Title>
        <Chart />
      </Wrapper>
    );
  }
}

export default Home;
