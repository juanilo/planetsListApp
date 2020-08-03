(function() {
  'use strict';

  angular
    .module('planetsListApp')
    .factory('lodash', function($window) {
        return $window._;
    })
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
