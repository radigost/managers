describe 'TreeSpec', ->
  ctrl = undefined
  beforeEach(angular.mock.module('app'));
  element = undefined
  scope = undefined

  beforeEach inject(($rootScope, $compile) ->
    scope = $rootScope.$new()

    element = angular.element('<game></game>')
    element = $compile(element)(scope)
    ctrl = element.controller('game')
    scope.$apply()
    return
  )

  describe 'Init', ->
      it 'Variables to be defined in talk component',->
        expect(ctrl).toBeDefined()
        expect(ctrl.player).toBeDefined()
        expect(ctrl.npc).toBeDefined()
        expect(ctrl.gamestat).toBeDefined()
        expect(ctrl.gamestat.money).toBeDefined()

      it 'Methods in component to be defined',->
        expect(ctrl.$onInit).toBeDefined()


