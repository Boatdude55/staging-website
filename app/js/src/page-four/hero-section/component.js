/**
 * @fileoverview
 */

goog.provide('app.PageFourHeroSection');

goog.require('goog.ui.Component');
goog.require('goog.soy');

goog.require('pagefour');
/**
 * [HeroSection description]
 * @constructor
 * @extends {goog.ui.Component}
 */
app.PageFourHeroSection = function () {
	app.PageFourHeroSection.base(this, 'constructor');
};
goog.inherits(app.PageFourHeroSection, goog.ui.Component);
goog.addSingletonGetter(app.PageFourHeroSection);

/**
 * [createDom description]
 * @override
 */
app.PageFourHeroSection.prototype.createDom = function () {
	app.PageFourHeroSection.base(this, 'createDom');
	var elem = this.getElement();
	var dom = this.getDomHelper();
	elem = goog.soy.renderAsElement(pagefour.HeroSection);
	this.setElementInternal(elem);
};
