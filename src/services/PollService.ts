import axios from "axios";
import { CREATE_POLL_ENDPOINT } from "../utils/endpoints";

export const saveAll = ( data: any ) => {
    return axios.post(CREATE_POLL_ENDPOINT, data);
}