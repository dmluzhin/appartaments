ymaps.ready(function () {
	var myMap = new ymaps.Map('map-1', {
				center: [55.742042,37.646220],
				zoom: 18
			}, {
				searchControlProvider: 'yandex#search'
			}),

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				hintContent: 'Котельническая Набережная 31',
				balloonContent: 'Котельническая Набережная 31'
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
			});

	myMap.geoObjects.add(myPlacemark);
	myMap.behaviors.disable('scrollZoom');
	myMap.behaviors.disable('drag');
});