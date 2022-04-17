document.addEventListener("DOMContentLoaded", () => {
    const usersList = document.getElementById("user-list")
    const repoList = document.getElementById("repos-list")
    const searchForm = document.getElementById("github-form")

    fetch("https://api.github.com/users")
    .then(response => response.json())
    .then(data => data.forEach(element => {
        // console.log(element)
            createDom(element, usersList)
    }))

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const userInput = e.target.search.value
        usersList.innerHTML = ''
        handleSearch(userInput)
    })

    function handleSearch(input){
        fetch(`https://api.github.com/search/users?q=${input}`)
        .then(response => response.json())
        .then(data => {
            (data.items).forEach(item => {
                createDom(item, usersList)
            })
        }
        )
    }

    function handleRepos(profile) {
        fetch(`https://api.github.com/users/${profile}/repos`)
        .then(response => response.json())
        .then(data => {
            if(data.length == 0) {
                let text = document.createElement("li").innerText = `No repos for ${profile}`
                repoList.append(text)
            }
            let repoTitle = document.createElement("h3")
            repoTitle.innerText = `${profile}'s Repos:`
            repoList.append(repoTitle)
            data.forEach(item => {
                const repoName = item["full_name"].split("/")[1]
                let repoItem = document.createElement("li")
                repoItem.innerText = `${repoName}`
                repoList.append(repoItem)
            })
        })
    }

    function createDom(dataItem, section){
        // console.log(element)
        const item = document.createElement("li")
        // const tag = document.createElement("a").setAttribute("href",`${element.url}`)
        item.innerText = dataItem.login
        section.appendChild(item)

        item.addEventListener("click", function() {
            const profile = this.innerText;
            repoList.innerHTML = ''
            handleRepos(profile)
        })
    }
    
})