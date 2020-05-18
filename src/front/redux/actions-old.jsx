export const ALL_PRODUCT = 'ALL_PRODUCT';
export const FEATURE_PRODUCT = 'FEATURE_PRODUCT';
export const FETCH_CART = 'FETCH_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const WISHLIST = 'WISHLIST';
export const ADD_WISHLIST = 'ADD_WISHLIST';
export const WISHLIST_ARRAY = 'WISHLIST_ARRAY';
export const LASTEST_PRODUCT = 'LASTEST_PRODUCT';
export const RELATED_PRODUCT = 'RELATED_PRODUCT';
export const FIND_PRODUCT = 'FIND_PRODUCT';
export const PRODUCT_VIEW = 'PRODUCT_VIEW';
export const PRODUCT_DETAILS = 'PRODUCT_DETAILS';
export const GET_USERNAME = 'GET_USERNAME';
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const VALIDATION_REGISTER = 'VALIDATION_REGISTER';
export const USER_INFO = 'USER_INFO';
export const GET_BLOG = 'GET_BLOG';
export const GET_BRANDS = 'GET_BRANDS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SIDEBAR_FILTER = 'SIDEBAR_FILTER';
export const SHOW_POPUP = 'SHOW_POPUP';

export const showPopup = popupName => ({
  type: SHOW_POPUP,
  popupName,
})

export function getPopup(popupName){
  return function(dispatch){
    dispatch( showPopup(popupName) )
  }
}

export const getCats = (catItem, catRes) => {
  return{
    type: GET_CATEGORIES,
    catItem,
    catRes
  }
}

export const getBrands = (brandItem, brandRes) => {
  return {
    type: GET_BRANDS,
    brandItem,
    brandRes
  }
}

export const allProducs = (allItem, allItemRes, allstrError) => ({
  type: ALL_PRODUCT,
  allItem,
  allItemRes,
  allstrError,
})

export const relatedProduct = (relatedItem) => {
  return{
    type: RELATED_PRODUCT,
    relatedItem,
  }
}

export function fetchRelatedProduct(prodID){
  let query = 
  `(SELECT product_name, product_price, product_image FROM products 
    WHERE product_price <= (SELECT product_price FROM products WHERE productID=${prodID}) 
    AND productID <> ${prodID} 
    AND catSlug = (SELECT catSlug FROM products WHERE productID=${prodID})
    ORDER BY product_price DESC limit 2)
  UNION
  (SELECT product_name, product_price, product_image FROM products 
    WHERE product_price > (SELECT product_price FROM products WHERE productID=${prodID}) 
    AND productID <> ${prodID} 
    AND catSlug = (SELECT catSlug FROM products WHERE productID=${prodID})
    ORDER BY product_price ASC limit 2);`
    
  // `(SELECT * FROM products 
  //   WHERE product_price <= (SELECT product_price FROM products WHERE productID=${prodID}) 
  //   AND productID <> ${prodID} 
  //   AND catID = (SELECT catID FROM products WHERE productID=${prodID})
  //   ORDER BY product_price DESC limit 2)
  // UNION
  // (SELECT * FROM products 
  //   WHERE product_price > (SELECT product_price FROM products WHERE productID=${prodID}) 
  //   AND productID <> ${prodID} 
  //   AND catID = (SELECT catID FROM products WHERE productID=${prodID})
  //   ORDER BY product_price ASC limit 2);`
  
  return function(dispatch){
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: query
    })
    .then( res => res.json())
    .then( relatedItem => {
      dispatch( relatedProduct(relatedItem) )
    })
  }
}

export const lastestProducts = ( lastestItem, newProduct, lastestRes ) => ({
  type: LASTEST_PRODUCT,
  lastestItem,
  newProduct,
  lastestRes
});

export const featuredProducts = (featureItem, featureRes) => ({
    type: FEATURE_PRODUCT,
    featureItem,
    featureRes
});

export const carts = ( cartItem, cartID, cartRes) => ({
    type: FETCH_CART,
    cartItem,
    cartID,
    cartRes,
});

export const actionAddToCart = ( addError, addSuccess ) => ({
  type: ADD_TO_CART,
  addError,
  addSuccess,
})

export const wishlist = (wishlistItem, wishRes) => {
  return {
    type: WISHLIST,
    wishlistItem,
    wishRes
  }
}

export const productInWishlist = (wishArr) => {
   return {
     type: WISHLIST_ARRAY,
     wishArr,
   }
}

export const actionWishlist = ( addWishStatus, removeWishStatus ) => {
  return{
    type: ADD_WISHLIST,
    addWishStatus,
    removeWishStatus
  }
}

export const productView = ( viewItem, showView = false ) => ({
  type: PRODUCT_VIEW,
  viewItem,
  showView,
})

export const productDetails = ( productItem ) => ({
  type: PRODUCT_DETAILS,
  productItem,
})

export const findProducts = searchItem => ({
    type: FIND_PRODUCT,
    searchItem,
});

export const getUsername = ( getUsername, hasUsername, getUsernameSuccess, getUsernameError ) => ({
  type: GET_USERNAME,
  getUsername,
  hasUsername,
  getUsernameSuccess,
  getUsernameError
})

export const loginAction = ( loginSuccess, loginError ) => ({
  type: LOGIN_ACTION,
  loginSuccess,
  loginError
})

export const validationRegister = ( userError, emailError, phoneError ) => ({
  type: VALIDATION_REGISTER,
  userError,
  emailError,
  phoneError
})

export const userInformation = ( userID, userName, userLName, userInfo ) => ({
  type: USER_INFO,
  userID,
  userName,
  userLName,
  userInfo,
})

export const blogList = (blogList, blogRes) => ({
  type: GET_BLOG,
  blogList,
  blogRes,
})

export const dataSideBar = sideBarProductFilter => ({
  type: SIDEBAR_FILTER,
  sideBarProductFilter,
})


export function wishlistArray() {
  return function(dispatch){
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: 'select proID from wishlist'
    })
    .then( res => res.json() )
    .then( wishArr => { 
      let wishlistArr = wishArr.map( item => item.proID )
      // console.log(wishlistArr);
      dispatch( productInWishlist( wishlistArr ) ) 
    } )
  }
}

export function fecthAllProduct() {
  return function(dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: 
      `SELECT count(*) over() as total, productID, product_image, product_name, product_price, wishlist.wishID FROM products LEFT JOIN wishlist ON products.productID = wishlist.proID ORDER BY date_create DESC LIMIT 0, 9`
    })  
    .then( response => response.json())
    .catch( error => { dispatch( allProducs( null, false, 'Something went wrong! '+error ) ) } )
    .then( allItem => { dispatch( allProducs( allItem, true, null ) ) } )
  }
}

export function fetchProductByCat(cat) {
  return function(dispatch){
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: 
      `SELECT count(*) over() as total, productID, product_image, product_name, product_price, wishlist.wishID FROM products LEFT JOIN wishlist ON products.productID = wishlist.proID WHERE catSlug='${cat}' ORDER BY date_create DESC LIMIT 0, 9`
    })  
    .then( 
      response => response.json(),
      error => console.log(error)
    )
    .catch( error => { dispatch( allProducs( null, false, 'Something went wrong! '+error ) ) } )
    .then( allItem => { dispatch( allProducs( allItem, true, null ) ) } )
  }
}

// export function fetchProductByCat(catName) {
//   let selectatID = `SELECT categoryID FROM categories WHERE categorySlug='${catName}'`
//   return function(dispatch){
//     fetch("http://localhost:5000/custom", {
//       method: 'POST',
//       body: selectatID,
//     })  
//     .then( response => response.json())
//     .then( catID => {
//       return fetch("http://localhost:5000/custom", {
//         method: 'POST',
//         body: `SELECT *, count(*) over() as total from products WHERE catID=${catID[0].categoryID} ORDER BY date_create DESC LIMIT 0, 9`
//       })  
//       .then( response => response.json())
//       .then( allItem => {
//         dispatch( allProducs( allItem, false ) )
//       } )
//     } )
//   }
// }

export function fetchCategory(){
  return function(dispatch){
    return fetch("http://localhost:5000/custom" ,{
      method: "POST",
      body: "SELECT * FROM categories"
    })
    .then( res => res.json() )
    .then( result => dispatch( getCats( result, true ) ) )
  }
}

export function fetchBrands(){
  return function(dispatch){
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: "SELECT * FROM brands"
    })
    .then( res => res.json() )
    .then( result => dispatch( getBrands(result, true) ))
  }
}

export function fetchLastestProduct() {
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: `SELECT productID, product_image, product_name, product_price, wishlist.wishID FROM products LEFT JOIN wishlist ON products.productID = wishlist.proID ORDER BY date_create DESC LIMIT 0, 8`
    })
    .then(
      response => response.json(),
      error => console.log(error),
    )
    .then( (lastestItem) => {
      dispatch( lastestProducts( lastestItem, true, true ) );
      // console.log( lastestProducts ( lastestItem ) );
    },
   );
  };
}

export function fetchFeaturedProducts() {
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: `SELECT productID, product_image, product_name, product_price, wishlist.wishID FROM products LEFT JOIN wishlist ON products.productID = wishlist.proID ORDER BY product_price DESC, date_create DESC LIMIT 0, 12`
    })
    .then(
      response => response.json(),
      error => console.log(error),
    )
    .then((featureItem) => {
      dispatch( featuredProducts( featureItem, true ) );
      // console.log(  featureItem  );
    },
   );
  };
}


// ===================================================//
// =======================Old=========================//
// ===================================================//


// export function fetchCart(showCart, addSuccess) {
//   return function (dispatch) {
//     return fetch("http://localhost:5000/custom",{
//       method: 'POST',
//       body: 'SELECT products.product_name, products.product_image, products.product_price, cart.quantity, cart.proID FROM cart INNER JOIN products ON products.productID = cart.proID;'
//     })
//     .then( 
//       response => response.json(),
//       error => console.log(error),
//     )
//     .then((cartItem) => {
//       let cartID = [];
//       cartItem.forEach(val => {
//         cartID.push(val.proID);
//       })
//       dispatch( carts( cartItem, cartID, showCart, addSuccess ) );
//       // console.log( dispatch( carts( cartItem ) ) );
//     },
//    );
//   };
// }

// export function addToCart(id, cartID, quantity, userID) {
//   let update = `UPDATE cart SET quantity = quantity+${quantity ? quantity : 1 } WHERE proID = ${id} AND userID=${userID}`;
//   let insert = `INSERT INTO cart VALUE (default, ${id}, ${quantity}, CURRENT_TIMESTAMP, ${userID} )`;
//   if(cartID.includes(id)){
//     return function (dispatch) {
//       return fetch(`http://localhost:5000/custom`, {
//         method: "POST",
//         body: update
//       })
//       // .then( error => dispatch( fetchCart(false, false) ))
//       .then( dispatch( fetchCart(false, true) ))
//       .catch( dispatch( fetchCart(false, false) ) )
//     }
//   } else {
//     return function (dispatch) {
//       return fetch("http://localhost:5000/custom", {
//         method: "POST",
//         body: insert
//       })
//       // .then( error => dispatch( fetchCart(false, false) ))
//       .then( dispatch( fetchCart(false, true) ) )
//       .catch( dispatch( fetchCart(false, false) ) )
//     }
//   }
// }

// ===================================================//
// =======================Old=========================//
// ===================================================//

/*Cart*/
export function fetchCart(accessKey) {
  let getUser = localStorage.getItem("currentUser");
  let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  accessKey = accessKey || localStorage.getItem("currentUser");
  return function (dispatch) {
    if(!getUser){
      let cartID = cart.map( item => item.productID )
      // let listID = cart.map(id => { return id.productID }).join();
      // let query = `select * from products where products.productID in (${listID})`;
      // // console.log(query)
      // return fetch("http://localhost:5000/custom",{
      //   method: 'POST',
      //   body: query
      // })
      // .then( 
      //   response => response.json(),
      //   error => console.log(error),
      // )
      // .then((cartItem) => {
      //   // for(let i = 0; i < cartItem.length; i++){
      //   //   Object.assign(cartItem[i], {"quantity": cart[i].quantity});
      //   // }
        dispatch( carts( cart, cartID, true ) );
      // })
    }
    else{
      let fetchQuery = `SELECT products.product_name, products.product_image, products.product_price, cart.cartID, cart.quantity, products.productID FROM cart INNER JOIN products ON products.productID = cart.proID INNER JOIN user ON cart.userID = user.userID WHERE user.user_access = '${accessKey}';`;
      // console.log(fetchQuery);
      return fetch("http://localhost:5000/custom",{
        method: 'POST',
        body: fetchQuery
      })
      .then( 
        response => response.json(),
        error => console.log(error),
      )
      .then((cartItem) => {
        // console.log(cartItem);
        let cartID = cartItem.map( item => item.productID )
        // console.log(cartID)
        dispatch( carts( cartItem, cartID, true ) );
        // console.log( dispatch( carts( cartItem ) ) );
      },
     );
    }
  };
}

export function addToCart( proID, cartID, quantity, userID, proName, proImage, proPrice ) {
  let update = `UPDATE cart SET quantity = quantity+${quantity ? quantity : 1 } WHERE proID = ${proID} AND userID=${userID}`;
  let insert = `INSERT INTO cart VALUE (default, ${proID}, ${quantity}, CURRENT_TIMESTAMP, ${userID} )`;
  let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  let getUser = localStorage.getItem("currentUser");
  return function (dispatch) {
    if(!getUser){
      // if(cart.length !== 0){
        let cartID = cart.map( item => item.productID )
        if(cartID.includes(proID)){
          for (var i = 0; i < cart.length; i++) {
            if (cart[i].productID === proID) {
              cart[i].quantity = cart[i].quantity + 1;
            }
            else{
              cart[i].quantity = cart[i].quantity * 1;
            }
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          dispatch( fetchCart(false, null) )
        }
        else{
          cart.push({productID: proID, quantity: quantity, product_name: proName, product_image: proImage, product_price: proPrice})
          localStorage.setItem("cart", JSON.stringify(cart));
          dispatch( fetchCart(false, null) )
        }
      // }
      // else{
      //   cart.push({productID: proID, quantity: quantity})
      //   localStorage.setItem("cart", JSON.stringify(cart));
      //   dispatch( fetchCart(false, true) )
      // }
    }
    else {
      if(cartID.includes(proID)){
        return fetch(`http://localhost:5000/custom-res`, {
          method: "POST",
          body: update
        })
        .then( res => res.json() )
        .then( 
          result => {
            if( result === true){
              dispatch( actionAddToCart(false, true) ) 
            }
          }
        )
      } else {
        return fetch("http://localhost:5000/custom-res", {
          method: "POST",
          body: insert
        })
        .then( res => res.json() )
        .then( 
          result => {
            if( result === true){
              dispatch( actionAddToCart(false, true) )
            }
          }
        )
      }
    }
  }
}

export function updateQuantityCart(proID, quantity, accessKey){
  let getUser = localStorage.getItem("currentUser");
  let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  let updateQuery = `Update cart Inner Join user On cart.userID = user.userID Set quantity = ${quantity} Where user.user_access='${accessKey}' and cart.proID = ${proID};`;
  console.log(updateQuery);
  return function(dispatch){
    if(!getUser){
      let productID = cart.map( item => item.productID )

      if(productID.includes(proID)){
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].productID === proID) {
            cart[i].quantity = parseInt(quantity);
          }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch( fetchCart(true, true) )
      }
    } else {
      return fetch("http://localhost:5000/custom", {
        method: 'POST',
        body: updateQuery
      })
      .then( dispatch( fetchCart(true, accessKey) ) )
    }
  }
}

export function deleteCartItem(cartID, accessKey, proID){
  let getUser = localStorage.getItem("currentUser");
  let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  let deleteQuery = `Delete cart from cart Inner Join user On cart.userID = user.userID Where user.user_access='${accessKey}' and cart.cartID=${cartID};`;
  return function(dispatch){
    if(!getUser){
      let productID = cart.map( item => item.productID )

      if(productID.includes(proID)){
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].productID === proID) {
            cart.splice(i,1)
          }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch( fetchCart(true, true) )
      }

    } else {
      return fetch("http://localhost:5000/custom", {
        method: 'POST',
        body: deleteQuery
      })
      // .then( res => res.json() )
      .then( dispatch( fetchCart(true, accessKey) ) )
    }
  }
}

/*Wishlist*/
export function fetchWishList(accessKey) {
  let query = 
  `SELECT w.wishID, p.productID, p.product_image, p.product_name, p.product_price 
  FROM wishlist as w
  INNER JOIN user as u 
  ON w.userID = u.userID 
  INNER JOIN products as p 
  ON w.proID = p.productID
  WHERE u.user_access='${accessKey}'`;
  // console.log(query)
  return function(dispatch){
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: query,
    })
    .then( res => res.json() )
    .then( wishlistItem => {
      dispatch( wishlist( wishlistItem, true ) )
    })
  }
}

export function addWishList(proID, accessKey) {
  let addQuery = `INSERT INTO wishlist VALUE(default, ${proID}, (SELECT userID FROM user WHERE user.user_access='${accessKey}'));`
  // console.log(addQuery);
  return function(dispatch) {
    return fetch("http://localhost:5000/custom-res", {
      method: 'POST',
      body: addQuery
    })
    .then( res => res.json())
    .then( result => {
      if ( result === true ) { 
        dispatch( actionWishlist( true, null ) )
        dispatch(fetchWishList(accessKey) )
        setTimeout(() => {
          dispatch( actionWishlist( null, null ) )
        }, 3000);
      }
    })
  }
}

export function removeWishList(wishID, accessKey) {
  let removeQuery = `DELETE FROM wishlist WHERE wishID=${wishID} AND userID=(SELECT userID FROM user WHERE user_access='${accessKey}' )`;
  console.log(removeQuery);
  return function(dispatch){
    return fetch("http://localhost:5000/custom-res", {
      method: 'POST',
      body: removeQuery,
    })
    .then( res => res.json())
    .then( result => {
      if ( result === true ) { 
        dispatch( actionWishlist( null, true ) )
        dispatch( fetchWishList(accessKey) )
        setTimeout(() => {
          dispatch( actionWishlist( null, null ) )
        }, 3000);
      }
    })
  }
}

export function fetchHomeBlogs() {
  return function(dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: 'SELECT blogID, blog_title, blog_thumbnail , blog_except, date_format(blog_date,"%d %M, %Y") as blog_date FROM blogs ORDER BY blog_date DESC LIMIT 0, 9'
    })
    .then(
      response => response.json(),
      error => console.log(error)
    )
    .then( blogList => dispatch( blogList( blogList, true ) ) )
  }
}

export function searchProducts(text){
  // console.log(text);
  return function (dispatch){
    let query = text && text !== '' ? `WHERE product_name LIKE '%${text}%' ORDER BY date_create DESC LIMIT 0, 8` : 'WHERE product_name = null';
    // let query = `WHERE product_name LIKE '%iphone%' ORDER BY date_create DESC LIMIT 0, 15`;
    return fetch("http://localhost:5000/custom", {
      method: "POST",
      body: `SELECT * FROM products ${query}`,
    })
    .then(
      response => response.json(),
      error => console.log(error),
    )
    .then((searchItem) => {
      dispatch( findProducts( searchItem ) );
      // console.log( dispatch(findProducts( searchItem )) );
    })
  }
}

export function quickView(id, showView){
  return function(dispatch){
    return fetch(`http://localhost:5000/custom`, {
      method: 'POST',
      body: 
      `SELECT pro.*, brands.brand_name, brands.brand_image, cat.categoryName 
      FROM products AS pro
      INNER JOIN brands ON pro.brandID = brands.brandID
      INNER JOIN categories AS cat ON pro.catID = cat.categoryID WHERE pro.productID = ${id}`
    })
    .then( response => response.json() )
    .then ( viewItem => { dispatch ( productView ( viewItem, showView ) ) } ) 
  }
}

export function fetchProductDetails(id){
  return function( dispatch ) {
    return fetch(`http://localhost:5000/custom`, {
      method: 'POST',
      body: `SELECT pro.*, br.*, cat.*  FROM products AS pro INNER JOIN brands AS br ON pro.brandID = br.brandID INNER JOIN categories AS cat ON pro.catID = cat.categoryID WHERE pro.productID = ${id}`
    })
    .then( response => response.json() )
    .then ( productItem => { dispatch ( productDetails ( productItem ) ) } ) 
  }
}

export function checkUsername(username){
  return function(dispatch){
    return fetch("http://localhost:5000/custom", {
      method: "POST",
      body: `SELECT username, user_image FROM user WHERE username = "${username}" ;`
    })
    .then(response => response.json())
    .then(user => {
      if (user.length > 0) {
        dispatch( getUsername( user, true, `${user[0].username}`, null ) );
        console.log(user)
      } else {
        dispatch( getUsername( null, false, null, "Please enter the correct username !" ) )
        // console.log("User Not Found. Please try again !")
      }
    })
  }
}

export function login(username, password){
  return function(dispatch){

    return fetch("http://localhost:5000/custom", {
      method: "POST",
      body: `SELECT username, user_access, user_image, password, role FROM user WHERE username = "${username}" and password = "${password}" ;`
    })
    .then( 
      response => response.json()
    )
    .then( user => {
      if(user && user.length > 0){
        for(let i = 2; i > 0; i--){
          setTimeout(() => {
            dispatch( loginAction( `Login Success !<br /> You will redirect after ${i} seconds.`, null ) )
          }, 1000*(2 - i));
        }

        let token = user[0].user_access;
        localStorage.setItem("currentUser", token);
        user[0].role === 1 ?
          setTimeout(() => {
            window.location.href = '/'
          }, 2000)
        :
          setTimeout(() => {
            window.location.href = '/admin'
          }, 2000)
      }
      else{
        dispatch( loginAction( null, 'Password is incorrect' ) )
      }
    })
  }
}

export function logout(){
  return function(dispatch){
    let currentURL = window.location.href;
    dispatch( loginAction( null, false ))
    localStorage.removeItem("currentUser");
    window.location.href = currentURL;
  }
}

export function registerAccount(username, password, fname, lname, phone, email){
  //gerenerate key
  const uudi = require('uuid/v4');
  let accessKey = uudi();
  let registerQuery = `INSERT INTO user VALUE( default, '${username}', '${password}', 1, null, '${fname}', '${lname}', '${phone}', '${email}', null, '${accessKey}' );`;
  let validationQuery = `select username, email, phone from user where (username='${username}' or email='${email}' or phone='${phone}');`

  return async (dispatch) => {
    fetch("http://localhost:5000/custom", {
        method: "POST",
        body: validationQuery
    })
    .then(response => response.json())
    .then(users => {
      if(users && users.length > 0){
        let c_username = [],
        c_email = [],
        c_phone = [];

        let U_str = 'Username already exists';
        let E_str = 'Email already exists';
        let P_str = 'Phone Number already exists';
        
        users.forEach( (user, i) => {
          c_username.push(users[i].username)
          c_email.push(users[i].email)
          c_phone.push(users[i].phone.toString())
        })

        if( c_username.includes(username) && c_email.includes(email) && c_phone.includes(phone) ){
          dispatch( validationRegister(U_str, E_str, P_str) )
        }

        else if( !c_username.includes(username) && c_email.includes(email) && c_phone.includes(phone) ){
          dispatch( validationRegister( null, E_str, P_str) )
        }

        else if( c_username.includes(username) && !c_email.includes(email) && c_phone.includes(phone) ){
          dispatch( validationRegister( U_str, null, P_str,) )
        }

        else if( c_username.includes(username) && c_email.includes(email) && !c_phone.includes(phone) ){
          dispatch( validationRegister( U_str, E_str, null ) )
        }

        else if( !c_username.includes(username) && !c_email.includes(email) && c_phone.includes(phone) ){
          dispatch( validationRegister( null, null, P_str) )
        }

        else if( c_username.includes(username) && !c_email.includes(email) && !c_phone.includes(phone) ){
          dispatch( validationRegister( U_str, null, null,) )
        }

        else if( !c_username.includes(username) && c_email.includes(email) && !c_phone.includes(phone) ){
          dispatch( validationRegister( null, E_str, null ) )
        }

        else if( !c_username.includes(username) && c_email.includes(email) && c_phone.includes(phone) ){
          dispatch( validationRegister( null, E_str, P_str) )
        }

        else if( c_username.includes(username) && !c_email.includes(email) && c_phone.includes(phone) ){
          dispatch( validationRegister( U_str, null, P_str,) )
        }

        else if( c_username.includes(username) && c_email.includes(email) && !c_phone.includes(phone) ){
          dispatch( validationRegister( U_str, E_str, null ) )
        }
        
        else if( c_username.includes(username) ){
          dispatch( validationRegister( U_str, null, null ) )
        }

        else if( c_email.includes(email) ){
          dispatch( validationRegister( null, E_str, null ) )
        }

        else if( c_phone.includes(phone) ){
          dispatch( validationRegister( null, null, P_str) )
        }
      }
      else{
        dispatch( validationRegister(null, null, null) )
        return fetch("http://localhost:5000/custom", {
          method: "POST",
          body: registerQuery
        })
        .then( setTimeout(() => {
            dispatch( login( username, password) )
          }, 100)
        )
      }
    })
  }
}

export function fetchUserInfo(accessKey){
  return function(dispatch){
    return fetch("http://localhost:5000/custom", {
      method: "POST",
      body: `Select * From user Where user_access = '${accessKey}' `
    })
    .then(res => res.json())
    .then(userInfo => {
      if (userInfo.length > 0){
        let userName = userInfo[0].username;
        let userID = userInfo[0].userID;
        let userLName = userInfo[0].lastname;
        // console.log(userID)
        dispatch( userInformation ( userID, userName, userLName, userInfo ) )
      }
    })
  }
}

export function fetchProductByBrand(where, order, limit, offSet){
  let bodyText = `SELECT *, count(*) over() as total FROM products WHERE ${where} ORDER BY ${order ? order : 'date_create DESC'} LIMIT ${limit ? limit : 9 } OFFSET ${offSet ? offSet : 0 }`
  // console.log(bodyText);
  // console.log(offSet);
  return function (dispatch){
    return fetch("http://localhost:5000/custom", {
      method: "POST",
      body: bodyText
    })
    .then( response => response.json() )
    .then( allItem => { dispatch( allProducs( allItem, false ) ) } )
  }
}
