import { mapFullRecipe } from "./mapperFunction"
import { API_URL } from "./config"
import { getJson , display_none , display_show} from './helper'
import { setCurPage } from "./pagination"


// Get reecipes from search
let respone = []
async function getRecipes(recipe){
    const load = document.querySelector('.recipes .loader')
    const info =  document.querySelector('.recipes .info')
    const rep = document.querySelector('.recipes .results')
    try {
        
        display_show(load)
        display_none(info)
        display_none(rep)
        let res = await getJson(`${API_URL}?search=${recipe}`)
        
        if(res.data.recipes.length === 0) throw new Error('could not find that recipe. please try another...')
        display_none(load)
        display_show(rep)
        respone = res

        setCurPage(1) // mutating and setting the curPage value to 1 on new request

        return res
    } catch (error) {
            
        info.children[0].children[1].textContent = error.message
        display_show(info.childNodes[1].childNodes[1])
        display_none(load)
        display_show(info)
        console.log(error)
    }
}

// Get full recipe details
let fullResponse = []
async function fullRecipe(){
    let id = window.location.hash.slice(1)
    const load = document.querySelector('.instruction .loader')
    const info = document.querySelector('.instruction .info')
    const rep = document.querySelector('.instruction .fullRecipe')
    try {   
        
        display_show(load)
        display_none(info)
        display_none(rep)
        let res = await getJson(`${API_URL}/${id}`)
        display_show(rep)
        display_none(load)

        let  {recipe} = res.data
        fullResponse = recipe
        mapFullRecipe()
    } catch (error) {
        
        display_none(load)
        display_show(info)
        display_show(info.childNodes[1].childNodes[1])
        info.childNodes[1].childNodes[3].textContent = error.message 
        display_none(rep)
        console.log(error)
    }

}

export {getRecipes , fullRecipe ,respone , fullResponse}
