/**
 * @fileoverview
 */

goog.provide('app.whatif.ViewHeroSection');

goog.require('goog.ui.Component');
goog.require('goog.soy');

goog.require('whatif');
/**
 * [HeroSection description]
 * @constructor
 * @extends {goog.ui.Component}
 */
app.whatif.ViewHeroSection = function () {
	app.whatif.ViewHeroSection.base(this, 'constructor');
};
goog.inherits(app.whatif.ViewHeroSection, goog.ui.Component);
goog.addSingletonGetter(app.whatif.ViewHeroSection);

/**
 * [createDom description]
 * @override
 */
app.whatif.ViewHeroSection.prototype.createDom = function () {
	app.whatif.ViewHeroSection.base(this, 'createDom');
	var elem = this.getElement();
	var dom = this.getDomHelper();
	elem = goog.soy.renderAsElement(whatif.HeroSection);
	this.setElementInternal(elem);

};
