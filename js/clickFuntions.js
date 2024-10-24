import { mapFullRecipe, mapBookmark, mapListRecipes } from './mapperFunction'
import { fullResponse, getRecipes } from './asyncFunctions'
import { display_none, display_show } from './helper'
import { bookmarkedEL, bookmarkedID, curEL, getBookmarkedEL, getBookmarkedID , getCurEL, clear} from './localStorage'

// initial variables
let curEl 
let bookmarkedId = []
let bookmarkedEl = []

// getting saved from local storage and setting as initial values
if(getCurEL()){
    curEl = getCurEL()
}
if(getBookmarkedEL()){
    getBookmarkedEL().forEach((el)=> bookmarkedEl.push(el))
}
if(getBookmarkedID()){
    getBookmarkedID().forEach((id)=> bookmarkedId.push(id))
}

// search function
const searchInput = document.querySelector('#search')
const searchBtn = document.querySelector('#submit')
searchBtn.onclick = async (e) =>{
    e.preventDefault()
    if(searchInput.value == '') return 
    
    await getRecipes(searchInput.value)
    mapListRecipes(1)
    let searchedRecipes =  document.querySelectorAll('.results .recipe') //getting it here cause it can only be accessed after the mapListRecipe  function 
    recipeBtn(searchedRecipes)
    searchInput.value = ''
}

// functions for click functionalities
function recipeBtn(recipe){
    recipe.forEach((btn)=>{
        btn.onclick = (e) =>{
            curEl = e.currentTarget.outerHTML
            curEL(curEl)
        }
    })
}
function bookmarkRecipe(){
    const bookmarkdRecipe = document.querySelector('.instruction .infos .bookmark')
    const resu = document.querySelector('.results')
    bookmarkedId.forEach((id)=>{
        if(id == fullResponse.id){
            bookmarkdRecipe.childNodes[1].setAttribute('fill', 'white')
            fullResponse.bookmark = true
        }
    })
    
    bookmarkdRecipe.onclick = () =>{
        console.log(resu.children.length)
        if(resu.children.length !== 0) {

            let att = bookmarkdRecipe.childNodes[1].getAttribute('fill')
    
            // set bookmark icon
            if(att == 'none'){
                bookmarkdRecipe.childNodes[1].setAttribute('fill', 'white')
                fullResponse.bookmark = true
            }
            if(att == 'white'){
                bookmarkdRecipe.childNodes[1].setAttribute('fill', 'none')
                fullResponse.bookmark = false
            }
    
            // set bookmark array
            if(fullResponse.bookmark){
                bookmarkedId.push(fullResponse.id )
                bookmarkedEl.push(curEl)
            }
            if(!fullResponse.bookmark){
                let index = bookmarkedId.findIndex((id)=> id == fullResponse.id)
                bookmarkedId.splice(index, 1)
                bookmarkedEl.splice(index, 1) 
            }
    
            // localStorage saver function call
            bookmarkedEL(bookmarkedEl)
            bookmarkedID(bookmarkedId)
    
            // map booked
            mapBookmark()
        }else alert('Search Recipe First In Order To Bookmark It😁')
        
    }
}
function servings(){
    const plus  = document.querySelector('.instruction .servingBtn .plus')
    const minus  = document.querySelector('.instruction .servingBtn .minus')
    const people  = document.querySelector('.instruction .bold .people')

    let peoVal = Number(people.textContent)

    plus.onclick = () =>{
        peoVal++
        people.textContent = peoVal
       updateServings(peoVal)
       mapFullRecipe()
    }
    minus.onclick = () =>{
        if(peoVal === 1) return
        peoVal --
        people.textContent = peoVal
        updateServings(peoVal)
        mapFullRecipe()
    }
}
function updateServings(newQuantity) {
    fullResponse.ingredients.forEach((i)=>{

        if(i.quantity == null) return 
    
        (i.quantity = (i.quantity * newQuantity) / fullResponse.servings )

    } )
    fullResponse.servings = newQuantity
}
function bookmarkedRecipeList(){
    const save = document.querySelectorAll('.bookmarked ul li')
    save.forEach((btn)=>{
        btn.onclick = ()=>{
            bookmarkRecipe()
        }
    })
}
let clearBtn = document.querySelector('.clear')
clearBtn.onclick = ()=> {
    document.querySelector('.bookmark .list').innerHTML = ''
    clear()
    display_none(document.querySelector('.clear'))
    display_show(document.querySelector('.bookmark h2'))
    console.log(bookmarkedEl = [])
    console.log(bookmarkedId = [])
    console.log(curEl = '')
}

// animation for showing bookmarks
const books = document.querySelector('.bookmark')
const animate = ()=>{
    books.childNodes[3].classList.toggle('show-bookmarked')
    if(books.childNodes[3].classList.contains('show-bookmarked')){
        books.classList.add('animate__bounceIn')
    }else{
        books.classList.remove('animate__bounceIn')
    }
}
books.onclick = ()=>{
    animate()
    // books.onblur = () =>{
    //     animate()
    //     console.log(books.childNodes[3])
    // }
}

// animations for adding recipes
const addRecipe = document.querySelector('.add-recipes')
const modal = document.querySelector('.adding-recipe-modal')
const closeModal = document.querySelector('.btn--close-modal')
addRecipe.onclick = ()=>{
    modal.classList.add('show')
}
closeModal.onclick = ()=>{
    modal.classList.remove('show')
}

function click(){
    bookmarkedRecipeList()
    servings()
    bookmarkRecipe()
}
export {recipeBtn , bookmarkRecipe, click , bookmarkedEl} 