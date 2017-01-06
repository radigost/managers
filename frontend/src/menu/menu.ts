import * as angular from "angular";
import IComponentController = angular.IComponentController;
import * as restangular from "restangular";
import IService = restangular.IService;
import {IModalService} from "angular-ui-bootstrap";
import {storage} from "angular";
import {cookies} from "angular";
import IComponentOptions = angular.IComponentOptions;


var menuTpl = require('./menu.jade');
var  modalTpl = require('./modal.jade');
require('./modal.js');


class MenuComponent implements IComponentOptions{
  bindings:any={
    $router:'<'
  };
  template:string =  menuTpl();
  controller = MenuCtrl;
  controllerAs:string =  'ctrl';
}

angular.module('app').component('menu', new MenuComponent()).value('$routerRootComponent', 'app');


class MenuCtrl {
  static $inject = ['$uibModal', 'Restangular', '$localStorage', '$cookies'];
  public canSeeEditor;
  public modal ;
  $router;
  constructor(
      private uibModal: IModalService,
      private Restangular: restangular.IService,
      private localStorage: storage.IStorageService,
      private cookies: cookies.ICookiesService)
  {
    this.canSeeEditor = false;
    console.log("asdfas");
  }

  $onInit() {
    this.Restangular.one('api/v1/my/').get().then( function(res) {
        this.localStorage.user = {
          id: res.user_id
        };
        this.canSeeEditor = res.see_editor;
        return;
    });

    this.Restangular.one('api/v1/persons').get().then(function(res) {
        this.players = res;
    });
  }

  goToGame(playerId) {
    // this.localStorage.player = {
    //   id: playerId
    // };
    this.$router.navigate(['Game']);
  }

  deletePerson(id) {
    var s;
    s = this.cookies.getAll();
    return this.Restangular.one('api/v1/persons/' + id).remove('', {
      'X-CSRFToken': s.csrftoken
    }).then((function (_this) {
      return function (res) {
        return _this.$onInit();
      };
    })(this));
  }

  help() {
    return this.modal = this.uibModal.open({
      controller: 'modalCtrl',
      controllerAs: '$ctrl',
      template: modalTpl()
    });
  }


}
