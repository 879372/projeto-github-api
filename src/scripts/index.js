import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"
import { getEvents } from "./services/events.js"
import { user} from "./objects/user.js"
import { screen } from "./objects/screen.js"


document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName)) return
    getUserProfile(userName)
    getUserEvents(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        validateEmptyInput(userName)
        getUserProfile(userName)
        getUserEvents(userName)
    }
})

async function getUserProfile(userName) {
    const userResponse = await getUser(userName)
    console.log(userResponse)
    if (userResponse.message === 'Not Found') {
        screen.renderNotfound()
        return
    }
    const repositoriesResponse = await getRepositories(userName)
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    screen.renderUser(user)
}

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

async function getUserEvents(userName) {
    getEvents(userName).then(eventsData => {
        let eventsItens = ""
        eventsData.forEach(events => {
            eventsItens += `<li>${events.repo.name} -${events.type}</li>`
        });
        document.querySelector('.profile-data-event').innerHTML += `<div class="repositories section">
          <h2>Eventos</h2>
          <ul>${eventsItens}</ul>
    <div>`
    })

}

