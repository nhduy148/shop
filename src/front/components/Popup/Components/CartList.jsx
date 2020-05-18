import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateQuantityCart, deleteCartItem, fetchCart, getPopup } from '../../../redux/actions';
import Popup from '../Popup';

class CartList extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit: false,
      isDelete: false,
      currentIDEdit: null,
      quantityUpdate: null
    }
  }

  componentWillMount(){
    this.props.fetchCart();
  }

  quantityOnChange = e => {
    let quantity = e.target.value;
    this.setState({ quantityUpdate: quantity })
  }

  editCart = (i) => {
    this.setState({ isEdit: true })
    this.setState({ isDelete: false })
    this.setState({ currentIDEdit: i })
  }
  deleteCart = (i) => {
    this.setState({ isDelete: true })
    this.setState({ isEdit: false })
    this.setState({ currentIDEdit: i })
  }
  cancelCart = (e) => {
    this.setState({
      isEdit: false,
      isDelete: false,
      currentIDEdit: null,
      quantityUpdate: null
    })
    e.target.closest('.cart__item').querySelector('#quantity').value = null
  }
  confirmEditCart = (e, productID) => {
    this.setState({ isEdit: false })
    this.setState({ isDelete: false })
    this.setState({ currentIDEdit: null })

    let quantity = this.state.quantityUpdate;
    this.props.updateQuantity(productID, quantity)

    e.target.closest('.cart__item').querySelector('#quantity').value = null
  }
  confirmDeleteCart = (cartID, proID) => {
    this.setState({ isEdit: false })
    this.setState({ isDelete: false })
    this.setState({ currentIDEdit: null })

    this.props.deleteCartItem(cartID, proID)
  }

  render(){
    let { cartItem, popupName } = this.props;
    let { isEdit, isDelete, currentIDEdit } = this.state;
    let totalItem = cartItem ? cartItem.length : 0;
    let totalPrice = 0;
    for( let i = 0; i < totalItem; i++){
      totalPrice += (cartItem[i].product_price * cartItem[i].quantity)
    }
    let { closeCart } = this.props;
    let showPopup = !!popupName && popupName === 'cart' ? true : false;

    return(
      <Popup head="Cart" showPopup={showPopup}>
        <div className="cart__list">
          {
            !!cartItem && cartItem.length > 0 ?
              cartItem.map((value, i) =>
                <div key={i} 
                  className={`cart__item${isEdit && currentIDEdit === i ? ' -editing' : isDelete && currentIDEdit === i ? ' -deleting' : '' }`}>
                  <div className="image">
                    <Link to={`/product/${value.productID}`} onClick={e => closeCart(e)}>
                      <img src={value.product_image} alt={value.product_name} />
                    </Link>
                  </div>
                  <div className="info">
                    <Link to={`/product/${value.productID}`} onClick={e => closeCart(e)}>
                      <h5 className="name"><span className="title">Name: </span>{value.product_name}</h5>
                    </Link>
                    <p className="price"><span className="title">Price: </span>{value.product_price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND</p>
                    <div className="bottom">
                      <p>
                        <span className="title">Quantity: </span>
                        <input 
                          type="number" 
                          name="quantity" 
                          id="quantity" 
                          className={`quantity`} 
                          placeholder={value.quantity} 
                          // value={value.quantity}
                          readOnly={isEdit === false ? "readOnly" : null}
                          onChange={ (e) => this.quantityOnChange(e) }
                        />
                      </p>
                      <div className="action">
                        <span className="edit" onClick={ (e) => this.editCart(i) }><i className="fal fa-pencil-alt"></i></span>
                        <span className="delete" onClick={ () => this.deleteCart(i) }><i className="fal fa-trash-alt"></i></span>
                      </div>
                    </div>
                  </div>
                  <div className="confirm">
                    {isEdit ? 
                      <span className="button save" onClick={(e) => this.confirmEditCart(e, value.productID)}>Save</span>
                    : isDelete ?
                      <span className="button deleted" onClick={() => this.confirmDeleteCart(value.cartID, value.productID)}>Delte</span>
                    : null
                    }
                    <span className="button cancel" onClick={(e) => this.cancelCart(e)}>Cancel</span>
                  </div>
                </div>
              )
            : <div className="cart__empty">Empty</div>
            }
          </div>
        <div className="cart__total">
          {/* <span className="item">{totalItem} items</span> */}
          <p className="total">Grand Total <span className="total_price">{totalPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND</span></p>
          <a href="/checkout" className="checkout-btn">Check Out</a>
        </div>
      </Popup>
    )
  }
}

const mapState = state => {
  return{
    cartItem: state.cartItem,
    popupName: state.popupName,
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
    fetchCart: () => {
      dispatch(fetchCart())
    },
    closeCart: () => {
      dispatch( getPopup( null ) )
    },
    outSideCloseCart: (e) => {
      if(e.target === e.currentTarget){
        dispatch( getPopup( null ) )
      }
    }
  }
}

export default CartList = connect(mapState, mapDispatch) (CartList);