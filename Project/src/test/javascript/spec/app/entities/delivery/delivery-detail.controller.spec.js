'use strict';

describe('Delivery Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockDelivery, MockStatus, MockPayment, MockUser, MockCart;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockDelivery = jasmine.createSpy('MockDelivery');
        MockStatus = jasmine.createSpy('MockStatus');
        MockPayment = jasmine.createSpy('MockPayment');
        MockUser = jasmine.createSpy('MockUser');
        MockCart = jasmine.createSpy('MockCart');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Delivery': MockDelivery,
            'Status': MockStatus,
            'Payment': MockPayment,
            'User': MockUser,
            'Cart': MockCart
        };
        createController = function() {
            $injector.get('$controller')("DeliveryDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'jwebApp:deliveryUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
