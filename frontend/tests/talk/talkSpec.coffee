describe 'TalkTest', ->
  ctrl = undefined

  beforeEach(angular.mock.module('app'));
  element = undefined
  scope = undefined
  httpBackend  = undefined

  beforeEach inject(($rootScope, $compile,$httpBackend) ->
    scope = $rootScope.$new()
    element = angular.element('<talk></talk>')
    element = $compile(element)(scope)
    ctrl = element.controller('talk')
    scope.$apply()
    httpBackend = $httpBackend
    httpBackend.whenGET('/api/v1/persons/1').respond({id:1,name:"Васиа"})
    httpBackend.whenGET('/api/v1/npc/').respond([{id:1,name:"Васиа"},{id:2,name:"Lenia"}])
    httpBackend.whenGET('/api/v1/nodes/player').respond([{id:3,is_first:true,text:"Привет",choice:[4]},{id:2,text:"Кагдила?",choice:[5]},{id:8,text:"Да ваще норм",choice:[5]}])
    httpBackend.whenGET('/api/v1/nodes/npc').respond([{id:4,is_first:true,text:"даров",choice:[2]},{id:5,text:"Да ничо так,как сам?",choice:[3]},{id:6,text:"Сам как?"}])

    return
  )
  afterEach(->
    httpBackend.verifyNoOutstandingExpectation()
    httpBackend.verifyNoOutstandingRequest()
    return
  )

  describe 'Init', ->

    it 'Variables to be defined in talk component',->
      expect(ctrl).toBeDefined()
      expect(ctrl.player).toBeDefined()
#      console.log ctrl
#      expect(ctrl.npc).toBeDefined()
      expect(ctrl.gameName).toBeDefined()
      expect(ctrl.time).toBeDefined()
      expect(ctrl.time).toBe(100)
      expect(ctrl.history).toBeDefined()


    it 'Methods in component to be defined te',->
      expect(ctrl.update).toBeDefined()
      expect(ctrl.findAnswerForQuestion).toBeDefined()
      expect(ctrl.fillNextArrayOfQuestions).toBeDefined()
      expect(ctrl.checkColor).toBeDefined()
      expect(ctrl.notTheEnd).toBeDefined()
      expect(ctrl.checkForSuccess).toBeDefined()
      expect(ctrl.writeHistory).toBeDefined()

    it '$onInit calls update with "1" ' ,->
      spyOn(ctrl,'update')
      next =
        params:
          id:1
      ctrl.player.localStorage.player = {id:1}
      ctrl.$routerOnActivate(next)
      httpBackend.flush()
      expect(ctrl.update).toHaveBeenCalled()
      expect(ctrl.update.calls.argsFor(0)).toEqual([1])

  describe 'Update method', ->
    beforeEach (->
      next =
        params:
          id:1
      ctrl.$routerOnActivate(next)
      httpBackend.flush()
    )
    it 'can be called',->
      spyOn(ctrl,'update')
      ctrl.update()
      expect(ctrl.update).toHaveBeenCalled()
    it 'checks for the end in the update',->
      spyOn(ctrl,'checkForSuccess')
      ctrl.update()
      expect(ctrl.checkForSuccess).toHaveBeenCalled()
    it 'writes history when called',->
      spyOn(ctrl,'writeHistory')
      ctrl.update()
      expect(ctrl.writeHistory).toHaveBeenCalled()


    it 'does not changes time when updating first time',->
      expect(ctrl.time).toEqual(100)
      ctrl.update()
      expect(ctrl.time).toEqual(100)
    it 'changes time when updating with specified id',->
      expect(ctrl.time).toEqual(100)
      ctrl.update(2)
      expect(ctrl.time).toEqual(70)
  describe 'Finding questions and answers with npc and player  methods', ->
    beforeEach (->
      next =
        params:
          id:1
      ctrl.$routerOnActivate(next)
      httpBackend.flush()
    )
    it 'calls for findAnswerForQuestion when updates',->
      spyOn(ctrl,'findAnswerForQuestion')
      ctrl.update()
      expect(ctrl.findAnswerForQuestion).toHaveBeenCalled()
    it 'calls for findAnswerForQuestion when updates',->
      spyOn(ctrl,'fillNextArrayOfQuestions')
      ctrl.update()
      expect(ctrl.fillNextArrayOfQuestions).toHaveBeenCalled()
    it 'methods in npc and player is not called without quetionId',->
      spyOn(ctrl.npc,'findNode')
      ctrl.findAnswerForQuestion()
      expect(ctrl.npc.findNode).not.toHaveBeenCalled()
    it 'methods in npc and player is called',->
      spyOn(ctrl.npc,'findNode').and.callThrough()
#      spyOn(ctrl.player,'findCurrent').and.callThrough()
      spyOn(ctrl.npc,'findCurrent').and.callThrough()
#      spyOn(ctrl.player,'findNode').and.callThrough()

      ctrl.update(3)
      console.log ctrl.npc.branch.id
      expect(ctrl.npc.branch.id).toEqual(3)
      expect(ctrl.npc.findNode).toHaveBeenCalled()
      expect(ctrl.npc.findNode.calls.argsFor(0)).toEqual([3])
      expect(ctrl.npc.branch.id).toEqual(3)

#      expect(ctrl.player.findCurrent).toHaveBeenCalled()
#      expect(ctrl.player.findCurrent.calls.argsFor(0)).toEqual([2])
#      expect(ctrl.player.current.text).toEqual("А можно Михаила Сергеевича?")

      expect(ctrl.npc.findCurrent).toHaveBeenCalled()

#      expect(ctrl.player.findNode).toHaveBeenCalled()


  describe 'Check of the end', ->
    beforeEach (->
      next =
        params:
          id:1
      ctrl.$routerOnActivate(next)
      httpBackend.flush()
    )
    it 'in the beginnings is not the end',->
      expect(ctrl.result).toBeDefined()
      expect(ctrl.result.end).toBeFalsy()
      expect(ctrl.result.type).toBe("")
    it 'Fill array of questions with no choice',->
      spyOn(ctrl.player,'findNode').and.callThrough()
      ctrl.result.end =true
      ctrl.result.type = 'failure'
      ctrl.fillNextArrayOfQuestions()
      expect(ctrl.player.findNode).toHaveBeenCalled()
      expect(ctrl.player.questionArray).toEqual([])

