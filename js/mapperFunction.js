import { fullResponse } from "./asyncFunctions";
import { pagination } from "./pagination";
import { bookmarkedEl, click } from "./clickFuntions";
import { display_none, display_show } from "./helper";

function mapSearchedRecipies(p){
    const results = document.querySelector('.recipes .results')
    results.innerHTML = ''
    
    let page = pagination(p)
    
    page.forEach(recipe => {
        
        results.innerHTML += `
        <li class="recipe" data-id="${recipe.id}">
            <a href="#${recipe.id}">
                <figure>
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div>
                    <h3>${recipe.title}</h3>
                    <p>${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `
    });
    // console.log(res)
}

function mapFullRecipe(){
    const displayFullRecipe = document.querySelector('.instruction .fullRecipe')
    displayFullRecipe.innerHTML = ''
    
    let res = [fullResponse]

    let ingredients = ''

    res[0].ingredients.map((i)=>{
        ingredients+=
            `<li class="ingredient">
                <?xml version="1.0" ?><svg class="feather feather-check" fill="none" height="24"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                viewBox="0 0 24 24" width="24" xmlns="http:wwww3.org/2000/svg">
                <polyline points="20 6 9 17 4 12" />
                </svg>
                ${i.quantity == null ? '' : i.quantity  } ${i.unit == '' ? '' : i.unit} ${i.description}
                </li>`
    })

    res.map((r)=>{

        displayFullRecipe.innerHTML = `
            <div class="top">
                        <div class="loader"></div>
                        <figure>
                            <img src="${r.image_url}" alt="#">
                        </figure>
                        <div class="title">
                        <h1>
                            ${r.title}
                        </h1>
                        </div>
                    </div>
    
                    <div class="infos">
                        <div class="left">
                            <div class="time">
                                <?xml version="1.0" ?><svg class="feather feather-clock" fill="none" height="24"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span class="bold">
                                    <b>${r.cooking_time}</b>
                                </span>
                                <span>minutes</span>
                            </div>
                            <div class="servings">
                                <?xml version="1.0" ?><svg class="feather feather-user-plus" fill="none" height="24"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <line x1="20" x2="20" y1="8" y2="14" />
                                    <line x1="23" x2="17" y1="11" y2="11" />
                                </svg>
                                <span class="bold">
                                    <b class="people" >${r.servings}</b>
                                </span>
                                <span>servings</span>
                                <div class="servingBtn">
                                    <button class="minus">
                                        <?xml version="1.0" ?><svg class="feather feather-minus-circle" fill="none"
                                            height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" viewBox="0 0 24 24" width="24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="8" x2="16" y1="12" y2="12" />
                                        </svg>
                                    </button>
                                    <button class="plus">
                                        <?xml version="1.0" ?><svg class="feather feather-plus-circle" fill="none"
                                            height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" viewBox="0 0 24 24" width="24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" x2="12" y1="8" y2="16" />
                                            <line x1="8" x2="16" y1="12" y2="12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="bookmark">
                            <svg class="feather feather-bookmark" fill="none" height="24" stroke="currentColor"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                width="30" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                    </div>
    
                    <div class="ingredients">
                        <h1>recipe ingredients</h1>
                        <ul>
                            ${ingredients}
                        </ul>
                    </div>
    
                    <div class="how-to-cook">
                        <h1>how to cook</h1>
                        <p>This recipe was carefully designed and tested by
                            <span class="how-to-title bold">
                                ${r.publisher}
                            </span> Please check out directions at their website.
                        </p>
                        <button>
                            <a href="${r.source_url}" target="blank">
                                Get Steps...
                            </a>
                        </button>
                    </div>
        `
    })

    click()
}

function mapBookmark(save){
    const bookmark = document.querySelector('.bookmark .list')
    if(save){

        bookmark.innerHTML = ''
        save.forEach((book)=>{
            bookmark.innerHTML += book
        })
        if(save.length < 1){
            display_show(document.querySelector('.bookmark h2'))
            display_none(document.querySelector('.clear'))
        }else{
            display_show(document.querySelector('.clear'))
            display_none(document.querySelector('.bookmark h2'))
            console.log(document.querySelector('.clear'))
        }
    }else{
        bookmark.innerHTML = ''
        bookmarkedEl.forEach((book)=>{
            bookmark.innerHTML += book
        })
        if(bookmarkedEl.length < 1){
            display_none(document.querySelector('.clear'))
            display_show(document.querySelector('.bookmark h2'))
        }else{
            display_none(document.querySelector('.bookmark h2'))
            display_show(document.querySelector('.clear'))
        }
    }

}

export {mapSearchedRecipies as mapListRecipes, mapFullRecipe , mapBookmark}