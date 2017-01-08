import {GameService} from "../gameService";
import * as angular from "angular";
import IComponentOptions = angular.IComponentOptions;



var CompanyListTpl = require('./companyList.pug');

class CompanyListCtrl {
  $router;
  static $inject = ['gameService'];
  constructor(public service:GameService) { }

};



class CompanyListComponent implements IComponentOptions{
  bindings:any={$router:'<'};
  template:string =  CompanyListTpl();
  controller =  CompanyListCtrl;
  controllerAs:string =  'ctrl';

}
angular.module('app').component('companyList', new CompanyListComponent);