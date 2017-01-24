import React, { Component } from 'react';
import styled from 'styled-components';
import Chart from './Chart';
import BackgroundImg from './BackgroundImg';
import keywords from './keywords.json';
import logo from './logo.png';
import banner from './banner.jpg';

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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: [],
      selectedKeyword: '',
      docs: [],
      freq: 0,
      hovered: '',
      selectedNav: '',
      hideNav: false,
    };
    this.selectKeyword = this.selectKeyword.bind(this);
    this.navToViz = this.navToViz.bind(this);
    this.handleNavMouseOver = this.handleNavMouseOver.bind(this);
    this.handleNavMouseOut = this.handleNavMouseOut.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/documents?year=all&searchterm=&keyword=').then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({ docs: json, keywords }
      , () => { this.selectKeyword(); setInterval(this.selectKeyword, 2500); }
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
      default:
        background = <BackgroundImg />;
    }

    return (
      <div>
        <Background>
          {background}
        </Background>
        <Wrapper className={(this.state.hideNav === true) ? 'hide' : 'nah'}>
          <img src={logo} />
          <Title>MATRICULES</Title>
          <Stats>
            <p>
              Matricules is an online digital archive comprised of a dynamic database housing all of the images, artists and events that make up&nbsp;
              <Link 
                onClick={this.navToViz}
                className={(this.state.hovered === 'studio') ? 'hovered' : 'none'}
                onMouseOver={() => this.handleNavMouseOver('studio')} onMouseOut={this.handleNavMouseOut}
              >Studio XX</Link>'s remarkable history.
             </p>
             <p>
              Explore&nbsp;
              <Link onMouseOver={() => this.setState({ hovered: 'years' })} onMouseOut={() => this.setState({ hovered: '' })}>20 years</Link> of media, including&nbsp;
              <Link onMouseOver={() => this.setState({ hovered: 'docs' })} onMouseOut={() => this.setState({ hovered: '' })}>1705 documents</Link>,&nbsp;
              <Link
                onClick={this.navToViz}
                className={(this.state.hovered === 'keywords') ? 'hovered' : 'none'}
                onMouseOver={() => this.handleNavMouseOver('keywords')} onMouseOut={this.handleNavMouseOut}
              >123 keywords</Link>, and&nbsp;
              <Link onMouseOver={() => this.setState({ hovered: 'artists' })} onMouseOut={() => this.setState({ hovered: '' })}>378 artists</Link>.
             </p>
          </Stats>
        </Wrapper>
      </div>
    );
  }
}

export default Home;
