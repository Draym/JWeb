'use strict';

describe('BaseProduct Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockBaseProduct, MockType, MockProduct;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockBaseProduct = jasmine.createSpy('MockBaseProduct');
        MockType = jasmine.createSpy('MockType');
        MockProduct = jasmine.createSpy('MockProduct');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'BaseProduct': MockBaseProduct,
            'Type': MockType,
            'Product': MockProduct
        };
        createController = function() {
            $injector.get('$controller')("BaseProductDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'jwebApp:baseProductUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
