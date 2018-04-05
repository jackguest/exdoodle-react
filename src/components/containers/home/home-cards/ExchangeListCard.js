import React from 'react'
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import NasdaqSelectGrid from '../../../mui-grid/NasdaqSelectGrid'
import * as dataParsers from '../../../../utils/dataParsers'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../../actions-creators/stockConfigActions';
import styles from "../styles";
import {withStyles} from "material-ui/styles/index";
import getStockData from "../selectors/getStockData";
import StockPanel from '../panels/StockPanel'
import SwapHorizIcon from 'material-ui-icons/SwapHoriz';

export class ExchangeListCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nasdaqGridWidth: this.props.stockData.selectedStocks.length > 0 ? 8 : 12,
      selectedStockGridWidth: 4,
      selectedStocks: this.props.stockData.selectedStocks || [],
      selectedStockSymbols: dataParsers.getSelectedStockSymbols(props.stockData.selectedStocks) || [],
    }
  }

  getSelectedStocks = (selectedStockSymbols, newSymbol) => {
    let selectedStocks = dataParsers.getNasdaqDetails('Symbol', selectedStockSymbols, this.props.nasdaq);
    this.props.actions.setSelectedStocksList(this.props.stockData, selectedStocks);
    if(!this.props.stockData.stockMetaData.hasOwnProperty(newSymbol)){
      this.props.actions.setStockMetaData(this.props.stockData, newSymbol);
    }
    this.setState({
      nasdaqGridWidth: selectedStocks.length > 0 ? 8 : 12,
      selectedStockGridWidth: 4,
      selectedStocks: selectedStocks,
      selectedStockSymbols: selectedStockSymbols,
    });
  };

  expander = (w) => {
    let newSize = w === 8 ? 3 : 8;
    this.setState({
      nasdaqGridWidth: newSize,
      selectedStockGridWidth: 12 - newSize,
      expandSelected: !this.state.expandSelected
    });
  };

  render(){
    const { nasdaq, classes, stockData } = this.props;
    const { selectedStocks, nasdaqGridWidth, selectedStockGridWidth,
            selectedStockSymbols, expandSelected } = this.state;

    const columnData = [
      { id: 'Symbol', numeric: false, disablePadding: true, label: 'Symbol'},
      { id: 'Name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'Sector', numeric: false, disablePadding: true, label: 'Sector' },
      { id: 'industry', numeric: false, disablePadding: true, label: 'Industry' }
    ];

    return (
      <Grid container spacing={0}>
        <Grid item xs={nasdaqGridWidth}>
          <NasdaqSelectGrid
            nasdaq={nasdaq}
            classes={classes}
            columnData={columnData}
            stockSelector={this.getSelectedStocks}
            stockData={stockData}
            selectedSymbols={selectedStockSymbols}
          />
        </Grid>
        { selectedStocks &&
          selectedStocks.length > 0 &&
          <Grid item xs={selectedStockGridWidth}>
            <div className={classes.selectedStockListBanner}>
              <SwapHorizIcon
                className={classes.collapseIcon}
                onClick={() => this.expander(nasdaqGridWidth)}
              />
              <span>Selected Stock Details</span>
              <span style={{marginLeft: '30px'}}>Count: {selectedStocks.length}</span>
            </div>
            <div>
            { selectedStocks.map((item, key) => {
                return (
                  <StockPanel
                    key={key}
                    name={item.Name}
                    sector={item.Sector}
                    industry={item.industry}
                    symbol={item.Symbol}
                    symbols={selectedStockSymbols}
                    deleteMe={this.getSelectedStocks}
                    expandSelected={expandSelected}
                  />
                )
              })
            }
            </div>
          </Grid>
        }
      </Grid>
    );
  }
}

ExchangeListCard.propTypes = {
  nasdaq: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  stockData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    stockData: getStockData(state)
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
)(withStyles(styles)(ExchangeListCard));

