const content = document.getElementById("content")
const notFound = document.getElementById("not-found")
const searchForm = document.getElementById("user-search")
const searchInput = document.getElementById("search-input")
const noResultMessage = document.getElementById("no-result")
const url = "https://api.github.com/users"

async function fetchData(username){
    try{
        const res = await fetch(`${url}/${username}`)

        if(!res.ok){
            showNotFound()
            return
        }
        const data = await res.json()
        showFound()
        return renderProfileInfo(data)
    }
    catch(err){
        throw new Error(`Error: ${err}`)
    }
}

function showNotFound(){
    content.classList.add("hidden")
    notFound.classList.remove("hidden")
    noResultMessage.classList.remove("hidden")
}

function showFound(){
    content.classList.remove("hidden")
    notFound.classList.add("hidden")
}

function renderProfileInfo(data){

    const name = document.getElementById("name")
    const username = document.getElementById("username")
    const profileImg = document.getElementById("profile-pic")
    const bio = document.getElementById("bio")
    const joined = document.getElementById("joined")
    const repos = document.getElementById("repos")
    const followers = document.getElementById("followers")
    const following = document.getElementById("following")
    const location = document.getElementById("location")
    const twitter = document.getElementById("twitter")
    const github = document.getElementById("github")
    const company = document.getElementById("company")
    const linkContainers = document.getElementsByClassName("link-container")

    data.name ? name.textContent = data.name : name.textContent = data.login
    username.textContent = `@${data.login}`

    if(data.avatar_url){
        profileImg.src = data.avatar_url
        profileImg.alt = data.login
    } 
    else{
        profileImg.src = "https://avatars.githubusercontent.com/u/583231?v=4"
        profileImg.alt = `No image of ${data.login} available.`
    }

    if(data.bio){
        bio.classList.remove("greyed-out")
        bio.textContent = data.bio
    }
    else{
        bio.classList.add("greyed-out")
        bio.textContent = "This profile has no bio"
    }

    const joinedAt = new Date(data.created_at)
    const dayJoined = joinedAt.getDate()
    const monthJoined = joinedAt.toLocaleString("en-US", {month: "long"})
    const yearJoined = joinedAt.getFullYear()

    joined.textContent = `Joined ${dayJoined} ${monthJoined} ${yearJoined}`

    repos.textContent = data.public_repos
    followers.textContent = data.followers
    following.textContent = data.following

    if(data.location){
        linkContainers[0].classList.remove("greyed-out")
        location.textContent = data.location
    }
    else{
        linkContainers[0].classList.add("greyed-out")
        location.textContent = "Not available"
    }

    if(data.twitter_username){
        linkContainers[1].classList.remove("greyed-out")
        twitter.innerHTML = `<a href="https://x.com/${data.twitter_username}">${data.twitter_username}</a>`
        company.style.cursor = "pointer"
    }
    else{
        linkContainers[1].classList.add("greyed-out")
        twitter.innerHTML = "Not available"
        company.style.cursor = "auto"
    }

    
    github.href = data.url

    if(data.company){
        linkContainers[3].classList.remove("greyed-out")
        company.innerHTML = `
        <a href="https://github.com/${data.company.startsWith("@") ? data.company.substring(1,data.company.length) : data.company}">
          ${!data.company.startsWith ? "@" + data.company : data.company}
        </a>`
        company.style.cursor = "pointer"
    }
    else{
        linkContainers[3].classList.add("greyed-out")
        company.innerHTML = "Not available"
        company.style.cursor = "auto"
    }

    addFocusStyleLinks()
}

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    if(searchInput.value.trim() !== ""){
        fetchData(searchInput.value.trim())
    }
    else{

    }
    searchForm.reset()
})

function addFocusStyleLinks(){
    const links = document.getElementsByTagName("a")

    for(let i = 0; i < links.length; i++){
        links[i].addEventListener("focus", highlight)
        
    }
}

function removeFocusStyleLinks(){
    const links = document.getElementsByTagName("a")

    for(let i=0; i<links.length;i++){
        links[i].addEventListener("blur", removeHightlight)
    }

}

function highlight(e){
    e.target.style.outline = "none"
    e.target.closest("div").style.outline = "2px solid var(--blue-500)"
} 

function removeHightlight(e){
    e.target.closest("div").style.outline = "none"
}

searchInput.addEventListener("input", () =>{
    noResultMessage.classList.add("hidden")
})

addFocusStyleLinks()
removeFocusStyleLinks()