import { setToken } from "./token";
import axios from "axios";

export const login = ({ email, password }) => {
    console.log('State: ', 'name: ', email, 'Passwod: ', password)
    axios
        .post('https://api.samenvvv.nl/api/auth/local', {
            identifier: email,
            password: password,
        })
        .then((response) => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
            setToken(response.data.jwt)
        })
        .catch((error) => {
            // Handle error.
            console.log('An error occurred:', error.response);
        });
} 
