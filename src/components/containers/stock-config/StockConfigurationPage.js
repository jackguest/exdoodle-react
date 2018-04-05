import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions-creators/stockConfigActions';
import Grid from 'material-ui/Grid';
import Last100NewsDaily from '../../../visuals/doodles/last-100-news-daily/Last100NewsDaily'
import {withStyles} from "material-ui/styles";
import styles from './styles';
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox';
import Card, { CardContent } from 'material-ui/Card';
import getStockData from "../home/selectors/getStockData";
import getNewsHeadlinesFromKW from "./selectors/getNewsHeadlinesFromKW";
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography'
import * as dataParsers from '../../../utils/dataParsers'

export class StockConfigurationPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      doodleButtons: [
        {
          id: 0,
          name: '100 Days with News',
          style: this.props.classes.inActiveButtonStyle
        },
        {
          id: 1,
          name: 'Future 1',
          style: this.props.classes.inActiveButtonStyle
        },
        {
          id: 2,
          name: 'Future 2',
          style: this.props.classes.inActiveButtonStyle
        }
      ],
      currentDoodle: '',
      doodleStocks: [],
      doodleStockAttrs: {}
    };

    this.handleStocksChange = this.handleStocksChange.bind(this)

  }

  componentDidMount(){
  }

  doodleButtonClick = (ev, id) => {
    let currentDoodle = '';
    let doodleButtons = this.state.doodleButtons.map((db, i) => {
      if(i === id) {
        db.style = this.props.classes.activeButtonStyle
        currentDoodle = db.name;
        if(currentDoodle === '100 Days with News' && currentDoodle !== this.state.currentDoodle){
          this.props.actions.setNewsHeadlinesFromKW()
        }
      } else {
        db.style = this.props.classes.inActiveButtonStyle
      }
      return db
    });

    this.setState({
      doodleButtons: doodleButtons,
      currentDoodle: currentDoodle
    })
  };

  handleStocksChange = (ev, symbol) => {
    let doodleStocks = this.state.doodleStocks
    let checked = ev.target.checked;
    let selectedStockAttrs = this.state.doodleStockAttrs;
    selectedStockAttrs[symbol] = this.props.stockData.selectedStocks.filter(val => val.Symbol === symbol)

    if(!checked) {
      this.setState({
        doodleStocks: doodleStocks.concat(symbol),
        doodleStockAttrs: selectedStockAttrs
      })
    } else {
      this.setState({
        doodleStocks: doodleStocks.filter(val => val !== symbol)
      })
    }
  };

  checkSelected = symbol =>  this.state.doodleStocks.indexOf(symbol) !== -1;

  render() {
    const { stockData, classes, newsHeadlinesFromKW } = this.props;
    const { doodleButtons, currentDoodle, doodleStocks, doodleStockAttrs } = this.state;
    const selectedStocks = stockData.selectedStocks;
    let headlineDayMap = {}
    if(newsHeadlinesFromKW && !newsHeadlinesFromKW.loading) {
      headlineDayMap = dataParsers.getHeadlineDayMap(newsHeadlinesFromKW)
    }
    return (
      <div className={classes.mainContainer}>
        <Card>
          <CardContent style={{paddingTop: '5px', paddingBottom: '5px'}}>
            <Grid container spacing={8} direction='row'>
              { doodleButtons &&
                doodleButtons.map((item, i) => {
                  return (
                    <Grid key={i} item>
                      <Button onClick={(ev) => this.doodleButtonClick(ev, i)} className={doodleButtons[i].style}
                              size='small' variant='raised'>{item.name}</Button>
                    </Grid>
                  )
                })
              }
              <div className={classes.topHelpButtonStyle}>
                <Button size='small'>Help</Button>
              </div>
            </Grid>
          </CardContent>
        </Card>
        <Grid container spacing={0} direction='row'>
          <Grid item xs={1} zeroMinWidth={true}>
          { selectedStocks &&
            selectedStocks.map((item, key) => {
              const isSelected = this.checkSelected(item.Symbol)
              return (
                  <Button key={key} size='small' onClick={(ev) => this.handleStocksChange(ev, item.Symbol)}>
                    <Checkbox
                      checked={isSelected}
                      value={item.Symbol}
                    />{item.Symbol}
                  </Button>
              )
            })

          }
          </Grid>
          <Grid item xs={11} style={{minWidth: '900px'}}>
            { newsHeadlinesFromKW &&
              newsHeadlinesFromKW.loading &&
              <Grid container direction='row' className={classes.exchangeListProgress}>
                <CircularProgress size={50} />
                <Typography style={{margin: '15px'}}>Loading Headlines...</Typography>
              </Grid>
            }

            { currentDoodle &&
              currentDoodle === '100 Days with News' &&
              newsHeadlinesFromKW &&
              !newsHeadlinesFromKW.loading &&
              doodleStocks &&
              doodleStocks.map((item, key) => {
              return (
                <Last100NewsDaily
                  key={key}
                  symbol={item}
                  doodleStockAttrs={doodleStockAttrs[item][0]}
                  headlines={headlineDayMap}
                  func='daily'/>
                )
              })
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

StockConfigurationPage.propTypes = {
  actions: PropTypes.object.isRequired,
  stockData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  newsHeadlinesFromKW: PropTypes.any
};

function mapStateToProps(state) {
  return {
    stockData: getStockData(state),
    newsHeadlinesFromKW: getNewsHeadlinesFromKW(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StockConfigurationPage));
