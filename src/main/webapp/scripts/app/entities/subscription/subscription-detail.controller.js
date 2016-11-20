'use strict';

angular.module('jwebApp')
    .controller('SubscriptionDetailController', function ($scope, $rootScope, $stateParams, entity, Subscription, User) {
        $scope.subscription = entity;
        $scope.load = function (id) {
            Subscription.get({id: id}, function(result) {
                $scope.subscription = result;
            });
        };
        var unsubscribe = $rootScope.$on('jwebApp:subscriptionUpdate', function(event, result) {
            $scope.subscription = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
