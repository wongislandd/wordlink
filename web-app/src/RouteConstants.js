// Adjust this if testing locally
const USE_PROD_OVERRIDE = true 

const USING_LOCAL_SERVER = process.env.NODE_ENV === "development" && !USE_PROD_OVERRIDE
const USING_HTTP = process.env.NODE_ENV === "development" && !USE_PROD_OVERRIDE

const REMOTE_BASE_URL = "wordlink.azurewebsites.net"
const LOCAL_BASE_URL = "localhost:8080"
const SCHEMA = USING_HTTP ? "http://" : "https://"
const USED_URL = USING_LOCAL_SERVER ? LOCAL_BASE_URL : REMOTE_BASE_URL
const BASE_URL = SCHEMA + USED_URL
const GUESS_API_ROUTE = BASE_URL + "/guess"
const GET_GAME_IDS_ROUTE = BASE_URL + "/games" 
const GET_GAME_DETAILS_ROUTE = BASE_URL + "/games/details"
const GET_HINT_ROUTE = BASE_URL + "/hint"
export { GUESS_API_ROUTE, GET_GAME_IDS_ROUTE, GET_GAME_DETAILS_ROUTE, GET_HINT_ROUTE }