/**
 * @fileoverview
 *
 * Google Component
 */

goog.provide('app.whatif.ViewPlaid');

goog.require('goog.ui.Component');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.soy');
goog.require('plaid');

/**
 * [ViewPlaid description]
 * @constructor
 * @extends {goog.ui.Component}
 */
app.whatif.ViewPlaid = function () {
	app.whatif.ViewPlaid.base(this, 'constructor');
};
goog.inherits(app.whatif.ViewPlaid, goog.ui.Component);
app.whatif.ViewPlaid.prototype.containerElem = null;
app.whatif.ViewPlaid.prototype.contentElem = null;

app.whatif.ViewPlaid.CSS_CLASS = "ui-structor-plaid";

app.whatif.ViewPlaid.prototype.getCssClass = function () {
	return app.whatif.ViewPlaid.CSS_CLASS;
};

app.whatif.ViewPlaid.prototype.getContentElement = function () {
	return this.contentElem;
};

app.whatif.ViewPlaid.prototype.createDom = function () {
	var elem = this.getElement();
	var dom = this.getDomHelper();

	this.contentElem = elem = dom.createDom(
			goog.dom.TagName.DIV,
			this.getCssClass(),
			this.containerElem = dom.createDom(
					goog.dom.TagName.DIV,
					goog.getCssName(this.getCssClass(), 'container'),
					goog.soy.renderAsElement(plaid.Index)
				)
		);
	this.setElementInternal(elem);
};
