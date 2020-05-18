import React from 'react';

import Logo from '../Header/Components/Logo';
import Nav from '../Header/Components/Nav';

export default function Footer() {

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Logo />
          <Nav />
        </div>
        <div className="footer__bottom l-flex">
          <div className="footer__col">
            <p className="copyright"><span className="name">SpaceD</span> @ Copyright 2019</p>
          </div>
          <div className="footer__col">
            <div className="footer__social">
              <ul className="footer__social-icons list-unstyled">
                <li>
                  <a className="icon facebook" target="_blank" rel="noopener noreferrer" href="https://facebook.com">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a className="icon linkedin" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a className="icon instagram" target="_blank" rel="noopener noreferrer" href="https://instagram.com">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a className="icon youtube" target="_blank" rel="noopener noreferrer" href="https://youtube.com">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a className="icon rss" target="_blank" rel="noopener noreferrer" href="/#">
                    <i className="fas fa-rss"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}