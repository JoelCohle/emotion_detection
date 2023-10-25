import axios from "axios"
const setToken = () => {
    let token = "";
    try {
      token = window.localStorage.getItem("Authorization");  
    } catch { return 1;}
    axios.defaults.headers.common["Authorization"] = token;
    if (token == null) return 0;
    return 1;
}
const logout = () => {
    let token = "";
    try {
      token = window.localStorage.removeItem("Authorization"); 
      window.localStorage.clear(); 
    } catch {}
    delete axios.defaults.headers.common["Authorization"];
}

export {setToken, logout}