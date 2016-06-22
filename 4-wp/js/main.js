$(document).ready(function(){

	var moreInfo = false;

	$('.more-info').click(function(){
		moreInfo = !moreInfo;

		if(moreInfo){
			$('.about-text .hidden-c').slideDown();
		}
		if(!moreInfo){
			$('.about-text .hidden-c').slideUp();
		}
	});

	$('.map-hover').click(function(){
		$('.map-hover').slideUp(300);
		console.log('click');
	});

	var mapCoords = {
		lat : 59.909498, 
		lng : 30.470920
	}

	var gMap = new google.maps.Map(document.getElementById("map"), {
		zoom : 17,
		center : mapCoords,
		zoomControl : false,
		streetViewControl : false,
		mapTypeControl : false
	});

	new google.maps.Marker({
		map : gMap,
		position : mapCoords,
		icon : "img/marker.png"
	});
});