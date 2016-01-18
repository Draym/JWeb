'use strict';

angular.module('jwebApp')
    .controller('PromotionDetailController', function ($scope, $rootScope, $stateParams, entity, Promotion, Product) {
        $scope.promotion = entity;
        $scope.load = function (id) {
            Promotion.get({id: id}, function(result) {
                $scope.promotion = result;
            });
        };
        var unsubscribe = $rootScope.$on('jwebApp:promotionUpdate', function(event, result) {
            $scope.promotion = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
