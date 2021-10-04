(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .directive('asvg', asvg);

  /** @ngInject */
  function asvg($timeout) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/asvg/asvg.html',
      scope: {
        svg:"=",
        config:"=",
        width:"=",
        height:"=",
        pos:"=",
        from:"=",
        fps:"=",
        tts:"@",
        animDuration:"=",
        scale:"=",
        id:"@",
        evento: "@"
      },
      controller: asvgController,
      controllerAs: "vm",
      bindToController: true
    };

    return directive;

    function asvgController(){
      var vm = this;

      vm.started = false;
      vm.json = JSON.parse(vm.svg),
      vm.comp = new SVGAnim(vm.json, vm.width, vm.height, (vm.fps || 24));
      vm.comp.stop();
      //vm.comp.mc.children[vm.config.childrenToStop].setLoops(false);

      console.log(vm.comp);
      //vm.duration = vm.animDuration || 500;

      vm.divstyle = {
        position: 'absolute',
        left: (vm.from ? vm.from.x : vm.pos.x),
        top: (vm.from ? vm.from.y : vm.pos.y),
        opacity: 0,
        transform: 'scale(' + (vm.scale ? vm.scale.from : 1) + ")",
        transition: 'left ' + vm.duration + 's, top ' + vm.duration + 's, transform ' + vm.duration + 's',
        width: (vm.width || 'auto'),
        height: (vm.height || 'auto')
      }

      console.log(vm.divstyle)
      console.log(vm.scale)

      vm.play = function(){
        vm.comp.play();
      }

      vm.stop = function(){
        vm.comp.stop();
      }

      vm.remove = function(){
        vm.stop();
        vm.comp.remove();
        angular.element("#" + vm.comp.s.id).remove();
        delete vm.comp;
      }

      $timeout(function(){
        angular.element("#" + vm.id).append(angular.element("#" + vm.comp.s.id));
        vm.duration = vm.animDuration || 0.5;
        if(vm.config == undefined){
          vm.config = {
            stoped:false
          }
        }else{
          if(vm.config.stoped == undefined){
            vm.config.stoped = false
          }
        }

        vm.config.play = vm.play;
        vm.config.stop = vm.stop;
        vm.config.start = vm.start;
        vm.config.remove = vm.remove;

        if(!vm.config.stoped) vm.start();
        else{
          if(vm.evento){
            addEventListener(vm.evento, vm.startEvento)
          }
        }
      })

      vm.startEvento = function(e){
        removeEventListener(vm.evento, vm.startEvento)
        vm.start();
      }

      vm.start = function(){
        if(vm.started){
          return;
        }

        vm.started = true;
        $timeout(function(){
          vm.divstyle.left = vm.pos.x;
          vm.divstyle.top = vm.pos.y;
          vm.divstyle.transition = 'left ' + vm.duration + 's, top ' + vm.duration + 's, transform ' + vm.duration + 's, opacity ' + vm.duration + 's';
          vm.divstyle.opacity = 1;
          vm.divstyle.transform = 'scale(' + (vm.scale ? vm.scale.to : 1) + ")";

          $timeout(function(){
            vm.comp.play();

            if(vm.config.stopTime != undefined){
              $timeout(function(){
                //vm.comp.stop();
                if(vm.comp == undefined) return;
                if(vm.config.childrenToStop != undefined) vm.comp.mc.children[vm.config.childrenToStop].stop();
                //vm.comp.mc.children[vm.config.childrenToStop].setLoops(false);
              }, vm.config.stopTime)
            }

          }, vm.duration + 200)
        }, (vm.tts || 500))
      }

    }
  }

  asvg.$inject = ['$timeout'];

})();
