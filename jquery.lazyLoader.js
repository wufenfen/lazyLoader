/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *  
 * Author: Claire Wu 2016/12/28
 *
 * Usage:
 *
 * html:
 *  <img src="./res/loading.gif" alt="images for test" data-src="./res/1.jpg">
 *  ....
	<img src="./res/loading.gif" alt="images for test" data-src="./res/2.jpg">


 * JS
 *  $('img').lazyLoader({
		threshold: 200, //图片进入多少开始加载
		style: "trans" //进入的效果
    });
 */

; (function($, window, document, undefined){

	var lazyLoader = function(self, options){
		var windowHeight = $(window).height(); //浏览器高度
		var hasBeenLoaded = []; //记录已经被加载的元素

		function loadImage(){
			//防止重复加载
			if( hasBeenLoaded.indexOf(self) >= 0){
				return;
			}
			var scrollTop = $(document).scrollTop(); //文档的滑动位置
			var selfHeight = self.height(); //当前元素的高度
			var selfTop =  self.offset().top ; //当前元素的滑动位置
			/*//当前元素只要有一侧在视窗可视范围内
			if(( scrollTop < selfTop &&  selfTop < scrollTop + windowHeight ) 
				|| ( scrollTop < selfTop + selfHeight && selfTop + selfHeight < scrollTop + windowHeight )){*/
			//全部在视窗之内才加载
			if( scrollTop <= selfTop + options.threshold && selfTop + selfHeight <= scrollTop + windowHeight + options.threshold){
				var img = self.attr('data-src');
				self.attr('src', img);
				self.addClass(options.style);
				hasBeenLoaded.push(self); 
			}
		}

		$(document).scroll(function(){
			loadImage();
		});

		loadImage();
	}

	$.fn.lazyLoader = function(options){
		var defaults = {
			threshold: 0,
			style:''
		};

		options = $.extend({}, defaults, options);
		return this.each(function(index, item){
			lazyLoader($(item),options);
		})
	}
})(jQuery, window, document)