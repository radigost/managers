import * as angular from "angular";
import {IModalService} from "angular-ui-bootstrap";
import {cookies} from "angular";
import * as restangular from "restangular";
import IService = restangular.IService;
import * as _ from "lodash";
import IQService = angular.IQService;
import {Player} from "../Class/player";


/**
 * Created by user on 05.01.17.
 */


// Npc = require('../Class/npc.js');
//
// Player = require('../Class/player.ts');

var treeTpl = require('./tree.jade');

require('./modal.ts');

class TreeCtrl {
  static $inject =['Player', 'NpcFactory', 'Restangular', '$q', '$uibModal', '$cookies'];
  private tree: Array<any>;
  private filterQ: boolean;
  private npc: any;
  private modal: any;
  private treeType: string;
  constructor(
      public player:Player,
      private NpcFactory,
      private Restangular: restangular.IService,
      private q:IQService,
      private uibModal: IModalService,
      private cookies: cookies.ICookiesService
  ) {
    this.tree = [];
    this.filterQ = false;
  }


  $onInit () {
    this.player.init();
    this.npc = this.NpcFactory(this.Restangular, this.q);
    return this.q.all([this.player.loadNodes(), this.player.loadTree(), this.npc.loadNodes(), this.npc.loadTree()]).then((function(_this) {
      return function(res) {
        return _this.makeTree(_this.player);
      };
    })(this));
  }

  deleteLeave(id) {
    var s = this.cookies.getAll();
    return this.Restangular.one('api/v1/nodes/', id).get().then((res)=> {
        return res.remove('', {
          'X-CSRFToken': s.csrftoken
        }).then(()=> {
          return this.$onInit();
        });
      });
  }

  openModal (question) {
    this.modal = this.uibModal.open({
      size: 'md',
      component: 'modalComponent',
      resolve: {
        node:()=> {
          console.log(question);
          return question;
        },
        tree:()=> {
          var tree;
          if (question.category === 'npc') {
            return tree = this.player.nodes;
          } else {
            return tree = this.npc.nodes;
          };
        }
      }
    });
    return this.modal.result.then(()=> {
        return this.$onInit();
      });

  }

  makeTree(person) {
    var opponent;
    if (person) {
      if (person.type === 'player') {
        this.treeType = "Редактор ответов для Игрока";
        opponent = this.npc;
      } else if (person.type === 'npc') {
        this.treeType = "Редактор ответов для NPC";
        opponent = this.player;
      }
      this.tree = [];
      return _.forEach(opponent.nodes, (function(_this) {
        return function(node) {
          var nodesArray, qNode;
          nodesArray = [];
          qNode = _.find(person.tree, {
            id: node.id
          });
          if (qNode && qNode.choice.length > 0) {
            node.hasSiblings = true;
            _.forEach(qNode.choice, function(choice) {
              var t;
              t = _.find(person.nodes, {
                id: choice
              });
              return nodesArray.push(t);
            });
          }
          node.answers = nodesArray;
          return _this.tree.push(node);
        };
      })(this));
    }
  };

}


class TreeComponent implements IComponentOptions{
  bindings:any={
    $router:'<'
  };
  template:string =  treeTpl();
  controller =  TreeCtrl;
  controllerAs:string =  'ctrl';

}

angular.module('app').component('tree', new TreeComponent);


angular.module('app').filter('HasNoAnswer', function() {
  return function(data, filterQ) {
    var out;
    out = data;
    if (filterQ === true) {
      out = _.filter(data, (function(_this) {
        return function(element) {
          var ret;
          ret = (element.hasSiblings !== true) && (element.is_failure !== true) && (element.is_success !== true);
          return ret;
        };
      })(this));
    }
    return out;
  };
});

