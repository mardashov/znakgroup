$(document).ready(function(){
	$('.header__navigation-mobile').on('click',function(){
		$(this).toggleClass('opened');
		$('.header').toggleClass('opened');
		$('.header__navigation').slideToggle(444);
	});

    function counter(odometer){
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
			$('.cd-section').each(function(){
				var section = $(this);
				if($(this).hasClass('visible') && !$(this).hasClass('started')){
					clearInterval(run);
					$(this).addClass('started');
					var index = 0;
					$(this).find('.odometer').each(function(){
						var item = $(this);
						run[section.index()] = setTimeout(function () {
							counter(item);
						}, index * 300);
						index++;
					});
				}
				if(!$(this).hasClass('visible')) {
					clearInterval(run[section.index()]);
					$(this).removeClass('started');
					$(this).find('.odometer').each(function(){
						$(this).text('0');
					});
				}
			});
		}
		else {
			$('.cd-section').each(function(){
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

    setInterval(watcher, 1000);
});

$(window).on('scroll',function() {
	$(this).scrollTop()>1?$('.header').addClass('scrolled'):$('.header').removeClass('scrolled');
	
	$(document).scroll(function () {
		if($(window).width() <= 849){
			var top = $("body").scrollTop();
			$('.cd-section').each(function(){
				if($(this).offset().top < top + 600)
					$(this).addClass('started');
			});
		}
	});
});