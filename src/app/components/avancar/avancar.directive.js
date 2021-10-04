(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .directive('avancar', avancar);

  /** @ngInject */
  function avancar($timeout, $log, $window, Util, $rootScope) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/avancar/avancar.html',
      scope: {
        config: '='
      },
      controller: avancarController,
      controllerAs: "vm",
      bindToController: true
    };

    return directive;

    function avancarController(){
      var vm = this;

      vm.dragging = false;
      vm.comp = vm.config.comp || 100;
      vm.segments = vm.config.segments || 10;
      vm.segmentInitialSize = vm.config.segmentInitialSize || 6;
      vm.segmentFinalSize = vm.config.segmentFinalSize || 6;
      vm.direction = vm.config.direction || 'down';
      vm.btnWidth = 108;

      vm.style = vm.config.position || {left:0, top:0};
      vm.style.width = vm.btnWidth;
      vm.style.height = vm.btnWidth;
      vm.goBack = vm.config.goBack || false;

      vm.btnStyle = {top: 0, left:0};
      vm.clickPos = {x: 0, y: 0};
      vm.btnPos = {x: 0, y: 0};
      vm.dragComp = 0;

      var wnd = angular.element($window);

      vm.initDrag = function(event){
        vm.clickPos = Util.getEventPosition(event);
        vm.btnPos.x = vm.btnStyle.left;
        vm.btnPos.y = vm.btnStyle.top;
        wnd.on("mouseup", vm.stopDrag);
        wnd.on("mousemove", vm.moving);
      }

      vm.moving = function(event){
        event.preventDefault();

        var currentPos = Util.getEventPosition(event);
        var diff = {
          x: currentPos.x - vm.clickPos.x,
          y: currentPos.y - vm.clickPos.y
        }

        $timeout(function(){
          switch(vm.direction){
            case 'down':
              vm.btnStyle.top = Math.max(0, Math.min(vm.comp, vm.btnPos.y + diff.y));
              vm.dragComp = Math.abs(vm.btnStyle.top);
              break;
            case 'up':
              vm.btnStyle.top = Math.max(-vm.comp, Math.min(0, vm.btnPos.y + diff.y));
              vm.dragComp = Math.abs(vm.btnStyle.top);
              break;
            case 'left':
              vm.btnStyle.left = Math.max(-vm.comp, Math.min(0, vm.btnPos.x + diff.x));
              vm.dragComp = Math.abs(vm.btnStyle.left);
              break;
            case 'right':
              vm.btnStyle.left = Math.max(0, Math.min(vm.comp, vm.btnPos.x + diff.x));
              vm.dragComp = Math.abs(vm.btnStyle.left);
              break;
          }
        })

      }

      vm.stopDrag = function(){
        wnd.off("mouseup", vm.stopDrag);
        wnd.off("mousemove", vm.moving);

        if(vm.goBack){
          var found = false;

          console.log(vm.btnStyle.top, vm.btnStyle.left, vm.comp);

          switch(vm.direction){
            case 'down':
              if(Math.abs(vm.btnStyle.top - vm.comp) < vm.comp * 0.1){
                found = true;
              }
              break;
            case 'up':
              if(Math.abs(vm.btnStyle.top + vm.comp) < vm.comp * 0.1){
                found = true;
              }
              break;
            case 'left':
              if(Math.abs(vm.btnStyle.left + vm.comp) < vm.comp * 0.1){
                found = true;
              }
              break;
            case 'right':
              if(Math.abs(vm.btnStyle.left - vm.comp) < vm.comp * 0.1){
                found = true;
              }
              break;
          }

          if(!found){
            $timeout(function(){
              vm.btnStyle.left = 0;
              vm.btnStyle.top = 0;
              vm.dragComp = 0;
            })
          }else{
            $timeout(function(){
              vm.config.callback();
            }, 500)
          }
        }
      }

      vm.segmentsList = [];
      vm.segmentDist = vm.comp / vm.segments;
      var segmentDecrease = (vm.segmentInitialSize - vm.segmentFinalSize) / vm.segments;
      var leftIncrement = 0;
      var topIncrement = 0;
      switch(vm.direction){
        case 'down':
          topIncrement = vm.segmentDist;
          break;
        case 'up':
          topIncrement = -vm.segmentDist;
          break;
        case 'left':
          leftIncrement = -vm.segmentDist;
          break;
        case 'right':
          leftIncrement = vm.segmentDist;
          break;
      }
      for (var i = 0; i < vm.segments; i++) {
        var size = vm.segmentInitialSize - (i * segmentDecrease)
        vm.segmentsList[i] = {
          width: size,
          height: size,
          left: (leftIncrement * i) - size/2 + vm.btnWidth/2,
          top: (topIncrement * i) - size/2 + vm.btnWidth/2
        }
      }


      $timeout(function(){
        vm.btn = angular.element("#avancar-btn");
        vm.btn.on("mousedown", vm.initDrag);
      })

    }
  }
  avancar.$inject = ['$timeout', '$log', '$window', 'Util', '$rootScope'];

})();
