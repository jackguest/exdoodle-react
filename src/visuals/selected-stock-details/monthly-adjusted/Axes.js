import React from 'react'
import PropTypes from 'prop-types'
import Axis from './Axis'
import { scaleBand } from 'd3-scale'

const Axes = ({ scales, margins, svgDimensions, data }) => {
  const { height, width } = svgDimensions

  const textFitKey = Math.floor(data.length/(.03*svgDimensions.width))
  let k = (textFitKey > 0 ? textFitKey : 1);
  const dispData = data.filter((d, i) => {
    if(i%k === 0) return { ...d }
  })

  const xProps = {
    orient: 'Bottom',
    scale: scaleBand()
      .domain(dispData.map(d => d.date))
      .range([margins.left, svgDimensions.width - margins.right]),
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom,
    numTicks: []
  };

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
    numTicks: [4]
  };

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )

};

Axes.propTypes = {
  scales: PropTypes.object,
  margins: PropTypes.object,
  svgDimensions: PropTypes.object,
  data: PropTypes.array
};

export default Axes;
