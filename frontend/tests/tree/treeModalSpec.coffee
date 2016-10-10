fdescribe 'TreeModalSpec', ->
  ctrl = undefined
  beforeEach(angular.mock.module('app'));
  element = undefined
  scope = undefined
  httpBackend = undefined

  beforeEach inject(($rootScope, $compile,$httpBackend) ->
    scope = $rootScope.$new()
    scope.resolve =
      node:{id:1,category:'npc'}
      tree:[{id:0,text:"Один"},{id:1,text:"Два"}]

    element = angular.element('<modal-component resolve ="resolve"></modal-component>')
#    console.log scope.resolve
    element = $compile(element)(scope)
    ctrl = element.controller('modalComponent')

    httpBackend = $httpBackend
#    httpBackend.whenGET('/api/v1/persons/1').respond({id:1,name:"Васиа"})
#    httpBackend.whenGET('uib/template/modal/window.html').respond(200,'')
#    httpBackend.whenGET('/api/v1/npc/').respond([{id:1,name:"Васиа"},{id:2,name:"Lenia"}])
    httpBackend.whenGET('/api/v1/nodes/1/').respond({id:1,category:'npc',text:"Привет",choice:[4,3,2]})
    httpBackend.whenGET('/api/v1/nodes/player/').respond([{id:1},{id:2}])
    httpBackend.whenPUT('/api/v1/nodes/1/').respond("success")
#    httpBackend.whenGET('/api/v1/nodes/npc').respond([{id:4,text:"даров",choice:[2]},{id:5,text:"Да ничо так,как сам?",choice:[3]},{id:6,text:"Сам как?"}])
#    scope.$apply()
#    httpBackend.flush()
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
  describe 'Save', ->
      it 'Has method to save',->
        expect(ctrl.save).toBeDefined()
      it 'Saves selected in DB',->
        ctrl.selected =
          id:5
          category:'player'
          text:"Здоровки, USERNAME!"
        spyOn(ctrl,'save').and.callThrough()
        ctrl.save()
        httpBackend.expectGET('/api/v1/nodes/1/')
        httpBackend.expectPUT('/api/v1/nodes/1/')
        httpBackend.flush()
#        expect(ctrl.toSave).toEqual({idFrom:1,idTo:5})
  describe 'delete', ->
    it 'Has method to delete',->
        expect(ctrl.delete).toBeDefined()
    it 'deletes one of choices',->
        spyOn(ctrl,'save').and.callThrough()
        ctrl.delete(2)
        httpBackend.expectGET('/api/v1/nodes/1/')
        httpBackend.expectPUT('/api/v1/nodes/1/',{"id":1,category:'npc',"text":"Привет","choice":[4,3]})
        httpBackend.flush()
  describe 'create', ->
    it 'Has method to create',->
        expect(ctrl.create).toBeDefined()
    it 'creates new node and add it to answers of currentnode',->
        spyOn(ctrl,'create').and.callThrough()
        ctrl.create("А неплохо было бы выпить...")

        httpBackend.expectGET('/api/v1/nodes/player/')
        httpBackend.expectPOST('/api/v1/nodes/player/')
#        httpBackend.expectPUT('/api/v1/nodes/1/',{"id":1,"text":"Привет","choice":[4,3]})
        httpBackend.flush()






