import * as angular from "angular";
import {Npc} from "../../Class/npc";
import IService = restangular.IService;
import * as restangular from "restangular";
import IQService = angular.IQService;
/**
 * Created by user on 05.01.17.
 */


var NpcInfoTpl = require('./npcInfo.jade');
require('../../Class/npc.ts');

class NpcInfoCtrl{
  $router;
  id;
  static $inject = ['Restangular','Npc','$q'];
  private npc: any;
  constructor(
      private Restangular:IService,
      public Npc:Npc,
      private q:IQService
  ) {

  }

  $onInit() {
    this.npc = this.Npc.initNew(this.Restangular,this.q);
    return this.npc.selectCurrent(this.id);
  }
};


class NpcInfoComponent implements IComponentOptions{
  bindings:any={
    $router:'<',
    id: '<'
  };
  template:string =  NpcInfoTpl();
  controller =  NpcInfoCtrl;
  controllerAs:string =  'ctrl';

}

angular.module('app').component('npcInfo', new NpcInfoComponent);