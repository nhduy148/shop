'use strict';
const conn = require('./../connectDB');

module.exports = {

  customQuery: (req, res) => {
    let query = `${req.body}`;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    let duy = conn.query(query, req.body, (err, response) => {
      if (err) throw err;
      // response.push({true});
      res.json(response);
    })
    // console.log(duy.sql);
  },

  responseQuery: (req, res) => {
    let query = `${req.body}`;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    let duy = conn.query(query, req.body, (err, response) => {
      if (err) res.json(false);
      res.json(true);
    })
    // console.log(duy.sql);
  }

  // getCategories: (req, res) => {
  //   let query = "SELECT * FROM categories";
  //   conn.query(query, (err, response) => {
  //     if (err) throw err;
  //     res.json(response);
  //   })
  // },

  // customGetCategories: (req, res) => {
  //   let query = `SELECT * FROM categories ${req.body}`;
  //   var duy = conn.query(query, req.body, (err, response) => {
  //     if (err) res.json(err);
  //     res.json(response);
  //   })
  //   // console.log(duy.sql);
  // },

  // fetchCategoryByID: (req, res) => {
  //   let query = "SELECT * FROM categories WHERE categoriesID = ?";
  //   conn.query(query, [req.params.catId], (err, response) => {
  //     if (err) throw err;
  //     res.json(response);
  //   })
  // },

  // getBrands: (req, res) => {
  //   let query = "SELECT * FROM brands";
  //   conn.query(query, (err, response) => {
  //     if (err) throw err;
  //     res.json(response);
  //   })
  // },

  // customGetBrands: (req, res) => {
  //   let query = `SELECT * FROM brands ${req.body}`;
  //   var duy = conn.query(query, req.body, (err, response) => {
  //     if (err) res.json(err);
  //     res.json(response);
  //   })
  //   // console.log(duy.sql);
  // },

  // getProduct: (req, res) => {
  //   let query = "SELECT * FROM products";
  //   conn.query(query, (err, response) => {
  //     if (err) throw err;
  //     res.json(response);
  //   })
  // },

  // customGetProduct: (req, res) => {
  //   let query = `SELECT * FROM products ${req.body}`;
  //   var duy = conn.query(query, req.body, (err, response) => {
  //     if (err) res.json(err);
  //     res.json(response);
  //   })
  //   // console.log(duy.sql);
  // },

  // getProductDetail: (req, res) => {
  //   let query = "SELECT * FROM products WHERE productID = ?";
  //   conn.query(query, [req.params.productId], (err, response) => {
  //     if (err) throw err;
  //     res.json(response);
  //   })
  // },

  // //Cart
  // getShoppingCart : (req, res) => {
  //   let query = "SELECT * FROM cart order by date_add Desc";
  //   conn.query(query, (err, response)=>{
  //     if (err) throw err;
  //     res.json(response);
  //   })
  // },

  // getIDCart: (req, res) => {
  //   let query = "SELECT * FROM cart WHERE cart_id = ?";
  //   conn.query(query, [req.params.productId], (err, response) => {
  //     if (err) throw err;
  //     res.json(response);
  //   })
  // },

  // decreaseQuantity : (req, res) => {
  //   let query = "UPDATE cart SET quantity = quantity-1 WHERE cart_id = ?";
  //   conn.query(query, [req.params.productId], (err, response) => {
  //     if (err) throw err;
  //     res.json({message: 'Update success!'})
  //   })
  // },

  // increaseQuantity : (req, res) => {
  //   let query = "UPDATE cart SET quantity = quantity+1 WHERE cart_id = ?";
  //   conn.query(query, [req.params.productId], (err, response) => {
  //     if (err) throw err;
  //     res.json({message: 'Update success!'})
  //   })
  // },

  // addToCart : (req, res) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  //   res.setHeader('Access-Control-Allow-Credentials', true);
  //   let data = req.body;
  //   let query = "INSERT INTO cart SET ?";
  //   conn.query(query, data, (err, response) => {
  //     if (err) throw err;
  //     res.json({message: 'Insert success!'})
  //   })
  // },

  // deleteCartItem: (req, res) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  //   res.setHeader('Access-Control-Allow-Credentials', true);
  //   let query = "DELETE FROM cart WHERE cart_id = ?";
  //   conn.query(query, [req.params.productId], (err, response) => {
  //     if (err) throw err;
  //     res.json({message: 'Delete success!'})
  //   })
  // },

  // onChangeCartItem: (req, res) => {
  //   let query = "UPDATE test_react.cart SET quantity = ? WHERE cart_id = ?";
  //   conn.query(query, [req.body.quantity, req.params.productId], (err, result) => {
  //     if (err) throw err;
      
  //     res.json({
  //       message: 'Update success!',
  //       result: req.body
  //     })
  //   })
  // },

  // register: (req, res) => {
  //   let username = req.body.username; 
  //   let password = req.body.password;
  //   let fname = req.body.fname;
  //   let lname = req.body.lname;
  //   let phone = req.body.phone;
  //   let email = req.body.email;

  //   let query = `INSERT INTO user VALUE( default, '${username}', '${password}', 1, null, '${fname}', '${lname}', '${phone}', '${email}', null );`
  //   conn.query(query, (err, response) => {
  //     if (err) res.json(err);
  //     res.json({mess: "Resgited"})
  //   })
  //   username !== undefined ? console.log(username) : console.log('falied');
  // },

  // logIn: (req, res) => {
  //   let username = req.body.username;
  //   let password = req.body.password;

  //   let query = `SELECT * FROM user WHERE username = "${username}" and password = "${password}" ;`;
  //   conn.query(query, (err, response) => {
  //     if (err) res.json(err);
  //     res.json(response)
  //   })
  // }






}