import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions-creators/appLoadActions';
import getExchangeLists from './selectors/getExchangeLists';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import styles from './styles'
import ExhangeListCard from './home-cards/ExchangeListCard'
import DialogCard from './home-cards/DialogCard'
import getStockData from "./selectors/getStockData";


export class HomePage extends React.Component {

  constructor(props){
    super(props)
  }

  loadNasdaq = () => {
    this.props.actions.getNasdaqExchangeList()
  };

  render(){
    const { classes, stockData } = this.props;
    const { nasdaq, loading } = this.props.exchangeLists;
    return (
      <div className={classes.margins} >
        <Grid container spacing={0}>
          <DialogCard nasdaq={nasdaq} classes={classes} loadNasdaq={this.loadNasdaq} loading={loading}/>
          {nasdaq &&
            nasdaq.length > 0 &&
            <ExhangeListCard nasdaq={nasdaq} classes={classes} stockData={stockData}/>
          }
          <div className={classes.progressContainer}>
          { loading && (
            <CircularProgress className={classes.exchangeListProgress} size={50} />
          )}
          </div>
        </Grid>
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  exchangeLists: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  stockData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    exchangeLists: getExchangeLists(state),
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
)(withStyles(styles)(HomePage));


