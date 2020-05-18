import React, { Component } from 'react';
import Nav from './Components/Nav';
import NavIcon from './Components/NavIcon';
import Logo from './Components/Logo';

export default class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      fixHeader: null,
    }
  }

  componentDidMount(){
      this.setFixedHeader();
  }

  setFixedHeader = () => {
    
    let { fixHeader } = this.props;
    fixHeader = !!fixHeader ? fixHeader : false

    if(!!fixHeader && fixHeader){
      fixHeader = true;
      this.setState({ fixHeader })
    }
    else {
      window.addEventListener("scroll", () => {
        let doc = document.documentElement;
        let top = ( window.pageYOffset || doc.scrollTop )  - ( doc.clientTop || 0 );
        top > 50 ? this.setState({ fixHeader: true }) : this.setState({ fixHeader: false });
      })
    }

  }
  
  render() {
    let { fixHeader } = this.state;
    return (
      <header className={`header ${fixHeader === true ? '_fixed' : '' }`}>
        <div className="inner">
          <Logo />
          <Nav />
          <NavIcon />
        </div>
      </header>
    );
  }
}