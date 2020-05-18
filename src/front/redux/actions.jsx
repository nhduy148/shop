import Cookies from 'js-cookie';


export const ALL_PRODUCT = 'ALL_PRODUCT';
export const FEATURE_PRODUCT = 'FEATURE_PRODUCT';
export const GET_CART = 'GET_CART';
export const CART_ARRAY = 'CART_ARRAY';
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
// export const CHECK_IS_ADMIN = 'CHECK_IS_ADMIN';
export const USER_INFO = 'USER_INFO';
export const GET_HOME_BLOG = 'GET_HOME_BLOG';
export const GET_ARCHIVE_BLOG = 'GET_ARCHIVE_BLOG';
export const GET_BLOG_DETAILS = 'GET_BLOG_DETAILS';
export const GET_BRANDS = 'GET_BRANDS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SIDEBAR_FILTER = 'SIDEBAR_FILTER';
export const SHOW_POPUP = 'SHOW_POPUP';
export const SIDEBAR_ITEM = 'SIDEBAR_ITEM';
export const PRODUCT_SLIDES = 'PRODUCT_SLIDES'
export const TOTAL_PRODUCT = 'TOTAL_PRODUCT';


export const getTotalProducts = (totalProducts) => ({
  type: TOTAL_PRODUCT,
  totalProducts
})

export const getProductSlides = proSlideItem => ({
  type: PRODUCT_SLIDES,
  proSlideItem,
})

export const getSidebarItem = (sideCategory, sideBrand) => ({
  type: SIDEBAR_ITEM,
  sideCategory,
  sideBrand,
})

export const showPopup = popupName => ({
  type: SHOW_POPUP,
  popupName,
})

export function getPopup(popupName) {
  // console.log(popupName)
  return function (dispatch) {
    dispatch(showPopup(popupName))
  }
}

export const getCats = (catItem, catRes) => {
  return {
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
  return {
    type: RELATED_PRODUCT,
    relatedItem,
  }
}

export const lastestProducts = (lastestItem, newProduct, lastestRes) => ({
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

export const carts = (cartItem, cartRes) => ({
  type: GET_CART,
  cartItem,
  cartRes,
});

export const productInCart = (cartArr) => {
  return {
    type: CART_ARRAY,
    cartArr,
  }
}

export const actionAddToCart = (addError, addSuccess) => ({
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

export const actionWishlist = (addWishStatus, removeWishStatus) => {
  return {
    type: ADD_WISHLIST,
    addWishStatus,
    removeWishStatus
  }
}

export const productView = (viewItem, showView = false) => ({
  type: PRODUCT_VIEW,
  viewItem,
  showView,
})

export const productDetails = (productItem, detailsRes) => ({
  type: PRODUCT_DETAILS,
  productItem,
  detailsRes,
})

export const findProducts = searchItem => ({
  type: FIND_PRODUCT,
  searchItem,
});

export const getUsername = (getUsername, hasUsername, getUsernameSuccess, getUsernameError) => ({
  type: GET_USERNAME,
  getUsername,
  hasUsername,
  getUsernameSuccess,
  getUsernameError
})

export const loginAction = (loginSuccess, loginError) => ({
  type: LOGIN_ACTION,
  loginSuccess,
  loginError
})

export const validationRegister = (userError, emailError, passError, passConfirmError, phoneError) => ({
  type: VALIDATION_REGISTER,
  userError,
  emailError,
  passError,
  passConfirmError,
  phoneError,
})
// username, email, password, passConfirm, fname, lname, phone

// export const checkAdmin = (isAdmin) => ({
//   type: CHECK_IS_ADMIN,
//   isAdmin,
// })

export const userInformation = (userInfo) => ({
  type: USER_INFO,
  userInfo,
})

export const getHomeBlog = (homeBlogItem, blogRes) => ({
  type: GET_HOME_BLOG,
  homeBlogItem,
  blogRes,
})

export const getArchiveBlog = ( archiveBlogList, archiveBlogStatus ) => ({
  type: GET_ARCHIVE_BLOG,
  archiveBlogList,
  archiveBlogStatus
})

export const getBlogDetails = (blogDetails, blogDetailsStatus) => {
  return{
    type: GET_BLOG_DETAILS,
    blogDetails,
    blogDetailsStatus,
  }
}

export const dataSideBar = sideBarProductFilter => ({
  type: SIDEBAR_FILTER,
  sideBarProductFilter,
})

export function fetchTotalProducts() {
  const query = `SELECT COUNT(*) AS totalProducts FROM products`

  return dispatch => {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: query
    })
    .then( res => res.json() )
    .then( data => dispatch(getTotalProducts(data[0])))
    .catch( err => console.log(err) )
  }
}

export function fetchRelatedProduct(prodID) {
  let query =
    `(SELECT productID, product_name, product_price, product_image FROM products 
    WHERE product_price <= (SELECT product_price FROM products WHERE productID=${prodID}) 
    AND productID <> ${prodID} 
    AND catSlug = (SELECT catSlug FROM products WHERE productID=${prodID})
    ORDER BY product_price DESC limit 2)
  UNION
  (SELECT productID, product_name, product_price, product_image FROM products 
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

  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: query
    })
      .then(res => res.json())
      .then(relatedItem => {
        dispatch(relatedProduct(relatedItem))
      })
  }
}

export function cartArray() {
  let accessKey = localStorage.getItem("currentUser");
  let query = `SELECT proID FROM cart WHERE userID=(SELECT userID FROM user WHERE user_access='${accessKey}')`;
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: query
    })
    .then(res => res.json())
    .then(cartArr => {
      let getCartArr = cartArr.map(item => item.proID)
      // console.log(getCartArr);
      dispatch(productInCart(getCartArr))
    })
  }
}

export function wishlistArray() {
  let accessKey = localStorage.getItem("currentUser");
  let query = `SELECT proID FROM wishlist WHERE userID=(SELECT userID FROM user WHERE user_access='${accessKey}')`;
  // console.log(query);
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: query
    })
    .then(res => res.json())
    .then(wishArr => {
      let wishlistArr = wishArr.map(item => item.proID)
      // console.log(wishlistArr);
      dispatch(productInWishlist(wishlistArr))
    })
  }
}

export function fecthAllProduct() {
  let fetchQuery = `SELECT count(*) as total, productID, product_image, product_name, product_price, wishlist.wishID FROM products LEFT JOIN wishlist ON products.productID = wishlist.proID ORDER BY date_create DESC LIMIT 0, 9`;
  // console.log(fetchQuery)
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      // mode: 'no-cors',
      body: fetchQuery,
    })
      .then(response => response.json())
      .then(allItem => { dispatch(allProducs(allItem, true, null)) })
      .catch(error => { dispatch(allProducs(null, false, 'Something went wrong! ' + error)) })
  }
}

export function fetchProductByCat(cat) {
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body:
        `SELECT count(*) as total, productID, product_image, product_name, product_price, wishlist.wishID FROM products LEFT JOIN wishlist ON products.productID = wishlist.proID WHERE catSlug='${cat}' ORDER BY date_create DESC LIMIT 0, 9`
    })
      .then(
        response => response.json(),
        error => console.log(error)
      )
      .catch(error => { dispatch(allProducs(null, false, 'Something went wrong! ' + error)) })
      .then(allItem => { dispatch(allProducs(allItem, true, null)) })
  }
}

export function fetchCategory() {
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: "POST",
      body: "SELECT * FROM categories"
    })
      .then(res => res.json())
      .then(result => dispatch(getCats(result, true)))
  }
}

export function fetchBrands() {
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: "SELECT * FROM brands"
    })
      .then(res => res.json())
      .then(result => dispatch(getBrands(result, true)))
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
      .then((lastestItem) => {
        dispatch(lastestProducts(lastestItem, true, true));
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
        dispatch(featuredProducts(featureItem, true));
        // console.log(  featureItem  );
      },
      );
  };
}

/*Cart*/
export function fetchCart() {
  let getUser = localStorage.getItem("currentUser");
  let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  let accessKey =  localStorage.getItem("currentUser");
  
  accessKey = accessKey || localStorage.getItem("currentUser");
  return function (dispatch) {
    if (!getUser) {
      let cartID = cart.map(item => item.productID)
      dispatch(carts(cart, cartID, true));
    }
    else {
      let fetchQuery = `SELECT products.product_name, products.product_image, products.product_price, cart.cartID, cart.quantity, products.productID FROM cart INNER JOIN products ON products.productID = cart.proID INNER JOIN user ON cart.userID = user.userID WHERE user.user_access = '${accessKey}';`;
      // console.log(fetchQuery);
      return fetch("http://localhost:5000/custom", {
        method: 'POST',
        body: fetchQuery
      })
        .then(
          response => response.json(),
          error => console.log(error),
        )
        .then((cartItem) => {
          dispatch(carts(cartItem, true));
        },
        );
    }
  };
}

export function addToCart(proID, cartID, quantity, accessKey, proName, proImage, proPrice) {
  let update = `UPDATE cart SET quantity = quantity+${quantity ? quantity : 1} WHERE proID = ${proID} AND userID=(SELECT userID FROM user WHERE user_access='${accessKey}')`;
  let insert = `INSERT INTO cart VALUE (default, ${proID}, ${quantity}, CURRENT_TIMESTAMP, (SELECT userID FROM user WHERE user_access='${accessKey}') )`;
  let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  let getUser = localStorage.getItem("currentUser");

  return function (dispatch) {
    if (!getUser) {
      let cartID = cart.map(item => item.productID)
      if (cartID.includes(proID)) {
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].productID === proID) {
            cart[i].quantity = cart[i].quantity + 1;
          }
          else {
            cart[i].quantity = cart[i].quantity * 1;
          }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(fetchCart(false, null))
      }
      else {
        cart.push({ productID: proID, quantity: quantity, product_name: proName, product_image: proImage, product_price: proPrice })
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(fetchCart(false, null))
      }
    }
    else {
      if (cartID.includes(proID)) {
        return fetch(`http://localhost:5000/custom-res`, {
          method: "POST",
          body: update
        })
          .then(res => res.json())
          .then(
            result => {
              if (result === true) {
                dispatch(actionAddToCart(false, true))
              }
            }
          )
      } else {
        return fetch("http://localhost:5000/custom-res", {
          method: "POST",
          body: insert
        })
          .then(res => res.json())
          .then(
            result => {
              if (result === true) {
                dispatch(actionAddToCart(false, true))
              }
            }
          )
      }
    }
  }
}

export function updateQuantityCart(proID, quantity, accessKey) {
  let getUser = localStorage.getItem("currentUser");
  let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  let updateQuery = `Update cart Inner Join user On cart.userID = user.userID Set quantity = ${quantity} Where user.user_access='${accessKey}' and cart.proID = ${proID};`;
  // console.log(updateQuery);
  return function (dispatch) {
    if (!getUser) {
      let productID = cart.map(item => item.productID)

      if (productID.includes(proID)) {
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].productID === proID) {
            cart[i].quantity = parseInt(quantity);
          }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(fetchCart(true, true))
      }
    } else {
      return fetch("http://localhost:5000/custom", {
        method: 'POST',
        body: updateQuery
      })
        .then(dispatch(fetchCart(true, accessKey)))
    }
  }
}

export function deleteCartItem(cartID, accessKey, proID) {
  let getUser = localStorage.getItem("currentUser");
  let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  let deleteQuery = `Delete cart from cart Inner Join user On cart.userID = user.userID Where user.user_access='${accessKey}' and cart.cartID=${cartID};`;
  return function (dispatch) {
    if (!getUser) {
      let productID = cart.map(item => item.productID)

      if (productID.includes(proID)) {
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].productID === proID) {
            cart.splice(i, 1)
          }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(fetchCart(true, true))
      }

    } else {
      return fetch("http://localhost:5000/custom", {
        method: 'POST',
        body: deleteQuery
      })
        // .then( res => res.json() )
        .then(dispatch(fetchCart(true, accessKey)))
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
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: query,
    })
      .then(res => res.json())
      .then(wishlistItem => {
        dispatch(wishlist(wishlistItem, true))
      })
  }
}

export function addWishList(proID, accessKey) {
  let addQuery = `INSERT INTO wishlist VALUE(default, ${proID}, (SELECT userID FROM user WHERE user.user_access='${accessKey}'));`
  // console.log(addQuery);
  return function (dispatch) {
    return fetch("http://localhost:5000/custom-res", {
      method: 'POST',
      body: addQuery
    })
      .then(res => res.json())
      .then(result => {
        if (result === true) {
          dispatch(actionWishlist(true, null))
          dispatch(fetchWishList(accessKey))
          setTimeout(() => {
            dispatch(actionWishlist(null, null))
          }, 3000);
        }
      })
  }
}

export function removeWishList(wishID, accessKey) {
  let removeQuery = `DELETE FROM wishlist WHERE wishID=${wishID} AND userID=( SELECT userID FROM user WHERE user_access='${accessKey}' )`;
  // console.log(removeQuery);
  return function (dispatch) {
    return fetch("http://localhost:5000/custom-res", {
      method: 'POST',
      body: removeQuery,
    })
      .then(res => res.json())
      .then(result => {
        if (result === true) {
          dispatch(actionWishlist(null, true))
          dispatch(fetchWishList(accessKey))
          setTimeout(() => {
            dispatch(actionWishlist(null, null))
          }, 3000);
        }
      })
  }
}

export function fetchHomeBlogs() {
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: 'SELECT blogID, blog_title, blog_thumbnail , blog_except, date_format(blog_date,"%d %M, %Y") as blog_date FROM blogs ORDER BY blog_date DESC LIMIT 0, 9'
    })
      .then(
        response => response.json(),
        error => console.log(error)
      )
      .then(homeBlogItem => dispatch(getHomeBlog(homeBlogItem, true)))
  }
}

export function fetchBlogsArchive(offSet){
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: `SELECT blogID, blog_title, blog_thumbnail , blog_except, blog_date FROM blogs ORDER BY blog_date DESC LIMIT 12 OFFSET ${offSet}`
    })
      .then(
        response => response.json(),
        error => console.log(error)
      )
      .then( archiveBlogList => dispatch( getArchiveBlog( archiveBlogList, true ) ) )
      .catch( error => dispatch( getArchiveBlog( [], false ) ) )
  }
}

export function fetchBlogDetails(blogID){
  let getQuery = `SELECT * FROM blogs WHERE blogID=${blogID};`
  // console.log(getQuery);
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: getQuery
    })
    .then(res => res.json())
    .then(blogDetails => dispatch( getBlogDetails(blogDetails, true) ) )
    .catch( err => dispatch( getBlogDetails(null, false) ) )
  }
}

export function searchProducts(text) {
  // console.log(text);
  return function (dispatch) {
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
        dispatch(findProducts(searchItem));
        // console.log( dispatch(findProducts( searchItem )) );
      })
  }
}

export function quickView(id, showView) {
  return function (dispatch) {
    return fetch(`http://localhost:5000/custom`, {
      method: 'POST',
      body:
        `SELECT pro.*, brands.brand_name, brands.brand_image, cat.categoryName 
      FROM products AS pro
      INNER JOIN brands ON pro.brandID = brands.brandID
      INNER JOIN categories AS cat ON pro.catID = cat.categoryID WHERE pro.productID = ${id}`
    })
      .then(response => response.json())
      .then(viewItem => { dispatch(productView(viewItem, showView)) })
  }
}

export function fetchProductDetails(id) {
  return function (dispatch) {
    return fetch(`http://localhost:5000/custom`, {
      method: 'POST',
      body: `SELECT pro.*, br.*, cat.*  FROM products AS pro INNER JOIN brands AS br ON pro.brandID = br.brandID INNER JOIN categories AS cat ON pro.catID = cat.categoryID WHERE pro.productID = ${id}`
    })
      .then(response => response.json())
      .then(productItem => dispatch( productDetails(productItem, true) ) )
      .catch( err => dispatch( productDetails(null, false) ) )
  }
}

export function checkUsername(username) {
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: "POST",
      body: `SELECT username, user_image FROM user WHERE username = "${username}" ;`
    })
      .then(response => response.json())
      .then(user => {
        if (user.length > 0) {
          dispatch(getUsername(user, true, `${user[0].username}`, null));
          // console.log(user)
        } else {
          dispatch(getUsername(null, false, null, "Please enter the correct username !"))
          // console.log("User Not Found. Please try again !")
        }
      })
  }
}

export function login(username, password) {
  return function (dispatch) {

    return fetch("http://localhost:5000/custom", {
      method: "POST",
      body: `SELECT username, user_access, user_image, password, role FROM user WHERE username = "${username}" and password = "${password}" ;`
    })
      .then(
        response => response.json()
      )
      .then(user => {
        if (user && user.length > 0) {

          let token = user[0].user_access;

          localStorage.setItem("currentUser", token);

          if(user[0].role === 1){
            Cookies.set("iA", 1);
            window.location.href = '/';
          } else {
            Cookies.set("iA", 0);
            window.location.href = '/admin';
          }
        }
        else {
          dispatch(loginAction(null, 'Password is incorrect'))
        }
      })
  }
}

export function logout() {
  return async function (dispatch) {
    let currentURL = await window.location.href;
    await dispatch(loginAction(null, false))
    await localStorage.removeItem("currentUser");
    await Cookies.remove('iA');
    window.location.href = currentURL;
  }
}

// export function checkIsAdmin(){
//   return function(dispatch) {
//     return fetch('http://localhost:5000/custom', {
//       method: 'POST',
//       body: "SELECT user_access FROM user WHERE role = 0"
//     })
//     .then( res => res.json() )
//     .then( listAdmins => {
//       let newlistAdmins = listAdmins.map(val => val.user_access );
//       let userCode = localStorage.getItem("currentUser");

//       newlistAdmins.includes(userCode)
//       ? ( dispatch( checkAdmin(true) )  )
//       : dispatch( checkAdmin(false) )
//     } )
//   }
// }

export function registerAccount( username, email, password, passConfirm, fname, lname, phone ) {
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
        let userArr = users.map( user => user.username );
        let emailArr = users.map( user => user.email );
        let phoneArr = users.map( user => user.phone.toString() );

        let regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]$/

        let userErr = userArr.includes(username) ? 'Username already exists.' : null;
        let emailErr = emailArr.includes(email) ? 'Email already exists.' : null;
        let passErr = ( password.length < 8 || regexPass(password) ) ? 'Your password must be at least 8 characters and  1 uppercase character.' : null;
        let passConfirmErr = passConfirm !== password ? 'Confirm password do not match.' : null;
        let phoneErr = phoneArr.includes(phone) ? 'Phone Number already exists.' : null;


        if ( ( users && users.length > 0 ) || userErr.includes(username) || emailErr.includes(email) || ( password.length < 8 || regexPass(password) ) || passConfirm !== password || phoneArr.includes(phone) ) {
          dispatch( validationRegister ( userErr, emailErr, passErr, passConfirmErr, phoneErr ) )
        }
        else {
          dispatch( validationRegister ( userErr, emailErr, passErr, passConfirmErr, phoneErr ) )
          return fetch("http://localhost:5000/custom", {
            method: "POST",
            body: registerQuery
          })
            .then(setTimeout(() => {
              dispatch(login(username, password))
            }, 100)
            )
        }
      })
  }
}

export function fetchUserInfo() {
  let accessKey = localStorage.getItem("currentUser");
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: "POST",
      body: `Select user_image, first_name, last_name, role From user Where user_access = '${accessKey}' `
    })
      .then(res => res.json())
      .then(userInfo => {
        if (userInfo.length > 0) {
          dispatch(userInformation(userInfo[0]))
        }
      })
  }
}

export function filterProduct(where, order, limit, offSet) {
  let fetchQuery = `SELECT *, count(*) as total FROM products WHERE ${where} ORDER BY ${order} LIMIT ${limit ? limit : 9} OFFSET ${offSet ? offSet : 0}`
  // console.log(fetchQuery);
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: "POST",
      body: fetchQuery
    })
      .then(response => response.json())
      .then(allItem => {
        !!allItem && allItem.length > 0
          ? dispatch(allProducs(allItem, true, null))
          : dispatch(allProducs(null, true, null))
      })
  }
}

export function fetchSidebarItem() {
  let query = 'SELECT br2.*, cat.categoryName FROM brands as br2 LEFT JOIN categories as cat ON br2.catID = cat.categoryID';
  return function (dispatch) {
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: query,
    })
      .then(response => response.json())
      .then(result => {
        let catName = [...new Set(result.map(({ categoryName }) => categoryName))]
        let catSlug = [...new Set(result.map(({ catSlug }) => catSlug))]

        let catLength = catSlug.length || catName.length;

        let sideCategory = [];
        for (let i = 0; i < catLength; i++) {
          sideCategory.push({ "catSlug": catSlug[i], "catName": catName[i] })
        }

        let sideBrand = result;

        return dispatch(getSidebarItem(sideCategory, sideBrand))
      })
  }
}

export function fetchProductSlides(slideID) {
  let getSlide = `SELECT * FROM product_slides where specID = ( SELECT specificationID FROM products WHERE productID = ${slideID} );`
  // console.log(getSlide);
  return function(dispatch){
    return fetch("http://localhost:5000/custom", {
      method: 'POST',
      body: getSlide,
    })
    .then(response => response.json())
    .then( slideItem  => dispatch( getProductSlides(slideItem) ) )
  }
}
