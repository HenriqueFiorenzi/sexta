(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo6_Tela1Controller', Modulo6_Tela1Controller);

  /** @ngInject */
  function Modulo6_Tela1Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    vm.showVideo = false;

    vm.video = document.getElementById('myVideo')
    vm.currentTime = 0;
    vm.maxTime = 0;
    vm.endVideo = Game.screenFinished();
    /*$timeout(function(){
      vm.video.play();
      if (!vm.video.paused) {
        vm.currentTime = vm.video.currentTime;
      }

    }, 500)*/

    $timeout(function(){
      angular.element('#myVideo').bind('contextmenu',function() { return false; });
    },100)

    vm.video.ontimeupdate=function(){vm.checkProgress()}
    /*vm.video.onended=function(){}*/


    vm.checkProgress= function(){
      if(!vm.video.seeking){
        vm.currentTime = vm.video.currentTime;
        if(vm.currentTime > vm.maxTime) vm.maxTime = vm.currentTime;
      }

      if((vm.currentTime > (vm.video.duration*0.98)) && !vm.endVideo){
        $timeout(function(){
          console.log("finalizou");
          Game.finishScreen();
          vm.endVideo = true;
        })
      }
    }



    vm.video.onseeking =  function(evt) {
      //vm.video.currentTime = Math.min(vm.video.currentTime, vm.maxTime);
      if(evt){
        if(evt.shiftKey && evt.altKey){
          vm.video.currentTime = vm.currentTime;
          //vm.trilhaSelected = (id - 1);
          return;
        }
      }
      if (vm.currentTime < vm.video.currentTime) {
        vm.video.currentTime = vm.currentTime;
      }
    }

    vm.video.onseeked = function(evt) {
      //vm.video.currentTime = Math.min(vm.video.currentTime, vm.maxTime);
      if(evt){
        if(evt.shiftKey && evt.altKey){
          vm.video.currentTime = vm.currentTime;
          //vm.trilhaSelected = (id - 1);
          return;
        }
      }
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
  Modulo6_Tela1Controller.$inject = ['$log', '$timeout', 'Game'];
})();
