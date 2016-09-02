Npc = require('../Class/npc.coffee')
Player = require('../Class/player.coffee')
tpl = require('./game.jade')

class gameCtrl
  constructor:()->
    @gameName = "Основной экран"
    @npc = new Npc
    @player = new Player
    @gamestat = {
      money:500
    }
    @leads ={
      items:[
        {id:1,name:"Восток Инк"}
        {id:2,name:"Дальний восток "}
        {id:3,name:"Ближний Восток"}
        {id:4,name:"Опиум для народа"}
        {id:5,name:"Все Вани"}
        {id:6,name:"Дик и к "}
        {id:7,name:"Бразерхуд оф стил"}
        {id:8,name:"Сестрихуд оф ситец"}
        {id:9,name:"Бардук"}
        {id:10,name:"Вести"}
        {id:11,name:"Бардлагок инкорпорейтед"}
        {id:12,name:"Богатые беженцы"}
        {id:13,name:"Богач и Богач"}
      ]
    }


  $onInit:()=>
#    @update 1
#
#  update:(questionId)=>
#    @time -= 30 if questionId>1
#    @findAnswerForQuestion(questionId)
#    @checkForSuccess()
#    @writeHistory()
#    @fillNextArrayOfQuestions()
#    @writeHistory()
#    return
#
#  findAnswerForQuestion:(questionId)=>
#    if questionId
#      @npc.findNode(questionId)
#      @player.findCurrent(questionId)
#      @npc.findCurrent()
#
#  fillNextArrayOfQuestions:()=>
#    if @isStatus('failure')
#      @npc.fail()
#      @player.fail()
#    else if @isStatus('success')
#      @npc.succeed()
#      @player.succeed()
#    @player.findNode(@npc.current.id)
#
#  checkColor:()=>
#    f = ""
#    f= "failure" if @isStatus('failure')
#    f= "success" if @isStatus('success')
#    f
#  notTheEnd:()=>
#    r = true
#    if @isStatus('failure') or @isStatus('success')
#      r = false
#    return r
#
#  checkForSuccess:()=>
#    if !@npc.branch
#        @result.end = true
#        @result.type = "failure"
#
#    if @npc.current
#      if (@npc.current.type =="failure") || @time <=0
#        @result.end = true
#        @result.type = "failure"
#
#      if (@npc.current.type =="success")
#        @result.end = true
#        @result.type = "success"
#  isStatus:(name)=>
#    itIs = false
#    if @result.type == name
#      itIs =  true
#    itIs
#
#
#  writeHistory:()=>
#    inHistory = _.find(@history,{text:@npc.current.text})
#    if not inHistory
#      @history.push(@npc.current)
#
#    inHistory = _.find(@history,{text:@player.current.text})
#    if not inHistory
#      @history.push(@player.current)





angular.module('app').component('game',{
  template:tpl()
  controller:[gameCtrl]
  controllerAs:'ctrl'
})

