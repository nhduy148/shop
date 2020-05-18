import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeaturedProducts } from '../../../redux/actions';
import ProductItem from '../../general/ProductItem'

export default class FeaturedProducts extends Component{
  componentWillMount(){
    this.props.fetchFeaturedProducts();
  }

  render() {
    let { featureItem } = this.props;
    return(
      <div className="feature">
        <div className="c-title">
          <h3 className="c-title__main">Feature Product</h3>
          <span className="c-title__sub">Pick the most popular products from us. May you love them!</span>
        </div>
        <div className="inner">
          {/* <div className="feature__tabs">
            {this.props.categories.map((value, key) =>
              <div className="tabs_category" key = {key}>
                <p>{value.categoryName}</p>
              </div>
            )}
          </div> */}
          <div className="feature__content">
            {
              featureItem 
              ? 
                featureItem.map((value, i) => 
                <ProductItem
                  key={i}
                  {...value}
                />)
              : null 
            }
          </div>
        </div>
      </div>
    )
  }
}

// export let FeaturedProducts = ({ featureItem }) => {
//   // console.log(featureItem);
//   return (
//     <div className="feature">
//       <div className="c-title">
//         <h3 className="c-title__main">Feature Product</h3>
//         <span className="c-title__sub">Pick the most popular products from us. May you love them!</span>
//       </div>
//       <div className="inner">
//         {/* <div className="feature__tabs">
//           {this.props.categories.map((value, key) =>
//             <div className="tabs_category" key = {key}>
//               <p>{value.categoryName}</p>
//             </div>
//           )}
//         </div> */}
//         <div className="feature__content">
//           {
//             featureItem 
//             ? 
//               featureItem.map((value, i) => 
//               <ProductItem
//                 key={value.productID}
//                 {...value}
//               />)
//             :
//               <h5>NO</h5>
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

const mapStateToProps = (state) => ({ featureItem: state.featureItem })
const mapDispatchToProps = dispatch => ({
  fetchFeaturedProducts: () => dispatch(fetchFeaturedProducts())
})
FeaturedProducts = connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts)