(function() {
    'use strict';

    angular
        .module('infi-prateleira')
        .controller('MenuController', MenuController);

    /** @ngInject */
    function MenuController($log, $timeout, $window, Game, $rootScope, Sprites, Util) {
        var vm = this;

        vm.game = Game;

        Game.resizeWindow();
        Game.hideMenu();
        //Game.showMenu(true);
        Game.lockAvancar();
        Game.lockVoltar();

        vm.trilhas = Game.data.trilhas;
        vm.trilhaSelected = -1;
        vm.finalScreen = false//Game.data.trilhas.trilha7.completed;
        vm.preFinalScreen = Game.data.trilhas.trilha7.completed && !Game.data.preFinal;

        vm.postits = Game.data.preFinal;

        vm.order = [3,1,4,7]

        /*$timeout(function(){
          var scale = (0.24 * angular.element(window).width()) / 477;
          angular.element('.menu-item').css("transform", 'scale(' + scale + ')');
        })*/

        vm.goto = function(id, evt){
          if(evt){
            if(evt.shiftKey && evt.altKey){
              Game.gotoTela(0,(id - 1));
              //vm.trilhaSelected = (id - 1);
              return;
            }
          }
          /*if(id > 1){
            if(!Game.data.trilhas['trilha' + (id - 1)].completed) return;
          }*/
          /*if(id == 14){
              if(!Game.data.trilhas['trilha12'].completed) return;
          }*/
          //Game.gotoTela(0,(id - 1));

          var ind = vm.order.indexOf(id);

          console.log(ind)

          if(ind > 0){
            var pre = ind - 1;
            console.log(pre)
            console.log(Game.data.trilhas['trilha' + (vm.order[pre])])
            if(!Game.data.trilhas['trilha' + vm.order[pre]].completed) return;
          }

          Game.gotoTela(0,(id - 1));


          /*$timeout(function(){
            vm.trilhaSelected = (id - 1);
          })*/
        }


        vm.preContents = [
          '<p>Para começar, se imagine ocupando um cargo de gerência em uma instituição financeira. </p><p>Em setembro de 2020, você recebe a notícia de que a Lei Geral de Proteção de Dados finalmente está em vigor. </p><p>Você já ouviu falar da Lei, mas infelizmente não tomou as medidas para se adequar a esse novo marco legal. </p><p>Você sabe o que precisa ser feito para impedir violações aos direitos de seus clientes? </p><p>Você sabe quais consequências essas violações podem ter? </p>',
          '<p>Agora, você vai entender quando o tratamento de dados é autorizado, ou seja, as bases legais para o tratamento de dados. </p>',
          '<p>Você viu anteriormente sobre a importância do tratamento de dados.</p><p>Hoje, você recebeu um e-mail da gerência sobre um cliente lhe solicitou acesso aos seus dados pessoais de maneira imediata, pois ele anda estudando muito sobre a LGPD e quer exercer seus direitos. </p>',
          '<p>Agora que você conhece mais sobre os aspectos introdutórios da LGPD, imagine que seu diretor ou diretora veio perguntar se isso afeta o cadastro positivo, porque ele(a) ficou com dúvidas se a LGPD veio a limitar esta prática. </p><p><b>O que você responderia?</b></p>',
          '<p>Você já sabe da relação da LGPD com a Lei de Cadastro Positivo. </p><p>Agora, a sua instituição está desenvolvendo um novo produto e, na reunião, alguém perguntou se não haveria uma análise sobre a privacidade, já que esse novo produto é essencialmente voltado para smartphones. </p><p><b>Será que é o caso de envolver a equipe que cuida de proteção de dados na instituição nessa fase tão embrionária do projeto?</b></p>'
        ]

        vm.preContentsFinal1 = [
          'Destrave esse conhecimento. ',
          'Destrave esse conhecimento. ',
          'Destrave esse conhecimento para entender mais sobre os direitos do titular. ',
          'Destrave esse conhecimento para saber se a LGPD limita a prática do cadastro positivo.',
          'Destrave a última parte dessa trilha para entender o que é Privacy by design.'
        ]

        vm.preContentsFinal2 = [
          'Clique no cadeado e faça a<br/> introdução ao tema.',
          'Clique no cadeado e entenda melhor esse tema.',
          'Clique no cadeado e acesse esse tema.',
          'Clique no cadeado e acesse esse tema.',
          'Clique no cadeado e acesse esse tema.'
        ]

        vm.confirm = function(){
          Game.gotoTela(0,vm.trilhaSelected);
        }

        vm.iniciar = function(){
          $timeout(function(){
            Game.data.iniciated = true;
            Game.save();
          })
        }


    }
    MenuController.$inject = ['$log', '$timeout', '$window', 'Game', '$rootScope', 'Sprites', 'Util'];
})();
