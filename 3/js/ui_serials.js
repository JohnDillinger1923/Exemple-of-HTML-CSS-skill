function addReview(){

	var review = $('.reviews form').serialize();
	
	$.ajax({
		type: 	'POST',
		url: 	'/serials/reviews',
		data: 	review,
		success: function(data){
			console.log(data);

			var r = JSON.parse(data);

			response(r);
		}
	});
};