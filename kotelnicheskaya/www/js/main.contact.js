(function() {
    'use strict';

    Array.prototype.max = function() {
        return Math.max.apply(null, this);
    };

    Array.prototype.min = function() {
        return Math.min.apply(null, this);
    };

    var app = angular.module('main', []);

    app.controller('mainController', ['$scope', '$http', '$httpParamSerializerJQLike', function($scope, $http, $httpParamSerializerJQLike) {

        $scope.callbackFormData = {};
        $scope.orderFormData = {};
        $scope.sellFormData = {};
        $scope.barkliBrokerFormData = {};
        $scope.isCallbackFormSended = false;
        $scope.isBarkliBrokerFormSended = false;
        $scope.currentTab = 1;
        $scope.params = [];
        $scope.filter = {
            rooms: {
                min: 10,
                max: 10,
                currentMin: 10,
                currentMax: 10,
                cssClass: '.j-filter-rooms'
            },
            floor: {
                min: 10,
                max: 10,
                currentMin: 10,
                currentMax: 10,
                cssClass: '.j-filter-floor'
            },
            square: {
                min: 10,
                max: 10,
                currentMin: 10,
                currentMax: 10,
                cssClass: '.j-filter-square'
            },
            price: {
                min: 10,
                max: 10,
                currentMin: 10,
                currentMax: 10,
                cssClass: '.j-filter-price'
            }
        };
        $scope.showCallbackPopup = function() {
            if ($scope.isCallbackFormSended) $scope.isCallbackFormSended = false;
            $('.j-popup-callback').arcticmodal();
        };

        $scope.sendCallbackForm = function() {
            if ($scope.callbackForm.$valid) {
                $http({
                    method: 'POST',
                    url: 'http://www.kre.ru/landing/callme/',
                    data: $httpParamSerializerJQLike($scope.callbackFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $scope.callbackForm.$setPristine();
                    for (var prop in $scope.callbackFormData) {
                        $scope.callbackFormData[prop] = '';
                    }
                    $scope.isCallbackFormSended = true;
                    setTimeout(function() {
                        $('.j-popup-callback').arcticmodal('close');
                    }, 3000);
                    ga('send', 'event', 'callback', 'click button');
                    yaCounter19895512.reachGoal('callback');
                });
            }
        };

        $scope.showBarkliBrokerPopup = function() {
            if ($scope.isBarkliBrokerFormSended) $scope.isBarkliBrokerFormSended = false;
            $('.j-popup-barkli-broker').arcticmodal();
        };

        $scope.sendBarkliBrokerForm = function() {
            if ($scope.barkliBrokerForm.$valid) {
                $scope.barkliBrokerFormData['subject'] = 'Заявка на квартиру ЖК Полянка 44. Владимир Воинов.';
                $scope.barkliBrokerFormData['email'] = 'vvoinov@kre.ru';
                $http({
                    method: 'POST',
                    url: 'http://www.kre.ru/landing/callme/',
                    data: $httpParamSerializerJQLike($scope.barkliBrokerFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $scope.barkliBrokerForm.$setPristine();
                    for (var prop in $scope.barkliBrokerFormData) {
                        $scope.barkliBrokerFormData[prop] = '';
                    }
                    $scope.isBarkliBrokerFormSended = true;
                    setTimeout(function() {
                        $('.j-popup-barkli-broker').arcticmodal('close');
                    }, 3000);
                    ga('send', 'event', 'callback', 'click button');
                    yaCounter19895512.reachGoal('callback');
                });
            }
        };

        $scope.sendOrderForm = function() {
            if ($scope.orderForm.$valid) {
                $http({
                    method: 'POST',
                    url: 'http://www.kre.ru/landing/callme/',
                    data: $httpParamSerializerJQLike($scope.orderFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $('.j-popup-gratitude').arcticmodal();
                    setTimeout(function() {
                        $('.j-popup-gratitude').arcticmodal('close');
                    }, 3000);
                    $scope.orderForm.$setPristine();
                    for (var prop in $scope.orderFormData) {
                        $scope.orderFormData[prop] = '';
                    }
                    ga('send', 'event', 'callback', 'click button');
                    yaCounter19895512.reachGoal('callback');
                });
            }
        };

        $scope.sendSellForm = function() {
            if ($scope.sellForm.$valid) {
                $http({
                    method: 'POST',
                    url: 'http://www.kre.ru/landing/sell/',
                    data: $httpParamSerializerJQLike($scope.sellFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $('.j-popup-gratitude').arcticmodal();
                    setTimeout(function() {
                        $('.j-popup-gratitude').arcticmodal('close');
                    }, 3000);
                    $scope.sellForm.$setPristine();
                    for (var prop in $scope.sellFormData) {
                        $scope.sellFormData[prop] = '';
                    }
                    ga('send', 'event', 'callback', 'click button');
                    yaCounter19895512.reachGoal('callback');
                });
            }
        };

        $http.get(window.apartmentsUrl + '/').success(function(data) {

            $scope.searchMinMax = {
                rooms: [],
                floor: [],
                square: [],
                price: []
            };
            var flats = data.split('\n');
            flats.forEach(function(flat, i) {
                if (flat.length === 0) return;
                var currentFlat = flat.split(';');
                if (parseInt(currentFlat[1])*0 == 0) $scope.searchMinMax.rooms.push(currentFlat[1]);
                else $scope.searchMinMax.rooms.push(0);
                $scope.searchMinMax.floor.push(currentFlat[2]);
                $scope.searchMinMax.square.push(currentFlat[3]);
                if (parseInt(currentFlat[5])*0 == 0) $scope.searchMinMax.price.push(currentFlat[5]);
                else $scope.searchMinMax.price.push(0);

                $scope.params.push({
                    lot: parseInt(currentFlat[0]),
                    rooms: parseInt(currentFlat[1])*0 == 0 ? currentFlat[1] : 0,
                    floor: parseInt(currentFlat[2]),
                    square: parseFloat(currentFlat[3]),
                    section: currentFlat[4],
                    price: parseInt(currentFlat[5])*0 == 0 ? currentFlat[5] : 0,
                    img: currentFlat[6].split('|'),
                    housenumber: parseFloat(currentFlat[7]),
                    image: currentFlat[8].split('|')
                });
            });

            $scope.flatsSumm = $scope.params.length;

            $scope.slidersInit = function() {
                for (var prop in $scope.filter) {
                    $scope.filter[prop].min = $scope.filter[prop].currentMin = $scope.searchMinMax[prop].min();
                    $scope.filter[prop].max = $scope.filter[prop].currentMax = $scope.searchMinMax[prop].max();

                    $($scope.filter[prop].cssClass).slider({
                        range: true,
                        min: $scope.filter[prop].min,
                        max: $scope.filter[prop].max,
                        values: [$scope.filter[prop].min, $scope.filter[prop].max]
                    });
                }

                $('.j-filter-rooms, .j-filter-floor, .j-filter-square, .j-filter-price').on('slide', function(event, ui) {
                    var prop = $(this).data('param');
                    var $scope = angular.element('body').scope();
                    $scope.$apply(function() {
                        $scope.filter[prop].currentMin = ui.values[0];
                        $scope.filter[prop].currentMax = ui.values[1];
                    });
                    $('.m-flats__row_odd').removeClass('m-flats__row_odd');
                    $('.j-flats-row:visible:odd').addClass('m-flats__row_odd');
                    var $scope = angular.element('body').scope();
                    $scope.$apply(function() {
                        $scope.flatsSumm = $('.j-flats-row:visible').length;
                    });
                });

            }();

        });

        $scope.flatsReady = function() {
            $('.j-flats-row:odd').addClass('m-flats__row_odd');
            var scope = this.params;
            for (var i=0; i<scope.length; i+=1) {
                if(scope[i].img[0] == "-") {
                    /*document.querySelectorAll('.flats_plan')[i].classList.add('nopointer');
                     document.querySelectorAll('.flats_plan')[i].classList.remove('hovered');
                     document.querySelectorAll('.flats_plan')[i].classList.add('nobgimg');*/
                    /*$scope.flatInPopup.image[0].querySelectorAll('.b-flat-schema__img')[i].classList.add('undisplayed');*/
                }
            }
        };

        $scope.showFlatPopup = function(index) {
            $scope.flatInPopup = $scope.params[index];

            if($scope.flatInPopup.img[0] != "-" || $scope.flatInPopup.image[0] != "-") {

                $('.j-popup-flat').arcticmodal().ready(function(){

                    if($scope.flatInPopup.img[0] == "-") {
                        $('.planirovka').remove();
                    }

                    if($scope.flatInPopup.image[0].src == "-") {
                        $('.photo').remove();
                    }
                    $('.j-slider-popup').slick({
                        mobileFirst: true,
                        slidesToShow: 1,
                        speed: 150,
                        arrows: false,
                        infinite: false,
                        dots: true,
                        adaptiveHeight: true,
                        responsive: [
                            {
                                breakpoint: 1024,
                                settings: {
                                    arrows: true,
                                    centerMode: false,
                                    slidesToShow: 1
                                }
                            }
                        ]
                    });


                    $('.j-popup-close').click(function(){
                        $('.j-slider-popup').slick('unslick');
                    });

                    $(document).mouseup(function(e){
                        var container = $('.b-popup');
                        if(container.has(e.target).length === 0) {
                            $('.j-slider-popup').slick('unslick');
                        }
                    });
                });
            }
        };

        $http.get('/sliders.contact.json').success(function(data) {
            $scope.hugeSliderData = data;
        });

        $scope.hugeSliderReady = function () {
            setTimeout(function() {
                $('.j-huge-slider').slick({
                    slidesToShow: 1,
                    speed: 150
                });
            }, 1);
        };

        $scope.isShowRow = function(index) {
            return  ($scope.params[index].rooms >=  $scope.filter.rooms.currentMin &&
                $scope.params[index].rooms <= $scope.filter.rooms.currentMax) &&
                ($scope.params[index].floor >= $scope.filter.floor.currentMin &&
                $scope.params[index].floor <= $scope.filter.floor.currentMax) &&
                ($scope.params[index].square >= $scope.filter.square.currentMin &&
                $scope.params[index].square <= $scope.filter.square.currentMax) &&
                ($scope.params[index].price >= $scope.filter.price.currentMin &&
                $scope.params[index].price <= $scope.filter.price.currentMax);
        };



    }]);

    app.directive("repeatEnd", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                if (scope.$last) {
                    scope.$eval(attrs.repeatEnd);
                }
            }
        };
    });

})();


$(document).ready(function(){
    $('.b-filters').click(function(){
        $('.b-filters').toggleClass('filters-open');
    });
    $('.j-slider-enviroment').slick({
        mobileFirst: true,
        slidesToShow: 1,
        speed: 150,
        infinite: true,
        accessibility: false,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: 'unslick'
            }
        ]
    });
});
