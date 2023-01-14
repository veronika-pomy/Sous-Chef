const searchBtn = document.querySelector(".search-btn")
const searchEl = document.querySelector(".starter")
const searchedItem = document.querySelector(".search-this")
const mainContentEl = document.querySelector(".main-content")
const videoDisplayEl = document.querySelector(".video-display")
const nutritionDisplayEl = document.querySelector(".nutrition-display")
const closeBtn = document.querySelector(".close-btn")
const errorMess = document.querySelector(".error-message")
const recipeHistoryEl = document.querySelector(".search-history")
const refreshBtn = document.querySelector(".refresh-btn")




window.onload = function() {
    var elements = 
    document.getElementsByClassName("logo")
    for (var i = 0; i < elements.length; i++){
    elements[i].style.color =
    getRandomColor();
    }
};

function getRandomColor() {
    var letters = "012345789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
            // .then(data => this.searchFood1(data))
            .then(data => {
                this.searchRecipe(data)
                this.searchFood1(data)})
            .catch(err =>  
                {if (err){
                errorMess.classList.remove("hide");
                }
                console.error(err)
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

       getItems (name);
    },
    
    search: function (input) {

        if (input) {
            this.searchFood(input);
            this.searchYoutubeRecipe(input);
        } else {
            input = document.querySelector(".search-this").value;
            this.searchFood(input);
            this.searchYoutubeRecipe(input);
        };

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
 
closeBtn.addEventListener("click", mainMenu)

function mainMenu() {
    errorMess.classList.add("hide");
}

// empty local storage and get rid of history buttons
refreshBtn.addEventListener("click", function ( ) {
    localStorage.setItem("foodSearch","");
});



function getItems (name) {

        var localStorageContents = localStorage.getItem("foodSearch");


            var recipeSearchArr = [];
            // pull anything saved in local storage into the array first 
            if (localStorageContents) {
                var savedRecipe = JSON.parse(localStorage.getItem("foodSearch"));
                var recipiesToRender = JSON.parse(localStorageContents);
                console.log(savedRecipe)
                if (savedRecipe) {
                    recipeSearchArr = savedRecipe;
                };
            };
    
            if (recipeSearchArr.length <= 9) {
                if(recipeSearchArr.indexOf(name) !== -1) {
                }
                 else {
                recipeSearchArr.push(name);
                localStorage.setItem("foodSearch",JSON.stringify(recipeSearchArr));}
                 };

                };


// render local storage history as buttons 
function renderStorage ( ) {
    var checkStorage = localStorage.getItem("foodSearch");


    
    if (checkStorage) {
        
        checkStorage = JSON.parse(checkStorage);
        
        for (var i = 0; i < checkStorage.length; i++) {
            var newBtn = document.createElement('button');
            newBtn.textContent = checkStorage[i];
            newBtn.setAttribute("class","history-btn");
            recipeHistoryEl.appendChild(newBtn);
        };

    };

};

renderStorage ( );

// capture clicks on history buttons and search by btn txt
recipeHistoryEl.addEventListener("click", function (event) {

    if (event.target.matches("button") && event.target.matches(".history-btn")) {
        var searchedFood = event.target.textContent;
        dish.search(searchedFood);
    };
    
});
