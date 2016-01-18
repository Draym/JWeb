'use strict';

angular.module('jwebApp')
    .controller('BaseProductDetailController', function ($scope, $rootScope, $stateParams, entity, BaseProduct, Type, Product) {
        $scope.baseProduct = entity;
        $scope.load = function (id) {
            BaseProduct.get({id: id}, function(result) {
                $scope.baseProduct = result;
            });
        };
        var unsubscribe = $rootScope.$on('jwebApp:baseProductUpdate', function(event, result) {
            $scope.baseProduct = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
