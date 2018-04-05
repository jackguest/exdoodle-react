
import React, { Component } from 'react'
import { line, curveBasis } from 'd3-shape'
import PropTypes from "prop-types";

export default class Line extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scales, data, depVar, indVar, stroke, strokeWidth } = this.props;
    const { xScale, yScale } = scales;

    const lineGenerator = line()
      .curve(curveBasis)
      .x(d => xScale(d[indVar]))
      .y(d => yScale(d[depVar]));

    return (
      <path fill='none' stroke={stroke} strokeWidth={strokeWidth} d={lineGenerator(data)}/>
    )
  }
}

Line.propTypes = {
  scales: PropTypes.object,
  data: PropTypes.array,
  depVar: PropTypes.string,
  indVar: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string
};

