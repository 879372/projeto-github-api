import { getUser } from "/src/scripts/services/user.js"
import { getRepositories } from "/src/scripts/services/repositories.js"
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"


document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserProfile(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode 
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        validateEmptyInput(userName) 
        getUserProfile(userName)
    }
})

async function getUserProfile(userName){
    const userResponse = await getUser(userName)
    if(userResponse.message === 'Not Found'){
        screen.renderNotfound()
        return 
    }
    const repositoriesResponse = await getRepositories(userName)
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    screen.renderUser(user)
}

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

function getUserRepositories(userName){
    getRepositories(userName).then(reposData => {
        let repositoriesItens = ""
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}">${repo.name}</a></li>`
        });

        document.querySelector('.profile-data').innerHTML +=`
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            <div/>`
    })
}

