'use strict';

describe('Product Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockProduct, MockBaseProduct, MockPromotion, MockCartProductList, MockMarketPlace;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockProduct = jasmine.createSpy('MockProduct');
        MockBaseProduct = jasmine.createSpy('MockBaseProduct');
        MockPromotion = jasmine.createSpy('MockPromotion');
        MockCartProductList = jasmine.createSpy('MockCartProductList');
        MockMarketPlace = jasmine.createSpy('MockMarketPlace');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Product': MockProduct,
            'BaseProduct': MockBaseProduct,
            'Promotion': MockPromotion,
            'CartProductList': MockCartProductList,
            'MarketPlace': MockMarketPlace
        };
        createController = function() {
            $injector.get('$controller')("ProductDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'jwebApp:productUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
