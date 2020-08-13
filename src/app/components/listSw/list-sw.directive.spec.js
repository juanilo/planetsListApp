'use strict';

describe('Directive : list-sw', function() {
    var $compile,
        $rootScope,
        $scope = {
            elements: [{
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
            }],
            sorts: [ 'name', 'diameter' ],
            defaultSort: 'name'
        },
        compiledDirective,
        directiveElement,
        directiveController;

    beforeEach(module('planetsListApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
        $scope = $rootScope.$new();
        directiveElement = angular.element('<list-sw elements="elements" sorts="sorts" default-sort="defaultSort"></list-sw>');
        compiledDirective = $compile(directiveElement)($scope);
        $scope.$digest();

        directiveController = directiveElement.controller('listSw');
    });

    describe('have a controller', function(){
        it('defined', function() {
            expect(directiveController).toBeDefined();
        });
    });

    it('Renders the container', function() {
        expect(compiledDirective.html()).toContain('list-sw');
    });

    xit('Renders the sorter', function() {
        expect(compiledDirective.html()).toContain('list-sw__sort');
    });

    it('Renders the elements', function() {
        expect(compiledDirective.html()).toContain('list-sw__elements');
    });

});
