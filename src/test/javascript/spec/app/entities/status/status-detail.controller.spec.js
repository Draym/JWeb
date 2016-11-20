'use strict';

describe('Status Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockStatus, MockDelivery;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockStatus = jasmine.createSpy('MockStatus');
        MockDelivery = jasmine.createSpy('MockDelivery');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Status': MockStatus,
            'Delivery': MockDelivery
        };
        createController = function() {
            $injector.get('$controller')("StatusDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'jwebApp:statusUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
