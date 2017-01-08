import * as angular from "angular";
import {GameService} from "../gameService";
import {Company} from "../../Class/Company";
/**
 * Created by user on 05.01.17.
 */

var companyDetailTpl = require('./companyDetail.jade');

require('../../Components/npcInfo/npcInfo.ts');
require('../../Class/Company.ts');

require('../gameService.ts');

class CompanyDetailCtrl {
  static $inject= ['gameService','Company'];
  public gameName: string;
  $router;
   constructor(
       public service :GameService,
       public company:Company
   ) {
    this.gameName = "Экран информации о компании";
    console.log(this);
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
