import React from "react";
import LanuageContext from "./languageContext";

const LanuageState = (props) =>{

    const s1 = {
        "id":1,
        "name":"english",
        "prefix":"_en"
    };
    const [state,setState] = useState(s1);
    const update = (lang_obj)=>{
        setState(lang_obj);
    }
    return (
        <LanuageContext.Provider value={{state,update}}>
            {props.children}
        </LanuageContext.Provider>
    )
}

export default LanuageState;