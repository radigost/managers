import * as angular from "angular";
import * as restangular from "restangular";
// import {storage} from "angular";
import {Player} from "../Class/player";
/**
 * Created by user on 05.01.17.
 */
// require('../Class/player.ts');

export class GameService {
  static $inject = ['Restangular', 'Player'];
  public inited;
  public companies;

  constructor(private Restangular: restangular.IService,
              public player: Player) {
    this.inited = false;
  }

  init() {
    this.player.init();
    return this.Restangular.one('api/v1/companies/').get().then((res) => {
      return this.companies = res.results;
    });
  }
}

angular.module('app').service('gameService', GameService);

