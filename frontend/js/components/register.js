angular.module("app")
  .component('registerComponent', {
    templateUrl: "../views/register.html",
    controller: "registerCtrl"

  })
  .controller('registerCtrl', ['$http', '$state',function ($http, $state) {
    var ctrl = this;

    ctrl.register = function () {
      if (ctrl.username && ctrl.pwd) {
        $http.post('http://localhost:3000/register', {
            username: ctrl.username,
            pwd: ctrl.pwd
          })
          .catch(function (err) {
            console.log(err)
          })
          .then(function (res) {
            $state.go('login');
          })
      }
    }
  }])
