import { respone } from "./asyncFunctions"
import { PAGES_TO_RENDER  } from "./config"
import { mapListRecipes } from "./mapperFunction"
import { cc } from "./logic"

let totalPages
let curPage = 1
// let getCurPage = ()=> curPage
let setCurPage = (newCurPage) => {curPage = newCurPage} // setup for reassinging value on new request from api


function pagination( curPage ){
    
    let pages = respone.data.recipes
    let start = (curPage - 1) * PAGES_TO_RENDER
    let end = curPage * PAGES_TO_RENDER

    totalPages = Math.ceil(pages.length / PAGES_TO_RENDER)

    let clipped = pages.slice(start, end)

    paginationBtns()

    return clipped
}

function paginationBtns(){
    const nxt = document.querySelector('.pagination .next')
    const pre = document.querySelector('.pagination .prev')
    const pageBtns = document.querySelectorAll('.pagination button')
    nxt.childNodes[1].childNodes[1].childNodes[1].textContent = curPage + 1
    pageBtns.forEach((btn)=>{
        
        btn.onclick = (e)=>{
            e.currentTarget.classList.contains('next') ? next() : prev()
            
            function next(){
              curPage++
            }
            function prev (){
                curPage--
            }
            mapListRecipes(curPage)
            
            let searchedRecipes =  document.querySelectorAll('.results .recipe')
            cc(searchedRecipes) //gives access to the paginated list items for click events
            pre.childNodes[1].childNodes[3].childNodes[1].textContent = curPage - 1
            nxt.childNodes[1].childNodes[1].childNodes[1].textContent = curPage + 1

        }

            
    })

    if(totalPages  === 1 ){
        nxt.classList.remove('show')
        pre.classList.remove('show')
    }
    if(curPage === 1 && totalPages > 1){
        nxt.classList.add('show')
        pre.classList.remove('show')
    }

    if(curPage === totalPages && totalPages > 1){
        pre.classList.add('show')
        nxt.classList.remove('show')
    }

    if(curPage > 1 && curPage < totalPages){
        pre.classList.add('show')
        nxt.classList.add('show')
    }
}

export { pagination , paginationBtns , setCurPage}