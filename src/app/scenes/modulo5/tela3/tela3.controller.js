(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo5_Tela3Controller', Modulo5_Tela3Controller);

  /** @ngInject */
  function Modulo5_Tela3Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.resizeWindow();
    Game.showMenu();
    Game.changeMenu(false);

    if(!Game.data.outros.modulo5.tela3){
      Game.data.outros.modulo5.tela3 = {
        finished: false,
        selected: -1,
        points: 0,
        try:0
      }
    }

    var answer = 0;
    vm.maxTries = 3;

    vm.quiz = Game.data.outros.modulo5.tela3;
    vm.feedback = false;

    vm.select = function(id){
      if(vm.quiz.finished){
        /*if(vm.quiz.selected === id) {
          vm.confirm();
        }*/
        return;
      }

      $timeout(function(){
        vm.quiz.selected = id;
        //vm.confirm();
      })
    }

    vm.confirm = function(){
      if(vm.quiz.finished){
        $timeout(function(){
          vm.feedback = true;
        })
        return;
      }
      if(vm.quiz.selected < 0) return;

      if(vm.quiz.try < vm.maxTries){
        vm.quiz.try++;

        $timeout(function(){

          if(vm.quiz.selected === answer) {
            vm.quiz.points = 1;
            vm.quiz.finished = true;
            Game.finishScreen();
          }else{
            if(vm.quiz.try === vm.maxTries){
              vm.quiz.finished = true;
              Game.finishScreen();
            }/*else{
              toastr.warning('Você tem mais ' + (vm.maxTries - vm.quiz.try) + (vm.maxTries - vm.quiz.try === 1 ? ' tentativa' : ' tentativas'))
            }*/
          }
          vm.feedback = true;
        })
      }

    }

    vm.getTryText = function(){
      return (vm.maxTries - vm.quiz.try) <= 1 ? ' tentativa' : ' tentativas';
    }

    vm.closeFeedback = function(){
      $timeout(function(){
        vm.feedback = false;
      })
    }

  }
  Modulo5_Tela3Controller.$inject = ['$log', '$timeout', 'Game'];
})();
