import React, { Component } from 'react';
import CartList from './Components/CartList';
import WishList from './Components/WishList';
import UserAction from './Components/UserAction';
import ProductView from './Components/ProductView';
import Account from './Components/Account';

export default class Popup extends Component {
  render(){
    return (
      <section className="popup-side">
        <CartList />
        <WishList />
        <UserAction/>
        <ProductView />
        <Account />
      </section>
    )
  }
}