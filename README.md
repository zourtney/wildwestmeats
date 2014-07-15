Wild West Meat Market
=====================

[![Build Status](https://travis-ci.org/zourtney/wildwestmeats.svg?branch=master)](https://travis-ci.org/zourtney/wildwestmeats)

A simple shopping cart demo app created using AngularJS and NodeJS.

Live demo hosted at [wildwestmeats.herokuapp.com](http://wildwestmeats.herokuapp.com).


Features
--------

- Configurable products
- Full CRUD support for pricing rules (can be type `straight`, `modulo`, or `percentage`)
- Kinda responsive (looks decent enough on a phone)


Consessions
-----------

- Single user, single cart.
- The NodeJS server just stores everything in memory. To the client, this behaves like a normal system...until the server rebuilds or reboots!
- All products, rules, and cart info are cached client-side in an app-level `$scope`. This wouldn't be practical in a real system.


To run locally
--------------

    npm install
    grunt build
    node server

From your browser, open [localhost:3000/](http://localhost:3000).


Basic usage
-----------

From the home screen, click the "Add to cart" button beneath the image of your favorite wild west dinner food. By default, the buffalo has a "5 for the price of 3" sale going on, so stock up!

Admin usage
-----------

Two admin sceens are available: **Products** and **Pricing**.

Each product is assigned a single pricing rule, which can be changed from the **Products** screen. The name, price per item, and image URL of the product is also changable.

Full CRUD support is available for pricing rules. There are 3 types of rules available:

 - Straight pricing
 - Modulo pricing ("x for the price of x")
 - Percentage pricing ("x% off!")

**NOTE:** attempting to delete an in-use pricing rule currently fails silently.