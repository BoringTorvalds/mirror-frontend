export const MAX_THREAD_NUMBER = 30;
export const HN_API_URL = 'https://hacker-news.firebaseio.com/v0/'; 
export const PAGE_SIZE = 5;
//export const OPENFACE_SOCKET_ADDRESS ="ws://192.168.99.100:9000";
//export const EVENT_SERVER_SOCKET_ADDRESS = "ws://192.168.99.100:9001/ws";
// export const OPENFACE_SOCKET_ADDRESS= process.env.NODE_ENV == 'development' ? "ws://52.42.211.186:9000" : "ws://192.168.99.100:9000";
export const EVENT_SERVER_SOCKET_ADDRESS = "ws://184.73.147.177:9001/ws";
//export const EVENT_SERVER_SOCKET_ADDRESS = "ws://localhost:9001/ws";
export const OPENFACE_SOCKET_ADDRESS = "ws://184.73.147.177:9000";
export const WEATHER_API_ENDPOINT = "https://api.darksky.net/forecast/9e1bfc49cdc03b377f4d00753ff13ada/";
export const DEFAULT_LAT = "32.7357";
export const DEFAULT_LNG = "-97.1081";
export const IS_VIDEO_STREAM = process.env.NODE_ENV == "development" ? true : false;
export const GOOGLE_MAP_API="https://maps.googleapis.com/maps/api/geocode/json?address="
