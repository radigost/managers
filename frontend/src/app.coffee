tpl = require './app.jade'
'use strict'
angular.module('app', [
  'restangular',
  'ngComponentRouter',
  'ui.bootstrap'
  'ngStorage'
  'ngCookies'
  'ngSanitize'
  'ui.select'

])
.config ($interpolateProvider) ->
  $interpolateProvider.startSymbol '[['
  $interpolateProvider.endSymbol ']]'
  return


.config( (RestangularProvider)->
    RestangularProvider.setRequestSuffix("/")
)



require('./talk/talk.coffee');
require('./tree/tree.coffee');
require('./game/game.coffee');
require('./newgame/newgame.coffee');
require('./menu/menu.coffee');


angular.module('app').component('app',{
  template:tpl()
  $routeConfig: [
    {path: '/', name: 'Menu', component: 'menu' }
    {path: '/talk', name: 'Talk', component: 'talk' }
    {path: '/tree', name: 'Tree', component: 'tree' }
    {path: '/newgame', name: 'NewGame', component: 'newgame' }
    {path: '/game/...', name: 'Game', component: 'game' }

  ]
})
.config( ($locationProvider) ->
  $locationProvider.html5Mode(false);
)
.value('$routerRootComponent', 'app')
#.value('$clientId','3')


