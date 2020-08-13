(function() {
    'use strict';

    describe('swService', function(){
        var vm = this;

        beforeEach(module('planetsListApp'));
        beforeEach(inject(function($injector, _$http_) {

            vm.service = $injector.get( 'swService'); 

            spyOn(_$http_, 'get').and.callThrough();
        }));

        it('should be defined', function(){
            expect(vm.service).toBeDefined();
        });
    }); 

})();