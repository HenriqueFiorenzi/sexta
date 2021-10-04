(function() {
  'use strict';

  angular
    .module('infi-prateleira', ['infi-prateleira.external']);

   angular.module('infi-prateleira.external',
    [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngMessages',
        'ngAria',
        //'ngAudio',
        //'ngRoute',
        'ui.router',
        'ui.bootstrap',
        'toastr',
        //'sn.skrollr',
        'angularModalService',
        'LZW',
        'ngScrollbars',
        'swipe'
    ])

})();
