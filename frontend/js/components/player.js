angular.module("app")
  .component('playerComponent', {
    templateUrl: "../views/player.html",
    controller: "playerCtrl"

  })
  .service('playerCacheCounter', [function () {
    var playerCounter = 0;

    function increment() {
      playerCounter++;
    }

    function getCounter() {
      return playerCounter;
    }

    return {
      increment: increment,
      getCounter: getCounter
    }
  }])
  .controller('playerCtrl', ['$http', '$state', '$stateParams', 'playerCacheCounter', function ($http, $state, $stateParams, playerCacheCounter) {
    var ctrl = this;
    var playerId = 'vxg_media_player';

    function createPlayer(rtspUrl) {
      var calculatedId = playerId + playerCacheCounter.getCounter();
      playerCacheCounter.increment();
      var div = document.createElement('div');
      div.setAttribute("id", calculatedId);
      div.setAttribute("class", "vxgplayer");
      var runtimePlayers = document.getElementById('dynamicallyPlayers');
      runtimePlayers.appendChild(div);
      vxgplayer(calculatedId, {
        url: rtspUrl,
        nmf_path: 'media_player.nmf',
        nmf_src: '../js/vxgplayer-1.8.31/pnacl/Release/media_player.nmf',
        latency: 300000,
        aspect_ratio_mode: 1,
        autohide: 3,
        controls: true,
        connection_timeout: 5000,
        connection_udp: 0,
        custom_digital_zoom: false
      }).ready(function () {
        console.log(' =>ready player ' + calculatedId);
        player = vxgplayer;
        vxgplayer(calculatedId).src(rtspUrl);
        vxgplayer(calculatedId).play();
        console.log(' <=ready player ' + calculatedId);
      });
    }

    ctrl.$onInit = function () {
      if ($stateParams.rtspUrl) {
        createPlayer($stateParams.rtspUrl)
      } else {
        alert('URL is missing');
        $state.go('list');
      }
    }
  }])
