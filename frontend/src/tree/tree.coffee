Npc = require('../Class/npc.coffee')
Player = require('../Class/player.coffee')
tpl = require('./tree.jade')
require('./modal.coffee')

class treeCtrl
  constructor:(@player,@NpcFactory,@Restangular,@q,@uibModal)->
    @tree = []
    @filterQ = false

  $onInit:()=>
    @player.init()
    @npc = @NpcFactory(@Restangular,@q)
    @q.all([
      @player.loadNodes()
      @player.loadTree()
      @npc.loadNodes()
      @npc.loadTree()
    ]).then (res)=>
        @makeTree(@player)

  openModal:(question)=>
    @modal = @uibModal.open
      size:'md'
      component:'modalComponent'
      resolve:
        node:=>
          question
        tree:=>
          if question.category == 'npc'
            tree = @player.nodes
          else
            tree = @npc.nodes
    @modal.result.then =>
      @$onInit()

  makeTree:(person)=>
    if person
      if person.type == 'player'
        @treeType = "Редактор ответов для Игрока"
        opponent = @npc
      else if  person.type == 'npc'
        @treeType = "Редактор ответов для NPC"
        opponent = @player
      @tree = []

      _.forEach opponent.nodes,(node)=>
        nodesArray = []
        qNode =_.find(person.tree,{id:node.id})
        if qNode && qNode.choice.length>0
          node.hasSiblings = true
          _.forEach qNode.choice, (choice)=>
            t = _.find person.nodes,{id:choice}
            nodesArray.push(t)
        node.answers = nodesArray
        @tree.push(node)




angular.module('app').component('tree',{
  template:tpl()
  controller:['Player','NpcFactory','Restangular','$q','$uibModal',treeCtrl]
  controllerAs:'ctrl'
})



angular.module('app').filter 'HasNoAnswer', ->
  (data,filterQ) ->
    out = data
    console.log data
    if filterQ == true
      out = _.filter(data, (element)=>
        ret = (element.hasSiblings != true) && (element.is_failure!=true) && (element.is_success!=true)
        return ret
      )
    out