'use strict';

angular.module('jwebApp')
    .controller('MarketPlaceProductsController', function ($scope, $stateParams, $location, MarketPlace, MarketPlaceNews, MarketPlaceProducts, Type) {

        $scope.loadProducts = function () {
            $scope.products = [];
            MarketPlaceProducts.query({id: $scope.marketPlace.id}, function (result) {

                $scope.products = result;
                console.log("result: ", result);
                for (var i = 0; i < $scope.products.length; ++i) {
                    if (($scope.type.id != -1 && $scope.products[i].baseProduct.type.id !== $scope.type.id)
                        || !$scope.products[i].baseProduct.name.toLowerCase().includes($scope.path.toLowerCase())) {
                        $scope.products.splice(i, 1);
                        --i;
                    }
                }
            }, function(result){
                console.log("err: ", result);
            });
        };

        $scope.loadMarketPlace = function () {
            MarketPlace.get({id: $stateParams.idm}, function (result) {
                $scope.marketPlace = result;
                MarketPlaceNews.query({id: $scope.marketPlace.id}, function (result) {
                    $scope.marketPlace.news = result;
                    $scope.initStars();
                    $scope.loadProducts();
                })
            }, function (result) {
                $location.url("/marketPlaces/" + $scope.marketPlace.id.toString() + "/detail");
            });
        };

        $scope.loadParser = function () {
            $scope.types = [];
            $scope.type = {id: -1, name: "All"};

            Type.query(function (result) {
                $scope.types = result;
                $scope.types.splice(0, 0, {name: "All", id: -1});
                $scope.type = $scope.types[0];
            });

            $scope.path = "";
        };

        $scope.parseType = function () {
            $scope.loadProducts();
        };

        $scope.parseName = function () {
            $scope.loadProducts();
        };

        $scope.loadAll = function () {
            $scope.loadParser();
            $scope.loadMarketPlace();
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
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

