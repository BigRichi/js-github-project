// Accept: application/vnd.github.v3+json
//---------- GLOBAL VARIABLES ----------//

const searchForm = document.querySelector('#github-form')

const userList = document.querySelector('#user-list')
const repoList = document.querySelector('#repos-list')

const gitSearchUsersUrl = 'https://api.github.com/search/users?q='
const gitUserUrl = 'https://api.github.com/users/'

//---------- User Search & Users Display ----------//
searchForm.addEventListener('submit', event =>{
    event.preventDefault()
    const searchValue = searchForm.search.value

    //fetch(gitHubUsersUrl)
    fetch(`${gitSearchUsersUrl}${searchValue}`)
    .then(resp => resp.json())
    .then(users => {
        userList.innerHTML = ''
        repoList.innerHTML = ''

        users.items.forEach(user =>{
            const userLi = document.createElement('li')
            userLi.textContent = user.login
            userList.append(userLi)
        })
        // console.log(users.items)
    })
})

//---------- User Repo Display ----------//
userList.addEventListener('click', event =>{
    if (event.target.matches('li')){
        const userName = event.target.textContent

            userList.innerHTML = ''
            const userLi = document.createElement('li')
            userLi.textContent = userName
            userList.append(userLi)

        fetch(`${gitUserUrl}${userName}/repos`)
        .then(resp => resp.json())
        .then(userRepos => {
            repoList.innerHTML = ''
            userRepos.forEach(userRepo =>{
                const repoLi = document.createElement('li')
                repoLi.innerText = userRepo.name
                repoList.append(repoLi)
            })
        })
    }
})


//"tallesl"