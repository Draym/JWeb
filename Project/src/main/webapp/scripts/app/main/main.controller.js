'use strict';

angular.module('jwebApp')
    .controller('MainController', function ($scope, Principal, MarketPlace, MarketPlaceNews, myUser, Subscription) {

        $scope.loadAll = function () {
            $scope.subscriber = false;
            MarketPlace.get({id: 1}, function (result) {
                $scope.marketPlace = result;
                MarketPlaceNews.query({id: $scope.marketPlace.id}, function (result) {
                    var news = result;
                    news.sort(compareDate);
                    $scope.marketPlace.news = [];
                    for (var i = 0; i < 2 && i < news.length; ++i) {
                        $scope.marketPlace.news.push(news[i]);
                    }
                    myUser.query(function (user) {
                        Subscription.query(function (result) {
                            for (var i = 0; i < result.length; ++i) {
                                if (result[i].user.id === user.id && result[i].idMarketPlace === $scope.marketPlace.id) {
                                    $scope.subscriber = true;
                                }
                            }
                        });
                    });
                })
            });
        };

        function compareDate(a, b) {
            return (a.date < b.date);
        }

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };

        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });
    });
