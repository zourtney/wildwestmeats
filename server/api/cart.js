var cart = require('../models/cart');


module.exports = function(app) {

  /**
   * GET /api/cart/
   *
   * Returns an object containing a hash of productId <-> quantity and a
   * running total price. The response object will be formatted like such:
   *
   *    {
   *      items: {
   *        1: 2,
   *        2: 15
   *      },
   *      total: 46 
   *    }
   */
  app.get('/api/cart', function(req, res) {
    return res.json(cart);
  });

  /**
   * PUT /api/cart
   *
   * Updates the contents of the cart. Only the `items` field is respected.
   * (You can't override the price, of course!) The response object is the same
   * as a "GET /api/cart" request.
   */
  app.put('/api/cart', function(req, res) {
    cart.items = req.body.items;
    cart.updateTotal();
    return res.json(cart);
  });

};