/**
 * @fileoverview
 *
 * Plugin for Redux-like state
 */

goog.provide("app.plugins.State");

goog.require("goog.pubsub.PubSub");

app.plugins.State =  function (core, options) {

	function State ( opt_reducers, opt_initialState ) {

		var reducers = opt_reducers ? opt_reducers : {};
		var state = opt_initialState ? reduce(opt_initialState, {}) : reduce({}, {});
		var topic = 'ON_DATA';
		var Observer = new goog.pubsub.PubSub(true);

		/**
		 * getState description
		 * @return {Object} [description]
		 */
		function getState () {

			return state;

		};

		/**
		 * reduce description
		 * @param  {Object} state  The current state
		 * @param  {Object} action The action to change state
		 * @return {Object}        The new state
		 */
		function reduce ( state, action ) {

			var newState = {};

			for ( var prop in reducers ) {

				newState[prop] = reducers[prop](state[prop], action);

			}

			return newState;

		};

		/**
		 * dispatch Update state
		 * @function
		 * @param  {Object} action The action to change state
		 * @param {boolean=} opt_publish Wheter this should be published
		 */
		const dispatch = function ( action, opt_publish ) {
			// Update state tree here!

			state = reduce(state, action);

			if ( opt_publish ) {

				Observer.publish(topic, getState());

			}

		}

		const subscribe = function ( fn ) {

			Observer.subscribe(topic, fn);
			// Provide Current State
			fn(getState());

		}

		// Return State API
		return {
			dispatch: dispatch,
			getState: getState,
			subscribe: subscribe
		};
	};

	core.State = State;

	var onModuleInit = function (instanceSandbox, options, done) {
		done();
	};

	var onModuleDestroy = function (done) {
		done();
	};

	// don't forget to return your methods
	return {
		init: onModuleInit,
		destroy: onModuleDestroy
	};
};
