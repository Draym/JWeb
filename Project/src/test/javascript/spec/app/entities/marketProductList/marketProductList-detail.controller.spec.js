'use strict';

describe('MarketProductList Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockMarketProductList, MockMarketPlace, MockProduct;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockMarketProductList = jasmine.createSpy('MockMarketProductList');
        MockMarketPlace = jasmine.createSpy('MockMarketPlace');
        MockProduct = jasmine.createSpy('MockProduct');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'MarketProductList': MockMarketProductList,
            'MarketPlace': MockMarketPlace,
            'Product': MockProduct
        };
        createController = function() {
            $injector.get('$controller')("MarketProductListDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'jwebApp:marketProductListUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
