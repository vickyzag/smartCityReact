const URL = "http://localhost:3001/"
const getHeader = () => {
    const token = localStorage.getItem("token");
    return {'Authorization': 'Bearer ' + token}
}
const getAPI = (access) => {
    return URL + access
}
export {getHeader, getAPI}