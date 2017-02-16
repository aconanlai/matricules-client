import React, { Component } from 'react';
import styled from 'styled-components';
require('smoothscroll-polyfill').polyfill();

const Year2016 = styled.div`
  width: 100%;
  height: 200vh;
  background: yellow;
`;

const Year2015 = styled.div`
  width: 100%;
  height: 200vh;
  background: pink;
`;

const Year2014 = styled.div`
  width: 100%;
  height: 200vh;
  background: coral;
`;

const Year2013 = styled.div`
  width: 100%;
  height: 200vh;
  background: limegreen;
`;

const Select = styled.select`
    position: fixed;
    top: 0;
    right: 0;    
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    // console.log(this.refs)
    const year = Number(event.target.value);
    const id = `#year${year}`;
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
    this.setState({ value: year });
  }

  render() {
    return (
      <div>
        <Select value={this.state.value} onChange={this.handleChange}>
            <option value="2016">2016</option>
            <option value="2015">2016</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
          </Select>
        <Year2016>
          <div id="year2016">
            2016
          </div>
        </Year2016>
        <Year2015>
          <div id="year2015">
            2015
            </div>
        </Year2015>
        <Year2014>
          <div id="year2014">
            2014
            </div>
        </Year2014>
        <Year2013>
          <div id="year2013">
            2013
            </div>
        </Year2013>
      </div>
    );
  }
}

export default Home;
