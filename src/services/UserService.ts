import axios from "axios";
import { REGISTER_ENDPOINT } from "../utils/endpoints";

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