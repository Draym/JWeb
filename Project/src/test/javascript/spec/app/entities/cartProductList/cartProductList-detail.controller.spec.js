'use strict';

describe('CartProductList Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockCartProductList, MockCart, MockProduct;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockCartProductList = jasmine.createSpy('MockCartProductList');
        MockCart = jasmine.createSpy('MockCart');
        MockProduct = jasmine.createSpy('MockProduct');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'CartProductList': MockCartProductList,
            'Cart': MockCart,
            'Product': MockProduct
        };
        createController = function() {
            $injector.get('$controller')("CartProductListDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'jwebApp:cartProductListUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
