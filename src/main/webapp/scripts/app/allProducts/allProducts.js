'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('allProducts', {
                parent: 'site',
                url: '/AllProducts',
                data: {
                    pageTitle: 'jwebApp.allproducts.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/allProducts/allProducts.html',
                        controller: 'AllProductsController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            }).state('allProducts.addToCart', {
                parent: 'allProducts',
                url: '/{id}/addToCart/{nbr}',
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/myCarts/myCarts-addProduct.html',
                        controller: 'MyCartsAddProductController',
                        size: 'lg',
                        resolve: {
                            entity: ['Product', function(Product) {
                                return Product.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('allProducts', null, {reload: true});
                        }, function () {
                            $state.go('allProducts');
                        })
                }]
            });
    });
