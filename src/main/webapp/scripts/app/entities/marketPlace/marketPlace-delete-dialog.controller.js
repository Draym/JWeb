'use strict';

angular.module('jwebApp')
	.controller('MarketPlaceDeleteController', function($scope, $uibModalInstance, entity, MarketPlace) {

        $scope.marketPlace = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            MarketPlace.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
