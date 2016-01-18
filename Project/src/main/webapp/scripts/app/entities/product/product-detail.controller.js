'use strict';

angular.module('jwebApp')
    .controller('ProductDetailController', function ($scope, $rootScope, $stateParams, Product, ProductsById, BaseProduct) {

        $scope.quantity = 1;

        $scope.loadAll = function () {
            $scope.products = [];
            $scope.product = {};

            Product.get({id: $stateParams.id}, function (result) {
                $scope.product = result;
                ProductsById.query({id: $scope.product.baseProduct.id}, function(result){
                    $scope.products = result;
                });
            });
        };

        $scope.updateRating = function(){
            console.log("select: ", $scope.myrating);
            if ($scope.product.baseProduct.rating < 1) {
                $scope.product.baseProduct.rating = $scope.myrating;
                console.log("new1: ", $scope.product.baseProduct.rating);
            } else {
                var nb = ($scope.product.baseProduct.rating * 4);
                console.log("nb: ", nb);
                $scope.product.baseProduct.rating = (nb+ parseInt($scope.myrating)) / 5;
                console.log("new2: ", $scope.product.baseProduct.rating);
            }
            BaseProduct.update($scope.product.baseProduct, function (result) {
                $scope.$emit('jwebApp:baseProductUpdate', result);
                window.location.reload();
            });
        };

        $scope.loadAll();
    });
