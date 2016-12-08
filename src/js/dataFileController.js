(function () {
    'use strict';

    app.controller('dataFileController', function ($scope, $http, $location, myService) {

        $scope.currentApplication = myService.getApplication();

        $scope.refreshFileList = function () {
            $http({
                url: 'v1/dataManagement/listDataFile',
                method: 'POST',
                data: {
                    'appid': $scope.currentApplication.appid
                }
            }).then(function (response) {
                    var list = response.data.data;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].type == 0) {
                            list[i].type = '用户数据'
                        }
                        if (list[i].type == 1) {
                            list[i].type = '物品数据'
                        }
                        if (list[i].type == 2) {
                            list[i].type = '行为数据'
                        }
                    }
                    $scope.fileList = list;
                },
                function (response) {
                    console.log('error');
                });
        };

        $scope.showModal = function () {
            $('#addFileModal').modal('show');
        };

        $scope.addDataFile = function () {

            var fd = new FormData();
            var file = document.querySelector('input[type=file]').files[0];
            fd.append('file', file);
            fd.append('appid', $scope.currentApplication.appid);
            fd.append('name', $scope.file.name);
            fd.append('type', $scope.file.type);
            $http({
                url: 'v1/dataManagement/addData',
                method: 'POST',
                data: fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function (response) {
                    resetModalForm();
                    $scope.refreshFileList();
                    $('#addFileModal').modal('hide');
                },
                function (response) {
                    console.log('error');
                });
        };

        $scope.deleteFile = function (file) {
            $http({
                url: 'v1/dataManagement/delDataFile',
                method: 'POST',
                data: {
                    'appid': $scope.currentApplication.appid,
                    'dataid': file.id
                }
            }).then(function (response) {
                    $scope.refreshFileList();
                },
                function (response) {
                    console.log('error');
                });
        };

        var resetModalForm = function () {
            $scope.file.name = '';
            $scope.file.type = '0';
            $scope.file.file = '';
        };

        $scope.refreshFileList();
    });
})();