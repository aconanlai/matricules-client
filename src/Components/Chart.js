import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false
    }
  }

  render () {
    const self = this
    const svg = d3.select(ReactFauxDOM.createElement('svg'))
      .attr({
        width: 300,
        height: 300
      })

    svg.append('rect')
      .attr({
        width: 300,
        height: 300,
        fill: this.state.mouseOver ? 'red' : 'green'
      })
      .on('mouseover', function () {
        self.setState({
          mouseOver: true
        })
      })
      .on('mouseout', function () {
        self.setState({
          mouseOver: false
        })
      })

    return svg.node().toReact()
  }
}

export default Chart;