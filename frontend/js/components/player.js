angular.module("app")
  .component('playerComponent', {
    templateUrl: "../views/player.html",
    controller: "playerCtrl"

  })
  .controller('playerCtrl', ['$http', '$stateParams', function ($http, $stateParams) {
    var ctrl = this;
    var indexPlayer = 0;
    function createPlayer(rtspUrl){
        indexPlayer++;
        var playerId = 'vxg_media_player' + indexPlayer;
        var div = document.createElement('div');
        div.setAttribute("id", playerId);
        div.setAttribute("class", "vxgplayer");
        var runtimePlayers = document.getElementById('dynamicallyPlayers');
        runtimePlayers.appendChild(div);
        vxgplayer(playerId, {
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
        }).ready(function(){
            console.log(' =>ready player '+playerId);
            vxgplayer(playerId).src(rtspUrl);
            vxgplayer(playerId).play();
            console.log(' <=ready player '+playerId);
        });
    }

    ctrl.$onInit = function () {
        if ($stateParams.rtspUrl) {
            createPlayer('rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov')
        }
        else {
            alert('URL is missing')
        }
    }
  }])
