const searcheBtn = document.querySelector(".searchBtn")
const searchEl = document.querySelector(".starter")
const searchedItem = document.querySelector(".searchThis")
const mainContentEl = document.querySelector(".mainContent")
const videoDisplayEl = document.querySelector(".videoDisplay")
const nutritionDisplayEl = document.querySelector(".nutritionDisplay")

searcheBtn.addEventListener("click", searchRecipe)

function searchRecipe() {
    if (searchedItem) {
    searchEl.classList.add("hide");
    videoDisplayEl.classList.remove("hide");
    nutritionDisplayEl.classList.remove("hide");
    }
    else { 
        return
    }
}

// search: function () {
//     this.fetchWeather(document.querySelector(".searchBar").value);
//  }

// let weather =  {
//     apiKey: "c1997b3305d29a5d4309def698b8fa53",
//     fetchWeather: function (city) {
//        fetch(
//        "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + this.apiKey)
//        .then((response) => response.json())
//        .then((data) => {
//            this.displayWeather(data)

//        });
//     },
//     displayWeather: function(data){
//        let {name} = data.city;
//        let {icon, description} = data.list[0].weather[0];
//        let {temp, humidity} = data.list[0].main;
//        let {speed} = data.list[0].wind;
//        console.log (name,icon,description,temp,humidity,speed);
//        document.querySelector(".city").innerText = "Weather in " + name;
//        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png"
//        document.querySelector(".description").innerText = description;
//        document.querySelector(".temp").innerText = temp + "°F";
//        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
//        document.querySelector(".wind").innerText = "Wind speed: " + speed + " MPH";
//        document.body.style.backgroundImage = "url('https://source.unsplash.com/2000x1100/?" + name + "')";
//     },

//     search: function () {
//        this.fetchWeather(document.querySelector(".searchBar").value);
//     }
// };