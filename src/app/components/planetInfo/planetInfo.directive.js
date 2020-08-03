(function() {
  'use strict';

  angular
    .module('planetsListApp')
    .directive('planetInfo', planetInfo);

  /** @ngInject */
  function planetInfo() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/planetInfo/planet-info.html',
      scope: {
          planet: '<' 
      },
      controller: PlanetInfoController,
      controllerAs: 'vm',
      bindToController: true
    };

    /** @ngInject */
    function PlanetInfoController() {
        var vm = this;

        vm.$onInit  = function(){
          if (vm.planet.name === 'unknown') {
            vm.planet.name = 'TBD';
            vm.planet.warning = '(not accurate info)'
          }
        }

    }

    return directive;
  }

})();
