Npc = require('../Class/npc.coffee')
Player = require('../Class/player.coffee')
tpl = require('./tree.jade')
modalTpl = require('./modal.jade')
require('./modal.coffee')

class treeCtrl
  constructor:(@uibModal)->
    @npc = new Npc
    @player = new Player
    @tree = []
    @filterQ = false

  $onInit:()=>
    @makeTree(@player)

  openModal:()=>
    @modal = @uibModal.open
      template:modalTpl()
      size:'md'
      controller:'modalCtrl'

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
        qNode =_.find(person.tree,{questionId:node.id})
        if qNode && qNode.choices
          node.hasSiblings = true
          _.forEach qNode.choices, (choice)=>
            t = _.find person.nodes,{id:choice}
            nodesArray.push(t)

        node.answers = nodesArray
        @tree.push(node)








angular.module('app').component('tree',{
  template:tpl()
  controller:['$uibModal',treeCtrl]
  controllerAs:'ctrl'
})



angular.module('app').filter 'HasNoAnswer', ->
  (data,filterQ) ->
    out = data
    if filterQ == true
      out = _.filter(data, (element)=>
        ret = (element.hasSiblings != true) && (element.type !="failure") && (element.type !="success")
        return ret
      )
    out