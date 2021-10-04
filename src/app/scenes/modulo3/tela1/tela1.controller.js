(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo3_Tela1Controller', Modulo3_Tela1Controller);

  /** @ngInject */
  function Modulo3_Tela1Controller($log, $timeout, Game, $compile, $scope, $window) {
    var vm = this;

    vm.game = Game;

    Game.hideMenu();

    vm.currentStory = 0;
    vm.stories = angular.element(".story");
    var markers = angular.element(".story-markers");

    vm.storyDirection = 'storyForwards';
    vm.visiteds = [];


    vm.nextStory = function(){
      $timeout(function(){
        if(vm.currentStory === vm.stories.length - 1) return;

        vm.storyDirection = 'storyForwards';

        vm.currentStory += 1;
        vm.visiteds[vm.currentStory] = true;

        if(vm.currentStory === vm.stories.length - 1){
          Game.finishScreen();
        }
      })
    }

    vm.prevStory = function(){
      $timeout(function(){
        if(vm.currentStory === 0) return;

        vm.storyDirection = 'storyBackwards';

        vm.currentStory -= 1;
      })
    }


    $timeout(function(){
      angular.element(vm.stories[vm.currentStory]).addClass("current");

      for(var i = 0; i < vm.stories.length; i++){
        //var newMark = angular.element("<div class='marker " + (i === vm.currentStory ? 'current' : (i < vm.currentStory ? 'visited' : '')) + "'></div>")
        var newMark = angular.element("<div class='marker' ng-class='{current: vm.currentStory === " + i + ", visited: vm.visiteds[" + i + "]}'></div>")
        vm.visiteds.push(i === 0 ? true : false)

        markers.append(newMark);
        $compile(newMark)($scope)
      }

      angular.element(document).keydown(vm.keyHandler);

    })

    vm.keyHandler = function(e) {
      switch(e.which) {
        case 37: // left
          vm.prevStory()
        break;

        case 38: // up

        break;

        case 39: // right
          vm.nextStory();
        break;

        case 40: // down

        break;

        default: return;
      }
      e.preventDefault();
    }



    Game.bfFunction = function(){
      angular.element(document).unbind('keydown', vm.keyHandler);
    }

    vm.storiesStyle = {
      transform: 'translateX(-50%)'
    }

    vm.resize = function(){
      $timeout(function(){
        var wnd = angular.element(window);

        var rate1 = wnd.width() / 563;
        var rate2 = wnd.height() / 949;
        var rate = Math.min(rate1, rate2) - 0.002;

        vm.storiesStyle.transform = 'translateX(-50%) scale(' + rate + ')'
      })

    }

    $timeout(function(){
      angular.element($window).on('resize', vm.resize);
      vm.resize();
    })


    vm.sobeDesce = -1;



  }
  Modulo3_Tela1Controller.$inject = ['$log', '$timeout', 'Game', '$compile', '$scope', '$window'];
})();
