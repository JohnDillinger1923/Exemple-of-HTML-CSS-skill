$(window).on('load', function (){
	var preloader = $('#preloader');
	preloader.fadeOut(500);
});

$(document).ready(function(){

	if(window.screen.width < 1200)
	{
		$('.slide-wr').flip({
			axis: 'y',
			trigger: 'click'
		});

		$('.serv-jellyfish-wr').flip({
			axis: 'y',
			trigger: 'click'
		});
	}

	if(window.screen.width >= 1200)
	{
		$('.slide-wr').flip({
			axis: 'y',
			trigger: 'hover'
		});	
		$('.serv-jellyfish-wr').flip({
			axis: 'y',
			trigger: 'hover'
		});
	}

	if(window.screen.width < 960)
	{
		$('.portfolio-slider-wr').slick({
			dots: true,
			slidesToShow: 1,
		 	slidesToScroll: 1
		});
	}

	if(window.screen.width >= 960)
	{
		$('.portfolio-slider-wr').slick({
			infinite: true,
		 	slidesToShow: 3,
		 	slidesToScroll: 1
		});

		// $('#fullpage').fullpage({
		// 	sectionSelector: '.scroll-section',
		// 	fixedElements: '.second-menu',
		// 	onLeave: function(index, nextIndex, direction) {
		// 		var menu = $('.second-menu');
		// 		console.log(nextIndex);

		// 		if(nextIndex == 1){
		// 			$('.second-menu').css('display','none !important');
		// 			menu.css({
		// 				display: 'none !important'
		// 			});
		// 		}
		// 		if( nextIndex > 1 ) {
		// 			menu.css({
		// 				display: 'block',
		// 				position: 'fixed',
		// 				top: '-10px'
		// 			});
		// 		}
		// 	}
		// });
	}
	
	$(document).scroll(function(){
		if( $(document).scrollTop() > 2070) {
			$('#first-anim-numb').animate({ num: 51012}, {
			    duration: 3000,
			    step: function (num){
			        this.innerHTML = (num + 3).toFixed(0)
			    }
			});

			$('#second-anim-numb').animate({ num: 843}, {
			    duration: 3000,
			    step: function (num){
			        this.innerHTML = (num + 3).toFixed(0)
			    }
			});

			$('#third-anim-numb').animate({ num: 15234}, {
			    duration: 3000,
			    step: function (num){
			        this.innerHTML = (num + 3).toFixed(0)
			    }
			});

			$('#fourth-anim-numb').animate({ num: 176}, {
			    duration: 3000,
			    step: function (num){
			        this.innerHTML = (num + 3).toFixed(0)
			    }
			});
		}
	});

	var menu = $('.second-menu');
	var offset = menu.offset();
	var topOffset = 620;

	$(window).scroll(function(){
		var scroll = $(window).scrollTop();

		if(scroll >= topOffset){
			menu.css({
				top: '-10px',
				position: 'fixed'
			});
		}

		if(scroll < topOffset){
			menu.css({
				position: 'relative'
			})
		}
	});


	$('.top-slider').slick({
		dots: true,
	});

	$('.quotes-list').slick({
		dots: true,
		autoplay: true,
	  	autoplaySpeed: 5000,
	});

	$('.menu-open').click(function(){
		$('.mob-sidebar').fadeIn(500);
	});

	$('.mob-sidebar .closing').click(function(){
		$('.mob-sidebar').fadeOut(500);
	});

	$(document).click(function(e) {
		if(e.target.className == 'mob-sidebar') {
			$('.mob-sidebar').fadeOut(500);
		}
	});

	var langStatus = false;

	$('.current').click(function(){
		console.log(langStatus);
		if(!langStatus) {
			$('.other').fadeIn(300);
			langStatus = !langStatus;
		} else {
			$('.other').fadeOut(300);
			langStatus = !langStatus;
		}
		
	});

	$('.open-second').click(function(){
		$('.open-second').slideUp();
		$('.moving-menu-wr').fadeIn(100);
	});

	$('.second-menu .closing').click(function(){
		$('.moving-menu-wr').fadeOut(100);
		$('.open-second').slideDown();
	});

	
	var mapCoords = {
		lat : 50.4251266,
		lng : 30.5160992
	}
	var backMap = new google.maps.Map(document.getElementById("map-long"), {
		zoom : 17,
		center : mapCoords,
		zoomControl : false,
		streetViewControl : false
	});
	var frontMap = new google.maps.Map(document.getElementById("map-controller"), {
		zoom : 17,
		center : mapCoords
	});

	new google.maps.Marker({
		map : frontMap,
		position : mapCoords,
		icon : "img/marker.png"
	});
	
	frontMap.addListener("drag", function(){
		var center = {
			lat : frontMap.getCenter().lat(),
			lng : frontMap.getCenter().lng()
		};
		backMap.setCenter(center);
	});
});

	var anchors = [];
	var currentAnchor = -1;
	var isAnimating  = false;

	$(function(){
	    
	    function updateAnchors() {
	        anchors = [];
	        // $('.anchor').each(function(i, element){
	        //     anchors.push( $(element).offset().top );
	        // });
	        anchors = [0,620,1300,1900,2600];
	    }
	    
	    $('body').on('mousewheel', function(e){

	        e.preventDefault();
	        e.stopPropagation();
	        if( isAnimating ) {
	            return false;
	        }
	        isAnimating  = true;
	        // Increase or reset current anchor
	        if( e.originalEvent.wheelDelta >= 0 ) {
	            currentAnchor--;
	        }else{
	            currentAnchor++;
	        }
	        if( currentAnchor > (anchors.length - 1) ) {
	            currentAnchor = (anchors.length - 1);
	        }

	        if( currentAnchor < 0 ) {
	        	currentAnchor = 0;
	        }

	        isAnimating  = true;
	        $('html, body').animate({
	            scrollTop: parseInt( anchors[currentAnchor] )
	        },  'swing', function(){
	            isAnimating  = false;
	        });
	    });

	    updateAnchors();   
	    
	});
	

