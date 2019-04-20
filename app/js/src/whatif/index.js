/**
 * @fileoverview
 *
 * Page 1
 */

goog.provide('app.whatif.View');

goog.require('app.lib.structor.Structor');
goog.require('app.whatif.ViewHeroSection');
goog.require('app.whatif.ViewBudget');
goog.require('app.whatif.ViewPlan');
goog.require('app.whatif.ViewSave');
goog.require('app.whatif.ViewGoogle');
goog.require('app.whatif.ViewPlaid');
/**
 * [PageOne description]
 *
 * @constructor
 * @param {string=} opt_name [description]
 * @extends {app.lib.structor.Structor}
 */
app.whatif.View = function (opt_name) {
	app.whatif.View.base(this, 'constructor', opt_name ? opt_name : "WhatIf?");
	var hero = new app.whatif.ViewHeroSection();
	var budget = new app.whatif.ViewBudget();
	var plan = new app.whatif.ViewPlan();
	var save = new app.whatif.ViewSave();
	var plaid = new app.whatif.ViewPlaid();
	var google = new app.whatif.ViewGoogle();

	this.addChild(hero, true);
	this.registerDisposable(hero);
	this.addChild(budget, true);
	this.registerDisposable(budget);
	this.addChild(plaid, true);
	this.registerDisposable(plaid);
	this.addChild(plan, true);
	this.registerDisposable(plan);
	this.addChild(google, true);
	this.registerDisposable(google);
	this.addChild(save, true);
	this.registerDisposable(save);

};
goog.inherits(app.whatif.View, app.lib.structor.Structor);
