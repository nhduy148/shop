import React from 'react';
import { connect } from 'react-redux';
import search from '../../../../assets/image/common/search_white.png';
import { searchProducts } from '../../../redux/actions';

let Search = ({ searchItem, onChange }) => {
  // console.log(searchItem);
  return (
    <div className="search" id="search">
      <input type="text" onChange={e => onChange(e)} onClick={e => onChange(e)} />
      <span className="search__icon"><img src={search} alt="Search"/></span>
      <div className="search__result">
        {/* {
          searchItem 
          ?
            searchItem.map((value, i) =>
              <CartList 
              key = {i}
              {...value} />
            )
          :
            <div></div>
        } */}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ searchItem: state.searchItem })
const mapDispatchToProps = (dispatch) => ({
  onChange: (e) => {
    let value = e.target.value
    setTimeout(() => {
      dispatch ( searchProducts ( value ));
    }, 500);
  }
})
Search = connect( mapStateToProps, mapDispatchToProps )( Search )

export default Search;