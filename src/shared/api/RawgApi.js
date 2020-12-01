import Axios from 'axios'

const RawgApi = Axios.create({
    baseURL: 'https://api.rawg.io/api/games?key=13249e60b9db43ef9b416d516fe73ddb'
})

export default RawgApi