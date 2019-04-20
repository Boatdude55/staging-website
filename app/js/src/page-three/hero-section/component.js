/**
 * @fileoverview
 */

goog.provide('app.PageThreeHeroSection');

goog.require('goog.ui.Component');
goog.require('goog.soy');

goog.require('pagethree');
/**
 * [HeroSection description]
 * @constructor
 * @extends {goog.ui.Component}
 */
app.PageThreeHeroSection = function () {
	app.PageThreeHeroSection.base(this, 'constructor');
};
goog.inherits(app.PageThreeHeroSection, goog.ui.Component);
goog.addSingletonGetter(app.PageThreeHeroSection);

/**
 * [createDom description]
 * @override
 */
app.PageThreeHeroSection.prototype.createDom = function () {
	app.PageThreeHeroSection.base(this, 'createDom');
	var elem = this.getElement();
	var dom = this.getDomHelper();
	elem = goog.soy.renderAsElement(pagethree.HeroSection);
	this.setElementInternal(elem);

};
