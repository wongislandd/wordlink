
const SCHEMA = "http://"
const REMOTE_BASE_URL = "20.115.73.149"
const LOCAL_BASE_URL = "localhost"
const PORT = ":8080"
const BASE_URL = SCHEMA + LOCAL_BASE_URL + PORT
const GUESS_API_ROUTE = BASE_URL + "/guess"
const GET_GAME_IDS_ROUTE = BASE_URL + "/games" 
export { GUESS_API_ROUTE, GET_GAME_IDS_ROUTE }