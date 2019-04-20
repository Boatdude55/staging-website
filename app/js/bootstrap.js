/**
 * @fileoverview
 * Bootstrap for application
 */

goog.require("app.Core");
goog.require("app.Interface");
goog.require("app.Module");

// Plugins
goog.require("app.plugins.State");
goog.require("app.plugins.Fx");

var core = new app.Core(app.Interface);

core.use([
	app.plugins.State,
	app.plugins.Fx
	]);
core.register(app.Module, "app");
core.start("app");
