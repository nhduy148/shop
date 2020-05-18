import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuantityCart, deleteCartItem, fetchCart } from '../../redux/actions';

import Step from './Components/Step';
import Cart from './Components/Cart';
import Header from '../Header'
import Popup from '../Popup'
import Footer from '../Footer'

class Shopping extends Component {

  componentWillMount(){
    this.props.fetchCart();
  }

  render(){

    let { cartItem } = this.props;

    cartItem = !!cartItem ? cartItem : [];

    return [
      <Header key="Header" fixHeader={true} />,
      <main key="Main">
        <section className="shop">
          <div className="container">
            <div className="shop__box">
              <Step/>
              <Cart cartItem={cartItem} />
            </div>
          </div>
        </section>
        <Popup key="PopUp" />
      </main>,
      <Footer key="Footer" />
    ]
  }
}


const mapState = state => {
  return{
    cartItem: state.cartItem,
  }
}

const mapDispatch = dispatch => {
  let accessKey = localStorage.getItem("currentUser");
  return{
    updateQuantity: (productID, quantity) => {
      dispatch( updateQuantityCart(productID, quantity, accessKey ) )
      dispatch(fetchCart())
    },
    deleteCartItem: (cartID, proID) => {
      dispatch( deleteCartItem( cartID, accessKey, proID ) )
      dispatch(fetchCart())
    },
    fetchCart: (cb) => {
      dispatch(fetchCart())
    },
  }
}
export default Shopping = connect( mapState, mapDispatch ) ( Shopping );