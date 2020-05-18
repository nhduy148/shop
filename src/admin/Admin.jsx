import React, { Component } from 'react';
import Dashboard from './Dashboard';
import ManangeProducts from './ManageProducts';
// import Page404 from '../front/components/Page404'
import { Redirect, Route } from 'react-router-dom';
import Cookie from 'js-cookie';


class Admin extends Component {

  // componentWillMount(){
  //   this.props.checkIsAdmin();
  // }

  // componentDidMount(){
  //   this.props.checkIsAdmin();
  // }

  render() {
    
    let isAuthenticated = Cookie.get("iA");

    return isAuthenticated === "0"
    ?
      <Route
        path="/admin"
        render={ 
          ({ match: { url } }) => [
            <Route key="Dashboard" path={`${url}/`} component={Dashboard} exact />,
            <Route key="ManangeProducts" path={`${url}/products`} component={ManangeProducts} />,
            // <Route path={`${url}/*`} component={Page404} />
          ]
        }
      />
    : <Redirect to='/' />
    
  }
}

// const mapState = state => {
//   return{
//     isAdmin: state.isAdmin
//   }
// }

// const mapDispatch = dispatch => {
//   return{ 
//     checkIsAdmin: () => {
//       dispatch( checkIsAdmin() );
//     }
//   }
// }


export default Admin /* = connect( mapState, mapDispatch ) ( Admin )*/;