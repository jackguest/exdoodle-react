
import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'
import PropTypes from "prop-types";

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#9988aa', '#9988aa'])
      .interpolate(interpolateLab)
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props;
    const { xScale, yScale } = scales;
    const { height } = svgDimensions;

    const bars = (
      data.map(datum =>
        <rect
          style={{'opacity': .5}}
          key={datum.date}
          x={xScale(datum.date)}
          y={yScale(datum.adjustedClose)}
          height={height - margins.bottom - scales.yScale(datum.adjustedClose)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.adjustedClose)}
        />
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}

Bars.propTypes = {
  svgDimensions: PropTypes.object,
  scales: PropTypes.object,
  margins: PropTypes.object,
  tickSize: PropTypes.number,
  maxValue: PropTypes.number,
  data: PropTypes.array
};

