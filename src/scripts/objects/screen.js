const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="foto do perfil" />
                                        <div class="data"> 
                                        <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                                        <p>${user.bio ?? 'Não possui bio cadastrada'}</p>
                                        <p>Seguidores:${user.seguidores ?? 'Não possui seguidores'}</p>
                                        <p>Seguindo:${user.seguindo ?? 'Não possui seguidores'}</p>
                                        </div>
                                      </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens +=`<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositóries</h2>
                                            <ul>${repositoriesItens}</ul>
                                          <div>`
                                            
        }


    },
    renderNotfound(){
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    }
}
export { screen }