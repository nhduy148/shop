'use strict';
var fs = require('fs');

module.exports = function(app) {
  let ProCtrl = require('./controllers/ProductsController');
  let data = './data/location.json';
  let location = JSON.parse(fs.readFileSync(data, 'UTF-8'));

  app.route('/custom').post(ProCtrl.customQuery)

  app.route('/custom-res').post(ProCtrl.responseQuery)

  app.route('/location').get(
    (req, res) => {
      res.json(location);
    }
  )
  
  // app.route('/categories').get(ProCtrl.getCategories)

  // app.route('/customCategories').post(ProCtrl.customGetCategories)
  
  // app.route('/brands').get(ProCtrl.getBrands)

  // app.route('/customBrands').post(ProCtrl.customGetBrands)
  
  // app.route('/category/:catId').get(ProCtrl.getProductDetail)
  
  // app.route('/products').get(ProCtrl.getProduct)

  // app.route('/customProducts').post(ProCtrl.customGetProduct)

  // app.route('/product/:productId').get(ProCtrl.getProductDetail)

  // app.route('/carts').get(ProCtrl.getShoppingCart)

  // app.route('/carts').post(ProCtrl.addToCart)
  
  // app.route('/cart/:productId').get(ProCtrl.getIDCart)

  // app.route('/increaseQuantity/:productId').put(ProCtrl.increaseQuantity)

  // app.route('/decreaseQuantity/:productId').put(ProCtrl.decreaseQuantity)

  // app.route('/onChangeCartItem/:productId').put(ProCtrl.onChangeCartItem)

  // app.route('/cart/delete/:productId').delete(ProCtrl.deleteCartItem)

  // app.route('/auth/register').post(ProCtrl.register);

  // app.route('/auth/login').post(ProCtrl.logIn);
};