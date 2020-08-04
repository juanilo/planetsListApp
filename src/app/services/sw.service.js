(function() {
  'use strict';

  angular
    .module('planetsListApp')
    .service('swService', swService);

  swService.$inject = ['$http', '$q', 'lodash'];
 /*
  * name : Star Wars Service
  * description : this service allows to obtain different resources from swapi.dev
  * in this implementation we only need "planet" resource but this implementation 
  * could be easily consume the rest of the available resources like : 
  * 
  * films, people, species, starships & vehicles 
  *
  * just need to add the resource at resources Array.
  *
  * API documentation : https://swapi.dev/documentation
  */
  function swService($http, $q, _) {
    var rootUrl = 'http://swapi.dev/api/',
        resources = [{
          type : 'planets',
          sorts : [ 'climate', 'created', 'diameter', 'edited', 'gravity', 'name', 'orbital_period', 'population', 'rotation_period', 'surface_water', 'terrain' ],
          defaultSort : 5,
          url : 'planets/'
        }],
        lastResourceViewed,
        /*
         * Public methods of the service
         */
        service = {
          getByResouce : getByResouce,
          getNext : getNext,
          getPrev : getPrev,
          getResourceSorts : getResourceSorts
        },
        paginator = { 
          partial: 0
        };

    /*
     * method : handlePagination
     * description : Saves the paginator status 
     * param : result {Object}
     */
    function handlePagination(result, backDirection) {
        paginator.partial = paginator.partial + _.size(_.get(result,'data.results')) * (backDirection ? -1 : 1);
        paginator.count = _.get(result, 'data.count');
        paginator.prevUrl = _.get(result, 'data.previous');
        paginator.nextUrl = _.get(result, 'data.next');
    }


    /*
     * method : isValid
     * description : check if the endpoint fails 
     * param : result {Object}
     * return : {Boolean}
     */
    function isValid(result){
      if (result.status && (result.status === 200 || result.status === 201) &&
          result.data && _.isArray(result.data.results)) {
        return true;
      }
      return false;
    }

    /*
     * method : get
     * description : the main method of the service that 
     * param : url {String}
     * return : {Promise} with the result of the call
     */
    function get(url, backDirection) {
        return $http.get(url)
            .then(function(result) {
              if (isValid(result)){
                var page = _.get(result,'data.results');
                //saves the paginator status for further calls
                handlePagination(result, backDirection);
                //return the object with the results and pagination status
                return {
                    page: page,
                    hasNext: _.isNil(paginator.nextUrl) ? false : true,
                    hasPrev: _.isNil(paginator.prevUrl) ? false : true,
                    partial: paginator.partial,
                    total: paginator.count
                };
            }

              // if no valid result
            return {};
        });
    }

    /*
     * method : getResourceUrl
     * description : find the resource for a given type
     * param : type {String}
     */
    function getResourceUrl(type) {
      return _.find(resources, function getResourceUrlByType(resource){
          return resource.type === type;
      }).url;
    }

    /*
     * method : getResourceSorts
     * description : obtain the sorting fields and default sort for a given type
     * param : type {String}
     * return : {Object} with possible sorting values and default sort
     */
    function getResourceSorts(type) {
      var resource = _.find(resources, function getResourceUrlByType(resource){
                            return resource.type === type;
                        });
        return {
            sorts: _.map(resource.sorts, function returnSortObject(sortType) {
                        return {
                            type : sortType,
                            name : _(sortType).capitalize().replace('_',' ')
                        }
                    }),
            default: resource.defaultSort
      };
    }

    /*
     * method : getByResouce
     * description : call the endpoint using get method for a particular type of resource
     * and update the partial counter for the given resource if needed or restart it.
     * param : type {String}
     * return : {Promise} with the result of the call
     */
    function getByResouce(type) {
        if (lastResourceViewed !== type) {
            lastResourceViewed = type;
            paginator.partial = 0;
        }

      return get(rootUrl + getResourceUrl(type));
    }

    /*
     * method : getNext
     * description : get the next page url obtained in the previos call and return the results
     * return : {Promise} with the result of the call
     */
    function getNext() {
      if (!_.isNil(paginator.nextUrl)) {
        return get(paginator.nextUrl);
      } else {
        //this is just an edge case that will never occurs if service is used always calling to the enpoint through getByResource/get 
        return $q.reject('swService : There\'s no next page to get.');
      }
    }
    /*
     * method : getPrev
     * description : get the prev page url obtained in the previos call and return the results
     * return : {Promise} with the result of the call
     */
    function getPrev() {
      if (!_.isNil(paginator.prevUrl)) {
        return get(paginator.prevUrl, true);
      } else {
        //this is just an edge case that will never occurs if service is used always calling to the enpoint through getByResource/get 
        return $q.reject('swService : There\'s no previous page to get.');
      }
    }


    return service;
  }
})();
