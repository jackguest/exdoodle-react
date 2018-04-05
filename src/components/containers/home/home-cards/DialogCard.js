import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const DialogCard = ({nasdaq, classes, loadNasdaq, loading}) => {

  return (
    <Grid item xs={12} style={{marginBottom: '6px'}}>
      <Card className={classes.card}>
        {nasdaq &&
          nasdaq.length === 0 &&
          <CardContent>
            <Typography variant="headline" className={classes.margins}>Getting Started</Typography>
            <Typography>
              Load the
              <span onClick={loadNasdaq} className={classes.inTextLink}>  NASDAQ/NYSE Stock Exchange
                Company list. </span> After selecting one or more stocks you can doodle.
            </Typography>
            <Typography>

            </Typography>
          </CardContent>
        }
        { loading &&
          <CardContent>
            <Typography variant="headline" className={classes.margins}>Loading Stock List...</Typography>
            <Typography component="p">
              The list is large... Stand By.</Typography>
          </CardContent>
        }
        {nasdaq &&
          nasdaq.length > 0 &&
          loading === false &&
            <CardContent style={{padding: '0px'}}>
              {/*<Typography variant="headline" className={classes.margins}>Getting Started ... Continued</Typography>*/}
              <Typography style={{padding: '3px'}}>There are
                <span className={classes.stockCount}> { nasdaq.length }</span> stocks in the list.
                You may filter on any column.  After selecting a stock a panel with some detail is available.
              </Typography>
            </CardContent>
        }
      </Card>
    </Grid>
  );
};

DialogCard.propTypes = {
  nasdaq: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  loadNasdaq: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

DialogCard.defaultProps = {
  nasdaq: []
}

export default DialogCard

