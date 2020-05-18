import React, { Component } from 'react';

import Blogs from './Blogs'
import Header from '../Header'
import Popup from '../Popup';
import Footer from '../Footer';


class ArchiveBlogs extends Component {
  render(){
    return[
      <Header key="Header" />,
      <main key="Main">
        <Blogs key="Blogs" />
        <Popup key="PopUp" />
      </main>,
      <Footer key="Footer" />
    ]
  }
}

export default ArchiveBlogs;