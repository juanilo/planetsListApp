(function() {
  'use strict';

  angular
    .module('planetsListApp')
    .controller('MainController', MainController);

  MainController.$inject = ['swService', '$log' ]

  function MainController(swService, $log) {
    var vm = this;

    activate();

    /*
     * method : handlePagination
     * description : Saves the paginator and the total 
     * param : paginator {Object}
     */
    function processPage(paginator) {
      vm.planets = paginator.page;
      vm.hasNextPage = paginator.hasNext;
      vm.hasPrevPage = paginator.hasPrev;
      vm.partial = paginator.partial;
      vm.total = paginator.total;
    }

    /*
     * method : handleError
     * description : logs the error and shows the error message in the view 
     * param : error {Error}
     */
    function handleError(error){
      $log.error(error);
      vm.error = true;
    }

    /*
     * method : loadPlanets
     * description : make the first call to the service
     */
    function loadPlanets() {
      vm.isLoading = true;

      swService.getByResouce('planets')
        .then(processPage)
        .catch(handleError)
        .finally(function(){
          vm.isLoading = false;
          vm.isInnerLoading = false;
        })
    }

    /*
     * method : activate 
     * description : initialize the controller
     */
    function activate() {
      var swSort = swService.getResourceSorts('planets');

      vm.title = 'Stars Wars Universe - Planets';
      vm.sorts = swSort.sorts;
      vm.defaultSort = swSort.default;

      vm.leftNavTitle = 'Juan Amestoy';
      vm.links = [{
        text: 'My resume!',
        type: 'perm_identity',
        href: 'https://www.linkedin.com/in/juanhamestoyparodi/'
      },{
        text: 'mail me!',
        type: 'mail',
        href: 'mailto:juaneteh@gmail.com'
      }];

      loadPlanets();
    }

    /*
     * method : load 
     * description : allow rety or make the navigation calls.
     * param : action {String}
     */
    vm.load = function load(action) {
      if (action === 'retry'){
        vm.error = false;
        loadPlanets();
      }

      if (action === 'next') {
        vm.isInnerLoading = true;
        swService.getNext()
          .then(processPage)
          .catch(handleError);
      }

      if (action === 'back') {
        vm.isInnerLoading = true;
        swService.getPrev()
          .then(processPage)
          .catch(handleError);
      }
    }

  }
})();
