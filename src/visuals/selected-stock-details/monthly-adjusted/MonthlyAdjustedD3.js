import React from 'react'
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from './Axes'
import Bars from './Bars'
import Line from '../../d3-shapes/Line'
import ResponsiveWrapper from '../../ResponsiveWrapper'

class MonthlyAdjustedD3 extends React.Component {
  constructor() {
    super()
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const { monthlyAdjustedStockData } = this.props;
    const margins = { top: 10, right: 20, bottom: 100, left: 40 }
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 300
    }
    //const textFitKey = Math.floor(monthlyAdjustedStockData.length/(.1*svgDimensions.width))
    const maxValue = 1.1*Math.max(...monthlyAdjustedStockData.map(d => d.high));
    //let k = (textFitKey > 0 ? textFitKey : 1)
    const dispData = monthlyAdjustedStockData.filter((d, i) => {
      if(i%1 === 0) return { ...d }
    })

    const xScale = this.xScale
      .padding(0)
      .domain(dispData.map(d => d.date))
      .range([margins.left, svgDimensions.width - margins.right])


    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
          data={dispData}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={dispData}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
        <Line
          scales={{ xScale, yScale }}
          data={dispData}
          depVar='high'
          indVar='date'
          stroke='blue'
          strokeWidth='2'
        />
        <Line
          scales={{ xScale, yScale }}
          data={dispData}
          depVar='low'
          indVar='date'
          stroke='red'
          strokeWidth='2'
        />
      </svg>
    )
  }
}

MonthlyAdjustedD3.propTypes = {
  margins: PropTypes.object,
  svgDimensions: PropTypes.object,
  parentWidth: PropTypes.number,
  monthlyAdjustedStockData: PropTypes.array
};

export default ResponsiveWrapper(MonthlyAdjustedD3);
