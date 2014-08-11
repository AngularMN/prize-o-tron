describe('Test aboutController', function () {

  beforeEach(module('apot.aboutController'));

  describe('apot.aboutController', function () {
    it('have a name on the controller',
      inject(function ($rootScope, $controller) {

        var scope = $rootScope.$new();
        $controller("aboutController", {$scope: scope });
        expect(scope.controllerName).toBe('aboutController');
      }));
  });
});