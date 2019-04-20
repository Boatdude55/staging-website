/**
 * @fileoverview
 *
 * Reducers for App
 */

goog.provide("app.state.BaseReducers");

/**
 * [BaseActions description]
 * @enum {Function}
 */
app.state.BaseReducers = {};
/**
 * [AppReducer description]
 * @param {Object} state  Current State
 * @param {{type:string, payload:*}} action Action to update state
 */
app.state.BaseReducers.loaded = function ( state, action ) {
	switch ( action.type ) {
		case 'IS_LOADED':
			return action.payload;
		default:
			return state;
	}
};
/**
 * [AppReducer description]
 * @param {Object} state  Current State
 * @param {{type:string, payload:*}} action Action to update state
 */
app.state.BaseReducers.loading = function ( state, action ) {
	switch ( action.type ) {
		case 'IS_LOADING':
			return action.payload; 
		default:
			return state;
	}
};
/**
 * [AppReducer description]
 * @param {Object} state  Current State
 * @param {{type:string, payload:*}} action Action to update state
 */
app.state.BaseReducers.user = function ( state, action ) {
	switch ( action.type ) {
		case 'IS_USER':
			return action.payload;
		default:
			return state;
	}
};