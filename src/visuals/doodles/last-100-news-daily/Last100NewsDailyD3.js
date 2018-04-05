import React from 'react'
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from './Axes'
import Line from '../../d3-shapes/Line'
import ResponsiveWrapper from '../../ResponsiveWrapper'
import { select as d3Select,
          mouse as d3Mouse } from 'd3-selection'
import Typography from 'material-ui/Typography'

class Last100NewsDailyD3 extends React.Component {
  constructor() {
    super()
    this.xScalePrice = scaleBand();
    this.yScalePrice = scaleLinear();
    this.xScaleVolume = scaleBand();
    this.yScaleVolume = scaleLinear();
    this.mouseLinearInterpret = scaleLinear();

    this.mainEl = {}
    this.state = {
      curMouseCoordinates: []
    }

    this.handleMouseOver = this.handleMouseOver.bind(this)
  }

  componentDidMount(){
    this.mainEl = d3Select(this.svgElement)
    this.mainEl.on('mouseover', this.handleMouseOver)
  }

  handleMouseOver = () => {
    const coords = d3Mouse(this.svgElement)
    this.setState({
      curMouseCoordinates: coords
    })
  }

  render() {
    const { last100DaysStockData, headlines } = this.props;
    const { curMouseCoordinates } = this.state;
    const margins = { top: 10, right: 90, bottom: 100, left: 70 }
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 400
    }
    const maxPrice = 1.1*Math.max(...last100DaysStockData.map(d => d.high));
    const minPrice = .9*Math.min(...last100DaysStockData.map(d => d.low));
    const maxVolume = 1.1*Math.max(...last100DaysStockData.map(d => d.volume));
    const minVolume = .9*Math.min(...last100DaysStockData.map(d => d.volume));
    const dispData = last100DaysStockData.filter((d, i) => {
      if(i%1 === 0) return { ...d }
    });
    const mouseLinearInterpretData = dispData.map(d => d.date).sort()

    const xScalePrice = this.xScalePrice
      .padding(0)
      .domain(dispData.map(d => d.date))
      .range([margins.left, svgDimensions.width - margins.right])

    const mouseLinearInterpret = this.mouseLinearInterpret
      .domain([0, mouseLinearInterpretData.length])
      .range([0, svgDimensions.width - margins.right])

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

    const day = mouseLinearInterpretData[Math.round(mouseLinearInterpret.invert(curMouseCoordinates[0] -
                              margins.left))];

    return (
      <div style={{paddigBottom: '0px'}}>
        <svg width={svgDimensions.width}
             height={svgDimensions.height}
             ref={(el) => { this.svgElement = el; }}>
          <Axes
            scales={{ xScale: xScalePrice, yScale: yScalePrice, yScaleRight: yScaleVolume }}
            margins={margins}
            svgDimensions={svgDimensions}
            data={dispData}
          />
          <Line
            scales={{ xScale: xScalePrice, yScale: yScalePrice }}
            data={dispData}
            depVar='close'
            indVar='date'
            stroke='green'
            strokeWidth='2'
          />
          <Line
            scales={{ xScale: xScaleVolume, yScale: yScaleVolume }}
            data={dispData}
            depVar='volume'
            indVar='date'
            stroke='purple'
            strokeWidth='2'
          />
          <text
            transform='rotate(-90)'
            y={svgDimensions.width - 30}
            x={0 - (svgDimensions.height - margins.bottom)/2}
            dy='1em'
            textAnchor='middle'
            fill='purple'
            fontSize='1.3em'
            fontWeight={400}
          >Volume</text>
          <text
            transform='rotate(-90)'
            y={12}
            x={0 - (svgDimensions.height - margins.bottom)/2}
            dy='1em'
            textAnchor='middle'
            fill='green'
            fontSize='1.3em'
            fontWeight={400}
          >Price</text>
        </svg>
        <div style={{marginBottom: '20px'}}>
          { curMouseCoordinates &&
            day &&
              <Typography>
                <span style={{fontWeight: 'bold'}}>Date: </span>
                <span style={{color: 'blue', marginLeft: '5px'}}>{day}</span>
              </Typography>
          }
          { curMouseCoordinates &&
            headlines &&
            headlines[day] &&
            headlines[day].map((item, key) => {
              let cap = '';
              if(item.head.length > 0 && item.main !== item.head) {
                cap = item.head + ' ' + item.main
              } else {
                cap = item.main
              }
              return (
                <Typography key={key}><br/>
                  <span style={{fontWeight:'bold'}}>Cap: </span><span>{cap}</span><br/>
                  <span style={{fontWeight:'bold'}}>Snippet: </span><span>{item.snippet}</span>
                </Typography>
              )
            })
          }
        </div>
      </div>
    )
  }
}

Last100NewsDailyD3.propTypes = {
  last100DaysStockData: PropTypes.array,
  parentWidth: PropTypes.number,
  headlines: PropTypes.object.isRequired
};

export default ResponsiveWrapper(Last100NewsDailyD3);
