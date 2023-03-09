import axios from "axios";

export const fetchData=()=>{
 
    const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies"

    return axios.get(url)
};