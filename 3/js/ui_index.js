$(document).ready(function(){
	$('.video-icon').click(function(){

		var video = $('.video-link',this);
		var link = video[0].innerText;

		// document.getElementById('video-frame').setAttribute("src", link);

		$('.video-window-wrap').fadeIn(400);

	});

	$('.video-window .close').click(function(){
		$('.video-window-wrap').fadeOut(400);

		$('.frame-box iframe').empty();

		document.getElementById('video-frame').setAttribute("src", '');
	})
});