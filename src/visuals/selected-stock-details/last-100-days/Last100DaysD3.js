import React from 'react'
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from './Axes'
import Line from '../../d3-shapes/Line'
import ResponsiveWrapper from '../../ResponsiveWrapper'
import Typography from 'material-ui/Typography';

class Last100DaysD3 extends React.Component {
  constructor() {
    super()
    this.xScalePrice = scaleBand();
    this.yScalePrice = scaleLinear();
    this.xScaleVolume = scaleBand();
    this.yScaleVolume = scaleLinear();
  }

  render() {
    const { last100DaysStockData } = this.props;
    const margins = { top: 10, right: 20, bottom: 100, left: 80 }
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 220
    }
    const maxPrice = 1.1*Math.max(...last100DaysStockData.map(d => d.high));
    const minPrice = .9*Math.min(...last100DaysStockData.map(d => d.low));
    const maxVolume = 1.1*Math.max(...last100DaysStockData.map(d => d.volume));
    const minVolume = .9*Math.min(...last100DaysStockData.map(d => d.volume));
    const dispData = last100DaysStockData.filter((d, i) => {
      if(i%1 === 0) return { ...d }
    })

    const xScalePrice = this.xScalePrice
      .padding(0)
      .domain(dispData.map(d => d.date))
      .range([margins.left, svgDimensions.width - margins.right])


    const yScalePrice = this.yScalePrice
      .domain([minPrice, maxPrice])
      .range([svgDimensions.height - margins.bottom, margins.top])

    const xScaleVolume = this.xScaleVolume
      .padding(0)
      .domain(dispData.map(d => d.date))
      .range([margins.left, svgDimensions.width - margins.right])


    const yScaleVolume = this.yScaleVolume
      .domain([minVolume, maxVolume])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <div style={{paddigBottom: '0px'}}>
        <Typography style={{marginLeft: '10px'}} color='primary'>Price</Typography>
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <Axes
            scales={{ xScale: xScalePrice, yScale: yScalePrice }}
            margins={margins}
            svgDimensions={svgDimensions}
            data={dispData}
          />
          <Line
            scales={{ xScale: xScalePrice, yScale: yScalePrice }}
            data={dispData}
            depVar='high'
            indVar='date'
            stroke='blue'
            strokeWidth='1'
          />
          <Line
            scales={{ xScale: xScalePrice, yScale: yScalePrice }}
            data={dispData}
            depVar='low'
            indVar='date'
            stroke='red'
            strokeWidth='1'
          />
          <Line
            scales={{ xScale: xScalePrice, yScale: yScalePrice }}
            data={dispData}
            depVar='close'
            indVar='date'
            stroke='green'
            strokeWidth='2'
          />
        </svg>
        <div style={{position:'relative', top:'-40px'}}>
          <Typography style={{marginLeft: '10px'}} color='primary'>Volume</Typography>
          <svg width={svgDimensions.width} height={svgDimensions.height}>
            <Axes
              scales={{ xScale: xScaleVolume, yScale: yScaleVolume }}
              margins={margins}
              svgDimensions={svgDimensions}
              data={dispData}
            />
            <Line
              scales={{ xScale: xScaleVolume, yScale: yScaleVolume }}
              data={dispData}
              depVar='volume'
              indVar='date'
              stroke='purple'
              strokeWidth='1'
            />
          </svg>
        </div>
      </div>
    )
  }
}

Last100DaysD3.propTypes = {
  last100DaysStockData: PropTypes.array,
  parentWidth: PropTypes.number
};

export default ResponsiveWrapper(Last100DaysD3);
