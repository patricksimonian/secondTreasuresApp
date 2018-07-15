import React, {Component} from 'react';
import Aux from '../../hoc/auxillary/auxillary';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
//styles
import classes from './Layout.css';

class Layout extends Component {
  static displayName = "[Component Main Layout]";
  state = {
    showSideDrawer: false
  }

  SideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  SideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true});
  }

  render() {
    return (
      <Aux>
        <Toolbar isAuthorized={this.props.isAuthorized} sideDrawerOpen={this.SideDrawerOpenHandler}/>
        <SideDrawer isAuthorized={this.props.isAuthorized} open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized
  };
}
const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
