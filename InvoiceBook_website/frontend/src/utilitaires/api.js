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