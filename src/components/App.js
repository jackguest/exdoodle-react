/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import HomePage from './containers/home/HomePage';
import AboutPage from './AboutPage';
import StockConfigurationPage from './containers/stock-config/StockConfigurationPage';
import NotFoundPage from './NotFoundPage';
import ButtonAppBar from './ButtonAppBar'
import 'typeface-roboto'
import AppBar from 'material-ui/AppBar'
import {withStyles} from "material-ui/styles/index";
import Button from 'material-ui/Button'
import styles from './styles'

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ButtonAppBar/>
        <AppBar position="static" color="default" className={classes.bar}>
          <div className={classes.flex}>
            <Button component={NavLink} exact to="/" activeStyle={activeStyle}>Home</Button>
            <Button component={NavLink} to="/stock-config" activeStyle={activeStyle}>doodle</Button>
            <Button component={NavLink} to="/about" activeStyle={activeStyle}>About</Button>
          </div>
        </AppBar>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/stock-config" component={StockConfigurationPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
