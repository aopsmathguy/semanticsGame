import { SocketConfig } from "./socketUtility.js"
export const CONFIG = new SocketConfig({
    packetSchemas : {
        //client to server events
        
        "make-guess" : {
            "guess" : "string"
        },
        //server to client events
        "hints" : {
            "guesses" : [
                {
                    "guess" : "string",
                    "sim" : "float32"
                }
            ]
        },
        "score-guess" : {
            "guess" : "string",
            "sim" : "float32"
        }
    },
    heartBeatInterval : 10000,
    keepAliveTimeout : 20000
});