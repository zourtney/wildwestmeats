Wild West Meat Market
=====================

[![Build Status](https://travis-ci.org/zourtney/fauxcart.svg?branch=master)](https://travis-ci.org/zourtney/fauxcart)

A simple shopping cart demo app created using AngularJS and NodeJS.

Live demo hosted at [fauxcart-ui.herokuapp.com](http://fauxcart-ui.herokuapp.com).


Features
--------

- Configurable products
- Full CRUD support for pricing rules (can be type `straight`, `modulo', or `percentage`)
- Kinda responsive (looks decent enough on a phone)

Consessions
-----------

- Single user, single cart.
- The NodeJS server just stores everything in memory. To the client, this behaves like a normal system...until the server rebuilds or reboots!
- All products, rules, and cart info are cached client-side in an app-level `$scope`. This wouldn't be practical in a real system.