import React, { Component } from 'react';

import Header from '../Header';
import MainVisual from './Components/MainVisual';
import LastestProducts from './Components/LastestProducts';
import HomeCate from './Components/Category';
import FeaturedProducts from './Components/FeaturedProducts';
import Blogs from './Components/Blogs';
import Brands from './Components/Brands';
import Footer from '../Footer';
import Popup from '../Popup';
import PageLoading from '../general/PageLoading';

import { connect } from 'react-redux';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
    }
  }
  
  componentWillReceiveProps(){    
    let { lastestRes, featureRes, blogRes, catRes, /*brandRes*/ } = this.props;
    if(
        lastestRes === true 
        && featureRes === true 
        && blogRes === true 
        && catRes === true 
        // && brandRes === true
      ) {
        setTimeout(() => {
          this.setState({ loading: false })
        }, 200);
      }
  }

  componentWillMount(){ 
    let { lastestRes, featureRes, blogRes, catRes, /*brandRes*/ } = this.props;
    // console.log(this.props);
    if(
        lastestRes === true 
        && featureRes === true 
        && blogRes === true 
        && catRes === true 
        // && brandRes === true
      ) {
        setTimeout(() => {        
          window.scrollTo(0, 0)
          this.setState({ loading: false })
        }, 200);
      }
  }


  render() {
    let { loading } = this.state;
    return [
      <Header key= "Header" />,
      <main key="Main">
        <section className="home" key= "Home">
          <PageLoading loading = {loading} />
          <MainVisual />
          <LastestProducts />
          <HomeCate />
          <FeaturedProducts />
          <Blogs />
          <Brands />
        </section>
        <Popup key="PopUp" />
      </main>,
      <Footer key="Footer" />,
    ]
  }
}

const mapStateToProps = state => {
  return{
    cartRes: state.cartRes,
    lastestRes: state.lastestRes,
    featureRes: state.featureRes,
    wishRes: state.wishRes,
    blogRes: state.blogRes,
    catRes: state.catRes,
    brandRes: state.brandRes,
  }
}

export default Home  = connect( mapStateToProps, null )( Home );
