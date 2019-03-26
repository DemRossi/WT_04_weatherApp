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
            console.log(json);
            let temp = document.createElement("h1");
            let text = json.currently.summary;
            let search = json.currently.icon;
            temp.innerHTML = text;
            let picture = new Picture('2697105-3d0b707c57c84fb46088ddcb9');
            picture.getBGI(search);
            //console.log(text);
            document.querySelector('body').appendChild(temp);
        });
    }
}
class Picture{
    constructor(API_KEY){
        this.initialize();
        this.API_KEY = API_KEY;
    }
    initialize(){
        //console.log(navigator);
    }
    getBGI(search){
        //https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=${this.API_KEY}&q=${search}+weather&image_type=photo&orientation=horizontal&category=nature
        let url = `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=${this.API_KEY}&q=${search}+weather`;
        fetch(url)
        .then(response =>{
            return response.json();
        })
        .then(json=>{
            //console.log(json);
            let ran = Math.floor(Math.random()*json.hits.length);
            let image = json.hits[ran].largeImageURL;
            console.log(image);
            document.body.style.backgroundImage = `url('${image}')`;
            document.body.style.backgroundPosition = "center center";
            document.body.style.backgroundRepeat = "no-repeat";
        })
    }
}
let app = new Weather('f78383124c36094464720fe3b57cd3e2');
//let picture = new Picture();