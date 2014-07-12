/*global _ */
'use strict';

angular.module('fauxcart.cart')

.controller('CartListCtrl', ['$scope', 'cartItem', 'inventory', function($scope, CartItem, inventory) {

  $scope.cart = [];

  CartItem.query().then(function(cartItems) {
    var groups = _.groupBy(cartItems, 'productId');
    
    _.each(groups, function(groupedItems) {
      // Request the full product object from the 'back-end'
      inventory.get(groupedItems[0].productId).then(function(product) {
        // Push onto the scope's cart an object in the form:
        //   {
        //     product: { id: 1, name: 'Product A', price: 20 },
        //     cartItems: [
        //       { productId: 1, timestamp: 1405209256004 }
        //       { productId: 1, timestamp: 1405209256005 }
        //       ...
        //     ]
        //   }
        $scope.cart.push({
          product: product,
          cartItems: groupedItems
        });
      });
    });
  });

}]);