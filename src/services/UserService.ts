import axios from "axios";
import { REGISTER_ENDPOINT, LOGIN_ENDPOINT } from "../utils/endpoints";

export const registerUser = (name: string, email: string, password: string) => {
    return axios.post(REGISTER_ENDPOINT, {
                    name, email, password
                    }, 
                    {
                        headers: 
                        {
                            'Content-Type':'application/json', 
                            'Accept':'application/json'
                        }
                    }
    );
}
export const loginUser = (email: string, password: string) => {
    try {
        //const res =  axios.post(LOGIN_ENDPOINT, { email, password });
        const res =  axios.post(LOGIN_ENDPOINT, { email, password }, { headers: { 'Content-Type': 'application/json' } });
    
        console.log(res);
        return res;
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
    
    // return fetch(REGISTER_ENDPOINT,
    //     {
    //         method: "POST", 
    //         body: JSON.stringify({"name":name, "email":email, "password":password}),
    //         headers: {
    //             "Content-Type": "applicton/json"
    //         },
    //     }
    // ).then(res => res.json).catch(error => console.error("Error:", error));
}