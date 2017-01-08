/**
 * Created by user on 05.01.17.
 */
import * as angular from "angular";
import {GameService} from "./gameService";
import IComponentOptions = angular.IComponentOptions;
var gameTpl = require('./game.pug');

require('../Components/playerInfo/playerInfo.ts');

require('./gameService.ts');

require('./companyList/companyList.ts');

require('./companyDetail/companyDetail.ts');

require('./profile/profile.ts');

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



