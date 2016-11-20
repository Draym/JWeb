'use strict';

angular.module('jwebApp')
    .controller('MyMarketPlaceController', function ($scope, $location, myMarketPlace, MarketPlaceNews) {

        $scope.loadAll = function() {
            myMarketPlace.query(function (result) {
                $scope.marketPlace = result;
                MarketPlaceNews.query({id: $scope.marketPlace.id}, function(result){
                    $scope.marketPlace.news = result;
                })
            }, function(result){
                $location.url("/MyMarketPlace/edit");
            });
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };
    });
