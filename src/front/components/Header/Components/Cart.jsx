import React, { Component } from 'react';
import { connect } from 'react-redux'
import cart from '../../../../assets/image/common/cart_white.png';
import { getPopup, cartArray } from '../../../redux/actions';

class Cart extends Component {

  componentWillMount(){
    this.props.cartArray();
  }

  render(){
    let { cartArr, showCart, addSuccess } = this.props;

    let totalItem = cartArr ? cartArr.length : 0;

    return (
      <div className="cart">
        <span className="cart__icon _icon" onClick = {showCart}>
          <img src={cart} alt="Cart"/>
          <span className="cart__number">{totalItem}</span>
        </span>
        <div className={`noti${ addSuccess && addSuccess === true  ? ' -show _add' : ''}`}>
          <p><i className="fal fa-check-circle"></i>Added to cart</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cartArr: state.cartArr,
  addSuccess: state.addSuccess,
  addError: state.addError
})

let mapDispatchToProps = (dispatch) => {
  return{
    showCart: () => {
      dispatch( getPopup( 'cart' ) )
    },
    cartArray: () => {
      dispatch( cartArray() )
    }
  }
}

Cart = connect( mapStateToProps, mapDispatchToProps )( Cart )

export default Cart;