/**
 * @fileoverview
 *
 * Plugin for Scroll animations
 */

goog.provide("app.plugins.Fx");

app.plugins.Fx =  function (core, options) {

	// define a method that gets called when a module starts
	var onModuleInit = function (instanceSandbox, options, done){
		/*var $core = instanceSandbox.getCore();
		var $window = $core(window);
		var $animation_elements = $core("on-scroll-animate");

		function check_if_in_view () {
			var window_height = $window.height();
			var window_top_position = $window.scrollTop();
			var window_bottom_position = (window_top_position + window_height);

			$core.each($animation_elements, function() {
				var $element = $(this);
				var element_height = $element.outerHeight();
				var element_top_position = $element.offset().top;
				var element_bottom_position = (element_top_position + element_height);

				//check to see if this current container is within viewport
				if ((element_bottom_position >= window_top_position) &&
					(element_top_position <= window_bottom_position)) {
				$element.addClass('in-view');
				$element.toggleClass('on-scroll-animate');
				} else {
					$element.removeClass('in-view');
				}
			});
		}

		instanceSandbox.scrollAnimation = function (){
			$window.on('scroll resize', check_if_in_view);
			$window.trigger('scroll');
		};*/
		done();
	};

	// define a method that gets called when a module stops
	var onModuleDestroy = function (done){
		done();
	};

	// don't forget to return your methods
	return {
		init: onModuleInit,
		destroy: onModuleDestroy
	};

};
