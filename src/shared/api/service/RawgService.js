import http from '../RawgApi'

const searchForGame = (userSearch) => {
    return http.get(`/${userSearch}`)
}

export default {
    searchForGame
}