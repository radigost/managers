modalTpl = require('./modal.jade')
class treeModalCtrl
  constructor:(@Restangular,@cookies)->
    @node  = @resolve.node
#    console.log @resolve.tree

  cancel:()=>
    @dismiss({$value: 'cancel'})
  save:()=>
#    console.log @selected
#    console.log @node
    @toSave =
      idFrom:@node.id
      idTo:@selected.id
    @Restangular.one('/api/v1/nodes/',@node.id).get().then (res)=>
      console.log res.choice
      res.choice.push @selected.id
      s =  @cookies.getAll()
      res.customPUT('','','',{'X-CSRFToken':s.csrftoken})
  selectItem:()=>
    console.log @selected


angular.module('app').component 'modalComponent',
  template: modalTpl()
  bindings:
    resolve: '<'
    close: '&'
    dismiss: '&'
  controller:['Restangular','$cookies',treeModalCtrl]

