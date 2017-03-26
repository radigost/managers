

import IComponentOptions = angular.IComponentOptions;
import * as angular from "angular";
import IComponentController = angular.IComponentController;
import * as restangular from "restangular";
import IService = restangular.IService;

'use strict';

angular
    .module('app',
    [
      'restangular',
      'ngComponentRouter',
      'ui.bootstrap',
      'ngCookies',
      'ngSanitize',
      'ui.select'
    ])
    .config(function($interpolateProvider) {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
    })
    .config(function(RestangularProvider) {
      return RestangularProvider.setRequestSuffix("/");
    });


const appTpl = require('./app.jade');
class appOptions implements IComponentOptions{
    template= appTpl();
    $routeConfig= [
        {path: '/', name: 'Menu', component: 'menu'},
        {path: '/talk', name: 'Talk', component: 'talk'},
        {path: '/tree', name: 'Tree', component: 'tree'},
        {path: '/newgame', name: 'NewGame', component: 'newgame'},
        {path: '/game/...', name: 'Game', component: 'game'}
    ];
}

angular
    .module('app').component('app',new appOptions)
    .config(function($locationProvider) {
      return $locationProvider.html5Mode(false);
}   )
    .value('$routerRootComponent', 'app');

import './menu/menu.ts';
import './talk/talk.ts';
import './tree/tree.ts';
import './game/game.ts';
import './newgame/newgame.ts';


// import { UpgradeAdapter } from '@angular/upgrade';
//
// var adapter = new UpgradeAdapter();
// var app = angular
//     .module('app',
//     [
//       'restangular',
//       'ngComponentRouter',
//       'ui.bootstrap',
//       'ngCookies',
//       'ngSanitize',
//       'ui.select'
//     ])
//     .config(function($interpolateProvider) {
//       $interpolateProvider.startSymbol('[[');
//       $interpolateProvider.endSymbol(']]');
//     })
//     .config(function(RestangularProvider) {
//       return RestangularProvider.setRequestSuffix("/");
//     });
//
// adapter.bootstrap(document.body, ['app']);