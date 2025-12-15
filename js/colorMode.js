const colorToggle = document.getElementById("toggle-color-mode")
const toggleText = document.querySelector(".mode")
const html = document.documentElement

function getTheme(){
    return html.getAttribute("data-theme") || (window.matchMedia("prefers-color-scheme: dark").matches ? "dark" : "light")
}

function setTheme(theme){
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
    updateToggleText(theme)
}

function updateToggleText(theme){
    const modeIcons = document.getElementsByClassName("mode-icon")
    
    toggleText.textContent = theme === "dark" ? "Light" : "Dark"
    if(theme === "dark"){
        modeIcons[0].classList.remove("hidden")
        modeIcons[1].classList.add("hidden")
    }
    else{
        modeIcons[0].classList.add("hidden")
        modeIcons[1].classList.remove("hidden")
    }
}
updateToggleText(getTheme())

colorToggle.addEventListener("click", ()=>{
    const current = getTheme()
    setTheme(current === "dark" ? "light" : "dark")
})

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e)=>{
    if(!localStorage.getItem("theme")){
        setTheme(e.matches ? "dark" : dark)
    }
})