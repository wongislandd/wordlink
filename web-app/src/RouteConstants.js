// Adjust this if testing locally
const USING_LOCAL_SERVER = process.env.NODE_ENV === "development"

const REMOTE_BASE_URL = "20.115.73.149"
const LOCAL_BASE_URL = "localhost"
//const SCHEMA = USING_LOCAL_SERVER ? "http://" : "https://"
const SCHEMA = USING_LOCAL_SERVER ? "http://" : "http://"
const USED_URL = USING_LOCAL_SERVER ? LOCAL_BASE_URL : REMOTE_BASE_URL
//const PORT = USING_LOCAL_SERVER ? ":8080" : ":8444"
const PORT = USING_LOCAL_SERVER ? ":8080" : ":8080"
const BASE_URL = SCHEMA + USED_URL + PORT
const GUESS_API_ROUTE = BASE_URL + "/guess"
const GET_GAME_IDS_ROUTE = BASE_URL + "/games" 
const GET_GAME_DETAILS_ROUTE = BASE_URL + "/games/details"
const GET_HINT_ROUTE = BASE_URL + "/hint"
export { GUESS_API_ROUTE, GET_GAME_IDS_ROUTE, GET_GAME_DETAILS_ROUTE, GET_HINT_ROUTE }