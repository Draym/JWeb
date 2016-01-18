'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('product', {
                parent: 'entity',
                url: '/products',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.product.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/product/products.html',
                        controller: 'ProductController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('cart');
                        $translatePartialLoader.addPart('marketPlace');
                        $translatePartialLoader.addPart('cartProductList');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('product.detail', {
                parent: 'entity',
                url: '/product/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jwebApp.product.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/product/product-detail.html',
                        controller: 'ProductDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('cart');
                        $translatePartialLoader.addPart('marketPlace');
                        $translatePartialLoader.addPart('cartProductList');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('product.list', {
                parent: 'entity',
                url: '/product/{id}/list',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jwebApp.product.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/product/product-list-detail.html',
                        controller: 'ProductListDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('cart');
                        $translatePartialLoader.addPart('marketPlace');
                        $translatePartialLoader.addPart('cartProductList');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('product.new', {
                parent: 'product',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/product/product-dialog.html',
                        controller: 'ProductDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    valid: false,
                                    stock: null,
                                    price: null,
                                    sill: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('product', null, { reload: true });
                    }, function() {
                        $state.go('product');
                    })
                }]
            })
            .state('product.edit', {
                parent: 'product',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/product/product-dialog.html',
                        controller: 'ProductDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Product', function(Product) {
                                return Product.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('product', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('product.delete', {
                parent: 'product',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/product/product-delete-dialog.html',
                        controller: 'ProductDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Product', function(Product) {
                                return Product.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('product', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            }).state('product.addProductDetail', {
                parent: 'product.detail',
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
                            $state.go('product.detail', null, {reload: true});
                        }, function () {
                            $state.go('product.detail');
                        })
                }]
            }).state('product.addProductList', {
                parent: 'product.list',
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
                            $state.go('product.list', null, {reload: true});
                        }, function () {
                            $state.go('product.list');
                        })
                }]
            });
    });
