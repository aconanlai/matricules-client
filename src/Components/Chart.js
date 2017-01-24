import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0%   {opacity: 0;}  
  100% {opacity: 1;}
`;

const fadeOut = keyframes`
  0%   {opacity: 1;}  
  100% {opacity: 0;}
`;

const Keyword = styled.span`
  font-size: 6em;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 5px;

  &.nah {
    -webkit-animation: ${fadeIn} 1.5s;
    animation: ${fadeIn} 1.5s;
  }

  &.changing {
    -webkit-animation: ${fadeOut} 1s;
    animation: ${fadeOut} 1s;
  }
`;

const KeywordList = styled.ul`
  height: calc(100% - 150px);
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap-reverse;
  list-style: none;
  font-size: 1.42em;
  position: absolute;
  top: 0;
  right: 50px;
  transition: opacity 1s;

  &.hide {
    pointer-events: none;
    opacity: 0;
    z-index: -999;
  }
`;

const KeywordListItem = styled.li`
  text-align: right;
  width: 250px;
`;

const MyReactClass = React.createClass({
  mixins: [
    ReactFauxDOM.mixins.core,
    ReactFauxDOM.mixins.anim
  ],

  getInitialState() {
    return {
      mounted: false,
      mouseOver: false,
      chart: '',
      color: '',
      keywordChanging: false,
    };
  },

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (this.mounted === true) {
      this.setState({
        color,
      });
    }
    
  },

  animate() {
    const numselected = this.props.freq;
    var color = this.state.color;
    var windowwidth = window.innerWidth;
    var windowheight = window.innerHeight;
    var ratio = windowheight / windowwidth;
    var numdocs = 1678;
    var windowarea = windowheight * windowwidth;

    var squareunit = Math.ceil(Math.sqrt(windowarea / numdocs));
    var square = Math.sqrt(windowarea / numdocs);
    var rectwidth = numdocs / windowwidth;
    var rectheight = numdocs / windowheight;
    var w = windowwidth;
    var h = windowheight;

    // create subrectangle 
    var createrect = Math.floor(Math.sqrt(numselected));
    var remainder = numselected - (createrect * createrect);

    // create the svg
    var svg = d3.select('svg')

    // calculate number of rows and columns
    var squaresRow = Math.round(w / square);
    var squaresColumn = Math.round(h / square);

    // loop over number of columns
    for (var n = 0; n < squaresColumn; n++) {
      // create each set of rows
      var rows = svg.selectAll('rect' + ' .row-' + (n + 1))
        .data(d3.range(squaresRow))
        .enter().append('rect')
        .attr({
          class: function (d, i) {
            return ((i <= createrect && n <= createrect) || (i <= remainder && n <= createrect + 1)) ? 'square row-' + (n + 1) + ' ' + 'col-' + (i + 1) + ' selected' : 'square row-' + (n + 1) + ' ' + 'col-' + (i + 1) + ' notselected';
          },
          id: function (d, i) {
            return 's-' + (n + 1) + (i + 1);
          },
          width: square,
          height: square,
          x: function (d, i) {
            return i * square;
          },
          y: n * square,
          fill: function (d, i) {
            return ((i <= createrect && n <= createrect) || (i <= remainder && n <= createrect + 1)) ? color : '#fff';
          },
          stroke: '#e0ebeb'
        })
        .on("mouseover", function () {
          if (d3.select(this).classed('selected')) {
            d3.select('#text').text(function () {
              return numselected
            })
          }
        })
        // .style("opacity", 0)
        // .transition()
        // .duration(700)
        // .style("opacity", 1)
    }
  },

  componentWillMount() {
    this.mounted = true;
    this.getRandomColor();
  },

  componentDidMount() {
    this.faux = this.connectFauxDOM('div.renderedD3', 'chart')
    const windowwidth = window.innerWidth;
    const windowheight = window.innerHeight;
    const numdocs = 1678;
    const windowarea = windowheight * windowwidth;
    const square = Math.sqrt(windowarea / numdocs);
    const w = windowwidth;
    const h = windowheight;
    const color = this.state.color;
    const numselected = this.props.freq;
    // create subrectangle
    const createrect = Math.floor(Math.sqrt(numselected));
    const remainder = numselected - (createrect * createrect);

    const svg = d3.select(this.faux).append('svg')
      .attr({
        width: w,
        height: h,
      });

    // calculate number of rows and columns
    const squaresRow = Math.round(w / square);
    const squaresColumn = Math.round(h / square);

    // loop over number of columns
    for (let n = 0; n < squaresColumn; n++) {
      // create each set of rows
      svg.selectAll('rect' + ' .row-' + (n + 1))
        .data(d3.range(squaresRow))
        .enter().append('rect')
        .attr({
          class: function (d, i) {
            return ((i <= createrect && n <= createrect) || (i <= remainder && n <= createrect + 1)) ? 'square row-' + (n + 1) + ' ' + 'col-' + (i + 1) + ' selected' : 'square row-' + (n + 1) + ' ' + 'col-' + (i + 1) + ' notselected';
          },
          id: function (d, i) {
            return 's-' + (n + 1) + (i + 1);
          },
          width: square,
          height: square,
          x: function (d, i) {
            return i * square;
          },
          y: n * square,
          fill: function (d, i) {
            return ((i <= createrect && n <= createrect) || (i <= remainder && n <= createrect + 1)) ? color : '#fff';
          },
          stroke: '#e0ebeb'
        })
    }
    // setInterval(() => {
    //   this.getRandomColor();
    //   var rando = Math.floor(Math.random() * 500);
    //   this.animate(rando);
    // }, 3000)
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.freq !== this.props.freq && this.mounted === true) {
      this.getRandomColor();
      // this.setState({
      //   keywordChanging: true,
      // });
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.freq !== this.props.freq) {
      this.animate();
      // setTimeout(() => {
      //   if (this.mounted === true) {
      //     this.setState({
      //       keywordChanging: false,
      //     });
      //   }
      // }, 5000);
    }
  },

  componentWillUnmount() {
    this.mounted = false;
  },

  render() {
    return (
      <div>
        <div className='renderedD3'>
          {this.state.chart}
        </div>
        <KeywordList className={(this.props.hideNav === false) ? 'hide' : 'nah'}>
          {this.props.keywords.map(keyword => {
            return (
              <KeywordListItem>{keyword.french}</KeywordListItem>
            );
          })}
        </KeywordList>
        <Keyword className={(this.state.keywordChanging === true) ? 'nah' : 'changing'} style={{ color: this.state.color }}>{this.props.selectedKeyword}</Keyword>
      </div>
    )
  }
})

export default MyReactClass