var _ = require('lodash');

/**
 * Base class
 *
 */
function BaseClass(options) {
  this.set(options);
}

/**
 * Updates the current instance with the given data.
 */
BaseClass.prototype.set = function(options) {
  _.each(options, function(val, key) {
    this[key] = val;
  }, this);
};


module.exports = BaseClass;