import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategory } from '../../../redux/actions';

class HomeCate extends Component {

  componentWillMount(){
    this.props.getCats();
  }

  render(){
    let { catItem } = this.props;
    return(
      <div className="category">
        {catItem ? catItem.map((cat,key) =>
          <Link
            to={`/products/${cat.categorySlug}`}
            key = {key}
            title={`See all ${cat.categoryName}`}
            className={
              cat.categoryName === "Mobile Phone" 
              ? "category__item cat-phone" : cat.categoryName === "Tablet"
              ? "category__item cat-tablet" : 'category__item cat-latop'
            } >
            <h3 className="category__name">{cat.categoryName}</h3>
          </Link>
        ) 
        : null }
      </div>
    )
  }
}

const mapState = state => {
  return{
    catItem: state.catItem
  }
}

const mapDispatch = dispatch => {
  return{
    getCats: () => {
      dispatch( fetchCategory() )
    }
  }
}

HomeCate = connect( mapState, mapDispatch ) ( HomeCate )

export default HomeCate