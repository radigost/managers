/**
 * Created by user on 05.01.17.
 */
import * as angular from "angular";
import {storage} from "angular";
import * as restangular from "restangular";
import IService = restangular.IService;
import IQService = angular.IQService;
import * as _ from "lodash";


interface  IMyLocalStorageService extends storage.IStorageService {
            player: any;
            user:any;
        }

export class Player {
  static $inject =['Restangular', '$localStorage', '$q'];
  private type: string;
  private name: string;
  private company: string;
  private fakeName: string;
  private money: string;
  private tree: Array<any>;
  public nodes: Array<any>;
  private position: string;
  private current: any;
  private id: any;
  private questionArray: Array<any>;
  private branch: any;
  private playerAvatarID: any;
  constructor(
      public Restangular :IService,
      private localStorage: IMyLocalStorageService,
      private q:IQService
  )
  {
    this.type = 'player';
    this.name = "";
    this.fakeName = "Иван Иванович";
    this.company = "";
    this.money = "";
    this.position = "";
    this.nodes = [];
    this.tree = [];
  }

  public init() {
    this.id = this.localStorage.player.id;
    this.Restangular.one('api/v1/persons/', this.id).get().then((res)=>{
        return _.extend(this, res);
      }
    );
  }

  loadNodes () {
    var def = this.q.defer();
    this.Restangular.one('api/v1/nodes/player').get().then((function(_this) {
      return function(res) {
        _this.nodes = res;
        return def.resolve();
      };
    })(this));
    return def.promise;
  }

  loadTree () {
    var def;
    def = this.q.defer();
    this.Restangular.one('api/v1/nodes/npc').get().then((function(_this) {
      return function(res) {
        _this.tree = res;
        return def.resolve();
      };
    })(this));
    return def.promise;
  };

  findNode(questionId) {
    this.branch = _.find(this.tree, {
      id: questionId
    });
    if (this.branch) {
      this.questionArray = _.filter(this.nodes, (function(_this) {
        return function(element) {
          return _.includes(_this.branch.choice, element.id);
        };
      })(this));
      _.forEach(this.questionArray, (function(_this) {
        return function(element) {
          var name;
          if (element.text.indexOf("%USERNAME%")) {
            name = _this.name;
            return element.text = _.replace(element.text, '%USERNAME%', name);
          }
        };
      })(this));
      _.forEach(this.questionArray, (function(_this) {
        return function(element) {
          var name;
          if (element.text.indexOf("%FAKEUSERNAME%")) {
            name = _this.fakeName;
            return element.text = _.replace(element.text, '%FAKEUSERNAME%', name);
          }
        };
      })(this));
      return _.forEach(this.questionArray, (function(_this) {
        return function(element) {
          var name;
          if (element.text.indexOf("%LPRNAME%")) {
            name = "Михаила Сергеевича";
            element.text = _.replace(element.text, '%LPRNAME%', name);
            return _this.fakeName;
          }
        };
      })(this));
    } else {
      return this.questionArray = [];
    }
  }

  findCurrent(questionId) {
    return this.current = _.find(this.nodes, {
      id: questionId
    });
  }

  choosePlayer(playerAvatarID) {
    if (playerAvatarID) {
      return this.playerAvatarID = playerAvatarID;
    }
  }

  fail() {
    return this.current = {
      id: null,
      text: "Эммм..ну до свиданья"
    };
  }

  succeed(){
    return this.current = {
      id: null,
      text: "Да, спасибо большое"
    };
  }


};

angular.module('app').service('Player', ['Restangular', '$localStorage', '$q', Player]);

// module.exports = Player;

// ---
// generated by coffee-script 1.9.2