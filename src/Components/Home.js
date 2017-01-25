import React, { Component } from 'react';
import styled from 'styled-components';
import Chart from './Chart';
import ThreeDee from './ThreeDee/ThreeDee';
import BackgroundImg from './BackgroundImg';
import TotalRandomDoc from './HomePageDocs/TotalRandomDoc';
import HistoryDoc from './HomePageDocs/HistoryDoc';
import keywords from './keywords.json';
import logo from '../Assets/logo.png';
import banner from '../Assets/banner.jpg';

const Title = styled.h1`
  font-size: 1.5em;
  color: #00b9db;

  &.dog {
    color: red;
  }
`;

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4em;
  text-align: center;
  z-index: 999;
  transition: opacity 1s;

  &.hide {
    pointer-events: none;
    opacity: 0;
    z-index: -999;
  }
`;

const Lander = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
`;

const About = styled.div`
  width: 100%;
  height: 100vh;
  background: pink;
`;

const RandomDocs = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #013A6B;
  background-image: -webkit-linear-gradient(30deg, #013A6B 50%, #004E95 50%);
  overflow: hidden;
`;

const Background = styled.div`
  background: #f6f7f7;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const Stats = styled.div`
  text-align: right;
  font-size: 3em;
`;

const Link = styled.span`
  text-decoration: underline;
  color: #00b9db;
  cursor: crosshair;

  &.hovered {
    background: black;
    transition: 0.25s;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('${banner}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

const BackButton = styled.div`
  z-index: 9999;
  font-size: 2em;
  position: fixed;
  top: 0;
  right: 0;
  padding: 5px;
`;

const TotalRandomDocWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 50%;
  bottom: 0px;
  left: 0px;
`;

const HistoryDocWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 50%;
  top: 0px;
  right: 0px;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: [],
      selectedKeyword: '',
      keywordAnimating: false,
      docs: [],
      freq: 0,
      hovered: '',
      selectedNav: '',
      hideNav: false,
      randomDoc: {},
      historyDoc: {},
    };
    this.selectKeyword = this.selectKeyword.bind(this);
    this.navToViz = this.navToViz.bind(this);
    this.handleNavMouseOver = this.handleNavMouseOver.bind(this);
    this.handleNavMouseOut = this.handleNavMouseOut.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.selectRandomDoc = this.selectRandomDoc.bind(this);
    this.selectHistoryDoc = this.selectHistoryDoc.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/documents?year=all&searchterm=&keyword=').then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({ docs: json, keywords }
      , () => { this.selectRandomDoc(); this.selectHistoryDoc(); this.selectKeyword();
        // setInterval(this.selectKeyword, 5500);
      },
      );
    });
  }

  selectRandomDoc() {
    const rando = Math.floor((Math.random() * this.state.docs.length) + 1);
    const selected = this.state.docs[rando];
    this.setState({
      randomDoc: selected,
    });
  }

  selectHistoryDoc() {
    const date = new Date();
    let month = date.getUTCMonth();
    month = (month + 1).toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    const eligibledocs = this.state.docs.filter(doc => {
      return doc.date.slice(5, 7) === month;
    });

    const rando = Math.floor((Math.random() * eligibledocs.length) + 1);
    const selected = eligibledocs[rando];
    this.setState({
      historyDoc: selected,
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
    const rando = Math.floor((Math.random() * this.state.keywords.length) + 1);
    const selected = this.state.keywords[rando].french;
    const freq = this.state.docs.filter((doc) => doc.keywords.includes(selected)).length;
    this.setState({
      selectedKeyword: selected,
      freq,
    });
  }

  navToViz() {
    this.setState({
      hideNav: true,
    });
  }

  handleNavMouseOver(component) {
    if (this.state.hideNav === false) {
      this.setState({
        hovered: component,
      });
    }
  }

  handleNavMouseOut(component) {
    if (this.state.hideNav === false) {
      this.setState({
        hovered: '',
      });
    }
  }

  handleBack() {
    this.setState({
      hideNav: false,
      hovered: '',
    });
  }

  render() {
    let background;
    switch (this.state.hovered) {
      case '':
        background = <BackgroundImg />;
        break;
      case 'studio':
        background = <Banner />;
        break;
      case 'keywords':
        background = <Chart selectedKeyword={this.state.selectedKeyword} freq={this.state.freq} keywords={this.state.keywords} hideNav={this.state.hideNav} />;
        break;
      case 'docs':
        background = <ThreeDee />;
        break;
      default:
        background = <BackgroundImg />;
    }

    const backbutton = (this.state.hideNav === true) ? <BackButton onClick={this.handleBack}>BACK</BackButton> : null;

    return (
      <div>
        {backbutton}
        <Background>
          {background}
        </Background>
        <Lander>
          <Wrapper className={(this.state.hideNav === true) ? 'hide' : 'nah'}>
            <img src={logo} />
            <Title>MATRICULES</Title>
            <Stats>
              <p>
                Matricules is an online digital archive comprised of a dynamic database housing all of the images, artists and events that make up&nbsp;
                <Link 
                  onClick={this.navToViz}
                  className={(this.state.hovered === 'studio') ? 'hovered' : 'none'}
                  onMouseOver={() => this.handleNavMouseOver('studio')}
                  onMouseOut={this.handleNavMouseOut}
                >Studio XX</Link>'s remarkable history.
              </p>
              <p>
                Explore&nbsp;
                <Link
                  className={(this.state.hovered === 'years') ? 'hovered' : 'none'}
                  onClick={this.navToViz}
                  onMouseOver={() => this.handleNavMouseOver('years')}
                  onMouseOut={this.handleNavMouseOut}
                >20 years</Link> of media, including&nbsp;
                <Link
                  className={(this.state.hovered === 'docs') ? 'hovered' : 'none'}
                  onClick={this.navToViz}
                  onMouseOver={() => this.handleNavMouseOver('docs')}
                  onMouseOut={this.handleNavMouseOut}
                >1705 documents</Link>,&nbsp;
                <Link
                  onClick={this.navToViz}
                  className={(this.state.hovered === 'keywords') ? 'hovered' : 'none'}
                  onMouseOver={() => this.handleNavMouseOver('keywords')}
                  onMouseOut={this.handleNavMouseOut}
                >123 keywords</Link>, and&nbsp;
                <Link
                  onClick={this.navToViz}
                  className={(this.state.hovered === 'artists') ? 'hovered' : 'none'}
                  onMouseOver={() => this.handleNavMouseOver('artists')}
                  onMouseOut={this.handleNavMouseOut}
                >378 artists</Link>.
              </p>
            </Stats>
          </Wrapper>
        </Lander>
        <About>
         henlo
        </About>
        <RandomDocs>
          <TotalRandomDocWrapper>
            <TotalRandomDoc doc={this.state.randomDoc} />
          </TotalRandomDocWrapper>
          <HistoryDocWrapper>
            <HistoryDoc doc={this.state.historyDoc} />
          </HistoryDocWrapper>
        </RandomDocs>
      </div>
    );
  }
}

export default Home;
