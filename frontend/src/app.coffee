
'use strict'
angular.module('app', [
  'restangular',
  'ngComponentRouter',
  'ui.bootstrap'
]).config ($interpolateProvider) ->
  $interpolateProvider.startSymbol '[['
  $interpolateProvider.endSymbol ']]'
  return


angular.module('app').component('app',{
  template: '<ng-outlet ></ng-outlet>\n',
  $routeConfig: [
    {path: '/', name: 'Menu', component: 'menu' }
    {path: '/talk', name: 'Talk', component: 'talk' }
    {path: '/tree', name: 'Tree', component: 'tree' }
    {path: '/game', name: 'Game', component: 'game' }
    {path: '/newgame', name: 'NewGame', component: 'newgame' }
    {path: '/company', name: 'Company', component: 'company' }


  ]
})
.config( ($locationProvider) ->
  $locationProvider.html5Mode(false);
)
.value('$routerRootComponent', 'app')

require('./talk/talk.coffee');
require('./tree/tree.coffee');
require('./game/game.coffee');
require('./newgame/newgame.coffee');
require('./menu/menu.coffee');
require('./company/company.coffee');

