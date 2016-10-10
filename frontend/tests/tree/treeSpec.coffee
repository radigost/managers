describe 'TreeSpec', ->
  ctrl = undefined
  beforeEach(angular.mock.module('app'));
  element = undefined
  scope = undefined
  httpBackend = undefined

  beforeEach inject(($rootScope, $compile,$httpBackend) ->
    scope = $rootScope.$new()
    element = angular.element('<tree></tree>')
    element = $compile(element)(scope)
    ctrl = element.controller('tree')
    httpBackend = $httpBackend
    httpBackend.whenGET('/api/v1/persons/1').respond({id:1,name:"Васиа"})
    httpBackend.whenGET('uib/template/modal/window.html').respond(200,'')
    httpBackend.whenGET('/api/v1/npc/').respond([{id:1,name:"Васиа"},{id:2,name:"Lenia"}])
    httpBackend.whenGET('/api/v1/nodes/player').respond([{id:3,is_first:true,text:"Привет",choice:[4]},{id:2,text:"Кагдила?",choice:[5]},{id:8,text:"Да ваще норм",choice:[5]}])
    httpBackend.whenGET('/api/v1/nodes/npc').respond([{id:4,text:"даров",choice:[2]},{id:5,text:"Да ничо так,как сам?",choice:[3]},{id:6,text:"Сам как?"}])
    scope.$apply()
    httpBackend.flush()
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
        expect(ctrl.npc).toBeDefined()
        expect(ctrl.treeType).toBeDefined()
        expect(ctrl.tree).toBeDefined()
        expect(ctrl.filterQ).toBeDefined()

      it 'Methods in component to be defined',->
        expect(ctrl.openModal).toBeDefined()
      it 'Runs tree builder on init',->
        spyOn(ctrl,'makeTree').and.callThrough()
        ctrl.$onInit()
        httpBackend.flush()
        expect(ctrl.makeTree).toHaveBeenCalled()
  describe 'Tree Builders', ->
      it 'make tree when run makeTree',->
        expect(ctrl.makeTree).toBeDefined()
        ctrl.makeTree()
      it 'make tree when run for player',->
        ctrl.makeTree(ctrl.player)
        expect(ctrl.treeType).toEqual("Редактор ответов для Игрока")
        expect(ctrl.tree.length).toBeGreaterThan(1)
        expect(ctrl.tree[0].text).toEqual("даров")
        expect(ctrl.tree[0].answers[0].text).toEqual("Кагдила?")
      it 'make tree when run for npc',->

        ctrl.makeTree(ctrl.npc)
        expect(ctrl.treeType).toEqual("Редактор ответов для NPC")
        expect(ctrl.tree.length).toBeGreaterThan(1)
        expect(ctrl.tree[0].text).toEqual("Привет")
        expect(ctrl.tree[0].answers[0].text).toEqual("даров")
  describe 'Modal', ->
      it 'open modal is defined',->
        expect(ctrl.openModal).toBeDefined()
      it 'OpenModal function gets node with paarams',->
        spyOn(ctrl,'openModal').and.callThrough()
        question =
          id:18
          category:'npc'
          text:"Привет"
          answers:[
            {
              text:"Ну привет"
            }
          ]
        ctrl.openModal(question)
        Q = ctrl.openModal.calls.argsFor(0)[0]
        expect(Q.text).toEqual("Привет")
        expect(Q.answers[0].text).toEqual("Ну привет")
        httpBackend.flush()




