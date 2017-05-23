ymaps.ready(function () {
	var myMap = new ymaps.Map('map-1', {
				center: [55.745656,37.642923],
				zoom: 18
			}, {
				searchControlProvider: 'yandex#search'
			}),

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				hintContent: 'Котельническая Набережная 13',
				balloonContent: 'Котельническая Набережная 13'
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
			});

	myMap.geoObjects.add(myPlacemark);
	myMap.behaviors.disable('scrollZoom');
	myMap.behaviors.disable('drag');
});