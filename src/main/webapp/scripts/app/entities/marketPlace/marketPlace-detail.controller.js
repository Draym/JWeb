'use strict';

angular.module('jwebApp')
    .controller('MarketPlaceDetailController', function ($scope, $stateParams, $location, MarketPlace, MarketPlaceNews, myUser, Subscription) {

        $scope.loadAll = function () {
            $scope.subscriber = false;
            MarketPlace.get({id: $stateParams.id}, function (result) {
                $scope.marketPlace = result;
                MarketPlaceNews.query({id: $scope.marketPlace.id}, function (result) {
                    $scope.marketPlace.news = result;
                    $scope.marketPlace.news.sort(compareDate);
                    myUser.query(function (user) {
                        Subscription.query(function (result) {
                            for (var i = 0; i < result.length; ++i) {
                                if (result[i].user.id === user.id && result[i].idMarketPlace === $scope.marketPlace.id) {
                                    $scope.subscriber = true;
                                }
                            }
                        });
                    });
                    $scope.initStars();
                })
            });
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };

        function compareDate(a, b) {
            return (a.date < b.date);
        }

        $scope.subscribe = function () {
            myUser.query(function (result) {
                var sub = {id: null, user: result, idMarketPlace: $scope.marketPlace.id};
                Subscription.save(sub, function (result) {
                    $scope.$emit('jwebApp:subscriptionUpdate', result);
                    $scope.subscriber = true;
                });
            });
        };

        $scope.unsubscribe = function () {
            myUser.query(function (user) {
                Subscription.query(function (result) {
                    for (var i = 0; i < result.length; ++i) {
                        if (result[i].user.id === user.id && result[i].idMarketPlace === $scope.marketPlace.id) {
                            Subscription.delete(result[i], function (result) {
                                $scope.$emit('jwebApp:subscriptionDelete', result);
                                $scope.subscriber = false;
                            }, function(result){
                                console.log(result);
                            });
                        }
                    }
                });
            });
        };

        $scope.initStars = function () {

            $.fn.stars = function () {
                return $(this).each(function () {
                    $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
                });
            };

            $(function () {
                $('span.stars').stars().removeClass('hidden');
            });
        };

    });
