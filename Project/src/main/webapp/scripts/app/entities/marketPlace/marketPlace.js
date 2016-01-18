'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketPlace', {
                parent: 'entity',
                url: '/marketPlaces',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.marketPlace.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/marketPlace/marketPlaces.html',
                        controller: 'MarketPlaceController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('marketPlace');
                        $translatePartialLoader.addPart('subscription');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('marketPlace.detail', {
                parent: 'marketPlace',
                url: '/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jwebApp.marketPlace.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/marketPlace/marketPlace-detail.html',
                        controller: 'MarketPlaceDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('marketPlace');
                        return $translate.refresh();
                    }]
                }
            })
            .state('marketPlace.productList', {
                parent: 'marketPlace',
                url: '/{idm}/productList',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jwebApp.marketPlace.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/marketPlace/marketPlace-products.html',
                        controller: 'MarketPlaceProductsController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('marketPlace');
                        $translatePartialLoader.addPart('product');
                        return $translate.refresh();
                    }]
                }
            })
            .state('marketPlace.addToCart', {
                parent: 'marketPlace.productList',
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
                            $state.go('marketPlace.productList', null, {reload: true});
                        }, function () {
                            $state.go('marketPlace.productList');
                        })
                }]
            })
            .state('marketPlace.new', {
                parent: 'marketPlace',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/marketPlace/marketPlace-dialog.html',
                        controller: 'MarketPlaceDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    image: null,
                                    description: null,
                                    rating: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('marketPlace', null, { reload: true });
                    }, function() {
                        $state.go('marketPlace');
                    })
                }]
            })
            .state('marketPlace.edit', {
                parent: 'marketPlace',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/marketPlace/marketPlace-dialog.html',
                        controller: 'MarketPlaceDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['MarketPlace', function(MarketPlace) {
                                return MarketPlace.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('marketPlace', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('marketPlace.delete', {
                parent: 'marketPlace',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/marketPlace/marketPlace-delete-dialog.html',
                        controller: 'MarketPlaceDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['MarketPlace', function(MarketPlace) {
                                return MarketPlace.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('marketPlace', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
