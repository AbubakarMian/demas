import React, { createContext, useState } from "react";
import { Constant } from "../common/Constants";

export const ContextApiContext = React.createContext()

// let guest_user = {
//     id: "0",
//     name: "Guest",
//     access_token: "Basic ZGVtYXMtYXBwLW1vYmlsZTtaR1Z0WVhNdFlYQndMVzF2WW1sc1pRPT0=",
//     role_id: 2,
//     rememberme:false,
//     is_loggedin:false,
// };
let initState = {
    "avalible_languages": [
        {
            "id": '1',
            "name": "English",
            "prefix": "_en"
        },
        {
            "id": '2',
            "name": "Russian",
            "prefix": "_ru"
        }
    ],
    "language": {
        "id": 1,
        "name": "English",
        "prefix": "_en"
    },
    "booking":{
        "type":"single",
        "details":[
            {
                "pickup_id":0,
                "pick_extrainfo":"ticket_number",
                "dropoff_id":0,
                "dropoff_extrainfo":"ticket_number",
                "pickupdate_time":0,
                "comment":0,
                "transport_id":0,
                "transport_type_id":0,
            }
        ]
    },
    // "language":{
    //     "id":'2',
    //     "name":"Russian",
    //     "prefix":"_ru"
    // },
   "show_login_modal":false,
   "show_error":false,
   "error_msg":"",
    "user": localStorage.getItem('user')===null? Constant.guest_user:JSON.parse(localStorage.getItem('user')),
    // "user": {
    //     id: "0",
    //     name: "Guest",
    //     access_token: "Basic cmVlbHNwcm8tYXBwLW1vYmlsZTogY21WbGJITndjbTh0WVhCd0xXMXZZbWxzWlE9PQ==",
    //     role_id: 2,
    // },
}

export const ContexApiProvider = (props) => {


    const [contextState, setContextState] = useState(initState)

    
    const updateContextState = (update_obj, obj_name) => {

        let objContextState = contextState;

        switch (obj_name) {
            case 'language':
                let lang = contextState['avalible_languages'].find((element) => {
                    return element.id === update_obj;
                });
                objContextState[obj_name] = lang;
                setContextState({...contextState,objContextState})
                break;
                case 'update_user':
                    objContextState['user'] = update_obj;
                    if(update_obj.id){
                        update_obj.is_loggedin = true;
                    }
                    else{
                        update_obj.is_loggedin = false;
                    }
                    update_obj.role_id = parseInt(update_obj.role_id);
                    localStorage.setItem('user', JSON.stringify(update_obj));
                    setContextState({...contextState,objContextState})
                break;
                case 'logout_user':
                    objContextState['user'] = Constant.guest_user;
                    localStorage.setItem('user', JSON.stringify(Constant.guest_user));
                    setContextState({...contextState,objContextState})
                break;

            default:
                objContextState[obj_name] = update_obj;
                setContextState({...contextState,objContextState})
                break;
        }
    }

    return (
        <ContextApiContext.Provider value={{contextState,updateContextState}}>
            {props.children}
        </ContextApiContext.Provider>
    )
}

export default ContexApiProvider;
