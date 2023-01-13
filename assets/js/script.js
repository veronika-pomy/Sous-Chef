const searchBtn = document.querySelector(".searchBtn")
const searchEl = document.querySelector(".starter")
const searchedItem = document.querySelector(".searchThis")
const mainContentEl = document.querySelector(".mainContent")
const videoDisplayEl = document.querySelector(".videoDisplay")
const nutritionDisplayEl = document.querySelector(".nutritionDisplay")

searchBtn.addEventListener("click", searchRecipe)

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

const Youtube = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'AIzaSyDkobBjk39NViI1hM7ZWwBje3BeJBi627M',
		'X-RapidAPI-Host': 'https://youtube.googleapis.com'
  }
};

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '79d6a5e727msh4c739eb4b0e22c1p1c7020jsnf8e17fbbc2ac',
		'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
	}
};

// https://cors-anywhere.herokuapp.com/

let dish =  {
    // apiKey: "79d6a5e727msh4c739eb4b0e22c1p1c7020jsnf8e17fbbc2ac",
    searchFood: function (food) {
       fetch(
       "https://calorieninjas.p.rapidapi.com/v1/nutrition?query=" + food + "&units=imperial", options)
    //    .then((response) => {
    //     return 
    //     response.json()})
    //    .then((data) => {
    //        this.searchFood1(data)
    //        console.log(data)

           .then(response => response.json())
            // .then(response => console.log(response))
            .then(data => this.searchFood1(data))
            .catch(err => console.error(err));
       
    },
    searchYoutubeRecipe: function (food) {
    
    fetch(
      'https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyDkobBjk39NViI1hM7ZWwBje3BeJBi627M&part=snippet&maxResults=1&q=' + food + " recipe")
      .then(response => response.json())
      .then(data => this.searchByKeyword(data))
      .catch(err => console.error(err));
    },
    searchByKeyword: function (data) {
      console.log(data)
      let {videoId} = data.items[0].id
       console.log(videoId)
       document.querySelector(".video").src= "https://www.youtube.com/embed/" + videoId
},

    searchFood1: function(data){
        console.log(data)
       let {calories, fat_total_g, sugar_g, fiber_g, cholesterol_mg, sodium_mg, protein_g, carbohydrates_total_g,name} = data.items[0];
       
       console.log (calories,fat_total_g,sugar_g,fiber_g,cholesterol_mg,sodium_mg,protein_g,carbohydrates_total_g,name);
       document.querySelector(".dish").innerText = name;
       document.querySelector(".calories").innerText = "Calories: " + calories;
       document.querySelector(".fat").innerText = "Fat: " + fat_total_g + "g";
       document.querySelector(".cholesterol").innerText = "Cholesterol: " + cholesterol_mg + "mg";
       document.querySelector(".carbohydrates").innerText = "Carbohydrates: " + carbohydrates_total_g + "mg";
       document.querySelector(".protein").innerText = "Protein: " + protein_g + "g";
       document.querySelector(".sodium").innerText = "Sodium: " + sodium_mg + "mg";
       document.querySelector(".sugar").innerText = "Sugar: " + sugar_g + "g";
       document.querySelector(".fiber").innerText = "Fiber: " + fiber_g + " g";
    },
    
    search: function () {
       this.searchFood(document.querySelector(".searchThis").value);
       this.searchYoutubeRecipe(document.querySelector(".searchThis").value);
    }
};

document.querySelector(".searchBtn").addEventListener("click", function () {
   dish.search();
   searchRecipe()
  

})

document.querySelector(".searchThis").addEventListener("keyup", function (event) {
   if(event.key == "Enter"){
       dish.search();
       searchRecipe()
        

   }


})
 

  let recipe = {
    searchYoutubeRecipe: function (food) {
    
    fetch(
      'https://youtube.googleapis.com/youtube/v3/search?part=q=' + food + " recipe", Youtube)
      .then(response => response.json())
      .then(data => this.searchByKeyword(data))
      .catch(err => console.error(err));
    },
    searchByKeyword: function (data) {
      console.log(data)
  var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 25});
  for(var i in results.items) {
    var item = results.items[i];
    Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
  }
}
  }




