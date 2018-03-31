angular.module("app")
  .component('loginComponent', {
    templateUrl: "../views/login.html",
    controller: "loginCtrl"

  })
  .controller('loginCtrl', ['$http', '$state', function ($http, $state) {
    var ctrl = this;
    ctrl.login = function () {
      if (ctrl.username && ctrl.pwd) {
        $http.post('http://localhost:3000/login', {
          username: ctrl.username,
          pwd: ctrl.pwd
        }).then(function (res) {
          if (res.data.token)
            localStorage.setItem('token', res.data.token);
            $state.go('addNew')
        })
      }
    }

    ctrl.$onInit = function () {
      var token = localStorage.getItem('token');
      if (token) {
        $state.go('addNew')
      }
    }
  }])
