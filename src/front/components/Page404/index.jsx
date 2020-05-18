import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Popup from '../Popup';
import errorImage from '../../../assets/image/common/error.jpg'

export default class Page404 extends Component {

  render() {
    return [
      <Header key="Header" fixHeader={true} />,
      <main key="Main">
        <div className="page404" key="404">
          <div className="page404__wrapper">
            <div className="error-404 box-shadow">
              <img src={errorImage} alt="" />
              <div className="go-to-btn btn-hover-2">
                <a href="/">go to home page</a>
              </div>
            </div>
          </div>
        </div>
        <Popup key="PopUp" />,
      </main>,
      <Footer key="Footer" />,
    ]
  }
}
