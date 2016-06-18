$(document).ready(function(){
	$('html').niceScroll();
	$('.today').niceScroll();

	

	$('.search_field').keyup(function(){
		var data = $('.search_field').serialize();

		$.ajax({
			type: 	'POST',
			url: 	'/lsearch',
			data: 	data,
			success: function(data){
				console.log(data);
				var rezult;

				if(data != false) rezult = JSON.parse(data);
				else rezult = false;

				 searchResponse(rezult);
			}
		});
	});

	$('.feedback-window .close').click(function(){
		$('.feedback-btn').animate({right: 0},350);
		$('.feedback-window').animate({right: '-505px'},400);
	});

	$('.feedback-btn').click(function(){

		var right = $('.feedback-btn').css('right');

		if(right == '500px'){
			$('.feedback-btn').animate({right: 0},350);
			$('.feedback-window').animate({right: '-505px'},400);
		} else {
			$('.feedback-btn').animate({right: '500px'},350);
			$('.feedback-window').animate({right: 0},400);
		}
	});

	$('.log-box .close').click(function(){
		$('.log-box').animate({
			left: '-100%'
		},500);
	});

	$('.response .close').click(function(){
		$('.response').fadeOut(400);
	});

	$('.log-button').click(function(){
		if($('.log-box').css('left') == '0px') $('.log-box').animate({left: '-100%'},500);
		else $('.log-box').animate({left: 0},500);
	});

	$('.log-ctrl-box .log').click(function(){
		$('.log-box form.log').fadeIn(400);
		$('.log-box form.reg').fadeOut(400);
	});

	$('.log-ctrl-box .reg').click(function(){
		$('.log-box form.reg').fadeIn(400);
		$('.log-box form.log').fadeOut(400);
	});

	$('.search_field').change(function(){
		var searchFocus = $('.search_field').is(':focus');
		var searchQuery = $.trim($('.search_field').val());
		console.log(searchFocus);
		if(searchFocus == false) $('.search-response').slideUp(500);

	});

});

function searchResponse(data)
{	
	if(data == undefined || data == null || data == false){
		var empty = '<p class="empty">Ничего не найдено</p>';
		$('.search-response').html(empty);
		$('.search-response').slideDown(500);
		return;
	} 

	var resultList = document.createElement('div');

	for(var i = 0; i < data.length; i++){
		var result = document.createElement('div');
		result.className = 'result';

		if(data[i].poster != ''){
			var poster = new Image();
			poster.src = '/img/posters/'+data[i].poster;
			console.log(data[i].poster);
		} else {
			var poster = document.createElement('div');
			poster.className = 'no-poster';
			poster.innerText = 'NO POSTER';
		}
		
		var title = document.createElement('h1');
		title.innerText = data[i].ru_name+' ('+data[i].year+')';
		
		var link = document.createElement('a');
		link.href = '/serials/'+data[i].id;

		link.appendChild(poster);
		link.appendChild(title);

		result.appendChild(link);

		resultList.appendChild(result);
	}

	

	$('.search-response').html(resultList);
	$('.search-response').slideDown(500);
}

function login(){
	var data = $(".log-box form.log").serialize();

	$.ajax({
		type: 	'POST',
		url: 	'/log/login',
		data: 	data,
		success: function(data){
			//console.log(data);
			var resp = JSON.parse(data);
			response(resp);

			if(resp.status == 'reload') window.location.reload();
		}
	})
};

function registration(){
	var data = $(".log-box form.reg").serialize();

	$.ajax({
		type: 	'POST',
		url: 	'/log/registration',
		data: 	data,
		success: function(data){
			var resp = JSON.parse(data);

			response(resp);
		}
	})
};

function response(msg)
{	
	if(msg.status == 'good') var color_msg = '<p style="color: rgb(0,255,0)">'+msg.msg+'</p>';
	else var color_msg = '<p style="color: rgb(255,0,0)">'+msg.msg+'</p>';

	$('.response').fadeIn(500);
	$('.response #text').html(color_msg);
	setTimeout("$('.response').fadeOut(500);",6000);
};

function time(mark){
	var serial = $('.time-box input').val();
	var data = 'time='+mark+'&serial='+serial;

	$.ajax({
		type:   'POST',
		url: 	'/log/time',
		data: 	data,
		success: function(data){
			//console.log(data);

			var resp = JSON.parse(data);

			if(resp.status == 'good') {
				var selector = '.time-box  div.'+mark;
				var val = Number($(selector).html());
				$(selector).html(val+1);
			}

			response(resp);
		}
	})
};

function logout(){
	$.ajax({
		url: 	'/log/logout',
		success: function(data){
			var r = JSON.parse(data);

			if(r.status == 'good') window.location.reload();

			response(r);
		}
	})
};

function test_resp(msg){
	console.log(msg);
	$('.response').fadeIn(500);
	$('.response').html(msg);
	setTimeout("$('.response').fadeOut(500);",30000);
}

function feedback(){
	var data = $(".feedback-window form").serialize();

	$.ajax({
		type: 	'POST',
		url: 	'/log/feedback',
		data: 	data,
		success: function(data){
			// test_resp(data);
			var resp = JSON.parse(data);

			response(resp);
		}
	})
}