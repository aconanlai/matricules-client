import React, { Component } from 'react';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';

require('smoothscroll-polyfill').polyfill();

const YearDisplay = styled.span`
  position: fixed;
  text-align: center;
  top: 0;
  font-size: 80px;
`;

const Year2016 = styled.div`
  width: 100%;
  height: 150vh;
  padding-top: 75vh;
  background: yellow;
`;

const Year2015 = styled.div`
  width: 100%;
  height: 150vh;
  padding-top: 75vh;
  background: pink;
`;

const Year2014 = styled.div`
  width: 100%;
  height: 150vh;
  padding-top: 75vh;
  background: coral;
`;

const Year2013 = styled.div`
  width: 100%;
  height: 150vh;
  padding-top: 75vh;
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
      year: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleWaypointLeave = this.handleWaypointLeave.bind(this);
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
    this.setState({ year });
  }

  handleWaypointEnter(year) {
    this.setState({ year });
  }

  handleWaypointLeave(year) {
    console.log('leaving' + year);
  }

  render() {
    return (
      <div>
        <Select value={this.state.value} onChange={this.handleChange}>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
        </Select>
        <YearDisplay>{this.state.year}</YearDisplay>
        <Year2016>
          <Waypoint onEnter={() => this.handleWaypointEnter('2016')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2016">
              2016
          </div>
          </Waypoint>
        </Year2016>
        <Year2015>
          <Waypoint onEnter={() => this.handleWaypointEnter('2015')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2015">
            2015
            </div>
          </Waypoint>
        </Year2015>
        <Year2014>
          <Waypoint onEnter={() => this.handleWaypointEnter('2014')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2014">
              2014
            </div>
          </Waypoint>
        </Year2014>
        <Year2013>
          <Waypoint onEnter={() => this.handleWaypointEnter('2013')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2013">
              2013
            </div>
          </Waypoint>
        </Year2013>
      </div>
    );
  }
}

export default Home;
