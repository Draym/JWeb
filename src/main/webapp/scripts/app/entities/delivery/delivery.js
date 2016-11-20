'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('delivery', {
                parent: 'entity',
                url: '/deliveries',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.delivery.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/delivery/deliverys.html',
                        controller: 'DeliveryController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('delivery');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('delivery.detail', {
                parent: 'entity',
                url: '/delivery/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.delivery.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/delivery/delivery-detail.html',
                        controller: 'DeliveryDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('delivery');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Delivery', function($stateParams, Delivery) {
                        return Delivery.get({id : $stateParams.id});
                    }]
                }
            })
            .state('delivery.new', {
                parent: 'delivery',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/delivery/delivery-dialog.html',
                        controller: 'DeliveryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('delivery', null, { reload: true });
                    }, function() {
                        $state.go('delivery');
                    })
                }]
            })
            .state('delivery.edit', {
                parent: 'delivery',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/delivery/delivery-dialog.html',
                        controller: 'DeliveryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Delivery', function(Delivery) {
                                return Delivery.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('delivery', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('delivery.delete', {
                parent: 'delivery',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/delivery/delivery-delete-dialog.html',
                        controller: 'DeliveryDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Delivery', function(Delivery) {
                                return Delivery.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('delivery', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
