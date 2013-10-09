var sentara = function(){
	var numberOfSlides,
		windowHeight = $(window).height(),
		documentHeight,
		slides,
		currentSlide = 1,
		htmlbody,
		hoverTimeOut;
	$(function(){
		slides = $('.slide');
		documentHeight = $(document).height();
		numberOfSlides = slides.length;
		htmlbody = $('html,body');

		currentSlide = (Math.floor($(window).scrollTop() / windowHeight)) + 1;

		/* Set Nav */
		for(var i=0; i < numberOfSlides; i++){
			$('#nav ul').append('<li attrSlideNumber="'+(i+1)+'"></li>');
		}

		$('li[attrSlideNumber='+currentSlide+']').addClass('active');
		
		$('#nav ul li').bind('click',function(){
			var slideNum = $(this).attr('attrSlideNumber');
			sentara.scrollTo(slideNum);
		}).bind('mouseover',function(){
			$('#nav ul li.active').removeClass('active');
			$(this).addClass('active');
			clearTimeout(hoverTimeOut);
		}).bind('mouseout',function(){
			hoverTimeOut = setTimeout(
				function(){
					$('#nav ul li.active').removeClass('active');
					$('li[attrSlideNumber='+(currentSlide)+']').addClass('active');
				},500
			);
		});

		$('.next button, .next .caret').bind('click',function(){
			sentara.nextSlide();
		});
	});
	return {
		parallaxScroll : function(){
			var scrolled = $(window).scrollTop(),
				slideWhole = documentHeight + scrolled,
				slide = Math.floor(scrolled / windowHeight),
				percent = Math.ceil((scrolled / windowHeight % 1) *100) / 100;

			if(currentSlide != slide+1){
				var slideObj = $(slides[slide]);
				currentSlide = slide+1;
				$('#nav ul li.active').removeClass('active');
				$('li[attrSlideNumber='+(slide+1)+']').addClass('active');
				$('.content.fixed').removeClass('fixed');
				slideObj.find('.content').addClass('fixed');
			}

			
			if(percent < .93){
				var content = $(slides[slide+1]).find('.content');
				$(content).find('h1').css('margin-top', 500 - (500 * percent));
				$(content).find('hr').css('margin-top', 200 - (200 * percent));
				$(content).find('h3').css('margin-top', 400 - (400 * percent));
			}else{
				var content = $(slides[slide+1]).find('.content');
				$(content).find('h1, hr, h3').removeAttr('style');
			}
		},
		slideContentStagger : function(){

		},
		setSize : function(){
			windowHeight = $(window).height();
			documentHeight = $(document).height();
		},
		scrollTo : function(slide){
			htmlbody.animate({
				scrollTop: (windowHeight*slide) - windowHeight
			}, 1600, 'easeInOutExpo', function() { //era 600 easeOutQuint
				console.log(currentSlide);
			});
		},
		keyNav : function(e){
			// up/left arrow = scroll up -  || e.keyCode == 38
			if (e.keyCode == 37 || e.keyCode == 38) {
			//Back
				this.scrollTo(currentSlide-1);
			}
			// down/right arrow, space = scroll down -  || e.keyCode == 40 || e.keyCode == 32
			if (e.keyCode == 39 || e.keyCode == 40) {
			//Forward
				this.scrollTo(currentSlide+1);
			}
		},
		nextSlide : function(){
			this.scrollTo(currentSlide+1);
		}
	};
}();


/*						 *\
   event handlers 
\*                       */
$(window).bind('scroll',function(e){
    sentara.parallaxScroll();
});

$(window).resize(function(){
	sentara.setSize();
});
$(document).on('keydown', function(e){
	sentara.keyNav(e);
});
