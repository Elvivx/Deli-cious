import { mapFullRecipe, mapBookmark } from './mapperFunction'
import { fullResponse } from './asyncFunctions'
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

// functions for click functionalities
function recipeBtn(recipe){
    recipe.forEach((btn)=>{
        btn.onclick = (e) =>{
            curEl = e.currentTarget.outerHTML
            console.log(curEl)
            curEL(curEl)
        }
    })
}
function bookmarkRecipe(){
    const bookmarkdRecipe = document.querySelector('.instruction .infos .bookmark')
    bookmarkedId.forEach((id)=>{
        if(id == fullResponse.id){
            bookmarkdRecipe.childNodes[1].setAttribute('fill', 'white')
            fullResponse.bookmark = true
        }
    })
    
    bookmarkdRecipe.onclick = () =>{
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
            index = bookmarkedId.findIndex((id)=> id == fullResponse.id)
            bookmarkedId.splice(index, 1)
            bookmarkedEl.splice(index, 1) 
        }

        // localStorage saver function call
        bookmarkedEL(bookmarkedEl)
        bookmarkedID(bookmarkedId)

        // map booked
        mapBookmark()
    }
}
function servings(){
    const plus  = document.querySelector('.instruction .servingBtn .plus')
    const minus  = document.querySelector('.instruction .servingBtn .minus')
    const people  = document.querySelector('.instruction .bold .people')

    let peoVal = Number(people.textContent)

    plus.onclick = () =>{
        // console.log('plus')
        peoVal++
        people.textContent = peoVal

       updateServings(peoVal)
       mapFullRecipe()
    // console.log(fullResponse)
    console.log(plus)
    }
    minus.onclick = () =>{
        console.log('minus')
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
    clear()
    display_none(document.querySelector('.clear'))
    display_show(document.querySelector('.bookmark h2'))
    document.querySelector('.bookmark .list').innerHTML = ''
}

function click(){
    bookmarkedRecipeList()
    servings()
    bookmarkRecipe()
}

// console.log(curEl)

export {recipeBtn , bookmarkRecipe, click , bookmarkedEl} 
