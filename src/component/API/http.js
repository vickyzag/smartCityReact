import axios from 'axios';

const URL_API = 'https://sportoo.azurewebsites.net/';
const getSportHalls = async () => {
    const rep = await axios.get(URL_API + 'sportHall');
    return rep.data;

};

const getSportHallById = async (id) => {
    const rep = await axios.get(URL_API + 'sportHall/' + id);
    return rep.data;

};

export {getSportHalls, getSportHallById};