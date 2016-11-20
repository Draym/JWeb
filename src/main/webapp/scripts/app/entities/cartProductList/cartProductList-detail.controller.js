'use strict';

angular.module('jwebApp')
    .controller('CartProductListDetailController', function ($scope, $rootScope, $stateParams, entity, CartProductList, Cart, Product) {
        $scope.cartProductList = entity;
        $scope.load = function (id) {
            CartProductList.get({id: id}, function(result) {
                $scope.cartProductList = result;
            });
        };
        var unsubscribe = $rootScope.$on('jwebApp:cartProductListUpdate', function(event, result) {
            $scope.cartProductList = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
