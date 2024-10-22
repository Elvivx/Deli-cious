import {mapListRecipes,mapBookmark} from './mapperFunction' 
import {recipeBtn} from './clickFuntions'
import {fullRecipe, getRecipes} from './asyncFunctions'
import { getBookmarkedEL } from './localStorage'

const searchInput = document.querySelector('#search')
const searchBtn = document.querySelector('#submit')

searchBtn.onclick = async (e) =>{
    e.preventDefault()
    if(searchInput.value == '') return 
    
    await getRecipes(searchInput.value)
    mapListRecipes(1)
    let searchedRecipes =  document.querySelectorAll('.results .recipe')
    cc(searchedRecipes)
    searchInput.value = ''
}


function cc(list){
    recipeBtn(list)
}

window.onload = ()=>{
    mapBookmark(getBookmarkedEL())
    if(!window.location.hash) return
    fullRecipe()
}

window.onhashchange = ()=>{
    if(!window.location.hash) return
    fullRecipe()
}

export {cc}