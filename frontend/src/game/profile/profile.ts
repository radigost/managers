import * as angular from "angular";
import {GameService} from "../gameService";
import IService = restangular.IService;
import * as restangular from "restangular";
import IComponentOptions = angular.IComponentOptions;
/**
 * Created by user on 05.01.17.
 */

var profileTpl = require('./profile.pug');

require('../gameService.ts');

class ProfileCtrl  {
  static $inject = ['gameService', 'Restangular'];
  constructor(
      public service:GameService,
      private Restangular:IService
  ) {
  }

};

class ProfileComponent implements IComponentOptions{
  bindings:any={
    $router:'<'
  };
  template:string =  profileTpl();
  controller =  ProfileCtrl;
  controllerAs:string =  'ctrl';

}

angular.module('app').component('profile', new ProfileComponent);