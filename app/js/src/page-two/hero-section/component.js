/**
 * @fileoverview
 */

goog.provide('app.PageTwoHeroSection');

goog.require('goog.ui.Component');
goog.require('goog.soy');

goog.require('pagetwo');
/**
 * [HeroSection description]
 * @constructor
 * @extends {goog.ui.Component}
 */
app.PageTwoHeroSection = function () {
	app.PageTwoHeroSection.base(this, 'constructor');
};
goog.inherits(app.PageTwoHeroSection, goog.ui.Component);
goog.addSingletonGetter(app.PageTwoHeroSection);

/**
 * [createDom description]
 * @override
 */
app.PageTwoHeroSection.prototype.createDom = function () {
	app.PageTwoHeroSection.base(this, 'createDom');
	var elem = this.getElement();
	var dom = this.getDomHelper();
	elem = goog.soy.renderAsElement(pagetwo.HeroSection);
	this.setElementInternal(elem);

};
