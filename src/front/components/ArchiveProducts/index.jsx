import React, { Component } from 'react';
//Component
import Header from '../Header'
import Products from './Products'
import Popup from '../Popup';
import Footer from '../Footer';



class ArchiveProducts extends Component {

  render() {
    let params = this.props.match.params.cat
    return [
      <Header key="Header" />,
      <main key="Main">
        <Products key="ArchiveProducts" params = {params} />
        <Popup key="PopUp" />
      </main>,
      <Footer key="Footer" />
    ]
  }
}


export default ArchiveProducts;