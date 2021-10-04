(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo4_Tela1Controller', Modulo4_Tela1Controller);

  /** @ngInject */
  function Modulo4_Tela1Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.hideMenu();
    },10)

    if(!Game.data.outros.modulo4.currentItem){
      Game.data.outros.modulo4 = {
        currentItem: -1,
        items: [false, false, false, false, false, false]
      }
    }

    vm.currentItem = Game.data.outros.modulo4.currentItem || -1;
    vm.items = Game.data.outros.modulo4.items || [false, false, false, false, false, false];

    var animations = ['cuboLeft', 'cuboRight', 'cuboUp', 'cuboDown'];
    //var animations = ['cuboDown'];
    vm.cuboAnimation = "cuboLeft";

    vm.selectMenu = function(id){
      if(id > 0){
        if(!vm.items[id - 1]) return;
      }
      $timeout(function(){
        if(id === vm.currentItem) return;

        vm.cuboAnimation = animations[Math.floor(Math.random() * animations.length)];
        vm.currentItem = id;


        if(!vm.completeds['tela' + (id + 1)]){
          vm.items[id] = true;
        }

        console.log(vm.items)

        if(vm.items.every(function(el){
          return el;
        }))
        {
          console.log("finalizou p2");
          Game.finishScreen();
        }
      })
    }



    //---------------------------------------------------------
    //--------------------- Interações ------------------------
    //---------------------------------------------------------

    //------------ Funções tela com pops ---------------------

    vm.completeds = {
      //Aquei entram as telas e suas características. Ex:
      //tela2: Game.data.outros.modulo6.tela2
    }
    vm.selecteds = {
      //Aquei entram as telas e suas características. Ex:
      //tela2: Game.data.outros.modulo6.tela2
    }
    vm.currentSelected = {
      //Aqui entram as telas e seus valores de pop. Ex:
      //tela2: -1
    }
    vm.callbacks = {
      //Aqui entram os callbacks quando finalizam os pops. Ex:
      //tela2: function(){
        //Game.finishScreen();
      //}
    }
    vm.nextPulsing = {
      //Aqui entram as telas e seus valores de pop. Ex:
      //tela2: 0
    }

    /*vm.finishAndGo = function(tela, go){
      $timeout(function(){
        console.log(vm.completeds[tela], vm.currentSelected[tela]);
        vm.completeds[tela][vm.currentSelected[tela]] = true;
        vm.selecteds[tela][vm.currentSelected[tela]] = true;

        vm.select(tela, go);
      })

    }

    vm.finishSubtela = function(tela, subtela){
      if(vm.currentSelected[tela] !== subtela) return;

      $timeout(function(){
        vm.completeds[tela][vm.currentSelected[tela]] = true;
        vm.selecteds[tela][vm.currentSelected[tela]] = true;

        vm.checkCompleted(tela);
      })
    }*/

    vm.select = function(tela, id, callback, sequencial, evt){
      $timeout(function(){
        //console.log(tela, vm.completeds[tela], id)
        if(id === vm.currentSelected[tela]) return;

        if(id > 0){
          if(id > vm.completeds[tela].length - 1) return;

          if(sequencial){
            if(!vm.completeds[tela][id - 1]) return;
          }
        }else if(id < 0){
          return;
        }

        /*console.log(Game.data.outros.modulo4['sub' + tela], id)
        if(Game.data.outros.modulo4['sub' + tela]){
          if(!Game.data.outros.modulo4['sub' + tela][id]){
            vm.completeds[tela][id] = true;
          }
        }else{
          vm.completeds[tela][id] = true;
        }*/
        vm.completeds[tela][id] = true;
        vm.currentSelected[tela] = id;
        vm.selecteds[tela] = [];
        vm.selecteds[tela][id] = true;


        if(angular.isDefined(vm.nextPulsing[tela])){
          vm.nextPulsing[tela] = -1;
          for(var i = 0; i < vm.completeds[tela].length; i++){
            if(!vm.completeds[tela][i]){
              vm.nextPulsing[tela] = i;
              break;
            }
          }
        }

        vm.checkCompleted(tela);

        if(callback){
          $timeout(function(){
            callback();
          }, 200)
        }

      })
    }

    vm.checkCompleted = function(tela){
      console.log(vm.completeds[tela])
      if(!vm.completeds[tela]) return true;

      if(vm.completeds[tela].every(function(el){
        return el;
      })){
        if(vm.callbacks[tela]){
          vm.callbacks[tela]();
          //vm.checkFinished();
        }
        return true;
      }

      return false
    }


    vm.close = function(tela){
      $timeout(function(){
        vm.currentSelected[tela] = -1;
      })
    }


    //------------ pg1 -----------------------------

    if(!Game.data.outros.modulo4.tela1){
      Game.data.outros.modulo4.tela1 = [false];
    }

    vm.completeds.tela1 = Game.data.outros.modulo4.tela1;
    vm.currentSelected.tela1 = -1;
    vm.nextPulsing.tela1 = 0;
    vm.callbacks.tela1 = function(){
      vm.items[0] = true;
    }

    //------------ pg2 -----------------------------

    if(!Game.data.outros.modulo4.tela2){
      Game.data.outros.modulo4.tela2 = [false];
    }

    vm.completeds.tela2 = Game.data.outros.modulo4.tela2;
    vm.currentSelected.tela2 = -1;
    vm.nextPulsing.tela2 = 0;
    vm.callbacks.tela2 = function(){
      vm.items[1] = true;
    }

    //------------ pg3 -----------------------------

    if(!Game.data.outros.modulo4.tela3){
      Game.data.outros.modulo4.tela3 = [true, false, false];
    }

    vm.completeds.tela3 = Game.data.outros.modulo4.tela3;
    vm.currentSelected.tela3 = 0;
    vm.nextPulsing.tela3 = 0;
    vm.callbacks.tela3 = function(){
      vm.items[2] = true;
    }

    //------------ pg4 -----------------------------

    if(!Game.data.outros.modulo4.tela4){
      Game.data.outros.modulo4.tela4 = [false, false];
    }

    vm.completeds.tela4 = Game.data.outros.modulo4.tela4;
    vm.currentSelected.tela4 = -1;
    vm.nextPulsing.tela4 = 0;
    vm.callbacks.tela4 = function(){
      vm.items[3] = true;
    }

    //------------ pg5 -----------------------------

    if(!Game.data.outros.modulo4.tela5){
      Game.data.outros.modulo4.tela5 = [true, false, false, false];
    }

    vm.completeds.tela5 = Game.data.outros.modulo4.tela5;
    vm.currentSelected.tela5 = 0;
    vm.nextPulsing.tela5 = 0;
    vm.callbacks.tela5 = function(){
      vm.items[4] = true;
    }



    Game.bfFunction = function(){

    }

    /*$timeout(function(){
      Game.finishScreen();
    }, 1000)*/

  }
  Modulo4_Tela1Controller.$inject = ['$log', '$timeout', 'Game'];
})();
