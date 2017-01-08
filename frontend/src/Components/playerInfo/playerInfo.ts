import * as angular from "angular";
import IService = restangular.IService;
import * as restangular from "restangular";
/**
 * Created by user on 05.01.17.
 */

var PlayerInfoTpl  = require('./playerInfo.jade');

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
