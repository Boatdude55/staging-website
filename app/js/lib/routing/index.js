/**
 * @fileoverview Provides a router functionality, selects best
 * matching route, agains a list of added routes.
 */
goog.provide('app.lib.routing.Router');

goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
app.lib.routing.Router = function () {
  goog.base(this);

  /**
   * @type {Array.<app.lib.routing.Route>}
   * @private
   */
  this.routes_ = [];
};
goog.inherits(app.lib.routing.Router, goog.events.EventTarget);

/**
 * Adds a new route to list
 *
 * @param {app.lib.routing.Route} route
 */
app.lib.routing.Router.prototype.addRoute = function (route) {
  this.routes_.push(route);
  route.setParentEventTarget(this);
};

/**
 * Matches a route agains specified url token
 *
 * @param  {string} token
 * @return {boolean}
 */
app.lib.routing.Router.prototype.match = function (token) {
  for (var i = 0; i < this.routes_.length; i++) {
    if (this.routes_[i].match(token)) {
      return true;
    }
  }

  return false;
};