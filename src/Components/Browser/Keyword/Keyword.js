import React, { Component } from 'react';
import styled from 'styled-components';
import DocumentsList from '../DocumentsList/DocumentsList';

const Title = styled.span`
  display: block;
  position: absolute;
  bottom: -50px;
  right: -50px;
  font-size: 80px;
  text-shadow: 3px 3px 0px #70D1E7, 3px 3px 0px #707070;
`;

const Wrapper = styled.div`
  overflow: auto;
  height: 100%;
`;

class Keyword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '2016',
      keyword: '',
      loading: true,
      doclist: [],
      searchterm: '',
    };
  }

  componentDidMount() {
    this.mounted = true;
    console.log('mounting');
    fetch('http://matricules.nfshost.com/api/documents?year=all&keyword=radio&searchterm=').then((response) => {
      return response.json();
    }).then((json) => {
      // only set state if component is mounted
      if (this.mounted === true) {
        this.setState({ doclist: json, loading: false, });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let doclist;
    if (this.state.loading === true) {
      doclist = 'loading';
    } else if (this.state.loading === false && this.state.doclist.length === 0) {
      doclist = 'no matching docs';
    } else {
      doclist = <DocumentsList doclist={this.state.doclist} />;
    }
    return (
      <Wrapper>
        {doclist}
        <Title>
          Radio
        </Title>
      </Wrapper>
    );
  }
}

export default Keyword;
