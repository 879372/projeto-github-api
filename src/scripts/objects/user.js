const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    seguidores: '',
    seguindo: '',
    repositories: [],
    setInfo(gitHubUser) {
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.seguidores = gitHubUser.followers
        this.seguindo = gitHubUser.following
        this.userName = gitHubUser.login
    },
    setRepositories(repositories) {
        this.repositories = repositories
    }
}


export { user }