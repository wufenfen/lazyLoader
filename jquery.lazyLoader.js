/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *  
 * Author: Claire Wu 2016/12/28
 */

; (function($, window, document, undefined){

	var lazyLoader = function(self, options){
		
		function loadImage(){
			if( $(document).scrollTop() < self.offset().top &&  
				self.offset().top + self.height() < $(document).scrollTop() + $(window).height()){
				var img = self.attr('data-src');
				self.attr('src', img);
				console.log(img);
			}
		}


		$(document).scroll(function(){
			loadImage();
		});

		loadImage();
	}

	$.fn.lazyLoader = function(options){
		var defaults = {

		};

		options = $.extend({}, defaults, options);
		return this.each(function(index, item){
			lazyLoader($(item),options);
		})
	}
})(jQuery, window, document)