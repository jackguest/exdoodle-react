import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../../actions-creators/stockConfigActions';
import styles from "../styles";
import getStocksBySymbolAndFunction from "../selectors/getStocksBySymbolAndFunction";
import Last100DaysD3 from '../../../../visuals/selected-stock-details/last-100-days/Last100DaysD3';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

class StockPanelLast100Daily extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(!this.props.stock) {
      this.props.actions.setStockDaily(this.props.symbol)
    }
  }

  render() {
    const { classes, stock } = this.props;

    return (
      <div className={classes.last100StockVisContainer}>
          { stock &&
            stock.loading &&
            <div className={classes.exchangeListProgress}>
              <CircularProgress size={50}/>
              <Typography>Loading Stock Data...</Typography>
            </div>
          }
        {stock && stock.length > 0 &&
          <Last100DaysD3
            last100DaysStockData={stock}
          />
        }
      </div>
    );
  }
}

StockPanelLast100Daily.propTypes = {
  classes: PropTypes.object.isRequired,
  symbol: PropTypes.string,
  actions: PropTypes.object.isRequired,
  stock: PropTypes.any,
  func: PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
  return {
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
)(withStyles(styles)(StockPanelLast100Daily));
