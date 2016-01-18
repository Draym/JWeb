'use strict';

angular.module('jwebApp')
    .controller('AllMarketPlacesController', function ($scope, MarketPlaces) {
        $scope.loadMarkets = function () {
            $scope.marketPlace = [];
            MarketPlaces.query(function (result) {
                $scope.marketPlaces = result;
                for (var i = 0; i < $scope.marketPlaces.length; ++i) {
                    if (!$scope.marketPlaces[i].name.toLowerCase().includes($scope.path.toLowerCase())) {
                        $scope.marketPlaces.splice(i, 1);
                        --i;
                    }
                }
            });
        };

        $scope.loadParser = function () {
            $scope.path = "";
        };

        $scope.parseType = function () {
            $scope.loadMarkets();
        };

        $scope.parseName = function () {
            $scope.loadMarkets();
        };

        $scope.loadAll = function () {
            $scope.loadParser();
            $scope.loadMarkets();
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };
    });
