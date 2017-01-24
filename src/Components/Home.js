import React, { Component } from 'react';
import styled from 'styled-components';
import Chart from './Chart2';
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
  z-index: 999;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -9;
`;

const Stats = styled.div`
  float: right;
  text-align: right;
  font-size: 4em;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: [],
      selectedKeyword: '',
      docs: [],
      freq: 0,
    };
    this.selectKeyword = this.selectKeyword.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/documents?year=all&searchterm=&keyword=').then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({ docs: json, keywords }
      // , () => { this.selectKeyword(); setInterval(this.selectKeyword, 10000); }
      );
    });
  }
    // fetch('http://localhost:4000/api/documents?year=all&searchterm=&keyword=')
    //   .then((response) => {
    //     return response.json();
    //   }).then((json) => {
    //     console.log(json)
    //   }).catch((err) => {
    //   // Error :(
    //   });
    // this.setState({
    //   keywords,
    //   docs
    // }, () => setInterval(this.selectKeyword, 1000));

  selectKeyword() {
    const rando = Math.floor(Math.random() * this.state.keywords.length + 1);
    const selected = this.state.keywords[rando].english;
    console.log(selected);
    const freq = this.state.docs.filter((doc) => doc.keywords.includes(selected)).length;
    console.log(freq);
    // const freq = this.state.docs.reduce((total, doc) => { if (doc.keywords.includes(selected)) { total += 1; } });
    // console.log(freq)
    this.setState({
      selectedKeyword: selected,
      // freq,
    });
  }

  render() {
    return (
      <div>
        <Wrapper>
          <img src={logo} />
          <Title>MATRICULES</Title>
          <Stats>
            <h1>1700 documents</h1>
            <h1>148 keywords</h1>
            <h1>305 artists</h1>
          </Stats>
        </Wrapper>
      </div>
    );
  }
}

export default Home;
