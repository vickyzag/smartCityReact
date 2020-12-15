import axios from 'axios';

const URL_API = 'https://sportoo.azurewebsites.net/sportHall/';
const getSportHallById = async (id) => {
    const rep = await axios.get(URL_API + id);
    return rep.data;

};

export {getSportHallById};