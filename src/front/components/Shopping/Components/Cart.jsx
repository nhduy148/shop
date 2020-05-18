import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItem }) => {
  let subTotalArr = cartItem.length > 0 ? cartItem.map( cart => cart.product_price * cart.quantity ) : null;
  const defShipping = 15000;
  const cartTotal = !!subTotalArr ? subTotalArr.reduce( (acc, curVal) => acc + curVal ) : 0;
  let orderTotal = cartTotal + defShipping;

  return (
    <div className="shop__contents">
      <div className="al-cart">
        <table className="al-cart__tb">
          <thead>
            <tr>
              <th>image</th>
              <th>product</th>
              <th>price</th>
              <th>Quantity</th>
              <th>sub total</th>
              <th>remove</th>
            </tr>
          </thead>
          <tbody>
            {
              cartItem.map((item, index) => {
                let subtotal = item.product_price * item.quantity;
                return (
                  <tr key={index}>
                    <td className="al-cart__thumb">
                      <img src={item.product_image} alt={item.product_name} />
                    </td>
                    <td className="al-cart__name">
                      <p><Link to={`product/${item.productID}`}>{item.product_name}</Link></p>
                    </td>
                    <td className="al-cart__price">{item.product_price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND</td>
                    <td className="al-cart__quantity">
                      <input type="text" placeholder={item.quantity} name="qtybutton" className="cart-plus-minus-box" />
                    </td>
                    <td className="al-cart__subtotal">{subtotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND</td>
                    <td className="al-cart__remove">
                      {/* <p>
                        <span><i className="fal fa-pencil-alt"></i></span>
                        <span><i className="fal fa-times"></i></span>
                      </p> */}
                      <span className="edit"><i className="fal fa-pencil-alt"></i> Edit</span>
                      <span className="delete"><i className="fal fa-times"></i> Delete</span>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className="payment">
        <div className="payment__col coupon">
          <h6 className="payment__title">coupon discount</h6>
          <p>Enter your coupon code if you have one!</p>
          <input type="text" name="name" placeholder="Enter your code here." />
          <button className="submit-btn-1 black-bg btn-hover-2" type="submit">apply coupon</button>
        </div>
        <div className="payment__col details">
          <h6 className="payment__title">payment details</h6>
          <table>
            <tbody>
              <tr>
                <td className="td-title-1">Cart Total</td>
                <td className="td-title-2">{cartTotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND</td>
              </tr>
              <tr>
                <td className="td-title-1">Shipping</td>
                <td className="td-title-2">{defShipping.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND</td>
              </tr>
              <tr>
                <td className="td-title-1">Discount</td>
                <td className="td-title-2">0 VND</td>
              </tr>
              <tr>
                <td className="order-total">Order Total</td>
                <td className="order-total-price">{orderTotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND</td>
              </tr>
            </tbody>
          </table>
          <div className="payment__checkout">
            <button className="submit-btn-1 black-bg btn-hover-2" type="submit">checkout</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
    
export default Cart;