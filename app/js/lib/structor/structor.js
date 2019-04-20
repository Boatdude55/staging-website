/**
 * @fileoverview
 *
 * Structor Component
 */
goog.provide('app.lib.structor.Structor');

goog.require('app.lib.interaction.ComponentInteraction');
goog.require('goog.ui.Component');

/**
 * @constructor
 * @param {string} name
 * @extends {goog.ui.Component}
 */
app.lib.structor.Structor = function(name)
{
  goog.base(this);

  /**
   * Name of the current view.
   *
   * @type {string}
   */
  this.name = name;

  /**
   * View state
   *
   * @type {Object}
   * @protected
   */
  this.state = null;

  this.sandbox = null;

  /**
   * Dynamically initialized components in the view
   *
   * @type {app.lib.interaction.ComponentInteraction}
   * @protected
   */
  this.componentController = new app.lib.interaction.ComponentInteraction();
  this.componentController.setParentEventTarget(this);
  this.registerDisposable(this.componentController);
};
goog.inherits(app.lib.structor.Structor, goog.ui.Component);

/**
 * [headerContainer description]
 * @type {Element}
 */
app.lib.structor.Structor.prototype.headerContainer = null;

/**
 * [headerElem description]
 * @type {Element}
 */
app.lib.structor.Structor.prototype.headerElem = null;

/**
 * [contentContainer description]
 * @type {Element}
 */
app.lib.structor.Structor.prototype.contentContainer = null;

/**
 * [contentElem description]
 * @type {Element}
 */
app.lib.structor.Structor.prototype.contentElem = null;

app.lib.structor.Structor.CSS_CLASS = goog.getCssName('ui-structor');

app.lib.structor.Structor.prototype.getCssClass = function() {
  return app.lib.structor.Structor.CSS_CLASS;
};

app.lib.structor.Structor.prototype.getContentElement = function () {
  return this.contentContainer;
};

/** @inheritDoc */
app.lib.structor.Structor.prototype.createDom = function()
{
  var dom = this.getDomHelper();
  var el = dom.createDom(goog.dom.TagName.DIV, 'ui-structor',
      this.headerElem = dom.createDom(
          goog.dom.TagName.DIV,
          goog.getCssName(this.getCssClass(), 'header'),
          this.headerContainer = dom.createDom(
              goog.dom.TagName.H1,
              goog.getCssName(this.getCssClass(), 'header-container'),
              this.name
            )
        ),
      this.contentElem = dom.createDom(
          goog.dom.TagName.DIV,
          goog.getCssName(this.getCssClass(), 'content'),
          this.contentContainer = dom.createDom(
              goog.dom.TagName.DIV,
              goog.getCssName(this.getCssClass(), 'content-container')
            )
        )
    );
  this.decorateInternal(el);
};

/** @inheritDoc */
app.lib.structor.Structor.prototype.decorateInternal = function(el)
{
  goog.base(this, 'decorateInternal', el);

  this.componentController.initialize({
    element: this.getElement(),
    selector: '.cmp'
  });
};

/** @inheritDoc */
app.lib.structor.Structor.prototype.enterDocument = function()
{
  goog.base(this, 'enterDocument');

  this.componentController.getAll().forEach(function(child) {
    if (!child.isInDocument())
    {
      child.enterDocument();
    }
  }, this);
};

/** @inheritDoc */
app.lib.structor.Structor.prototype.exitDocument = function()
{
  goog.base(this, 'exitDocument');

  this.componentController.getAll().forEach(function(child) {
    if (child.isInDocument())
    {
      child.exitDocument();
    }
  }, this);
};

/**
 * Returns sub component by specified name, which was initialized automatically
 * (through .cmp selector)
 *
 * @param {string} name
 * @return {goog.ui.Component}
 */
app.lib.structor.Structor.prototype.getComponent = function(name)
{
  return this.componentController.getComponentByName(name);
};

/**
 * Sets whether component is active.
 *
 * @param {boolean} isActive
 */
app.lib.structor.Structor.prototype.setActive = function(isActive)
{
  this.forEachChild(function(child) {
    if (child.setActive && typeof child.setActive == 'function')
    {
      child.setActive(isActive);
    }
  }, this);

  this.isActive = isActive;
};

/**
 * Sets the state of the view.
 *
 * @param {Object} state
 */
app.lib.structor.Structor.prototype.setState = function(state)
{
  this.state = state;
};

/**
 * [customRender description]
 * @param  {Element=} opt_parentElement opt_parentElement Optional parent element to render the component into.
 * @return {Element|Node}                   [description]
 */
app.lib.structor.Structor.prototype.customRender = function(opt_parentElement) {
  return this.customRender_(opt_parentElement);
};

/**
 * [customRender_ description]
 * @param  {Element=} opt_parentElement opt_parentElement Optional parent element to render the component into.
 * @param  {Node=} opt_beforeNode    Node before which the component is to be rendered.  If left out the node is appended to the parent element.
 * @return {Element|Node}                   [description]
 */
app.lib.structor.Structor.prototype.customRender_ = function(
    opt_parentElement, opt_beforeNode) {
  if (this.isInDocument()) {
    throw new Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }

  if (!this.getElement()) {
    this.createDom();
  }

  // If this component has a parent component that isn't in the document yet,
  // we don't call enterDocument() here.  Instead, when the parent component
  // enters the document, the enterDocument() call will propagate to its
  // children, including this one.  If the component doesn't have a parent
  // or if the parent is already in the document, we call enterDocument().
  if (!this.getParent() || this.getParent().isInDocument()) {
    this.enterDocument();
  }

  return this.getElement();
};

app.lib.structor.Structor.prototype.setSandbox = function (sandbox) {
  this.sandbox = sandbox;
};

app.lib.structor.Structor.prototype.getSandbox = function () {
  return this.sandbox;
};
