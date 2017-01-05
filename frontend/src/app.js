/**
 * Created by user on 05.01.17.
 */

var tpl;

tpl = require('./app.jade');

'use strict';

angular.module('app', ['restangular', 'ngComponentRouter', 'ui.bootstrap', 'ngStorage', 'ngCookies', 'ngSanitize', 'ui.select']).config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
}).config(function(RestangularProvider) {
  return RestangularProvider.setRequestSuffix("/");
});

require('./talk/talk.js');

require('./tree/tree.js');

require('./game/game.js');

require('./newgame/newgame.js');

require('./menu/menu.js');

angular.module('app').component('app', {
  template: tpl(),
  $routeConfig: [
    {
      path: '/',
      name: 'Menu',
      component: 'menu'
    }, {
      path: '/talk',
      name: 'Talk',
      component: 'talk'
    }, {
      path: '/tree',
      name: 'Tree',
      component: 'tree'
    }, {
      path: '/newgame',
      name: 'NewGame',
      component: 'newgame'
    }, {
      path: '/game/...',
      name: 'Game',
      component: 'game'
    }
  ]
}).config(function($locationProvider) {
  return $locationProvider.html5Mode(false);
}).value('$routerRootComponent', 'app');

