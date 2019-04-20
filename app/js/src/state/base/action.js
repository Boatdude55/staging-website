/**
 * @fileoverview
 *
 * Actions for base
 */

goog.provide("app.state.BaseActions");

/**
 * [BaseActions description]
 * @enum {Function}
 */
app.state.BaseActions = {};
app.state.BaseActions.isLoading = function ( loading ) {
	return {
		type: "IS_LOADING",
		payload: loading
	}
}
app.state.BaseActions.isLoaded = function ( loaded ) {
	return {
		type: "IS_LOADED",
		payload: loaded
	}
}
app.state.BaseActions.isAuthUser = function ( auth ) {
	return {
		type: "IS_USER",
		payload: auth
	}
}