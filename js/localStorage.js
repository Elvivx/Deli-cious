// saveer function
function bookmarkedID(file){
    localStorage.setItem('recipeBookmarkedID', JSON.stringify(file))
}
function bookmarkedEL(file){
    localStorage.setItem('recipeBookmarkedEL', JSON.stringify(file))
}
function curEL (file){
    localStorage.setItem('curEL', JSON.stringify(file))
}

// getter function
function getBookmarkedID() {
    let data = localStorage.getItem('recipeBookmarkedID')
    if(data === null || data === '') return
    let store = JSON.parse(data)
    return store
}
function getBookmarkedEL() {
    let data = localStorage.getItem('recipeBookmarkedEL')
    if(data === null || data === '') return 
    let store = JSON.parse(data)
    return store
}
function getCurEL() {
    let data = localStorage.getItem('curEL')
    if(data === null || data === '') return 
    let store = JSON.parse(data)
    return store
}

export {bookmarkedEL, bookmarkedID, curEL, getBookmarkedEL, getBookmarkedID, getCurEL}