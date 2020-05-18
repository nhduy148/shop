import React from 'react';
import ProductItem from '../../general/ProductItem';


const RelatedProducts = ({ relatedItem }) => {
  return(
    <div className="relate-product">
      <div className="pr-details__title">
        <h5>Related Product</h5>
      </div>
      {
        !!relatedItem 
          ? relatedItem.map((value, i) => 
            < ProductItem
              {...value}
              key = {i}
            />
          )
          : <p>Something went wrong. Please try again later !</p>
      }
    </div>
  )
}

export default RelatedProducts;