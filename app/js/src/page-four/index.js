/**
 * @fileoverview
 *
 * Page 1
 */

goog.provide('app.PageFour');

goog.require('app.lib.structor.Structor');
goog.require('app.PageFourHeroSection');

/**
 * [PageFour description]
 *
 * @constructor
 * @param {string=} opt_name [description]
 * @extends {app.lib.structor.Structor}
 */
app.PageFour = function (opt_name) {
	app.PageFour.base(this, 'constructor', opt_name ? opt_name : "Page4");
	var hero = app.PageFourHeroSection.getInstance();
	this.addChild(hero, true);
	this.registerDisposable(hero);
};
goog.inherits(app.PageFour, app.lib.structor.Structor);
