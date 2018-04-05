import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions-creators/stockConfigActions';
import styles from './styles';
import getStocksBySymbolAndFunction from '../../../components/containers/home/selectors/getStocksBySymbolAndFunction';
import Last100NewsDailyD3 from './Last100NewsDailyD3';
import { CircularProgress } from 'material-ui/Progress';


class Last100NewsDaily extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(!this.props.stock) {
      this.props.actions.setStockDaily(this.props.symbol)
    }
  }

  render() {
    const { stock, doodleStockAttrs, classes, headlines } = this.props;
    const { Name, Sector, industry, Symbol } = doodleStockAttrs;

    return (
      <div style={{marginTop: '25px'}}>
        { stock &&
          stock.loading &&
          <CircularProgress className={classes.exchangeListProgress} size={50} />
        }
        {stock && stock.length > 0 &&
          <div>
            <Typography className={classes.doodleLabelText}>
              <span className={classes.doobleLabelSymbolValue}>{ Symbol }</span>
              Name: <span className={classes.doobleLabelTextValue}>{ Name }</span>
              Sector: <span className={classes.doobleLabelTextValue}>{ Sector }</span>
              Industry: <span className={classes.doobleLabelTextValue}>{ industry }</span>
            </Typography>
            <Last100NewsDailyD3
              headlines={headlines}
              last100DaysStockData={stock}
            />
          </div>
        }
      </div>
    );
  }
}

Last100NewsDaily.propTypes = {
  classes: PropTypes.object.isRequired,
  symbol: PropTypes.string,
  actions: PropTypes.object.isRequired,
  stock: PropTypes.any,
  func: PropTypes.string.isRequired,
  doodleStockAttrs: PropTypes.object.isRequired,
  headlines: PropTypes.any.isRequired
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
)(withStyles(styles)(Last100NewsDaily));
