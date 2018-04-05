import React, { Component } from 'react'

export default ChartComponent => (
  class ResponsiveChart extends Component {
    constructor(props) {
      super(props)

      this.state = {
        containerWidth: null,
        windowFrameWidth: window.innerWidth
      }

      this.fitParentContainer = this.fitParentContainer.bind(this)
      this.fitByWindowResize = this.fitByWindowResize.bind(this)
    }

    componentDidMount() {
      this.fitParentContainer()
      window.addEventListener('resize', this.fitByWindowResize)
      this.chartContainer.addEventListener('resize', this.fitParentContainer)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.fitByWindowResize)
      this.chartContainer.removeEventListener('resize', this.fitParentContainer)
    }

    fitParentContainer() {
      const { containerWidth } = this.state;
      const currentContainerWidth = this.chartContainer
        .getBoundingClientRect().width;

      const shouldResize = containerWidth !== currentContainerWidth;

      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          currentContainerWidth: currentContainerWidth
        })
      }
    }

    fitByWindowResize() {
      const { containerWidth, windowFrameWidth } = this.state;
      const windowWidth = window.innerWidth;

      setTimeout(()=> {
        this.setState({
          windowFrameWidth: windowWidth,
          containerWidth: containerWidth + ( windowWidth - windowFrameWidth)*.8
        })
      },200)
    }

    renderChart() {
      const parentWidth = this.state.containerWidth;

      return (
        <ChartComponent {...this.props} parentWidth={parentWidth} />
      )
    }

    render() {
      const { containerWidth } = this.state;
      const shouldRenderChart = containerWidth !== null;

      return (
        <div
          ref={(el) => { this.chartContainer = el }}
          className="Responsive-wrapper"
        >
          {shouldRenderChart && this.renderChart()}
        </div>
      )
    }
  }
)
