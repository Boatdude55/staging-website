/**
 * @fileoverview A class for representing items in menus.
 * @see app.structor.TopBar
 *
 * @author attila@google.com (Attila Bodis)
 * @see ../demos/menuitem.html
 */

goog.provide('app.structor.TopBarAccounts');

goog.require('goog.a11y.aria.Role');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classlist');
goog.require('goog.math.Coordinate');
goog.require('goog.string');
goog.require('goog.ui.Component');
goog.require('goog.ui.Control');
goog.require('app.structor.TopBarAccountsRenderer');
goog.require('goog.ui.registry');

goog.forwardDeclare('app.structor.TopBar'); // circular



/**
 * Class representing an item in a menu.
 *
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {*=} opt_model Data/model associated with the menu item.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @param {app.structor.TopBarAccountsRenderer=} opt_renderer Optional renderer.
 * @constructor
 * @extends {goog.ui.Control}
 */
app.structor.TopBarAccounts = function(content, opt_model, opt_domHelper, opt_renderer) {
  goog.ui.Control.call(
      this, app.structor.TopBarAccounts.CreateContent(content, opt_model.route), opt_renderer || app.structor.TopBarAccountsRenderer.getInstance(),
      opt_domHelper);
  this.setValue(opt_model);
};
goog.inherits(app.structor.TopBarAccounts, goog.ui.Control);
goog.tagUnsealableClass(app.structor.TopBarAccounts);


/**
 * The access key for this menu item. This key allows the user to quickly
 * trigger this item's action with they keyboard. For example, setting the
 * mnenomic key to 70 (F), when the user opens the menu and hits "F," the
 * menu item is triggered.
 *
 * @type {goog.events.KeyCodes}
 * @private
 */
app.structor.TopBarAccounts.prototype.mnemonicKey_;


/**
 * The class set on an element that contains a parenthetical mnemonic key hint.
 * Parenthetical hints are added to items in which the mnemonic key is not found
 * within the menu item's caption itself. For example, if you have a menu item
 * with the caption "Record," but its mnemonic key is "I", the caption displayed
 * in the menu will appear as "Record (I)".
 *
 * @type {string}
 * @private
 */
app.structor.TopBarAccounts.MNEMONIC_WRAPPER_CLASS_ =
    goog.getCssName('goog-menuitem-mnemonic-separator');


/**
 * The class set on an element that contains a keyboard accelerator hint.
 * @type {string}
 */
app.structor.TopBarAccounts.ACCELERATOR_CLASS = goog.getCssName('goog-menuitem-accel');


// goog.ui.Component and goog.ui.Control implementation.


/**
 * Returns the value associated with the menu item.  The default implementation
 * returns the model object associated with the item (if any), or its caption.
 * @return {*} Value associated with the menu item, if any, or its caption.
 */
app.structor.TopBarAccounts.prototype.getValue = function() {
  var model = this.getModel();
  return model != null ? model : this.getCaption();
};


/**
 * Sets the value associated with the menu item.  The default implementation
 * stores the value as the model of the menu item.
 * @param {*} value Value to be associated with the menu item.
 */
app.structor.TopBarAccounts.prototype.setValue = function(value) {
  this.setModel(value);
};


/** @override */
app.structor.TopBarAccounts.prototype.setSupportedState = function(state, support) {
  app.structor.TopBarAccounts.base(this, 'setSupportedState', state, support);
  switch (state) {
    case goog.ui.Component.State.SELECTED:
      this.setSelectableInternal_(support);
      break;
    case goog.ui.Component.State.CHECKED:
      this.setCheckableInternal_(support);
      break;
  }
};


/**
 * Sets the menu item to be selectable or not.  Set to true for menu items
 * that represent selectable options.
 * @param {boolean} selectable Whether the menu item is selectable.
 */
app.structor.TopBarAccounts.prototype.setSelectable = function(selectable) {
  this.setSupportedState(goog.ui.Component.State.SELECTED, selectable);
};


/**
 * Sets the menu item to be selectable or not.
 * @param {boolean} selectable  Whether the menu item is selectable.
 * @private
 */
app.structor.TopBarAccounts.prototype.setSelectableInternal_ = function(selectable) {
  if (this.isChecked() && !selectable) {
    this.setChecked(false);
  }

  var element = this.getElement();
  if (element) {
    this.getRenderer().setSelectable(this, element, selectable);
  }
};


/**
 * Sets the menu item to be checkable or not.  Set to true for menu items
 * that represent checkable options.
 * @param {boolean} checkable Whether the menu item is checkable.
 */
app.structor.TopBarAccounts.prototype.setCheckable = function(checkable) {
  this.setSupportedState(goog.ui.Component.State.CHECKED, checkable);
};


/**
 * Sets the menu item to be checkable or not.
 * @param {boolean} checkable Whether the menu item is checkable.
 * @private
 */
app.structor.TopBarAccounts.prototype.setCheckableInternal_ = function(checkable) {
  var element = this.getElement();
  if (element) {
    this.getRenderer().setCheckable(this, element, checkable);
  }
};


/**
 * Returns the text caption of the component while ignoring accelerators.
 * @override
 */
app.structor.TopBarAccounts.prototype.getCaption = function() {
  var content = this.getContent();
  if (goog.isArray(content)) {
    var acceleratorClass = app.structor.TopBarAccounts.ACCELERATOR_CLASS;
    var mnemonicWrapClass = app.structor.TopBarAccounts.MNEMONIC_WRAPPER_CLASS_;
    var caption =
        goog.array
            .map(
                content,
                function(node) {
                  if (goog.dom.isElement(node) &&
                      (goog.dom.classlist.contains(
                           /** @type {!Element} */ (node), acceleratorClass) ||
                       goog.dom.classlist.contains(
                           /** @type {!Element} */ (node),
                           mnemonicWrapClass))) {
                    return '';
                  } else {
                    return goog.dom.getRawTextContent(node);
                  }
                })
            .join('');
    return goog.string.collapseBreakingSpaces(caption);
  }
  return app.structor.TopBarAccounts.superClass_.getCaption.call(this);
};


/**
 * @return {?string} The keyboard accelerator text, or null if the menu item
 *     doesn't have one.
 */
app.structor.TopBarAccounts.prototype.getAccelerator = function() {
  var dom = this.getDomHelper();
  var content = this.getContent();
  if (goog.isArray(content)) {
    var acceleratorEl = goog.array.find(content, function(e) {
      return goog.dom.classlist.contains(
          /** @type {!Element} */ (e), app.structor.TopBarAccounts.ACCELERATOR_CLASS);
    });
    if (acceleratorEl) {
      return dom.getTextContent(acceleratorEl);
    }
  }
  return null;
};


/** @override */
app.structor.TopBarAccounts.prototype.handleMouseUp = function(e) {
  var parentMenu = /** @type {app.structor.TopBar} */ (this.getParent());

  if (parentMenu) {
    var oldCoords = parentMenu.openingCoords;
    // Clear out the saved opening coords immediately so they're not used twice.
    parentMenu.openingCoords = null;

    if (oldCoords && goog.isNumber(e.clientX)) {
      var newCoords = new goog.math.Coordinate(e.clientX, e.clientY);
      if (goog.math.Coordinate.equals(oldCoords, newCoords)) {
        // This menu was opened by a mousedown and we're handling the consequent
        // mouseup. The coords haven't changed, meaning this was a simple click,
        // not a click and drag. Don't do the usual behavior because the menu
        // just popped up under the mouse and the user didn't mean to activate
        // this item.
        return;
      }
    }
  }

  app.structor.TopBarAccounts.base(this, 'handleMouseUp', e);
};


/** @override */
app.structor.TopBarAccounts.prototype.handleKeyEventInternal = function(e) {
  if (e.keyCode == this.getMnemonic() && this.performActionInternal(e)) {
    return true;
  } else {
    return app.structor.TopBarAccounts.base(this, 'handleKeyEventInternal', e);
  }
};


/**
 * Sets the mnemonic key code. The mnemonic is the key associated with this
 * action.
 * @param {goog.events.KeyCodes} key The key code.
 */
app.structor.TopBarAccounts.prototype.setMnemonic = function(key) {
  this.mnemonicKey_ = key;
};


/**
 * Gets the mnemonic key code. The mnemonic is the key associated with this
 * action.
 * @return {goog.events.KeyCodes} The key code of the mnemonic key.
 */
app.structor.TopBarAccounts.prototype.getMnemonic = function() {
  return this.mnemonicKey_;
};


// Register a decorator factory function for app.structor.TopBarAccountss.
goog.ui.registry.setDecoratorByClassName(
    app.structor.TopBarAccountsRenderer.CSS_CLASS, function() {
      // MenuItem defaults to using MenuItemRenderer.
      return new app.structor.TopBarAccounts(null);
    });


/**
 * @override
 */
app.structor.TopBarAccounts.prototype.getPreferredAriaRole = function() {
  if (this.isSupportedState(goog.ui.Component.State.CHECKED)) {
    return goog.a11y.aria.Role.MENU_ITEM_CHECKBOX;
  }
  if (this.isSupportedState(goog.ui.Component.State.SELECTED)) {
    return goog.a11y.aria.Role.MENU_ITEM_RADIO;
  }
  return app.structor.TopBarAccounts.base(this, 'getPreferredAriaRole');
};


/**
 * @override
 * @return {app.structor.TopBar}
 */
app.structor.TopBarAccounts.prototype.getParent = function() {
  return /** @type {app.structor.TopBar} */ (
      goog.ui.Control.prototype.getParent.call(this));
};


/**
 * @override
 * @return {app.structor.TopBar}
 */
app.structor.TopBarAccounts.prototype.getParentEventTarget = function() {
  return /** @type {app.structor.TopBar} */ (
      goog.ui.Control.prototype.getParentEventTarget.call(this));
};

/**
 * [CreateContent description]
 * @param {goog.ui.ControlContent=} opt_content Caption for the content element
 * @param {string=} opt_href     Src string for content element
 */
app.structor.TopBarAccounts.CreateContent = function (opt_content, opt_href) {
  return goog.dom.createDom(
      goog.dom.TagName.A, {
        href: opt_href ? opt_href : "/undefinedSrc",
        token: opt_href ? opt_href : "undefinedSrc"
      },
      opt_content ? opt_content : "Page Undefined"
    );
};

