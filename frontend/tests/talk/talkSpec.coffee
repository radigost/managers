describe 'TalkTest', ->
  ctrl = undefined
  beforeEach(angular.mock.module('app'));
  element = undefined
  scope = undefined

  beforeEach inject(($rootScope, $compile) ->
    scope = $rootScope.$new()
    element = angular.element('<talk></talk>')
    element = $compile(element)(scope)
    ctrl = element.controller('talk')
    scope.$apply()
    return
  )


  describe 'Init', ->
    it 'Variables to be defined in talk component',->
      expect(ctrl).toBeDefined()
      expect(ctrl.player).toBeDefined()
      expect(ctrl.npc).toBeDefined()
      expect(ctrl.gameName).toBeDefined()
      expect(ctrl.time).toBeDefined()
      expect(ctrl.time).toBe(100)
      expect(ctrl.history).toBeDefined()


    it 'Methods in component to be defined',->
      expect(ctrl.update).toBeDefined()
      expect(ctrl.findAnswerForQuestion).toBeDefined()
      expect(ctrl.fillNextArrayOfQuestions).toBeDefined()
      expect(ctrl.checkColor).toBeDefined()
      expect(ctrl.notTheEnd).toBeDefined()
      expect(ctrl.checkForSuccess).toBeDefined()
      expect(ctrl.writeHistory).toBeDefined()

    it '$onInit calls update with "1" ' ,->
      spyOn(ctrl,'update')
      ctrl.$onInit()
      expect(ctrl.update).toHaveBeenCalled()
      expect(ctrl.update.calls.argsFor(0)).toEqual([1])

  describe 'Update method', ->
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
      ctrl.update(5)
      expect(ctrl.time).toEqual(70)
  describe 'Finding questions and answers with npc and player  methods', ->
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
      spyOn(ctrl.player,'findCurrent').and.callThrough()
      spyOn(ctrl.npc,'findCurrent').and.callThrough()
      spyOn(ctrl.player,'findNode').and.callThrough()
      expect(ctrl.npc.branch.questionId).toEqual(1)
#      console.log ctrl.npc.answerNode
      ctrl.update(2)
#      console.log ctrl.npc.answerNode
      expect(ctrl.npc.findNode).toHaveBeenCalled()
      expect(ctrl.npc.findNode.calls.argsFor(0)).toEqual([2])
      expect(ctrl.npc.branch.questionId).toEqual(2)

      expect(ctrl.player.findCurrent).toHaveBeenCalled()
      expect(ctrl.player.findCurrent.calls.argsFor(0)).toEqual([2])
      expect(ctrl.player.current.text).toEqual("А можно Михаила Сергеевича?")

      expect(ctrl.npc.findCurrent).toHaveBeenCalled()

      expect(ctrl.player.findNode).toHaveBeenCalled()


  describe 'Check of the end', ->
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

