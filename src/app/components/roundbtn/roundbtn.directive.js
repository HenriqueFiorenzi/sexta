(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .directive('roundbtn', roundbtn);

  /** @ngInject */
  function roundbtn($timeout) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/roundbtn/roundbtn.html',
      scope: {
        btntext: '@'
      },
      controller: roundbtnController,
      controllerAs: "vm",
      transclude: true,
      bindToController: true
    };

    return directive;

    function roundbtnController(){
      var vm = this;
      console.log(vm);
    }
  }
  roundbtn.$inject = ['$timeout'];

})();
