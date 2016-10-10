fdescribe 'TreeModalSpec', ->
  ctrl = undefined
  beforeEach(angular.mock.module('app'));
  element = undefined
  scope = undefined
  httpBackend = undefined

  beforeEach inject(($rootScope, $compile,$httpBackend) ->
    scope = $rootScope.$new()
    scope.resolve =
      node:{id:1}
      tree:[{id:0,text:"Один"},{id:1,text:"Два"}]

    element = angular.element('<modal-component resolve ="resolve"></modal-component>')
#    console.log scope.resolve
    element = $compile(element)(scope)
    ctrl = element.controller('modalComponent')

    httpBackend = $httpBackend
#    httpBackend.whenGET('/api/v1/persons/1').respond({id:1,name:"Васиа"})
#    httpBackend.whenGET('uib/template/modal/window.html').respond(200,'')
#    httpBackend.whenGET('/api/v1/npc/').respond([{id:1,name:"Васиа"},{id:2,name:"Lenia"}])
#    httpBackend.whenGET('/api/v1/nodes/player').respond([{id:3,is_first:true,text:"Привет",choice:[4]},{id:2,text:"Кагдила?",choice:[5]},{id:8,text:"Да ваще норм",choice:[5]}])
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
        expect(ctrl.toSave).toEqual({idFrom:1,idTo:5})






