import IComponentOptions = angular.IComponentOptions;
import * as angular from "angular";
import IComponentController = angular.IComponentController;
import * as restangular from "restangular";
import IService = restangular.IService;
import {IModalService} from "angular-ui-bootstrap";
import {storage} from "angular";
import {cookies} from "angular";
/**
 * Created by user on 05.01.17.
 */
// declare var angular: any;




'use strict';

angular
    .module('app',
    [
      'restangular',
      'ngComponentRouter',
      'ui.bootstrap',
      'ngStorage',
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

require('./menu/menu.ts');

require('./talk/talk.ts');

require('./tree/tree.ts');

require('./game/game.ts');

require('./newgame/newgame.ts');

// import { UpgradeAdapter } from '@angular/upgrade';
//
// var adapter = new UpgradeAdapter();
// var app = angular
//     .module('app',
//     [
//       'restangular',
//       'ngComponentRouter',
//       'ui.bootstrap',
//       'ngStorage',
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