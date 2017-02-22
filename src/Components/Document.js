import React, { Component } from 'react';
import styled, { keyframes, injectGlobal } from 'styled-components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import floppydisk from '../Assets/floppy.png';

injectGlobal`
  .example-leave {
    transform: translate(0%);
  }

  .example-leave.example-leave-active {
    transform: translate(-100%);
    transition: transform 300ms ease-in;
  }
`;

const Doc = styled.div`
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

const Wrapper = styled.div`
  position: relative;
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

const Section = styled.div`
  display: block;
  padding: 15px;
  font-size: 30px;
`;

const Label = styled.span`
  margin-right: 10px;
  color: #027792;
`;

const Content = styled.span`
  color: black;
`;

const Keywords = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  width: 100%;
  position: absolute;
  bottom: -50px;
  right: -50px;
  font-size: 40px;
  line-height: 30px;
  text-shadow: -3px -3px 0px #1eb8d9, -3px -3px 0px #707070;
`;

const Keyword = styled.span`
  margin: 10px;
  padding: 2px;
  transition: .2s;

  &:hover {
    background: black;
    color: yellow;
    text-decoration: underline;
    cursor: cell;
  }
`;

class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      accession_number: '',
      categorie: '',
      date: '',
      description: '',
      descriptionFrench: '',
      keywords: [],
      images: [],
      links: [],
      medium: '',
      notes: '',
      physical_description: '',
      sujet: '',
      sujetFrench: '',
      support: '',
      title: '',
      audio: [],
      video: [],
      other: [],
    };
    this.handleGoAway = this.handleGoAway.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    fetch('http://matricules.nfshost.com/api/document/2007FOR70411O').then((response) => {
      return response.json();
    }).then((_data) => this.setState({
      accession_number: _data.accession_number,
      categorie: _data.categorie,
      date: _data.date,
      description: _data.description,
      descriptionFrench: _data.description_fr,
      keywords: _data.keywords,
      images: _data.images,
      links: _data.links,
      medium: _data.medium,
      notes: _data.notes,
      physical_description: _data.physical_description,
      sujet: _data.sujet,
      sujetFrench: _data.sujet_fr,
      support: _data.support,
      title: _data.title,
      videos: _data.videos,
      audio: _data.audio,
      other: _data.other,
    }));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleGoAway() {
    this.setState({ display: false });
  }

  render() {
    const content = (this.state.display === true) ? <Doc>
      <Background>
        <Floppy src={floppydisk} />
      </Background>
      <Wrapper className={"hua"}>
        <Title>
          {this.state.accession_number}
        </Title>
        <Section>
          <Label>
            Titre:
          </Label>
          <Content>
            {this.state.title}
          </Content>
        </Section>
        <Section>
          <Label>
            Categorie:
          </Label>
          <Content>
            {this.state.categorie}
          </Content>
        </Section>
        <Section>
          <Label>
            Date:
          </Label>
          <Content>
            {this.state.date}
          </Content>
        </Section>
        <Section>
          <Label>
            Description:
          </Label>
          <Content>
            {this.state.description}
          </Content>
        </Section>
        <Section>
          <Label>
            Support:
          </Label>
          <Content>
            {this.state.support}
          </Content>
        </Section>
        <Keywords>
          {this.state.keywords.map((keyword, i) => { return <Keyword key={i}>{keyword}</Keyword> })}
        </Keywords>
      </Wrapper>
    </Doc> : false;
    return (
      <div>
        <button onClick={this.handleGoAway}>go away</button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {content}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Document;
