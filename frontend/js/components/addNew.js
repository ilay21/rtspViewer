angular.module("app")
  .component('addNewComponent', {
    templateUrl: "../views/addNew.html",
    controller: "addNewCtrl"

  })
  .controller('addNewCtrl', ['$http', '$state',function ($http, $state) {
    var ctrl = this;


    ctrl.logout = function(){
        localStorage.removeItem('token');
        $state.go('login');
    }

    ctrl.add = function(){
        var token = localStorage.getItem('token');
        console.log(token);
        $http.post('http://localhost:3000/rtspurl', {
            url: 'lsls'
        }, {headers: {
            Authorization: token
        }})
        .then(function(res){
            console.log(res);
        })
    }
  }])
