import React, { Component } from 'react';

//Component
import Header from '../Header'
import Popup from '../Popup'
import Details from './Details'
import Footer from '../Footer'


class ProductDetails extends Component {

  render() {
    return [
      <Header key="Header" fixHeader={true} />,
      <main key="Main">
        <Details key="Details" match={this.props.match} />,
        <Popup key="PopUp" />,
      </main>,
      <Footer key="Footer" />
    ]
  }
}


export default ProductDetails;