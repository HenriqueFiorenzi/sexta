(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .directive('quizz', quizz);

  /** @ngInject */
  function quizz($timeout, $log, $window, Util, $rootScope) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/quizz/quizz.html',
      scope: {
        config: '='
      },
      controller: quizzController,
      controllerAs: "vm",
      bindToController: true
    };

    return directive;

    function quizzController(){
      var vm = this;

      vm.id = vm.config.id || 'quizz';
      vm.class = vm.config.class || 'quizz';
      vm.multiple = vm.config.multiple || false;
      vm.style = vm.config.style || {left:0, top:0};
      vm.answer = vm.config.answer || null;

      vm.options = vm.config.options;
      vm.selected = vm.config.selected || [];
      vm.sel = false;

      /*
        Exemplo de options:
        options: [
          {text: "opção 1", style:{left:10, top:100}, callback: vm.funcaoQualquer, feedback:'<p>Feedback pra essa questão!</p>'},
          {text: "opção 2", style:{left:10, top:120}, callback: vm.funcaoQualquer2, feedback:'<p>Feedback pra outra questão!</p>'}
        ]
      */

      vm.select = function(index){

        if(vm.class == "quizz"){
          if(!vm.multiple){
            if(vm.sel) return;
          }
        }else{
          if(!vm.multiple){
            vm.emptySelection();
          }
        }

        vm.sel = true;
        vm.selected[index] = "selected";

        if(vm.options[index].feedback){
          //MOstrar feedback
        }

        if(vm.options[index].callback){
          vm.options[index].callback();
        }
        vm.showAnswer();
      }

      vm.emptySelection = function(){
        for (var i = 0; i < vm.selected.length; i++) {
          vm.selected[i] = "not-selected";
        }
      }

      vm.showAnswer = function(){
        if(vm.answer){
          $timeout(function(){
            for (var i = 0; i < vm.options.length; i++) {
              if(vm.selected[i] == "selected"){
                if(i == vm.answer){
                  //certo

                }else{
                  //errado

                }
              }
            }
          })
        }
      }

      for (var i = 0; i < vm.options.length; i++) {
        if(vm.selected[i]){
          if(vm.selected[i] == "selected"){
            vm.sel = true;
            vm.showAnswer();
          }
        }else{
          vm.selected.push("not-selected");
        }
      }


    }
  }
  quizz.$inject = ['$timeout', '$log', '$window', 'Util', '$rootScope'];

})();
