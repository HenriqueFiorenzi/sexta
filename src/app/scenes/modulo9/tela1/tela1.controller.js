(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo9_Tela1Controller', Modulo9_Tela1Controller);

  /** @ngInject */
  function Modulo9_Tela1Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.resizeWindow();
    Game.showMenu();
    Game.changeMenu(false);

    vm.showintro = false;

    vm.video = document.getElementById('myVideo')
    vm.currentTime = 0;
    vm.endVideo = Game.screenFinished();
    /*$timeout(function(){
      vm.video.play();
      if (!vm.video.paused) {
        vm.currentTime = vm.video.currentTime;
      }

    }, 500)*/

    vm.video.ontimeupdate=function(){vm.checkProgress()}
    /*vm.video.onended=function(){}*/


    vm.checkProgress= function(){
      if(!vm.video.seeking){
        vm.currentTime = vm.video.currentTime;
      }

      if((vm.video.currentTime > (vm.video.duration*0.95)) && !vm.endVideo){
        $timeout(function(){
          console.log("finalizou");
          Game.finishScreen();
          vm.endVideo = true;
        })
      }
    }



    vm.video.onseeking =  function(event) {
      if (vm.currentTime < vm.video.currentTime) {
        vm.video.currentTime = vm.currentTime;
      }
    }

    vm.video.onseeked = function(event) {
      if (vm.currentTime < vm.video.currentTime) {
        vm.video.currentTime = vm.currentTime;
      }
    }

    vm.init = function(){
      $timeout(function(){
        vm.showintro = false;

        $timeout(function(){
          vm.video.play();
          if (!vm.video.paused) {
            vm.currentTime = vm.video.currentTime;
          }

        }, 500)

      })
    }

  }
  Modulo9_Tela1Controller.$inject = ['$log', '$timeout', 'Game'];
})();
