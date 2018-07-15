import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import * as actionCreators from './store/actions/index';
import thunk from 'redux-thunk'; //async action creator helper
//reducers
import bookClubReducer from './store/reducers/bookClub';
import authReducer from './store/reducers/auth';
//for react routing
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';
//combine all reducers
const rootReducer = combineReducers({
  bc: bookClubReducer,
  auth: authReducer
});
//redux debugging
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//creates store with combined reducer and applys redux debugger helper
//and thunk async action creator middleware
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(actionCreators.loginInit());//check of jwt in local storage
const root = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
