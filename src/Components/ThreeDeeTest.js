import React, { Component } from 'react';
import ThreeDee from './ThreeDee/ThreeDee';

class ThreeDeeTest extends Component {
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
      artistsArray: [],
    };
  }

  componentDidMount() {
    // fetch('http://matricules.nfshost.com/api/documents?year=all&keyword=&searchterm=').then((response) => {
    //   return response.json();
    // }).then((json) => {
    //   this.setState({ docs: json, keywords }
    //   , () => { this.selectRandomDoc(); this.selectHistoryDoc(); this.selectKeyword(); this.constructArtistsArray();
    //     // setInterval(this.selectKeyword, 5500);
    //   },
    //   );
    // });
  }

  render() {
    return (
      <ThreeDee />
    );
  }
}

export default ThreeDeeTest;
