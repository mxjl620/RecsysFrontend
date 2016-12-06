(function () {
    'use strict';

    app.controller('applicationController', function ($scope, $http, $location) {

        $scope.currentApplication = {};

        $scope.refreshAppList = function () {
            $http({
                url: 'v1/applicationManagement/listApplication',
                method: 'POST',
                data: {
                    'userid': 'admin'
                }
            }).then(function (response) {
                    $scope.applications = response.data.data;
                },
                function (response) {
                    console.log('error');
                });
        };

        $scope.remove = function (application) {
            $http({
                url: 'v1/applicationManagement/delApplication',
                method: 'POST',
                data: {
                    'userid': 'admin',
                    'appid': application.appid
                }
            }).then(function (response) {
                $scope.refreshAppList();
            },function (response) {
                console.log('error')
            })
        };

        $scope.addApplication = function () {
          $http({
              url: 'v1/applicationManagement/addApplication',
              method: 'POST',
              data: {
                  'userid': 'admin',
                  'appName': $scope.currentApplication.appName,
                  'appDesc': $scope.currentApplication.appDesc,
                  'email': $scope.currentApplication.email,
                  'productDesc': $scope.currentApplication.productDesc
              }
          }).then(function (response) {
              resetModalForm();
              $scope.refreshAppList();
              $('#myModal').modal('hide');
          },function (response) {
              console.log('error');
          })
        };

        var resetModalForm = function () {
            $scope.currentApplication.appName = '';
            $scope.currentApplication.appDesc = '';
            $scope.currentApplication.email = '';
            $scope.currentApplication.productDesc = '';
        };

        $scope.goToDataFile = function (application) {
          $location.path('/data');
        };

        $scope.refreshAppList();
    });
})();