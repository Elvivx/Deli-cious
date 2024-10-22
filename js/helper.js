import { TIMEOUT_SEC } from "./config"

async function Json(url){
    try {
        let get =  fetch(url)
        let res = await Promise.race([get, timeout(TIMEOUT_SEC)])
        let data = await res.json()
        
        if(!res.ok) throw new Error(`${data.message} `)
        
        return data
        
    } catch (error) {
        console.log(error)
        // throw error
        throw Error('unable to get recipe')

    }
}

function display_show(show){
    show.style.display = 'block'
}
function display_none(hide){
    hide.style.display = 'none'
}

function timeout (sec){
    return new Promise((_,reject)=>{
        setTimeout(() => {
            reject(new Error('Took too long to load recipe'))
        }, sec * 1000);
    })
}
export { Json as getJson, display_show, display_none}