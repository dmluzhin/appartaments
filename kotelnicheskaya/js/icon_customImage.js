ymaps.ready(function () {
	var myMap = new ymaps.Map('map-1', {
				center: [55.732514,37.619549],
				zoom: 18
			}, {
				searchControlProvider: 'yandex#search'
			}),

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				hintContent: 'Полянка 44',
				balloonContent: 'Полянка 44'
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
			});

	myMap.geoObjects.add(myPlacemark);
	myMap.behaviors.disable('scrollZoom');
	myMap.behaviors.disable('drag');
});