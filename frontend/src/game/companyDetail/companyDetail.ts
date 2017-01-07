import * as angular from "angular";
import {GameService} from "../gameService";
import {Company} from "../../Class/Company";
/**
 * Created by user on 05.01.17.
 */

var companyDetailTpl = require('./companyDetail.jade');

require('../../Components/npcInfo/npcInfo.js');

require('../gameService.ts');

class CompanyDetailCtrl {
  static $inject= ['gameService', 'Company'];
  private gameName: string;
  $router;
   constructor(
       public service :GameService,
       public company:Company
   ) {
    // this.service = service;
    // this.company = company;
    // this.goToTalk = bind(this.goToTalk, this);
    // this.$routerOnActivate = bind(this.$routerOnActivate, this);
    this.gameName = "Экран информации о компании";
  }

  $routerOnActivate(next) {
    this.company.selectCurrent(next.params.companyId);
  }

  goToTalk(id) {
    this.$router.navigate([
      'Talk', {
        npcId: id
      }
    ]);
  }


};



class CompanyDetailComponent implements IComponentOptions{
  bindings:any={
    $router:'<'
  };
  template:string =  companyDetailTpl();
  controller =  CompanyDetailCtrl;
  controllerAs:string =  'ctrl';

}

angular.module('app').component('companyDetail', new CompanyDetailComponent);
