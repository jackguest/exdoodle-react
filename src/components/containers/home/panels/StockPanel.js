import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../../actions-creators/stockConfigActions';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import DeleteIcon from 'material-ui-icons/Delete';
import Tooltip from 'material-ui/Tooltip';
import styles from "../styles";
import Grid from 'material-ui/Grid'
import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';
import getStockMetaData from "../selectors/getStockMetaData";
//import * as dataParsers from '../../../../utils/dataParsers';
import StockPanelDetails from './StockPanelDetails'

class StockPanel extends React.Component {

  constructor(props){
    super(props)
  }

  handleDelete = (event, symbols) => {
    let newList = symbols.filter(val => val !== this.props.symbol)
    this.props.deleteMe(newList)
  };

  render() {
    const { classes, symbol, symbols, stockMetaData,
      expandSelected, name, sector, industry } = this.props;
    const { loading, dataPointCount } = stockMetaData[symbol];

    return (
      <div className={classes.selectedStockListContainer}>
        <ExpansionPanel style={{padding: '0px'}}>
          <ExpansionPanelSummary className={classes.stockPanelContainer}
                                 expandIcon={<ExpandMoreIcon/>}>
            <Grid container={true} spacing={8}>
              <Grid item>
                <Typography className={classes.stockPanelHeading}>{ symbol }</Typography>
              </Grid>
              <Grid item>
                {!loading &&
                <Tooltip title='Mean of Monthly Adjusted Volumes' placement='top-start'>
                  <Avatar className={classes.orangeAvatar}>MAV</Avatar>
                </Tooltip>
                }
              </Grid>
              <Grid item>
                {loading &&
                  <CircularProgress size={20} />
                }
                {!loading &&
                  <Tooltip title='Number of data points' placement='top-start'>
                    <Avatar className={classes.purpleAvatar}>{dataPointCount}</Avatar>
                  </Tooltip>
                }
              </Grid>
              <Grid item>
                {!loading &&
                stockMetaData[symbol]['meanDividends'] > 0 &&
                <Tooltip title='Stock paid dividends in time period' placement='top-start'>
                  <Avatar className={classes.greenAvatar}>D</Avatar>
                </Tooltip>
                }
              </Grid>
            </Grid>
            <div className={classes.deleteFromPanel}>
              <Tooltip title='Remove from Select Stock List' placement='top-start'>
                <DeleteIcon  onClick={(event) => this.handleDelete(event, symbols)} className={classes.deleteIcon}/>
              </Tooltip>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{padding: '0px'}}>
            {!loading &&
              <StockPanelDetails style={{padding: '0px'}}
                                 symbol={symbol}
                                 func='monthlyAdjusted'
                                 stockMetaData={stockMetaData}
                                 name={name}
                                 sector={sector}
                                 industry={industry}
                                 expandSelected={expandSelected}/>
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

StockPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  symbol: PropTypes.string,
  deleteMe: PropTypes.func.isRequired,
  symbols: PropTypes.array.isRequired,
  stockMetaData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  expandSelected: PropTypes.bool,
  name: PropTypes.string,
  sector: PropTypes.string,
  industry: PropTypes.string
};

function mapStateToProps(state) {
  return {
    stockMetaData: getStockMetaData(state)
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
)(withStyles(styles)(StockPanel));
