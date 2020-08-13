(function() {
    'use strict';

    function P(x) {
        return {
            then: function(y) { return P(y && y(x) || x); },
            catch: function(y) { return P(y && y(x) || x); },
            finally: function(y) { return P(y && y(x) || x); }
        };
    }

    describe('main controller', function(){
        var vm = this,
            log,
            sortsMock = { 
                sorts: [{
                    "type": "climate",
                    "name": "Climate"
                    },{
                    "type": "created",
                    "name": "Created"
                    },{
                    "type": "diameter",
                    "name": "Diameter"
                    },{
                    "type": "edited",
                    "name": "Edited"
                    },{
                    "type": "gravity",
                    "name": "Gravity"
                    },{
                    "type": "name",
                    "name": "Name"
                    },{
                    "type": "orbital_period",
                    "name": "Orbital period"
                    },{
                    "type": "population",
                    "name": "Population"
                    },{
                    "type": "rotation_period",
                    "name": "Rotation period"
                    },{
                    "type": "surface_water",
                    "name": "Surface water"
                    },{
                    "type": "terrain",
                    "name": "Terrain"
                }],
                default: 5
            },
            paginator ={
                page: [{
                    name: 'Tatooine',
                    rotation_period: 23,
                    orbital_period: 304,
                    diameter: 10465,
                    climate: 'arid',
                    gravity: '1 standard',
                    terrain: 'desert',
                    surface_water: 1,
                    population: 200000,
                    residents: [],
                    films: [],
                    created: '2014-12-09T13:50:49.641000Z',
                    edited: '2014-12-20T20:58:18.411000Z',
                    url: 'http://swapi.dev/api/planets/1/'
                }],
                hasNext: true,
                hasPrev: false,
                partial: 10,
                total: 60
            };

        beforeEach(module('planetsListApp'));
        beforeEach(inject(function(_$controller_, _$log_) {

            vm.swService = {
                getByResouce: jasmine.createSpy('getByResouce').and.returnValue(P(paginator)),
                getResourceSorts : jasmine.createSpy('getResourceSorts').and.returnValue(sortsMock),
                getNext: jasmine.createSpy('getNext').and.returnValue(),
                getPrev: jasmine.createSpy('getPrev').and.returnValue()
            };

            vm.controller = _$controller_('MainController', vm.swService, _$log_);
            log = _$log_;

            spyOn(log, 'error').and.callThrough();
        }));

        it('should be defined', function(){
            expect(vm.controller).toBeDefined();
        });

        it('has been activated',  function(){
            expect(vm.controller.title).toBe('Stars Wars Universe - Planets');
            expect(vm.controller.sorts).toEqual(sortsMock.sorts);
            expect(vm.controller.defaultSort).toBe(sortsMock.default);

            expect(vm.controller.leftNavTitle).toBe('Juan Amestoy');
            expect(vm.controller.links).toEqual([{
                text: 'My resume!',
                type: 'perm_identity',
                href: 'https://www.linkedin.com/in/juanhamestoyparodi/'
            },{
                text: 'mail me!',
                type: 'mail',
                href: 'mailto:juaneteh@gmail.com'
            }]);
        })

        xit('has called swService.getByResouce, processPage, handleError and set view variables', function () {
            // two branches can be tested at the same time giving coverages 
            // by using a sync Promise mocked (P(x) defined at line 4)

            //success branch
            expect(vm.swService.getByResouce).toHaveBeenCalledWith('planets');
            expect(vm.controller.planets).toBe(paginator.page);
            expect(vm.controller.hasNextPage).toBe(paginator.hasNext);
            expect(vm.controller.hasPrevPage).toBe(paginator.hasPrev);
            expect(vm.controller.partial).toBe(paginator.partial);
            expect(vm.controller.total).toBe(paginator.total);
            expect(vm.controller.isLoading).toBe(false);

            //error branch
            expect(log.error).toHaveBeenCalled();
            expect(vm.controller.error).toBe(true)
        })

    });
})();