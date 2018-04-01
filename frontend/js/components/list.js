angular.module("app")
  .component('listComponent', {
    templateUrl: "../views/list.html",
    controller: "listCtrl"

  })
  .controller('listCtrl', ['$http', '$state', function ($http, $state) {
    var ctrl = this;
    ctrl.list = [];
    ctrl.selectedUrl = ''
    ctrl.selectedIndex = ''

    ctrl.logout = function () {
      localStorage.removeItem('token');
      $state.go('login');
    }

    ctrl.switchUrl = function (url, index) {
      ctrl.selectedUrl = url;
      ctrl.selectedIndex = index;
    }

    ctrl.watch = function () {
      $state.go('player', {
        rtspUrl: ctrl.selectedUrl
      });
    }

    function fetchAllUrls() {
      $http.get('http://localhost:3000/rtspurl')
        .then(function (response) {
          if (response.data) {
            ctrl.list = response.data;
          }
        })
    }

    ctrl.$onInit = function () {
      fetchAllUrls();
    }

  }])
