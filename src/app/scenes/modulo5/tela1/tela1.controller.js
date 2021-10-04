(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo5_Tela1Controller', Modulo5_Tela1Controller);

  /** @ngInject */
  function Modulo5_Tela1Controller($log, $timeout, Game, $compile, $scope) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo5.screens){
      Game.data.outros.modulo5.screens = [false, false, false, false, false, false, false, false, false];
      Game.data.outros.modulo5.currentPage = 0;
    }

    vm.started = false;

    vm.screensVisited = Game.data.outros.modulo5.screens || [false, false, false, false, false, false, false, false, false];
    vm.currentPage = Game.data.outros.modulo5.currentPage || 0;
    vm.maxPages = 0;
    vm.animating = false;
    vm.scrollDirection = "scrollDown";

    vm.scrollDown = function(){
      $timeout(function(){
        if(vm.currentPage < vm.maxPages - 1 && !vm.animating){
          vm.scrollTo(vm.currentPage + 1)
        }
      })
    }

    vm.scrollUp = function(){
      $timeout(function(){
        if(vm.currentPage > 0 && !vm.animating){
          vm.scrollTo(vm.currentPage - 1);
        }
      })
    }

    vm.scrollTo = function(ind){
      if(ind > 0){
        if(!vm.screensVisited[ind - 1]) return;
      }
      $timeout(function(){
        vm.animating = true;
        if(ind > vm.currentPage) vm.scrollDirection = 'scrollDown';
        else  vm.scrollDirection = 'scrollUp';
        vm.currentPage = ind;

        //if(vm.currentPage === 2 || vm.currentPage === 3 || vm.currentPage === 4 || vm.currentPage === 6) vm.screensVisited[vm.currentPage] = true;
        if(vm.checkCompleted('tela' + vm.currentPage)){
          vm.screensVisited[vm.currentPage] = true;
        }

        if(vm.screensVisited.every(function(el){
          return el
        })){
          Game.finishScreen();
        }

        $timeout(function(){
          vm.animating = false;
        },200)
      })
    }

    vm.checkFinished = function(){
      if(vm.screensVisited.every(function(el){
        return el;
      })){
        Game.finishScreen();
      }
    }

    $timeout(function(){

      /*var addSubpage = false;
      if(!Game.data.outros.modulo5.tela6){
        Game.data.outros.modulo5.tela6 = [];
        addSubpage = true;
      }
      var subpages = angular.element(".subpage");
      var subpagesNav = angular.element(".subpage-navigation");

      for (var j = 0; j < subpages.length; j++) {
        var subpage = angular.element(subpages[j]);
        if(addSubpage) Game.data.outros.modulo5.tela6.push(j === 0 ? true : false);

        subpage.attr('ng-show', 'vm.currentSelected.tela6 === ' + j);
        //subpage.attr('ng-class', '{current: vm.currentPage === ' + i + '}');

        $compile(subpage)($scope)

        var newNav = angular.element('<div class="subpage-nav" ng-class="{visited: vm.completeds.tela6[' + j + '], current: vm.currentSelected.tela6 === ' + j + '}" ng-click="vm.select(' + "'tela6'" + ', ' + j + ')">' + (j + 1) + '</div>')

        subpagesNav.append(newNav)

      }
      vm.completeds.tela6 = Game.data.outros.modulo5.tela6;
      $compile(subpagesNav)($scope)*/

      var pages = angular.element(".page");
      var pageMenu = angular.element('.page-menu');
      vm.maxPages = pages.length;

      for (var i = 0; i < pages.length; i++) {
        var page = angular.element(pages[i]);

        //if(i === 0) page.addClass('current')

        page.attr('ng-show', 'vm.currentPage === ' + i);
        //page.attr('ng-class', '{current: vm.currentPage === ' + i + '}');

        $compile(page)($scope)

        var newPageNav = angular.element('<div class="menu-nav" ng-class="{current:vm.currentPage === ' + i + '}" ng-click="vm.scrollTo(' + i + ')"></div>')

        pageMenu.append(newPageNav);
      }

      $compile(pageMenu)($scope);

      $timeout(function(){
        vm.started = true;
      },500)


      //angular.element(window).on('wheel', function(e){
      window.addEventListener('wheel', function(e) {
        if (e.deltaY > 0){
          vm.scrollDown();
        }else{
          vm.scrollUp();
        }
      })

      angular.element(document).keydown(vm.keyHandler);

    })



    vm.keyHandler = function(e) {
      switch(e.which) {
        case 37: // left
        if(vm.currentPage === 0){
          if(vm.currentSelected.tela0 >= 0) vm.select('tela0', vm.currentSelected.tela0 - 1)
        }
          if(vm.currentPage === 1){
            if(vm.currentSelected.tela1 > 0) vm.select('tela1', vm.currentSelected.tela1 - 1)
          }
          if(vm.currentPage === 4){
            if(vm.currentSelected.tela4 > 0) vm.select('tela4', vm.currentSelected.tela4 - 1)
          }
         break;

        case 38: // up
          vm.scrollUp();
          break;

        case 39: // right
          if(vm.currentPage === 0){
            if(vm.currentSelected.tela0 < vm.completeds.tela0.length - 1) vm.select('tela0', vm.currentSelected.tela0 + 1)
          }
          if(vm.currentPage === 1){
            if(vm.currentSelected.tela1 < vm.completeds.tela1.length - 1) vm.select('tela1', vm.currentSelected.tela1 + 1)
          }
          if(vm.currentPage === 4){
            if(vm.currentSelected.tela4 < vm.completeds.tela4.length - 1) vm.select('tela4', vm.currentSelected.tela4 + 1)
          }
          break;

        case 40: // down
          vm.scrollDown()
          break;

        default: return;
      }
      e.preventDefault();
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

    vm.finishAndGo = function(tela, go){
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
    }

    vm.select = function(tela, id, callback, sequencial, evt){
      $timeout(function(){
        console.log(tela, vm.completeds[tela], id)
        if(id === vm.currentSelected[tela]) return;

        if(id > 0){
          if(id > vm.completeds[tela].length - 1) return;

          if(sequencial){
            if(!vm.completeds[tela][id - 1]) return;
          }
        }else if(id < 0){
          return;
        }

        /*console.log(Game.data.outros.modulo5['sub' + tela], id)
        if(Game.data.outros.modulo5['sub' + tela]){
          if(!Game.data.outros.modulo5['sub' + tela][id]){
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
      console.log(vm.completeds[tela], tela)
      if(!vm.completeds[tela]) return true;

      if(vm.completeds[tela].every(function(el){
        return el;
      })){
        if(vm.callbacks[tela]){
          vm.callbacks[tela]();
          vm.checkFinished();
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

    if(!Game.data.outros.modulo5.tela0){
      Game.data.outros.modulo5.tela0 = [false, false];
    }

    vm.completeds.tela0 = Game.data.outros.modulo5.tela0;
    vm.currentSelected.tela0 = -1;
    vm.nextPulsing.tela0 = 0;
    vm.callbacks.tela0 = function(){
      vm.screensVisited[0] = true;
      Game.save();
    }

    //------------ pg3 -----------------------------

    if(!Game.data.outros.modulo5.tela2){
      Game.data.outros.modulo5.tela2 = [true, false, false, false, false, false, false, false, false, false];
    }

    vm.completeds.tela2 = Game.data.outros.modulo5.tela2;
    vm.currentSelected.tela2 = 0;
    vm.nextPulsing.tela2 = 0;
    vm.callbacks.tela2 = function(){
      vm.screensVisited[2] = true;
      Game.save();
      //vm.scrollDown();
    }

    //------------ pg5 -----------------------------

    if(!Game.data.outros.modulo5.tela4){
      Game.data.outros.modulo5.tela4 = [true, false, false, false, false, false, false, false, false, false, false];
    }

    vm.completeds.tela4 = Game.data.outros.modulo5.tela4;
    vm.currentSelected.tela4 = 0;
    vm.nextPulsing.tela4 = 1;
    vm.callbacks.tela4 = function(){
      vm.screensVisited[4] = true;
      Game.save();
    }

    //------------ pg7 -----------------------------

    if(!Game.data.outros.modulo5.tela6){
      Game.data.outros.modulo5.tela6 = [true, false, false, false, false, false, false, false, false];
    }

    vm.completeds.tela6 = Game.data.outros.modulo5.tela6;
    vm.currentSelected.tela6 = 0;
    vm.nextPulsing.tela6 = 1;
    vm.callbacks.tela6 = function(){
      vm.screensVisited[6] = true;
      Game.save();
    }

    //------------ pg8 -----------------------------

    if(!Game.data.outros.modulo5.tela7){
      Game.data.outros.modulo5.tela7 = [true, false];
    }

    vm.completeds.tela7 = Game.data.outros.modulo5.tela7;
    vm.currentSelected.tela7 = 0;
    vm.nextPulsing.tela7 = 1;
    vm.callbacks.tela7 = function(){
      vm.screensVisited[7] = true;
      Game.save();
    }

    //------------ pg9 -----------------------------

    if(!Game.data.outros.modulo5.tela8){
      Game.data.outros.modulo5.tela8 = [true, false, false, false, false, false, false, false];
    }

    vm.completeds.tela8 = Game.data.outros.modulo5.tela8;
    vm.currentSelected.tela8 = 0;
    vm.nextPulsing.tela8 = 1;
    vm.callbacks.tela8 = function(){
      vm.screensVisited[8] = true;
      Game.save();
    }


    Game.bfFunction = function(){

    }

  }
  Modulo5_Tela1Controller.$inject = ['$log', '$timeout', 'Game', '$compile', '$scope'];
})();
