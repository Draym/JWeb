'use strict';

angular.module('jwebApp')
    .controller('MyMarketPlacePromotionsController', function ($scope, $location, myMarketPlace, MarketPlaceProducts, Promotion, Product) {

        $scope.loadProducts = function () {
            $scope.products = [];
            MarketPlaceProducts.query({id: $scope.marketPlace.id}, function (result) {

                $scope.products = result;
                for (var i = 0; i < $scope.products.length; ++i) {
                    if (($scope.promotion.id == -1 && $scope.products[i].promotion.id === 1)
                        || ($scope.promotion.id != -1 && $scope.products[i].promotion.id !== $scope.promotion.id)
                        || !$scope.products[i].baseProduct.name.toLowerCase().includes($scope.path.toLowerCase())) {
                        $scope.products.splice(i, 1);
                        --i;
                    }
                }
            });
        };

        $scope.loadMarketPlace = function () {
            myMarketPlace.query(function (result) {
                $scope.marketPlace = result;
                $scope.loadProducts();
            }, function (result) {
                $location.url("/MyMarketPlace");
            });
        };


        $scope.loadParser = function () {
            $scope.promotions = [];
            $scope.promotion = {id: -1, name: "All"};

            Promotion.query(function (result) {
                $scope.promotions = result;
                $scope.promotions.splice(0, 0, {name: "All", id: -1});
                $scope.promotion = $scope.promotions[0];
            });

            $scope.path = "";
        };

        $scope.parsePromotion = function () {
            $scope.loadProducts();
        };

        $scope.parseName = function () {
            $scope.loadProducts();
        };

        $scope.loadAll = function () {
            $scope.loadParser();
            $scope.loadMarketPlace();
        };

        var onSaveProduct = function (result) {
            $scope.$emit('jwebApp:productUpdate', result);
            $scope.refresh();
        };

        $scope.deletePromotion = function(param) {
          Product.get({id: param.id}, function(product){
              Promotion.get({id: 1}, function(result){
                  product.promotion = result;
                  Product.update(product, onSaveProduct);
              });
          });
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };
    });

