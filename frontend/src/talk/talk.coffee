require('../Class/player.coffee')
require('../Class/factories.coffee')
tpl = require('./talk.jade')

class appCtrl
  constructor:(@player,@NpcFactory,@Restangular,@q)->
    @gameName = "Окно переговоров"
    @time = 100
    @history = []
    @result = {
      end:false
      type:""
    }

  $routerOnActivate:(next)=>
    @player.init()
    @npcId=next.params.npcId
    @npc = @NpcFactory(@Restangular,@q)
    @npc.selectCurrent(@npcId)
    @q.all([
      @player.loadNodes()
      @player.loadTree()
      @npc.loadNodes()
      @npc.loadTree()
    ]).then (res)=>
#        console.log "now can update",@npc,@player
        @update 1

  update:(questionId)=>
#    console.log questionId
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
    if @player.current
      inHistory = _.find(@history,{text:@player.current.text})
    if not inHistory
      @history.push(@player.current)





angular.module('app').component('talk',{
  template:tpl()
  controller:['Player','NpcFactory','Restangular','$q',appCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})

