/**
 * Created by user on 05.01.17.
 */

var Npc, Player, tpl, treeCtrl,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Npc = require('../Class/npc.js');

Player = require('../Class/player.js');

tpl = require('./tree.jade');

require('./modal.js');

treeCtrl = (function() {
  function treeCtrl(player, NpcFactory, Restangular, q, uibModal, cookies) {
    this.player = player;
    this.NpcFactory = NpcFactory;
    this.Restangular = Restangular;
    this.q = q;
    this.uibModal = uibModal;
    this.cookies = cookies;
    this.makeTree = bind(this.makeTree, this);
    this.openModal = bind(this.openModal, this);
    this["delete"] = bind(this["delete"], this);
    this.$onInit = bind(this.$onInit, this);
    this.tree = [];
    this.filterQ = false;
  }

  treeCtrl.prototype.$onInit = function() {
    this.player.init();
    this.npc = this.NpcFactory(this.Restangular, this.q);
    return this.q.all([this.player.loadNodes(), this.player.loadTree(), this.npc.loadNodes(), this.npc.loadTree()]).then((function(_this) {
      return function(res) {
        return _this.makeTree(_this.player);
      };
    })(this));
  };

  treeCtrl.prototype["delete"] = function(id) {
    var s;
    s = this.cookies.getAll();
    return this.Restangular.one('/api/v1/nodes/', id).get().then((function(_this) {
      return function(res) {
        return res.remove('', {
          'X-CSRFToken': s.csrftoken
        }).then(function() {
          return _this.$onInit();
        });
      };
    })(this));
  };

  treeCtrl.prototype.openModal = function(question) {
    this.modal = this.uibModal.open({
      size: 'md',
      component: 'modalComponent',
      resolve: {
        node: (function(_this) {
          return function() {
            return question;
          };
        })(this),
        tree: (function(_this) {
          return function() {
            var tree;
            if (question.category === 'npc') {
              return tree = _this.player.nodes;
            } else {
              return tree = _this.npc.nodes;
            }
          };
        })(this)
      }
    });
    return this.modal.result.then((function(_this) {
      return function() {
        return _this.$onInit();
      };
    })(this));
  };

  treeCtrl.prototype.makeTree = function(person) {
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

  return treeCtrl;

})();

angular.module('app').component('tree', {
  template: tpl(),
  controller: ['Player', 'NpcFactory', 'Restangular', '$q', '$uibModal', '$cookies', treeCtrl],
  controllerAs: 'ctrl'
});

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

// ---
// generated by coffee-script 1.9.2
