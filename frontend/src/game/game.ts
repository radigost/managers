/**
 * Created by user on 05.01.17.
 */
import * as angular from "angular";


import {GameService} from "./gameService";
var gameTpl = require('./game.jade');

require('../Components/playerInfo/playerInfo.js');

require('./gameService.ts');

require('./companyList/companyList.js');

require('./companyDetail/companyDetail.js');

require('./profile/profile.js');

class GameComponent implements IComponentOptions{
  bindings:any={
    $router:'<'
  };
  template:string =  gameTpl();
  controller =  GameCtrl;
  controllerAs:string =  'ctrl';
  $routeConfig= [
    {
      path: '/',
      name: 'CompanyList',
      component: 'companyList',
      useAsDefault: true
    }, {
      path: '/company-detail',
      name: 'CompanyDetail',
      component: 'companyDetail'
    }, {
      path: '/profile',
      name: 'Profile',
      component: 'profile'
    }
  ]
}


class GameCtrl  {
  static $inject = ['gameService'];
  gameName;
  constructor(public service:GameService) {
    this.gameName = "Основной экран";
  }

  $routerOnActivate (next) {
    return this.service.init();
  }

};

angular.module('app').component('game', new GameComponent);



