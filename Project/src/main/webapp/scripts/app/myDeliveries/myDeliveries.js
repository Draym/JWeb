'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('myDeliveries', {
                parent: 'site',
                url: '/MyDeliveries',
                data: {
                    authorities: [ 'ROLE_USER' ]
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myDeliveries/myDeliveries.html',
                        controller: 'MyDeliveriesController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('delivery');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            }).state('myDeliveries.confirm', {
                parent: 'myDeliveries',
                url: '/{id}/confirm',
                data: {
                    authorities: [ 'ROLE_USER' ]
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myDeliveries/myDeliveries-confirm.html',
                        controller: 'MyDeliveriesConfirmController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cart');
                        $translatePartialLoader.addPart('cartProductList');
                        $translatePartialLoader.addPart('global');
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('delivery');
                        return $translate.refresh();
                    }]
                }
            }).state('myDeliveries.payselect', {
                parent: 'myDeliveries',
                url: '/{id}/payselect',
                data: {
                    authorities: [ 'ROLE_USER' ]
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myDeliveries/myDeliveries-payselect.html',
                        controller: 'MyDeliveriesPaySelectController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('delivery');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            }).state('myDeliveries.create', {
                parent: 'myDeliveries',
                url: '/{id}/create',
                data: {
                    authorities: [ 'ROLE_USER' ]
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myDeliveries/myDeliveries-create.html',
                        controller: 'MyDeliveriesCreateController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cart');
                        $translatePartialLoader.addPart('cartProductList');
                        $translatePartialLoader.addPart('global');
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('delivery');
                        return $translate.refresh();
                    }]
                }
            });
    });
