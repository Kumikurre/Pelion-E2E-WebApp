describe('webApp', function () {

  beforeEach(module('webApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('webAppConnectivity', function () {
    it('Connection confirmed', function () {
      var $conectivity = {};
      var controller = $controller('CalculatorController', { $connectivity: $scope });
      $connectivity.confirmed();
      expect($connectivity.z).toBe(True);
    }); 

    it('Connectivity should be True', function () {
      var $connectivity = {};
      var controller = $controller('WebAppController', { account_id: $connectivity });
      expect(account_id).toBe(True);
    });
  });

});