#Npc = require('../Class/npc.coffee')
require('../Class/player.coffee')
require('../Class/Company.coffee')
require('../Class/factories.coffee')
tpl = require('./talk.jade')

class appCtrl
  constructor:(@player,@NpcFactory,@company,@Restangular)->
    @gameName = "Окно переговоров"
    @time = 100
    @history = []
#    @npc = new Npc
    @result = {
      end:false
      type:""
    }



  $routerOnActivate:(next)=>
    @player.init()
    @npcId=next.params.npcId
    @npc = @NpcFactory(@Restangular)
    @npc.selectCurrent(@npcId)
    @update 1

  update:(questionId)=>
    @time -= 30 if questionId>1
    @findAnswerForQuestion(questionId)
    @checkForSuccess()
    @writeHistory()
    @fillNextArrayOfQuestions()
    @writeHistory()
    return

  findAnswerForQuestion:(questionId)=>
    if questionId
      @npc.findNode(questionId)
      @player.findCurrent(questionId)
      @npc.findCurrent()

  fillNextArrayOfQuestions:()=>
    if @isStatus('failure')
      @npc.fail()
      @player.fail()
      @time = 0

    else if @isStatus('success')
      @npc.succeed()
      @player.succeed()
      @time = 0
    @player.findNode(@npc.current.id)

  checkColor:()=>
    f = ""
    f= "failure" if @isStatus('failure')
    f= "success" if @isStatus('success')
    f
  notTheEnd:()=>
    r = true
    if @isStatus('failure') or @isStatus('success')
      r = false
    return r

  checkForSuccess:()=>
    if !@npc.branch
        @result.end = true
        @result.type = "failure"

    if @npc.current
      if (@npc.current.type =="failure") || @time <=0
        @result.end = true
        @result.type = "failure"


      if (@npc.current.type =="success")
        @result.end = true
        @result.type = "success"
  isStatus:(name)=>
    itIs = false
    if @result.type == name
      itIs =  true
    itIs


  writeHistory:()=>
    inHistory = _.find(@history,{text:@npc.current.text})
    if not inHistory
      @history.push(@npc.current)

    inHistory = _.find(@history,{text:@player.current.text})
    if not inHistory
      @history.push(@player.current)





angular.module('app').component('talk',{
  template:tpl()
  controller:['Player','NpcFactory','Company','Restangular',appCtrl]
  controllerAs:'ctrl'
  bundings:
    $router:'<'
})

