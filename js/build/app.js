'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Weather = function () {
    function Weather(API_KEY) {
        _classCallCheck(this, Weather);

        this.API_KEY = API_KEY;
        this.initialize();
    }

    _createClass(Weather, [{
        key: 'initialize',
        value: function initialize() {
            // console.log(navigator); 
            this.getMyLocation();
        }
    }, {
        key: 'getMyLocation',
        value: function getMyLocation() {
            var _this = this;

            //console.log('getting location');
            navigator.geolocation.getCurrentPosition(function (position) {
                // it's working
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                _this.getWeather(lat, lng);
            }, function (err) {
                // it isn't working
                console.log(err);
            });
        }
    }, {
        key: 'getWeather',
        value: function getWeather(lat, lng) {
            //console.log('getting weather');
            var url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + this.API_KEY + '/' + lat + ',' + lng + '?units=si';
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (json) {
                //console.log(json);
                var temp = document.createElement("h1");
                temp.innerHTML = json.currently.summary;
                document.querySelector('body').appendChild(temp);
            });
        }
    }]);

    return Weather;
}();

var app = new Weather('f78383124c36094464720fe3b57cd3e2');

//# sourceMappingURL=app.js.map