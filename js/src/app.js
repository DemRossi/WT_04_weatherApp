class Weather{
    constructor(API_KEY){
        this.API_KEY = API_KEY;
        this.initialize();
    }

    initialize(){
      // console.log(navigator); 
       this.getMyLocation();
    }
    getMyLocation(){
        //console.log('getting location');
        navigator.geolocation.getCurrentPosition(position =>{
            // it's working
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            this.getWeather(lat, lng);
        }, err =>{
            // it isn't working
            console.log(err);
        });
    }
    getWeather(lat, lng){
        //console.log('getting weather');
        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${this.API_KEY}/${lat},${lng}?units=si`;
        fetch(url)
        .then(response =>{
            return response.json();
        })
        .then(json =>{
            //console.log(json);
            let temp = document.createElement("h1");
            let text = json.currently.summary;
            temp.innerHTML = text;
            let picture = new Picture();
            picture.getBGI(text);
            //console.log(text);
            document.querySelector('body').appendChild(temp);
        });
    }
}
class Picture{
    constructor(){
        this.initialize();
    }
    initialize(){
        //console.log(navigator);
    }
    getBGI(text){
        let url = `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/2697105-3d0b707c57c84fb46088ddcb9&q=${text}+weather&image_type=phot&orientation=horizontal&category=nature`;
        fetch(url)
        .then(response =>{
            return response.json();
        })
        .then(json=>{
            console.log(json);
        })
    }
}
let app = new Weather('f78383124c36094464720fe3b57cd3e2');
//let picture = new Picture();