function fullPageScreen() { 
	if($(window).width() > 849){
		$('#fullpage').fullpage({
			navigation: true,
			navigationPosition: 'right',
			afterRender: function(){
				$('#fullpage').find('.section').eq(0).find('video')[0].play();
				console.log($('#fullpage').find('.section').eq(0).find('video').html());
			},
			onLeave: function(index, nextIndex, direction){
				if(direction == 'down'){
					$('#fullpage').find('.section').eq(index-1).children().addClass('animated zoomOutDown');
					$('#fullpage').find('.section').eq(nextIndex-1).children().addClass('animated fadeInUp');
				}
				else if(direction == 'up'){
					$('#fullpage').find('.section').eq(index-1).children().addClass('animated zoomInDown');
					$('#fullpage').find('.section').eq(nextIndex-1).children().addClass('animated fadeOutUp');
				}
				$('#fullpage').find('.section').each(function(){
					if($(this).index() != index-1 && $(this).index() != nextIndex)
						$(this).children().removeClass('animated zoomOutDown zoomInDown fadeInUp fadeOutUp');
					if ($(this).index() != nextIndex-1) 
						$(this).removeClass('started');
				});
				$('#fullpage').find('.section').eq(nextIndex-1).addClass('started');
				$('#fullpage').find('.section').eq(nextIndex-1).find('video')[0].play();
				$('#fullpage').find('.section').eq(nextIndex-1).find('.countTo').countTo({
					speed: 2000
				});				
			}
		});
		if ($('#fullpage').hasClass('one-screen')) {
			$('#fp-nav').css('display','none');
		}
		else {
			$('#fp-nav').css('display','block');
		} 
	}
}

$(document).ready(function(){
	$('.header__navigation-mobile').on('click',function(){
		$(this).toggleClass('opened');
		$('.header').toggleClass('opened');
		$('.header__navigation').slideToggle(444);
	});

	fullPageScreen();
	
	$('.countTo').countTo({
		speed: 2000
	});
	
	$('.project__photo-item a').fancybox({
		'transitionIn' : 'elastic', 
		'easingIn' : 'easeOutBack', 
		'transitionOut' : 'elastic', 
		'easingOut' : 'easeInBack', 
		'opacity' : false, 
		'titleShow' : true, 
		'titlePosition' : 'over',
		'type' : 'image',          
		'titleFromAlt' : true,
		helpers:  {
			overlay : {
				locked : false,
				showEarly : false
			}
		}
	});	
	
	/*$('.project__map-wrapper').mouseenter(function() {
		$('.project__map-title').addClass('hovered'); }).mouseleave(function() { 
			$('.project__map-title').removeClass('hovered');
	});*/
	
	/*function counter(odometer){
        var step = 0;
        if (parseFloat(odometer.data('odometer')) > 300)
            step = 7;
        else
            step = 1;
        var speed = parseInt(1500 / parseFloat(odometer.data('odometer') * step));
        var run = setInterval(function(){
            if(
                parseFloat(odometer.text()) < odometer.data('odometer')
                &&
                parseFloat(odometer.text()) + step <= odometer.data('odometer')
            )
                odometer.text(parseFloat(odometer.text()) + step);
            else if (parseFloat(odometer.text()) + step > odometer.data('odometer'))
                odometer.text(odometer.data('odometer'));
            else
                clearInterval(run);
        }, speed);
    }

    var run = [];

    function watcher(){
		if($(window).width() > 849){
			$('.section').each(function(){
				var section = $(this);
				if($(this).hasClass('fp-completely')){
					clearInterval(run);
					var index = 0;
					$(this).find('.odometer').each(function(){
						var item = $(this);
						run[section.index()] = setTimeout(function () {
							counter(item);
						}, index * 300);
						index++;
					});
				}
				if(!$(this).hasClass('fp-completely')) {
					clearInterval(run);
					$(this).find('.odometer').each(function(){
						$(this).text('0');
					});
				}
			});
		}
		else { 
			$('.section').each(function(){
				clearInterval(run);
				var section = $(this);
				var index = 0;
				$(this).find('.odometer').each(function(){
					var item = $(this);
					run[section.index()] = setTimeout(function () {
						counter(item);
					}, index * 300);
					index++;
				});
			});	
		}
    }

    watcher();

    setInterval(watcher, 1000);	*/
});

$(window).on('scroll',function() {
	$(this).scrollTop()>1?$('.header').addClass('scrolled'):$('.header').removeClass('scrolled');
	if($(window).width() <= 849){
		var top = $("body").scrollTop();			
		$('.section').each(function(){
			if($(this).offset().top < top + 600)
			$(this).addClass('started');
		});
		var countStart = $('.step__project-info--mobile').offset().top-150;
		if (top >= countStart) { 	
			$('.countTo').countTo({
				speed: 2000
			})
		}		
	}
});

$(window).on('resize',function() {
	fullPageScreen();
	if($(window).width() < 849){
		$.fn.fullpage.destroy('all');
	}
});