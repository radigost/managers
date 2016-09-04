describe 'TreeSpec', ->
  ctrl = undefined
  beforeEach(angular.mock.module('app'));
  element = undefined
  scope = undefined

  beforeEach inject(($rootScope, $compile) ->
    scope = $rootScope.$new()

    element = angular.element('<tree></tree>')
    element = $compile(element)(scope)
    ctrl = element.controller('tree')
    scope.$apply()
    return
  )

  describe 'Init', ->
      it 'Variables to be defined in talk component',->
        expect(ctrl).toBeDefined()
        expect(ctrl.player).toBeDefined()
        expect(ctrl.npc).toBeDefined()
        expect(ctrl.treeType).toBeDefined()
        expect(ctrl.tree).toBeDefined()
        expect(ctrl.filterQ).toBeDefined()

      it 'Methods in component to be defined',->
        expect(ctrl.openModal).toBeDefined()
      it 'Runs tree builder on init',->
        spyOn(ctrl,'makeTree').and.callThrough()
        ctrl.$onInit()
        expect(ctrl.makeTree).toHaveBeenCalled()
  describe 'Tree Builders', ->

      it 'make tree when run makeTree',->
        expect(ctrl.makeTree).toBeDefined()
        ctrl.makeTree()
      it 'make tree when run for player',->
        ctrl.makeTree(ctrl.player)
        expect(ctrl.treeType).toEqual("Редактор ответов для Игрока")
        expect(ctrl.tree.length).toBeGreaterThan(1)
        expect(ctrl.tree[0].text).toEqual("Да, здравствуйте, чем можем вам помочь?")
      it 'make tree when run for npc',->
        ctrl.makeTree(ctrl.npc)
        expect(ctrl.treeType).toEqual("Редактор ответов для NPC")
        expect(ctrl.tree.length).toBeGreaterThan(1)
        expect(ctrl.tree[0].text).toEqual("Добрый день!")



