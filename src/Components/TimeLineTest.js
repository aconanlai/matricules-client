import React, { Component } from 'react';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';
import * as d3 from 'd3';

require('smoothscroll-polyfill').polyfill();

const YearDisplay = styled.span`
  position: fixed;
  text-align: center;
  top: 0;
  font-size: 80px;
`;

const Year2016 = styled.div`
  width: 100%;
  height: 250vh;
  padding-top: 125vh;
  background: yellow;
`;

const Year2015 = styled.div`
  width: 100%;
  height: 250vh;
  padding-top: 125vh;
  background: pink;
`;

const Year2014 = styled.div`
  width: 100%;
  height: 250vh;
  padding-top: 125vh;
  background: coral;
`;

const Year2013 = styled.div`
  width: 100%;
  height: 250vh;
  padding-top: 125vh;
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
      mounted: false,
      chart: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleWaypointLeave = this.handleWaypointLeave.bind(this);
    this.backToCenter = this.backToCenter.bind(this);
    this.placeBlobs = this.placeBlobs.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
    this.centerx = window.innerWidth / 2;
    this.centery = window.innerHeight / 2;
    this.coverCircleRadius = 60;
    this.dataum = require('./dataum.json');
    this.rScale =
      d3.scale.sqrt()
        .range([0, 20])
        .domain([0, d3.max(this.dataum, function (d) { return d.occurance; })]);
  }

  componentDidMount() {

    ///////////////////////////////////////////////////////////////////////////
    //////////////////// Set up and initiate svg containers ///////////////////
    ///////////////////////////////////////////////////////////////////////////	

    const margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    const width = window.innerWidth - margin.left - margin.right;
    const height = window.innerHeight - margin.top - margin.bottom;

    //SVG container
    const svg = d3.select('#renderedD3')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + (margin.left) + ',' + (margin.top) + ')');

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////// Create filter ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////	

    //SVG filter for the gooey effect
    //Code taken from http://tympanus.net/codrops/2015/03/10/creative-gooey-effects/
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'gooeyCodeFilter');
    filter.append('feGaussianBlur')
      .attr('in', 'SourceGraphic')
      .attr('stdDeviation', '10')
      //to fix safari: http://stackoverflow.com/questions/24295043/svg-gaussian-blur-in-safari-unexpectedly-lightens-image
      .attr('color-interpolation-filters', 'sRGB')
      .attr('result', 'blur');
    filter.append('feColorMatrix')
      .attr('class', 'blurValues')
      .attr('in', 'blur')
      .attr('mode', 'matrix')
      .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5')
      .attr('result', 'gooey');
    filter.append('feBlend')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'gooey')
      .attr('operator', 'atop');

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////////// Blobs ///////////////////////////////////
    /////////////////////////////////////////////////////////////////////////// 

    const component = this;
    const randocolor = component.getRandomColor();
    //Put the city locations into the data itself
    component.dataum.forEach(function (d, i) {
      d.radius = component.rScale(d.occurance);
      d.x = Math.round(Math.random()) * 2000 - 1000;
      d.y = Math.round(Math.random()) * 2000 - 1000;
    });

    // Wrapper
    const blobWrapper = svg.append('g')
      .attr('class', 'blobWrapper')
      .style('filter', 'url(#gooeyCodeFilter)')
      .attr('fill', randocolor);

    //Place the blobs
    const blobs = blobWrapper.selectAll('.blobs')
      .data(component.dataum)
      .enter().append('circle')
      .attr('class', 'blobs')
      .attr('r', function (d) { return d.radius; })
      .attr('cx', component.centerx)
      .attr('cy', component.centery)
      .style('opacity', 1)
      .attr('fill', randocolor);


    //Circle over all others
    blobWrapper.append('circle')
      .attr('class', 'blobCover')
      .attr('r', component.coverCircleRadius)
      .attr('cx', component.centerx)
      .attr('cy', component.centery);
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
    this.placeBlobs();
    console.log('entering' + year);
    this.setState({ year });
  }

  handleWaypointLeave(year) {
    this.backToCenter();
    console.log('leaving' + year);
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  placeBlobs() {
    const component = this;
    const randocolor = component.getRandomColor();
    //Make the cover circle shrink
    d3.selectAll('.blobCover')
      .attr('fill', randocolor)
      .transition().duration(2000)
      .attr('r', 0);

    // place blobs
    d3.selectAll('.blobs')
      .attr('fill', randocolor)
      .transition('move').duration(2000)
      // .delay(function(d,i) { return i*20; })
      .attr('r', function (d) {
        return d.radius = component.rScale(d.occurance);
      })
      .attr('cx', function (d) {
        return d.x = Math.floor((Math.random() * window.innerWidth) + 1);
      })
      .attr('cy', function (d) {
        return d.y = Math.floor((Math.random() * window.innerHeight) + 1);
      });


    //'Remove' gooey filter during the transition
    //So at the end they do not appear to melt together anymore
    d3.selectAll('.blurValues')
      .transition().duration(4000)
      .attrTween('values', function () {
        return d3.interpolateString('1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5',
          '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 6 -5');
      });
  }

  backToCenter() {
    const component = this;

    //Make the cover cirlce to its true size again
    d3.selectAll('.blobCover')
      .transition().duration(1500).delay(100)
      .attr('r', component.coverCircleRadius);

    //Move the blobs to the center
    d3.selectAll('.blobs')
      .transition()
      .duration(1500).delay(function (d, i) { return i * 5; })
      .attr('cx', component.centerx)
      .attr('cy', component.centery)
      .style('opacity', 1);

    d3.selectAll('.blurValues')
      .transition().duration(1000).delay(1000)
      .attrTween('values', function () {
        return d3.interpolateString('1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -6',
          '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5');
      });
  }

  render() {
    return (
      <div>
        <div style={{ position: 'fixed', top: 0, left: 0 }} id='renderedD3'>
        </div>
        <Select value={this.state.value} onChange={this.handleChange}>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
        </Select>
        <YearDisplay>{this.state.year}</YearDisplay>
        <Year2016>
          <Waypoint onEnter={() => this.handleWaypointEnter('2016')} onLeave={() => this.handleWaypointLeave('2016')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2016">
              2016
          </div>
          </Waypoint>
        </Year2016>
        <Year2015>
          <Waypoint onEnter={() => this.handleWaypointEnter('2015')} onLeave={() => this.handleWaypointLeave('2015')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2015">
              2015
            </div>
          </Waypoint>
        </Year2015>
        <Year2014>
          <Waypoint onEnter={() => this.handleWaypointEnter('2014')} onLeave={() => this.handleWaypointLeave('2014')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2014">
              2014
            </div>
          </Waypoint>
        </Year2014>
        <Year2013>
          <Waypoint onEnter={() => this.handleWaypointEnter('2013')} onLeave={() => this.handleWaypointLeave('2013')}>
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
