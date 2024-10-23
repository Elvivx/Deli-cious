import { mapBookmark } from './mapperFunction' 
import { fullRecipe } from './asyncFunctions'
import { getBookmarkedEL } from './localStorage'
import 'animate.css'

window.onload = ()=>{
    mapBookmark(getBookmarkedEL())
    if(!window.location.hash) return
    fullRecipe()
}

window.onhashchange = ()=>{
    if(!window.location.hash) return
    fullRecipe()
}

// let icons = ['/imgs/icons8-cooking-96 (1).png', '/imgs/icons8-cooking-96 (2).png', '/imgs/icons8-cooking-96 (3).png', '/imgs/icons8-cooking-96 (4).png', '/imgs/icons8-cooking-96 (5).png', '/imgs/icons8-cooking-96 (6).png', '/imgs/icons8-cooking-96 .png',]
// const logoImg = document.querySelector('.logo .img')

//  setInterval(() => {
//     logoImg.innerHTML = ''
//     const randomIcon = Math.floor(Math.random() * 7);
//       console.log(randomIcon);
//    logoImg.innerHTML = `
//         <img src="${icons[randomIcon]}" alt="#">
//    `
    
// }, 1000);