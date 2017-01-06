import * as angular from "angular";
import {IModalServiceInstance} from "angular-ui-bootstrap";

class ModalCtrl
{
  static $inject = ['$uibModalInstance'];
  constructor (private uibModalInstance:IModalServiceInstance) {}
  cancel() { return this.uibModalInstance.close(); }
};

angular
    .module('app').controller('ModalCtrl',ModalCtrl);
