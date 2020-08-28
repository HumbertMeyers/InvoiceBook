import tokenIsValid, { userFromToken } from "./utils";





/*-----utilitaires request url information-----*/
let uri =  "http://192.168.1.7"; //"http://127.0.0.1";
let port = 8000;

///  call backend at endpoint.
///
/// on success : return promise with parsed json
/// on error : throws  <-- TODO
///
/// todo : add  get parameters as input
export function fetchApi(endpoint, param){
  if(typeof param != "object")
    param = {};
  param.mode= 'no-cors';
  // alert(JSON.stringify(param));

  return fetch(`${uri}:${port}/api${endpoint}`).then((resp) =>  {
    if(!resp.ok){
      throw new Error(resp.status);
    }
    return resp.json();
  });
}



/// DONT USE here below


let isInDev = require('./production.json').Dev;

export function masterURL(endpoint, type, method) {

  let options = {
        method: method,
        headers: {},
        mode: 'cors'
    };

  if(isInDev) {
      return `${uri}:${port}${endpoint}`;
  }else {
    return `${uri}${endpoint}`;
  }

  if (type === "json") {
      options.headers += `"Content-Type":"application/json;charset=UTF-8",`;
  } else if (type === "formData") {}

  if(tokenIsValid()){
    options.headers += `"Authorization":"JWT " + userFromToken().token,`;
  }

}



export class api {
  constructor() {
    this.xhr = new XMLHttpRequest();
    this.xhr.withCredentials = true;
  }

  open(method, endpoint) {
    if(isInDev){
      this.xhr.open(method, `${uri}:${port}${endpoint}`, true);
    }
    else{
      this.xhr.open(method, `${endpoint}`, true);
    }
    if(tokenIsValid()){
      this.xhr.setRequestHeader(
        "Authorization",
        "JWT " + userFromToken().token
      );
    }
  }

  /**
   *
   * @param {String} type - options: "json", "formData"
   */
  contentType(type) {
    if (type === "json") {
      this.xhr.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
      );
    } else if (type === "formData") {
      // no headers needed
    }
  }

  addEventListener(type, func) {
    this.xhr.addEventListener(type, func);
  }

  send(data) {
    if (arguments.length === 0) {
      this.xhr.send();
    } else {
      this.xhr.send(data);
    }
  }
}
