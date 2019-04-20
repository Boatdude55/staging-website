/**
 * @fileoverview
 *
 * Component for the footer
 */

goog.provide('app.structor.Footer');

goog.require('goog.ui.Component');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.soy');
goog.require('footer');

/**
 * [Footer description]
 * @constructor
 * @extends {goog.ui.Component}
 */
app.structor.Footer = function () {
	app.structor.Footer.base(this, 'constructor');
};
goog.inherits(app.structor.Footer, goog.ui.Component);
app.structor.Footer.prototype.containerElem = null;
app.structor.Footer.prototype.contentElem = null;
app.structor.Footer.CSS_CLASS = "ui-structor-footer";
app.structor.Footer.prototype.getCssClass = function () {
	return app.structor.Footer.CSS_CLASS;
};
app.structor.Footer.prototype.getContentElement = function () {
	return this.contentElem;
};
app.structor.Footer.prototype.createDom = function () {
	var elem = this.getElement();
	var dom = this.getDomHelper();
	elem = dom.createDom(
			goog.dom.TagName.DIV,
			this.getCssClass(),
			this.contentElem = dom.createDom(
					goog.dom.TagName.DIV,
					goog.getCssName(this.getCssClass(), 'container'),
					goog.soy.renderAsElement(footer.Index)
				)
		);
	this.setElementInternal(elem);
};
