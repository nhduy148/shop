import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import './index.scss';

import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './front/redux/reducers';

// Component
import Home from './front/components/Home';
import ArchiveProducts from './front/components/ArchiveProducts';
import ArchiveBlogs from './front/components/ArchiveBlogs';
import Page404 from './front/components/Page404';
import ProductDetails from './front/components/ProductDetails';
import BlogDetails from './front/components/BlogDetails';
import Admin from './admin/Admin';
import Shopping from './front/components/Shopping';

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={ArchiveProducts}/>
        <Route exact path='/products/:cat' component={ArchiveProducts}/>
        <Route exact path='/blogs' component={ArchiveBlogs}/>
        <Route exact path='/checkout' component={Shopping}/>
        <Route path='/product/:id' component={ProductDetails}/>
        <Route path='/blog/:id' component={BlogDetails}/>
        <Route path='/admin' component={Admin}/>
        <Route path='*' component={Page404} />
      </Switch>
    </BrowserRouter>
  </Provider >
  ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register(); //Work offline
// serviceWorker.unregister(); //Work online
