ymaps.ready(function () {
    var myMap = new ymaps.Map('map-1', {
            center: [55.732408,37.619423],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Большая Полянка ул., д. 44/2',
            balloonContent: 'Большая Полянка ул., д. 44/2'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map-icon-g.png',
            // Размеры метки.
            iconImageSize: [73, 94],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-30, -100]
        });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
});