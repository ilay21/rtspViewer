angular.module("app")
  .component('addNewComponent', {
    templateUrl: "../views/addNew.html",
    controller: "addNewCtrl"

  })
  .controller('addNewCtrl', ['$http', '$state', function ($http, $state) {
    var ctrl = this;
    ctrl.rtspUrl = '';

    ctrl.logout = function () {
      localStorage.removeItem('token');
      $state.go('login');
    }

    ctrl.add = function () {
      if (ctrl.rtspUrl) {
        var token = localStorage.getItem('token');
        $http.post('http://localhost:3000/rtspurl', {
            url: ctrl.rtspUrl
          }, {
            headers: {
              Authorization: token
            }
          })
          .then(function (res) {
            ctrl.rtspUrl = '';
            console.log(res);
          })
      }

    }
  }])
