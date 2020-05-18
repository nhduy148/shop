import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSidebarItem } from '../../../redux/actions';

class SideBar extends Component{
  constructor(){
    super();

    this.state = {
      activeCat: '',
    }
  }

  componentWillMount(){
    this.props.getSidebarItem();
    let { catSlugIs } = this.props;
    if(!!catSlugIs) this.setState({ activeCat: catSlugIs });
  }

  choiceBrand = (e) => {
    let value = e.currentTarget.getAttribute('data-value')
    this.props.changeBrandID(e, value);
  }

  activeCat = (e, catSlug) => {
    let { activeCat } = this.state;
      activeCat && activeCat === catSlug
        ?
          this.setState({ activeCat: '' })
        :
          this.setState({ activeCat: catSlug })
  }
  
  render(){
    let { filterBrand, filterPrice, sortProducts } = this.props;
    // let { activeCat } = this.state;
    let { catSlugIs, sortSelected } = this.props;
    let { sidebarItem } = this.props;

    let brandArr = !!sidebarItem
    ? sidebarItem.filter(item => item.item === "brand")[0].data
    : null

    let priceArr = !!sidebarItem
    ? sidebarItem.filter(item => item.item === "price")[0].data
    : null

    let categoryArr = !!sidebarItem
    ? sidebarItem.filter(item => item.item === "category")[0].data
    : null
    

    const BrandItem = ({ catName, catSlug, brands }) => {
      const brandItems = brands.filter(brand => brand.categoryName === catName);
      return [
          <li key="all">
            <Link to={`/products/${catSlug}`} data-value={catSlug}>
              <span>All {catName}s</span>
            </Link>
          </li>,
          brandItems.map((brandItem, i) => 
          <li key={i}>
            <a href="/#" onClick={ e => filterBrand(e, brandItem.brandID, brandItem.brand_name) } >
              <span>{brandItem.brand_name}</span>
            </a>
          </li>
        )
      ]
    }

    const PriceItem = ({ priceArr, catSlugIs }) => {
      priceArr = !!catSlugIs && !!priceArr ? priceArr.filter(price => price.type === catSlugIs)[0].data : !!priceArr ? priceArr.filter(price => price.type === "all")[0].data : [];
      
      return !!priceArr ? 
        priceArr.map( (avg, i) =>       
          <li key = {i}><a href="/#" onClick={ e => filterPrice(e, avg.option[0], avg.option[1]) }><span>{avg.option[1]}</span></a></li>
        )
        : <li><span>Something went wrong. Please try again later ! <br/> Thank you !</span></li>
    }

    const CategoryItem = ({ categoryArr, brandArr }) => {
      return !!categoryArr
      ? categoryArr.map((cate, i) =>
          <div className="sidebar__category" key={i}>
            <h5 onClick={ e => this.activeCat(e, cate.catSlug) }>{cate.catName}</h5>
            {/* <ul className={ `${activeCat === cate.catSlug ? '-open' : !!cate.catSlug ? '-close' : '-open' }` } > */}
            <ul className="-open">
              <BrandItem
                catName = {cate.catName}
                catSlug = {cate.catSlug}
                brands = {brandArr}
              />
            </ul>
          </div>
        )
      : <p>Something went wrong.<br /> Please try again later. <br /> Thank you !</p>
    }


    return(
      <div className="sidebar">
        <div className="sidebar__search">
          <input type="text" placeholder="Search Product..." />
          <span className="icon"><i className="fal fa-search"></i></span>
        </div>
        <div className="sidebar__block">
          <div className="sidebar__sorting">
            <p>Sort by</p>
            <select name="sort" id="sort" defaultValue={sortSelected} onChange={(e) => sortProducts(e)}>
              <option value="lastest">Lastest Product</option>
              <option value="name-asc">Name ( A - Z )</option>
              <option value="name-desc">Name ( Z - A )</option>
              <option value="price-desc">Price ( reduce )</option>
              <option value="price-asc">Price ( increase )</option>
            </select>
          </div>
        </div>
        <div className="sidebar__block -cate">
          <CategoryItem
            categoryArr = {categoryArr}
            brandArr = {brandArr}
          />
        </div>
        <div className="sidebar__block">
          <div className="sidebar__price">
            <h5>Price</h5>
            <ul>
              <PriceItem
                catSlugIs = {catSlugIs}
                priceArr = {priceArr}
              />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  sidebarItem: state.sidebarItem
})

const mapDispatch = dispatch => {
  return{
    getSidebarItem: (callback) => {
      dispatch( fetchSidebarItem() );
    },
  }
}

export default SideBar = connect(mapState, mapDispatch)(SideBar);



