'use strict';

describe('MarketPlace Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockMarketPlace, MockNews, MockUser, MockProduct;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockMarketPlace = jasmine.createSpy('MockMarketPlace');
        MockNews = jasmine.createSpy('MockNews');
        MockUser = jasmine.createSpy('MockUser');
        MockProduct = jasmine.createSpy('MockProduct');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'MarketPlace': MockMarketPlace,
            'News': MockNews,
            'User': MockUser,
            'Product': MockProduct
        };
        createController = function() {
            $injector.get('$controller')("MarketPlaceDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'jwebApp:marketPlaceUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
