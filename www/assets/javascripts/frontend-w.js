$(document).ready(function(){
	$('.header__navigation-mobile').on('click',function(){
		$(this).toggleClass('opened');
		$('.header').toggleClass('opened');
		$('.header__navigation').slideToggle(444);
	});
	
	$('.fancybox').fancybox({
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
	
	$('.page').find('.countTo').each(function(){
		$(this).countTo({
			speed: 2000
		});
	});
}); 

$(window).on('scroll',function() {
	$(this).scrollTop()>1?$('.header').addClass('scrolled'):$('.header').removeClass('scrolled');
});