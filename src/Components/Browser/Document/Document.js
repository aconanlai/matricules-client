import React, { Component } from 'react';
import styled from 'styled-components';

const Doc = styled.div`
  display: block;
  height: 100%;
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
    console.log('mounting');
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
    return (
      <Doc>
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
      </Doc>
    );
  }
}

export default Document;
