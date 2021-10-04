(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .directive('verticalscroll', verticalscroll);

  /** @ngInject */
  function verticalscroll($timeout, $log, $window, Util, $rootScope) {
    var directive = {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'app/components/verticalscroll/verticalscroll.html',
      scope: {
        config: '='
      },
      controller: verticalscrollController,
      controllerAs: "vm",
      bindToController: true
    };

    return directive;

    function verticalscrollController(){
      var vm = this;

      vm.id = vm.config.id || 'vs' + Date.now();

      vm.style = {
        position: "absolute",
        left: vm.config.left || "auto",
        right: vm.config.right || 20,
        top: vm.config.top || 150,
        bottom: vm.config.bottom || "auto",
        width: vm.config.width || 10,
        height: vm.config.height || 500,
        background: vm.config.background || "none"
      }

      vm.backLine = {
        position: "absolute",
        left: vm.config.pointSize/2 || 5,
        top: 0,
        width: vm.config.backLineWidth || 1,
        height: vm.style.height,
        background: vm.config.backLineColor || "#ccc"
      }

      vm.compLine = {
        position: "absolute",
        left: vm.config.pointSize/2 || 5,
        top: 0,
        width: vm.config.compLineWidth || 1,
        height: 0,
        background: vm.config.compLineColor || "#EB8500"
      }

      vm.pointCompColor = vm.config.pointCompColor || "#EB8500";
      vm.currentPointBorder = vm.config.currentPointBorder || 4;

      vm.points = vm.config.points || 5;
      vm.pointsStyle = [];
      //vm.current = vm.config.current || 0;
      //vm.visited = vm.config.visited || [];

      vm.pointsDistance = vm.style.height/(vm.points - 1);

      var configVisited = true;
      if(vm.config.visited.length > 0) configVisited = false;

      for (var i = 0; i < vm.points; i++) {
        if(configVisited){
          if(i == 0) vm.config.visited.push(true);
          else vm.config.visited.push(false);
        }
        //console.log(i);
        vm.pointsStyle[i] = {
          position: "absolute",
          left: 0,
          top: i * vm.pointsDistance,
          width: vm.config.pointSize || 10,
          height: vm.config.pointSize || 10,
          background: vm.config.pointNormalColor || "#ccc",
          border: vm.config.pointNormalBorder || "1px solid grey",
          "border-radius": "50%",
          "box-sizing": "content-box"
        }
      }

      vm.updatePoints = function(){
        var last = 0;
        for (var i = 0; i < vm.config.visited.length; i++) {
          vm.pointsStyle[i].background = vm.config.pointNormalColor || "#ccc";
          vm.pointsStyle[i].border = vm.config.pointNormalBorder || "1px solid grey";
          vm.pointsStyle[i].left = 0;
          if(vm.config.visited[i]){
            vm.pointsStyle[i].background = vm.pointCompColor;
            last = i;
          }
        }
        vm.compLine.height = last * vm.pointsDistance;

        vm.pointsStyle[vm.config.current].background = "white";
        vm.pointsStyle[vm.config.current].border = vm.currentPointBorder + "px solid " + vm.pointCompColor;
        vm.pointsStyle[vm.config.current].left = -vm.currentPointBorder;
      }

      vm.direction = "down";
      vm.ptclick = function(ind){
        if(ind > 0){
          if(!vm.config.visited[ind - 1]) return;
        }
        vm.direction = (ind > vm.config.current ? "down" : "up");
        if(vm.direction == "down"){
          vm.config.next(ind);
        }else{
          vm.config.prev(ind);
        }
        /*vm.config.current = ind;
        vm.config.visited[vm.config.current] = true;
        vm.config.update();
        $rootScope.updateProgress();*/
      }

      vm.config.update = function(){
        vm.updatePoints();
        //console.log(vm.config);
        if(vm.config.callback) vm.config.callback(vm.direction);
      }

      $timeout(function(){
        if(vm.points <= 1){
          vm.style.display = "none";
        }
        vm.updatePoints();
      })

    }
  }
  verticalscroll.$inject = ['$timeout', '$log', '$window', 'Util', '$rootScope'];

})();
