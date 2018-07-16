import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch} from 'react-router-dom';


//components/containers
import BookClub from './containers/BookClub/BookClub';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import AddBook from './containers/BookClub/AddBook/AddBook';
//code split checkout since it won't be used initially


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/books/create" component={AddBook} />
            <Route path="/" component={BookClub} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
