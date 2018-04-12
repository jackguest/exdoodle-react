import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../../actions-creators/stockConfigActions';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import styles from "../styles";
import Grid from 'material-ui/Grid'
import getStockMetaData from '../selectors/getStockMetaData';
import getStocksBySymbolAndFunction from '../selectors/getStocksBySymbolAndFunction';
import AppBar from 'material-ui/AppBar'
import MonthlyAdjustedD3 from '../../../../visuals/selected-stock-details/monthly-adjusted/MonthlyAdjustedD3';
import StockPanelLast100Daily from './StockPanelLast100Daily'

class StockPanelDetails extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showVisuals: false,
      show100Days: false
    };

    this.handleShowVisuals = this.handleShowVisuals.bind(this)
    this.handleLast100days = this.handleLast100days.bind(this)
  }

  componentDidMount(){
  }

  componentWillReceiveProps() {
    if(this.state.showVisuals){
      this.handleShowVisuals();
      setTimeout(()=>{
        this.handleShowVisuals()
      })
    }
  }

  handleShowVisuals() {
    this.setState(prevState => ({
      showVisuals: !prevState.showVisuals
    }))
  }

  handleLast100days() {
    this.setState(prevState => ({
      show100Days: !prevState.show100Days
    }))
  }

  render() {
    const { classes, symbol, stockMetaData,
      stock, name, sector, industry } = this.props;
    const data = stockMetaData[symbol];
    const { showVisuals, show100Days } = this.state;

    return (
      <div className={classes.root}>
        {data &&
         !data['loading'] &&
          <div>
            <AppBar position="static" color="primary" className={classes.selectedStockAppBar}>
              <Typography className={classes.selectedStockAppBarTypoText}  color='inherit'>Overview: {name}</Typography>
            </AppBar>
            <Grid style={{maxWidth: 400}} container={true} alignItems='flex-start' justify='flex-start' spacing={0}>
              <Grid item xs={6}>
                <Grid item xs zeroMinWidth>
                  <Typography className={classes.stockPanelOverviewType} noWrap>Sector:</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography className={classes.stockPanelOverviewType} noWrap>Industry:</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography className={classes.stockPanelOverviewType} noWrap>Date Range:</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography className={classes.stockPanelOverviewType} noWrap>Last Adjusted Close:</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography className={classes.stockPanelOverviewType} noWrap>Mean Adjusted Close:</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography className={classes.stockPanelOverviewType} noWrap>Max Price:</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography className={classes.stockPanelOverviewType} noWrap>Min Price:</Typography>
                </Grid>
              </Grid>
              <Grid className={classes.stockPanelOverviewContainer} item xs={6}>
                <Grid item xs zeroMinWidth>
                  <Typography color='primary' noWrap>{ sector }</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography color='primary' noWrap>{ industry }</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography color='primary' noWrap>{ data['mBegin'] } to { data['mEnd'] }</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography color='primary' noWrap>{ data['lastAdjustedClose'].toFixed(2) }</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography color='primary' noWrap>{ data['meanAdjustedClose'].toFixed(2) }</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography color='primary' noWrap>{ data['mHighs'].toFixed(2) }</Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography color='primary' noWrap>{ data['mLows'].toFixed(2) }</Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
        }
        { stock &&
          <div>
            <AppBar position="static"
                    color="primary"
                    className={classes.selectedStockAppBar}
                    onClick={this.handleShowVisuals}>
              <Typography className={classes.selectedStockAppBarTypoText} color='inherit'>
                Visuals: Monthly Adjusted(Bars), High(Blue), Low(Red)
                {showVisuals &&
                  <ExpandLessIcon className={classes.stockPanelVisualsIcon}/>
                }
                {!showVisuals &&
                  <ExpandMoreIcon className={classes.stockPanelVisualsIcon}/>
                }
              </Typography>
            </AppBar>
            {showVisuals &&
              <div>
                <MonthlyAdjustedD3 monthlyAdjustedStockData={stock}/>
                <AppBar position="static"
                        color="default"
                        className={classes.last100DaysAppBar}
                        onClick={this.handleLast100days}>
                  <Typography className={classes.last100DaysAppBarTypoText} color='inherit'>
                    More... Load Last 100 Daily &nbsp;&nbsp;&nbsp;Close(Green)
                    {show100Days &&
                      <ExpandLessIcon className={classes.last100VisualsIcon}/>
                    }
                    {!show100Days &&
                      <ExpandMoreIcon className={classes.last100VisualsIcon}/>
                    }
                  </Typography>
                </AppBar>
                {show100Days &&
                  <StockPanelLast100Daily
                    symbol={symbol}
                    func='daily'>
                  </StockPanelLast100Daily>
                }
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

StockPanelDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  symbol: PropTypes.string,
  stockMetaData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  stock: PropTypes.array,
  name: PropTypes.string,
  sector: PropTypes.string,
  industry: PropTypes.string,
  func: PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
  return {
    stockMetaData: getStockMetaData(state),
    stock: getStocksBySymbolAndFunction(state, props)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StockPanelDetails));
