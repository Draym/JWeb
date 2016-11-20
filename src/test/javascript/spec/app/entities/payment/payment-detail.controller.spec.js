'use strict';

describe('Payment Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockPayment, MockDelivery;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockPayment = jasmine.createSpy('MockPayment');
        MockDelivery = jasmine.createSpy('MockDelivery');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Payment': MockPayment,
            'Delivery': MockDelivery
        };
        createController = function() {
            $injector.get('$controller')("PaymentDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'jwebApp:paymentUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
