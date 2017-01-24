import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
      chart: 'loading',
    };
  }

  componentDidMount() {

  }

  render() {
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i += 1) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    const windowwidth = window.innerWidth;
    const windowheight = window.innerHeight;
    const numdocs = 1678;
    const windowarea = windowheight * windowwidth;
    const square = Math.sqrt(windowarea / numdocs);
    const w = windowwidth;
    const h = windowheight;
    const color = getRandomColor();
    const numselected = 154;
    // create subrectangle
    const createrect = Math.floor(Math.sqrt(numselected));
    const remainder = numselected - (createrect * createrect);

    this.faux = ReactFauxDOM.createElement('div');
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
        });
        // .on("mouseover", () => {
        //   if (d3.select(this).classed('selected')) {
        //     d3.select('#text').text(function () {
        //       return numselected
        //     })
        //   }
        // });
    }

    return (
      <div className="chart">
        {this.faux.toReact()}
      </div>
    );
  }
}

export default Chart;
