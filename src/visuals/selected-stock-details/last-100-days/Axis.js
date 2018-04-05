/*eslint import/namespace: ['error', { allowComputed: true }]*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

import './Axis.css'

class Axis extends Component {
  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis() {
    const axisType = `axis${this.props.orient}`;
    const axis = d3Axis[axisType]()
      .scale(this.props.scale)
      .tickSize(-this.props.tickSize)
      .tickPadding([12])
      .ticks(this.props.numTicks)

    d3Select(this.axisElement).call(axis)
  }

  render() {
    return (
      <g
        className={`Axis Axis-${this.props.orient}`}
        ref={(el) => { this.axisElement = el; }}
        transform={this.props.translate}
      />
    )
  }
}

Axis.propTypes = {
  orient: PropTypes.string,
  scale: PropTypes.func,
  tickSize: PropTypes.number,
  translate: PropTypes.any,
  numTicks: PropTypes.array
};

export default Axis;
