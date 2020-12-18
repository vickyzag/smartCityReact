const URL = "http://localhost:3001/"
localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJhZG1pbiIsInZhbHVlIjp7ImVtYWlsIjoiYWRtaW5hcm5hdWRAamVzdWlzYWRtaW4ifSwiaWF0IjoxNjA4MjM5NDc4LCJleHAiOjE2MDgzMjU4Nzh9.ct5mkMZDZcuEuy2xDjSuB5ZxITrcOgHF3rSbQ6BZXJc");
const getHeader = () => {
    const token = localStorage.getItem("token");
    return {'Authorization': 'Bearer ' + token}
}
const getAPI = (access) => {
    return URL + access
}
export {getHeader, getAPI}