import React, {Component} from 'react';
import Aux from '../../hoc/auxillary/auxillary';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
//styles
import classes from './Layout.css';

class Layout extends Component {
  static displayName = "Main Layout";
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
        <Toolbar sideDrawerOpen={this.SideDrawerOpenHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}



export default Layout;
