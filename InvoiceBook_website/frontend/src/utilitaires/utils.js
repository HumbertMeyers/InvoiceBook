import jwt_decode from 'jwt-decode';
import historique from "./historique";
import { api } from "./api";

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
        let token =localStorage.getItem('token');
        let decodedToken = jwt_decode(token);
        let user = {
            id : decodedToken.id,
            email : decodedToken.email,
            token : token,
        }
        return user;
    }
    historique.push('/');
    window.location.reload();
    return null;
};


export function getUserProfileAPIRequest(id) {
let endpoint = "/api/user/";

let req = new api();
req.open("GET", `${endpoint}${id}/`);

req.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
    if (this.status === 200) {
        console.log(this.responseText);
        let profile = JSON.parse(this.responseText)[0];
        document.getElementById("AfficheUserName").innerHTML =
        profile.first_name + " " + profile.last_name;
    }
    else{
        localStorage.setItem('token',null);
        window.location.reload();
    }
    }
});

req.send();
}