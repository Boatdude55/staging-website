/**
 * @fileoverview
 * Structor factory
 */
goog.provide('app.lib.structor.Factory');

goog.require('goog.structs.Map');
goog.require('app.lib.structor.Structor');

/**
 * @constructor
 */
app.lib.structor.Factory = function () {

  /**
   * Structor factory mapping.
   *
   * @type {goog.structs.Map}
   * @private
   */
  this.factory_ = new goog.structs.Map();
  this.sandbox = null;
};
goog.addSingletonGetter(app.lib.structor.Factory);

/**
 * @param  {string} name Name of the structor
 * @return {app.lib.structor.Structor}
 */
app.lib.structor.Factory.prototype.getStructor = function (name) {

  var structor = this.factory_.get(name);

  structor = structor ? new structor() : null;

  /**
   * Provide access to parent
   */
  if ( structor ) {
    structor.setSandbox(this.getSandbox());
  }

  return structor;

};

/**
 * @param  {string} name
 * @param  {function(new:app.lib.structor.Structor, string=)} structor
 */
app.lib.structor.Factory.prototype.register = function (name, structor) {

  this.factory_.set(name, structor);

  return this;

};

app.lib.structor.Factory.prototype.setSandbox = function (sandbox) {
  this.sandbox = sandbox;
};

app.lib.structor.Factory.prototype.getSandbox = function () {
  return this.sandbox;
};
