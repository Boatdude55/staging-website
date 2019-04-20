/**
 * @fileoverview
 *
 * Feature component
 */
goog.provide('app.whatif.ViewBudget');

goog.require('goog.ui.Component');
goog.require('goog.soy');
goog.require('goog.dom.TagName');
goog.require('budget');
/**
 * [PageOneBudget description]
 * @constructor
 * @extends {goog.ui.Component}
 */
app.whatif.ViewBudget = function () {
	app.whatif.ViewBudget.base(this, 'constructor');
};
goog.inherits(app.whatif.ViewBudget, goog.ui.Component);
app.whatif.ViewBudget.prototype.containerElem = null;
app.whatif.ViewBudget.prototype.contentElem = null;
app.whatif.ViewBudget.CSS_CLASS = goog.getCssName('ui-structor-budget');

app.whatif.ViewBudget.prototype.getCssClass = function() {
  return app.whatif.ViewBudget.CSS_CLASS;
};
app.whatif.ViewBudget.prototype.getContentElement = function() {
  return this.contentElem;
};
app.whatif.ViewBudget.prototype.createDom = function() {
	app.whatif.ViewBudget.base(this, 'createDom');
	var elem = this.getElement();
	var dom = this.getDomHelper();
	elem = dom.createDom(
			goog.dom.TagName.DIV, {
				class: this.getCssClass(),
				id: "f-1"
			},
			this.containerElem = dom.createDom(
					goog.dom.TagName.DIV,
					goog.getCssName(this.getCssClass(), 'container'),
					this.contentElem = dom.createDom(
							goog.dom.TagName.DIV,
							goog.getCssName(this.getCssClass(), 'content'),
							goog.soy.renderAsElement(budget.Index)
						)
				)
		);
	this.setElementInternal(elem);
};
