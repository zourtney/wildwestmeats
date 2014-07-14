var _ = require('lodash');
var Product = require('../models/product');
var cart = require('../models/cart');


module.exports = function(app) {

  /**
   * GET /api/products/
   *
   * Returns a list of all products in the system.
   */
  app.get('/api/products', function(req, res) {
    return res.json(Product.all());
  });

  /**
   * GET /api/products/:id
   *
   * Returns a single product by its ID. The response object will be formatted
   * as such, with options varying per type:
   *
   *    {
   *      id: 1,
   *      name: "Deer",
   *      price: 8,
   *      pricingRule: 4
   *    }
   */
  app.get('/api/products/:id', function(req, res) {
    var product = Product.getById(req.params.id);
    if (product) {
      return res.json(product);
    }
    return res.status(404).json({ message: 'Not found' });
  });

  /**
   * PUT /api/products/:id
   *
   * Updates a single product by its ID. The request body should be the full
   * object, including the ID. The response object is the same as a "GET
   * /api/products/:id" request.
   */
  app.put('/api/products/:id', function(req, res) {
    var product = Product.getById(req.params.id);

    if (product) {
      // Copy over properties
      product.set(req.body);
      
      // Update cart, if needed
      if (cart.items[product.id]) {
        cart.updateTotal();
      }

      return res.json(product);
    }
    return res.status(404).json({ message: 'Not found' });
  });

};