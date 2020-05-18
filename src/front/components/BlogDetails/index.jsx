import React, { Component } from 'react';
import Header from '../Header'
import Popup from '../Popup'
import Details from './Details'
import Footer from '../Footer'

export default class BlogDetails extends Component {

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