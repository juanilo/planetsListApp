'use strict';

describe('Directive : planet-info', function() {
    var $compile,
        $rootScope,
        $scope,
        compiledDirective,
        directiveElement,
        directiveController,
        planet = {
            name: 'name_test',
            warning: 'warning_test',
            climate: 'climate_test',
            diameter: 'diameter_test',
            gravity: 'gravity_test',
            orbital_period: 'orbital_period_test',
            population: 'population_test',
            rotation_period: 'rotation_period_test',
            terrain: 'terrain_test',
            residents: [1, 2, 3]
        };

    beforeEach(module('planetsListApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
        $scope = $rootScope.$new();
        $scope.planet = planet;
        directiveElement = angular.element('<planet-info planet="planet"></planet-info>');
        compiledDirective = $compile(directiveElement)($scope);
        $rootScope.$digest();

        directiveController = directiveElement.controller('planetInfo');
    });

    describe('have a controller', function(){
        it('defined', function() {
            expect(directiveController).toBeDefined();
        });
    });

    it('Renders the container', function() {
        expect(compiledDirective.html()).toContain('planet-info');
    });

    it('Renders the title', function() {
        expect(compiledDirective.html()).toContain('planet-info__title');
    });

    it('Renders the details container', function() {
        expect(compiledDirective.html()).toContain('planet-info__details');
    });

    it('Renders the details', function() {
        expect(compiledDirective.html()).toContain('planet-info__details--line');
    });

});