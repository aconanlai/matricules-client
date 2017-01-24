import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

const MyReactClass = React.createClass({
  mixins: [
    ReactFauxDOM.mixins.core,
    ReactFauxDOM.mixins.anim
  ],

  getInitialState() {
    return {
      mouseOver: false,
      chart: '',
      color: '',
    };
  },

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.setState({
      color,
    });
  },

  animate(numselected) {
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
    console.log(createrect);
    var remainder = numselected - (createrect * createrect);
    console.log(remainder)

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
        .style("opacity", 0)
        .transition()
        .duration(500)
        .style("opacity", 1)

      this.animateFauxDOM(2000);
    }
  },

  componentDidMount() {
    const get = this.getRandomColor();
    this.faux = this.connectFauxDOM('div.renderedD3', 'chart')
    const windowwidth = window.innerWidth;
    const windowheight = window.innerHeight;
    const numdocs = 1678;
    const windowarea = windowheight * windowwidth;
    const square = Math.sqrt(windowarea / numdocs);
    const w = windowwidth;
    const h = windowheight;
    const color = this.state.color;
    const numselected = 154;
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
    // }, 5000)
  },

  render() {
    return (
      <div>
        <div className='renderedD3'>
          {this.state.chart}
        </div>
      </div>
    )
  }
})

export default MyReactClass