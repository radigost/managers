import * as angular from "angular";
import IService = restangular.IService;
import * as restangular from "restangular";
import IComponentOptions = angular.IComponentOptions;
/**
 * Created by user on 05.01.17.
 */

var PlayerInfoTpl  = require('./playerInfo.pug');

class PlayerInfoCtrl {
  static $inject =  ['Restangular'];
  constructor(private Restangular:IService) {
  }
};


class PlayerInfoComponent implements IComponentOptions{
  bindings:any={
    player: '<',
    $router:'<'
  };
  template:string =  PlayerInfoTpl();
  controller =  PlayerInfoCtrl ;
  controllerAs:string =  'ctrl';

}

angular.module('app').component('playerInfo', new PlayerInfoComponent);
