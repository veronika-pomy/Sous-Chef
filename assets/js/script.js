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

