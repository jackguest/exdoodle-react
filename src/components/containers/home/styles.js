import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';
import green from 'material-ui/colors/green';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margins: {
    padding: '10px'
  },
  progressContainer: {
    flexGrow: 1,
    textAlign: 'center'
  },
  exchangeListProgress: {
    margin: theme.spacing.unit * 15,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  inTextLink: {
    cursor: 'pointer',
    color: 'blue'
  },
  tableRow: {
    padding: '0px'
  },
  input: {
    margin: '0px',
    fontWeight: 'normal',
    paddingBottom: '0px',
  },
  table: {
    //minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  stockCount: {
    color: 'blue'
  },
  denseCheckBox: {
    padding: '0px',
    height: '35px'
  },
  nasdaqHeader: {
    backgroundImage: 'linear-gradient(#ccc, #e6e6e6, #e6e6e6, #e6e6e6, #ccc, #aaa)',
    border: '1px solid #c5c5c5',
    padding: '0px',
    height: '40px'
  },
  selectedStockListBanner: {
    backgroundImage: 'linear-gradient(#ccc, #e6e6e6, #e6e6e6, #e6e6e6, #ccc, #aaa)',
    border: '1px solid #c5c5c5',
    padding: '0px',
    height: '39px',
    borderLeft: '1px solid #888',
    paddingLeft: '24px',
    fontWeight: 500,
    lineHeight: '38px',
    verticalAlign: 'middle'
  },
  selectedStockListContainer: {
    padding: '3px'
  },
  stockPanelContainer: {
    background: '#f9f9f9'
  },
  nasdaqFilters: {
    padding: '0px',
    height: '30px'
  },
  nasdaqRows: {
    height: '35px'
  },
  nasdaqDataCells: {
    borderLeft: '1px solid #ccc'
  },
  headerToolTip: {
    padding: '0px'
  },
  stockPanelHeading: {
    fontSize: '1.1em',//theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    fontWeight: 500,
    color: '#567188',
    flexShrink: 0,
    marginTop: '3px',
    minWidth: '80px'
  },
  nasdaqHeaderText: {
    paddingLeft: '24px',
    fontSize: '1.1em',
    borderLeft: '1px solid #888'
  },
  stockPanelSecondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  deleteIcon: {
    color: '#5e7688',
    '&:hover': {
      color: '#ff0000'
    },
  },
  collapseIcon: {
    position: 'relative',
    top: '8px',
    left: -20,
    color: '#5e7688',
    '&:hover': {
      color: '#ff0000'
    },
  },
  greenAvatar: {
    height: '24px',
    fontSize: '.9em',
    fontWeight: 600,
    width: '24px',
    color: '#fff',
    backgroundColor: green[500],
  },
  orangeAvatar: {
    height: '24px',
    fontSize: '.8em',
    fontWeight: 600,
    width: '24px',
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    height: '24px',
    fontSize: '.8em',
    fontWeight: 600,
    width: '24px',
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  deleteFromPanel: {
    marginleft: 'auto',
    float: 'right'
  },
  selectedStockAppBar: {
    background: '#3f51b5',
    marginBottom: '6px',
    paddingLeft: '7px',
    color: '#fff'
  },
  last100DaysAppBar: {
    position: 'relative',
    display: 'block',
    top: '-30px',
    marginBottom: '20px',
    paddingLeft: '7px',
    color: '#555'
  },
  selectedStockAppBarTypoText: {
    fontWeight: 500,
    color: '#fff'
  },
  last100DaysAppBarTypoText: {
    fontWeight: 500,
    color: '#3f51b5'
  },
  stockPanelOverviewContainer: {
    marginBottom: '4px',
  },
  stockPanelOverviewType: {
    marginLeft: '4px'
  },
  stockPanelVisualsIcon: {
    //position: 'relative',
    marginLeft: 'auto',
    float: 'right',
    color: '#fff',
    marginRight: '20px',
    height: '20px'

  },
  last100VisualsIcon: {
    marginLeft: 'auto',
    float: 'right',
    color: '#555',
    marginRight: '20px',
    height: '20px'
  },
  last100StockVisContainer: {
    flexGrow: 1,
    position: 'relative',
    top: '-40px'
  }

});

export default styles;
