import {GameService} from "../gameService";
import * as angular from "angular";



var CompanyListTpl = require('./companyList.jade');

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