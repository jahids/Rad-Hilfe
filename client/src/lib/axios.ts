import axios from "axios";
import { baseURL } from "./domain";

const CustomInstance = axios.create({
	baseURL: baseURL,
	// headers: { Authorization: "Bearer " + localStorage.tid },
    withCredentials : true,
    headers:{
        'Content-Type': 'application/json',
    }
});

export default CustomInstance;