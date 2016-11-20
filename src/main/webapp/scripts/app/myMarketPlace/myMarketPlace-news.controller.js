'use strict';

angular.module('jwebApp')
    .controller('MyMarketPlaceNewsController', function ($scope, $location, myMarketPlace, MarketPlaceNews) {

        $scope.loadNews = function() {
            myMarketPlace.query(function (result) {
                $scope.marketPlace = result;
                MarketPlaceNews.query({id: $scope.marketPlace.id}, function(result){
                    $scope.marketPlace.news = result;

                    for (var i = 0; i < $scope.marketPlace.news.length; ++i) {
                        var current = new Date($scope.marketPlace.news[i].date.toString());
                        if (($scope.date !== "" && $scope.date.toString().substring(0, 11) !== current.toString().substring(0, 11))
                            || !($scope.marketPlace.news[i].title.toLowerCase().includes($scope.path.toLowerCase()))) {
                            $scope.marketPlace.news.splice(i, 1);
                            --i;
                        }
                    }
                    $scope.marketPlace.news.sort(compareDate);
                })
            }, function(result){
                $location.url("/MyMarketPlace");
            });
        };

        function compareDate(a, b) {
            return (a.date < b.date);
        }

        $scope.loadParser = function() {
            $scope.date = "";
            $scope.path = "";
        };

        $scope.loadAll = function() {
            $scope.loadParser();
            $scope.loadNews();
        };

        $scope.parseDate = function(){
            $scope.loadNews();
        };

        $scope.parseName = function(){
            $scope.loadNews();
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };

        $scope.datePickerForDate = {};

        $scope.datePickerForDate.status = {
            opened: false
        };

        $scope.datePickerForDateOpen = function($event) {
            $scope.datePickerForDate.status.opened = true;
        };
    });

