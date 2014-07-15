var _ = require('lodash');
var PricingRule = require('../models/pricingRule');
var Product = require('../models/product');
var cart = require('../models/cart');


module.exports = function(app) {

  /**
   * GET /api/pricing/
   *
   * Returns an array of all pricing rules available in the system.
   */
  app.get('/api/pricing', function(req, res) {
    return res.json(PricingRule.all());
  });


  /**
   * GET /api/pricing/:id
   *
   * Returns a single pricing rule by its ID. The response object will be
   * formatted as such, with options varying per type:
   *
   *    {
   *      id: 1,
   *      name: "2 for the price of 1",
   *      type: "modulo",
   *      options: {
   *        getNum: 2,
   *        forThePriceOf: 1
   *      }
   *    }
   */
  app.get('/api/pricing/:id', function(req, res) {
    var rule = PricingRule.getById(req.params.id);
    if (rule) {
      return res.json(rule);
    }
    return res.status(404).json({ message: 'Not found' });
  });

  /**
   * PUT /api/pricing/:id
   *
   * Updates a single pricing rule by its ID. The request body should be the
   * full object, including the ID. The response object is the same as a "GET
   * /api/pricing/:id" request.
   */
  app.put('/api/pricing/:id', function(req, res) {
    var rule = PricingRule.getById(req.params.id),
        cartNeedsUpdate = false;

    if (rule) {
      // Copy over properties
      rule.set(req.body);
      
      // Update cart, if needed
      //NOTE: a little inefficient. We could cut out as soon as we find any cart
      //      item that uses this rule.
      _.each(cart.items, function(quantity, productId) {
        var product = Product.getById(productId);
        cartNeedsUpdate = cartNeedsUpdate || (product.pricingRule === rule.id);
      });
      if (cartNeedsUpdate) {
        cart.updateTotal();
      }

      return res.json(rule);
    }
    return res.status(404).json({ message: 'Not found' });
  });

  /**
   * POST /api/pricing/
   *
   * Adds a new pricing rule to the system. The request body should be the same
   * format as described above, but without an "id" field. The response object
   * will be the new pricing rule, complete with its newly-created ID.
   */
  app.post('/api/pricing', function(req, res) {
    var rule = new PricingRule(req.body);
    PricingRule.add(rule);
    return res.json(rule);
  });

  /**
   * DELETE /api/pricing/:id
   *
   * Deletes the requested pricing rule from the system. If the rule is not,
   * then the response will be a 404. If the rule is in use by one or more
   * products, then the response will be a 500.
   */
  app.delete('/api/pricing/:id', function(req, res) {
    var isInUse = false,
        ruleId = parseInt(req.params.id);

    // See if any products are using this rule...
    //TODO: factor out and clean this mess up...
    _.each(Product.all(), function(product){
      isInUse = isInUse || (product.pricingRule === ruleId);
    });
    if (isInUse) {
      return res.status(500).json({ message: 'Rule still in use' });
    }
    
    if (PricingRule.removeById(ruleId)) {
      return res.json(true);
    }
    return res.status(404).json({ message: 'Not found' });
  });

};