$(document).ready(function() {

	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	$(".fancybox").fancybox();

	$(".top_mnu").navigation();

	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	var owl = $(".carousel");
	owl.owlCarousel({
		items : 4
	});
	owl.on("mousewheel", ".owl-wrapper", function (e) {
		if (e.deltaY > 0) {
			owl.trigger("owl.prev");
		} else {
			owl.trigger("owl.next");
		}
		e.preventDefault();
	});
	$(".next_button").click(function(){
		owl.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl.trigger("owl.prev");
	});
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	/*Forms Ajax*/

	$('#form1, #popup1_form').submit(function(e){
		e.preventDefault();

		var form_data = $(this).serialize();
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: form_data,
			success: function() {
				alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
				closePopup();
			},
			error: function() {
				alert("У нас что-то сломалось, пожалуйста, попробуйте еще раз позднее")
			}
		});
	});

	$('#popup_download1, #popup_download2').submit(function(e){
		e.preventDefault();

		var form_data = $(this).serialize();
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: form_data,
			success: function() {
				downloadPdf();
				alert("Спасибо за заявку! Скачивание сейчас начнется");

			},
			error: function() {
				alert("У нас что-то сломалось, пожалуйста, попробуйте еще раз позднее")
			}
		});
	});

	/*Forms Ajax*/

	/*Presentation Download*/

});

function downloadPdf() {
	var link = $('.download__link').attr('href');
	window.location.href = link;
}

function closePopup() {
	$(".popup.active").removeClass("active");
	$(".bg_popup.active").removeClass("active");
}