import React from 'react';

const Step = ({stepFixed}) => {
  return(
    <div className="shop__tabs">
      <ul>
        <li>
          <p className="active">
            <span>01</span>
            Shopping cart
          </p>
        </li>
        <li>
          <p>
            <span>02</span>
            Checkout
          </p>
        </li>
        <li className="active">
          <p>
            <span>03</span>
            Order complete
          </p>
        </li>
      </ul>
    </div>
  )
}

export default Step;