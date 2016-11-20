'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('myMarketPlace', {
                parent: 'site',
                url: '/MyMarketPlace',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace.html',
                        controller: 'MyMarketPlaceController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('marketPlace');
                        $translatePartialLoader.addPart('global');
                        $translatePartialLoader.addPart('news');
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('baseProduct');
                        $translatePartialLoader.addPart('promotion');
                        return $translate.refresh();
                    }]
                }
            }).state('myMarketPlace.edit', {
                parent: 'myMarketPlace',
                url: '/edit',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace-edit.html',
                        controller: 'MyMarketPlaceEditController',
                        size: 'lg'
                    }).result.then(function (result) {
                            $state.go('myMarketPlace', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            }).state('myMarketPlace.products', {
                parent: 'myMarketPlace',
                url: '/products',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace-products.html',
                        controller: 'MyMarketPlaceProductsController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('marketPlace');
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            }).state('myMarketPlace.news', {
                parent: 'myMarketPlace',
                url: '/news',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace-news.html',
                        controller: 'MyMarketPlaceNewsController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('marketPlace');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            }).state('myMarketPlace.stock', {
                parent: 'myMarketPlace',
                url: '/stock',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace-stock.html',
                        controller: 'MyMarketPlaceStockController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('marketPlace');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            }).state('myMarketPlace.promotions', {
                parent: 'myMarketPlace',
                url: '/promotions',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace-promotions.html',
                        controller: 'MyMarketPlacePromotionsController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('marketPlace');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            }).state('myMarketPlace.editProduct', {
                parent: 'myMarketPlace.products',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace-editProduct.html',
                        controller: 'MyMarketPlaceEditProductController',
                        size: 'lg'
                    }).result.then(function (result) {
                            $state.go('myMarketPlace.products', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            }).state('myMarketPlace.addProduct', {
                parent: 'myMarketPlace.products',
                url: '/add',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace-addProduct.html',
                        controller: 'MyMarketPlaceAddProductController',
                        size: 'lg'
                    }).result.then(function (result) {
                            $state.go('myMarketPlace.products', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            }).state('myMarketPlace.createProduct', {
                parent: 'myMarketPlace.addProduct',
                url: '/create',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace-createProduct.html',
                        controller: 'MyMarketPlaceCreateProductController',
                        size: 'lg'
                    }).result.then(function (result) {
                            $state.go('myMarketPlace.products', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            }).state('myMarketPlace.createPromotion', {
                parent: 'myMarketPlace.promotions',
                url: '/create',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/promotion/promotion-dialog.html',
                        controller: 'PromotionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    percent: null,
                                    reduction: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                            $state.go('myMarketPlace.promotions', null, { reload: true });
                        }, function() {
                            $state.go('myMarketPlace.promotions');
                        })
                }]
            }).state('myMarketPlace.addPromotion', {
                parent: 'myMarketPlace.promotions',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace-addPromotion.html',
                        controller: 'MyMarketPlaceAddPromotionController',
                        size: 'lg'
                    }).result.then(function (result) {
                            $state.go('myMarketPlace.promotions', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            }).state('myMarketPlace.addNews', {
                parent: 'myMarketPlace.news',
                url: '/add',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/myMarketPlace/myMarketPlace-addNews.html',
                        controller: 'MyMarketPlaceAddNewsController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    title: null,
                                    date: null,
                                    content: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                            $state.go('myMarketPlace.news', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            });
    });
