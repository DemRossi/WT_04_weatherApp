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
                console.log(json);
                var temp = document.createElement("h1");
                var text = json.currently.summary;
                temp.innerHTML = text;
                var picture = new Picture('2697105-3d0b707c57c84fb46088ddcb9');
                picture.getBGI(text);
                //console.log(text);
                document.querySelector('body').appendChild(temp);
            });
        }
    }]);

    return Weather;
}();

var Picture = function () {
    function Picture(API_KEY) {
        _classCallCheck(this, Picture);

        this.initialize();
        this.API_KEY = API_KEY;
    }

    _createClass(Picture, [{
        key: 'initialize',
        value: function initialize() {
            //console.log(navigator);
        }
    }, {
        key: 'getBGI',
        value: function getBGI(text) {
            var url = 'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=' + this.API_KEY + '&q=' + text + '+weather&image_type=photo&orientation=horizontal&category=nature';
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (json) {
                //console.log(json);
                var ran = Math.floor(Math.random() * 21);
                var image = json.hits[ran].largeImageURL;
                console.log(image);
                document.body.style.backgroundImage = 'url(\'' + image + '\')';
                document.body.style.backgroundPosition = "center center";
                document.body.style.backgroundRepeat = "no-repeat";
            });
        }
    }]);

    return Picture;
}();

var app = new Weather('f78383124c36094464720fe3b57cd3e2');
//let picture = new Picture();

//# sourceMappingURL=app.js.map