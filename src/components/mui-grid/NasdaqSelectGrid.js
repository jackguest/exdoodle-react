import React from 'react';
import PropTypes from 'prop-types';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import * as dataParsers from '../../utils/dataParsers'
import SortAndFiltersHeader from './table-headers/SortAndFilterHeader'
import Typography from 'material-ui/Typography'
import Tooltip from 'material-ui/Tooltip'

class NasdaqSelectGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'Symbol',
      selected: dataParsers.getSelectedStockSymbols(props.stockData.selectedStocks),
      data: dataParsers.createNasdaqShortInfo(props.nasdaq).sort((a, b) => (a.Symbol < b.Symbol ? -1 : 1)),
      page: 0,
      rowsPerPage: 10
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleRequestFilter = (event, name) => {
    let vSet = '', nSet = '';

    let data = this.state.data.filter((el) => {
      nSet = el[name].toLowerCase();
      vSet = event.target.value.toLowerCase();
      return nSet.indexOf(vSet) !== -1;
    });

    if(data.length !== this.props.nasdaq.length &&
      (event.target.value === '' ||
       event.target.value === 'undefined' ||
       event.target.value ===  null)) {
      data = dataParsers.createNasdaqShortInfo(this.props.nasdaq);
    }

    this.setState({ data });
  };

  handleClick = (event, id ) => {
    const selected = this.props.selectedSymbols;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
    this.props.stockSelector(newSelected, id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.props.selectedSymbols.indexOf(id) !== -1;

  render() {
    const { classes, columnData, selectedSymbols } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <SortAndFiltersHeader
              columnData={columnData}
              classes={classes}
              numSelected={selectedSymbols.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              onRequestFilter={this.handleRequestFilter}
              rowCount={data.length}
            />
            <TableBody>
              {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow className={classes.nasdaqRows}
                    hover
                    onClick={event => this.handleClick(event, n.Symbol)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.Symbol}
                    selected={isSelected}
                  >
                    <TableCell className={classes.denseCheckBox} padding="none">
                      <Checkbox  className={classes.denseCheckBox} color="primary" checked={isSelected} />
                    </TableCell>
                    <TableCell className={classes.nasdaqDataCells} padding="none">
                      <Typography>{n.Symbol}</Typography>
                    </TableCell>
                    <TableCell className={classes.nasdaqDataCells} padding="none">
                      <Tooltip title={n.Name} placement='top-start'>
                        <Typography noWrap={true}>{n.Name}</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={classes.nasdaqDataCells} padding="none">
                      <Tooltip title={n.Sector} placement='top-start'>
                        <Typography noWrap={true}>{n.Sector}</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={classes.nasdaqDataCells} padding="none">
                      <Tooltip title={n.industry} placement='top-start'>
                        <Typography noWrap={true}>{n.industry}</Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={2} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={2}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

NasdaqSelectGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  nasdaq: PropTypes.array.isRequired,
  columnData: PropTypes.array.isRequired,
  stockSelector: PropTypes.func.isRequired,
  selectedSymbols: PropTypes.array.isRequired,
  stockData: PropTypes.object.isRequired
};

export default NasdaqSelectGrid;
