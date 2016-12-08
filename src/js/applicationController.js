(function () {
    'use strict';

    app.controller('applicationController', function ($scope, $http, $location, myService) {

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
                getFileList(application.appid).then(function (data) {
                    var fileList = data.data.data;
                    for (var i = 0; i < fileList.length; i++) {
                        deleteFile(application.appid, fileList[i].id);
                    }
                }, function (err) {
                    console.log('error');
                })
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

        var getFileList = function (appid) {
            return $http({
                url: 'v1/dataManagement/listDataFile',
                method: 'POST',
                data: {
                    'appid': appid
                }
            })
        };

        var deleteFile = function (appid, fileid) {
            return $http({
                url: 'v1/dataManagement/delDataFile',
                method: 'POST',
                data: {
                    'appid': appid,
                    'dataid': fileid
                }
            })
        };

        var resetModalForm = function () {
            $scope.currentApplication.appName = '';
            $scope.currentApplication.appDesc = '';
            $scope.currentApplication.email = '';
            $scope.currentApplication.productDesc = '';
        };

        $scope.goToDataFile = function (application) {
            myService.setApplication(application);
            $location.path('/data');
        };

        $scope.refreshAppList();
    });
})();