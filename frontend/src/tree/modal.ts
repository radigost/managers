import * as angular from "angular";
import * as restangular from "restangular";
import {cookies} from "angular";
import {IModalServiceInstance} from "angular-ui-bootstrap";
import * as _ from "lodash";
import IComponentOptions = angular.IComponentOptions;
/**
 * Created by user on 05.01.17.
 */

var treeModalTpl = require('./modal.jade');

class TreeModalCtrl implements IModalServiceInstance{
  static $inject = ['Restangular', '$cookies'];
  resolve;
  dismiss;
  result;
  opened;
  rendered;
  closed;

  selected;
  private node:any;
  private toAdd: any;
  constructor(
      private Restangular: restangular.IService,
      private cookies: cookies.ICookiesService
  ) {

  }
  $onInit(){
    this.node = this.resolve.node;
    this.toAdd = {
      text: ""
    };
  }

  cancel() {
    return this.dismiss({
      $value: 'cancel'
    });
  }


  save() {
    this.Restangular.one('api/v1/nodes/', this.node.id).get().then((res)=> {
        res.choice.push(this.selected.id);
        var s = this.cookies.getAll();
        return res.customPUT('', '', '', {
          'X-CSRFToken': s.csrftoken
        }).then(()=>{
          this.node.answers.push(this.selected);
        });
    });
  }

  deleteNode(id) {
    this.Restangular.one('api/v1/nodes/', this.node.id).get().then(
      (res)=> {
        res.choice = _.pull(res.choice, id);
        var s = this.cookies.getAll();
        res.customPUT('', '', '', {
          'X-CSRFToken': s.csrftoken
        }).then(()=> {
          return this.node.answers = _.pullAllBy(this.node.answers, [
            {
              'id': id
            }
          ], 'id');
        });

      });

  }

  close() {
    return this.dismiss({$value: 'cancel' });
  }

  create(text:string) {
    var obj, s, type;
    if (this.node.category === 'npc') {
      type = 'player';
    } else {
      type = 'npc';
    }
    console.log(this.toAdd);
    obj = {
      "category": type,
      "text": this.toAdd.text,
      "is_fail": null || this.toAdd.is_fail,
      "is_success": null,
      "is_start": null,
      "type": null || this.toAdd.type,
      "choice": []
    };
    s = this.cookies.getAll();
    this.Restangular.one('api/v1/nodes/').get().then((res)=>{
      console.log(res);
        }
    );
    this.Restangular.one('api/v1/nodes/').post('', obj, '', {
      'X-CSRFToken': s.csrftoken
    }).then((res)=> {
        this.selected = res;
        this.save();
      });
  }

  setFailure() {
    this.toAdd.is_fail = true;
    this.toAdd.is_success = null;
    return this.toAdd.type = 'failure';
  }

  setSuccess() {
    this.toAdd.is_fail = null;
    this.toAdd.is_success = true;
    return this.toAdd.type = 'success';
  }

  setDefault = function() {
    this.toAdd.is_fail = null;
    this.toAdd.is_success = null;
    return this.toAdd.type = '';
  }

};



class TreeModalComponent implements IComponentOptions{
  bindings:any= {
    resolve: '<',
    close: '&',
    dismiss: '&'
  };
  template:string =  treeModalTpl();
  controller =  TreeModalCtrl;
  controllerAs:string =  '$ctrl';

}

angular.module('app').component('modalComponent', new TreeModalComponent);