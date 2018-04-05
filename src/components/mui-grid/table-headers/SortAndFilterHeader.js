import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import Input from 'material-ui/Input';

class SortAndFilterHeader extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  createFilterHandler = name => event => {
    this.props.onRequestFilter(event, name);
  };

  render() {
    const { order, orderBy, classes, columnData } = this.props;

    return (
      <TableHead>
        <TableRow className={classes.nasdaqHeader}>
          <TableCell padding="dense">
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell padding="dense" className={classes.nasdaqHeaderText}
                key={column.id}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip classes={{ root: classes.headerToolTip}}
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    <div>
                      {column.label}
                    </div>
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
        <TableRow className={classes.nasdaqFilters}>
          <TableCell padding={'dense'}>
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell className={classes.nasdaqDataCells} padding={'dense'} key={column.id}>
                <Input className={classes.input}
                  placeholder="Filter..."
                  onChange={this.createFilterHandler(column.id)}
                />
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

SortAndFilterHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onRequestFilter: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  columnData: PropTypes.array.isRequired
};

export default SortAndFilterHeader
