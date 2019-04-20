/**
 * @fileoverview
 *
 * Google Component
 */

goog.provide('app.whatif.ViewGoogle');

goog.require('goog.ui.Component');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.soy');
goog.require('google');

/**
 * [ViewGoogle description]
 * @constructor
 * @extends {goog.ui.Component}
 */
app.whatif.ViewGoogle = function () {
	app.whatif.ViewGoogle.base(this, 'constructor');
};
goog.inherits(app.whatif.ViewGoogle, goog.ui.Component);
app.whatif.ViewGoogle.prototype.containerElem = null;
app.whatif.ViewGoogle.prototype.contentElem = null;

app.whatif.ViewGoogle.CSS_CLASS = "ui-structor-google";

app.whatif.ViewGoogle.prototype.getCssClass = function () {
	return app.whatif.ViewGoogle.CSS_CLASS;
};

app.whatif.ViewGoogle.prototype.getContentElement = function () {
	return this.contentElem;
};

app.whatif.ViewGoogle.prototype.createDom = function () {
	var elem = this.getElement();
	var dom = this.getDomHelper();

	this.contentElem = elem = dom.createDom(
			goog.dom.TagName.DIV,
			this.getCssClass(),
			this.containerElem = dom.createDom(
					goog.dom.TagName.DIV,
					goog.getCssName(this.getCssClass(), 'container'),
					goog.soy.renderAsElement(google.Index)
				)
		);
	this.setElementInternal(elem);
};
