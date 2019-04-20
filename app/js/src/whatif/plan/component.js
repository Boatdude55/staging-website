/**
 * @fileoverview
 *
 * Feature component
 */
goog.provide('app.whatif.ViewPlan');

goog.require('goog.ui.Component');
goog.require('goog.soy');
goog.require('goog.dom.TagName');
goog.require('plan');
/**
 * [PageOnePlan description]
 * @constructor
 * @extends {goog.ui.Component}
 */
app.whatif.ViewPlan = function () {
	app.whatif.ViewPlan.base(this, 'constructor');
};
goog.inherits(app.whatif.ViewPlan, goog.ui.Component);
app.whatif.ViewPlan.prototype.containerElem = null;
app.whatif.ViewPlan.prototype.contentElem = null;
app.whatif.ViewPlan.CSS_CLASS = goog.getCssName('ui-structor-plan');

app.whatif.ViewPlan.prototype.getCssClass = function() {
  return app.whatif.ViewPlan.CSS_CLASS;
};
app.whatif.ViewPlan.prototype.getContentElement = function() {
  return this.contentElem;
};
app.whatif.ViewPlan.prototype.createDom = function() {
	app.whatif.ViewPlan.base(this, 'createDom');
	var elem = this.getElement();
	var dom = this.getDomHelper();
	elem = dom.createDom(
			goog.dom.TagName.DIV, {
				class: this.getCssClass(),
				id: "f-2"
			},
			this.containerElem = dom.createDom(
					goog.dom.TagName.DIV,
					goog.getCssName(this.getCssClass(), 'container'),
					this.contentElem = dom.createDom(
							goog.dom.TagName.DIV,
							goog.getCssName(this.getCssClass(), 'content'),
							goog.soy.renderAsElement(plan.Index)
						)
				)
		);
	this.setElementInternal(elem);
};
