(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
