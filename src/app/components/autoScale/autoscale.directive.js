(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .directive('autoscale', autoscale);

  /** @ngInject */
  function autoscale($log, $window, SCENE_WIDTH, SCENE_HEIGHT) {
    var directive = {
      restrict: 'A',
      link: function(scope, element){
        scope.element = element;
        $log.debug(scope);
      },
      controller: function($scope){
        var auto = this;
        $log.debug($scope);
        var element = $scope.element;
        var wnd = angular.element($window);
        angular.element(element).css('width', SCENE_WIDTH + "px");
        angular.element(element).css('height', SCENE_HEIGHT + "px");
        $log.debug("inicia com " + SCENE_WIDTH + " e " + SCENE_HEIGHT);

        auto.getWindowWidth = function(){
          var wnd = angular.element($window);
          wnd.width();
        }

        auto.getWindowHeight = function(){
          var wnd = angular.element($window);
          wnd.height();
        }

        wnd.bind('resize', auto.adjustWindow);

        auto.adjustWindow = function(){
          var rate1 = auto.getWindowWidth() / SCENE_WIDTH;
          var rate2 = auto.getWindowHeight() / SCENE_HEIGHT;
          var rate = (Math.min(rate1, rate2) - 0.002);
          angular.element(element).css({
            '-webkit-transform': "scale({{rate}})",
            '-moz-transform': "scale({{rate}})",
            '-ms-transform': "scale({{rate}})",
            '-o-transform': "scale({{rate}})",
            'transform': "scale({{rate}})"
          });
          var valw = (wnd.width() - (SCENE_WIDTH * rate))/2;
          var valh = (wnd.height() - (SCENE_HEIGHT * rate))/2;
          angular.element(element).css('left', valw + "px");
          angular.element(element).css('top', valh + "px");
          //$log.debug(rate);
        };

        auto.adjustWindow();

      }
    };

    return directive;
  }
  autoscale.$inject = ['$log', '$window', 'SCENE_WIDTH', 'SCENE_HEIGHT'];
})();
