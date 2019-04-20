/**
 * @fileoverview
 *
 * Feature component
 */
goog.provide('app.whatif.ViewSave');

goog.require('goog.ui.Component');
goog.require('goog.soy');
goog.require('goog.dom.TagName');
goog.require('save');
/**
 * [PageOneSave description]
 * @constructor
 * @extends {goog.ui.Component}
 */
app.whatif.ViewSave = function () {
	app.whatif.ViewSave.base(this, 'constructor');
};
goog.inherits(app.whatif.ViewSave, goog.ui.Component);
app.whatif.ViewSave.prototype.containerElem = null;
app.whatif.ViewSave.prototype.contentElem = null;
app.whatif.ViewSave.CSS_CLASS = goog.getCssName('ui-structor-save');

app.whatif.ViewSave.prototype.getCssClass = function() {
  return app.whatif.ViewSave.CSS_CLASS;
};
app.whatif.ViewSave.prototype.getContentElement = function() {
  return this.contentElem;
};
app.whatif.ViewSave.prototype.createDom = function() {
	app.whatif.ViewSave.base(this, 'createDom');
	var elem = this.getElement();
	var dom = this.getDomHelper();
	elem = dom.createDom(
			goog.dom.TagName.DIV, {
				class: this.getCssClass(),
				id: "f-3"
			},
			this.containerElem = dom.createDom(
					goog.dom.TagName.DIV,
					goog.getCssName(this.getCssClass(), 'container'),
					this.contentElem = dom.createDom(
							goog.dom.TagName.DIV,
							goog.getCssName(this.getCssClass(), 'content'),
							goog.soy.renderAsElement(save.Index)
						)
				)
		);
	this.setElementInternal(elem);
};
