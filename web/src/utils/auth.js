export function getToken(){
    return localStorage.getItem("token");
}

export function setToken(token){
    localStorage.setItem("token",token);
}

export function clearToken(){
    localStorage.removeItem("token");
}

export function isLoggedIn(){
    if(localStorage.getItem("token")){
        return true;
    }
    return false;
}