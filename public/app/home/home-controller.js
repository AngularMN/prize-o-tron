angular.module('apot.homeController', ['ngResource'])
  .controller('homeController', [
    '$scope',
    '$resource',
    '$q',
    function ($scope, $resource, $q) {
      'use strict';
      $scope.controllerName = 'homeController';


      $scope.resetEverything = function () {
        $scope.api = { };
        $scope.events = [
          { }
        ];
        $scope.rsvps = [];
        $scope.selected = [];

      };

      $scope.resetEverything();

      var RsvpAPI = $resource('/rsvps');

      $scope.importNames = function () {

        var promises = [];

        angular.forEach($scope.events, function queryEvent(event) {
          if (event.event_id) {
            promises.push(RsvpAPI.query({event_id: event.event_id, key: $scope.api.key}).$promise)
          }
        });
        $q.all(promises).then(function (results) {
          var merged = [];
          angular.forEach(results, function (rsvpList) {
            angular.forEach(rsvpList, function (rsvp) {
              var index = _.findIndex(merged, { 'member': { name: rsvp.member.name} });
              if (index < 0) {
                merged.push(rsvp);
              }
            });
          });
          return merged;
        }).then(function (merged) {
          $scope.rsvps = merged;
          $scope.selected = [];
        })
      };

      $scope.addEvent = function () {
        $scope.events.push({ });
      };

      $scope.selectRSVP = function () {
        if ($scope.rsvps.length) {
          var index = Math.floor(Math.random() * ($scope.rsvps.length - 1));
          $scope.selected.unshift($scope.removeMember($scope.rsvps[index].member.member_id));
        }
      };

      $scope.clearRSVPS = function () {
        $scope.rsvps = [];
      };

      $scope.removeMember = function (memberId) {
        var index = _.findIndex($scope.rsvps, { 'member': { member_id: memberId} });
        console.log(memberId, index);
        return $scope.rsvps.splice(index, 1)[0];
      };

      $scope.removeEvent = function (index) {
        return $scope.events.splice(index, 1)[0];
      };

    }
  ]);