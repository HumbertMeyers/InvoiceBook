import jwt_decode from 'jwt-decode';
import { api, masterURL } from "./api"

export default function tokenIsValid() {
    try {
        let token =localStorage.getItem('token');
        let dateNow = new Date();
        let decodedToken = jwt_decode(token);
        //if(decodedToken.exp < (dateNow.getTime()/1000 - decodedToken.orig_iat)){
        if(decodedToken.exp < dateNow.getTime()/1000){
            localStorage.removeItem('token');
            return false;
        }
        return true;
    }
    catch(err) {
        localStorage.removeItem('token');
        return false;
    }

};

export function userFromToken() {

    if(tokenIsValid()){
        let token = localStorage.getItem('token');
        let decodedToken = jwt_decode(token);
        let user = {
            id : decodedToken.user_id,
            email : decodedToken.email,
            token : token,
        }
        return user;
    }
    //historique.push('/');
    return null;
};


export function getUserProfileAPIRequest(id, callback) {
    let endpoint = `/api/users/${id}/`;
    let input;
    input = masterURL(endpoint, "json", "GET");
    fetch(input)
    .then(function response() {
        let profile = JSON.parse(response)[0];
        console.log(profile);
        callback(profile.first_name + " " + profile.last_name);
    })
    .catch(function(err){
      localStorage.setItem('token',null);
    });

    //callback = json.first_name + " " + json.last_name

    /*
    let req = new api();
    req.open("GET", `${endpoint}${id}/`);

    req.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
            let profile = JSON.parse(this.responseText)[0];
            callback(profile.first_name + " " + profile.last_name);
        }
        else{
            localStorage.setItem('token',null);
        }
    });

    req.send();
    */
}