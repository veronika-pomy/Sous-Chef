const searchBtn = document.querySelector(".search-btn")
const searchEl = document.querySelector(".starter")
const searchedItem = document.querySelector(".search-this")
const mainContentEl = document.querySelector(".main-content")
const videoDisplayEl = document.querySelector(".video-display")
const nutritionDisplayEl = document.querySelector(".nutrition-display")

searchBtn.addEventListener("click", searchRecipe)

function searchRecipe() {
    let userSearch = document.querySelector(".search-this").value

    if (userSearch == "" || userSearch.length == 0 || userSearch == null) {
        errorMess.classList.remove("hide");
        return
    }
    else if (userSearch !== "" || userSearch.length !== 0 || userSearch !== null) {
        searchEl.classList.add("hide");
        videoDisplayEl.classList.remove("hide");
        nutritionDisplayEl.classList.remove("hide");
    }
    else { 
        return
    }
}



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
       this.searchFood(document.querySelector(".search-this").value);
    }
};

document.querySelector(".search-btn").addEventListener("click", function () {
   dish.search();
   searchRecipe()
  

})

document.querySelector(".search-this").addEventListener("keyup", function (event) {
   if(event.key == "Enter"){
       dish.search();
       searchRecipe()
        

   }


})



var closeBtn = document.querySelector(".close-btn")
var errorMess = document.querySelector(".error-message")

closeBtn.addEventListener("click", mainMenu)

function mainMenu() {
    errorMess.classList.add("hide");
}

  