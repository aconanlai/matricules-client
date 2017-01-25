import React, { Component } from 'react';
import styled from 'styled-components';
import floppydisk from '../../Assets/floppy.png';
import camera from '../../Assets/camera.png';
import video from '../../Assets/video.png';
import doc from '../../Assets/doc.png';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 1.5em;
  z-index: 9999;
  margin: 30px;
  color: #a3c2c2;
`;

const Background = styled.img`
  position: absolute;
  bottom: 0;
  width: 30vw;
  transform: rotate(37deg);
  opacity: 0.2;
`;

const Random = styled.div`
  font-size: 2em;
  text-decoration: underline;
  padding: 15px;
`;

const Title = styled.div`
  font-size: 2em;
  text-decoration: underline;
  padding: 15px;
`;

const Subject = styled.div`
  padding: 15px;
`;

const Description = styled.div`
  padding: 15px;
`;

const Medium = styled.div`
  padding: 15px;
`;

const Date = styled.div`
  padding: 15px;
`;

const Keywords = styled.div`
  padding: 15px;
  width: 100%;
  white-space: normal;
  word-wrap: break-word;
`;

const Keyword = styled.span`
  color: yellow;
  margin: 5px;
`;

class TotalRandomDoc extends Component {
  render() {
    const description = (this.props.doc.description_fr !== '') ? this.props.doc.description_fr : this.props.doc.description;
    const date = (this.props.doc.date) ? this.props.doc.date.slice(0,9) : null;
    const keywords = (this.props.doc.keywords) ? (this.props.doc.keywords.map(keyword => {
              return (
                <Keyword>{keyword}</Keyword>
              )
            })) : null;
    let bg;
    switch (this.props.doc.medium) {
      case 'Electronic Print':
        bg = doc;
        break;
      case 'Audio/visual':
        bg = video;
        break;
      case 'Audio':
        bg = floppydisk;
        break;
      case 'Electronic File':
        bg = camera;
        break;
      default:
        bg = doc;
    }
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Wrapper>
          <Random>Random Document:</Random>
          <Title>{this.props.doc.title}</Title>
          <Subject>{this.props.doc.sujet_fr}</Subject>
          <Description>{description}</Description>
          <Medium>{this.props.doc.medium}</Medium>
          <Keywords>Keywords:
            {keywords}
          </Keywords>
          <Date>{date}</Date>
        </Wrapper>
        <Background src={bg} />
      </div>
    );
  }
}

export default TotalRandomDoc;
