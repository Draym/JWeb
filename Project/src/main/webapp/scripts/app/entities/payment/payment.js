'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('payment', {
                parent: 'entity',
                url: '/payments',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.payment.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/payment/payments.html',
                        controller: 'PaymentController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('payment');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('payment.detail', {
                parent: 'entity',
                url: '/payment/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.payment.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/payment/payment-detail.html',
                        controller: 'PaymentDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('payment');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Payment', function($stateParams, Payment) {
                        return Payment.get({id : $stateParams.id});
                    }]
                }
            })
            .state('payment.new', {
                parent: 'payment',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/payment/payment-dialog.html',
                        controller: 'PaymentDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    image: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('payment', null, { reload: true });
                    }, function() {
                        $state.go('payment');
                    })
                }]
            })
            .state('payment.edit', {
                parent: 'payment',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/payment/payment-dialog.html',
                        controller: 'PaymentDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Payment', function(Payment) {
                                return Payment.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('payment', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('payment.delete', {
                parent: 'payment',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/payment/payment-delete-dialog.html',
                        controller: 'PaymentDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Payment', function(Payment) {
                                return Payment.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('payment', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
