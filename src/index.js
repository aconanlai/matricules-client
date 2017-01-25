import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import App from './App';
import Document from './Components/Document/Document';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
    <Route path="/document/:id" component={Document}>
    </Route>
    <Route path="*" component={App} />
  </Router>,
  document.getElementById('root'),
);
