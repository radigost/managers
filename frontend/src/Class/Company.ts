import * as angular from "angular";
import {storage} from "angular";
import IService = restangular.IService;
import * as restangular from "restangular";
/**
 * Created by user on 05.01.17.
 */

export class Company{
  public current: {};
  public items: Array<any>;
  constructor(
      private Restangular :IService,
  ) {
    this.current = {};
    this.items = [];
  }

  selectCurrent(id) {
    this.Restangular.one('api/v1/companies/', id).get().then((res)=> {
        this.current = res;
      });
  }


};

angular.module('app').service('Company', ['Restangular', Company]);


