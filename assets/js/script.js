const searchBtn = document.querySelector(".search-btn")
const searchEl = document.querySelector(".starter")
const searchedItem = document.querySelector(".search-this")
const mainContentEl = document.querySelector(".main-content")
const videoDisplayEl = document.querySelector(".video-display")
const nutritionDisplayEl = document.querySelector(".nutrition-display")
const closeBtn = document.querySelector(".close-btn")
const errorMess = document.querySelector(".error-message")





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
            // .then(data => this.searchFood1(data))
            .then(data => {
                this.searchRecipe(data)
                this.searchFood1(data)})
            .catch(err =>  
                {if (err){
                errorMess.classList.remove("hide");
                }
                console.log (err)
            } 
            ) 
            

            
                    
    },
    searchRecipe: function(data) {
        // throw new Error("no data")
        
        console.log (data)
       
            if (data.items.length > 0){
            searchEl.classList.add("hide");
            videoDisplayEl.classList.remove("hide");
            nutritionDisplayEl.classList.remove("hide");
            }
        
       
    },

    searchFood1: function(data){
        
        console.log(data)
        let {calories, fat_total_g, sugar_g, fiber_g, cholesterol_mg, sodium_mg, protein_g, carbohydrates_total_g,name} = data.items[0];
        console.log (calories,fat_total_g,sugar_g,fiber_g,cholesterol_mg,sodium_mg,protein_g,carbohydrates_total_g,name);
        
        // use to store food in localStorage 
        var recipeSearchArr = [];
        // pull anything saved in local storage into the array first 
        var savedRecipe = JSON.parse(localStorage.getItem("foodSearch"));
        if (savedRecipe) {
            recipeSearchArr = savedRecipe;
        };
        // save searched food name in local storage 
        // Note: limit the number of searches??? 
        // Note: create a button to delete search history ??? 
        recipeSearchArr.push(name);
        localStorage.setItem("foodSearch",JSON.stringify(recipeSearchArr));
    
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
   
  

})

document.querySelector(".search-this").addEventListener("keyup", function (event) {
   if(event.key == "Enter"){
       dish.search();
       
        

   }


})

// render saved foods on page from local storage
var recipiesToRender = JSON.parse(localStorage.getItem("foodSearch"));
console.log(recipiesToRender);

if (recipiesToRender) {
    // may not need the header 
    var historyHeader = document.createElement('h3');
    historyHeader.textContent = "Previously Searched";
    historyHeader.setAttribute("class", "history-header");
    // recipeHistoryEl.appendChild(historyHeader);
    // for (var i = 0; i < recipiesToRender.length; i++) {
    //     var newBtn = document.createElement('button');
    //     newBtn.textContent = recipiesToRender[i];
    //     recipeHistoryEl.appendChild(newBtn);
    // };
};




closeBtn.addEventListener("click", mainMenu)

function mainMenu() {
    errorMess.classList.add("hide");
}


colorChange()

const textColorList = ['#000000', '#ffffff', '#00ff00', '#ff0000'];

function colorChange() {
    
  var randomNumber = Math.floor(Math.random()*bgcolorlist.length)
  $('.logo').css({         
    color: textColorList[randomNumber]
  });
};

  