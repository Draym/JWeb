'use strict';

angular.module('jwebApp')
    .controller('MyMarketPlaceEditController', function ($scope, $uibModalInstance, MarketPlace, myMarketPlace, myUser) {

        $scope.loadAll = function () {
            $scope.marketPlace = {};
            myMarketPlace.query(function (result) {
                $scope.marketPlace = result;
            }, function (result) {
                $scope.marketPlace.id = null;
                myUser.query(function (result) {
                    $scope.marketPlace.user = result;
                    $scope.marketPlace.rating = 0.1;
                });
            });
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('jwebApp:marketPlaceUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.marketPlace.id != null) {
                MarketPlace.update($scope.marketPlace, onSaveSuccess, onSaveError);
            } else {
                MarketPlace.save($scope.marketPlace, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
